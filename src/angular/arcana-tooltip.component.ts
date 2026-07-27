import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef,
  ViewChild, ViewContainerRef, inject
} from "@angular/core";
import { placeHoverCard, resolveHoverCardPlacement } from "../core/hover-card";
import type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "../core/hover-card";

/**
 * `ArcanaTooltipComponent` — Angular port do SFC Vue `ArcanaTooltip`.
 *
 * Attribute selector num `<span>` (`<span arcanaTooltip>`): balão de texto curto
 * que abre ao passar o mouse pelo gatilho (e ao focá-lo pelo teclado). Versão
 * enxuta e opinativa do `ArcanaHoverCard` — conteúdo textual, balão escuro com
 * setinha e nunca interativo. Emite o MESMO markup e as MESMAS classes do
 * Vue/React/Svelte — `.arcana-tooltip` no host, `.arcana-tooltip__trigger` e o
 * `.arcana-tooltip__panel` TELEPORTADO pro `<body>` (+ `--{side}` efetivo, seta).
 *
 * Portal (sem deps novas — NÃO usa CDK Overlay): o balão vive num `<ng-template>`;
 * ao abrir criamos um `EmbeddedViewRef` via `ViewContainerRef` e movemos seu root
 * pro `document.body` (mesma técnica do `ArcanaHoverCard`). Posicionamento por
 * `placeHoverCard` (`core/hover-card`), com flip automático quando não cabe.
 *
 * Vue → Angular:
 * - slot `trigger` → `<ng-content select="[arcanaTooltipTrigger]">`;
 * - slot default (conteúdo do balão, sobrepõe `label`) → `<ng-content>` com
 *   fallback `{{ label }}` (renderizado quando nada é projetado);
 * - `emit('open-change')` → `@Output() openChange`.
 *
 * Acessibilidade: o gatilho recebe `aria-describedby` apontando pro balão enquanto
 * aberto e o balão é `role="tooltip"` (pointer-events:none — nunca é alvo do
 * mouse). `Escape` fecha. Ponha um elemento naturalmente focável (botão/link) no
 * gatilho pra que a abertura por teclado funcione.
 *
 * @example
 * <span arcanaTooltip label="Salvar rascunho" side="top">
 *   <button arcanaTooltipTrigger aria-label="Salvar"><i class="icon-save"></i></button>
 * </span>
 */

/** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 160, height: 32 };
/** Folga mínima entre a seta e o canto do balão. */
const ARROW_EDGE = 10;

let panelIdSeq = 0;

@Component({
  selector: "span[arcanaTooltip]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass"
  },
  template: `
    <span
      #triggerEl
      class="arcana-tooltip__trigger"
      [attr.aria-describedby]="isOpen ? panelId : null"
      (mouseenter)="onTriggerEnter()"
      (mouseleave)="scheduleClose()"
      (focusin)="onTriggerFocusIn()"
      (focusout)="scheduleClose()"
    >
      <ng-content select="[arcanaTooltipTrigger]"></ng-content>
    </span>

    <!--
      Balão teleportado pro <body> (position: fixed via placeHoverCard) pra
      escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
      pointer-events:none (no CSS) — nunca é alvo do mouse.
    -->
    <ng-template #panelTpl>
      <div
        [id]="panelId"
        [class]="panelClasses"
        [style]="panelStyle"
        role="tooltip"
      >
        <ng-content>{{ label }}</ng-content>
        @if (arrow) {
          <span class="arcana-tooltip__arrow" aria-hidden="true"></span>
        }
      </div>
    </ng-template>
  `
})
export class ArcanaTooltipComponent implements OnChanges, OnDestroy {
  /** Texto do tooltip. Use conteúdo projetado pra custom (o projetado vence). */
  @Input() label = "";
  /** ms até abrir depois do `mouseenter` (o foco por teclado abre na hora). Default `200`. */
  @Input() openDelay = 200;
  /** ms de carência antes de fechar (default `0` — fecha na hora). */
  @Input() closeDelay = 0;
  @Input() side: HoverCardSide = "top";
  @Input() align: HoverCardAlign = "center";
  /** Atalho `'{side}-{align}'` (ex: `'top-start'`); vence `side`/`align`. */
  @Input() placement?: HoverCardPlacement;
  /** Distância entre gatilho e balão em px. Default `6`. */
  @Input() offset = 6;
  /** Mostra a setinha apontando pro gatilho. Default `true`. */
  @Input() arrow = true;
  @Input() disabled = false;
  /**
   * Classe extra no balão. Como ele é teleportado pro `<body>`, um seletor no
   * host não o alcança — é assim que se tematiza uma instância.
   */
  @Input() panelClass?: string;

  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild("panelTpl") panelTpl?: TemplateRef<unknown>;
  @ViewChild("triggerEl") triggerRef?: ElementRef<HTMLElement>;

  isOpen = false;
  panelStyle = "";
  resolvedSide: HoverCardSide = "top";
  readonly panelId = `arcana-tooltip-${++panelIdSeq}`;

  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  private embeddedView?: EmbeddedViewRef<unknown>;
  private panelEl?: HTMLElement;
  private openTimer?: ReturnType<typeof setTimeout>;
  private closeTimer?: ReturnType<typeof setTimeout>;

  get rootClass(): string {
    return [
      "arcana-tooltip",
      this.isOpen ? "is-open" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }

  get panelClasses(): string {
    return [
      "arcana-tooltip__panel",
      `arcana-tooltip__panel--${this.resolvedSide}`,
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
    if (!this.isOpen) return;
    if (this.closeDelay <= 0) {
      this.close();
      return;
    }
    if (this.closeTimer) return;
    this.closeTimer = setTimeout(() => {
      this.closeTimer = undefined;
      this.close();
    }, this.closeDelay);
  }

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

    // Pré-posiciona com a estimativa pra que o balão já monte perto do lugar
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
    const arrowOffset = this.arrowOffset(place, rect, panel.width, panel.height);
    this.panelStyle =
      `position: fixed; left: ${place.left}px; top: ${place.top}px;` +
      ` --arcana-tooltip-arrow-offset: ${arrowOffset};`;
  }

  /**
   * Posição da seta ao longo da borda do balão, apontando pro centro do gatilho.
   * Nos lados verticais (top/bottom) é um X; nos horizontais, um Y. Preso (clamp)
   * pra não escapar do balão.
   */
  private arrowOffset(
    place: { left: number; top: number; side: HoverCardSide },
    rect: DOMRect,
    panelWidth: number,
    panelHeight: number
  ): string {
    const vertical = place.side === "top" || place.side === "bottom";
    if (vertical) {
      const center = rect.left + rect.width / 2 - place.left;
      return `${this.clampArrow(center, panelWidth)}px`;
    }
    const center = rect.top + rect.height / 2 - place.top;
    return `${this.clampArrow(center, panelHeight)}px`;
  }

  private clampArrow(value: number, size: number): number {
    return Math.max(ARROW_EDGE, Math.min(value, size - ARROW_EDGE));
  }

  private reposition(): void {
    const trigger = this.triggerRef?.nativeElement;
    if (!trigger) return;
    this.applyPlacement(trigger.getBoundingClientRect(), {
      width: this.panelEl?.offsetWidth || PANEL_ESTIMATE.width,
      height: this.panelEl?.offsetHeight || PANEL_ESTIMATE.height
    });
    // O balão vive fora da árvore de CD do host — re-renderiza na mão.
    this.embeddedView?.detectChanges();
  }

  /* ─────────────────────── listeners globais ───────────────────────────────── */

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.close();
      this.cdr.markForCheck();
    }
  };

  private readonly onScroll = (): void => {
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
