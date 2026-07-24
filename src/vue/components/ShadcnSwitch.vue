<template>
    <button
        type="button"
        role="switch"
        class="shadcn-switch"
        :class="rootClasses"
        :aria-checked="isChecked"
        :aria-label="ariaLabel || undefined"
        :disabled="disabled"
        @click="toggle"
        @keydown="onKeydown"
    >
        <span class="shadcn-switch__thumb" aria-hidden="true"></span>

        <!--
            Native input escondido pra integrar com forms HTML (submit, validação)
            e screen readers que não suportam role="switch" nativo. Sincroniza com
            o estado do componente.
        -->
        <input
            v-if="name"
            type="checkbox"
            class="shadcn-switch__hidden-input"
            :name="name"
            :checked="isChecked"
            :disabled="disabled"
            tabindex="-1"
            aria-hidden="true"
            @change.stop
        />
    </button>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnSwitch>` — toggle binário on/off (palette zinc).
 *
 * UX: pra valores booleanos onde "ligar/desligar" faz mais sentido que "Sim/Não" num
 * select. Casos típicos: auto-renew, notifications, dark mode, etc.
 *
 * API:
 * - `modelValue` (v-model) — boolean
 * - `disabled` — boolean
 * - `size` — `'sm' | 'md' | 'lg'` (default `md`)
 * - `name` — opcional, name do checkbox HTML escondido (pra forms tradicionais)
 * - `ariaLabel` — opcional, descrição pra screen reader (recomendado quando não há `<label for>`)
 *
 * Acessibilidade:
 * - `role="switch"` + `aria-checked` (padrão WAI-ARIA pra toggle)
 * - `Space`/`Enter` ativam (browser default em `<button>`)
 * - `<input type="checkbox">` escondido pra integração com formulários nativos
 *
 * Exemplo:
 *
 *     <label class="form-row">
 *         <span>Auto-renovação</span>
 *         <ShadcnSwitch v-model="form.auto_renew" aria-label="Auto-renovação" />
 *     </label>
 */
export default {
    name: 'ShadcnSwitch',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<'sm' | 'md' | 'lg'>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg'].includes(v),
        },
        name: {
            type: String,
            default: '',
        },
        ariaLabel: {
            type: String,
            default: '',
        },
    },

    computed: {
        isChecked(): boolean {
            return Boolean(this.modelValue)
        },
        rootClasses(): string {
            const cls = [`shadcn-switch--${this.size}`]
            if (this.isChecked) cls.push('is-checked')
            if (this.disabled) cls.push('is-disabled')
            return cls.join(' ')
        },
    },

    methods: {
        toggle() {
            if (this.disabled) return
            const next = !this.isChecked
            this.$emit('update:modelValue', next)
            this.$emit('change', next)
        },

        onKeydown(e: KeyboardEvent) {
            // Space/Enter já ativam o button por default; aqui só interceptamos
            // pra evitar scroll da página ao apertar Space.
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                this.toggle()
            }
        },
    },
} as Component
</script>
