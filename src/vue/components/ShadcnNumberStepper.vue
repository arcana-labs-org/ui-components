<template>
    <div
        class="shadcn-number-stepper"
        :class="{ 'is-disabled': disabled }"
    >
        <button
            type="button"
            class="shadcn-number-stepper__btn shadcn-number-stepper__btn--decrement"
            :disabled="cannotDecrement"
            :aria-label="'Diminuir ' + (ariaLabel || 'valor')"
            @click="decrement"
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                aria-hidden="true"
            >
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>

        <input
            ref="inputRef"
            type="number"
            class="shadcn-number-stepper__input"
            :value="modelValue"
            :min="min"
            :max="max"
            :step="step"
            :disabled="disabled"
            :aria-label="ariaLabel || undefined"
            @input="onInput"
            @blur="onBlur"
            @keydown="onKeydown"
        />

        <button
            type="button"
            class="shadcn-number-stepper__btn shadcn-number-stepper__btn--increment"
            :disabled="cannotIncrement"
            :aria-label="'Aumentar ' + (ariaLabel || 'valor')"
            @click="increment"
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                aria-hidden="true"
            >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnNumberStepper>` — input numérico com botões `−` / `+` ao lado.
 *
 * Padrão visual shadcn (palette zinc) — útil pra ajustes finos de quantidade onde
 * o user normalmente clica algumas vezes em vez de digitar (addons, qty, etc.).
 *
 * API:
 * - `modelValue` (v-model) — number
 * - `min` (default 0)
 * - `max` (default Infinity)
 * - `step` (default 1)
 * - `disabled`
 * - `ariaLabel` — texto descritivo pra screen reader
 *
 * Detalhes:
 * - Os botões respeitam min/max — ficam disabled nos limites
 * - Suporta Enter/Setas no input (browser default)
 * - Empty/inválido → coage pra `min` no blur
 * - Spinners nativos do `type="number"` escondidos (visual apenas botões custom)
 */
export default {
    name: 'ShadcnNumberStepper',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: [Number, String, null] as PropType<number | string | null>,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: Number.POSITIVE_INFINITY,
        },
        step: {
            type: Number,
            default: 1,
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
        currentValue(): number {
            const n = Number(this.modelValue)
            return Number.isFinite(n) ? n : this.min
        },

        cannotDecrement(): boolean {
            return this.disabled || this.currentValue <= this.min
        },

        cannotIncrement(): boolean {
            return this.disabled || this.currentValue >= this.max
        },
    },

    methods: {
        clamp(value: number): number {
            return Math.min(this.max, Math.max(this.min, value))
        },

        emitValue(value: number) {
            const clamped = this.clamp(value)
            this.$emit('update:modelValue', clamped)
            this.$emit('change', clamped)
        },

        increment() {
            if (this.cannotIncrement) return
            this.emitValue(this.currentValue + this.step)
        },

        decrement() {
            if (this.cannotDecrement) return
            this.emitValue(this.currentValue - this.step)
        },

        onInput(e: Event) {
            const target = e.target as HTMLInputElement
            const raw = target.value
            // Empty mantém vazio enquanto o user tá digitando — coage no blur
            if (raw === '') {
                this.$emit('update:modelValue', null)
                return
            }
            const n = Number(raw)
            if (Number.isFinite(n)) {
                this.emitValue(n)
            }
        },

        onBlur() {
            // Garante que o valor final é válido (sem `null` ou string vazia em produção)
            const n = Number(this.modelValue)
            const final = Number.isFinite(n) ? this.clamp(n) : this.min
            if (final !== Number(this.modelValue)) {
                this.$emit('update:modelValue', final)
                this.$emit('change', final)
            }
        },

        onKeydown(e: KeyboardEvent) {
            // Setas + Enter já são tratadas pelo browser no `type="number"`. Só interceptamos
            // pra disparar o emit quando muda valor.
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                this.increment()
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                this.decrement()
            }
        },
    },
} as Component
</script>
