<template>
    <span
        class="arcana-badge"
        :class="[
            `arcana-badge--${variant}`,
            { 'arcana-badge--sm': size === 'sm', 'arcana-badge--clickable': clickable },
        ]"
    >
        <span v-if="dot" class="arcana-badge__dot"></span>
        <slot />
    </span>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ArcanaBadge>` — pill/badge shadcn reutilizável (global, registrado via glob de
 * `components/ui/**`). Extrai o visual do `.arcana-spec-sheet-badge` (usado no SpecSheet)
 * pra um componente de uso geral: contadores em grids, status, tags, etc.
 *
 * Uso em template: `<ArcanaBadge variant="blue">12 registro(s)</ArcanaBadge>`
 * Uso via render/`h()` (ex: coluna de SparkGrid): `h(ArcanaBadge, { variant: 'neutral' }, () => texto)`.
 *
 * Props:
 * - `variant`: paleta — 'neutral' (default) | 'blue' | 'green' | 'red' | 'amber' | 'violet'.
 * - `dot`: quando `true`, mostra um ponto colorido à esquerda (indicador de status).
 * - `size`: 'md' (default) | 'sm' (fonte/padding menores).
 * - `clickable`: quando `true`, aplica cursor pointer + hover (para badges acionáveis).
 *   O listener de clique é passado normalmente (`@click` / `{ onClick }`) e cai no root.
 */
export default {
    name: "ArcanaBadge",

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
