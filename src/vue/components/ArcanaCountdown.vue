<template>
    <div
        class="arcana-countdown"
        :class="[
            `arcana-countdown--${size}`,
            `arcana-countdown--${tone}`,
            { 'is-finished': isFinished, 'is-paused': isPaused },
        ]"
        :style="valueColor ? { '--arcana-countdown-value-color': valueColor } : undefined"
        role="timer"
    >
        <div v-if="hasTitle" class="arcana-countdown__title">
            <slot name="title">{{ title }}</slot>
        </div>

        <div class="arcana-countdown__content">
            <span v-if="hasPrefix" class="arcana-countdown__prefix">
                <slot name="prefix">{{ prefix }}</slot>
            </span>

            <span class="arcana-countdown__value">{{ displayValue }}</span>

            <span v-if="hasSuffix" class="arcana-countdown__suffix">
                <slot name="suffix">{{ suffix }}</slot>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

import {
    DEFAULT_COUNTDOWN_FORMAT,
    countdownTickInterval,
    formatDuration,
    remainingMs,
} from "../../core/countdown"

type CountdownTone = 'neutral' | 'success' | 'danger' | 'warning' | 'info'
type CountdownSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * `<ArcanaCountdown>` — contagem regressiva até um instante alvo. Mesma anatomia do
 * `<ArcanaStatistic>` (título em cima, `[prefixo] VALOR [sufixo]` embaixo), só que o valor
 * é o tempo restante, re-renderizado a cada tick.
 *
 * API:
 * - `value` — instante ALVO: epoch em ms (`number`), `Date` ou string ISO. Valor inválido/
 *   vazio zera o contador em vez de virar `NaN`.
 * - `format` (default `'HH:mm:ss'`) — tokens `DD`,`D`,`HH`,`H`,`mm`,`m`,`ss`,`s`,`SSS`,`SS`,`S`
 *   e literais entre colchetes (`'DD [dias] HH:mm:ss'`). **A maior unidade presente absorve
 *   o excedente**: 50h viram `50:00:00` em `HH:mm:ss` (nada de tempo sumindo silenciosamente).
 * - `prefix` / `suffix` / `title` — textos (ou slots homônimos)
 * - `tone` / `valueColor` / `size` — idem `ArcanaStatistic`
 * - `paused` — pausa a contagem (o valor congela). Reativo: voltar pra `false` retoma.
 * - `interval` — período do tick em ms. Default automático: 50ms quando o `format` mostra
 *   milissegundos, 1000ms caso contrário.
 *
 * Eventos:
 * - `change(remaining: number)` — a cada tick, com o restante em ms
 * - `finish()` — uma única vez, ao zerar
 *
 * Métodos (via `ref`): `pause()`, `resume()`, `restart()`.
 *
 * Timers: um único `setInterval`, sempre limpo antes de recriar e no `beforeUnmount` — nada
 * de intervalos acumulando ao trocar `value`/`format`. Cada tick recalcula o restante a
 * partir do relógio, então o intervalo só controla a taxa de refresh (não acumula drift).
 *
 * A formatação vive em `core/countdown.ts` (framework-agnóstica e testada).
 */
export default {
    name: 'ArcanaCountdown',

    emits: ['change', 'finish'],

    props: {
        value: {
            type: [Number, String, Date, null] as PropType<number | string | Date | null>,
            default: null,
        },
        format: {
            type: String,
            default: DEFAULT_COUNTDOWN_FORMAT,
        },
        prefix: {
            type: String,
            default: '',
        },
        suffix: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        tone: {
            type: String as PropType<CountdownTone>,
            default: 'neutral',
            validator: (v: string) => ['neutral', 'success', 'danger', 'warning', 'info'].includes(v),
        },
        valueColor: {
            type: String,
            default: '',
        },
        size: {
            type: String as PropType<CountdownSize>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg', 'xl'].includes(v),
        },
        paused: {
            type: Boolean,
            default: false,
        },
        /** Período do tick em ms. Sem valor, deriva do `format` (50ms com `S*`, senão 1000ms). */
        interval: {
            type: Number,
            default: undefined,
        },
    },

    data() {
        return {
            remaining: 0,
            isPaused: this.paused,
            /** Trava do `finish` (evita re-emitir a cada tick depois de zerar). */
            hasFinished: false,
            timer: null as ReturnType<typeof setInterval> | null,
        }
    },

    computed: {
        displayValue(): string {
            return formatDuration(this.remaining, this.format)
        },

        isFinished(): boolean {
            return this.remaining <= 0
        },

        hasTitle(): boolean {
            return Boolean(this.$slots.title || this.title)
        },

        hasPrefix(): boolean {
            return Boolean(this.$slots.prefix || this.prefix)
        },

        hasSuffix(): boolean {
            return Boolean(this.$slots.suffix || this.suffix)
        },

        tickInterval(): number {
            return this.interval && this.interval > 0 ? this.interval : countdownTickInterval(this.format)
        },
    },

    watch: {
        value() {
            this.restart()
        },
        format() {
            // O tick derivado do formato pode ter mudado (ms ↔ segundos).
            if (!this.isPaused) this.start()
        },
        interval() {
            if (!this.isPaused) this.start()
        },
        paused(value: boolean) {
            this.isPaused = value
            if (value) this.stop()
            else this.start()
        },
    },

    mounted() {
        this.sync()
        if (!this.isPaused) this.start()
    },

    beforeUnmount() {
        this.stop()
    },

    methods: {
        /** Recalcula o restante a partir do relógio e resolve o `finish`. */
        sync(): number {
            const rest = remainingMs(this.value, Date.now())
            this.remaining = rest
            return rest
        },

        tick() {
            const rest = this.sync()
            this.$emit('change', rest)
            if (rest <= 0 && !this.hasFinished) {
                this.hasFinished = true
                this.stop()
                this.$emit('finish')
            }
        },

        /** (Re)cria o intervalo. Sempre limpa o anterior — nunca acumula. */
        start() {
            this.stop()
            if (this.hasFinished) return
            if (this.sync() <= 0) {
                this.hasFinished = true
                this.$emit('finish')
                return
            }
            this.timer = setInterval(() => this.tick(), this.tickInterval)
        },

        stop() {
            if (this.timer !== null) {
                clearInterval(this.timer)
                this.timer = null
            }
        },

        pause() {
            this.isPaused = true
            this.stop()
        },

        resume() {
            this.isPaused = false
            this.start()
        },

        /** Zera a trava do `finish` e recomeça a partir do `value` atual. */
        restart() {
            this.hasFinished = false
            this.sync()
            if (!this.isPaused) this.start()
        },
    },
} as Component
</script>
