import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy,
  OnInit, Output, inject
} from "@angular/core";

/**
 * `ArcanaInputComponent` — Angular port do SFC Vue `ArcanaInput`.
 *
 * Attribute selector num `<input>` (`<input arcanaInput>`): o host É o próprio
 * `<input class="arcana-input arcana-input--${size}">`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange` (dispara a cada digitação)
 * - `emit('change')` (evento nativo, blur/enter) → `@Output() change` (valor parseado)
 * - `blur`/`focus`/`keydown`/`keyup`: como o host é o próprio `<input>`, os eventos nativos
 *   já ficam disponíveis no elemento — basta o consumidor bindar `(blur)`/`(focus)`/etc.
 *
 * Para `type="number"`, string vazia → null e valor válido → number (mesmo `parseValue`).
 */
@Component({
  selector: "input[arcanaInput]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[attr.type]": "type",
    "[value]": "value ?? ''",
    "[attr.placeholder]": "placeholder || null",
    "[disabled]": "disabled",
    "[attr.readonly]": "readonly ? '' : null",
    "[attr.min]": "min ?? null",
    "[attr.max]": "max ?? null",
    "[attr.step]": "step ?? null",
    "[attr.maxlength]": "maxlength ?? null",
    "[attr.autocomplete]": "autocomplete ?? null",
    "[attr.name]": "name ?? null",
    "(input)": "onInput($event)"
  },
  template: ""
})
export class ArcanaInputComponent implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly onNativeChange = (ev: Event) =>
    this.change.emit(this.parseValue((ev.target as HTMLInputElement).value));

  @Input() value: string | number | null = "";
  @Input() type = "text";
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() min?: string | number;
  @Input() max?: string | number;
  @Input() step?: string | number;
  @Input() maxlength?: string | number;
  @Input() autocomplete?: string;
  @Input() name?: string;
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() className = "";

  @Output() valueChange = new EventEmitter<string | number | null>();
  /**
   * Evento `change` NATIVO (dispara em blur/enter) com o valor parseado. Ligado via
   * `addEventListener` imperativo (não via host `(change)`) pra não colidir com o próprio
   * `@Output() change` — o que causaria recursão infinita.
   */
  @Output() change = new EventEmitter<string | number | null>();

  ngOnInit(): void {
    this.host.nativeElement.addEventListener("change", this.onNativeChange);
  }

  ngOnDestroy(): void {
    this.host.nativeElement.removeEventListener("change", this.onNativeChange);
  }

  get rootClass(): string {
    return [
      "arcana-input",
      `arcana-input--${this.size}`,
      this.disabled ? "arcana-input--disabled" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  private parseValue(raw: string): string | number | null {
    if (this.type !== "number") return raw;
    if (raw === "" || raw === null || raw === undefined) return null;
    const n = Number(raw);
    return Number.isNaN(n) ? raw : n;
  }

  onInput(ev: Event): void {
    this.valueChange.emit(this.parseValue((ev.target as HTMLInputElement).value));
  }
}
