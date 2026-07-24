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

<style scoped>
.shadcn-summary-tile {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 10px 14px;
    border: 1px solid #e4e4e7;
    border-radius: 10px;
    background: #ffffff;
}

.shadcn-summary-tile__icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    background: #f4f4f5;
    color: #3f3f46;
    flex-shrink: 0;
}

.shadcn-summary-tile__main {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    min-width: 0;
}

.shadcn-summary-tile__label {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 600;
    color: #71717a;
    line-height: 1.3;
}

.shadcn-summary-tile__sub {
    font-size: 10.5px;
    color: #71717a;
    line-height: 1.3;
}

.shadcn-summary-tile__value {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.015em;
    font-variant-numeric: tabular-nums;
    color: #09090b;
    line-height: 1.1;
    flex-shrink: 0;
    text-align: right;
}

/* ─── Tone variants ────────────────────────────────────────────────── */

.shadcn-summary-tile--positive {
    background: #dcfce7;
    border-color: #86efac;
}
.shadcn-summary-tile--positive .shadcn-summary-tile__icon {
    background: #86efac;
    color: #166534;
}
.shadcn-summary-tile--positive .shadcn-summary-tile__label,
.shadcn-summary-tile--positive .shadcn-summary-tile__sub {
    color: #15803d;
}
.shadcn-summary-tile--positive .shadcn-summary-tile__value {
    color: #166534;
}

.shadcn-summary-tile--negative {
    background: #fef2f2;
    border-color: #fecaca;
}
.shadcn-summary-tile--negative .shadcn-summary-tile__icon {
    background: #fee2e2;
    color: #991b1b;
}
.shadcn-summary-tile--negative .shadcn-summary-tile__label,
.shadcn-summary-tile--negative .shadcn-summary-tile__sub {
    color: #b91c1c;
}
.shadcn-summary-tile--negative .shadcn-summary-tile__value {
    color: #991b1b;
}

/* "indigo": card neutro mas pip indigo — usado em totais "síntese". */
.shadcn-summary-tile--indigo .shadcn-summary-tile__icon {
    background: #e0e7ff;
    color: #4338ca;
}
</style>
