<template>
    <label
        class="arcana-radio"
        :class="{ 'is-checked': isChecked, 'is-disabled': disabled }"
    >
        <input
            type="radio"
            class="arcana-radio__input"
            :name="name"
            :value="value"
            :checked="isChecked"
            :disabled="disabled"
            @change="onChange"
        />
        <ArcanaRadioIndicator
            :checked="isChecked"
            :disabled="disabled"
            :size="size"
            :tone="tone"
        />
        <span v-if="$slots.default || label" class="arcana-radio__label">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import ArcanaRadioIndicator from "./ArcanaRadioIndicator.vue"

/**
 * `<ArcanaRadio>` — radio button único: `<input type="radio">` nativo (escondido
 * visualmente, mas focável) + `<ArcanaRadioIndicator>` + label opcional.
 *
 * Grupo se forma como no HTML: vários `<ArcanaRadio>` com o mesmo `name` e um `v-model`
 * compartilhado. Fica marcado quando `modelValue === value`. Pra listas ricas (ícone,
 * descrição, badge) use `<ArcanaRadioCardGroup>`.
 *
 * API:
 * - `modelValue` (v-model) — valor selecionado do grupo. `value` — valor desta opção.
 * - `checked` — força o estado marcado (alternativa a `modelValue`/`value`).
 * - `name` — `name` HTML do grupo. `disabled` — desativa esta opção.
 * - `label` — texto (ou use o slot default pra conteúdo custom).
 * - `size` (`'sm'|'md'|'lg'`) e `tone` (`'solid'|'on-solid'`) — repassados ao indicador.
 *
 * Emite `update:modelValue(value)` e `change(value)` ao selecionar.
 *
 * Exemplo:
 *
 *     <ArcanaRadio v-model="plan" value="pro" name="plan" label="Pro" />
 *     <ArcanaRadio v-model="plan" value="free" name="plan" label="Grátis" />
 */
export default {
    name: 'ArcanaRadio',

    components: { ArcanaRadioIndicator },

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: [String, Number, Boolean, null] as PropType<string | number | boolean | null>,
            default: undefined,
        },
        value: {
            type: [String, Number, Boolean, null] as PropType<string | number | boolean | null>,
            default: undefined,
        },
        checked: {
            type: Boolean,
            default: undefined,
        },
        name: {
            type: String,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        size: {
            type: String as PropType<'sm' | 'md' | 'lg'>,
            default: 'md',
        },
        tone: {
            type: String as PropType<'solid' | 'on-solid'>,
            default: 'solid',
        },
    },

    computed: {
        /**
         * `checked` explícito tem prioridade; senão deriva de `modelValue === value`.
         * Permite tanto o uso controlado por grupo (v-model) quanto o standalone.
         */
        isChecked(): boolean {
            if (this.checked !== undefined) return this.checked
            return this.modelValue !== undefined && this.modelValue === this.value
        },
    },

    methods: {
        onChange() {
            if (this.disabled) return
            this.$emit('update:modelValue', this.value)
            this.$emit('change', this.value)
        },
    },
} as Component
</script>
