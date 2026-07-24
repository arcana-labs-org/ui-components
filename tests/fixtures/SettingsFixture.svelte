<script lang="ts">
  import {
    ArcanaSettingsList,
    ArcanaSettingsListGroup,
    ArcanaSettingsListItem,
    ArcanaSettingsEditButton,
    ArcanaSwitch,
  } from "../../src/svelte";

  let { onEdit }: { onEdit?: () => void } = $props();
</script>

<ArcanaSettingsList>
  <ArcanaSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo">
    <ArcanaSettingsListItem label="Plano" caption="Plano atual">
      <span class="arcana-settings-list__current-value">Profissional</span>
      <ArcanaSettingsEditButton onClick={() => onEdit?.()} />
    </ArcanaSettingsListItem>
    <ArcanaSettingsListItem label="PopGás" caption="Habilita recursos">
      <ArcanaSwitch value={false} />
    </ArcanaSettingsListItem>
  </ArcanaSettingsListGroup>
</ArcanaSettingsList>
