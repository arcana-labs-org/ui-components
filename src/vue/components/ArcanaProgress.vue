<template>
    <div
        class="arcana-progress"
        :class="[
            `arcana-progress--${size}`,
            `arcana-progress--${variant}`,
            `arcana-progress--${tone}`,
            `arcana-progress--radius-${radius}`,
            { 'is-indeterminate': isIndeterminate },
        ]"
    >
        <div
            class="arcana-progress__track"
            role="progressbar"
            aria-valuemin="0"
            :aria-valuemax="normalizedMax"
            :aria-valuenow="isIndeterminate ? undefined : clampedValue"
            :aria-valuetext="isIndeterminate ? undefined : percentLabel"
            :aria-label="ariaLabel || undefined"
        >
            <div class="arcana-progress__indicator" :style="indicatorStyle"></div>
        </div>

        <span v-if="showValue" class="arcana-progress__value">
            <slot name="value">{{ isIndeterminate ? indeterminateText : percentLabel }}</slot>
        </span>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

import { clampProgressValue, formatProgressLabel, progressPercent } from "../../core/progress"

type ProgressTone = 'accent' | 'success' | 'danger' | 'warning' | 'info'
type ProgressSize = 'sm' | 'md' | 'lg'
type ProgressVariant = 'solid' | 'soft'
type ProgressRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

/**
 * `<ArcanaProgress>` — barra de progresso (determinada ou indeterminada).
 *
 * Anatomia: wrapper `.arcana-progress` → trilho `.arcana-progress__track` (é ELE que carrega
 * `role="progressbar"` e os `aria-value*`) → preenchimento `.arcana-progress__indicator`, mais
 * o rótulo opcional `.arcana-progress__value` ao lado.
 *
 * API:
 * - `value` — 0–`max`. **`null`/`undefined` = indeterminado** (animação contínua, sem
 *   `aria-valuenow`). Valores fora da faixa são clampados.
 * - `max` (default `100`) — teto da escala. `max <= 0` cai pro default.
 * - `size` — `'sm' | 'md' | 'lg'` (altura do trilho)
 * - `variant` — `'solid'` (preenchimento no degrau 9 do tom) ou `'soft'` (degrau 8 sobre
 *   trilho tonal, mais discreto)
 * - `tone` — `'accent' | 'success' | 'danger' | 'warning' | 'info'`
 * - `showValue` — mostra o rótulo `NN%` ao lado (slot `value` sobrepõe)
 * - `indeterminateText` — rótulo usado no modo indeterminado (default `'…'`)
 * - `radius` — `'none' | 'sm' | 'md' | 'lg' | 'full'` (default `'full'`)
 * - `ariaLabel` — nome acessível da barra (recomendado quando não há rótulo visível)
 *
 * Acessibilidade: `role="progressbar"` + `aria-valuemin`/`aria-valuemax` sempre; no
 * determinado entram também `aria-valuenow` (valor clampado) e `aria-valuetext` (`'42%'`).
 * No indeterminado ambos são OMITIDOS — é assim que o leitor de tela sabe que o progresso é
 * desconhecido.
 *
 * Movimento: a transição de largura e a animação do indeterminado são desligadas sob
 * `prefers-reduced-motion: reduce` (CSS).
 */
export default {
    name: 'ArcanaProgress',

    props: {
        value: {
            type: [Number, null] as PropType<number | null>,
            default: null,
        },
        max: {
            type: Number,
            default: 100,
        },
        size: {
            type: String as PropType<ProgressSize>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg'].includes(v),
        },
        variant: {
            type: String as PropType<ProgressVariant>,
            default: 'solid',
            validator: (v: string) => ['solid', 'soft'].includes(v),
        },
        tone: {
            type: String as PropType<ProgressTone>,
            default: 'accent',
            validator: (v: string) => ['accent', 'success', 'danger', 'warning', 'info'].includes(v),
        },
        showValue: {
            type: Boolean,
            default: false,
        },
        indeterminateText: {
            type: String,
            default: '…',
        },
        radius: {
            type: String as PropType<ProgressRadius>,
            default: 'full',
            validator: (v: string) => ['none', 'sm', 'md', 'lg', 'full'].includes(v),
        },
        ariaLabel: {
            type: String,
            default: '',
        },
    },

    computed: {
        normalizedMax(): number {
            return Number.isFinite(this.max) && this.max > 0 ? this.max : 100
        },

        percent(): number | null {
            return progressPercent(this.value, this.max)
        },

        isIndeterminate(): boolean {
            return this.percent === null
        },

        clampedValue(): number | undefined {
            const clamped = clampProgressValue(this.value, this.max)
            return clamped === null ? undefined : clamped
        },

        percentLabel(): string {
            return formatProgressLabel(this.value, this.max)
        },

        /** No indeterminado a largura é fixa pelo CSS (a animação é que anda). */
        indicatorStyle(): Record<string, string> | undefined {
            return this.percent === null ? undefined : { width: `${this.percent}%` }
        },
    },
} as Component
</script>
