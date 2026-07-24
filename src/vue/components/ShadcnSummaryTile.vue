<template>
    <div class="shadcn-summary-tile" :class="rootClasses">
        <span v-if="icon" class="shadcn-summary-tile__icon" aria-hidden="true">
            <i :class="icon"></i>
        </span>

        <div class="shadcn-summary-tile__main">
            <span class="shadcn-summary-tile__label">{{ label }}</span>
            <span
                v-if="hasSub"
                class="shadcn-summary-tile__sub"
            >
                <slot name="sub">{{ sub }}</slot>
            </span>
        </div>

        <span class="shadcn-summary-tile__value">
            <slot name="value">{{ value }}</slot>
        </span>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

type SummaryTileTone = 'neutral' | 'positive' | 'negative' | 'indigo'

/**
 * `<ShadcnSummaryTile>` — tile compacto de KPI/resumo. Layout horizontal:
 * `[icon pip] [label + sub] [value]`. Cabe num grid de 3 colunas em ~52px de altura.
 *
 * Tons (`tone`):
 * - `neutral` (default) — card branco, ícone cinza zinc
 * - `positive`          — card verde-100, borda verde-300, ícone/texto verde-700+
 * - `negative`          — card vermelho-50, borda vermelho-200, ícone/texto vermelho-700+
 * - `indigo`            — card branco neutro mas ícone com pip indigo (`Total do Acerto`)
 *
 * API:
 * - `label`  (string, required) — eyebrow uppercase
 * - `value`  (string|number) — valor monetário/numérico (já formatado pelo caller).
 *   Pode ser substituído inteiro pelo slot `#value` (ex: html com badge inline).
 * - `icon`   (string) — classe Font Awesome (ex: `'fa-solid fa-arrow-down'`)
 * - `sub`    (string) — texto secundário em baixo do label. Slot `#sub` sobrepõe.
 * - `tone`   — variante visual (default `'neutral'`)
 *
 * Slots:
 * - `value` — substitui o valor (default mostra `:value`)
 * - `sub`   — substitui o texto secundário (default mostra `:sub`)
 */
export default {
    name: 'ShadcnSummaryTile',

    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: [String, Number, null] as PropType<string | number | null>,
            default: null,
        },
        icon: {
            type: String,
            default: '',
        },
        sub: {
            type: String,
            default: '',
        },
        tone: {
            type: String as PropType<SummaryTileTone>,
            default: 'neutral',
            validator: (v: string) => ['neutral', 'positive', 'negative', 'indigo'].includes(v),
        },
    },

    computed: {
        rootClasses(): string {
            return `shadcn-summary-tile--${this.tone}`
        },

        hasSub(): boolean {
            return Boolean(this.$slots.sub || this.sub)
        },
    },
} as Component
</script>
