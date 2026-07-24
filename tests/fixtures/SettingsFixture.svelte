<script lang="ts">
  import {
    ShadcnSettingsList,
    ShadcnSettingsListGroup,
    ShadcnSettingsListItem,
    ShadcnSettingsEditButton,
    ShadcnSwitch,
  } from "../../src/svelte";

  let { onEdit }: { onEdit?: () => void } = $props();
</script>

<ShadcnSettingsList>
  <ShadcnSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo">
    <ShadcnSettingsListItem label="Plano" caption="Plano atual">
      <span class="shadcn-settings-list__current-value">Profissional</span>
      <ShadcnSettingsEditButton onClick={() => onEdit?.()} />
    </ShadcnSettingsListItem>
    <ShadcnSettingsListItem label="PopGás" caption="Habilita recursos">
      <ShadcnSwitch value={false} />
    </ShadcnSettingsListItem>
  </ShadcnSettingsListGroup>
</ShadcnSettingsList>
