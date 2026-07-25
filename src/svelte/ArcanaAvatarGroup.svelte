<script lang="ts">
  /**
   * `<ArcanaAvatarGroup>` — Svelte 5 port. Pilha de avatares sobrepostos. Reproduz
   * `<div class="arcana-avatar-group">` (+ `--{size}`/`--{shape}`) com os avatares e a
   * bolha `.arcana-avatar-group__overflow`, idêntico ao SFC.
   *
   * Duas formas de alimentar, combináveis (os data-driven vêm primeiro, depois o
   * snippet `children`):
   * 1. **Data-driven** — prop `avatars`. É a única em que o `max` sabe cortar, então é
   *    ela que rende o "+N" automático.
   * 2. **Composição** — `<ArcanaAvatar>` dentro do componente (snippet `children`).
   *    Aqui o grupo NÃO fatia (um snippet não é uma lista contável): passe
   *    `overflowCount` com quantos ficaram de fora e o grupo desenha a mesma bolha "+N".
   *
   * `size` propaga para TODOS os filhos, inclusive os do snippet: o grupo seta
   * `--arcana-avatar-size` e o avatar resolve o tamanho por herança (o valor herdado do
   * grupo vence o tamanho próprio do filho). Ver `styles/parts/avatar.scss`.
   *
   * Equivalências Vue → Svelte 5: slot default → snippet `children`.
   */
  import type { Snippet } from "svelte";
  import ArcanaAvatar from "./ArcanaAvatar.svelte";
  import type { AvatarShape, AvatarSize } from "./ArcanaAvatar.svelte";

  export interface AvatarGroupItem {
    src?: string;
    alt?: string;
    initials?: string;
    /** Classe de ícone do fallback (ex: `fa-solid fa-user`). */
    icon?: string;
    /** Cor de fundo do fallback deste avatar. */
    color?: string;
  }

  let {
    avatars = [],
    max = 0,
    overflowCount = 0,
    size = undefined,
    shape = undefined,
    overlap = undefined,
    spacing = undefined,
    ariaLabel = "",
    children,
    class: className = "",
  }: {
    avatars?: AvatarGroupItem[];
    /** Máximo de itens de `avatars` a exibir; o excedente vira "+N". `0` = sem limite. */
    max?: number;
    /** "+N" manual, para quando os avatares vêm pelo snippet (o grupo não fatia). */
    overflowCount?: number;
    /** Propaga aos filhos. Omitido = cada avatar usa o seu. */
    size?: AvatarSize | number;
    /** Normaliza os filhos (inclusive projetados). Omitido = cada avatar usa o seu. */
    shape?: AvatarShape;
    /** px que cada avatar cobre do anterior. Default: 30% do tamanho. */
    overlap?: number;
    /** Espaçamento positivo (px). Informado, vence o `overlap`. */
    spacing?: number;
    ariaLabel?: string;
    children?: Snippet;
    class?: string;
  } = $props();

  const normalizedAvatars = $derived(avatars ?? []);

  const visibleAvatars = $derived.by(() => {
    const limit = Number(max) || 0;
    return limit > 0 ? normalizedAvatars.slice(0, limit) : normalizedAvatars;
  });

  /** Excedente do `avatars` + o "+N" manual (caso composição). */
  const overflowTotal = $derived(
    normalizedAvatars.length - visibleAvatars.length + Math.max(0, Number(overflowCount) || 0)
  );

  /** Tamanho numérico (px) quando `size` não é um degrau da escala. */
  const numericSize = $derived.by(() => {
    if (size === undefined || size === null || (size as unknown) === "") return null;
    const n = typeof size === "number" ? size : Number(size);
    return Number.isFinite(n) ? n : null;
  });

  const rootStyle = $derived.by(() => {
    const parts: string[] = [];
    if (numericSize !== null) parts.push(`--arcana-avatar-size: ${numericSize}px;`);
    // `spacing` (espaço positivo) vence `overlap` (sobreposição).
    if (spacing !== undefined && spacing !== null) {
      parts.push(`--arcana-avatar-group-overlap: ${-Number(spacing)}px;`);
    } else if (overlap !== undefined && overlap !== null) {
      parts.push(`--arcana-avatar-group-overlap: ${Number(overlap)}px;`);
    }
    return parts.join(" ") || undefined;
  });
</script>

<div
  class={[
    "arcana-avatar-group",
    size !== undefined && numericSize === null ? `arcana-avatar-group--${size}` : "",
    shape ? `arcana-avatar-group--${shape}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")}
  style={rootStyle}
  role="group"
  aria-label={ariaLabel || undefined}
>
  {#each visibleAvatars as avatar, i (i)}
    <ArcanaAvatar
      src={avatar.src || ""}
      alt={avatar.alt || ""}
      initials={avatar.initials || ""}
      icon={avatar.icon || ""}
      color={avatar.color || ""}
      shape={shape || "circle"}
    />
  {/each}

  {#if children}{@render children()}{/if}

  {#if overflowTotal > 0}
    <span class={`arcana-avatar arcana-avatar-group__overflow arcana-avatar--${shape || "circle"}`}
      >+{overflowTotal}</span
    >
  {/if}
</div>
