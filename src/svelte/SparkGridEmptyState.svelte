<script lang="ts">
  /**
   * `<SparkGridEmptyState>` — Svelte 5 port do SFC Vue. Mostra o `<ShadcnOnboardingPanel>`
   * apenas quando a grid terminou de carregar e está genuinamente vazia (sem filtro).
   * Markup/classes `spark-grid-empty-state` idênticos ao SFC.
   *
   * Equivalências Vue → Svelte 5:
   * - `watch(loading)` que arma `loaded` no primeiro `true → false` → `$effect` + prev tracking
   * - `computed(showPanel)` → `$derived`
   * - `emit('panel-visible')` → `onPanelVisible` (immediate → dispara no mount também)
   * - `emit('action'|'secondary-action')` → `onAction` / `onSecondaryAction`
   * - slot default (conteúdo real quando NÃO vazio) → snippet `children`
   */
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import ShadcnOnboardingPanel from "./ShadcnOnboardingPanel.svelte";

  let {
    total,
    loading,
    filtered,
    icon,
    title,
    description = "",
    actionLabel,
    secondaryActionLabel = "",
    secondaryActionIcon = "",
    subHint = "",
    children,
    onAction,
    onSecondaryAction,
    onPanelVisible,
  }: {
    total: number;
    loading: boolean;
    filtered: boolean;
    icon: string;
    title: string;
    description?: string;
    actionLabel: string;
    secondaryActionLabel?: string;
    secondaryActionIcon?: string;
    subHint?: string;
    children?: Snippet;
    onAction?: () => void;
    onSecondaryAction?: () => void;
    onPanelVisible?: (visible: boolean) => void;
  } = $props();

  let loaded = $state(false);
  let prevLoading = loading;

  // Arma `loaded` no primeiro flip `loading: true → false` (mesma lógica do watch do SFC).
  $effect(() => {
    const cur = loading;
    untrack(() => {
      if (prevLoading === true && cur === false) loaded = true;
      prevLoading = cur;
    });
  });

  const showPanel = $derived(loaded && !loading && total === 0 && !filtered);

  // Notifica o pai quando o painel aparece/some (immediate: true no SFC → dispara no mount).
  let prevShow: boolean | null = null;
  $effect(() => {
    const s = showPanel;
    untrack(() => {
      if (prevShow !== s) {
        prevShow = s;
        onPanelVisible?.(s);
      }
    });
  });
</script>

<div class="spark-grid-empty-state">
  <div style={showPanel ? "display:none;" : undefined}>{@render children?.()}</div>
  {#if showPanel}
    <ShadcnOnboardingPanel
      {icon}
      {title}
      {description}
      {actionLabel}
      {secondaryActionLabel}
      {secondaryActionIcon}
      {subHint}
      onAction={() => onAction?.()}
      onSecondaryAction={() => onSecondaryAction?.()}
    />
  {/if}
</div>
