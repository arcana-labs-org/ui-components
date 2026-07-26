<template>
    <!-- Com ícone: envolve o input num wrapper posicionado. Sem ícone: `<input>` puro
         (mesmo DOM de sempre — nenhum consumidor existente é afetado). -->
    <div v-if="hasIcon" class="arcana-input-wrap" :class="`arcana-input-wrap--${size}`">
        <span v-if="hasIconStart" class="arcana-input__icon arcana-input__icon--start">
            <slot name="icon-start" />
        </span>
        <input v-bind="inputAttrs" class="arcana-input" :class="rootClasses" v-on="inputListeners" />
        <span v-if="hasIconEnd" class="arcana-input__icon arcana-input__icon--end">
            <slot name="icon-end" />
        </span>
    </div>
    <input v-else v-bind="inputAttrs" class="arcana-input" :class="rootClasses" v-on="inputListeners" />
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ArcanaInput>` — input HTML nativo com estilos shadcn (palette zinc).
 *
 * API:
 * - `modelValue` (v-model) — valor (string | number)
 * - `type` — tipo HTML do input (`text` default; `number`, `email`, `password`, etc)
 * - `placeholder`, `disabled`, `readonly`, `min`, `max`, `step`, `maxlength`,
 *   `autocomplete`, `name` — passam direto pro `<input>`
 * - `size` — `'sm' | 'md' | 'lg'` (default `'md'`)
 *
 * Ícones (opcionais): slots `#icon-start` e `#icon-end` renderizam conteúdo no início
 * e/ou no fim do campo. Aceitam qualquer conteúdo (SVG, `<i class="...">`, texto). Quando
 * presentes, o input é envolvido num `.arcana-input-wrap`; sem eles, segue `<input>` puro.
 *
 * Por que componente próprio em vez de wrapping `<input>` direto?
 * ──────────────────────────────────────────────────────────────
 * - Centraliza estilos shadcn (border zinc, focus zinc, palette consistente)
 * - Mesma API/tokens dos outros componentes shadcn (`ArcanaSelect`, `ArcanaRadioCardGroup`)
 * - `type="number"` aceita number no v-model (parseFloat automático)
 *
 * Exemplo:
 *
 *     <ArcanaInput v-model="form.email" type="email" placeholder="email@empresa.com" />
 *     <ArcanaInput v-model="form.qty" type="number" min="0" max="100" :disabled="locked" />
 *
 *     <ArcanaInput v-model="form.q" placeholder="Buscar…">
 *         <template #icon-start><i class="icon-search" /></template>
 *     </ArcanaInput>
 */
export default {
    name: 'ArcanaInput',

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
        hasIconStart(): boolean {
            return !!this.$slots['icon-start']
        },
        hasIconEnd(): boolean {
            return !!this.$slots['icon-end']
        },
        hasIcon(): boolean {
            return this.hasIconStart || this.hasIconEnd
        },
        rootClasses(): string {
            const cls = [`arcana-input--${this.size}`]
            if (this.disabled) cls.push('arcana-input--disabled')
            if (this.hasIconStart) cls.push('arcana-input--icon-start')
            if (this.hasIconEnd) cls.push('arcana-input--icon-end')
            return cls.join(' ')
        },
        // Atributos e listeners do `<input>` centralizados pra reaproveitar nos dois
        // ramos do template (com e sem wrapper de ícone) sem duplicar a marcação.
        inputAttrs(): Record<string, unknown> {
            return {
                type: this.type,
                value: this.modelValue,
                placeholder: this.placeholder,
                disabled: this.disabled,
                readonly: this.readonly,
                min: this.min,
                max: this.max,
                step: this.step,
                maxlength: this.maxlength,
                autocomplete: this.autocomplete,
                name: this.name,
            }
        },
        inputListeners(): Record<string, (e: Event) => void> {
            return {
                input: this.onInput,
                change: this.onChange,
                blur: (e: Event) => this.$emit('blur', e),
                focus: (e: Event) => this.$emit('focus', e),
                keydown: (e: Event) => this.$emit('keydown', e),
                keyup: (e: Event) => this.$emit('keyup', e),
            }
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
