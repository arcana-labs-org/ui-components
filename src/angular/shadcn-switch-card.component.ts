import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ShadcnSwitchCardComponent` — Angular port do SFC Vue `ShadcnSwitchCard`.
 *
 * Attribute selector num `<button>` (`<button arcanaShadcnSwitchCard>`): toggle full-width
 * de alto impacto (card inverte pra zinc-900 quando ativo). Reproduz `.shadcn-switch-card`
 * (+ `is-on`/`is-disabled`), o ícone (`__icon`), textos (`__text`/`__title`/`__status`) e o
 * switch visual interno custom (`__switch`/`__switch-thumb`), idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - slots `#icon`/`#title`/`#status` → `@Input() icon` (string FA) / `title` / status derivado nesta fase.
 */
@Component({
  selector: "button[arcanaShadcnSwitchCard]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "type": "button",
    "role": "switch",
    "[class]": "rootClass",
    "[attr.aria-checked]": "!!value",
    "[attr.aria-label]": "ariaLabel || title || null",
    "[disabled]": "disabled",
    "(click)": "toggle()",
    "(keydown)": "onKeydown($event)"
  },
  template: `
    @if (hasIcon) {
      <span class="shadcn-switch-card__icon" aria-hidden="true">
        @if (icon) {
          <i [class]="icon"></i>
        }
      </span>
    }

    <div class="shadcn-switch-card__text">
      <div class="shadcn-switch-card__title">{{ title }}</div>
      @if (hasStatus) {
        <div class="shadcn-switch-card__status">{{ currentStatus }}</div>
      }
    </div>

    <span class="shadcn-switch-card__switch" aria-hidden="true">
      <span class="shadcn-switch-card__switch-thumb"></span>
    </span>
  `
})
export class ShadcnSwitchCardComponent {
  @Input() value = false;
  @Input() title = "";
  @Input() statusOn = "ATIVO";
  @Input() statusOff = "DESLIGADO";
  @Input() icon = "";
  @Input() disabled = false;
  @Input() ariaLabel = "";

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();

  get hasIcon(): boolean {
    return Boolean(this.icon);
  }

  get currentStatus(): string {
    return this.value ? this.statusOn : this.statusOff;
  }

  get hasStatus(): boolean {
    return Boolean(this.currentStatus);
  }

  get rootClass(): string {
    return [
      "shadcn-switch-card",
      this.value ? "is-on" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  toggle(): void {
    if (this.disabled) return;
    const next = !this.value;
    this.valueChange.emit(next);
    this.change.emit(next);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.toggle();
    }
  }
}
