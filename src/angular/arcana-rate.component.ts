import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, inject
} from "@angular/core";

/**
 * `ArcanaRateComponent` — Angular port do SFC Vue `ArcanaRate`.
 *
 * Attribute selector num `<div>` (`<div arcanaRate>`): avaliação por estrelas.
 * Reproduz `.arcana-rate` (+ `--{size}`/`is-disabled`/`is-readonly`), cada
 * `.arcana-rate__item` com as duas camadas `__icon--void`/`__icon--filled` e o
 * `__text`/`__score`, idêntico ao Vue/React/Svelte. As cores vão como inline
 * custom properties (`--arcana-rate-color` / `--arcana-rate-void-color`); sem elas
 * valem os tokens da paleta, então o componente segue o acento e o modo escuro.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange` (suporta `[(value)]`);
 *   `emit('change')` → `@Output() change`
 *
 * Acessibilidade (mesma escolha do SFC): `role="radiogroup"` + `role="radio"` com
 * tabindex rotativo, e não `<input type="radio">` escondido — inputs reais exigiriam
 * `name` único por instância (colisão em listas), dobrariam de quantidade com
 * `allowHalf` e criariam N pontos de parada no Tab. Setas movem de um passo
 * (`allowHalf ? 0.5 : 1`), `Home`/`End` vão aos extremos, e o foco acompanha.
 */
export type RateSize = "sm" | "md" | "lg";

const STAR_PATH =
  "M12 2.6l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 16.93l-5.66 2.98 1.08-6.3-4.57-4.46 6.32-.92z";

@Component({
  selector: "div[arcanaRate]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--arcana-rate-color]": "color || null",
    "[style.--arcana-rate-void-color]": "voidColor || null",
    "role": "radiogroup",
    "[attr.aria-label]": "ariaLabel || null",
    "[attr.aria-disabled]": "disabled || null",
    "[attr.aria-readonly]": "readonly || null",
    "(keydown)": "onKeydown($event)"
  },
  template: `
    @for (index of stars; track index) {
      <span
        class="arcana-rate__item"
        role="radio"
        [attr.aria-checked]="isChecked(index)"
        [attr.aria-label]="itemLabel(index)"
        [attr.tabindex]="itemTabIndex(index)"
        (click)="onItemClick($event, index)"
        (mousemove)="onItemMove($event, index)"
        (mouseleave)="onLeave()"
      >
        <span class="arcana-rate__icon arcana-rate__icon--void" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false"><path [attr.d]="starPath"></path></svg>
        </span>
        <span
          class="arcana-rate__icon arcana-rate__icon--filled"
          [style.width.%]="fillPercent(index)"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" focusable="false"><path [attr.d]="starPath"></path></svg>
        </span>
      </span>
    }

    @if (showText) {
      <span class="arcana-rate__text">{{ currentText }}</span>
    } @else if (showScore) {
      <span class="arcana-rate__score">{{ scoreText }}</span>
    }
  `
})
export class ArcanaRateComponent {
  @Input() value = 0;
  @Input() max = 5;
  @Input() disabled = false;
  /** Desliga a interação mantendo o contraste cheio — modo "exibir média". */
  @Input() readonly = false;
  /** Meia estrela: clique/hover na metade esquerda vale `n - 0.5`; passo do teclado = `0.5`. */
  @Input() allowHalf = false;
  @Input() showText = false;
  /** Rótulo por nota — `texts[0]` é a nota 1, `texts[max - 1]` a nota `max`. */
  @Input() texts: string[] = [];
  /** Nota numérica. Mutuamente exclusivo com `showText`, que vence. */
  @Input() showScore = false;
  /**
   * `'sm' | 'md' | 'lg'` (default `'md'`). Cada dimensão é uma custom property com o
   * valor do size como fallback (`--arcana-rate-icon-size`, `--arcana-rate-gap`,
   * `--arcana-rate-font-size`).
   */
  @Input() size: RateSize = "md";
  /** Cor da estrela cheia. Default: token `--arcana-warning-solid`. */
  @Input() color = "";
  /** Cor da estrela vazia. Default: degrau 6 da escala neutra. */
  @Input() voidColor = "";
  @Input() ariaLabel = "";
  @Input() className = "";

  @Output() valueChange = new EventEmitter<number>();
  @Output() change = new EventEmitter<number>();

  /** Nota sob o cursor (preview). `null` = nenhum hover em curso. */
  private hoverValue: number | null = null;

  readonly starPath = STAR_PATH;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  get rootClass(): string {
    return [
      "arcana-rate",
      `arcana-rate--${this.size}`,
      this.disabled ? "is-disabled" : "",
      this.readonly ? "is-readonly" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  /** Índices 0-based das estrelas — a mesma lista nos 4 frameworks. */
  get stars(): number[] {
    return Array.from({ length: Math.max(0, Math.floor(this.max)) }, (_, i) => i);
  }

  /** Interação desligada por `disabled` OU `readonly`. */
  get isInert(): boolean {
    return this.disabled || this.readonly;
  }

  /** Passo do teclado e da granularidade do clique. */
  get step(): number {
    return this.allowHalf ? 0.5 : 1;
  }

  get safeValue(): number {
    const v = Number(this.value);
    if (!Number.isFinite(v)) return 0;
    return Math.min(Math.max(v, 0), this.max);
  }

  /** Nota efetivamente desenhada: o hover tem precedência sobre o valor. */
  get displayValue(): number {
    return this.hoverValue ?? this.safeValue;
  }

  get currentText(): string {
    const idx = Math.ceil(this.displayValue) - 1;
    return idx >= 0 ? (this.texts[idx] ?? "") : "";
  }

  get scoreText(): string {
    return this.allowHalf ? this.displayValue.toFixed(1) : String(this.displayValue);
  }

  /**
   * 0..100 — quanto da estrela `index` está preenchido. Arredondado a 2 casas porque o
   * valor vai para o `style` inline e `(4.3 - 4) * 100` em ponto flutuante daria
   * `30.000000000000027%`.
   */
  fillPercent(index: number): number {
    return Math.round(Math.min(Math.max((this.displayValue - index) * 100, 0), 100) * 100) / 100;
  }

  /**
   * Só UMA estrela fica `aria-checked` (é um radiogroup): a que CONTÉM a nota.
   * Com nota `0` nenhuma fica marcada; com `3.5` é a quarta (`ceil(3.5) = 4`).
   */
  isChecked(index: number): boolean {
    return Math.ceil(this.safeValue) === index + 1;
  }

  itemLabel(index: number): string {
    return this.texts[index] || String(index + 1);
  }

  /** Roving tabindex: um único ponto de parada no Tab. */
  itemTabIndex(index: number): number {
    if (this.isInert) return -1;
    const focusIndex = this.safeValue > 0 ? Math.ceil(this.safeValue) - 1 : 0;
    return index === focusIndex ? 0 : -1;
  }

  onItemClick(event: MouseEvent, index: number): void {
    if (this.isInert) return;
    this.setValue(this.valueFromPointer(event, index));
  }

  onItemMove(event: MouseEvent, index: number): void {
    if (this.isInert) return;
    this.hoverValue = this.valueFromPointer(event, index);
  }

  onLeave(): void {
    this.hoverValue = null;
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.isInert) return;

    const current = this.safeValue;
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      next = Math.min(this.max, current + this.step);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      next = Math.max(0, current - this.step);
    } else if (event.key === "Home") {
      next = this.step;
    } else if (event.key === "End") {
      next = this.max;
    }

    if (next === null) return;
    event.preventDefault();
    this.setValue(next);
    this.focusStar(next);
  }

  /** Nota apontada pelo cursor: metade esquerda vale `n - 0.5` quando `allowHalf`. */
  private valueFromPointer(event: MouseEvent, index: number): number {
    if (!this.allowHalf) return index + 1;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    if (!rect.width) return index + 1;
    return event.clientX - rect.left < rect.width / 2 ? index + 0.5 : index + 1;
  }

  /** Move o foco para a estrela que passou a conter a nota (roving tabindex). */
  private focusStar(value: number): void {
    const items = this.host.nativeElement.querySelectorAll<HTMLElement>(".arcana-rate__item");
    const target = items[Math.max(0, Math.ceil(value) - 1)];
    if (target) target.focus();
  }

  private setValue(value: number): void {
    if (this.isInert || value === this.safeValue) return;
    this.hoverValue = null;
    this.valueChange.emit(value);
    this.change.emit(value);
  }
}
