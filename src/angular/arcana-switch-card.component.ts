import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ArcanaSwitchCardComponent` — Angular port do SFC Vue `ArcanaSwitchCard`.
 *
 * Attribute selector num `<button>` (`<button arcanaSwitchCard>`): toggle full-width
 * de alto impacto (card inverte pra zinc-900 quando ativo). Reproduz `.arcana-switch-card`
 * (+ `is-on`/`is-disabled`), o ícone (`__icon`), textos (`__text`/`__title`/`__status`) e o
 * switch visual interno custom (`__switch`/`__switch-thumb`), idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - slots `#icon`/`#title`/`#status` → `@Input() icon` (string FA) / `title` / status derivado nesta fase.
 */
@Component({
  selector: "button[arcanaSwitchCard]",
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
      <span class="arcana-switch-card__icon" aria-hidden="true">
        @if (icon) {
          <i [class]="icon"></i>
        }
      </span>
    }

    <div class="arcana-switch-card__text">
      <div class="arcana-switch-card__title">{{ title }}</div>
      @if (hasStatus) {
        <div class="arcana-switch-card__status">{{ currentStatus }}</div>
      }
    </div>

    <span class="arcana-switch-card__switch" aria-hidden="true">
      <span class="arcana-switch-card__switch-thumb"></span>
    </span>
  `
})
export class ArcanaSwitchCardComponent {
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
      "arcana-switch-card",
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
