import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit,
  Output, SimpleChanges
} from "@angular/core";

/**
 * `ShadcnSegmentedOptionsComponent` — Angular port do SFC Vue `ShadcnSegmentedOptions`.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnSegmentedOptions>`): segmented control
 * de N opções. Reproduz `.shadcn-segmented-options` (+ `is-compact`/`is-squared`/`is-disabled`),
 * cada `.shadcn-segmented-options__option` (+ `is-active`), o `__radio`/`__icon` opcionais e o
 * `__empty`, idêntico ao Vue/React. Preserva o inline `--seg-active`.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 */
export interface SegmentedOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: string;
}

@Component({
  selector: "div[arcanaShadcnSegmentedOptions]",
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
        class="shadcn-segmented-options__option"
        [class.is-active]="opt.value === value"
        role="radio"
        [attr.aria-checked]="opt.value === value"
        [disabled]="disabled || opt.disabled"
        (click)="select(opt)"
      >
        @if (radio) {
          <span class="shadcn-segmented-options__radio" aria-hidden="true"></span>
        }
        @if (opt.icon) {
          <i [class]="'shadcn-segmented-options__icon ' + opt.icon"></i>
        }
        <span>{{ opt.label }}</span>
      </button>
    }

    @if (!normalizedOptions.length) {
      <span class="shadcn-segmented-options__empty">{{ emptyText }}</span>
    }
  `
})
export class ShadcnSegmentedOptionsComponent implements OnInit, OnChanges {
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
      "shadcn-segmented-options",
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
