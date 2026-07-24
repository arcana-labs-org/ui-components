<template>
    <div class="shadcn-spec-sheet__field" :style="Number(span) > 1 ? { gridColumn: 'span ' + span } : null">
        <div class="shadcn-spec-sheet__label">{{ label }}</div>
        <div
            class="shadcn-spec-sheet__value"
            :class="{ 'shadcn-spec-sheet__value--empty': isEmpty }"
        >
            <slot>{{ displayValue }}</slot>
        </div>
    </div>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ShadcnSpecSheetField>` — campo individual no `<ShadcnSpecSheetSection>`.
 *
 * Renderiza label uppercase mono + valor Inter. Quando o `value` é vazio
 * (null/undefined/empty string), mostra `emptyText` em italic muted (default
 * "Não informado") pra deixar claro que não é um valor real.
 *
 * Pra valores complexos (badges, links, ícones), use o slot default:
 *
 *     <ShadcnSpecSheetField label="Status">
 *         <span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>
 *     </ShadcnSpecSheetField>
 *
 * API:
 * - `label` — uppercase mono (ex: "Razão Social", "CNPJ")
 * - `value` — texto direto. Pode ser string/number/null/undefined.
 * - `emptyText` — fallback quando value é vazio (default `'Não informado'`)
 *
 * Slot:
 * - `default` — substitui o valor renderizado (use pra HTML/badges custom)
 */
export default {
    name: 'ShadcnSpecSheetField',

    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: [String, Number, null] as any,
            default: '',
        },
        emptyText: {
            type: String,
            default: 'Não informado',
        },
        // Quantas colunas do grid o campo ocupa (ex: `:span="2"` pra um campo mais largo).
        span: {
            type: [Number, String],
            default: 1,
        },
    },

    computed: {
        isEmpty(): boolean {
            // Slot default sobrepõe o display de value — se há slot, NUNCA mostra como vazio
            // (caller decidiu o conteúdo). Sem slot, checa se value tem conteúdo útil.
            if (this.$slots.default) return false
            const v = this.value
            return v === null || v === undefined || v === ''
        },
        displayValue(): string {
            if (this.isEmpty) return this.emptyText
            return String(this.value)
        },
    },
} as Component
</script>
