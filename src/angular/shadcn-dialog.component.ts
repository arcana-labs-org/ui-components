import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EmbeddedViewRef,
  EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef, inject
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { acquireZIndex, releaseZIndex } from "../vue/services/dialog-stack";

/**
 * `ShadcnDialogComponent` — Angular port do SFC Vue `ShadcnDialog`.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnDialog>`): modal shadcn-style com API
 * imperativa (`show()` / `hide()`), espelhando a API ref-based do SFC (`this.$refs.dialog
 * .show()`). Emite o MESMO markup e as MESMAS classes shadcn (`.shadcn-dialog-overlay`,
 * `.shadcn-dialog-content`, `__header`/`__body`/`__footer`) do Vue/React.
 *
 * Portal (idêntico ao `ShadcnSelect`/`MultiSelectPopover`): o overlay vive num
 * `<ng-template>`; no `show()` criamos um `EmbeddedViewRef` e MOVEMOS seu root pro
 * `document.body` (mesma ideia do `<Teleport to="body">` do Vue / `createPortal` do React).
 * A view segue na árvore de CD do componente, então `<ng-content>` (body) e os
 * `ngTemplateOutlet` (header/footer) continuam reativos; `destroy()` remove o DOM no `hide()`.
 * z-index dinâmico via o `dialog-stack` compartilhado (empilhamento de modais aninhados).
 *
 * Vue → Angular:
 * - API ref-based `show()`/`hide()` → métodos públicos homônimos.
 * - `emit('show')` / `emit('hide')` → `@Output() shown` / `@Output() hidden` (renomeados
 *   pra não colidir com os métodos `show()`/`hide()`).
 * - slot default → `<ng-content>` (body); slot `#header` → `@Input() headerTemplate`
 *   (`TemplateRef`); slot `#footer` (scope `{ hide }`) → `@Input() footerTemplate`
 *   (`TemplateRef`, contexto `{ $implicit: hide, hide }`).
 * - A transição fade+zoom do Vue é omitida (mesma decisão dos outros ports com portal).
 */
export type ShadcnDialogSize = "sm" | "md" | "lg" | "xl" | "full" | number;

const BASE_Z_INDEX = 10000;

const SIZE_PRESETS: Record<string, string> = {
  sm: "470px",
  md: "580px",
  lg: "720px",
  xl: "880px",
  full: "90vw"
};

@Component({
  selector: "div[arcanaShadcnDialog]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #dialogTpl>
      <div
        class="shadcn-dialog-overlay"
        [style.zIndex]="currentZIndex"
        (click)="onOverlayClick($event)"
      >
        <div
          class="shadcn-dialog-content"
          [class.shadcn-dialog-content--full-height]="fullHeight"
          [class]="contentClasses"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="title ? 'shadcn-dialog-title' : null"
          [attr.aria-describedby]="description ? 'shadcn-dialog-desc' : null"
          [style.maxWidth]="resolvedMaxWidth"
          [style.zIndex]="currentZIndex + 1"
        >
          @if (showHeader) {
            <header class="shadcn-dialog-header">
              @if (headerTemplate) {
                <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
              } @else {
                <h2 id="shadcn-dialog-title" class="shadcn-dialog-title">{{ title }}</h2>
                @if (description) {
                  <p id="shadcn-dialog-desc" class="shadcn-dialog-description">{{ description }}</p>
                }
              }
              @if (closeable) {
                <button
                  type="button"
                  class="shadcn-dialog-close"
                  aria-label="Fechar"
                  (click)="hide()"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              }
            </header>
          }

          <div
            class="shadcn-dialog-body"
            [class.shadcn-dialog-body--no-padding]="noBodyPadding"
            [class.shadcn-dialog-body--no-scroll]="!bodyScrollable"
          >
            <ng-content></ng-content>
          </div>

          @if (footerTemplate) {
            <footer
              class="shadcn-dialog-footer"
              [class.shadcn-dialog-footer--flat]="flatFooter"
            >
              <ng-container
                [ngTemplateOutlet]="footerTemplate"
                [ngTemplateOutletContext]="footerContext"
              ></ng-container>
            </footer>
          }
        </div>
      </div>
    </ng-template>
  `
})
export class ShadcnDialogComponent implements OnDestroy {
  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild("dialogTpl") dialogTpl?: TemplateRef<unknown>;

  @Input() title = "";
  @Input() description = "";
  @Input() size: ShadcnDialogSize = "md";
  @Input() fullHeight = false;
  @Input() closeable = true;
  @Input() contentClass = "";
  @Input() closeOnOverlayClick = false;
  @Input() closeOnEscape = true;
  @Input() noBodyPadding = false;
  @Input() bodyScrollable = true;
  @Input() flatFooter = false;
  /** Substitui o header padrão (title/description) — espelha o slot `#header`. */
  @Input() headerTemplate?: TemplateRef<unknown>;
  /** Rodapé; contexto `{ $implicit: hide, hide }` — espelha o slot `#footer` (scope `{ hide }`). */
  @Input() footerTemplate?: TemplateRef<{ $implicit: () => void; hide: () => void }>;

  @Output() shown = new EventEmitter<void>();
  @Output() hidden = new EventEmitter<void>();

  visible = false;
  currentZIndex = BASE_Z_INDEX;

  private view?: EmbeddedViewRef<unknown>;
  private overlayEl?: HTMLElement;

  // Arrow property: mantém `this` ligado ao passar como contexto do ngTemplateOutlet
  // e como listener de teclado.
  readonly hide = (): void => {
    if (!this.visible) return;
    this.visible = false;
    releaseZIndex();
    document.removeEventListener("keydown", this.onKeydown);
    this.view?.destroy();
    this.view = undefined;
    this.overlayEl = undefined;
    this.hidden.emit();
    this.cdr.markForCheck();
  };

  private readonly onKeydown = (e: KeyboardEvent): void => {
    if (!this.visible) return;
    if (e.key === "Escape" && this.closeOnEscape) {
      e.preventDefault();
      this.hide();
    }
  };

  get resolvedMaxWidth(): string {
    if (typeof this.size === "number") return `${this.size}px`;
    return SIZE_PRESETS[this.size] ?? SIZE_PRESETS.md;
  }

  get showHeader(): boolean {
    return Boolean(this.title || this.headerTemplate);
  }

  get contentClasses(): string {
    return ["shadcn-dialog-content", this.contentClass].filter(Boolean).join(" ");
  }

  get footerContext(): { $implicit: () => void; hide: () => void } {
    return { $implicit: this.hide, hide: this.hide };
  }

  show(): void {
    if (this.visible || !this.dialogTpl) return;
    this.currentZIndex = acquireZIndex();
    this.visible = true;

    this.view = this.vcr.createEmbeddedView(this.dialogTpl);
    this.view.detectChanges();
    this.overlayEl = this.view.rootNodes[0] as HTMLElement;
    document.body.appendChild(this.overlayEl);

    document.addEventListener("keydown", this.onKeydown);
    this.shown.emit();

    requestAnimationFrame(() => {
      this.focusFirstElement();
      this.cdr.markForCheck();
    });
    this.cdr.markForCheck();
  }

  onOverlayClick(e: MouseEvent): void {
    if (e.target !== e.currentTarget) return;
    if (this.closeOnOverlayClick) this.hide();
  }

  private focusFirstElement(): void {
    const root = this.overlayEl?.querySelector<HTMLElement>(".shadcn-dialog-content");
    if (!root) return;
    const focusable = root.querySelector<HTMLElement>(
      'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    (focusable ?? root).focus?.();
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
