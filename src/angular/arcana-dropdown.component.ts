import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef, inject
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ArcanaDropdownComponent` — Angular port do SFC Vue `ArcanaDropdown`.
 *
 * Attribute selector num `<div>` (`<div arcanaDropdown>`): container `.arcana-dropdown`
 * com trigger + menu shadcn (palette zinc). Reproduz `.arcana-dropdown__trigger`, o
 * `.arcana-dropdown__menu` (+ `--comfortable`) TELEPORTADO pro `<body>` e o posicionamento
 * via `getBoundingClientRect` (flip vertical + shift horizontal), idêntico ao Vue/React.
 *
 * Portal: menu vive num `<ng-template>`; ao abrir, criamos um `EmbeddedViewRef` e movemos
 * seu root pro `document.body` (como o `ArcanaSelect`). Os `ArcanaDropdownItem` projetados
 * (`<ng-content>`) seguem na árvore de CD e injetam ESTE componente via
 * `inject(ArcanaDropdownComponent)` — substitui o `provide('shadcnDropdownSize')` + o
 * CustomEvent `arcana-dropdown-close` do SFC (o item chama `close()` direto).
 *
 * Vue → Angular:
 * - slot `#trigger` (scope `{ open, toggle }`) → `@Input() triggerTemplate` (`TemplateRef`,
 *   contexto `{ open, toggle }`) OU `<ng-content select="[arcanaDropdownTrigger]">`.
 * - slot default (scope `{ close }`) → `<ng-content>` (os items).
 * - `emit('open')` / `emit('close')` → `@Output() opened` / `@Output() closed` (renomeados
 *   pra não colidir com os métodos `open()`/`close()`).
 */
export type ArcanaDropdownPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";
export type ArcanaDropdownSize = "default" | "comfortable";

@Component({
  selector: "div[arcanaDropdown]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "class": "arcana-dropdown" },
  template: `
    <span class="arcana-dropdown__trigger" (click)="onTriggerClick($event)">
      @if (triggerTemplate) {
        <ng-container
          [ngTemplateOutlet]="triggerTemplate"
          [ngTemplateOutletContext]="triggerContext"
        ></ng-container>
      } @else {
        <ng-content select="[arcanaDropdownTrigger]"></ng-content>
      }
    </span>

    <ng-template #menuTpl>
      <div
        class="arcana-dropdown__menu"
        [class.arcana-dropdown__menu--comfortable]="size === 'comfortable'"
        [style.top.px]="menuPos.top"
        [style.left.px]="menuPos.left"
        role="menu"
      >
        <ng-content></ng-content>
      </div>
    </ng-template>
  `
})
export class ArcanaDropdownComponent implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild("menuTpl") menuTpl?: TemplateRef<unknown>;

  @Input() placement: ArcanaDropdownPlacement = "bottom-end";
  @Input() offset = 4;
  @Input() disabled = false;
  @Input() size: ArcanaDropdownSize = "default";
  /** Substitui a `<ng-content select="[arcanaDropdownTrigger]">`; contexto `{ open, toggle }`. */
  @Input() triggerTemplate?: TemplateRef<{ open: boolean; toggle: () => void }>;

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen = false;
  menuPos: { top: number; left: number } = { top: 0, left: 0 };

  private view?: EmbeddedViewRef<unknown>;
  private menuEl?: HTMLElement;

  private readonly onOutsideClick = (e: MouseEvent): void => {
    const target = e.target as Node;
    if (this.host.nativeElement.contains(target)) return;
    if (this.menuEl?.contains(target)) return;
    this.close();
    this.cdr.markForCheck();
  };
  private readonly onKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      e.stopPropagation();
      this.close();
      this.cdr.markForCheck();
    }
  };
  private readonly reposition = (): void => {
    this.positionMenu();
    this.cdr.markForCheck();
  };

  get triggerContext(): { open: boolean; toggle: () => void; $implicit: () => void } {
    return { open: this.isOpen, toggle: this.toggle, $implicit: this.toggle };
  }

  readonly toggle = (): void => {
    if (this.disabled) return;
    this.isOpen ? this.close() : this.open();
  };

  onTriggerClick(e: MouseEvent): void {
    e.stopPropagation();
    this.toggle();
  }

  open(): void {
    if (this.disabled || this.isOpen || !this.menuTpl) return;
    this.isOpen = true;
    this.opened.emit();

    this.view = this.vcr.createEmbeddedView(this.menuTpl);
    this.view.detectChanges();
    this.menuEl = this.view.rootNodes[0] as HTMLElement;
    document.body.appendChild(this.menuEl);

    document.addEventListener("click", this.onOutsideClick, true);
    document.addEventListener("keydown", this.onKeydown);
    window.addEventListener("resize", this.reposition);
    window.addEventListener("scroll", this.reposition, true);

    requestAnimationFrame(() => {
      this.positionMenu();
      this.cdr.markForCheck();
    });
    this.cdr.markForCheck();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.closed.emit();
    document.removeEventListener("click", this.onOutsideClick, true);
    document.removeEventListener("keydown", this.onKeydown);
    window.removeEventListener("resize", this.reposition);
    window.removeEventListener("scroll", this.reposition, true);
    this.view?.destroy();
    this.view = undefined;
    this.menuEl = undefined;
  }

  private positionMenu(): void {
    const container = this.host.nativeElement;
    const menu = this.menuEl;
    if (!container || !menu) return;

    const triggerRect = container.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 8;

    const wantsTop = this.placement.startsWith("top");
    const wantsEnd = this.placement.endsWith("end");

    let top: number;
    if (wantsTop) {
      top = triggerRect.top - menuRect.height - this.offset;
      if (top < margin) top = triggerRect.bottom + this.offset;
    } else {
      top = triggerRect.bottom + this.offset;
      if (top + menuRect.height > vh - margin) {
        top = triggerRect.top - menuRect.height - this.offset;
      }
    }

    let left = wantsEnd ? triggerRect.right - menuRect.width : triggerRect.left;
    if (left < margin) left = margin;
    if (left + menuRect.width > vw - margin) left = vw - menuRect.width - margin;

    this.menuPos = { top, left };
  }

  ngOnDestroy(): void {
    this.close();
  }
}
