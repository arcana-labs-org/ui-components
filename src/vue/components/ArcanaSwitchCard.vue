<template>
    <button
        type="button"
        class="arcana-switch-card"
        :class="{ 'is-on': modelValue, 'is-disabled': disabled }"
        role="switch"
        :aria-checked="Boolean(modelValue)"
        :aria-label="ariaLabel || title || undefined"
        :disabled="disabled"
        @click="toggle"
        @keydown="onKeydown"
    >
        <!--
            Slot de ícone — accept tanto string Font Awesome (`icon="fa-solid fa-shield"`)
            quanto SVG/component custom via slot `#icon`. Quando ambos vazios, esconde
            o container do ícone pra não criar espaço fantasma.
        -->
        <span v-if="hasIcon" class="arcana-switch-card__icon" aria-hidden="true">
            <slot name="icon">
                <i v-if="icon" :class="icon"></i>
            </slot>
        </span>

        <div class="arcana-switch-card__text">
            <div class="arcana-switch-card__title">
                <slot name="title">{{ title }}</slot>
            </div>
            <div v-if="hasStatus" class="arcana-switch-card__status">
                <slot name="status">{{ currentStatus }}</slot>
            </div>
        </div>

        <!--
            Switch interno custom (não reusa `<ArcanaSwitch>`) porque ele inverte cores
            quando o card fica ativo: track branco com thumb preto. Reusar o base exigiria
            override de CSS via `:deep()` que dificulta manutenção.
        -->
        <span class="arcana-switch-card__switch" aria-hidden="true">
            <span class="arcana-switch-card__switch-thumb"></span>
        </span>
    </button>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ArcanaSwitchCard>` — toggle full-width de alto impacto visual.
 *
 * Diferente do `<ArcanaSwitchRow>` (sutil) e do `<ArcanaSwitchSegmented>` (escolha entre
 * dois), aqui o card INTEIRO inverte para zinc-900 quando ativo: bg preto, texto branco,
 * switch interno com cores invertidas. Comunica "esse estado é importante e tem peso".
 *
 * Quando usar:
 * - Features que mudam comportamento sistêmico (modo manutenção, sandbox/produção)
 * - Toggles de segurança (2FA, locking, restrições)
 * - Recursos pagos/premium que exigem confirmação visual clara do estado
 * - Quando o admin precisa saber "à distância" se algo está ON sem ler atentamente
 *
 * Quando NÃO usar:
 * - Lista de configurações genéricas (use `<ArcanaSwitchRow>` — não chama tanto a atenção)
 * - Decisão entre 2 opções com labels (use `<ArcanaSwitchSegmented>`)
 * - Toggle isolado simples (use `<ArcanaSwitch>` compacto)
 *
 * API:
 * - `modelValue` (v-model) — boolean
 * - `title` — título principal (string OU slot `#title`)
 * - `statusOn` — texto do status quando ativo (default `'ATIVO'`)
 * - `statusOff` — texto do status quando inativo (default `'DESLIGADO'`)
 * - `icon` — classe Font Awesome (ex: `'fa-solid fa-shield'`); aceita slot `#icon` pra SVG
 * - `disabled` — boolean
 * - `ariaLabel` — fallback pra screen readers quando o título não basta
 *
 * Slots:
 * - `#icon` — SVG/component custom no slot de ícone (sobrepõe `icon` prop)
 * - `#title` — HTML custom no título (sobrepõe `title` prop)
 * - `#status` — HTML custom no status (sobrepõe `statusOn`/`statusOff`)
 *
 * Acessibilidade:
 * - `role="switch"` + `aria-checked` no button externo
 * - Switch visual interno é `aria-hidden="true"` (não duplica info)
 * - Teclado: Space/Enter ativam (default em `<button>`)
 * - Transição de 320ms preserva orientação (não é abrupto demais pra users sensíveis)
 *
 * Exemplo:
 *
 *     <ArcanaSwitchCard
 *         v-model="security.two_factor_enabled"
 *         icon="fa-solid fa-shield-halved"
 *         title="Autenticação 2FA"
 *         status-on="ATIVO · TOTP"
 *         status-off="DESLIGADO"
 *     />
 */
export default {
    name: 'ArcanaSwitchCard',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        statusOn: {
            type: String,
            default: 'ATIVO',
        },
        statusOff: {
            type: String,
            default: 'DESLIGADO',
        },
        icon: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        ariaLabel: {
            type: String,
            default: '',
        },
    },

    computed: {
        hasIcon(): boolean {
            // Aceita prop `icon` (string FA) ou slot `#icon` (SVG custom). Sem nenhum
            // dos dois, esconde o container pra não desperdiçar 56px no flex.
            return Boolean(this.icon) || Boolean(this.$slots.icon)
        },
        hasStatus(): boolean {
            // Status é opcional — apps minimalistas que só mostram o título podem
            // omitir setting `:status-on=""` `:status-off=""`. Sem status, esconde
            // a linha pra manter o card compacto.
            return Boolean(this.currentStatus) || Boolean(this.$slots.status)
        },
        currentStatus(): string {
            return this.modelValue ? this.statusOn : this.statusOff
        },
    },

    methods: {
        toggle() {
            if (this.disabled) return
            const next = !this.modelValue
            this.$emit('update:modelValue', next)
            this.$emit('change', next)
        },
        onKeydown(e: KeyboardEvent) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                this.toggle()
            }
        },
    },
} as Component
</script>
