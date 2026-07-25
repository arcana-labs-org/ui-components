import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit,
  Output, SimpleChanges
} from "@angular/core";

/**
 * `ArcanaSegmentedOptionsComponent` — Angular port do SFC Vue `ArcanaSegmentedOptions`.
 *
 * Attribute selector num `<div>` (`<div arcanaSegmentedOptions>`): segmented control
 * de N opções. Reproduz `.arcana-segmented-options` (+ `is-compact`/`is-squared`/`is-disabled`),
 * cada `.arcana-segmented-options__option` (+ `is-active`), o `__radio`/`__icon` opcionais e o
 * `__empty`, idêntico ao Vue/React. Preserva o inline `--seg-active` e o `iconColor` por
 * opção (inline `color` no `<i>`, que vence o CSS inclusive na opção ativa).
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 */
export interface SegmentedOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  /** Classe do ícone (ex: FontAwesome `fa-solid fa-truck`). */
  icon?: string;
  /**
   * Cor do ícone desta opção. Qualquer string CSS válida (hex, rgb, `var(...)`).
   * Aplicada como inline style no `<i>`, então vence o CSS e permanece válida
   * inclusive quando a opção está ativa (fundo escuro/colorido). Sem valor, o
   * ícone herda a cor do texto do segmento.
   */
  iconColor?: string;
}

@Component({
  selector: "div[arcanaSegmentedOptions]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--seg-active]": "activeColor || null",
    "role": "radiogroup",
    "[attr.aria-label]": "ariaLabel || null"
  },
  template: `
    @for (opt of normalizedOptions; track opt.value) {
      <button
        type="button"
        class="arcana-segmented-options__option"
        [class.is-active]="opt.value === value"
        role="radio"
        [attr.aria-checked]="opt.value === value"
        [disabled]="disabled || opt.disabled"
        (click)="select(opt)"
      >
        @if (radio) {
          <span class="arcana-segmented-options__radio" aria-hidden="true"></span>
        }
        @if (opt.icon) {
          <i
            [class]="'arcana-segmented-options__icon ' + opt.icon"
            [style.color]="opt.iconColor || null"
          ></i>
        }
        <span>{{ opt.label }}</span>
      </button>
    }

    @if (!normalizedOptions.length) {
      <span class="arcana-segmented-options__empty">{{ emptyText }}</span>
    }
  `
})
export class ArcanaSegmentedOptionsComponent implements OnInit, OnChanges {
  @Input() value: string | number | null = null;
  @Input() options: SegmentedOption[] = [];
  @Input() disabled = false;
  @Input() compact = false;
  @Input() squared = false;
  @Input() activeColor = "";
  @Input() radio = false;
  @Input() autoSelectFirst = false;
  @Input() ariaLabel = "";
  @Input() emptyText = "Sem opções disponíveis";

  @Output() valueChange = new EventEmitter<string | number>();
  @Output() change = new EventEmitter<string | number>();

  get normalizedOptions(): SegmentedOption[] {
    return this.options ?? [];
  }

  get rootClass(): string {
    return [
      "arcana-segmented-options",
      this.compact ? "is-compact" : "",
      this.squared ? "is-squared" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  ngOnInit(): void {
    this.autoSelectDefault();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // `options` chega novo do backend → replica o watch(options) do SFC.
    if (changes["options"] && !changes["options"].firstChange) {
      this.autoSelectDefault();
    }
  }

  select(opt: SegmentedOption): void {
    if (this.disabled || opt.disabled || opt.value === this.value) return;
    this.valueChange.emit(opt.value);
    this.change.emit(opt.value);
  }

  private autoSelectDefault(): void {
    if (!this.autoSelectFirst || this.disabled) return;
    const hasValue = this.value !== null && this.value !== undefined && this.value !== "";
    if (hasValue) return;
    const first = this.normalizedOptions.find((o) => !o.disabled);
    if (!first) return;
    this.valueChange.emit(first.value);
    this.change.emit(first.value);
  }
}
