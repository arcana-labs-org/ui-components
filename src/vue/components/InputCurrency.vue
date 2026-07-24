<template>
    <div :class="shadcn ? ['icur-shadcn-field', { 'is-disabled': disabled }] : (showIcon ? 'input-group' : '')">
        <slot name="prepend">
            <span class="input-group-addon" v-if="showIcon && !shadcn"><i :class="icon"></i></span>
            <span class="icur-shadcn-field__icon" v-if="showIcon && shadcn"><i :class="icon"></i></span>
        </slot>

        <VueMoney
            v-show="!disabled"
            :class="[shadcn ? 'icur-shadcn-input' : 'form-control', { 'has-icon': shadcn && showIcon }, $attrs.class]"
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

        <input disabled :class="[shadcn ? 'icur-shadcn-input' : 'form-control', { 'has-icon': shadcn && showIcon }, 'full-width']" v-show="disabled" type="text" :value="formattedCurrency">

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
         * Estilo shadcn (palette zinc, igual `<ShadcnInput>`). Quando `true`, troca o
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
  Estilo NÃO-scoped (classe única `icur-shadcn-input`) porque o `<VueMoney>` (v-money3)
  renderiza um <input> filho — um `<style scoped>` do wrapper não atingiria de forma
  confiável o elemento interno. Espelha `.shadcn-input` do `<ShadcnInput>`.
-->
<style lang="scss">
/* Wrapper carrega a borda (foco via :focus-within) — assim o ícone-prefixo fica
   integrado ao mesmo "campo" do input, no padrão shadcn. */
.icur-shadcn-field {
    display: flex;
    align-items: center;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    background: #fff;
    transition: border-color 150ms ease;

    &:hover:not(.is-disabled) { border-color: #d4d4d8; }
    &:focus-within { border-color: #18181b; }
    &.is-disabled { background: #f4f4f5; opacity: 0.8; }
}

.icur-shadcn-field__icon {
    display: flex;
    align-items: center;
    padding-left: 12px;
    color: #a1a1aa;
    font-size: 13px;
    line-height: 1;
    pointer-events: none;
}

/* Input por dentro: sem borda própria (a borda vive no wrapper) */
.icur-shadcn-input {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    padding: 8px 12px;
    border: none;
    background: transparent;
    color: #18181b;
    font-size: 13px;
    line-height: 1.4;
    outline: none;
    box-shadow: none;
    font-family: inherit;

    &.has-icon { padding-left: 8px; }
    &::placeholder { color: #a1a1aa; }
    &:disabled { cursor: not-allowed; }
}
</style>

