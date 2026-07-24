<template>
    <div
        class="shadcn-summary-tiles"
        :style="`--shadcn-summary-tiles-cols: ${columns}`"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnSummaryTiles>` — container para tiles compactos de resumo (KPIs).
 *
 * Pattern shadcn/Linear: grid horizontal de "stats" cada um com ícone à esquerda,
 * label+sub no meio e valor numérico destacado à direita. Usado tipicamente no topo
 * de telas de detalhe (Acerto de Contas, Fluxo de Caixa, etc).
 *
 * Renderize quantos `<ShadcnSummaryTile>` quiser via default slot — o container só
 * fornece o grid layout responsivo.
 *
 * API:
 * - `columns` — número de colunas no grid (default `3`). Em telas estreitas (<880px)
 *   sempre colapsa pra 1 coluna independente desse valor.
 *
 * Exemplo:
 *
 *     <ShadcnSummaryTiles :columns="3">
 *         <ShadcnSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" :value="formatCurrency(1250)" sub="4 formas" />
 *         <ShadcnSummaryTile tone="negative" icon="fa-solid fa-arrow-up"   label="Despesas" :value="formatCurrency(85)" sub="3 lançamentos" />
 *         <ShadcnSummaryTile tone="indigo"   icon="fa-solid fa-sack-dollar" label="Total" :value="formatCurrency(1247.50)" />
 *     </ShadcnSummaryTiles>
 */
export default {
    name: 'ShadcnSummaryTiles',

    props: {
        columns: {
            type: [Number, String] as PropType<number | string>,
            default: 3,
        },
    },
} as Component
</script>

<style scoped>
.shadcn-summary-tiles {
    display: grid;
    grid-template-columns: repeat(var(--shadcn-summary-tiles-cols, 3), 1fr);
    gap: 10px;
}

@media (max-width: 880px) {
    .shadcn-summary-tiles {
        grid-template-columns: 1fr;
    }
}
</style>
