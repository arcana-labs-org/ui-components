<script lang="ts">
  /**
   * `<ArcanaRadioIndicator>` — Svelte 5 port. O círculo + dot visual de um radio button,
   * puramente decorativo (`aria-hidden`). É o building block compartilhado entre
   * `<ArcanaRadio>`, `<ArcanaRadioCardGroup>`, `<ArcanaSegmentedControl>` e
   * `<ArcanaSwitchSegmented>`.
   *
   * O estado marcado vem do prop `checked` (não do CSS do ancestral), então o mesmo
   * indicador serve tanto pro radio de verdade (com `<input>` ao lado) quanto pros
   * círculos decorativos dentro de botões `role="radio"`.
   *
   * Props:
   * - `checked` — preenche o dot (animado, scale 0→1).
   * - `disabled` — apenas esmaece (o controle de foco/interação é de quem embrulha).
   * - `size` — `'sm' | 'md' | 'lg'` (14 / 16 / 18px). Default `'md'`.
   * - `tone` — `'solid'` (borda neutra, marcado na cor de marca) | `'on-solid'` (branco,
   *   pra círculo sobre um pill colorido ativo). Default `'solid'`.
   */
  let {
    checked = false,
    disabled = false,
    size = "md",
    tone = "solid",
    class: className = "",
  }: {
    checked?: boolean;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    tone?: "solid" | "on-solid";
    class?: string;
  } = $props();
</script>

<span
  class={[
    "arcana-radio-indicator",
    `arcana-radio-indicator--${size}`,
    `arcana-radio-indicator--${tone}`,
    checked ? "is-checked" : "",
    disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")}
  aria-hidden="true"
>
  <span class="arcana-radio-indicator__dot"></span>
</span>
