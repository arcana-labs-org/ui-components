<template>
    <div class="arcana-onboarding">
        <!--
            Visual: dois rings concêntricos pulsando + ícone gradient azul.
            Inspirado nos empty/setup states do arcana-vue.
        -->
        <div class="arcana-onboarding__visual">
            <div class="arcana-onboarding__ring"></div>
            <div class="arcana-onboarding__ring arcana-onboarding__ring--2"></div>
            <div class="arcana-onboarding__icon">
                <i :class="icon"></i>
            </div>
        </div>

        <h3 class="arcana-onboarding__title">{{ title }}</h3>

        <p v-if="$slots.default || description" class="arcana-onboarding__desc">
            <slot>{{ description }}</slot>
        </p>

        <!--
            Ação principal. Caller pode passar via `#action` slot (full custom button)
            ou usar a CTA padrão (azul gradient match com o ícone) e ouvir o evento `@action`.
        -->
        <div v-if="$slots.action || actionLabel || secondaryActionLabel" class="arcana-onboarding__action">
            <slot name="action">
                <ArcanaButton
                    v-if="actionLabel"
                    variant="primary"
                    :disabled="actionLoading"
                    @click="$emit('action')"
                >
                    <i v-if="actionLoading" class="fa-solid fa-spinner fa-spin"></i>
                    <i v-else-if="actionIcon" :class="actionIcon"></i>
                    {{ actionLabel }}
                </ArcanaButton>
                <ArcanaButton
                    v-if="secondaryActionLabel"
                    variant="outline"
                    @click="$emit('secondary-action')"
                >
                    <i v-if="secondaryActionIcon" :class="secondaryActionIcon"></i>
                    {{ secondaryActionLabel }}
                </ArcanaButton>
            </slot>
        </div>

        <!--
            Sub-hint discreto no rodapé (ex.: "🔒 O arquivo é encriptado").
            Renderiza só se o slot ou a prop tiver conteúdo.
        -->
        <p v-if="$slots['sub-hint'] || subHint" class="arcana-onboarding__sub-hint">
            <slot name="sub-hint">
                <i v-if="subHintIcon" :class="subHintIcon"></i>
                <span>{{ subHint }}</span>
            </slot>
        </p>
    </div>
</template>

<script lang="ts">
import { type Component } from "vue"
import ArcanaButton from "./ArcanaButton.vue"

/**
 * `<ArcanaOnboardingPanel>` — empty state/CTA panel pra primeiras configurações.
 *
 * Visual padronizado: card com background sutil de pontos + radial-gradient azul no topo,
 * ícone em gradient azul cercado por dois rings pulsando, título grande + descrição,
 * CTA primária e (opcional) sub-hint no rodapé.
 *
 * Pensado pra estados "ainda não configurado" — cadastros vazios, onboarding de features,
 * primeiras integrações. Substitui os empty-states ad-hoc espalhados pelos módulos.
 *
 * Exemplos:
 *
 * Props-only (caso simples):
 * ```vue
 * <ArcanaOnboardingPanel
 *     icon="fa-solid fa-clock"
 *     title="Configure os horários de atendimento"
 *     description="Cadastre os intervalos em que esta empresa atende."
 *     action-label="Adicionar Horário"
 *     sub-hint="Exibidos no app e no chatbot."
 *     sub-hint-icon="fa-solid fa-circle-info"
 *     @action="openCreate"
 * />
 * ```
 *
 * Slots (caso rico — `<strong>`, botão custom, etc):
 * ```vue
 * <ArcanaOnboardingPanel icon="fa-solid fa-file-shield" title="Configure seu certificado">
 *     <template #default>
 *         O certificado digital A1 é necessário pra emitir <strong>NF-e</strong> e demais
 *         documentos fiscais.
 *     </template>
 *     <template #action>
 *         <ArcanaButton variant="primary" @click="..."><i class="fa-solid fa-plus" /> Configurar Certificado</ArcanaButton>
 *     </template>
 *     <template #sub-hint>
 *         <i class="fa-solid fa-lock"></i> O arquivo é encriptado antes de ser armazenado.
 *     </template>
 * </ArcanaOnboardingPanel>
 * ```
 */
export default {
    name: 'ArcanaOnboardingPanel',

    components: { ArcanaButton },

    emits: ['action', 'secondary-action'],

    props: {
        /** Classe FontAwesome do ícone central (ex.: 'fa-solid fa-clock'). */
        icon: {
            type: String,
            required: true,
        },
        /** Título principal — destaque tipográfico (19px, weight 700). */
        title: {
            type: String,
            required: true,
        },
        /** Texto da descrição (usado se o slot default estiver vazio). */
        description: {
            type: String,
            default: '',
        },
        /** Label da CTA (usado se o slot `#action` estiver vazio). */
        actionLabel: {
            type: String,
            default: '',
        },
        /** Ícone da CTA padrão. */
        actionIcon: {
            type: String,
            default: 'fa-solid fa-plus',
        },
        /** Quando `true`, mostra um spinner no lugar do ícone e desabilita a CTA. */
        actionLoading: {
            type: Boolean,
            default: false,
        },
        /**
         * Label de uma ação SECUNDÁRIA opcional, renderizada como botão "ghost" ao lado da CTA
         * primária. Emite `secondary-action` no clique. Útil quando o empty-state oferece dois
         * caminhos (ex.: "Novo Produto" + "Ver Produtos Recomendados").
         */
        secondaryActionLabel: {
            type: String,
            default: '',
        },
        /** Ícone da ação secundária. */
        secondaryActionIcon: {
            type: String,
            default: '',
        },
        /** Texto pro sub-hint discreto no rodapé. */
        subHint: {
            type: String,
            default: '',
        },
        /** Ícone do sub-hint (FontAwesome). */
        subHintIcon: {
            type: String,
            default: '',
        },
    },
} as Component
</script>
