<template>
    <div
        class="arcana-settings-list__item"
        :class="{
            'arcana-settings-list__item--disabled': disabled,
            'arcana-settings-list__item--nested': nested,
        }"
    >
        <div class="arcana-settings-list__text">
            <div class="arcana-settings-list__label">
                <slot name="label">{{ label }}</slot>
            </div>
            <div v-if="hasCaption" class="arcana-settings-list__caption">
                <slot name="caption">{{ caption }}</slot>
            </div>
        </div>
        <div class="arcana-settings-list__action">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ArcanaSettingsListItem>` — item individual de uma `<ArcanaSettingsList>`.
 *
 * Estrutura: `[label + caption]  ←→  [action slot]`. O slot default é onde o caller
 * coloca o controle (switch / current-value + edit button / badge etc).
 *
 * API:
 * - `label` — título principal (string OU slot `#label` pra HTML custom com badges)
 * - `caption` — descrição muted abaixo do label (string OU slot `#caption`)
 * - `disabled` — boolean (apaga visualmente + bloqueia pointer-events)
 *
 * Slots:
 * - `default` — controle à direita (switch, edit button, etc)
 * - `#label` — HTML custom no label (ex: label + status badge inline)
 * - `#caption` — HTML custom na caption
 *
 * Exemplo:
 *
 *     <ArcanaSettingsListItem
 *         label="Notificações por e-mail"
 *         caption="Resumo diário das atividades operacionais"
 *     >
 *         <ArcanaSwitch v-model="form.notify_email" />
 *     </ArcanaSettingsListItem>
 *
 *     <!-- Com status badge inline no label -->
 *     <ArcanaSettingsListItem caption="Sistema SaaS — plano via tabela de assinaturas">
 *         <template #label>
 *             Assinatura V2 <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span>
 *         </template>
 *         <ArcanaSwitch v-model="form.subscription_v2_enabled" />
 *     </ArcanaSettingsListItem>
 */
export default {
    name: 'ArcanaSettingsListItem',

    props: {
        label: {
            type: String,
            default: '',
        },
        caption: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Indica que o item é subordinado a um item principal acima — visual com
         * padding-left maior + marcador `╲╱` sutil + bg `#fafafa`. Usado pra
         * sub-toggles que só fazem sentido quando o switch principal está ativo
         * (ex: "Exibir App Web" como sub-config de "Cartão de Crédito").
         */
        nested: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        hasCaption(): boolean {
            return Boolean(this.caption) || Boolean(this.$slots.caption)
        },
    },
} as Component
</script>
