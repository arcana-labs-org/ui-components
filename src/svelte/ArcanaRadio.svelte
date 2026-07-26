<script lang="ts">
  /**
   * `<ArcanaRadio>` — Svelte 5 port. Radio button único: `<input type="radio">` nativo
   * (escondido visualmente, mas focável) + `<ArcanaRadioIndicator>` + label opcional.
   *
   * Grupo se forma como no HTML: vários `<ArcanaRadio>` com o mesmo `name` e um
   * `groupValue` compartilhado. Fica marcado quando `groupValue === value`. Pra listas
   * ricas (ícone, descrição, badge) use `<ArcanaRadioCardGroup>`.
   *
   * API:
   * - `groupValue` — valor selecionado do grupo. `value` — valor desta opção.
   * - `checked` — força o estado marcado (alternativa a `groupValue`/`value`; vence).
   * - `name` — `name` HTML do grupo. `disabled` — desativa esta opção.
   * - `label` — texto (ou use o snippet `children` pra conteúdo custom).
   * - `size` (`'sm'|'md'|'lg'`) e `tone` (`'solid'|'on-solid'`) — repassados ao indicador.
   *
   * Equivalências (parity com o port React): `emit('change')` → callback `onChange`;
   * o slot default → snippet `children`.
   */
  import type { Snippet } from "svelte";
  import ArcanaRadioIndicator from "./ArcanaRadioIndicator.svelte";

  let {
    value,
    groupValue,
    checked,
    name,
    disabled = false,
    label = "",
    size = "md",
    tone = "solid",
    onChange,
    children,
    class: className = "",
  }: {
    value?: string | number | boolean | null;
    groupValue?: string | number | boolean | null;
    checked?: boolean;
    name?: string;
    disabled?: boolean;
    label?: string;
    size?: "sm" | "md" | "lg";
    tone?: "solid" | "on-solid";
    onChange?: (value: string | number | boolean | null | undefined) => void;
    children?: Snippet;
    class?: string;
  } = $props();

  /**
   * `checked` explícito tem prioridade; senão deriva de `groupValue === value`.
   * Permite tanto o uso controlado por grupo quanto o standalone.
   */
  const isChecked = $derived(
    checked !== undefined ? checked : groupValue !== undefined && groupValue === value
  );
</script>

<label
  class={["arcana-radio", isChecked ? "is-checked" : "", disabled ? "is-disabled" : "", className]
    .filter(Boolean)
    .join(" ")}
>
  <input
    type="radio"
    class="arcana-radio__input"
    {name}
    {value}
    checked={isChecked}
    {disabled}
    onchange={() => {
      if (!disabled) onChange?.(value);
    }}
  />
  <ArcanaRadioIndicator checked={isChecked} {disabled} {size} {tone} />
  {#if children}
    <span class="arcana-radio__label">{@render children()}</span>
  {:else if label}
    <span class="arcana-radio__label">{label}</span>
  {/if}
</label>
