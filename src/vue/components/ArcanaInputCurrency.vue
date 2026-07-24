<template>
    <div :class="shadcn ? ['icur-arcana-field', { 'is-disabled': disabled }] : (showIcon ? 'input-group' : '')">
        <slot name="prepend">
            <span class="input-group-addon" v-if="showIcon && !shadcn"><i :class="icon"></i></span>
            <span class="icur-arcana-field__icon" v-if="showIcon && shadcn"><i :class="icon"></i></span>
        </slot>

        <VueMoney
            v-show="!disabled"
            :class="[shadcn ? 'icur-arcana-input' : 'form-control', { 'has-icon': shadcn && showIcon }, $attrs.class]"
            v-bind="formatting"
            ref="input"
            :precision="fraction"
            @update:modelValue="change"
            @keyup.enter="$emit('enter', $event)"
            @keyup="keyUp"
            @change="$emit('change', $event)"
            @blur="$emit('blur', $event)"
            :max="max"
            :min="min"
            :allow-blank="allowBlank && displayBlankValue"
            :model-value="input()"
        />

        <input disabled :class="[shadcn ? 'icur-arcana-input' : 'form-control', { 'has-icon': shadcn && showIcon }, 'full-width']" v-show="disabled" type="text" :value="formattedCurrency">

        <slot name="append"></slot>
    </div>
</template>

<script lang="ts">
import {Money3Component} from 'v-money3'
import {CurrencyFormatter} from "../../core/currency"
import type {Component} from "@vue/runtime-core"

export default {
    emits: ['change', 'enter', 'blur', 'update:modelValue'],
    inheritAttrs: false,

    components: {VueMoney: Money3Component},

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

            formatting: {
                decimal: ",",
                thousands: ".",
                prefix: this.prefix,
                precision: this.fraction
            }
        }
    },

    methods: {
        input() {
            return this.modelValue || "0," + ("0".repeat(this.fraction))
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
  Estilo NÃO-scoped (classe única `icur-arcana-input`) porque o `<VueMoney>` (v-money3)
  renderiza um <input> filho — um `<style scoped>` do wrapper não atingiria de forma
  confiável o elemento interno. Espelha `.arcana-input` do `<ArcanaInput>`.
-->
