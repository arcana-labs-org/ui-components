import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ArcanaSwitchSegmentedComponent` — Angular port do SFC Vue `ArcanaSwitchSegmented`.
 *
 * Attribute selector num `<div>` (`<div arcanaSwitchSegmented>`): reproduz
 * `.arcana-switch-segmented` (+ `is-on`/`is-disabled`/`is-compact`/`is-squared`),
 * o `__indicator` e as duas metades `__option--off`/`__option--on` (com `__radio`
 * opcional), idêntico ao Vue/React. Preserva o inline `--seg-active`.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - slots `#off-label`/`#on-label` → conteúdo projetado `[segOff]`/`[segOn]` (fallback: offLabel/onLabel)
 */
@Component({
  selector: "div[arcanaSwitchSegmented]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--seg-active]": "activeColor || null",
    "role": "switch",
    "[attr.aria-checked]": "!!value",
    "[attr.aria-label]": "ariaLabel || ariaLabelFallback || null",
    "[attr.aria-disabled]": "disabled",
    "[attr.tabindex]": "disabled ? -1 : 0",
    "(click)": "toggle()",
    "(keydown)": "onKeydown($event)"
  },
  template: `
    <div class="arcana-switch-segmented__indicator" aria-hidden="true"></div>

    <div class="arcana-switch-segmented__option arcana-switch-segmented__option--off">
      @if (radio) {
        <span class="arcana-switch-segmented__radio" aria-hidden="true"></span>
      }
      <ng-content select="[segOff]">{{ offLabel }}</ng-content>
    </div>
    <div class="arcana-switch-segmented__option arcana-switch-segmented__option--on">
      @if (radio) {
        <span class="arcana-switch-segmented__radio" aria-hidden="true"></span>
      }
      <ng-content select="[segOn]">{{ onLabel }}</ng-content>
    </div>
  `
})
export class ArcanaSwitchSegmentedComponent {
  @Input() value = false;
  @Input() offLabel = "Inativo";
  @Input() onLabel = "Ativo";
  @Input() disabled = false;
  @Input() ariaLabel = "";
  @Input() compact = false;
  @Input() squared = false;
  @Input() activeColor = "";
  @Input() radio = false;

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();

  get ariaLabelFallback(): string {
    return `${this.offLabel} ou ${this.onLabel}`;
  }

  get rootClass(): string {
    return [
      "arcana-switch-segmented",
      this.value ? "is-on" : "",
      this.disabled ? "is-disabled" : "",
      this.compact ? "is-compact" : "",
      this.squared ? "is-squared" : ""
    ].filter(Boolean).join(" ");
  }

  toggle(): void {
    if (this.disabled) return;
    const next = !this.value;
    this.valueChange.emit(next);
    this.change.emit(next);
  }

  onKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.toggle();
      return;
    }
    if (e.key === "ArrowLeft" && this.value) {
      e.preventDefault();
      this.toggle();
    }
    if (e.key === "ArrowRight" && !this.value) {
      e.preventDefault();
      this.toggle();
    }
  }
}
