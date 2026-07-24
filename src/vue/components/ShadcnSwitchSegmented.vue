<template>
    <div
        class="shadcn-switch-segmented"
        :class="{ 'is-on': modelValue, 'is-disabled': disabled, 'is-compact': compact, 'is-squared': squared }"
        :style="activeColor ? { '--seg-active': activeColor } : undefined"
        role="switch"
        :aria-checked="Boolean(modelValue)"
        :aria-label="ariaLabel || ariaLabelFallback || undefined"
        :aria-disabled="disabled"
        :tabindex="disabled ? -1 : 0"
        @click="toggle"
        @keydown="onKeydown"
    >
        <!--
            Indicador deslizante — fica atrás dos labels (z-index 0). A posição é
            controlada apenas via `transform: translateX()` no parent `.is-on`,
            sem mexer no fluxo dos labels (que ficam fixos em suas metades).
        -->
        <div class="shadcn-switch-segmented__indicator" aria-hidden="true"></div>

        <div class="shadcn-switch-segmented__option shadcn-switch-segmented__option--off">
            <span v-if="radio" class="shadcn-switch-segmented__radio" aria-hidden="true"></span>
            <slot name="off-label">{{ offLabel }}</slot>
        </div>
        <div class="shadcn-switch-segmented__option shadcn-switch-segmented__option--on">
            <span v-if="radio" class="shadcn-switch-segmented__radio" aria-hidden="true"></span>
            <slot name="on-label">{{ onLabel }}</slot>
        </div>
    </div>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ShadcnSwitchSegmented>` — toggle binário em formato de cápsula segmentada full-width.
 *
 * Toda a row é dividida em duas metades clicáveis (não 1 metade + 1 switch como o
 * `<ShadcnSwitchRow>`). Indicador desliza entre as opções, comunicando a escolha de
 * forma explícita. Lê-se mais como "decisão entre A ou B" do que como toggle on/off.
 *
 * Quando usar:
 * - Decisão binária com labels diferentes (mensal/anual, prod/sandbox, dia/noite)
 * - Quando os 2 lados precisam de explicação curta (ex: "Anual · −20%")
 * - Como filtro inline em listas/dashboards (toggle de modo de exibição)
 *
 * Quando NÃO usar:
 * - Toggle simples on/off com 1 conceito (use `<ShadcnSwitchRow>`)
 * - Mais de 2 opções (use radio group ou tabs)
 * - Alto impacto visual sistêmico (use `<ShadcnSwitchCard>`)
 *
 * API:
 * - `modelValue` (v-model) — boolean (`false` = opção esquerda, `true` = direita)
 * - `offLabel` — texto da opção esquerda (default `'Inativo'`); aceita slot `#off-label`
 * - `onLabel` — texto da opção direita (default `'Ativo'`); aceita slot `#on-label`
 * - `disabled` — boolean
 * - `ariaLabel` — fallback pra screen readers quando o significado não está nos labels
 *
 * Acessibilidade:
 * - `role="switch"` + `aria-checked` no container
 * - Teclado: Space/Enter alternam, ←/→ idem (mantém UX de segmented control)
 * - Focus ring zinc-900 com offset
 *
 * Exemplo:
 *
 *     <ShadcnSwitchSegmented
 *         v-model="form.billing_cycle_yearly"
 *         off-label="Mensal"
 *         on-label="Anual · −20%"
 *     />
 */
export default {
    name: 'ShadcnSwitchSegmented',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        offLabel: {
            type: String,
            default: 'Inativo',
        },
        onLabel: {
            type: String,
            default: 'Ativo',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        ariaLabel: {
            type: String,
            default: '',
        },
        /**
         * Reduz a altura (48px → 36px), padding e fonte — pra usar como campo inline em forms
         * densos (ao lado de selects/inputs) em vez do toggle "hero" full-size.
         */
        compact: {
            type: Boolean,
            default: false,
        },
        /**
         * Cantos menos arredondados: troca o pill total (radius 9999px) por um radius moderado
         * (8px no container, 6px no indicador). Lê-se como "segmented control retangular".
         */
        squared: {
            type: Boolean,
            default: false,
        },
        /**
         * Cor do indicador (item ativo). Qualquer string CSS válida (hex, rgb, var(...)).
         * Default `#18181b` (preto zinc). O texto do lado ativo permanece branco — escolha
         * uma cor escura o suficiente pra manter contraste.
         */
        activeColor: {
            type: String,
            default: '',
        },
        /**
         * Mostra um radio button (círculo) em cada lado, preenchido no lado ativo. Reforça
         * a seleção além do indicador deslizante.
         */
        radio: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ariaLabelFallback(): string {
            // Quando caller não passou aria-label, monta um descritivo legível:
            // "Mensal ou Anual · −20%". Ajuda screen readers a contextualizar
            // sem precisar inspecionar os 2 children separadamente.
            return `${this.offLabel} ou ${this.onLabel}`
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
            if (this.disabled) return
            // Space/Enter alternam (toggle behavior).
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                this.toggle()
                return
            }
            // ←/→ navegam direto pra opção (semântica de segmented control —
            // user pode "ir pra esquerda" sem ter que fazer toggle).
            if (e.key === 'ArrowLeft' && this.modelValue) {
                e.preventDefault()
                this.toggle()
            }
            if (e.key === 'ArrowRight' && !this.modelValue) {
                e.preventDefault()
                this.toggle()
            }
        },
    },
} as Component
</script>

<style scoped>
.shadcn-switch-segmented {
    --seg-active: #18181b;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    background: #f4f4f5;
    border: 1px solid #e4e4e7;
    border-radius: 9999px;
    padding: 4px;
    position: relative;
    cursor: pointer;
    user-select: none;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    transition: opacity 180ms ease;
}

.shadcn-switch-segmented:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 3px;
}

/* Variant compacto — altura/fonte reduzidas pra uso inline em forms densos. */
.shadcn-switch-segmented.is-compact {
    height: 36px;
}

.shadcn-switch-segmented.is-compact .shadcn-switch-segmented__option {
    font-size: 12.5px;
}

/* Variant cantos menos arredondados — radius moderado no lugar do pill total. */
.shadcn-switch-segmented.is-squared {
    border-radius: 8px;
}

.shadcn-switch-segmented.is-squared .shadcn-switch-segmented__indicator {
    border-radius: 6px;
}

.shadcn-switch-segmented.is-disabled {
    opacity: 0.55;
    cursor: not-allowed;
}

.shadcn-switch-segmented__indicator {
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 4px;
    /*
     * Width = (50% do container) - (4px de padding compensado). Translate(100%)
     * usa esse próprio width, então move a pílula EXATAMENTE pra metade direita
     * sem precisar calcular offsets manuais.
     */
    width: calc(50% - 4px);
    background: var(--seg-active);
    border-radius: 9999px;
    transition: transform 320ms cubic-bezier(0.32, 0.72, 0, 1);
    box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.14),
        0 2px 6px rgba(0, 0, 0, 0.06);
    z-index: 0;
}

.shadcn-switch-segmented.is-on .shadcn-switch-segmented__indicator {
    transform: translateX(100%);
}

.shadcn-switch-segmented__option {
    flex: 1;
    z-index: 1;
    font-size: 13px;
    font-weight: 600;
    color: #71717a;
    letter-spacing: 0.005em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: color 220ms ease;
    /* Pointer-events: none — o click handler é no container; cada option não captura
       eventos individualmente. Mantém comportamento de "toggle único" simples. */
    pointer-events: none;
}

.shadcn-switch-segmented:not(.is-on) .shadcn-switch-segmented__option--off,
.shadcn-switch-segmented.is-on .shadcn-switch-segmented__option--on {
    color: #ffffff;
}

/* Radio indicator (opt-in via prop `radio`) */
.shadcn-switch-segmented__radio {
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid #a1a1aa;
    flex-shrink: 0;
    transition: border-color .2s ease;
}
.shadcn-switch-segmented__radio::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: transparent;
    transition: background .2s ease;
}
/* Lado ativo (texto branco sobre o indicador) → radio branco preenchido */
.shadcn-switch-segmented:not(.is-on) .shadcn-switch-segmented__option--off .shadcn-switch-segmented__radio,
.shadcn-switch-segmented.is-on .shadcn-switch-segmented__option--on .shadcn-switch-segmented__radio {
    border-color: #ffffff;
}
.shadcn-switch-segmented:not(.is-on) .shadcn-switch-segmented__option--off .shadcn-switch-segmented__radio::after,
.shadcn-switch-segmented.is-on .shadcn-switch-segmented__option--on .shadcn-switch-segmented__radio::after {
    background: #ffffff;
}
</style>
