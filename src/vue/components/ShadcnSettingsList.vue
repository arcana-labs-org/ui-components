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
<style lang="scss">
.shadcn-settings-list {
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 12px;
    overflow: hidden;
    font-family: inherit;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    /*
     * Sem `margin-top` intrínseca — quem coloca o componente é responsável pelo
     * espaçamento (ex: `<ShadcnTabs>` já fornece `gap: 16px` entre tablist e
     * panel; `<Panel>` fornece `padding`). Tinha um `margin-top: 16px` aqui
     * que causava double-spacing quando usado dentro de tabs.
     */
}

/* Item — label + caption à esquerda, action à direita */
.shadcn-settings-list__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 16px 24px;
    border-bottom: 1px solid #f4f4f5;
    transition: background 120ms ease;
}

.shadcn-settings-list__item:last-child {
    border-bottom: none;
}

.shadcn-settings-list__item:hover {
    background: #fafafa;
}

.shadcn-settings-list__item--disabled {
    opacity: 0.55;
    pointer-events: none;
}

.shadcn-settings-list__item--nested {
    padding-left: 56px;
    background: #fafafa;
    position: relative;
}

.shadcn-settings-list__item--nested::before {
    content: '';
    position: absolute;
    left: 32px;
    top: 50%;
    width: 12px;
    height: 1px;
    background: #d4d4d8;
}

.shadcn-settings-list__item--nested:hover {
    background: #f4f4f5;
}

.shadcn-settings-list__item--nested .shadcn-settings-list__label {
    font-size: 13px;
    font-weight: 500;
    color: #3f3f46;
}

.shadcn-settings-list__item--nested .shadcn-settings-list__caption {
    font-size: 12px;
}

/* Text (label + caption) */
.shadcn-settings-list__text {
    flex: 1;
    min-width: 0;
}

.shadcn-settings-list__label {
    font-size: 14px;
    font-weight: 600;
    color: #09090b;
    margin-bottom: 2px;
    line-height: 1.35;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.shadcn-settings-list__caption {
    font-size: 12.5px;
    color: #71717a;
    line-height: 1.45;
}

/* Action (lado direito) */
.shadcn-settings-list__action {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

/* Helpers visuais */
.shadcn-settings-list__current-value {
    font-size: 13px;
    color: #3f3f46;
    font-weight: 500;
    white-space: nowrap;
    max-width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.shadcn-settings-list__current-value--mono {
    font-family: inherit;
    font-size: 12px;
    color: #3f3f46;
    background: #f4f4f5;
    padding: 3px 8px;
    border-radius: 5px;
    letter-spacing: 0.02em;
}

.shadcn-settings-list__current-value--empty {
    color: #a1a1aa;
    font-weight: 400;
    font-style: italic;
}

.shadcn-settings-list__edit-btn {
    font-family: inherit;
    font-size: 12.5px;
    font-weight: 500;
    color: #3f3f46;
    background: white;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    transition: border-color 150ms ease, background 150ms ease, color 150ms ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    line-height: 1;
}

.shadcn-settings-list__edit-btn:hover {
    border-color: #d4d4d8;
    background: #fafafa;
    color: #09090b;
}

.shadcn-settings-list__edit-btn:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 2px;
}

.shadcn-settings-list__edit-btn svg {
    width: 11px;
    height: 11px;
    stroke-width: 2;
}

/* Group section (opcional) */
.shadcn-settings-list__group {
    border-bottom: 1px solid #e4e4e7;
}

.shadcn-settings-list__group:last-child {
    border-bottom: none;
}

.shadcn-settings-list__group-head {
    padding: 14px 24px 12px;
    background: #fafafa;
    border-bottom: 1px solid #e4e4e7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.shadcn-settings-list__group-head-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
}

.shadcn-settings-list__group-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 14px;
    transition: background 150ms ease, color 150ms ease;
}

.shadcn-settings-list__group-icon--blue    { background: #dbeafe; color: #1d4ed8; }
.shadcn-settings-list__group-icon--emerald { background: #d1fae5; color: #047857; }
.shadcn-settings-list__group-icon--amber   { background: #fef3c7; color: #b45309; }
.shadcn-settings-list__group-icon--rose    { background: #ffe4e6; color: #be123c; }
.shadcn-settings-list__group-icon--violet  { background: #ede9fe; color: #6d28d9; }
.shadcn-settings-list__group-icon--indigo  { background: #e0e7ff; color: #4338ca; }
.shadcn-settings-list__group-icon--teal    { background: #ccfbf1; color: #0f766e; }
.shadcn-settings-list__group-icon--slate   { background: #f1f5f9; color: #475569; }

.shadcn-settings-list__group-num {
    font-family: inherit;
    font-size: 10px;
    color: #a1a1aa;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 2px;
}

.shadcn-settings-list__group-title {
    font-size: 14px;
    font-weight: 600;
    color: #09090b;
    letter-spacing: -0.005em;
    line-height: 1.25;
}

.shadcn-settings-list__group-meta {
    font-family: inherit;
    font-size: 10px;
    color: #a1a1aa;
    letter-spacing: 0.1em;
    flex-shrink: 0;
}

/* Responsive — stack action embaixo do texto em telas estreitas */
@media (max-width: 640px) {
    .shadcn-settings-list__item {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 14px 18px;
    }

    .shadcn-settings-list__action {
        width: 100%;
        justify-content: flex-start;
    }

    .shadcn-settings-list__group-head {
        padding: 12px 18px 10px;
    }
}
</style>
