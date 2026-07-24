<template>
    <div class="arcana-table-wrap">
        <table class="arcana-table">
            <thead>
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col.key"
                        :style="col.width ? { width: col.width } : undefined"
                        :class="{ 'arcana-table__th--right': col.align === 'right' }"
                    >{{ col.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!rows.length">
                    <td :colspan="columns.length" class="arcana-table__empty">{{ emptyText }}</td>
                </tr>
                <tr v-for="(row, i) in rows" :key="i">
                    <td
                        v-for="col in columns"
                        :key="col.key"
                        :class="{ 'arcana-table__td--right': col.align === 'right' }"
                    >
                        <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="i">
                            {{ formatCell(row, col, i) }}
                        </slot>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="$slots.footer" class="arcana-table__foot">
                <slot name="footer" />
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ArcanaTable>` — tabela estática (dados locais) no padrão visual shadcn.
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
    name: "ArcanaTable",

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
