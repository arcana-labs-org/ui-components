<template>
    <div
        class="shadcn-segmented-options"
        :class="{ 'is-compact': compact, 'is-squared': squared, 'is-disabled': disabled }"
        :style="activeColor ? { '--seg-active': activeColor } : undefined"
        role="radiogroup"
        :aria-label="ariaLabel || undefined"
    >
        <button
            v-for="opt in normalizedOptions"
            :key="String(opt.value)"
            type="button"
            class="shadcn-segmented-options__option"
            :class="{ 'is-active': opt.value === modelValue }"
            role="radio"
            :aria-checked="opt.value === modelValue"
            :disabled="disabled || opt.disabled"
            @click="select(opt)"
        >
            <span v-if="radio" class="shadcn-segmented-options__radio" aria-hidden="true"></span>
            <i v-if="opt.icon" :class="['shadcn-segmented-options__icon', opt.icon]"></i>
            <span>{{ opt.label }}</span>
        </button>

        <span v-if="!normalizedOptions.length" class="shadcn-segmented-options__empty">
            {{ emptyText }}
        </span>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

interface SegmentedOption {
    label: string
    value: string | number
    disabled?: boolean
    icon?: string
}

/**
 * `<ShadcnSegmentedOptions>` — segmented control de N opções (irmão do `<ShadcnSwitchSegmented>`,
 * que é binário). Renderiza um botão por opção dentro de uma cápsula; o item ativo fica destacado
 * (bg escuro, texto branco). Use quando há uma lista pequena de escolhas mutuamente exclusivas
 * (ex: tipo de entrega, modo de exibição) e um select seria pesado demais visualmente.
 *
 * Diferente do `ShadcnSwitchSegmented` (boolean, 2 metades com indicador deslizante), este aceita
 * qualquer número de opções via `options` e usa `modelValue` arbitrário (string/number).
 *
 * API:
 * - `modelValue` (v-model) — valor da opção ativa
 * - `options` — `Array<{ label, value, disabled?, icon? }>`
 * - `disabled` — desabilita o grupo inteiro
 * - `compact` — altura/fonte reduzidas (uso inline em forms densos)
 * - `squared` — cantos menos arredondados (radius moderado no lugar do pill)
 * - `emptyText` — texto exibido quando `options` está vazio
 *
 * Acessibilidade: `role="radiogroup"` + `role="radio"` com `aria-checked` por opção.
 */
export default {
    name: 'ShadcnSegmentedOptions',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: [String, Number, null] as PropType<string | number | null>,
            default: null,
        },
        options: {
            type: Array as PropType<SegmentedOption[]>,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        compact: {
            type: Boolean,
            default: false,
        },
        squared: {
            type: Boolean,
            default: false,
        },
        /**
         * Cor do segmento ativo. Qualquer string CSS válida (hex, rgb, var(...)). Default
         * `#18181b` (preto zinc). O texto do ativo permanece branco — use cor escura o
         * suficiente pra manter contraste.
         */
        activeColor: {
            type: String,
            default: '',
        },
        /**
         * Mostra um radio button (círculo) à esquerda de cada opção, preenchido na ativa.
         * Reforça visualmente a seleção além do destaque de fundo.
         */
        radio: {
            type: Boolean,
            default: false,
        },
        /**
         * Quando `true`, assim que as `options` carregam e nenhuma estiver selecionada
         * (`modelValue` vazio), seleciona automaticamente a primeira opção HABILITADA como
         * default. Útil quando a lista é dinâmica (ex: tipos de entrega vindos do backend) e
         * sempre deve haver uma escolha ativa. Opt-in pra não surpreender usos que querem
         * começar "sem seleção".
         */
        autoSelectFirst: {
            type: Boolean,
            default: false,
        },
        ariaLabel: {
            type: String,
            default: '',
        },
        emptyText: {
            type: String,
            default: 'Sem opções disponíveis',
        },
    },

    computed: {
        normalizedOptions(): SegmentedOption[] {
            return this.options ?? []
        },
    },

    watch: {
        // `options` é uma nova referência a cada carga (computed no caller) → dispara quando
        // a lista dinâmica chega do backend.
        options() {
            this.autoSelectDefault()
        },
    },

    mounted() {
        this.autoSelectDefault()
    },

    methods: {
        select(opt: SegmentedOption) {
            if (this.disabled || opt.disabled || opt.value === this.modelValue) return
            this.$emit('update:modelValue', opt.value)
            this.$emit('change', opt.value)
        },

        autoSelectDefault() {
            if (!this.autoSelectFirst || this.disabled) return

            const hasValue = this.modelValue !== null && this.modelValue !== undefined && this.modelValue !== ''
            if (hasValue) return

            const first = this.normalizedOptions.find((o) => !o.disabled)
            if (!first) return

            this.$emit('update:modelValue', first.value)
            this.$emit('change', first.value)
        },
    },
} as Component
</script>
