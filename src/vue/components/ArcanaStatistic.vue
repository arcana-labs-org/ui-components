<template>
    <div
        class="arcana-statistic"
        :class="[`arcana-statistic--${size}`, `arcana-statistic--${tone}`]"
        :style="valueColor ? { '--arcana-statistic-value-color': valueColor } : undefined"
    >
        <div v-if="hasTitle" class="arcana-statistic__title">
            <slot name="title">{{ resolvedTitle }}</slot>
        </div>

        <div class="arcana-statistic__content">
            <span v-if="icon" class="arcana-statistic__icon" aria-hidden="true">
                <i :class="icon"></i>
            </span>

            <span v-if="hasPrefix" class="arcana-statistic__prefix">
                <slot name="prefix">{{ prefix }}</slot>
            </span>

            <span class="arcana-statistic__value">{{ displayValue }}</span>

            <span v-if="hasSuffix" class="arcana-statistic__suffix">
                <slot name="suffix">{{ suffix }}</slot>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

import { formatStatisticValue } from "../../core/statistic"

type StatisticTone = 'neutral' | 'success' | 'danger' | 'warning' | 'info'
type StatisticSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * `<ArcanaStatistic>` — número em destaque com rótulo (KPI de painel). Layout vertical:
 * `[título]` em cima, `[ícone] [prefixo] VALOR [sufixo]` embaixo, alinhados pela baseline.
 *
 * Irmão do `<ArcanaSummaryTile>` (que é um card horizontal compacto): aqui o valor é a
 * estrela — fonte grande, `tabular-nums`, sem moldura.
 *
 * API:
 * - `value` (number|string) — número exibido. **String passa intacta** (escape hatch pra
 *   valor já formatado pelo caller); só `number` é formatado pelas regras abaixo.
 * - `title` / `label` — rótulo acima do valor (`label` é alias; `title` vence)
 * - `precision` — casas decimais fixas. Sem ele, o número mantém as próprias casas.
 * - `groupSeparator` (default `','`) e `decimalSeparator` (default `'.'`) — separadores
 *   manuais. `groupSeparator: ''` desliga o agrupamento.
 * - `locale` — quando informado, a formatação passa a ser `Intl.NumberFormat(locale)` e os
 *   separadores manuais são IGNORADOS (quem manda é o locale). Tag inválida cai de volta
 *   no caminho manual, sem lançar.
 * - `formatter` — `(value) => string`, tem precedência sobre tudo (controle total)
 * - `prefix` / `suffix` — texto antes/depois do valor (ou slots homônimos)
 * - `tone` — `'neutral' | 'success' | 'danger' | 'warning' | 'info'`: colore valor+ícone
 *   pelos tokens de estado (`--arcana-success-text`, …)
 * - `valueColor` — cor CSS arbitrária pro valor; vence o `tone` (vira inline
 *   `--arcana-statistic-value-color`)
 * - `size` — `'sm' | 'md' | 'lg' | 'xl'` (default `'md'`)
 * - `icon` — classe do ícone (ex: `'fa-solid fa-arrow-trend-up'`), renderizado antes do prefixo
 *
 * Slots: `title`, `prefix`, `suffix` (cada um sobrepõe a prop de mesmo nome).
 *
 * A formatação vive em `core/statistic.ts` (framework-agnóstica e testada), então os 4
 * ports produzem exatamente o mesmo texto.
 */
export default {
    name: 'ArcanaStatistic',

    props: {
        value: {
            type: [Number, String, null] as PropType<number | string | null>,
            default: null,
        },
        title: {
            type: String,
            default: '',
        },
        /** Alias de `title` (quem escreve `label` no resto da lib não precisa lembrar dos dois). */
        label: {
            type: String,
            default: '',
        },
        precision: {
            type: Number,
            default: undefined,
        },
        groupSeparator: {
            type: String,
            default: ',',
        },
        decimalSeparator: {
            type: String,
            default: '.',
        },
        locale: {
            type: String,
            default: '',
        },
        formatter: {
            type: Function as PropType<(value: number | string | null) => string>,
            default: undefined,
        },
        prefix: {
            type: String,
            default: '',
        },
        suffix: {
            type: String,
            default: '',
        },
        tone: {
            type: String as PropType<StatisticTone>,
            default: 'neutral',
            validator: (v: string) => ['neutral', 'success', 'danger', 'warning', 'info'].includes(v),
        },
        valueColor: {
            type: String,
            default: '',
        },
        size: {
            type: String as PropType<StatisticSize>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg', 'xl'].includes(v),
        },
        icon: {
            type: String,
            default: '',
        },
    },

    computed: {
        resolvedTitle(): string {
            return this.title || this.label
        },

        hasTitle(): boolean {
            return Boolean(this.$slots.title || this.resolvedTitle)
        },

        hasPrefix(): boolean {
            return Boolean(this.$slots.prefix || this.prefix)
        },

        hasSuffix(): boolean {
            return Boolean(this.$slots.suffix || this.suffix)
        },

        /** Texto final do valor — `formatter` vence; senão, as regras do core. */
        displayValue(): string {
            if (this.formatter) return this.formatter(this.value ?? null)
            return formatStatisticValue(this.value, {
                precision: this.precision,
                groupSeparator: this.groupSeparator,
                decimalSeparator: this.decimalSeparator,
                locale: this.locale || undefined,
            })
        },
    },
} as Component
</script>
