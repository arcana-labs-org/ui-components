<script module lang="ts">
  // Contador de instâncias no escopo do MÓDULO (um `let` no `<script>` de instância
  // reiniciaria em 0 a cada componente e duplicaria os ids) — mesmo truque do `uid`
  // do SFC Vue, sem `Math.random`.
  let uid = 0;
</script>

<script lang="ts">
  /**
   * `<ArcanaQuickSearch>` — Svelte 5 port. Campo de busca compacto com dica dos
   * campos pesquisáveis e contador opcional de resultados. Reproduz
   * `<div class="arcana-quick-search">` (+ `is-disabled`/`has-counter`), o
   * `__info` (só quando `searchFields.length`), o `__icon`, o `__input`, o
   * `__clear` e o `__counter` (só quando `counter != null`), idêntico ao SFC.
   *
   * O balão `__hint` é TELEPORTADO pro `<body>` (`use:portal`) e posicionado com
   * `position: fixed` via `placeHoverCard` (`core/hover-card`) — mesma técnica do
   * `ArcanaTooltip` — pra escapar de qualquer ancestral com `overflow: hidden` /
   * z-index restritivo. É montado/desmontado no hover/foco do gatilho `__info`,
   * não por CSS `:hover`.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + callback `onValueChange(value)`
   * - `emit('search', value)` / `emit('clear')` → callbacks `onSearch(value)` / `onClear()`
   * - métodos `reset()/focus()` → funções exportadas (acessíveis na instância
   *   retornada por `mount()`)
   * - `watch(modelValue)` → `$effect` que só reage à prop `value` (lê `text` via
   *   `untrack` pra não recriar um loop quando a digitação local muda `text`)
   * - `<Teleport to="body">` do hint → action `use:portal`
   * - `mounted/beforeUnmount` + listeners manuais do hint → um único `$effect`
   *   gated em `hintOpen && hintEl` que reposiciona e registra
   *   `scroll`(capture)/`resize`/`keydown` Escape, devolvendo o cleanup que os
   *   remove — roda tanto ao fechar quanto ao destruir o componente (idioma
   *   "leak-safe" do Svelte, sem precisar de flags tipo `hintMounted`)
   */
  import { untrack } from "svelte";
  import { placeHoverCard } from "../core/hover-card";
  import { portal } from "./portal";

  /** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
  const HINT_ESTIMATE = { width: 200, height: 80 };

  let {
    value = "",
    placeholder = "",
    searchFields = [],
    fieldsLabel = "Campos pesquisáveis:",
    counter = null,
    unit = "registro(s)",
    hideUnit = false,
    disabled = false,
    clearLabel = "Limpar busca",
    onValueChange,
    onSearch,
    onClear,
    class: className = "",
  }: {
    /** Texto da busca (default `''`). */
    value?: string;
    placeholder?: string;
    /** Lista de campos pesquisáveis; quando vazia, o gatilho de dica nem é renderizado. */
    searchFields?: string[];
    fieldsLabel?: string;
    /** Número (ou string) de resultados; `null`/`undefined` esconde o pill. */
    counter?: number | string | null;
    unit?: string;
    hideUnit?: boolean;
    disabled?: boolean;
    clearLabel?: string;
    onValueChange?: (value: string) => void;
    /** Ao pressionar Enter, ou ao limpar (com `''`). */
    onSearch?: (value: string) => void;
    onClear?: () => void;
    class?: string;
  } = $props();

  const hintId = `arcana-qs-${++uid}`;

  let text = $state(value);
  let inputEl = $state<HTMLInputElement | undefined>(undefined);

  let hintOpen = $state(false);
  let hintStyle = $state("");
  let infoEl = $state<HTMLElement | undefined>(undefined);
  let hintEl = $state<HTMLElement | undefined>(undefined);

  // Mantém o buffer local sincronizado quando o consumidor controla `value`
  // externamente (ex.: reset feito pelo pai via prop, não pelo método `reset()`).
  // `untrack` isola a leitura de `text` — só a mudança de `value` reexecuta isto.
  $effect(() => {
    const incoming = value;
    untrack(() => {
      if (incoming !== text) text = incoming;
    });
  });

  /* ─────────────────────────── dica de campos ──────────────────────────────── */

  function reposition() {
    if (!infoEl) return;

    const rect = infoEl.getBoundingClientRect();
    const hintWidth = hintEl?.offsetWidth || HINT_ESTIMATE.width;
    const hintHeight = hintEl?.offsetHeight || HINT_ESTIMATE.height;

    const place = placeHoverCard(
      rect,
      { width: hintWidth, height: hintHeight },
      { width: window.innerWidth, height: window.innerHeight },
      { side: "top", align: "center", gap: 8 }
    );

    hintStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px;`;
  }

  function openHint() {
    if (!searchFields.length || hintOpen) return;
    hintOpen = true;
  }

  function closeHint() {
    if (!hintOpen) return;
    hintOpen = false;
  }

  // Se o pai encolher `searchFields` pra `[]` enquanto o hint está aberto, o
  // gatilho `.info` desmonta (`{#if searchFields.length}`) sem disparar
  // `mouseleave`/`focusout` — sem isso o balão e os listeners globais ficam
  // órfãos (painel preso na tela, `keydown`/`scroll`/`resize` vazando).
  $effect(() => {
    if (!searchFields.length && hintOpen) closeHint();
  });

  // Mede/posiciona assim que o balão entra no DOM e registra os listeners
  // globais só enquanto ele está aberto. O cleanup devolvido roda tanto ao
  // fechar (hintOpen vira false) quanto ao destruir o componente.
  $effect(() => {
    if (!hintOpen || !hintEl) return;

    reposition();

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeHint();
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

  function onInput(e: Event) {
    text = (e.target as HTMLInputElement).value;
    onValueChange?.(text);
  }

  function search() {
    onSearch?.(text);
  }

  function onKeyUp(e: KeyboardEvent) {
    if (e.key === "Enter") search();
  }

  function clear() {
    text = "";
    onValueChange?.("");
    onClear?.();
    search();
  }

  /** Zera o texto sem emitir `search` (só `onValueChange`). */
  export function reset() {
    text = "";
    onValueChange?.("");
  }

  /** Foca o `<input>`. */
  export function focus() {
    inputEl?.focus();
  }

  const rootClasses = $derived(
    [
      "arcana-quick-search",
      disabled ? "is-disabled" : "",
      counter != null ? "has-counter" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div class={rootClasses}>
  {#if searchFields.length}
    <div
      bind:this={infoEl}
      class="arcana-quick-search__info"
      role="button"
      tabindex="0"
      onmouseenter={openHint}
      onmouseleave={closeHint}
      onfocusin={openHint}
      onfocusout={closeHint}
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
  {/if}

  <!--
    Balão portado pro <body> (position: fixed via `placeHoverCard`) pra escapar
    de qualquer ancestral com overflow:hidden / z-index restritivo — mesma
    técnica do ArcanaTooltip.
  -->
  {#if hintOpen}
    <div
      use:portal
      bind:this={hintEl}
      id={hintId}
      class="arcana-quick-search__hint"
      style={hintStyle}
      role="tooltip"
    >
      <span class="arcana-quick-search__hint-label">{fieldsLabel}</span>
      <ul class="arcana-quick-search__hint-list">
        {#each searchFields as field (field)}
          <li class="arcana-quick-search__hint-item">{field}</li>
        {/each}
      </ul>
    </div>
  {/if}

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
    bind:this={inputEl}
    class="arcana-quick-search__input"
    type="text"
    value={text}
    {placeholder}
    {disabled}
    aria-describedby={hintOpen ? hintId : undefined}
    oninput={onInput}
    onkeyup={onKeyUp}
  />

  <button
    type="button"
    class="arcana-quick-search__clear"
    aria-label={clearLabel}
    title={clearLabel}
    onclick={clear}
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

  {#if counter != null}
    <div class="arcana-quick-search__counter">
      <span class="arcana-quick-search__counter-value">{counter}</span>
      {#if !hideUnit}
        <span class="arcana-quick-search__counter-unit">{unit}</span>
      {/if}
    </div>
  {/if}
</div>
