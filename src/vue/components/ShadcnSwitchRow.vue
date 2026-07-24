<template>
    <button
        type="button"
        class="shadcn-switch-row"
        :class="{ 'is-on': modelValue, 'is-disabled': disabled }"
        role="switch"
        :aria-checked="Boolean(modelValue)"
        :aria-label="ariaLabel || label || undefined"
        :disabled="disabled"
        @click="toggle"
        @keydown="onKeydown"
    >
        <div class="shadcn-switch-row__text">
            <div class="shadcn-switch-row__title">
                <slot name="label">{{ label }}</slot>
            </div>
            <div v-if="hasDescription" class="shadcn-switch-row__sub">
                <slot name="description">{{ description }}</slot>
            </div>
        </div>

        <!--
            Switch compacto reusado de `<ShadcnSwitch>`. Em vez de re-criar a UI do toggle
            aqui, instanciamos o componente base — mantém consistência visual com qualquer
            outro switch shadcn da aplicação. O `:model-value` controla o estado, mas o
            click é interceptado pelo button externo (a row inteira é clicável).
            `pointer-events: none` no switch evita double-toggle.
        -->
        <ShadcnSwitch
            class="shadcn-switch-row__switch"
            :model-value="Boolean(modelValue)"
            :disabled="disabled"
            tabindex="-1"
            aria-hidden="true"
        />
    </button>
</template>

<script lang="ts">
import type { Component } from "vue"
import ShadcnSwitch from "./ShadcnSwitch.vue"

/**
 * `<ShadcnSwitchRow>` — toggle full-width estilo "linha de configuração".
 *
 * Padrão clássico de listas de preferências (iOS Settings, Linear, GitHub). Título +
 * descrição opcional ocupam a esquerda da row; switch compacto fica alinhado à direita.
 * Toda a row é clicável (não só o switch) — área de toque generosa, melhor usabilidade
 * mobile/touch.
 *
 * Quando usar:
 * - Listas de preferências/configurações (3+ toggles relacionados)
 * - Settings panels onde cada toggle tem contexto/descrição
 * - Painéis admin com configs binárias agrupadas
 *
 * Quando NÃO usar:
 * - Toggle isolado (use `<ShadcnSwitch>` compacto)
 * - Decisão entre 2 opções com labels (use `<ShadcnSwitchSegmented>`)
 * - Mudança de estado de alto impacto sistêmico (use `<ShadcnSwitchCard>`)
 *
 * API:
 * - `modelValue` (v-model) — boolean
 * - `label` — título principal (string OU slot `#label` pra HTML custom)
 * - `description` — subtítulo/descrição (string OU slot `#description`)
 * - `disabled` — boolean
 * - `ariaLabel` — fallback pra screen readers quando não há label visível
 *
 * Acessibilidade:
 * - `role="switch"` no button externo + `aria-checked`
 * - Switch interno fica `aria-hidden="true"` (single source of truth no button)
 * - Teclado: Space/Enter ativam o toggle (default em `<button>`)
 * - Hover state visual (bg #fafafa, border #d4d4d8) sinaliza interatividade
 *
 * Exemplo:
 *
 *     <ShadcnSwitchRow
 *         v-model="settings.email_notifications"
 *         label="Notificações por e-mail"
 *         description="Resumo diário das atividades da organização"
 *     />
 */
export default {
    name: 'ShadcnSwitchRow',

    components: { ShadcnSwitch },

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        ariaLabel: {
            type: String,
            default: '',
        },
    },

    computed: {
        hasDescription(): boolean {
            // Aceita tanto a prop `description` quanto o slot `#description`. Se nenhum
            // dos dois foi fornecido, esconde a div sub pra não criar espaço vazio.
            return Boolean(this.description) || Boolean(this.$slots.description)
        },
    },

    methods: {
        toggle() {
            if (this.disabled) return
            const next = !this.modelValue
            this.$emit('update:modelValue', next)
            this.$emit('change', next)
        },
        onKeydown(e: KeyboardEvent) {
            // Default do `<button>` já cobre Space/Enter, mas explicitamos pra
            // prevenir scroll da página ao apertar Space.
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                this.toggle()
            }
        },
    },
} as Component
</script>

<style scoped>
.shadcn-switch-row {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    cursor: pointer;
    transition: background 180ms ease, border-color 180ms ease;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    text-align: left;
}

.shadcn-switch-row:hover:not(.is-disabled) {
    background: #fafafa;
    border-color: #d4d4d8;
}

.shadcn-switch-row:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 2px;
}

.shadcn-switch-row.is-disabled {
    opacity: 0.55;
    cursor: not-allowed;
}

.shadcn-switch-row__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
}

.shadcn-switch-row__title {
    font-size: 14px;
    font-weight: 600;
    color: #09090b;
    line-height: 1.35;
}

.shadcn-switch-row__sub {
    font-size: 12.5px;
    color: #71717a;
    line-height: 1.45;
}

.shadcn-switch-row__switch {
    /*
     * `pointer-events: none` impede o switch de capturar o click — o button externo
     * (a row inteira) é o único click handler. Sem isso, clicar exatamente em cima
     * do switch dispararia 2 toggles (do switch + do button = no-op por cancelamento)
     * ou criaria comportamento inconsistente.
     */
    pointer-events: none;
}
</style>
