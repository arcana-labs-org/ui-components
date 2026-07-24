<template>
    <div
        class="arcana-summary-tiles"
        :style="`--arcana-summary-tiles-cols: ${columns}`"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ArcanaSummaryTiles>` — container para tiles compactos de resumo (KPIs).
 *
 * Pattern shadcn/Linear: grid horizontal de "stats" cada um com ícone à esquerda,
 * label+sub no meio e valor numérico destacado à direita. Usado tipicamente no topo
 * de telas de detalhe (Acerto de Contas, Fluxo de Caixa, etc).
 *
 * Renderize quantos `<ArcanaSummaryTile>` quiser via default slot — o container só
 * fornece o grid layout responsivo.
 *
 * API:
 * - `columns` — número de colunas no grid (default `3`). Em telas estreitas (<880px)
 *   sempre colapsa pra 1 coluna independente desse valor.
 *
 * Exemplo:
 *
 *     <ArcanaSummaryTiles :columns="3">
 *         <ArcanaSummaryTile tone="positive" icon="fa-solid fa-arrow-down" label="Entradas" :value="formatCurrency(1250)" sub="4 formas" />
 *         <ArcanaSummaryTile tone="negative" icon="fa-solid fa-arrow-up"   label="Despesas" :value="formatCurrency(85)" sub="3 lançamentos" />
 *         <ArcanaSummaryTile tone="indigo"   icon="fa-solid fa-sack-dollar" label="Total" :value="formatCurrency(1247.50)" />
 *     </ArcanaSummaryTiles>
 */
export default {
    name: 'ArcanaSummaryTiles',

    props: {
        columns: {
            type: [Number, String] as PropType<number | string>,
            default: 3,
        },
    },
} as Component
</script>
