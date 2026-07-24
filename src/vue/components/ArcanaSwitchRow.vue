<template>
    <button
        type="button"
        class="arcana-switch-row"
        :class="{ 'is-on': modelValue, 'is-disabled': disabled }"
        role="switch"
        :aria-checked="Boolean(modelValue)"
        :aria-label="ariaLabel || label || undefined"
        :disabled="disabled"
        @click="toggle"
        @keydown="onKeydown"
    >
        <div class="arcana-switch-row__text">
            <div class="arcana-switch-row__title">
                <slot name="label">{{ label }}</slot>
            </div>
            <div v-if="hasDescription" class="arcana-switch-row__sub">
                <slot name="description">{{ description }}</slot>
            </div>
        </div>

        <!--
            Switch compacto reusado de `<ArcanaSwitch>`. Em vez de re-criar a UI do toggle
            aqui, instanciamos o componente base — mantém consistência visual com qualquer
            outro switch shadcn da aplicação. O `:model-value` controla o estado, mas o
            click é interceptado pelo button externo (a row inteira é clicável).
            `pointer-events: none` no switch evita double-toggle.
        -->
        <ArcanaSwitch
            class="arcana-switch-row__switch"
            :model-value="Boolean(modelValue)"
            :disabled="disabled"
            tabindex="-1"
            aria-hidden="true"
        />
    </button>
</template>

<script lang="ts">
import type { Component } from "vue"
import ArcanaSwitch from "./ArcanaSwitch.vue"

/**
 * `<ArcanaSwitchRow>` — toggle full-width estilo "linha de configuração".
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
 * - Toggle isolado (use `<ArcanaSwitch>` compacto)
 * - Decisão entre 2 opções com labels (use `<ArcanaSwitchSegmented>`)
 * - Mudança de estado de alto impacto sistêmico (use `<ArcanaSwitchCard>`)
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
 *     <ArcanaSwitchRow
 *         v-model="settings.email_notifications"
 *         label="Notificações por e-mail"
 *         description="Resumo diário das atividades da organização"
 *     />
 */
export default {
    name: 'ArcanaSwitchRow',

    components: { ArcanaSwitch },

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
