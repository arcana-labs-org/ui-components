<template>
    <div
        class="arcana-segmented-control"
        :class="[
            `arcana-segmented-control--${effectiveSize}`,
            { 'is-compact': compact, 'is-squared': squared, 'is-disabled': disabled },
        ]"
        :style="activeColor ? { '--seg-active': activeColor } : undefined"
        role="radiogroup"
        :aria-label="ariaLabel || undefined"
    >
        <button
            v-for="opt in normalizedOptions"
            :key="String(opt.value)"
            type="button"
            class="arcana-segmented-control__option"
            :class="{
                'is-active': opt.value === modelValue,
                'arcana-segmented-control__option--icon-only': !hasLabel(opt),
            }"
            role="radio"
            :aria-checked="opt.value === modelValue"
            :aria-label="optionName(opt) || undefined"
            :title="optionTitle(opt)"
            :disabled="disabled || opt.disabled"
            @click="select(opt)"
        >
            <ArcanaRadioIndicator
                v-if="radio"
                tone="on-solid"
                :size="indicatorSize"
                :checked="opt.value === modelValue"
            />
            <i
                v-if="opt.icon"
                :class="['arcana-segmented-control__icon', opt.icon]"
                :style="opt.iconColor ? { color: opt.iconColor } : undefined"
                aria-hidden="true"
            ></i>
            <span v-if="hasLabel(opt)">{{ opt.label }}</span>
        </button>

        <span v-if="!normalizedOptions.length" class="arcana-segmented-control__empty">
            {{ emptyText }}
        </span>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import ArcanaRadioIndicator from "./ArcanaRadioIndicator.vue"

interface SegmentedOption {
    /**
     * Rótulo visível do segmento. Vazio (`''`) ou ausente ativa o modo **só-ícone**:
     * o `<span>` de texto nem chega a ser renderizado (nada de span vazio comendo o
     * `gap`) e o botão ganha a classe `arcana-segmented-control__option--icon-only`.
     * Nesse modo, informe `ariaLabel` — o `<i>` é `aria-hidden`, então sem ele o
     * botão fica sem nome acessível.
     */
    label?: string
    value: string | number
    disabled?: boolean
    /** Classe do ícone (ex: FontAwesome `fa-solid fa-truck`). */
    icon?: string
    /**
     * Cor do ícone desta opção. Qualquer string CSS válida (hex, rgb, `var(...)`).
     * Aplicada como inline style no `<i>`, então vence o CSS e permanece válida
     * inclusive quando a opção está ativa (fundo escuro/colorido). Sem valor, o
     * ícone herda a cor do texto do segmento.
     */
    iconColor?: string
    /**
     * Nome acessível do botão desta opção (`aria-label`). O nome final é
     * `ariaLabel || label`; com os dois vazios o atributo não é emitido.
     * Indispensável no modo só-ícone (sem `label`, é ele que nomeia o botão);
     * com `label` presente é opcional e serve pra descrever melhor a opção.
     * No modo só-ícone ele também vira `title` (tooltip nativa no hover).
     */
    ariaLabel?: string
}

type SegmentedControlSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * `<ArcanaSegmentedControl>` — segmented control de N opções (irmão do `<ArcanaSwitchSegmented>`,
 * que é binário). Renderiza um botão por opção dentro de uma cápsula; o item ativo fica destacado
 * (bg escuro, texto branco). Use quando há uma lista pequena de escolhas mutuamente exclusivas
 * (ex: tipo de entrega, modo de exibição) e um select seria pesado demais visualmente.
 *
 * Diferente do `ArcanaSwitchSegmented` (boolean, 2 metades com indicador deslizante), este aceita
 * qualquer número de opções via `options` e usa `modelValue` arbitrário (string/number).
 *
 * API:
 * - `modelValue` (v-model) — valor da opção ativa
 * - `options` — `Array<{ label?, value, disabled?, icon?, iconColor?, ariaLabel? }>` (`iconColor`
 *   colore o ícone daquela opção individualmente, inclusive quando ela está ativa; `ariaLabel`
 *   nomeia o botão daquela opção)
 * - `disabled` — desabilita o grupo inteiro
 * - `size` — `'sm' | 'md' | 'lg' | 'xl'` (default `'md'`): altura, padding, fonte e tamanho do
 *   ícone. `sm` equivale ao antigo `compact`; `lg`/`xl` são progressivamente maiores.
 * - `compact` — **DEPRECADO**, use `size="sm"`. Mantido por compatibilidade: quando `true` e
 *   `size` não é informado, o componente se comporta como `size="sm"`. Se `size` for informado
 *   explicitamente, ele vence.
 * - `squared` — cantos menos arredondados (radius moderado no lugar do pill)
 * - `emptyText` — texto exibido quando `options` está vazio
 *
 * Tamanho custom: cada dimensão sai de uma custom property CSS com o valor do `size` como
 * fallback, então dá pra sobrescrever pontualmente no próprio elemento (ou em qualquer
 * ancestral) — `--arcana-segmented-control-height`, `--arcana-segmented-control-font-size`,
 * `--arcana-segmented-control-padding-x`, `--arcana-segmented-control-icon-size` e
 * `--arcana-segmented-control-padding`.
 *
 * Modo só-ícone: uma opção com `label` vazio/ausente renderiza SÓ o `<i>` — o `<span>` de texto
 * não é emitido (nada de span vazio consumindo o `gap`) e o botão recebe
 * `.arcana-segmented-control__option--icon-only` (gap zerado + padding horizontal simétrico
 * derivado dos tokens do `size`, ou seja, segmento equilibrado em torno do ícone). Como o `<i>` é
 * `aria-hidden`, é o `ariaLabel` da opção que dá nome ao botão — sem ele o segmento fica anônimo
 * pro leitor de tela. O mesmo texto vira `title` (tooltip nativa) nesse modo.
 *
 * Acessibilidade: `role="radiogroup"` + `role="radio"` com `aria-checked` por opção. Cada botão
 * recebe `aria-label` = `opt.ariaLabel || opt.label` (omitido quando ambos estão vazios).
 */
export default {
    name: 'ArcanaSegmentedControl',

    components: { ArcanaRadioIndicator },

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: [String, Number, null] as PropType<string | number | null>,
            default: null,
        },
        options: {
            type: Array as PropType<SegmentedOption[]>,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Altura/padding/fonte/ícone do controle. Default `'md'` (tamanho histórico do
         * componente). Quando omitido e `compact` for `true`, cai para `'sm'`.
         */
        size: {
            type: String as PropType<SegmentedControlSize>,
            default: undefined,
            validator: (v: string) => ['sm', 'md', 'lg', 'xl'].includes(v),
        },
        /**
         * @deprecated Use `size="sm"`. Mantido por compatibilidade — só tem efeito quando
         * `size` não é informado.
         */
        compact: {
            type: Boolean,
            default: false,
        },
        squared: {
            type: Boolean,
            default: false,
        },
        /**
         * Cor do segmento ativo. Qualquer string CSS válida (hex, rgb, var(...)). Default
         * `#18181b` (preto zinc). O texto do ativo permanece branco — use cor escura o
         * suficiente pra manter contraste.
         */
        activeColor: {
            type: String,
            default: '',
        },
        /**
         * Mostra um radio button (círculo) à esquerda de cada opção, preenchido na ativa.
         * Reforça visualmente a seleção além do destaque de fundo.
         */
        radio: {
            type: Boolean,
            default: false,
        },
        /**
         * Quando `true`, assim que as `options` carregam e nenhuma estiver selecionada
         * (`modelValue` vazio), seleciona automaticamente a primeira opção HABILITADA como
         * default. Útil quando a lista é dinâmica (ex: tipos de entrega vindos do backend) e
         * sempre deve haver uma escolha ativa. Opt-in pra não surpreender usos que querem
         * começar "sem seleção".
         */
        autoSelectFirst: {
            type: Boolean,
            default: false,
        },
        ariaLabel: {
            type: String,
            default: '',
        },
        emptyText: {
            type: String,
            default: 'Sem opções disponíveis',
        },
    },

    computed: {
        normalizedOptions(): SegmentedOption[] {
            return this.options ?? []
        },

        /** `size` explícito vence; sem ele, `compact` legado mapeia pra `sm`. */
        effectiveSize(): SegmentedControlSize {
            return this.size ?? (this.compact ? 'sm' : 'md')
        },

        /**
         * Tamanho do círculo de radio conforme o tamanho do controle: os antigos
         * 14/16/18px viram sm/md/lg do `<ArcanaRadioIndicator>` (base sm/md → 14,
         * lg → 16, xl → 18).
         */
        indicatorSize(): 'sm' | 'md' | 'lg' {
            if (this.effectiveSize === 'xl') return 'lg'
            if (this.effectiveSize === 'lg') return 'md'
            return 'sm'
        },
    },

    watch: {
        // `options` é uma nova referência a cada carga (computed no caller) → dispara quando
        // a lista dinâmica chega do backend.
        options() {
            this.autoSelectDefault()
        },
    },

    mounted() {
        this.autoSelectDefault()
    },

    methods: {
        /** `false` quando o `label` é vazio/ausente → modo só-ícone (span de texto nem sai). */
        hasLabel(opt: SegmentedOption): boolean {
            return (opt.label ?? '') !== ''
        },

        /** Nome acessível do botão: `ariaLabel` da opção, com fallback no `label` visível. */
        optionName(opt: SegmentedOption): string {
            return opt.ariaLabel || opt.label || ''
        },

        /** Tooltip nativa só no modo só-ícone (com `label` visível seria ruído). */
        optionTitle(opt: SegmentedOption): string | undefined {
            if (this.hasLabel(opt)) return undefined
            return this.optionName(opt) || undefined
        },

        select(opt: SegmentedOption) {
            if (this.disabled || opt.disabled || opt.value === this.modelValue) return
            this.$emit('update:modelValue', opt.value)
            this.$emit('change', opt.value)
        },

        autoSelectDefault() {
            if (!this.autoSelectFirst || this.disabled) return

            const hasValue = this.modelValue !== null && this.modelValue !== undefined && this.modelValue !== ''
            if (hasValue) return

            const first = this.normalizedOptions.find((o) => !o.disabled)
            if (!first) return

            this.$emit('update:modelValue', first.value)
            this.$emit('change', first.value)
        },
    },
} as Component
</script>
