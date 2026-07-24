<template>
    <div class="shadcn-settings-list">
        <slot />
    </div>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ShadcnSettingsList>` — container de lista de configurações estilo iOS Settings.
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
 * - Listas onde items precisam destacar entre si (use `<ShadcnSwitchCard>` para impact)
 *
 * Slots:
 * - `default` — items (use `<ShadcnSettingsListItem>` ou `<ShadcnSettingsListGroup>`)
 *
 * Exemplo:
 *
 *     <ShadcnSettingsList>
 *         <ShadcnSettingsListItem label="Plano" caption="...">
 *             <span class="shadcn-settings-list__current-value">Profissional</span>
 *             <button class="shadcn-settings-list__edit-btn" @click="...">Alterar</button>
 *         </ShadcnSettingsListItem>
 *
 *         <ShadcnSettingsListItem label="PopGás" caption="...">
 *             <ShadcnSwitch v-model="form.is_popgas" />
 *         </ShadcnSettingsListItem>
 *     </ShadcnSettingsList>
 */
export default {
    name: 'ShadcnSettingsList',
} as Component
</script>

<!--
    Estilos NÃO scoped: as classes `.shadcn-settings-list*` são compartilhadas por
    `ShadcnSettingsList`, `ShadcnSettingsListItem`, `ShadcnSettingsListGroup` +
    helpers (`__current-value`, `__edit-btn`) usados pelo caller no slot. Mantemos
    um único `<style>` no parent (`ShadcnSettingsList`) — quem importar este file
    carrega todo o tema globalmente via Vue SFC.
-->
