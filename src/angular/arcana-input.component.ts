import {
  ChangeDetectionStrategy, Component, ElementRef, EmbeddedViewRef, EventEmitter, Input,
  OnDestroy, OnInit, Output, Renderer2, TemplateRef, ViewContainerRef, inject
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
 * - slots `#icon-start`/`#icon-end` → `@Input() iconStart`/`iconEnd` (`TemplateRef`).
 *
 * Ícones: como o host é o próprio `<input>` (não dá pra ter filhos nem `<ng-content>`), o
 * selector é mantido (nada quebra) e, quando `iconStart`/`iconEnd` são passados, o directive
 * se auto-envolve num `.arcana-input-wrap` imperativamente e projeta os templates nos ícones.
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
  private readonly renderer = inject(Renderer2);
  private readonly vcr = inject(ViewContainerRef);
  private readonly iconViews: EmbeddedViewRef<unknown>[] = [];
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
  @Input() iconStart?: TemplateRef<unknown>;
  @Input() iconEnd?: TemplateRef<unknown>;
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
    if (this.iconStart || this.iconEnd) this.wrapWithIcons();
  }

  ngOnDestroy(): void {
    this.host.nativeElement.removeEventListener("change", this.onNativeChange);
    this.iconViews.forEach((v) => v.destroy());
  }

  get rootClass(): string {
    return [
      "arcana-input",
      `arcana-input--${this.size}`,
      this.disabled ? "arcana-input--disabled" : "",
      this.iconStart ? "arcana-input--icon-start" : "",
      this.iconEnd ? "arcana-input--icon-end" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  /**
   * Envolve o `<input>` host num `.arcana-input-wrap` e projeta os templates de ícone.
   * Feito imperativamente porque um directive sobre `<input>` não pode ter filhos nem
   * `<ng-content>` — mas assim o consumidor segue escrevendo `<input arcanaInput>` normal.
   */
  private wrapWithIcons(): void {
    const input = this.host.nativeElement;
    const parent = this.renderer.parentNode(input);
    const wrap = this.renderer.createElement("div") as HTMLElement;
    this.renderer.addClass(wrap, "arcana-input-wrap");
    this.renderer.addClass(wrap, `arcana-input-wrap--${this.size}`);
    // Coloca o wrapper onde o input estava e move o input pra dentro dele.
    this.renderer.insertBefore(parent, wrap, input);
    this.renderer.appendChild(wrap, input);

    if (this.iconStart) this.renderIcon(this.iconStart, "start", wrap, input);
    if (this.iconEnd) this.renderIcon(this.iconEnd, "end", wrap, null);
  }

  private renderIcon(
    tpl: TemplateRef<unknown>,
    side: "start" | "end",
    wrap: HTMLElement,
    before: HTMLElement | null
  ): void {
    const span = this.renderer.createElement("span") as HTMLElement;
    this.renderer.addClass(span, "arcana-input__icon");
    this.renderer.addClass(span, `arcana-input__icon--${side}`);

    const view = this.vcr.createEmbeddedView(tpl);
    view.detectChanges();
    // A view nasce ancorada na posição do directive; movemos os nós renderizados pro span.
    view.rootNodes.forEach((node: Node) => this.renderer.appendChild(span, node));
    this.iconViews.push(view);

    if (before) this.renderer.insertBefore(wrap, span, before);
    else this.renderer.appendChild(wrap, span);
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
