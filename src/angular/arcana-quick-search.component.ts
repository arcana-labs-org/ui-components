import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef,
  ViewChild, ViewContainerRef, inject
} from "@angular/core";
import { placeHoverCard } from "../core/hover-card";

/** Contador de instâncias pra gerar um `id` determinístico (sem `Math.random`) usado
 *  no `aria-describedby` do input e no `id` do balão de dica. */
let uid = 0;

/** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
const HINT_ESTIMATE = { width: 200, height: 80 };

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
 *     .arcana-quick-search__icon         lupa
 *     .arcana-quick-search__input
 *     .arcana-quick-search__clear        botão de limpar
 *     .arcana-quick-search__counter      contador opcional de resultados
 *       .arcana-quick-search__counter-value
 *       .arcana-quick-search__counter-unit
 *   .arcana-quick-search__hint           balão da dica (`role="tooltip"`), TELEPORTADO pro
 *                                         `<body>` e posicionado com `position: fixed` via JS
 *                                         (`core/hover-card`, mesma técnica do ArcanaTooltip) —
 *                                         escapa de qualquer ancestral com `overflow: hidden`.
 *                                         Montado/desmontado no hover/foco do gatilho, não por
 *                                         CSS `:hover`.
 *     .arcana-quick-search__hint-label
 *     .arcana-quick-search__hint-list
 *       .arcana-quick-search__hint-item
 *
 * Portal (sem deps novas — NÃO usa CDK Overlay): o balão vive num `<ng-template #hintTpl>`;
 * ao abrir criamos um `EmbeddedViewRef` via `ViewContainerRef` e movemos seu root pro
 * `document.body` (mesma técnica do `ArcanaTooltipComponent`). Posicionamento por
 * `placeHoverCard` (`core/hover-card`), reajustado em scroll (capture)/resize e destruído
 * (`embeddedView.destroy()`) ao fechar — como o balão vive fora da árvore de CD do host,
 * `embeddedView.detectChanges()` é chamado na mão após reposicionar, e `cdr.markForCheck()`
 * nas mudanças de estado (`OnPush`).
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `@Input() value` + `@Output() valueChange` (dispara a cada
 *   digitação); sem `value` informado, mantém buffer interno (funciona não-controlado também)
 * - `emit('search', value)` / `emit('clear')` → `@Output() search` / `@Output() clear`
 * - `ref="infoRef"` / `ref="hintRef"` + `Teleport to="body"` → `#infoRef` (`ViewChild`) +
 *   `<ng-template #hintTpl>` teleportado na mão via `ViewContainerRef.createEmbeddedView` +
 *   `document.body.appendChild` (ver seção "Portal" acima)
 * - `data.hintOpen` / `methods.openHint`/`closeHint`/`repositionHint` → mesmos nomes em
 *   camelCase Angular (`hintOpen`, `openHint()`/`closeHint()`/`reposition()`)
 * - `watch.searchFields` (fecha o hint quando `searchFields` esvazia com o hint aberto) →
 *   mesma checagem em `ngOnChanges` (gateada em `changes["searchFields"]`)
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
      <div
        #infoRef
        class="arcana-quick-search__info"
        role="button"
        tabindex="0"
        (mouseenter)="openHint()"
        (mouseleave)="closeHint()"
        (focusin)="openHint()"
        (focusout)="closeHint()"
      >
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
      </div>
    }

    <!--
      Balão teleportado pro <body> (position: fixed via placeHoverCard) pra
      escapar de qualquer ancestral com overflow:hidden / z-index restritivo —
      mesma técnica do ArcanaTooltipComponent.
    -->
    <ng-template #hintTpl>
      <div [id]="hintId" class="arcana-quick-search__hint" [style]="hintStyle" role="tooltip">
        <span class="arcana-quick-search__hint-label">{{ fieldsLabel }}</span>
        <ul class="arcana-quick-search__hint-list">
          @for (field of searchFields; track field) {
            <li class="arcana-quick-search__hint-item">{{ field }}</li>
          }
        </ul>
      </div>
    </ng-template>

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
      [attr.aria-describedby]="hintOpen ? hintId : null"
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
export class ArcanaQuickSearchComponent implements OnChanges, OnDestroy {
  @ViewChild("input") private readonly inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild("infoRef") private readonly infoRef?: ElementRef<HTMLElement>;
  @ViewChild("hintTpl") private readonly hintTpl?: TemplateRef<unknown>;

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

  hintOpen = false;
  hintStyle = "";

  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  private embeddedView?: EmbeddedViewRef<unknown>;
  private panelEl?: HTMLElement;

  ngOnChanges(changes: SimpleChanges): void {
    // Mantém o buffer local sincronizado quando o consumidor controla `value`
    // externamente (ex.: reset feito pelo pai via input, não pelo método `reset()`). Gateado em
    // `changes["value"]` (não em qualquer `@Input`) pra não sobrescrever o texto em digitação
    // quando outro input (ex.: `counter`, `searchFields`) muda em modo não-controlado.
    if (changes["value"] && this.value !== this.text) this.text = this.value;

    // Se o pai encolher `searchFields` pra `[]` enquanto o hint está aberto, o gatilho
    // `.info` desmonta (`@if (searchFields.length)`) sem disparar `mouseleave`/`focusout` —
    // sem isso o balão e os listeners globais ficam órfãos (painel preso na tela,
    // `keydown`/`scroll`/`resize` vazando).
    if (changes["searchFields"] && !this.searchFields.length && this.hintOpen) this.closeHint();
  }

  ngOnDestroy(): void {
    this.detachHintListeners();
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
    this.panelEl = undefined;
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

  /* ─────────────────────── dica: abertura / fechamento ─────────────────────── */

  openHint(): void {
    if (!this.searchFields.length || this.hintOpen || !this.hintTpl) return;

    // Pré-posiciona com a estimativa pra que o balão já monte perto do lugar
    // final (medir depois de montado devolve o tamanho real).
    const rect = this.infoRef?.nativeElement.getBoundingClientRect();
    if (rect) this.applyPlacement(rect, HINT_ESTIMATE);

    this.hintOpen = true;
    this.embeddedView = this.vcr.createEmbeddedView(this.hintTpl);
    this.embeddedView.detectChanges();
    this.panelEl = this.embeddedView.rootNodes[0] as HTMLElement;
    document.body.appendChild(this.panelEl);
    this.attachHintListeners();

    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => {
        this.reposition();
        this.cdr.markForCheck();
      });
    } else {
      this.reposition();
    }
    this.cdr.markForCheck();
  }

  closeHint(): void {
    if (!this.hintOpen) return;
    this.hintOpen = false;
    this.detachHintListeners();
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
    this.panelEl = undefined;
    this.cdr.markForCheck();
  }

  /* ─────────────────────── dica: posicionamento ─────────────────────────────── */

  private applyPlacement(rect: DOMRect, panel: { width: number; height: number }): void {
    const place = placeHoverCard(
      rect,
      panel,
      { width: window.innerWidth, height: window.innerHeight },
      { side: "top", align: "center", gap: 8 }
    );
    this.hintStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px;`;
  }

  private reposition(): void {
    const info = this.infoRef?.nativeElement;
    if (!info) return;
    this.applyPlacement(info.getBoundingClientRect(), {
      width: this.panelEl?.offsetWidth || HINT_ESTIMATE.width,
      height: this.panelEl?.offsetHeight || HINT_ESTIMATE.height
    });
    // O balão vive fora da árvore de CD do host — re-renderiza na mão.
    this.embeddedView?.detectChanges();
  }

  /* ─────────────────────── dica: listeners globais ─────────────────────────── */

  private readonly onHintKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") this.closeHint();
  };

  private readonly onHintWindowScroll = (): void => {
    this.reposition();
  };

  private readonly onHintWindowResize = (): void => {
    this.reposition();
  };

  private attachHintListeners(): void {
    document.addEventListener("keydown", this.onHintKeydown);
    window.addEventListener("scroll", this.onHintWindowScroll, true);
    window.addEventListener("resize", this.onHintWindowResize);
  }

  private detachHintListeners(): void {
    document.removeEventListener("keydown", this.onHintKeydown);
    window.removeEventListener("scroll", this.onHintWindowScroll, true);
    window.removeEventListener("resize", this.onHintWindowResize);
  }
}
