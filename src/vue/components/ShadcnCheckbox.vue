<template>
    <label class="shadcn-checkbox" :class="rootClasses">
        <!--
            Input NATIVO de verdade (não um <button role="checkbox">, como o ShadcnSwitch faz).
            Ele fica invisível mas continua no fluxo: clicável pelo label, focável por teclado, e
            operável pelo `check()`/`uncheck()` do Dusk — que não funciona em cima de <button>.
            O quadrado visível abaixo é só pintura em cima dele.
        -->
        <input
            ref="input"
            type="checkbox"
            class="shadcn-checkbox__input"
            :checked="modelValue"
            :disabled="disabled"
            :name="name || undefined"
            :aria-label="ariaLabel || undefined"
            @change="onChange"
        />

        <span class="shadcn-checkbox__box" aria-hidden="true">
            <i v-if="indeterminate" class="fa-solid fa-minus shadcn-checkbox__icon"></i>
            <i v-else-if="modelValue" class="fa-solid fa-check shadcn-checkbox__icon"></i>
        </span>

        <span v-if="label || $slots.default" class="shadcn-checkbox__label">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ShadcnCheckbox>` — caixa de seleção binária (palette zinc).
 *
 * Quando usar em vez do `<ShadcnSwitch>`: switch é pra LIGAR/DESLIGAR uma configuração, com efeito
 * imediato. Checkbox é pra ESCOLHER itens de uma lista, onde a decisão só vale quando o usuário
 * confirma — marcar produtos de uma devolução, por exemplo.
 *
 * Por que envolve um `<input type="checkbox">` nativo e não um `<button role="checkbox">` como o
 * ShadcnSwitch: o Dusk dirige checkbox com `check()`/`uncheck()`, que exigem input real. Listas no
 * projeto já vinham usando input nativo por isso — este componente dá o visual shadcn sem tirar
 * essa capacidade.
 *
 * Props:
 * - `modelValue` (v-model) — boolean
 * - `indeterminate` — boolean; estado "alguns marcados" (traço em vez do check). Visual apenas:
 *   quem clica recebe `true`, como manda o padrão de "marcar todos".
 * - `disabled`, `label`, `name`, `ariaLabel`
 *
 * Exemplo:
 *
 *     <ShadcnCheckbox v-model="ativo" label="Receber notificações" />
 *
 *     <ShadcnCheckbox
 *         :model-value="todosMarcados"
 *         :indeterminate="algunsMarcados"
 *         @update:modelValue="marcarTodos"
 *     />
 */
export default {
    name: 'ShadcnCheckbox',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        /** "Alguns marcados": mostra traço no lugar do check. Não muda o valor emitido. */
        indeterminate: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        ariaLabel: {
            type: String,
            default: '',
        },
    },

    computed: {
        rootClasses(): Record<string, boolean> {
            return {
                'shadcn-checkbox--checked': this.modelValue || this.indeterminate,
                'shadcn-checkbox--disabled': this.disabled,
            }
        },
    },

    methods: {
        onChange(event: Event) {
            const checked = (event.target as HTMLInputElement).checked

            this.$emit('update:modelValue', checked)
            this.$emit('change', checked)
        },
    },
} as Component
</script>

<style scoped>
.shadcn-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-weight: 400;
    cursor: pointer;
    /* O <label> herda o white-space: nowrap das células de tabela; não deixa o texto esticar. */
    line-height: 1.3;
}

.shadcn-checkbox--disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

/*
    O input some visualmente mas continua existindo e focável — é ele que o Dusk e o teclado
    operam. `opacity: 0` em cima da caixa (em vez de display:none) mantém o clique nativo.
*/
.shadcn-checkbox__input {
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 0;
    opacity: 0;
    cursor: inherit;
}

.shadcn-checkbox__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border: 1px solid #d4d4d8;
    border-radius: 4px;
    background: #ffffff;
    transition: background-color 150ms ease, border-color 150ms ease;
}

.shadcn-checkbox--checked .shadcn-checkbox__box {
    background: #18181b;
    border-color: #18181b;
}

.shadcn-checkbox:hover:not(.shadcn-checkbox--disabled) .shadcn-checkbox__box {
    border-color: #a1a1aa;
}

.shadcn-checkbox--checked:hover:not(.shadcn-checkbox--disabled) .shadcn-checkbox__box {
    background: #27272a;
    border-color: #27272a;
}

/* Foco visível no quadrado, já que o input real é invisível. */
.shadcn-checkbox__input:focus-visible + .shadcn-checkbox__box {
    outline: 2px solid #18181b;
    outline-offset: 2px;
}

.shadcn-checkbox__icon {
    font-size: 9px;
    color: #ffffff;
    line-height: 1;
}

.shadcn-checkbox__label {
    font-size: 13px;
    color: #3f3f46;
}
</style>
