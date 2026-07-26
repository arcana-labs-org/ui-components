<template>
    <span
        class="arcana-radio-indicator"
        :class="[
            `arcana-radio-indicator--${size}`,
            `arcana-radio-indicator--${tone}`,
            { 'is-checked': checked, 'is-disabled': disabled },
        ]"
        aria-hidden="true"
    >
        <span class="arcana-radio-indicator__dot"></span>
    </span>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ArcanaRadioIndicator>` — o círculo + dot visual de um radio button, puramente
 * decorativo (`aria-hidden`). É o building block compartilhado entre `<ArcanaRadio>`,
 * `<ArcanaRadioCardGroup>`, `<ArcanaSegmentedControl>` e `<ArcanaSwitchSegmented>`.
 *
 * O estado marcado vem do prop `checked` (não do CSS do ancestral), então o mesmo
 * indicador serve tanto pro radio de verdade (com `<input>` ao lado) quanto pros
 * círculos decorativos dentro de botões `role="radio"`.
 *
 * Props:
 * - `checked` — preenche o dot (animado, scale 0→1).
 * - `disabled` — apenas esmaece (o controle de foco/interação é de quem embrulha).
 * - `size` — `'sm' | 'md' | 'lg'` (14 / 16 / 18px). Default `'md'`.
 * - `tone` — `'solid'` (borda neutra, marcado na cor de marca) | `'on-solid'` (branco,
 *   pra círculo sobre um pill colorido ativo). Default `'solid'`.
 */
export default {
    name: 'ArcanaRadioIndicator',

    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<'sm' | 'md' | 'lg'>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg'].includes(v),
        },
        tone: {
            type: String as PropType<'solid' | 'on-solid'>,
            default: 'solid',
            validator: (v: string) => ['solid', 'on-solid'].includes(v),
        },
    },
} as Component
</script>
