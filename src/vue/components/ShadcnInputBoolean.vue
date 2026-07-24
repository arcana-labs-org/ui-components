<template>
    <ShadcnSelect
        :model-value="normalizedValue"
        :options="options"
        :disabled="disabled"
        :placeholder="placeholder"
        @update:modelValue="onChange"
    />
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ShadcnInputBoolean>` — versão shadcn do `InputBoolean` legado.
 *
 * Mesma API e variações do componente Bootstrap-style, mas renderiza como
 * `<ShadcnSelect>` (palette zinc, dropdown teleportado pro body). Aceita os
 * mesmos valores normalizados:
 *
 * - `1` / `true`  → "Sim" (ou "Ativo" quando `variation="status"`)
 * - `0` / `false` → "Não" (ou "Inativo" quando `variation="status"`)
 * - `null`        → sem seleção (mostra placeholder)
 *
 * Variations:
 * - `'status'`   — labels viram "Ativo"/"Inativo" (mantém values 1/0)
 * - `'nullable'` — values viram `'IS_NOT_NULL'`/`'IS_NULL'` (filtros SQL-like)
 * - sem variation — Sim/Não com values 1/0
 *
 * Quando `clearable=true` (default), inclui uma opção "Todos" no topo da lista
 * que zera o valor (`null`) — útil em contextos de filtro onde "sem filtro"
 * é um estado válido. Para forms onde o boolean é obrigatório, passe
 * `:clearable="false"`.
 */
export default {
    name: 'ShadcnInputBoolean',

    emits: ['update:modelValue', 'change'],

    inheritAttrs: false,

    props: {
        modelValue: {
            required: true,
        },
        variation: {
            type: String,
            default: '',
        },
        disabled: {
            type: [Boolean, Number],
            default: false,
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        placeholder: {
            type: String,
            default: 'Selecione…',
        },
    },

    computed: {
        yesText(): string {
            return this.variation === 'status' ? 'Ativo' : 'Sim'
        },
        noText(): string {
            return this.variation === 'status' ? 'Inativo' : 'Não'
        },
        yesValue(): string | number {
            return this.variation === 'nullable' ? 'IS_NOT_NULL' : 1
        },
        noValue(): string | number {
            return this.variation === 'nullable' ? 'IS_NULL' : 0
        },

        options(): Array<{ label: string; value: any }> {
            const opts: Array<{ label: string; value: any }> = [
                { label: this.yesText, value: this.yesValue },
                { label: this.noText, value: this.noValue },
            ]
            if (this.clearable) {
                opts.unshift({ label: 'Todos', value: null })
            }
            return opts
        },

        normalizedValue() {
            // Aceita os mesmos formatos do InputBoolean legado:
            // true/1, false/0, 'IS_NOT_NULL'/'IS_NULL', ou null.
            if (this.modelValue === true) return this.variation === 'nullable' ? 'IS_NOT_NULL' : 1
            if (this.modelValue === false) return this.variation === 'nullable' ? 'IS_NULL' : 0
            return this.modelValue
        },
    },

    methods: {
        onChange(v: any) {
            this.$emit('update:modelValue', v)
            this.$emit('change', v)
        },
    },
} as Component
</script>
