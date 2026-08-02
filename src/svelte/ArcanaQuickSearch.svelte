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
   * `__info`/`__hint` (só quando `searchFields.length`), o `__icon`, o `__input`,
   * o `__clear` e o `__counter` (só quando `counter != null`), idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `modelValue` (v-model) → prop `value` + callback `onValueChange(value)`
   * - `emit('search', value)` / `emit('clear')` → callbacks `onSearch(value)` / `onClear()`
   * - métodos `reset()/focus()` → funções exportadas (acessíveis na instância
   *   retornada por `mount()`)
   * - `watch(modelValue)` → `$effect` que só reage à prop `value` (lê `text` via
   *   `untrack` pra não recriar um loop quando a digitação local muda `text`)
   */
  import { untrack } from "svelte";

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

  // Mantém o buffer local sincronizado quando o consumidor controla `value`
  // externamente (ex.: reset feito pelo pai via prop, não pelo método `reset()`).
  // `untrack` isola a leitura de `text` — só a mudança de `value` reexecuta isto.
  $effect(() => {
    const incoming = value;
    untrack(() => {
      if (incoming !== text) text = incoming;
    });
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
      <div id={hintId} class="arcana-quick-search__hint" role="tooltip">
        <span class="arcana-quick-search__hint-label">{fieldsLabel}</span>
        <ul class="arcana-quick-search__hint-list">
          {#each searchFields as field (field)}
            <li class="arcana-quick-search__hint-item">{field}</li>
          {/each}
        </ul>
      </div>
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
    aria-describedby={searchFields.length ? hintId : undefined}
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
