import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit,
  Output, SimpleChanges
} from "@angular/core";

/**
 * `ArcanaSegmentedControlComponent` — Angular port do SFC Vue `ArcanaSegmentedControl`.
 *
 * Attribute selector num `<div>` (`<div arcanaSegmentedControl>`): segmented control
 * de N opções. Reproduz `.arcana-segmented-control` (+ `--{size}`/`is-compact`/`is-squared`/
 * `is-disabled`), cada `.arcana-segmented-control__option` (+ `is-active`), o `__radio`/`__icon`
 * opcionais e o `__empty`, idêntico ao Vue/React. Preserva o inline `--seg-active` e o
 * `iconColor` por opção (inline `color` no `<i>`, que vence o CSS inclusive na opção ativa).
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 *
 * Modo só-ícone: opção com `label` vazio/ausente renderiza só o `<i>` — o `<span>` de texto
 * não é emitido (nada de span vazio comendo o `gap`) e o botão ganha
 * `.arcana-segmented-control__option--icon-only` (gap zerado + padding simétrico pelos tokens
 * do `size`). Como o `<i>` é `aria-hidden`, quem nomeia o botão é o `ariaLabel` da opção.
 */
export interface SegmentedOption {
  /**
   * Rótulo visível do segmento. Vazio (`""`) ou ausente ativa o modo **só-ícone**:
   * o `<span>` de texto nem é renderizado e o botão recebe a classe
   * `arcana-segmented-control__option--icon-only`. Nesse modo, informe `ariaLabel`
   * — o ícone é `aria-hidden`, então sem ele o botão fica sem nome acessível.
   */
  label?: string;
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
  /**
   * Nome acessível do botão desta opção (`aria-label`). O nome final é
   * `ariaLabel || label`; com os dois vazios o atributo não é emitido.
   * Indispensável no modo só-ícone; com `label` presente é opcional.
   * No modo só-ícone vira também o `title` (tooltip nativa).
   */
  ariaLabel?: string;
}

export type SegmentedControlSize = "sm" | "md" | "lg" | "xl";

@Component({
  selector: "div[arcanaSegmentedControl]",
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
        class="arcana-segmented-control__option"
        [class.is-active]="opt.value === value"
        [class.arcana-segmented-control__option--icon-only]="!hasLabel(opt)"
        role="radio"
        [attr.aria-checked]="opt.value === value"
        [attr.aria-label]="optionName(opt) || null"
        [attr.title]="optionTitle(opt)"
        [disabled]="disabled || opt.disabled"
        (click)="select(opt)"
      >
        @if (radio) {
          <span class="arcana-segmented-control__radio" aria-hidden="true"></span>
        }
        @if (opt.icon) {
          <i
            [class]="'arcana-segmented-control__icon ' + opt.icon"
            [style.color]="opt.iconColor || null"
            aria-hidden="true"
          ></i>
        }
        @if (hasLabel(opt)) {
          <span>{{ opt.label }}</span>
        }
      </button>
    }

    @if (!normalizedOptions.length) {
      <span class="arcana-segmented-control__empty">{{ emptyText }}</span>
    }
  `
})
export class ArcanaSegmentedControlComponent implements OnInit, OnChanges {
  @Input() value: string | number | null = null;
  @Input() options: SegmentedOption[] = [];
  @Input() disabled = false;
  /**
   * Altura/padding/fonte/ícone do controle. Default `'md'` (tamanho histórico do
   * componente); `'sm'` equivale ao antigo `compact`, `'lg'`/`'xl'` são maiores.
   * Cada dimensão é uma custom property CSS com o valor do size como fallback
   * (`--arcana-segmented-control-height`, `--arcana-segmented-control-font-size`,
   * `--arcana-segmented-control-padding-x`, `--arcana-segmented-control-icon-size`,
   * `--arcana-segmented-control-padding`).
   */
  @Input() size?: SegmentedControlSize;
  /**
   * @deprecated Use `size="sm"`. Mantido por compatibilidade — só tem efeito quando
   * `size` não é informado.
   */
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

  /** `false` quando o `label` é vazio/ausente → modo só-ícone (span de texto nem sai). */
  hasLabel(opt: SegmentedOption): boolean {
    return (opt.label ?? "") !== "";
  }

  /** Nome acessível do botão: `ariaLabel` da opção, com fallback no `label` visível. */
  optionName(opt: SegmentedOption): string {
    return opt.ariaLabel || opt.label || "";
  }

  /** Tooltip nativa só no modo só-ícone (com `label` visível seria ruído). */
  optionTitle(opt: SegmentedOption): string | null {
    if (this.hasLabel(opt)) return null;
    return this.optionName(opt) || null;
  }

  /** `size` explícito vence; sem ele, o `compact` legado mapeia pra `sm`. */
  get effectiveSize(): SegmentedControlSize {
    return this.size ?? (this.compact ? "sm" : "md");
  }

  get rootClass(): string {
    return [
      "arcana-segmented-control",
      `arcana-segmented-control--${this.effectiveSize}`,
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
