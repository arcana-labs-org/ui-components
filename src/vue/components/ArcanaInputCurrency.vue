<template>
    <div :class="shadcn ? ['icur-arcana-field', { 'is-disabled': disabled }] : (showIcon ? 'input-group' : '')">
        <slot name="prepend">
            <span class="input-group-addon" v-if="showIcon && !shadcn"><i :class="icon"></i></span>
            <span class="icur-arcana-field__icon" v-if="showIcon && shadcn"><i :class="icon"></i></span>
        </slot>

        <input
            v-show="!disabled"
            ref="input"
            type="text"
            inputmode="decimal"
            :class="[shadcn ? 'icur-arcana-input' : 'form-control', { 'has-icon': shadcn && showIcon }, $attrs.class]"
            :name="name"
            :value="display"
            @input="onInput"
            @keyup.enter="$emit('enter', $event)"
            @keyup="keyUp"
            @change="$emit('change', $event)"
            @blur="$emit('blur', $event)"
        />

        <input disabled :class="[shadcn ? 'icur-arcana-input' : 'form-control', { 'has-icon': shadcn && showIcon }, 'full-width']" v-show="disabled" type="text" :value="formattedCurrency">

        <slot name="append"></slot>
    </div>
</template>

<script lang="ts">
import {
    CurrencyFormatter,
    currencyDigitsFromValue,
    formatCurrencyDigits,
} from "../../core/currency"
import type {Component} from "@vue/runtime-core"

export default {
    emits: ['change', 'enter', 'blur', 'update:modelValue'],
    inheritAttrs: false,

    props: {
        disabled: {
            type: [Boolean, Number],
            default: false
        },
        allowBlank: {
            type: Boolean,
            default: false,
        },
        fraction: {
            type: Number,
            default: 2
        },
        name: String,
        modelValue: [String, Number],
        showIcon: {
            type: Boolean,
            default: true
        },
        prefix: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: "icon-coin-dollar"
        },
        max: {
            type: Number,
            default: Number.MAX_SAFE_INTEGER
        },
        min: {
            type: Number,
        },
        formatCurrency: {
            type: Boolean,
            default: true
        },
        /**
         * Estilo shadcn (palette zinc, igual `<ArcanaInput>`). Quando `true`, troca o
         * `form-control` Bootstrap pelo input shadcn e esconde o addon de ícone `$`.
         */
        shadcn: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        /**
         * Texto exibido no input. Vem do mesmo core que React, Angular e Svelte
         * usam — antes este port delegava à `v-money3`, o que custava uma
         * dependência de runtime e fazia do Vue a única implementação diferente.
         */
        display(): string {
            const digits = currencyDigitsFromValue(this.modelValue, this.fraction)
            return formatCurrencyDigits(digits, this.fraction, this.prefix)
        },

        formattedCurrency() {
            if (!this.formatCurrency) {
                return this.modelValue
            }

            return CurrencyFormatter.format(this.modelValue || 0)
        }
    },

    data() {
        return {
            displayBlankValue: false,
        }
    },

    methods: {
        /**
         * Reformata a cada tecla e reposiciona o cursor no fim: o preenchimento é
         * da direita para a esquerda (digitar "1" mostra "0,01"), então editar no
         * meio não faz sentido neste campo — é o mesmo comportamento dos demais
         * ports e do v-money3 que este código substitui.
         */
        onInput(event: Event) {
            const el = event.target as HTMLInputElement
            const digits = el.value.replace(/\D/g, "")
            const formatted = formatCurrencyDigits(digits, this.fraction, this.prefix)

            // O DOM precisa ser corrigido na mão: quando o formatado é igual ao
            // anterior (tecla rejeitada), o Vue não re-renderiza e o caractere
            // inválido ficaria visível.
            if (el.value !== formatted) el.value = formatted
            const fim = formatted.length
            el.setSelectionRange(fim, fim)

            this.$emit("update:modelValue", formatted)
        },

        keyUp(e: any) {
            if (e.key == '0') {
                this.displayBlankValue = false
            } else {
                this.displayBlankValue = true
            }
        },

        change(val: any) {
            this.$emit("update:modelValue", val)
        },

        focus() {
            (this.$refs.input as { focus: () => void }).focus()
        }
    }
} as Component
</script>

<!--
  Estilo NÃO-scoped (classe única `icur-arcana-input`) — mantido assim por
  compatibilidade: era necessário quando o campo era renderizado pelo `v-money3`,
  e continua sendo o seletor que os consumidores estilizam.
  Espelha `.arcana-input` do `<ArcanaInput>`.
-->
