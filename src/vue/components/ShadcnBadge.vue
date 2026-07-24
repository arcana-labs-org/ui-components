<template>
    <span
        class="shadcn-badge"
        :class="[
            `shadcn-badge--${variant}`,
            { 'shadcn-badge--sm': size === 'sm', 'shadcn-badge--clickable': clickable },
        ]"
    >
        <span v-if="dot" class="shadcn-badge__dot"></span>
        <slot />
    </span>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnBadge>` — pill/badge shadcn reutilizável (global, registrado via glob de
 * `components/ui/**`). Extrai o visual do `.shadcn-spec-sheet-badge` (usado no SpecSheet)
 * pra um componente de uso geral: contadores em grids, status, tags, etc.
 *
 * Uso em template: `<ShadcnBadge variant="blue">12 registro(s)</ShadcnBadge>`
 * Uso via render/`h()` (ex: coluna de SparkGrid): `h(ShadcnBadge, { variant: 'neutral' }, () => texto)`.
 *
 * Props:
 * - `variant`: paleta — 'neutral' (default) | 'blue' | 'green' | 'red' | 'amber' | 'violet'.
 * - `dot`: quando `true`, mostra um ponto colorido à esquerda (indicador de status).
 * - `size`: 'md' (default) | 'sm' (fonte/padding menores).
 * - `clickable`: quando `true`, aplica cursor pointer + hover (para badges acionáveis).
 *   O listener de clique é passado normalmente (`@click` / `{ onClick }`) e cai no root.
 */
export default {
    name: "ShadcnBadge",

    props: {
        variant: {
            type: String as PropType<"neutral" | "blue" | "green" | "red" | "amber" | "violet">,
            default: "neutral",
        },
        dot: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<"sm" | "md">,
            default: "md",
        },
        clickable: {
            type: Boolean,
            default: false,
        },
    },
} as Component
</script>

<style scoped>
.shadcn-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 0.02em;
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid transparent;
    white-space: nowrap;
}

.shadcn-badge--sm {
    font-size: 10.5px;
    padding: 2px 8px;
}

.shadcn-badge--clickable {
    cursor: pointer;
    transition: filter 0.15s ease, box-shadow 0.15s ease;
}

.shadcn-badge--clickable:hover {
    filter: brightness(0.96);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.04);
}

.shadcn-badge__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
}

/* Variantes — tokens espelhados do `.shadcn-spec-sheet-badge` pra consistência. */
.shadcn-badge--neutral {
    background: #f4f4f5;
    color: #52525b;
    border-color: #e4e4e7;
}

.shadcn-badge--blue {
    background: #eff6ff;
    color: #1e40af;
    border-color: #bfdbfe;
}

.shadcn-badge--green {
    background: #ecfdf5;
    color: #047857;
    border-color: #a7f3d0;
}

.shadcn-badge--red {
    background: #fef2f2;
    color: #b91c1c;
    border-color: #fecaca;
}

.shadcn-badge--amber {
    background: #fffbeb;
    color: #b45309;
    border-color: #fde68a;
}

.shadcn-badge--violet {
    background: #ede9fe;
    color: #5b21b6;
    border-color: #ddd6fe;
}
</style>
