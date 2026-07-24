import {
  ChangeDetectionStrategy, Component, Input, TemplateRef, inject
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { ShadcnDropdownComponent, type ShadcnDropdownSize } from "./shadcn-dropdown.component";

/**
 * `ShadcnDropdownItemComponent` — Angular port do SFC Vue `ShadcnDropdownItem`.
 *
 * Attribute selector (`<div arcanaShadcnDropdownItem>`) com `display: contents` no host,
 * pra que o separador opcional (`.shadcn-dropdown-item__separator`) e o `<button
 * .shadcn-dropdown-item>` fiquem como filhos diretos (visuais) do menu — idêntico ao markup
 * Vue (separador é sibling do botão). Reproduz `--${variant}`/`--comfortable`/`is-disabled`,
 * `__icon`/`__label`/`__suffix`.
 *
 * Contexto pai→filho: injeta o `ShadcnDropdownComponent` (o item é projetado dentro do
 * dropdown, logo está na cadeia de DI — mesma técnica do `ShadcnAccordionItem`). Herda o
 * `size` do pai e chama `dropdown.close()` no clique (substitui o CustomEvent do SFC).
 *
 * Vue → Angular:
 * - slot default → `<ng-content>` (label); slot `#suffix` → `@Input() suffix` (string) OU
 *   `@Input() suffixTemplate` (`TemplateRef`), espelhando o prop `suffix` do port React.
 * - `emit('click', ev)` → `@Output()`? não: o clique é tratado internamente (close). Pra
 *   reagir ao clique, use o `(click)` DOM no próprio conteúdo ou `onClick` via binding.
 */
@Component({
  selector: "div[arcanaShadcnDropdownItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "style": "display: contents" },
  template: `
    @if (divided) {
      <div class="shadcn-dropdown-item__separator"></div>
    }

    <button
      type="button"
      [class]="buttonClasses"
      [disabled]="disabled"
      role="menuitem"
      (click)="handleClick($event)"
    >
      @if (icon) {
        <i class="shadcn-dropdown-item__icon {{ icon }}" [style.color]="iconColor || null" aria-hidden="true"></i>
      }
      <span class="shadcn-dropdown-item__label"><ng-content></ng-content></span>
      @if (suffixTemplate) {
        <span class="shadcn-dropdown-item__suffix">
          <ng-container [ngTemplateOutlet]="suffixTemplate"></ng-container>
        </span>
      } @else if (suffix) {
        <span class="shadcn-dropdown-item__suffix">{{ suffix }}</span>
      }
    </button>
  `
})
export class ShadcnDropdownItemComponent {
  @Input() icon = "";
  @Input() iconColor = "";
  @Input() variant: "default" | "danger" | "success" | "warning" = "default";
  @Input() disabled = false;
  @Input() divided = false;
  @Input() closeOnClick = true;
  /** Sobrescreve o `size` herdado do `ShadcnDropdown` pai só neste item. */
  @Input() size: ShadcnDropdownSize | null = null;
  @Input() suffix = "";
  @Input() suffixTemplate?: TemplateRef<unknown>;

  // Injeta o `ShadcnDropdown` pai (o item é projetado dentro dele → cadeia de DI).
  // `optional` pra permitir uso standalone; mesma técnica do `ShadcnAccordionItem`.
  private readonly dropdown = inject(ShadcnDropdownComponent, { optional: true });

  get effectiveSize(): ShadcnDropdownSize {
    return this.size ?? this.dropdown?.size ?? "default";
  }

  get buttonClasses(): string {
    return [
      "shadcn-dropdown-item",
      this.variant ? `shadcn-dropdown-item--${this.variant}` : "",
      this.effectiveSize === "comfortable" ? "shadcn-dropdown-item--comfortable" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  handleClick(_e: MouseEvent): void {
    if (this.disabled) return;
    if (this.closeOnClick) this.dropdown?.close();
  }
}
