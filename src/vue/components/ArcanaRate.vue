<template>
    <div
        class="arcana-rate"
        :class="[`arcana-rate--${size}`, { 'is-disabled': disabled, 'is-readonly': readonly }]"
        :style="rootStyle"
        role="radiogroup"
        :aria-label="ariaLabel || undefined"
        :aria-disabled="disabled || undefined"
        :aria-readonly="readonly || undefined"
        @keydown="onKeydown"
    >
        <span
            v-for="index in stars"
            :key="index"
            class="arcana-rate__item"
            role="radio"
            :aria-checked="isChecked(index)"
            :aria-label="itemLabel(index)"
            :tabindex="itemTabIndex(index)"
            @click="onItemClick($event, index)"
            @mousemove="onItemMove($event, index)"
            @mouseleave="onLeave"
        >
            <span class="arcana-rate__icon arcana-rate__icon--void" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                    <path
                        d="M12 2.6l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 16.93l-5.66 2.98 1.08-6.3-4.57-4.46 6.32-.92z"
                    />
                </svg>
            </span>
            <span
                class="arcana-rate__icon arcana-rate__icon--filled"
                :style="{ width: `${fillPercent(index)}%` }"
                aria-hidden="true"
            >
                <svg viewBox="0 0 24 24" focusable="false">
                    <path
                        d="M12 2.6l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 16.93l-5.66 2.98 1.08-6.3-4.57-4.46 6.32-.92z"
                    />
                </svg>
            </span>
        </span>

        <span v-if="showText" class="arcana-rate__text">{{ currentText }}</span>
        <span v-else-if="showScore" class="arcana-rate__score">{{ scoreText }}</span>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

type RateSize = 'sm' | 'md' | 'lg'

/**
 * `<ArcanaRate>` — avaliação por estrelas (entrada de nota ou exibição de média).
 *
 * Cada estrela empilha DUAS camadas do mesmo SVG (vazia + cheia recortada por
 * `width` em `%`), o que dá de graça três coisas: meia estrela (`allowHalf`),
 * preenchimento contínuo de média em `readonly` (4.3 → 30% da quinta) e nenhuma
 * dependência de fonte de ícone — o desenho é inline.
 *
 * API:
 * - `modelValue` (v-model) — nota atual (`number`, default `0`)
 * - `max` — quantidade de estrelas (default `5`)
 * - `disabled` — desliga a interação e esmaece (`aria-disabled`)
 * - `readonly` — desliga a interação mas mantém o contraste cheio (`aria-readonly`);
 *   é o modo de exibir uma média
 * - `allowHalf` — permite meia estrela: o clique/hover na METADE ESQUERDA vale
 *   `n - 0.5`, e o passo do teclado passa a ser `0.5`
 * - `showText` + `texts` — mostra o rótulo da nota (`texts[ceil(valor) - 1]`)
 * - `showScore` — mostra a nota numérica. Como no Element Plus os dois são
 *   mutuamente exclusivos: com `showText` ligado, ele vence
 * - `size` — `'sm' | 'md' | 'lg'` (default `'md'`): tamanho da estrela, gap e fonte
 * - `color` / `voidColor` — cor da estrela cheia / vazia. Qualquer string CSS
 *   (hex, `rgb()`, `var(...)`); vão como inline style em `--arcana-rate-color` /
 *   `--arcana-rate-void-color`. Sem elas, valem os tokens da paleta
 *   (`--arcana-warning-solid` e o degrau 6 do neutro), então o componente segue o
 *   acento e o modo escuro sozinho
 * - `ariaLabel` — nome acessível do grupo
 *
 * Tamanho custom: cada dimensão sai de uma custom property com o valor do `size`
 * como fallback — `--arcana-rate-icon-size`, `--arcana-rate-gap`,
 * `--arcana-rate-font-size`.
 *
 * Acessibilidade — escolhemos `role="radiogroup"` + `role="radio"` com **tabindex
 * rotativo** (roving tabindex) em vez de `<input type="radio">` visualmente
 * escondido, por três motivos:
 * 1. `<input type="radio">` exige um `name` único por instância; numa lista
 *    (ex: uma nota por linha da tabela) isso vira gerador de id no componente e,
 *    se escapar, dois ratings passam a disputar a mesma seleção.
 * 2. Com `allowHalf` o número de opções dobra (0.5, 1, 1.5, …). Como input real,
 *    cada meia estrela precisaria do próprio radio — o leitor de tela anunciaria
 *    "10 opções" para 5 estrelas.
 * 3. Roving tabindex dá UM único ponto de parada no Tab (o padrão APG para
 *    radiogroup), enquanto N inputs escondidos exigiriam CSS de "clip" correto
 *    para não sumir do foco.
 * Navegação: `←`/`↓` diminuem e `→`/`↑` aumentam a nota em um passo
 * (`allowHalf ? 0.5 : 1`), `Home` vai para a menor nota e `End` para `max`; o
 * foco acompanha a estrela correspondente. `disabled`/`readonly` tiram todas as
 * estrelas da ordem de tabulação.
 */
export default {
    name: 'ArcanaRate',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 5,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        allowHalf: {
            type: Boolean,
            default: false,
        },
        showText: {
            type: Boolean,
            default: false,
        },
        /** Rótulo por nota — `texts[0]` é a nota 1, `texts[max - 1]` a nota `max`. */
        texts: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
        showScore: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<RateSize>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg'].includes(v),
        },
        /** Cor da estrela cheia. Default: token `--arcana-warning-solid`. */
        color: {
            type: String,
            default: '',
        },
        /** Cor da estrela vazia. Default: degrau 6 da escala neutra. */
        voidColor: {
            type: String,
            default: '',
        },
        ariaLabel: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            /** Nota sob o cursor (preview). `null` = nenhum hover em curso. */
            hoverValue: null as number | null,
        }
    },

    computed: {
        /** Índices 0-based das estrelas — a mesma lista nos 4 frameworks. */
        stars(): number[] {
            const total = Math.max(0, Math.floor(this.max))
            return Array.from({ length: total }, (_, i) => i)
        },

        /** Interação desligada por `disabled` OU `readonly`. */
        isInert(): boolean {
            return this.disabled || this.readonly
        },

        /** Passo do teclado e da granularidade do clique. */
        step(): number {
            return this.allowHalf ? 0.5 : 1
        },

        /** Nota efetivamente desenhada: o hover tem precedência sobre o valor. */
        displayValue(): number {
            return this.hoverValue ?? this.safeValue
        },

        safeValue(): number {
            const v = Number(this.modelValue)
            if (!Number.isFinite(v)) return 0
            return Math.min(Math.max(v, 0), this.max)
        },

        currentText(): string {
            const idx = Math.ceil(this.displayValue) - 1
            return idx >= 0 ? (this.texts[idx] ?? '') : ''
        },

        scoreText(): string {
            return this.allowHalf ? this.displayValue.toFixed(1) : String(this.displayValue)
        },

        rootStyle(): Record<string, string> | undefined {
            const style: Record<string, string> = {}
            if (this.color) style['--arcana-rate-color'] = this.color
            if (this.voidColor) style['--arcana-rate-void-color'] = this.voidColor
            return Object.keys(style).length ? style : undefined
        },
    },

    methods: {
        /**
         * 0..100 — quanto da estrela `index` está preenchido. Arredondado a 2 casas
         * porque o valor vai para o `style` inline e `(4.3 - 4) * 100` em ponto
         * flutuante daria `30.000000000000027%`.
         */
        fillPercent(index: number): number {
            const pct = Math.min(Math.max((this.displayValue - index) * 100, 0), 100)
            return Math.round(pct * 100) / 100
        },

        /**
         * Só UMA estrela fica `aria-checked` (é um radiogroup): a que CONTÉM a nota.
         * Com nota `0` nenhuma fica marcada; com `3.5` é a quarta (`ceil(3.5) = 4`),
         * a que está pela metade.
         */
        isChecked(index: number): boolean {
            return Math.ceil(this.safeValue) === index + 1
        },

        itemLabel(index: number): string {
            return this.texts[index] || String(index + 1)
        },

        /**
         * Roving tabindex: um único ponto de parada no Tab — a estrela da nota atual
         * (ou a primeira, quando a nota é `0`).
         */
        itemTabIndex(index: number): number {
            if (this.isInert) return -1
            const focusIndex = this.safeValue > 0 ? Math.ceil(this.safeValue) - 1 : 0
            return index === focusIndex ? 0 : -1
        },

        /** Nota apontada pelo cursor: metade esquerda vale `n - 0.5` quando `allowHalf`. */
        valueFromPointer(event: MouseEvent, index: number): number {
            if (!this.allowHalf) return index + 1
            const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
            if (!rect.width) return index + 1
            return event.clientX - rect.left < rect.width / 2 ? index + 0.5 : index + 1
        },

        onItemClick(event: MouseEvent, index: number) {
            if (this.isInert) return
            this.setValue(this.valueFromPointer(event, index))
        },

        onItemMove(event: MouseEvent, index: number) {
            if (this.isInert) return
            this.hoverValue = this.valueFromPointer(event, index)
        },

        onLeave() {
            this.hoverValue = null
        },

        onKeydown(event: KeyboardEvent) {
            if (this.isInert) return

            const current = this.safeValue
            let next: number | null = null

            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                next = Math.min(this.max, current + this.step)
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                next = Math.max(0, current - this.step)
            } else if (event.key === 'Home') {
                next = this.step
            } else if (event.key === 'End') {
                next = this.max
            }

            if (next === null) return
            event.preventDefault()
            this.setValue(next)
            this.focusStar(next)
        },

        /** Move o foco para a estrela que passou a conter a nota (roving tabindex). */
        focusStar(value: number) {
            const items = (this.$el as HTMLElement).querySelectorAll<HTMLElement>('.arcana-rate__item')
            const target = items[Math.max(0, Math.ceil(value) - 1)]
            if (target) target.focus()
        },

        setValue(value: number) {
            if (this.isInert || value === this.safeValue) return
            this.hoverValue = null
            this.$emit('update:modelValue', value)
            this.$emit('change', value)
        },
    },
} as Component
</script>
