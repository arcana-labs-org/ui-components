<template>
    <div
        class="arcana-switch-segmented"
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
        <div class="arcana-switch-segmented__indicator" aria-hidden="true"></div>

        <div class="arcana-switch-segmented__option arcana-switch-segmented__option--off">
            <ArcanaRadioIndicator v-if="radio" tone="on-solid" size="sm" :checked="!modelValue" />
            <!--
                Ícone decorativo (aria-hidden): quem descreve o lado é o label/aria-label.
                Sem label, o `justify-content: center` do `__option` deixa o ícone sozinho
                e centralizado — nenhum texto é forçado.
            -->
            <i
                v-if="offIcon"
                :class="['arcana-switch-segmented__icon', offIcon]"
                :style="offIconColor ? { color: offIconColor } : undefined"
                aria-hidden="true"
            ></i>
            <slot name="off-label"><template v-if="offLabel">{{ offLabel }}</template></slot>
        </div>
        <div class="arcana-switch-segmented__option arcana-switch-segmented__option--on">
            <ArcanaRadioIndicator v-if="radio" tone="on-solid" size="sm" :checked="Boolean(modelValue)" />
            <i
                v-if="onIcon"
                :class="['arcana-switch-segmented__icon', onIcon]"
                :style="onIconColor ? { color: onIconColor } : undefined"
                aria-hidden="true"
            ></i>
            <slot name="on-label"><template v-if="onLabel">{{ onLabel }}</template></slot>
        </div>
    </div>
</template>

<script lang="ts">
import type { Component } from "vue"
import ArcanaRadioIndicator from "./ArcanaRadioIndicator.vue"

/**
 * `<ArcanaSwitchSegmented>` — toggle binário em formato de cápsula segmentada full-width.
 *
 * Toda a row é dividida em duas metades clicáveis (não 1 metade + 1 switch como o
 * `<ArcanaSwitchRow>`). Indicador desliza entre as opções, comunicando a escolha de
 * forma explícita. Lê-se mais como "decisão entre A ou B" do que como toggle on/off.
 *
 * Quando usar:
 * - Decisão binária com labels diferentes (mensal/anual, prod/sandbox, dia/noite)
 * - Quando os 2 lados precisam de explicação curta (ex: "Anual · −20%")
 * - Como filtro inline em listas/dashboards (toggle de modo de exibição)
 *
 * Quando NÃO usar:
 * - Toggle simples on/off com 1 conceito (use `<ArcanaSwitchRow>`)
 * - Mais de 2 opções (use radio group ou tabs)
 * - Alto impacto visual sistêmico (use `<ArcanaSwitchCard>`)
 *
 * API:
 * - `modelValue` (v-model) — boolean (`false` = opção esquerda, `true` = direita)
 * - `offLabel` — texto da opção esquerda (default `'Inativo'`); aceita slot `#off-label`
 * - `onLabel` — texto da opção direita (default `'Ativo'`); aceita slot `#on-label`
 * - `offIcon` / `onIcon` — classe FontAwesome renderada como `<i>` ANTES do texto do lado
 *   (ex: `'fa-solid fa-moon'` / `'fa-solid fa-sun'`). Decorativos (`aria-hidden`)
 * - `offIconColor` / `onIconColor` — cor inline do respectivo ícone (vence o CSS, inclusive
 *   no lado ativo, onde o texto fica branco)
 * - `disabled` — boolean
 * - `ariaLabel` — fallback pra screen readers quando o significado não está nos labels
 *
 * Icon-only: passe `off-label=""`/`on-label=""` junto com os ícones — o lado não força
 * texto e o ícone fica centralizado sozinho. Nesse caso informe `ariaLabel`, já que o
 * fallback automático é montado a partir dos labels.
 *
 * Acessibilidade:
 * - `role="switch"` + `aria-checked` no container
 * - Teclado: Space/Enter alternam, ←/→ idem (mantém UX de segmented control)
 * - Focus ring zinc-900 com offset
 *
 * Exemplo:
 *
 *     <ArcanaSwitchSegmented
 *         v-model="form.billing_cycle_yearly"
 *         off-label="Mensal"
 *         on-label="Anual · −20%"
 *     />
 */
export default {
    name: 'ArcanaSwitchSegmented',

    components: { ArcanaRadioIndicator },

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
        /**
         * Classe FontAwesome do ícone da opção esquerda (ex: `'fa-solid fa-moon'`),
         * renderado antes do texto. Opcional — sem ele o lado fica só com o label.
         */
        offIcon: {
            type: String,
            default: '',
        },
        /**
         * Classe FontAwesome do ícone da opção direita (ex: `'fa-solid fa-sun'`).
         */
        onIcon: {
            type: String,
            default: '',
        },
        /**
         * Cor inline do `offIcon`. Qualquer string CSS válida — vence o CSS herdado,
         * inclusive quando o lado está ativo (texto branco).
         */
        offIconColor: {
            type: String,
            default: '',
        },
        /**
         * Cor inline do `onIcon`. Mesma semântica do `offIconColor`.
         */
        onIconColor: {
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
            // Labels vazios (modo icon-only) são descartados pra não gerar " ou ".
            return [this.offLabel, this.onLabel].filter(Boolean).join(' ou ')
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
