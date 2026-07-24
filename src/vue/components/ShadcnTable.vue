<template>
    <div class="shadcn-table-wrap">
        <table class="shadcn-table">
            <thead>
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col.key"
                        :style="col.width ? { width: col.width } : undefined"
                        :class="{ 'shadcn-table__th--right': col.align === 'right' }"
                    >{{ col.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!rows.length">
                    <td :colspan="columns.length" class="shadcn-table__empty">{{ emptyText }}</td>
                </tr>
                <tr v-for="(row, i) in rows" :key="i">
                    <td
                        v-for="col in columns"
                        :key="col.key"
                        :class="{ 'shadcn-table__td--right': col.align === 'right' }"
                    >
                        <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="i">
                            {{ formatCell(row, col, i) }}
                        </slot>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="$slots.footer" class="shadcn-table__foot">
                <slot name="footer" />
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnTable>` — tabela estática (dados locais) no padrão visual shadcn.
 *
 * Diferente do `SparkGrid` (que faz fetch/paginação/ordenação via backend), esta é pra
 * exibir arrays já em mãos — ex.: itens embutidos de um registro. Registrada globalmente
 * via component-registry (components/ui/**).
 *
 * Colunas: `{ key, label, width?, align?, valueGetter?(value, row, index) }`.
 * Slots de célula: `#cell-<key>` recebe `{ row, value, index }` pra render custom.
 */
interface TableColumn {
    key: string
    label: string
    width?: string
    align?: "left" | "right"
    valueGetter?: (value: any, row: any, index: number) => any
}

export default {
    name: "ShadcnTable",

    props: {
        columns: { type: Array as PropType<TableColumn[]>, required: true },
        rows: { type: Array as PropType<any[]>, default: () => [] },
        emptyText: { type: String, default: "Nenhum registro." },
    },

    methods: {
        formatCell(row: any, col: TableColumn, index: number): any {
            const value = row?.[col.key]
            if (col.valueGetter) return col.valueGetter(value, row, index)
            return value ?? "—"
        },
    },
} as Component
</script>

<style scoped lang="scss">
.shadcn-table-wrap {
    width: 100%;
    overflow-x: auto;
    border: 1px solid #e4e4e7;
    border-radius: 8px;
}

.shadcn-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 12.5px;

    th, td {
        text-align: left;
        padding: 9px 12px;
        white-space: nowrap;
    }

    thead th {
        background: #fafafa;
        color: #71717a;
        font-weight: 600;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        border-bottom: 1px solid #e4e4e7;
    }

    tbody td {
        color: #27272a;
        border-bottom: 1px solid #f4f4f5;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    tbody tr:hover td {
        background: #fafafa;
    }

    &__th--right, &__td--right {
        text-align: right;
    }

    &__empty {
        color: #a1a1aa;
        font-style: italic;
        text-align: center;
        padding: 18px 12px;
    }
}
</style>

<!--
    Footer (tfoot) em estilo GLOBAL (não-scoped): o conteúdo do slot `#footer` é
    renderizado no escopo do CONSUMIDOR (data-v diferente), então o CSS scoped do
    ShadcnTable não alcançaria os `<td>` do footer. Mesma linguagem visual do header.
-->
<style>
.shadcn-table__foot td {
    background: #fafafa;
    border-top: 1px solid #e4e4e7;
    padding: 10px 12px;
    font-size: 12.5px;
    font-weight: 600;
    color: #18181b;
    line-height: 1.3;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
}
.shadcn-table__foot td.shadcn-table__td--right {
    text-align: right;
}
.shadcn-table__foot tr:hover td {
    background: #fafafa;
}
</style>
