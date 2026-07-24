<template>
    <button
        type="button"
        class="shadcn-switch-card"
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
        <span v-if="hasIcon" class="shadcn-switch-card__icon" aria-hidden="true">
            <slot name="icon">
                <i v-if="icon" :class="icon"></i>
            </slot>
        </span>

        <div class="shadcn-switch-card__text">
            <div class="shadcn-switch-card__title">
                <slot name="title">{{ title }}</slot>
            </div>
            <div v-if="hasStatus" class="shadcn-switch-card__status">
                <slot name="status">{{ currentStatus }}</slot>
            </div>
        </div>

        <!--
            Switch interno custom (não reusa `<ShadcnSwitch>`) porque ele inverte cores
            quando o card fica ativo: track branco com thumb preto. Reusar o base exigiria
            override de CSS via `:deep()` que dificulta manutenção.
        -->
        <span class="shadcn-switch-card__switch" aria-hidden="true">
            <span class="shadcn-switch-card__switch-thumb"></span>
        </span>
    </button>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ShadcnSwitchCard>` — toggle full-width de alto impacto visual.
 *
 * Diferente do `<ShadcnSwitchRow>` (sutil) e do `<ShadcnSwitchSegmented>` (escolha entre
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
 * - Lista de configurações genéricas (use `<ShadcnSwitchRow>` — não chama tanto a atenção)
 * - Decisão entre 2 opções com labels (use `<ShadcnSwitchSegmented>`)
 * - Toggle isolado simples (use `<ShadcnSwitch>` compacto)
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
 *     <ShadcnSwitchCard
 *         v-model="security.two_factor_enabled"
 *         icon="fa-solid fa-shield-halved"
 *         title="Autenticação 2FA"
 *         status-on="ATIVO · TOTP"
 *         status-off="DESLIGADO"
 *     />
 */
export default {
    name: 'ShadcnSwitchCard',

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

<style scoped>
.shadcn-switch-card {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 12px;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    /*
     * Transition longa (320ms) e easing custom — a inversão de cores é dramática,
     * o easing `cubic-bezier(0.32, 0.72, 0, 1)` (Apple-style) suaviza pra não parecer
     * "flash". Inclui `all` porque vários props mudam simultaneamente (bg, color, border).
     */
    transition: all 320ms cubic-bezier(0.32, 0.72, 0, 1);
    position: relative;
    overflow: hidden;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    text-align: left;
}

.shadcn-switch-card:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 3px;
}

.shadcn-switch-card.is-disabled {
    opacity: 0.55;
    cursor: not-allowed;
}

.shadcn-switch-card.is-on {
    /* Ativo = verde claro (emerald-100 + borda emerald-500), tom "positivo/incluso" coerente
     * com o resto do app (badges "Incluso no plano", ShadcnSwitch padrão). */
    background: #ecfdf5;
    border-color: #10b981;
}

/*
 * Highlight radial sutil no canto inferior-esquerdo quando ativo — dá um leve "brilho" verde
 * que comunica "estado live", sem poluir o fundo claro. Pseudo-element pra não adicionar markup.
 * `pointer-events: none` pra não interferir no click.
 */
.shadcn-switch-card.is-on::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 0% 100%, rgba(16, 185, 129, 0.12), transparent 55%);
    pointer-events: none;
}

/* ─── Ícone ─── */
.shadcn-switch-card__icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #f4f4f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #18181b;
    font-size: 16px;
    transition: background 320ms ease, color 320ms ease;
}

.shadcn-switch-card.is-on .shadcn-switch-card__icon {
    background: #10b981;
    color: #ffffff;
}

.shadcn-switch-card__icon :deep(svg) {
    width: 18px;
    height: 18px;
}

/* ─── Texto ─── */
.shadcn-switch-card__text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.shadcn-switch-card__title {
    font-size: 14px;
    font-weight: 600;
    color: #09090b;
    line-height: 1.35;
    transition: color 320ms ease;
}

.shadcn-switch-card.is-on .shadcn-switch-card__title {
    color: #065f46;
}

.shadcn-switch-card__status {
    /* Mono pra status — comunica "spec/info técnica" e diferencia visualmente do título. */
    font-family: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
    font-size: 11px;
    color: #71717a;
    letter-spacing: 0.08em;
    line-height: 1.3;
    transition: color 320ms ease;
}

.shadcn-switch-card.is-on .shadcn-switch-card__status {
    color: #059669;
}

/* ─── Switch interno ─── */
.shadcn-switch-card__switch {
    position: relative;
    width: 36px;
    height: 20px;
    border-radius: 9999px;
    background: #e4e4e7;
    flex-shrink: 0;
    transition: background-color 320ms ease;
    /* O switch é decorativo — single source of truth é o button externo via aria-checked. */
    pointer-events: none;
}

.shadcn-switch-card__switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 9999px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18), 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: transform 200ms ease, background 320ms ease;
}

/*
 * Quando ativo: track verde (emerald-500) + thumb branco — mesmo padrão do ShadcnSwitch comum,
 * com bom contraste sobre o card verde claro.
 */
.shadcn-switch-card.is-on .shadcn-switch-card__switch {
    background: #10b981;
}

.shadcn-switch-card.is-on .shadcn-switch-card__switch-thumb {
    background: #ffffff;
    transform: translateX(16px);
}
</style>
