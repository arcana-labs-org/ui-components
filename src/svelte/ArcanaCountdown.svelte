<script lang="ts">
  /**
   * `<ArcanaCountdown>` — Svelte 5 port. Contagem regressiva até um instante alvo. Reproduz
   * `<div class="arcana-countdown arcana-countdown--{size} arcana-countdown--{tone}">`
   * (+ `is-finished`/`is-paused`), o `__title` e o `__content` com
   * `__prefix`/`__value`/`__suffix`, idêntico ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - slots `#title`/`#prefix`/`#suffix` → snippets `titleSlot`/`prefixSlot`/`suffixSlot`
   * - `emit('change', ms)` / `emit('finish')` → callbacks `onChange(ms)` / `onFinish()`
   * - métodos `pause()/resume()/restart()` → funções exportadas (acessíveis na instância
   *   retornada por `mount()`)
   *
   * Timers: um `setInterval` dentro de um `$effect` com cleanup — trocar `value`/`format`/
   * `interval`/pausa (ou desmontar) limpa o anterior antes de criar o próximo, nunca acumula.
   * O corpo do efeito NÃO lê `remaining` (senão cada tick recriaria o intervalo). Cada tick
   * recalcula o restante a partir do relógio, sem drift acumulado.
   */
  import type { Snippet } from "svelte";

  import {
    DEFAULT_COUNTDOWN_FORMAT,
    countdownTickInterval,
    formatDuration,
    remainingMs,
  } from "../core/countdown";

  let {
    value = null,
    format = DEFAULT_COUNTDOWN_FORMAT,
    prefix = "",
    suffix = "",
    title = "",
    tone = "neutral",
    valueColor = "",
    size = "md",
    paused = false,
    interval = undefined,
    onChange,
    onFinish,
    titleSlot,
    prefixSlot,
    suffixSlot,
    class: className = "",
    style,
  }: {
    /** Instante ALVO: epoch em ms, `Date` ou string ISO. Inválido/vazio zera o contador. */
    value?: number | string | Date | null;
    /**
     * Tokens `DD`,`D`,`HH`,`H`,`mm`,`m`,`ss`,`s`,`SSS`,`SS`,`S` + literais entre colchetes.
     * A maior unidade presente absorve o excedente (50h → `50:00:00` em `HH:mm:ss`).
     */
    format?: string;
    prefix?: string;
    suffix?: string;
    title?: string;
    tone?: "neutral" | "success" | "danger" | "warning" | "info";
    valueColor?: string;
    size?: "sm" | "md" | "lg" | "xl";
    /** Pausa a contagem (o valor congela). Voltar pra `false` retoma. */
    paused?: boolean;
    /** Período do tick em ms. Default: 50ms com milissegundos no `format`, senão 1000ms. */
    interval?: number;
    onChange?: (remaining: number) => void;
    onFinish?: () => void;
    titleSlot?: Snippet;
    prefixSlot?: Snippet;
    suffixSlot?: Snippet;
    class?: string;
    style?: string;
  } = $props();

  let remaining = $state(remainingMs(value, Date.now()));
  let isPaused = $state(paused);
  /** Bump manual do `restart()` — reexecuta o efeito sem depender do `value`. */
  let runId = $state(0);
  /** Trava do `finish` (fora do runes: não deve disparar re-render). */
  let hasFinished = false;

  // Alvo normalizado: um `new Date(...)` recriado pelo pai muda de identidade, o
  // timestamp não — é ele que entra como dependência do efeito.
  const targetKey = $derived(value instanceof Date ? value.getTime() : (value ?? null));
  const tickInterval = $derived(
    interval && interval > 0 ? interval : countdownTickInterval(format)
  );

  // Prop → estado interno (o `pause()`/`resume()` imperativo escreve no mesmo lugar).
  $effect(() => {
    isPaused = paused;
  });

  $effect(() => {
    // Dependências explícitas: alvo, taxa de tick, pausa e o bump do `restart()`.
    void targetKey;
    void runId;
    const period = tickInterval;
    if (isPaused) return;

    const settle = (rest: number): boolean => {
      remaining = rest;
      if (rest <= 0 && !hasFinished) {
        hasFinished = true;
        onFinish?.();
        return true;
      }
      return false;
    };

    if (hasFinished) return;
    if (settle(remainingMs(value, Date.now()))) return;

    const timer = setInterval(() => {
      const rest = remainingMs(value, Date.now());
      onChange?.(rest);
      if (settle(rest)) clearInterval(timer);
    }, period);

    return () => clearInterval(timer);
  });

  export function pause() {
    isPaused = true;
  }

  export function resume() {
    isPaused = false;
  }

  /** Zera a trava do `finish` e recomeça a partir do `value` atual. */
  export function restart() {
    hasFinished = false;
    runId += 1;
  }

  const displayValue = $derived(formatDuration(remaining, format));
  const hasTitle = $derived(Boolean(titleSlot || title));
  const hasPrefix = $derived(Boolean(prefixSlot || prefix));
  const hasSuffix = $derived(Boolean(suffixSlot || suffix));

  const rootClasses = $derived(
    [
      "arcana-countdown",
      `arcana-countdown--${size}`,
      `arcana-countdown--${tone}`,
      remaining <= 0 ? "is-finished" : "",
      isPaused ? "is-paused" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const rootStyle = $derived(
    [style ?? "", valueColor ? `--arcana-countdown-value-color: ${valueColor};` : ""]
      .filter(Boolean)
      .join(" ") || undefined
  );
</script>

<div class={rootClasses} style={rootStyle} role="timer">
  {#if hasTitle}
    <div class="arcana-countdown__title">
      {#if titleSlot}{@render titleSlot()}{:else}{title}{/if}
    </div>
  {/if}

  <div class="arcana-countdown__content">
    {#if hasPrefix}
      <span class="arcana-countdown__prefix">
        {#if prefixSlot}{@render prefixSlot()}{:else}{prefix}{/if}
      </span>
    {/if}

    <span class="arcana-countdown__value">{displayValue}</span>

    {#if hasSuffix}
      <span class="arcana-countdown__suffix">
        {#if suffixSlot}{@render suffixSlot()}{:else}{suffix}{/if}
      </span>
    {/if}
  </div>
</div>
