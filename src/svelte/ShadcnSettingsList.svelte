<script lang="ts">
  /**
   * `<ShadcnSettingsList>` — Svelte 5 port do SFC Vue. Container de lista de configurações
   * estilo iOS Settings. Markup/classe `shadcn-settings-list` idêntico ao SFC.
   *
   * slot default → snippet `children` (use `<ShadcnSettingsListItem>`/`<ShadcnSettingsListGroup>`).
   */
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div class="shadcn-settings-list">{@render children?.()}</div>
