<script module lang="ts">
  // Contador de instâncias no escopo do MÓDULO (um `let` no `<script>` de
  // instância reiniciaria em 0 a cada componente e duplicaria os ids).
  let panelIdSeq = 0;
</script>

<script lang="ts">
  /**
   * `<ArcanaTooltip>` — Svelte 5 port. Balão de texto curto que abre ao passar o
   * mouse pelo gatilho (e ao focá-lo pelo teclado). Versão enxuta e opinativa do
   * `<ArcanaHoverCard>`: conteúdo textual, balão escuro com setinha, e nunca
   * interativo (`pointer-events: none` no CSS).
   *
   * Estrutura: gatilho inline (snippet `trigger`) + balão PORTADO pro `<body>`
   * com `position: fixed`, posicionado por `placeHoverCard` (`core/hover-card`)
   * com flip automático quando não cabe do lado pedido.
   *
   * Equivalências Vue → Svelte 5:
   * - slot `trigger` → snippet `trigger`; slot default → snippet `children`
   * - `<Teleport to="body">` → action `use:portal`
   * - `emit('open-change')` → callback `onOpenChange`
   *
   * Acessibilidade: o gatilho recebe `aria-describedby` apontando pro balão
   * enquanto aberto e o balão é `role="tooltip"`. `Escape` fecha. Ponha um
   * elemento naturalmente focável (botão/link) no snippet `trigger` pra que a
   * abertura por teclado funcione.
   */
  import type { Snippet } from "svelte";
  import { placeHoverCard, resolveHoverCardPlacement } from "../core/hover-card";
  import type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "../core/hover-card";
  import { portal } from "./portal";

  /** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
  const PANEL_ESTIMATE = { width: 160, height: 32 };
  /** Folga mínima entre a seta e o canto do balão. */
  const ARROW_EDGE = 10;

  let {
    label = "",
    openDelay = 200,
    closeDelay = 0,
    side = "top",
    align = "center",
    placement = undefined,
    offset = 6,
    arrow = true,
    disabled = false,
    panelClass = undefined,
    trigger,
    children,
    onOpenChange,
    class: className = "",
  }: {
    /** Texto do tooltip. Use o snippet `children` pra conteúdo custom (o snippet vence). */
    label?: string;
    /** ms até abrir depois do `mouseenter` (o foco por teclado abre na hora). Default `200`. */
    openDelay?: number;
    /** ms de carência antes de fechar no mouse (default `0` = imediato). */
    closeDelay?: number;
    side?: HoverCardSide;
    align?: HoverCardAlign;
    /** Atalho `"{side}-{align}"` (ex: `"top-start"`); vence `side`/`align`. */
    placement?: HoverCardPlacement;
    /** Distância entre gatilho e balão em px. Default `6`. */
    offset?: number;
    /** Mostra a setinha apontando pro gatilho. Default `true`. */
    arrow?: boolean;
    disabled?: boolean;
    /**
     * Classe extra no balão. Como ele é portado pro `<body>`, um seletor no
     * wrapper não o alcança — é assim que se tematiza uma instância.
     */
    panelClass?: string;
    /** O gatilho (slot `trigger` do Vue). */
    trigger?: Snippet;
    /** O conteúdo do balão (slot default do Vue) — sobrepõe `label`. */
    children?: Snippet;
    onOpenChange?: (open: boolean) => void;
    class?: string;
  } = $props();

  const panelId = `arcana-tooltip-${++panelIdSeq}`;

  let isOpen = $state(false);
  let panelStyle = $state("");
  let resolvedSide = $state<HoverCardSide>("top");
  let triggerEl = $state<HTMLElement | undefined>(undefined);
  let panelEl = $state<HTMLElement | undefined>(undefined);

  let openTimer: ReturnType<typeof setTimeout> | undefined;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  /* ─────────────────────────── posicionamento ──────────────────────────────── */

  function clampArrow(value: number, size: number): number {
    return Math.max(ARROW_EDGE, Math.min(value, size - ARROW_EDGE));
  }

  /**
   * Posição da seta ao longo da borda do balão, apontando pro centro do gatilho.
   * Nos lados verticais (top/bottom) é um X; nos horizontais, um Y. Preso (clamp)
   * pra não escapar do balão.
   */
  function arrowOffset(
    place: { left: number; top: number; side: HoverCardSide },
    rect: DOMRect,
    panelWidth: number,
    panelHeight: number
  ): string {
    const vertical = place.side === "top" || place.side === "bottom";
    if (vertical) {
      const center = rect.left + rect.width / 2 - place.left;
      return `${clampArrow(center, panelWidth)}px`;
    }
    const center = rect.top + rect.height / 2 - place.top;
    return `${clampArrow(center, panelHeight)}px`;
  }

  function reposition() {
    if (!triggerEl) return;

    const rect = triggerEl.getBoundingClientRect();
    const panelWidth = panelEl?.offsetWidth || PANEL_ESTIMATE.width;
    const panelHeight = panelEl?.offsetHeight || PANEL_ESTIMATE.height;

    const parts = resolveHoverCardPlacement(placement, side, align);
    const place = placeHoverCard(
      rect,
      { width: panelWidth, height: panelHeight },
      { width: window.innerWidth, height: window.innerHeight },
      { ...parts, gap: offset }
    );

    resolvedSide = place.side;
    panelStyle =
      `position: fixed; left: ${place.left}px; top: ${place.top}px;` +
      ` --arcana-tooltip-arrow-offset: ${arrowOffset(place, rect, panelWidth, panelHeight)};`;
  }

  /* ─────────────────────── abertura / fechamento ───────────────────────────── */

  function clearOpenTimer() {
    if (!openTimer) return;
    clearTimeout(openTimer);
    openTimer = undefined;
  }

  function cancelClose() {
    if (!closeTimer) return;
    clearTimeout(closeTimer);
    closeTimer = undefined;
  }

  function open() {
    if (disabled || isOpen) return;
    isOpen = true;
    onOpenChange?.(true);
  }

  function close() {
    clearOpenTimer();
    cancelClose();
    if (!isOpen) return;
    isOpen = false;
    onOpenChange?.(false);
  }

  function scheduleOpen(delay: number) {
    cancelClose();
    if (disabled || isOpen) return;
    clearOpenTimer();
    if (delay <= 0) {
      open();
      return;
    }
    openTimer = setTimeout(() => {
      openTimer = undefined;
      open();
    }, delay);
  }

  function scheduleClose() {
    clearOpenTimer();
    if (!isOpen || closeTimer) return;
    if (closeDelay <= 0) {
      close();
      return;
    }
    closeTimer = setTimeout(() => {
      closeTimer = undefined;
      close();
    }, closeDelay);
  }

  // `disabled` ligado no meio do caminho fecha o que estiver aberto.
  $effect(() => {
    if (disabled) close();
  });

  // Mede/posiciona assim que o balão entra no DOM e registra os listeners
  // globais só enquanto ele está aberto.
  $effect(() => {
    if (!isOpen || !panelEl) return;

    reposition();

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onScroll = () => reposition();
    const onResize = () => reposition();

    document.addEventListener("keydown", onKeydown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  });

  // Timers pendentes não sobrevivem ao componente.
  $effect(() => () => {
    clearOpenTimer();
    cancelClose();
  });
</script>

<span
  class={["arcana-tooltip", isOpen ? "is-open" : "", disabled ? "is-disabled" : "", className]
    .filter(Boolean)
    .join(" ")}
>
  <span
    bind:this={triggerEl}
    class="arcana-tooltip__trigger"
    aria-describedby={isOpen ? panelId : undefined}
    onmouseenter={() => scheduleOpen(openDelay)}
    onmouseleave={() => scheduleClose()}
    onfocusin={() => scheduleOpen(0)}
    onfocusout={() => scheduleClose()}
  >
    {@render trigger?.()}
  </span>

  <!--
    Balão portado pro <body> (position: fixed via `placeHoverCard`) pra escapar
    de qualquer ancestral com overflow:hidden / z-index restritivo.
    `pointer-events: none` (no CSS) — nunca é alvo do mouse.
  -->
  {#if isOpen}
    <div
      use:portal
      bind:this={panelEl}
      id={panelId}
      class={["arcana-tooltip__panel", `arcana-tooltip__panel--${resolvedSide}`, panelClass]
        .filter(Boolean)
        .join(" ")}
      style={panelStyle}
      role="tooltip"
    >
      {#if children}{@render children()}{:else}{label}{/if}
      {#if arrow}<span class="arcana-tooltip__arrow" aria-hidden="true"></span>{/if}
    </div>
  {/if}
</span>
