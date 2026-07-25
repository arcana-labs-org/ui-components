<script module lang="ts">
  // Contador de instâncias no escopo do MÓDULO (um `let` no `<script>` de
  // instância reiniciaria em 0 a cada componente e duplicaria os ids).
  let panelIdSeq = 0;
</script>

<script lang="ts">
  /**
   * `<ArcanaHoverCard>` — Svelte 5 port. Cartão de preview que abre ao passar o
   * mouse pelo gatilho (e ao focá-lo pelo teclado). Reproduz o MESMO markup do
   * SFC Vue: `<span class="arcana-hover-card"><span class="arcana-hover-card__trigger">`
   * + o `.arcana-hover-card__panel` portado pro `<body>` (`--{side}` efetivo).
   *
   * Posicionamento por `placeHoverCard` (`core/hover-card`, que estende o
   * `placePanel` usado por Select/TreeSelect), com flip automático quando não
   * cabe do lado pedido.
   *
   * Equivalências Vue → Svelte 5:
   * - slot `trigger` → snippet `trigger`; slot default → snippet `children`
   * - `<Teleport to="body">` → action `use:portal`
   * - `emit('open-change')` → callback `onOpenChange`
   *
   * Acessibilidade: o gatilho recebe `aria-describedby` apontando pro cartão
   * enquanto ele está aberto e o cartão é `role="tooltip"` — NÃO recebe foco (é
   * hover, não popover modal). `Escape` fecha. Ponha um elemento naturalmente
   * focável (link/botão) no snippet `trigger` pra que a abertura por teclado
   * funcione.
   */
  import type { Snippet } from "svelte";
  import { placeHoverCard, resolveHoverCardPlacement } from "../core/hover-card";
  import type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "../core/hover-card";
  import { portal } from "./portal";

  /** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
  const PANEL_ESTIMATE = { width: 280, height: 120 };

  let {
    openDelay = 300,
    closeDelay = 150,
    side = "bottom",
    align = "center",
    placement = undefined,
    offset = 8,
    disabled = false,
    panelClass = undefined,
    trigger,
    children,
    onOpenChange,
    class: className = "",
  }: {
    /** ms até abrir depois do `mouseenter` (o foco por teclado abre na hora). Default `300`. */
    openDelay?: number;
    /**
     * ms de **carência** antes de fechar (default `150`). É essa carência que
     * permite ir do gatilho ATÉ o cartão sem ele fechar: o `mouseenter` do painel
     * cancela o timer agendado pelo `mouseleave` do gatilho.
     */
    closeDelay?: number;
    side?: HoverCardSide;
    align?: HoverCardAlign;
    /** Atalho `"{side}-{align}"` (ex: `"bottom-start"`); vence `side`/`align`. */
    placement?: HoverCardPlacement;
    /** Distância entre gatilho e cartão em px. Default `8`. */
    offset?: number;
    disabled?: boolean;
    /**
     * Classe extra no cartão. Como ele é portado pro `<body>`, um seletor no
     * wrapper não o alcança — é assim que se tematiza uma instância (mesmo
     * contrato do `panelClass` do `ArcanaTreeSelect`).
     */
    panelClass?: string;
    /** O gatilho (slot `trigger` do Vue). */
    trigger?: Snippet;
    /** O conteúdo do cartão (slot default do Vue). */
    children?: Snippet;
    onOpenChange?: (open: boolean) => void;
    class?: string;
  } = $props();

  const panelId = `arcana-hover-card-${++panelIdSeq}`;

  let isOpen = $state(false);
  let panelStyle = $state("");
  let resolvedSide = $state<HoverCardSide>("bottom");
  let triggerEl = $state<HTMLElement | undefined>(undefined);
  let panelEl = $state<HTMLElement | undefined>(undefined);

  let openTimer: ReturnType<typeof setTimeout> | undefined;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  /* ─────────────────────────── posicionamento ──────────────────────────────── */

  function reposition() {
    if (!triggerEl) return;

    const parts = resolveHoverCardPlacement(placement, side, align);
    const place = placeHoverCard(
      triggerEl.getBoundingClientRect(),
      {
        width: panelEl?.offsetWidth || PANEL_ESTIMATE.width,
        height: panelEl?.offsetHeight || PANEL_ESTIMATE.height,
      },
      { width: window.innerWidth, height: window.innerHeight },
      { ...parts, gap: offset }
    );

    resolvedSide = place.side;
    panelStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px;`;
  }

  /* ─────────────────────── abertura / fechamento ───────────────────────────── */

  function clearOpenTimer() {
    if (!openTimer) return;
    clearTimeout(openTimer);
    openTimer = undefined;
  }

  /**
   * O ponto que costuma quebrar num hover card: ao sair do gatilho rumo ao
   * cartão, o `mouseleave` do gatilho já agendou o fechamento. O `mouseenter` do
   * cartão (dentro da carência de `closeDelay`) CANCELA esse timer.
   */
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
    closeTimer = setTimeout(() => {
      closeTimer = undefined;
      close();
    }, closeDelay);
  }

  function onTriggerFocusOut(event: FocusEvent) {
    // Foco que caminhou PRA DENTRO do cartão (link no conteúdo) não fecha.
    const next = event.relatedTarget as Node | null;
    if (next && panelEl?.contains(next)) return;
    scheduleClose();
  }

  // `disabled` ligado no meio do caminho fecha o que estiver aberto.
  $effect(() => {
    if (disabled) close();
  });

  // Mede/posiciona assim que o cartão entra no DOM e registra os listeners
  // globais só enquanto ele está aberto.
  $effect(() => {
    if (!isOpen || !panelEl) return;

    reposition();

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onScroll = (event: Event) => {
      // Rolagem DENTRO do cartão não o desloca.
      if (event.target instanceof Node && panelEl?.contains(event.target)) return;
      reposition();
    };
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
  class={["arcana-hover-card", isOpen ? "is-open" : "", disabled ? "is-disabled" : "", className]
    .filter(Boolean)
    .join(" ")}
>
  <span
    bind:this={triggerEl}
    class="arcana-hover-card__trigger"
    aria-describedby={isOpen ? panelId : undefined}
    onmouseenter={() => scheduleOpen(openDelay)}
    onmouseleave={() => scheduleClose()}
    onfocusin={() => scheduleOpen(0)}
    onfocusout={onTriggerFocusOut}
  >
    {@render trigger?.()}
  </span>

  <!--
    Cartão portado pro <body> (position: fixed via `placeHoverCard`) pra escapar
    de qualquer ancestral com overflow:hidden / z-index restritivo.
  -->
  {#if isOpen}
    <div
      use:portal
      bind:this={panelEl}
      id={panelId}
      class={["arcana-hover-card__panel", `arcana-hover-card__panel--${resolvedSide}`, panelClass]
        .filter(Boolean)
        .join(" ")}
      style={panelStyle}
      role="tooltip"
      onmouseenter={cancelClose}
      onmouseleave={() => scheduleClose()}
      onfocusin={cancelClose}
      onfocusout={() => scheduleClose()}
    >
      {@render children?.()}
    </div>
  {/if}
</span>
