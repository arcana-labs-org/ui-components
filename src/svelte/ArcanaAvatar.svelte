<script lang="ts">
  /**
   * `<ArcanaAvatar>` — Svelte 5 port. Avatar com fallback em cascata. Reproduz
   * `<span class="arcana-avatar arcana-avatar--md arcana-avatar--circle">` com
   * `__img` / `__initials` / `__icon` / `__glyph`, idêntico ao SFC.
   *
   * Cascata (para no primeiro que existir): **imagem → iniciais → ícone → silhueta**.
   * A imagem que falha ao carregar sai da cascata em runtime (o componente guarda a
   * `src` quebrada), então URL morta nunca deixa um quadrado vazio. Trocar a `src`
   * re-arma a tentativa.
   *
   * Equivalências Vue → Svelte 5: `emit('error')` → `onError`.
   */
  export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
  export type AvatarShape = "circle" | "square";

  let {
    src = "",
    alt = "",
    initials = "",
    icon = "",
    size = "md",
    shape = "circle",
    color = "",
    onError,
    class: className = "",
  }: {
    src?: string;
    alt?: string;
    /** Texto curto do fallback (o CSS aplica `text-transform: uppercase`). */
    initials?: string;
    /** Classe de ícone do fallback (ex: `fa-solid fa-user`). */
    icon?: string;
    /** `"xs" | "sm" | "md" | "lg" | "xl"` (default `"md"` = 40px) ou um número de px. */
    size?: AvatarSize | number;
    shape?: AvatarShape;
    /** Cor de fundo do fallback. Default: token `--arcana-solid` (acento da paleta). */
    color?: string;
    onError?: (event: Event) => void;
    class?: string;
  } = $props();

  const GLYPH_PATH =
    "M12 12.6a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6zm0 1.8c-3.6 0-7.2 1.85-7.2 4.1V20h14.4v-1.5c0-2.25-3.6-4.1-7.2-4.1z";

  /** `src` que já falhou — usada para pular a imagem na cascata. */
  let failedSrc = $state<string | null>(null);

  // Nova `src` re-arma a tentativa (a falha era da URL anterior).
  $effect(() => {
    void src;
    failedSrc = null;
  });

  /** Tamanho numérico (px) quando `size` não é um degrau da escala. */
  const numericSize = $derived.by(() => {
    if (size === undefined || size === null || (size as unknown) === "") return null;
    const n = typeof size === "number" ? size : Number(size);
    return Number.isFinite(n) ? n : null;
  });

  const showImage = $derived(!!src && failedSrc !== src);

  const rootStyle = $derived(
    [
      numericSize !== null ? `--arcana-avatar-own-size: ${numericSize}px;` : "",
      color ? `--arcana-avatar-color: ${color};` : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );

  function handleError(event: Event) {
    failedSrc = src;
    onError?.(event);
  }
</script>

<span
  class={[
    "arcana-avatar",
    numericSize === null ? `arcana-avatar--${size}` : "",
    `arcana-avatar--${shape}`,
    showImage ? "has-image" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")}
  style={rootStyle}
>
  {#if showImage}
    <img class="arcana-avatar__img" {src} {alt} onerror={handleError} />
  {:else if initials}
    <span class="arcana-avatar__initials">{initials}</span>
  {:else if icon}
    <i class={`arcana-avatar__icon ${icon}`} aria-hidden="true"></i>
  {:else}
    <svg class="arcana-avatar__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={GLYPH_PATH} />
    </svg>
  {/if}
</span>
