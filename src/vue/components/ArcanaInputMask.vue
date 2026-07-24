<template>
    <input
        v-maska="mask"
        class="arcana-input"
        :class="rootClasses"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :name="name"
        :value="tempValue"
        @maska="onMaska"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
    />
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import { mask, tokens } from 'maska'

/**
 * `<ArcanaInputMask>` — input com máscara estilizado shadcn (palette zinc).
 *
 * Equivalente shadcn do `<InputMask>` legado (que usa `class="form-control"` Bootstrap).
 * Combina a lib `maska` (diretiva `v-maska`) com os mesmos estilos do `<ArcanaInput>` —
 * sem duplicar CSS, herda o look do input shadcn base e preserva a UX de digitação
 * com placeholder de máscara.
 *
 * Use-cases típicos: CNPJ, CPF, telefone, CEP, RG, datas formatadas (DD/MM/YYYY).
 *
 * API:
 * - `modelValue` (v-model) — string sem máscara (raw value); a máscara é aplicada apenas
 *   no display via `tempValue`.
 * - `mask` — string ou array de strings. Array suporta máscara dinâmica baseada no
 *   tamanho (ex: `['(##) ####-####', '(##) #####-####']` pra fixo/celular).
 * - `placeholder`, `disabled`, `readonly`, `name` — passam direto pro `<input>`.
 * - `size` — `'sm' | 'md' | 'lg'` (default `'md'`).
 *
 * Emite:
 * - `update:modelValue` (v-model) — sempre o raw value (sem caracteres de máscara)
 * - `blur` / `focus`
 *
 * Exemplo:
 *
 *     <ArcanaInputMask v-model="form.cnpj" mask="##.###.###/####-##" />
 *     <ArcanaInputMask v-model="form.phone" :mask="['(##) ####-####', '(##) #####-####']" />
 */
export default {
    name: 'ArcanaInputMask',

    emits: ['update:modelValue', 'blur', 'focus'],

    props: {
        modelValue: {
            type: [String, Number, null] as PropType<string | number | null>,
            default: '',
        },
        mask: {
            type: [String, Array] as PropType<string | string[]>,
            required: true,
        },
        placeholder: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: undefined,
        },
        size: {
            type: String as PropType<'sm' | 'md' | 'lg'>,
            default: 'md',
            validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
        },
    },

    data() {
        return {
            // Valor mascarado pra display. `tempValue` ≠ `modelValue` propositalmente:
            // - `modelValue` é o raw (sem caracteres de máscara) — facilita validação no backend.
            // - `tempValue` é o display formatado — escapa do clearing/replay quando v-model atualiza.
            lastValue: null as string | null,
            tempValue: null as string | null,
        }
    },

    watch: {
        modelValue(newValue: string | null) {
            // Re-aplica a máscara quando o pai muda o `modelValue` (ex: load de form, reset).
            // Sem este watch, alterações externas ao componente não refletiriam no display
            // (`tempValue` ficaria stale com o valor antigo formatado).
            if (this.lastValue !== newValue) {
                this.lastValue = newValue as string | null
                this.tempValue = newValue ? mask(String(newValue), this.getMask(), tokens) : null
            }
        },
    },

    mounted() {
        if (this.modelValue) {
            this.lastValue = this.modelValue as string | null
            this.tempValue = mask(String(this.modelValue), this.getMask(), tokens)
        }
    },

    computed: {
        rootClasses(): string {
            const cls = [`arcana-input--${this.size}`]
            if (this.disabled) cls.push('arcana-input--disabled')
            return cls.join(' ')
        },
    },

    methods: {
        getMask(): string {
            // `maska` aceita string única ou stringified array (pra máscaras dinâmicas).
            // Array vira JSON pra que a lib detecte e alterne baseada no tamanho do input.
            return Array.isArray(this.mask) ? JSON.stringify(this.mask) : this.mask
        },

        onMaska(event: any) {
            // `event.target.dataset.maskRawValue` é o raw value (sem caracteres da máscara) —
            // injetado pela diretiva `v-maska` no DOM. Emitir o raw mantém compat com o backend
            // (que espera CNPJ sem pontos, CEP sem traço, etc).
            this.$emit('update:modelValue', event.target.dataset.maskRawValue)
        },
    },
} as Component
</script>
