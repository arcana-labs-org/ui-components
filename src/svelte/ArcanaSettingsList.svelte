<script lang="ts">
  /**
   * `<ArcanaSettingsList>` — Svelte 5 port do SFC Vue. Container de lista de configurações
   * estilo iOS Settings. Markup/classe `arcana-settings-list` idêntico ao SFC.
   *
   * slot default → snippet `children` (use `<ArcanaSettingsListItem>`/`<ArcanaSettingsListGroup>`).
   */
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div class="arcana-settings-list">{@render children?.()}</div>
