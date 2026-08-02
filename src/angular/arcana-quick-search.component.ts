import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild
} from "@angular/core";

/** Contador de instâncias pra gerar um `id` determinístico (sem `Math.random`) usado
 *  no `aria-describedby` do input e no `id` do balão de dica. */
let uid = 0;

/**
 * `ArcanaQuickSearchComponent` — Angular port do SFC Vue `ArcanaQuickSearch`.
 *
 * Attribute selector num `<div>` (`<div arcanaQuickSearch>`): campo de busca compacto
 * com dica dos campos pesquisáveis e contador opcional de resultados. Reproduz
 * `.arcana-quick-search` (+ `is-disabled`/`has-counter`), o `__info`/`__hint` (só quando
 * `searchFields.length`), o `__icon`, o `__input`, o `__clear` e o `__counter` (só quando
 * `counter != null`), idêntico ao Vue/React.
 *
 * Anatomia:
 *   .arcana-quick-search                 wrapper do campo (borda + foco via `:focus-within`)
 *     .arcana-quick-search__info         gatilho da dica (`role="button"`, abre no hover/foco)
 *       .arcana-quick-search__info-icon
 *       .arcana-quick-search__hint       balão da dica (`role="tooltip"`)
 *         .arcana-quick-search__hint-label
 *         .arcana-quick-search__hint-list
 *           .arcana-quick-search__hint-item
 *     .arcana-quick-search__icon         lupa
 *     .arcana-quick-search__input
 *     .arcana-quick-search__clear        botão de limpar
 *     .arcana-quick-search__counter      contador opcional de resultados
 *       .arcana-quick-search__counter-value
 *       .arcana-quick-search__counter-unit
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `@Input() value` + `@Output() valueChange` (dispara a cada
 *   digitação); sem `value` informado, mantém buffer interno (funciona não-controlado também)
 * - `emit('search', value)` / `emit('clear')` → `@Output() search` / `@Output() clear`
 * - métodos `reset()`/`focus()` (via `ref` no Vue) → métodos públicos desta classe, chamáveis
 *   via `@ViewChild(ArcanaQuickSearchComponent)` no host
 * - `uid` (contador módulo) do Vue → mesmo padrão (contador módulo local)
 */
@Component({
  selector: "div[arcanaQuickSearch]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "class": "arcana-quick-search",
    "[class.is-disabled]": "disabled",
    "[class.has-counter]": "counter !== null && counter !== undefined"
  },
  template: `
    @if (searchFields.length) {
      <div class="arcana-quick-search__info" role="button" tabindex="0">
        <svg
          class="arcana-quick-search__info-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <div [id]="hintId" class="arcana-quick-search__hint" role="tooltip">
          <span class="arcana-quick-search__hint-label">{{ fieldsLabel }}</span>
          <ul class="arcana-quick-search__hint-list">
            @for (field of searchFields; track field) {
              <li class="arcana-quick-search__hint-item">{{ field }}</li>
            }
          </ul>
        </div>
      </div>
    }

    <svg
      class="arcana-quick-search__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>

    <input
      #input
      class="arcana-quick-search__input"
      type="text"
      [value]="text"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [attr.aria-describedby]="searchFields.length ? hintId : null"
      (input)="onInput($event)"
      (keyup.enter)="emitSearch()"
    />

    <button
      type="button"
      class="arcana-quick-search__clear"
      [attr.aria-label]="clearLabel"
      [title]="clearLabel"
      (click)="onClear()"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    </button>

    @if (counter !== null && counter !== undefined) {
      <div class="arcana-quick-search__counter">
        <span class="arcana-quick-search__counter-value">{{ counter }}</span>
        @if (!hideUnit) {
          <span class="arcana-quick-search__counter-unit">{{ unit }}</span>
        }
      </div>
    }
  `
})
export class ArcanaQuickSearchComponent implements OnChanges {
  @ViewChild("input") private readonly inputRef?: ElementRef<HTMLInputElement>;

  @Input() value = "";
  @Input() placeholder = "";
  @Input() searchFields: string[] = [];
  @Input() fieldsLabel = "Campos pesquisáveis:";
  @Input() counter: number | string | null = null;
  @Input() unit = "registro(s)";
  @Input() hideUnit = false;
  @Input() disabled = false;
  @Input() clearLabel = "Limpar busca";

  @Output() valueChange = new EventEmitter<string>();
  /** Ao pressionar Enter, ou ao limpar (com `''`). */
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  text = this.value;
  readonly hintId = `arcana-qs-${++uid}`;

  ngOnChanges(): void {
    // Mantém o buffer local sincronizado quando o consumidor controla `value`
    // externamente (ex.: reset feito pelo pai via input, não pelo método `reset()`).
    if (this.value !== this.text) this.text = this.value;
  }

  onInput(ev: Event): void {
    this.text = (ev.target as HTMLInputElement).value;
    this.valueChange.emit(this.text);
  }

  emitSearch(): void {
    this.search.emit(this.text);
  }

  onClear(): void {
    this.text = "";
    this.valueChange.emit("");
    this.clear.emit();
    this.emitSearch();
  }

  /** Zera o texto sem emitir `search` (só `valueChange`). */
  reset(): void {
    this.text = "";
    this.valueChange.emit("");
  }

  /** Foca o `<input>`. */
  focus(): void {
    this.inputRef?.nativeElement.focus();
  }
}
