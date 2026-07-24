<template>
    <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :name="name"
        class="shadcn-input"
        :class="rootClasses"
        @input="onInput"
        @change="onChange"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @keydown="$emit('keydown', $event)"
        @keyup="$emit('keyup', $event)"
    />
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnInput>` — input HTML nativo com estilos shadcn (palette zinc).
 *
 * API:
 * - `modelValue` (v-model) — valor (string | number)
 * - `type` — tipo HTML do input (`text` default; `number`, `email`, `password`, etc)
 * - `placeholder`, `disabled`, `readonly`, `min`, `max`, `step`, `maxlength`,
 *   `autocomplete`, `name` — passam direto pro `<input>`
 * - `size` — `'sm' | 'md' | 'lg'` (default `'md'`)
 *
 * Por que componente próprio em vez de wrapping `<input>` direto?
 * ──────────────────────────────────────────────────────────────
 * - Centraliza estilos shadcn (border zinc, focus zinc, palette consistente)
 * - Mesma API/tokens dos outros componentes shadcn (`ShadcnSelect`, `ShadcnRadioCardGroup`)
 * - `type="number"` aceita number no v-model (parseFloat automático)
 *
 * Exemplo:
 *
 *     <ShadcnInput v-model="form.email" type="email" placeholder="email@empresa.com" />
 *     <ShadcnInput v-model="form.qty" type="number" min="0" max="100" :disabled="locked" />
 */
export default {
    name: 'ShadcnInput',

    emits: ['update:modelValue', 'change', 'blur', 'focus', 'keydown', 'keyup'],

    props: {
        modelValue: {
            type: [String, Number, null] as PropType<string | number | null>,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
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
        min: {
            type: [String, Number],
            default: undefined,
        },
        max: {
            type: [String, Number],
            default: undefined,
        },
        step: {
            type: [String, Number],
            default: undefined,
        },
        maxlength: {
            type: [String, Number],
            default: undefined,
        },
        autocomplete: {
            type: String,
            default: undefined,
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

    computed: {
        rootClasses(): string {
            const cls = [`shadcn-input--${this.size}`]
            if (this.disabled) cls.push('shadcn-input--disabled')
            return cls.join(' ')
        },
    },

    methods: {
        /**
         * Pra `type="number"`, converte string vazia → null e valor válido → number.
         * Pros outros types, mantém string. Evita o problema clássico de v-model="form.qty"
         * receber a string "12" em vez de o número 12.
         */
        parseValue(raw: string): string | number | null {
            if (this.type !== 'number') return raw
            if (raw === '' || raw === null || raw === undefined) return null
            const n = Number(raw)
            return Number.isNaN(n) ? raw : n
        },

        onInput(e: Event) {
            const target = e.target as HTMLInputElement
            this.$emit('update:modelValue', this.parseValue(target.value))
        },

        onChange(e: Event) {
            const target = e.target as HTMLInputElement
            this.$emit('change', this.parseValue(target.value))
        },
    },
} as Component
</script>
