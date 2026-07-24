<template>
    <div class="shadcn-onboarding">
        <!--
            Visual: dois rings concêntricos pulsando + ícone gradient azul.
            Inspirado nos empty/setup states do shadcn-vue.
        -->
        <div class="shadcn-onboarding__visual">
            <div class="shadcn-onboarding__ring"></div>
            <div class="shadcn-onboarding__ring shadcn-onboarding__ring--2"></div>
            <div class="shadcn-onboarding__icon">
                <i :class="icon"></i>
            </div>
        </div>

        <h3 class="shadcn-onboarding__title">{{ title }}</h3>

        <p v-if="$slots.default || description" class="shadcn-onboarding__desc">
            <slot>{{ description }}</slot>
        </p>

        <!--
            Ação principal. Caller pode passar via `#action` slot (full custom button)
            ou usar a CTA padrão (azul gradient match com o ícone) e ouvir o evento `@action`.
        -->
        <div v-if="$slots.action || actionLabel || secondaryActionLabel" class="shadcn-onboarding__action">
            <slot name="action">
                <button
                    v-if="actionLabel"
                    class="shadcn-onboarding__cta"
                    :disabled="actionLoading"
                    @click="$emit('action')"
                >
                    <i v-if="actionLoading" class="fa-solid fa-spinner fa-spin"></i>
                    <i v-else-if="actionIcon" :class="actionIcon"></i>
                    <span>{{ actionLabel }}</span>
                </button>
                <button
                    v-if="secondaryActionLabel"
                    class="shadcn-onboarding__cta shadcn-onboarding__cta--secondary"
                    @click="$emit('secondary-action')"
                >
                    <i v-if="secondaryActionIcon" :class="secondaryActionIcon"></i>
                    <span>{{ secondaryActionLabel }}</span>
                </button>
            </slot>
        </div>

        <!--
            Sub-hint discreto no rodapé (ex.: "🔒 O arquivo é encriptado").
            Renderiza só se o slot ou a prop tiver conteúdo.
        -->
        <p v-if="$slots['sub-hint'] || subHint" class="shadcn-onboarding__sub-hint">
            <slot name="sub-hint">
                <i v-if="subHintIcon" :class="subHintIcon"></i>
                <span>{{ subHint }}</span>
            </slot>
        </p>
    </div>
</template>

<script lang="ts">
import { type Component } from "vue"

/**
 * `<ShadcnOnboardingPanel>` — empty state/CTA panel pra primeiras configurações.
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
 * <ShadcnOnboardingPanel
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
 * <ShadcnOnboardingPanel icon="fa-solid fa-file-shield" title="Configure seu certificado">
 *     <template #default>
 *         O certificado digital A1 é necessário pra emitir <strong>NF-e</strong> e demais
 *         documentos fiscais.
 *     </template>
 *     <template #action>
 *         <LabeledButton label="Configurar Certificado" icon="fa-solid fa-plus" color="primary" shadcn @click="..." />
 *     </template>
 *     <template #sub-hint>
 *         <i class="fa-solid fa-lock"></i> O arquivo é encriptado antes de ser armazenado.
 *     </template>
 * </ShadcnOnboardingPanel>
 * ```
 */
export default {
    name: 'ShadcnOnboardingPanel',

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

<style>
/*
 * Estilos GLOBAIS (não-scoped) — segue convenção dos demais `Shadcn*` components, que
 * exportam classes utilitárias estáveis (`.shadcn-onboarding__*`) pra permitir override
 * por callers via `:deep()` ou simplesmente reaproveitando os tokens.
 */

.shadcn-onboarding {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 56px 32px 40px;
    border: 1px solid #e4e4e7;
    border-radius: 16px;
    background:
        radial-gradient(ellipse at top, rgba(37, 99, 235, 0.08) 0%, transparent 55%),
        linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
    overflow: hidden;
    isolation: isolate;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
.shadcn-onboarding::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(15, 23, 42, 0.05) 1px, transparent 1px);
    background-size: 22px 22px;
    mask-image: radial-gradient(ellipse at center top, #000 30%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center top, #000 30%, transparent 70%);
    pointer-events: none;
    z-index: -1;
}

/* ─── Visual: ícone + rings ──────────────────────────────────────────── */
.shadcn-onboarding__visual {
    position: relative;
    width: 96px;
    height: 96px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.shadcn-onboarding__ring,
.shadcn-onboarding__ring--2 {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.10);
    animation: shadcn-onboarding-pulse 2.4s ease-in-out infinite;
}
.shadcn-onboarding__ring--2 {
    inset: 8px;
    background: rgba(37, 99, 235, 0.18);
    animation-delay: 0.6s;
}
.shadcn-onboarding__icon {
    position: relative;
    z-index: 1;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
    color: #ffffff;
    border-radius: 16px;
    font-size: 26px;
    box-shadow:
        0 10px 25px -8px rgba(37, 99, 235, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* ─── Tipografia ──────────────────────────────────────────────────────── */
.shadcn-onboarding__title {
    font-size: 19px;
    font-weight: 700;
    color: #09090b;
    letter-spacing: -0.015em;
    margin: 0 0 8px;
    line-height: 1.3;
}
.shadcn-onboarding__desc {
    font-size: 13.5px;
    color: #52525b;
    line-height: 1.55;
    max-width: 440px;
    margin: 0 0 22px;
}
.shadcn-onboarding__desc strong { font-weight: 600; color: #18181b; }

/* ─── Ação principal ──────────────────────────────────────────────────── */
.shadcn-onboarding__action {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.shadcn-onboarding__cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 9999px;
    font-size: 13.5px;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    color: #ffffff;
    /* Mesma gradient azul do .shadcn-onboarding__icon */
    background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
    border: 1px solid #1d4ed8;
    font-family: inherit;
    transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
    box-shadow:
        0 6px 14px -6px rgba(37, 99, 235, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.shadcn-onboarding__cta:hover {
    transform: translateY(-1px);
    background: linear-gradient(180deg, #1d4ed8 0%, #1e40af 100%);
    box-shadow:
        0 8px 18px -6px rgba(37, 99, 235, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.shadcn-onboarding__cta:active {
    transform: translateY(0);
}
.shadcn-onboarding__cta:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
    box-shadow: 0 6px 14px -6px rgba(37, 99, 235, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

/* Variante secundária: botão amber — hierarquia abaixo da CTA primária azul. */
.shadcn-onboarding__cta--secondary {
    color: #ffffff;
    background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
    border: 1px solid #d97706;
    box-shadow:
        0 6px 14px -6px rgba(217, 119, 6, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.shadcn-onboarding__cta--secondary:hover {
    background: linear-gradient(180deg, #d97706 0%, #b45309 100%);
    box-shadow:
        0 8px 18px -6px rgba(217, 119, 6, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.shadcn-onboarding__cta--secondary i {
    color: #ffffff;
}
.shadcn-onboarding__cta i {
    font-size: 11px;
}

/* ─── Sub-hint discreto ───────────────────────────────────────────────── */
.shadcn-onboarding__sub-hint {
    margin: 16px 0 0;
    font-size: 11.5px;
    color: #71717a;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}
.shadcn-onboarding__sub-hint i { font-size: 10px; color: #a1a1aa; }

@keyframes shadcn-onboarding-pulse {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50%      { transform: scale(1.08); opacity: 1; }
}
</style>
