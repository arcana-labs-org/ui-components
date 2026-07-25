import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, inject
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { ArcanaContextMenuComponent } from "./arcana-context-menu.component";
import type { ArcanaContextMenuVariant } from "../core/context-menu";

/**
 * `ArcanaContextMenuItemComponent` — Angular port do SFC Vue `ArcanaContextMenuItem`.
 *
 * Attribute selector (`<div arcanaContextMenuItem>`) com `display: contents` no host,
 * pra que o separador opcional e o `<button.arcana-context-menu-item>` fiquem como
 * filhos diretos (visuais) do painel — markup idêntico ao Vue/React/Svelte.
 *
 * Contexto pai→filho: injeta o `ArcanaContextMenuComponent` (o item é projetado dentro
 * dele, logo está na cadeia de DI — mesma técnica do `ArcanaDropdownItem`) e chama
 * `close()` no clique quando `closeOnClick`.
 *
 * Vue → Angular:
 * - slot default → `<ng-content>` (label); slot `#suffix` → `@Input() suffix` (string)
 *   OU `@Input() suffixTemplate` (`TemplateRef`).
 * - `emit('click')` / `emit('select')` → `@Output() clicked` / `selected` (renomeados
 *   pra não colidir com os eventos DOM de mesmo nome no host).
 *
 * `tabindex="-1"`: quem tem o foco é o painel; ↑/↓ movem o foco entre os itens.
 */
@Component({
  selector: "div[arcanaContextMenuItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "style": "display: contents" },
  template: `
    @if (divided) {
      <div class="arcana-context-menu-item__separator"></div>
    }

    <button
      type="button"
      [class]="buttonClasses"
      [disabled]="disabled"
      role="menuitem"
      tabindex="-1"
      (click)="handleClick($event)"
    >
      @if (icon) {
        <i class="arcana-context-menu-item__icon {{ icon }}" aria-hidden="true"></i>
      }
      <span class="arcana-context-menu-item__label"><ng-content></ng-content></span>
      @if (suffixTemplate) {
        <span class="arcana-context-menu-item__suffix">
          <ng-container [ngTemplateOutlet]="suffixTemplate"></ng-container>
        </span>
      } @else if (suffix) {
        <span class="arcana-context-menu-item__suffix">{{ suffix }}</span>
      }
    </button>
  `
})
export class ArcanaContextMenuItemComponent {
  @Input() icon = "";
  /** Atalho exibido à direita (ex: "⌘C"). */
  @Input() suffix = "";
  @Input() suffixTemplate?: TemplateRef<unknown>;
  @Input() variant: ArcanaContextMenuVariant = "default";
  @Input() disabled = false;
  /** Separador acima deste item. */
  @Input() divided = false;
  @Input() closeOnClick = true;

  @Output() clicked = new EventEmitter<MouseEvent>();
  /** Ativação semântica — também dispara pelo Enter/Espaço. */
  @Output() selected = new EventEmitter<MouseEvent>();

  // `optional` pra permitir uso solto; mesma técnica do ArcanaDropdownItem.
  private readonly menu = inject(ArcanaContextMenuComponent, { optional: true });

  get buttonClasses(): string {
    return [
      "arcana-context-menu-item",
      this.variant ? `arcana-context-menu-item--${this.variant}` : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  handleClick(e: MouseEvent): void {
    if (this.disabled) return;
    this.clicked.emit(e);
    this.selected.emit(e);
    if (this.closeOnClick) this.menu?.close();
  }
}
