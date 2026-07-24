import {
  ChangeDetectionStrategy, Component, Input, TemplateRef, inject
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { ArcanaDropdownComponent, type ArcanaDropdownSize } from "./arcana-dropdown.component";

/**
 * `ArcanaDropdownItemComponent` — Angular port do SFC Vue `ArcanaDropdownItem`.
 *
 * Attribute selector (`<div arcanaDropdownItem>`) com `display: contents` no host,
 * pra que o separador opcional (`.arcana-dropdown-item__separator`) e o `<button
 * .arcana-dropdown-item>` fiquem como filhos diretos (visuais) do menu — idêntico ao markup
 * Vue (separador é sibling do botão). Reproduz `--${variant}`/`--comfortable`/`is-disabled`,
 * `__icon`/`__label`/`__suffix`.
 *
 * Contexto pai→filho: injeta o `ArcanaDropdownComponent` (o item é projetado dentro do
 * dropdown, logo está na cadeia de DI — mesma técnica do `ArcanaAccordionItem`). Herda o
 * `size` do pai e chama `dropdown.close()` no clique (substitui o CustomEvent do SFC).
 *
 * Vue → Angular:
 * - slot default → `<ng-content>` (label); slot `#suffix` → `@Input() suffix` (string) OU
 *   `@Input() suffixTemplate` (`TemplateRef`), espelhando o prop `suffix` do port React.
 * - `emit('click', ev)` → `@Output()`? não: o clique é tratado internamente (close). Pra
 *   reagir ao clique, use o `(click)` DOM no próprio conteúdo ou `onClick` via binding.
 */
@Component({
  selector: "div[arcanaDropdownItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "style": "display: contents" },
  template: `
    @if (divided) {
      <div class="arcana-dropdown-item__separator"></div>
    }

    <button
      type="button"
      [class]="buttonClasses"
      [disabled]="disabled"
      role="menuitem"
      (click)="handleClick($event)"
    >
      @if (icon) {
        <i class="arcana-dropdown-item__icon {{ icon }}" [style.color]="iconColor || null" aria-hidden="true"></i>
      }
      <span class="arcana-dropdown-item__label"><ng-content></ng-content></span>
      @if (suffixTemplate) {
        <span class="arcana-dropdown-item__suffix">
          <ng-container [ngTemplateOutlet]="suffixTemplate"></ng-container>
        </span>
      } @else if (suffix) {
        <span class="arcana-dropdown-item__suffix">{{ suffix }}</span>
      }
    </button>
  `
})
export class ArcanaDropdownItemComponent {
  @Input() icon = "";
  @Input() iconColor = "";
  @Input() variant: "default" | "danger" | "success" | "warning" = "default";
  @Input() disabled = false;
  @Input() divided = false;
  @Input() closeOnClick = true;
  /** Sobrescreve o `size` herdado do `ArcanaDropdown` pai só neste item. */
  @Input() size: ArcanaDropdownSize | null = null;
  @Input() suffix = "";
  @Input() suffixTemplate?: TemplateRef<unknown>;

  // Injeta o `ArcanaDropdown` pai (o item é projetado dentro dele → cadeia de DI).
  // `optional` pra permitir uso standalone; mesma técnica do `ArcanaAccordionItem`.
  private readonly dropdown = inject(ArcanaDropdownComponent, { optional: true });

  get effectiveSize(): ArcanaDropdownSize {
    return this.size ?? this.dropdown?.size ?? "default";
  }

  get buttonClasses(): string {
    return [
      "arcana-dropdown-item",
      this.variant ? `arcana-dropdown-item--${this.variant}` : "",
      this.effectiveSize === "comfortable" ? "arcana-dropdown-item--comfortable" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  handleClick(_e: MouseEvent): void {
    if (this.disabled) return;
    if (this.closeOnClick) this.dropdown?.close();
  }
}
