import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, HostListener, Input, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef, inject
} from "@angular/core";
import {
  CONTEXT_MENU_PANEL_ESTIMATE,
  handleContextMenuKey,
  placeAtPointer,
  registerOpenContextMenu,
  unregisterOpenContextMenu,
  type ArcanaContextMenuItemSpec
} from "../core/context-menu";

/**
 * `ArcanaContextMenuComponent` — Angular port do SFC Vue `ArcanaContextMenu`.
 *
 * Menu de contexto (botão direito). É o `ArcanaDropdown` com dois ajustes: abre no
 * evento `contextmenu` (com `preventDefault`) e ancora o painel nas COORDENADAS DO
 * CURSOR — `placeAtPointer` (core/context-menu) trata o ponto como âncora de largura
 * zero e delega o flip/shift ao `placePanel`, então o menu nunca sai da viewport.
 *
 * Attribute selector num `<div>` (`<div arcanaContextMenu>`): o HOST é a área que
 * responde ao clique direito. O painel vive num `<ng-template>` que, ao abrir, vira
 * `EmbeddedViewRef` movido pro `document.body` (mesmo portal do `ArcanaDropdown`).
 * Os `ArcanaContextMenuItem` projetados injetam ESTE componente via DI e chamam
 * `close()` — substitui o provide/inject do SFC.
 *
 * Vue → Angular:
 * - slot `#trigger` → o próprio conteúdo projetado fora do painel? Não: aqui o
 *   gatilho é o HOST, e `<ng-content>` (dentro do painel) são os ITENS.
 *   Para o gatilho, escreva o conteúdo dentro de `<div arcanaContextMenu>` marcado
 *   com `[arcanaContextMenuTrigger]`.
 * - `emit('open'|'close'|'select')` → `@Output() opened` / `closed` / `selected`
 *   (renomeados pra não colidir com os métodos `open()`/`close()`).
 */
@Component({
  selector: "div[arcanaContextMenu]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "class": "arcana-context-menu", "tabindex": "-1" },
  template: `
    <ng-content select="[arcanaContextMenuTrigger]"></ng-content>

    <ng-template #panelTpl>
      <div
        [class]="panelClasses"
        [style.left.px]="pos.left"
        [style.top.px]="pos.top"
        role="menu"
        [attr.aria-label]="ariaLabel || null"
        tabindex="-1"
        (keydown)="onPanelKeydown($event)"
        (contextmenu)="onPanelContextMenu($event)"
      >
        <ng-content></ng-content>

        @for (item of items; track $index) {
          @if (item.divided) {
            <div class="arcana-context-menu-item__separator"></div>
          }
          <button
            type="button"
            [class]="itemClasses(item)"
            [disabled]="item.disabled === true"
            role="menuitem"
            tabindex="-1"
            (click)="onSpecClick(item, $index)"
          >
            @if (item.icon) {
              <i class="arcana-context-menu-item__icon {{ item.icon }}" aria-hidden="true"></i>
            }
            <span class="arcana-context-menu-item__label">{{ item.label }}</span>
            @if (item.suffix) {
              <span class="arcana-context-menu-item__suffix">{{ item.suffix }}</span>
            }
          </button>
        }
      </div>
    </ng-template>
  `
})
export class ArcanaContextMenuComponent implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild("panelTpl") panelTpl?: TemplateRef<unknown>;

  /** Não abre o menu — deixa o menu nativo do navegador aparecer. */
  @Input() disabled = false;
  /** Classe extra no painel portado pro body (tematização de portais). */
  @Input() panelClass = "";
  /** Rótulo acessível do `role="menu"`. */
  @Input() ariaLabel = "";
  /** Modo data-driven — renderizado DEPOIS do conteúdo projetado. */
  @Input() items: ArcanaContextMenuItemSpec[] = [];

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  /** Só no modo `items`. */
  @Output() selected = new EventEmitter<{ item: ArcanaContextMenuItemSpec; index: number }>();

  isOpen = false;
  pos: { left: number; top: number } = { left: -9999, top: -9999 };

  private view?: EmbeddedViewRef<unknown>;
  private panelEl?: HTMLElement;
  private point = { x: 0, y: 0 };

  private readonly onOutsidePointerDown = (e: MouseEvent): void => {
    const target = e.target as Node;
    if (this.host.nativeElement.contains(target)) return;
    if (this.panelEl?.contains(target)) return;
    this.close();
    this.cdr.markForCheck();
  };
  private readonly onDocumentKeydown = (e: KeyboardEvent): void => {
    if (e.key !== "Escape") return;
    e.stopPropagation();
    this.closeAndRestoreFocus();
    this.cdr.markForCheck();
  };
  private readonly onScroll = (e: Event): void => {
    if (this.panelEl && e.target instanceof Node && this.panelEl.contains(e.target)) return;
    this.close();
    this.cdr.markForCheck();
  };
  private readonly onResize = (): void => {
    this.close();
    this.cdr.markForCheck();
  };
  /** Referência estável pro registro global (abrir um menu fecha os outros). */
  private readonly closeFromRegistry = (): void => {
    this.close();
    this.cdr.markForCheck();
  };

  get panelClasses(): string {
    return ["arcana-context-menu__panel", this.panelClass].filter(Boolean).join(" ");
  }

  itemClasses(item: ArcanaContextMenuItemSpec): string {
    return [
      "arcana-context-menu-item",
      `arcana-context-menu-item--${item.variant ?? "default"}`,
      item.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  @HostListener("contextmenu", ["$event"])
  onContextMenu(e: MouseEvent): void {
    if (this.disabled) return;
    // Menus aninhados: só o gatilho mais interno responde.
    e.preventDefault();
    e.stopPropagation();
    this.openAt(e.clientX, e.clientY);
  }

  openAt(x: number, y: number): void {
    if (this.disabled || !this.panelTpl) return;
    this.point = { x, y };

    if (!this.isOpen) {
      this.isOpen = true;
      this.opened.emit();
      registerOpenContextMenu(this.closeFromRegistry);

      this.view = this.vcr.createEmbeddedView(this.panelTpl);
      this.view.detectChanges();
      this.panelEl = this.view.rootNodes[0] as HTMLElement;
      document.body.appendChild(this.panelEl);

      document.addEventListener("mousedown", this.onOutsidePointerDown, true);
      document.addEventListener("keydown", this.onDocumentKeydown, true);
      window.addEventListener("resize", this.onResize);
      window.addEventListener("scroll", this.onScroll, true);
    }

    this.position();
    this.view?.detectChanges();
    this.panelEl?.focus();
    this.cdr.markForCheck();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.closed.emit();
    unregisterOpenContextMenu(this.closeFromRegistry);
    document.removeEventListener("mousedown", this.onOutsidePointerDown, true);
    document.removeEventListener("keydown", this.onDocumentKeydown, true);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("scroll", this.onScroll, true);
    this.view?.destroy();
    this.view = undefined;
    this.panelEl = undefined;
  }

  closeAndRestoreFocus(): void {
    this.close();
    this.host.nativeElement.focus();
  }

  onPanelKeydown(e: KeyboardEvent): void {
    const result = handleContextMenuKey(e, this.panelEl);
    if (result === "close") {
      e.preventDefault();
      e.stopPropagation();
      this.closeAndRestoreFocus();
      this.cdr.markForCheck();
    }
  }

  onPanelContextMenu(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  onSpecClick(item: ArcanaContextMenuItemSpec, index: number): void {
    if (item.disabled) return;
    this.selected.emit({ item, index });
    if (item.closeOnClick !== false) {
      this.close();
      this.cdr.markForCheck();
    }
  }

  private position(): void {
    const panel = this.panelEl;
    if (!panel) return;
    const place = placeAtPointer(
      this.point,
      {
        width: panel.offsetWidth || CONTEXT_MENU_PANEL_ESTIMATE.width,
        height: panel.offsetHeight || CONTEXT_MENU_PANEL_ESTIMATE.height
      },
      { width: window.innerWidth, height: window.innerHeight }
    );
    this.pos = place;
  }

  ngOnDestroy(): void {
    this.close();
  }
}
