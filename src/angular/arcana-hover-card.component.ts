import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef,
  ViewChild, ViewContainerRef, inject
} from "@angular/core";
import { placeHoverCard, resolveHoverCardPlacement } from "../core/hover-card";
import type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "../core/hover-card";

/**
 * `ArcanaHoverCardComponent` — Angular port do SFC Vue `ArcanaHoverCard`.
 *
 * Attribute selector num `<span>` (`<span arcanaHoverCard>`): cartão de preview
 * que abre ao passar o mouse pelo gatilho (e ao focá-lo pelo teclado). Emite o
 * MESMO markup e as MESMAS classes do Vue/React/Svelte — `.arcana-hover-card` no
 * host, `.arcana-hover-card__trigger` e o `.arcana-hover-card__panel`
 * TELEPORTADO pro `<body>` (+ `--{side}` efetivo).
 *
 * Portal (sem deps novas — NÃO usa CDK Overlay): o cartão vive num
 * `<ng-template>`; ao abrir criamos um `EmbeddedViewRef` via `ViewContainerRef` e
 * movemos seu root pro `document.body` (mesma ideia do `ArcanaDropdown`/
 * `ArcanaTreeSelect`). Posicionamento por `placeHoverCard` (`core/hover-card`,
 * que estende o `placePanel`), com flip automático quando não cabe do lado pedido.
 *
 * Vue → Angular:
 * - slot `trigger` → `<ng-content select="[arcanaHoverCardTrigger]">`;
 * - slot default (conteúdo do cartão) → `<ng-content>`;
 * - `emit('open-change')` → `@Output() openChange`.
 *
 * Acessibilidade: o gatilho recebe `aria-describedby` apontando pro cartão
 * enquanto ele está aberto e o cartão é `role="tooltip"` — NÃO recebe foco (é
 * hover, não popover modal). `Escape` fecha. Ponha um elemento naturalmente
 * focável (link/botão) no gatilho pra que a abertura por teclado funcione.
 *
 * @example
 * <span arcanaHoverCard side="top" align="start">
 *   <a arcanaHoverCardTrigger href="/perfil">@arcana</a>
 *   <p class="arcana-hover-card__title">Arcana Labs</p>
 * </span>
 */

/** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 280, height: 120 };

let panelIdSeq = 0;

@Component({
  selector: "span[arcanaHoverCard]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass"
  },
  template: `
    <span
      #triggerEl
      class="arcana-hover-card__trigger"
      [attr.aria-describedby]="isOpen ? panelId : null"
      (mouseenter)="onTriggerEnter()"
      (mouseleave)="scheduleClose()"
      (focusin)="onTriggerFocusIn()"
      (focusout)="onTriggerFocusOut($event)"
    >
      <ng-content select="[arcanaHoverCardTrigger]"></ng-content>
    </span>

    <!--
      Cartão teleportado pro <body> (position: fixed via placeHoverCard) pra
      escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
    -->
    <ng-template #panelTpl>
      <div
        [id]="panelId"
        [class]="panelClasses"
        [style]="panelStyle"
        role="tooltip"
        (mouseenter)="cancelClose()"
        (mouseleave)="scheduleClose()"
        (focusin)="cancelClose()"
        (focusout)="scheduleClose()"
      >
        <ng-content></ng-content>
      </div>
    </ng-template>
  `
})
export class ArcanaHoverCardComponent implements OnChanges, OnDestroy {
  /** ms até abrir depois do `mouseenter` (o foco por teclado abre na hora). Default `300`. */
  @Input() openDelay = 300;
  /**
   * ms de **carência** antes de fechar (default `150`). É essa carência que
   * permite ir do gatilho ATÉ o cartão sem ele fechar: o `mouseenter` do painel
   * cancela o timer agendado pelo `mouseleave` do gatilho.
   */
  @Input() closeDelay = 150;
  @Input() side: HoverCardSide = "bottom";
  @Input() align: HoverCardAlign = "center";
  /** Atalho `'{side}-{align}'` (ex: `'bottom-start'`); vence `side`/`align`. */
  @Input() placement?: HoverCardPlacement;
  /** Distância entre gatilho e cartão em px. Default `8`. */
  @Input() offset = 8;
  @Input() disabled = false;
  /**
   * Classe extra no cartão. Como ele é teleportado pro `<body>`, um seletor no
   * host não o alcança — é assim que se tematiza uma instância (mesmo contrato
   * do `panelClass` do `ArcanaTreeSelect`).
   */
  @Input() panelClass?: string;

  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild("panelTpl") panelTpl?: TemplateRef<unknown>;
  @ViewChild("triggerEl") triggerRef?: ElementRef<HTMLElement>;

  isOpen = false;
  panelStyle = "";
  resolvedSide: HoverCardSide = "bottom";
  readonly panelId = `arcana-hover-card-${++panelIdSeq}`;

  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  private embeddedView?: EmbeddedViewRef<unknown>;
  private panelEl?: HTMLElement;
  private openTimer?: ReturnType<typeof setTimeout>;
  private closeTimer?: ReturnType<typeof setTimeout>;

  get rootClass(): string {
    return [
      "arcana-hover-card",
      this.isOpen ? "is-open" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  get panelClasses(): string {
    return [
      "arcana-hover-card__panel",
      `arcana-hover-card__panel--${this.resolvedSide}`,
      this.panelClass
    ].filter(Boolean).join(" ");
  }

  /* ─────────────────────── eventos do gatilho ──────────────────────────────── */

  onTriggerEnter(): void {
    this.scheduleOpen(this.openDelay);
  }

  /** Teclado não tem "trajeto do mouse": abrir com atraso só atrapalharia. */
  onTriggerFocusIn(): void {
    this.scheduleOpen(0);
  }

  onTriggerFocusOut(event: FocusEvent): void {
    // Foco que caminhou PRA DENTRO do cartão (link no conteúdo) não fecha.
    const next = event.relatedTarget as Node | null;
    if (next && this.panelEl?.contains(next)) return;
    this.scheduleClose();
  }

  /* ─────────────────────── agendamento ─────────────────────────────────────── */

  scheduleOpen(delay: number): void {
    this.cancelClose();
    if (this.disabled || this.isOpen) return;
    this.clearOpenTimer();
    if (delay <= 0) {
      this.open();
      return;
    }
    this.openTimer = setTimeout(() => {
      this.openTimer = undefined;
      this.open();
    }, delay);
  }

  scheduleClose(): void {
    this.clearOpenTimer();
    if (!this.isOpen || this.closeTimer) return;
    this.closeTimer = setTimeout(() => {
      this.closeTimer = undefined;
      this.close();
    }, this.closeDelay);
  }

  /**
   * O ponto que costuma quebrar num hover card: ao sair do gatilho rumo ao
   * cartão, o `mouseleave` do gatilho já agendou o fechamento. O `mouseenter` do
   * cartão (dentro da carência de `closeDelay`) CANCELA esse timer.
   */
  cancelClose(): void {
    if (!this.closeTimer) return;
    clearTimeout(this.closeTimer);
    this.closeTimer = undefined;
  }

  private clearOpenTimer(): void {
    if (!this.openTimer) return;
    clearTimeout(this.openTimer);
    this.openTimer = undefined;
  }

  /* ─────────────────────── abertura / fechamento ───────────────────────────── */

  open(): void {
    if (this.disabled || this.isOpen || !this.panelTpl) return;

    // Pré-posiciona com a estimativa pra que o cartão já monte perto do lugar
    // final (medir depois de montado devolve o tamanho real).
    const rect = this.triggerRef?.nativeElement.getBoundingClientRect();
    if (rect) this.applyPlacement(rect, PANEL_ESTIMATE);

    this.isOpen = true;
    this.embeddedView = this.vcr.createEmbeddedView(this.panelTpl);
    this.embeddedView.detectChanges();
    this.panelEl = this.embeddedView.rootNodes[0] as HTMLElement;
    document.body.appendChild(this.panelEl);
    this.attachListeners();
    this.openChange.emit(true);

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

  close(): void {
    this.clearOpenTimer();
    this.cancelClose();
    if (!this.isOpen) return;
    this.isOpen = false;
    this.detachListeners();
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
    this.panelEl = undefined;
    this.openChange.emit(false);
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // `disabled` ligado no meio do caminho fecha o que estiver aberto.
    if (changes["disabled"] && this.disabled) this.close();
  }

  ngOnDestroy(): void {
    this.clearOpenTimer();
    this.cancelClose();
    this.detachListeners();
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
    this.panelEl = undefined;
  }

  /* ─────────────────────── posicionamento ──────────────────────────────────── */

  private applyPlacement(rect: DOMRect, panel: { width: number; height: number }): void {
    const parts = resolveHoverCardPlacement(this.placement, this.side, this.align);
    const place = placeHoverCard(
      rect,
      panel,
      { width: window.innerWidth, height: window.innerHeight },
      { ...parts, gap: this.offset }
    );
    this.resolvedSide = place.side;
    this.panelStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px;`;
  }

  private reposition(): void {
    const trigger = this.triggerRef?.nativeElement;
    if (!trigger) return;
    this.applyPlacement(trigger.getBoundingClientRect(), {
      width: this.panelEl?.offsetWidth || PANEL_ESTIMATE.width,
      height: this.panelEl?.offsetHeight || PANEL_ESTIMATE.height
    });
    // O cartão vive fora da árvore de CD do host — re-renderiza na mão.
    this.embeddedView?.detectChanges();
  }

  /* ─────────────────────── listeners globais ───────────────────────────────── */

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.close();
      this.cdr.markForCheck();
    }
  };

  private readonly onScroll = (event: Event): void => {
    // Rolagem DENTRO do cartão não o desloca.
    if (event.target instanceof Node && this.panelEl?.contains(event.target)) return;
    this.reposition();
  };

  private readonly onResize = (): void => {
    this.reposition();
  };

  private attachListeners(): void {
    document.addEventListener("keydown", this.onKeydown);
    window.addEventListener("scroll", this.onScroll, true);
    window.addEventListener("resize", this.onResize);
  }

  private detachListeners(): void {
    document.removeEventListener("keydown", this.onKeydown);
    window.removeEventListener("scroll", this.onScroll, true);
    window.removeEventListener("resize", this.onResize);
  }
}
