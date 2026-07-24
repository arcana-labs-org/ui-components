<template>
    <div class="arcana-settings-list">
        <slot />
    </div>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ArcanaSettingsList>` — container de lista de configurações estilo iOS Settings.
 *
 * Items numa lista única separados por hairline `#f4f4f5`. Cada item tem label +
 * caption à esquerda e controle (switch ou texto + botão "Alterar") à direita.
 * Hover row em `#fafafa` sinaliza interatividade.
 *
 * Quando usar:
 * - Aba "Configurações Gerais" da organização (mistura switches + edit fields)
 * - Painéis de preferências do usuário (3+ toggles relacionados)
 * - Listas onde os items têm peso visual equivalente (sem hierarquia interna)
 *
 * Quando NÃO usar:
 * - Configs com edição inline frequente (use form direto)
 * - Listas onde items precisam destacar entre si (use `<ArcanaSwitchCard>` para impact)
 *
 * Slots:
 * - `default` — items (use `<ArcanaSettingsListItem>` ou `<ArcanaSettingsListGroup>`)
 *
 * Exemplo:
 *
 *     <ArcanaSettingsList>
 *         <ArcanaSettingsListItem label="Plano" caption="...">
 *             <span class="arcana-settings-list__current-value">Profissional</span>
 *             <button class="arcana-settings-list__edit-btn" @click="...">Alterar</button>
 *         </ArcanaSettingsListItem>
 *
 *         <ArcanaSettingsListItem label="Arcana" caption="...">
 *             <ArcanaSwitch v-model="form.enabled" />
 *         </ArcanaSettingsListItem>
 *     </ArcanaSettingsList>
 */
export default {
    name: 'ArcanaSettingsList',
} as Component
</script>

<!--
    Estilos NÃO scoped: as classes `.arcana-settings-list*` são compartilhadas por
    `ArcanaSettingsList`, `ArcanaSettingsListItem`, `ArcanaSettingsListGroup` +
    helpers (`__current-value`, `__edit-btn`) usados pelo caller no slot. Mantemos
    um único `<style>` no parent (`ArcanaSettingsList`) — quem importar este file
    carrega todo o tema globalmente via Vue SFC.
-->
