<template>
    <div
        class="arcana-quick-search"
        :class="{ 'is-disabled': disabled, 'has-counter': counter != null }"
    >
        <div
            v-if="searchFields.length"
            ref="infoRef"
            class="arcana-quick-search__info"
            role="button"
            tabindex="0"
            @mouseenter="openHint"
            @mouseleave="closeHint"
            @focusin="openHint"
            @focusout="closeHint"
        >
            <svg
                class="arcana-quick-search__info-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
            </svg>
        </div>

        <!--
            Balão teleportado pro <body> (position: fixed via `placeHoverCard`) pra
            escapar de qualquer ancestral com overflow:hidden / z-index restritivo —
            mesma técnica do ArcanaTooltip.
        -->
        <Teleport to="body">
            <div
                v-if="hintOpen"
                :id="hintId"
                ref="hintRef"
                class="arcana-quick-search__hint"
                :style="hintStyle"
                role="tooltip"
            >
                <span class="arcana-quick-search__hint-label">{{ fieldsLabel }}</span>
                <ul class="arcana-quick-search__hint-list">
                    <li v-for="field in searchFields" :key="field" class="arcana-quick-search__hint-item">
                        {{ field }}
                    </li>
                </ul>
            </div>
        </Teleport>

        <svg
            class="arcana-quick-search__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>

        <input
            ref="input"
            class="arcana-quick-search__input"
            type="text"
            :value="text"
            :placeholder="placeholder"
            :disabled="disabled"
            :aria-describedby="hintOpen ? hintId : undefined"
            @input="onInput"
            @keyup.enter="search"
        />

        <button
            type="button"
            class="arcana-quick-search__clear"
            :aria-label="clearLabel"
            :title="clearLabel"
            @click="clear"
        >
            <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
            </svg>
        </button>

        <div v-if="counter != null" class="arcana-quick-search__counter">
            <span class="arcana-quick-search__counter-value">{{ counter }}</span>
            <span v-if="!hideUnit" class="arcana-quick-search__counter-unit">{{ unit }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import { placeHoverCard } from "../../core/hover-card"

/** Contador de instâncias pra gerar um `id` determinístico (sem `Math.random`) usado
 *  no `aria-describedby` do input e no `id` do balão de dica. */
let uid = 0

/** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
const HINT_ESTIMATE = { width: 200, height: 80 }

/**
 * `<ArcanaQuickSearch>` — campo de busca compacto com dica dos campos pesquisáveis e
 * contador opcional de resultados.
 *
 * Anatomia:
 *   .arcana-quick-search                 wrapper do campo (borda + foco via `:focus-within`)
 *     .arcana-quick-search__info         gatilho da dica (`role="button"`, abre no hover/foco)
 *       .arcana-quick-search__info-icon
 *     .arcana-quick-search__icon         lupa
 *     .arcana-quick-search__input
 *     .arcana-quick-search__clear        botão de limpar
 *     .arcana-quick-search__counter      contador opcional de resultados
 *       .arcana-quick-search__counter-value
 *       .arcana-quick-search__counter-unit
 *   .arcana-quick-search__hint           balão da dica (`role="tooltip"`), TELEPORTADO pro
 *                                         `<body>` e posicionado com `position: fixed` via JS
 *                                         (`core/hover-card`, mesma técnica do ArcanaTooltip) —
 *                                         escapa de qualquer ancestral com `overflow: hidden`.
 *                                         Montado/desmontado no hover/foco do gatilho, não por
 *                                         CSS `:hover`.
 *     .arcana-quick-search__hint-label
 *     .arcana-quick-search__hint-list
 *       .arcana-quick-search__hint-item
 *
 * Estados: `.is-disabled` (campo inabilitado) e `.has-counter` (contador presente).
 *
 * API:
 * - `modelValue` (v-model) — texto da busca (default `''`)
 * - `placeholder` — placeholder do input (default `''`)
 * - `searchFields` — lista de campos pesquisáveis; quando vazia, o gatilho de dica
 *   nem é renderizado (default `[]`)
 * - `fieldsLabel` — título do balão de dica (default `'Campos pesquisáveis:'`)
 * - `counter` — número (ou string) de resultados; `null`/`undefined` esconde o pill
 *   (default `null`)
 * - `unit` — unidade exibida ao lado do contador (default `'registro(s)'`)
 * - `hideUnit` — esconde a unidade, mantendo só o valor (default `false`)
 * - `disabled` — desabilita o campo (default `false`)
 * - `clearLabel` — `aria-label`/`title` do botão de limpar (default `'Limpar busca'`)
 *
 * Eventos:
 * - `update:modelValue(value: string)` — a cada digitação (v-model)
 * - `search(value: string)` — ao pressionar Enter, ou ao limpar (com `''`)
 * - `clear()` — ao clicar no botão de limpar
 *
 * Métodos (via `ref`):
 * - `reset()` — zera o texto sem emitir `search` (só `update:modelValue`)
 * - `focus()` — foca o `<input>`
 */
export default {
    name: 'ArcanaQuickSearch',

    emits: ['update:modelValue', 'search', 'clear'],

    props: {
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        searchFields: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
        fieldsLabel: {
            type: String,
            default: 'Campos pesquisáveis:',
        },
        counter: {
            type: [Number, String] as PropType<number | string | null>,
            default: null,
        },
        unit: {
            type: String,
            default: 'registro(s)',
        },
        hideUnit: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        clearLabel: {
            type: String,
            default: 'Limpar busca',
        },
    },

    data() {
        return {
            text: this.modelValue,
            hintId: `arcana-qs-${++uid}`,
            hintOpen: false,
            hintStyle: {} as Record<string, string>,
            // Só vira `true` no `mounted()` e volta a `false` no `beforeUnmount()` — usado
            // por `openHint()` pra descartar um `reposition()`/`attachHintListeners()`
            // tardio (resumido depois de um `await $nextTick()`) contra uma instância já
            // destruída ou um hint que fechou nesse meio-tempo (ver `openHint`).
            hintMounted: false,
        }
    },

    watch: {
        // Mantém o buffer local sincronizado quando o consumidor controla `modelValue`
        // externamente (ex.: reset feito pelo pai via prop, não pelo método `reset()`).
        modelValue(value: string) {
            if (value !== this.text) this.text = value
        },

        // Se o pai encolher `searchFields` pra `[]` enquanto o hint está aberto, o
        // gatilho `.info` desmonta (`v-if="searchFields.length"`) sem disparar
        // `mouseleave`/`focusout` — sem isso o balão e os listeners globais ficam
        // órfãos (painel preso na tela, `keydown`/`scroll`/`resize` vazando).
        searchFields(value: string[]) {
            if (!value.length && this.hintOpen) this.closeHint()
        },
    },

    mounted() {
        this.hintMounted = true
    },

    beforeUnmount() {
        this.hintMounted = false
        this.detachHintListeners()
    },

    methods: {
        async openHint() {
            if (!this.searchFields.length || this.hintOpen) return
            this.hintOpen = true
            await this.$nextTick()
            // A instância pode ter desmontado, ou o hint pode ter fechado de novo
            // (mouseleave rápido, `searchFields` esvaziado), enquanto esperávamos o
            // tick — sem essa checagem, `attachHintListeners()` prenderia listeners
            // globais que nunca mais seriam removidos (o `detach` do `beforeUnmount`/
            // `closeHint` já rodou antes deles existirem).
            if (!this.hintMounted || !this.hintOpen) return
            this.repositionHint()
            this.attachHintListeners()
        },

        closeHint() {
            if (!this.hintOpen) return
            this.hintOpen = false
            this.detachHintListeners()
        },

        repositionHint() {
            const info = this.$refs.infoRef as HTMLElement | undefined
            const hint = this.$refs.hintRef as HTMLElement | undefined
            if (!info) return

            const rect = info.getBoundingClientRect()
            const hintWidth = hint?.offsetWidth || HINT_ESTIMATE.width
            const hintHeight = hint?.offsetHeight || HINT_ESTIMATE.height

            const place = placeHoverCard(
                rect,
                { width: hintWidth, height: hintHeight },
                { width: window.innerWidth, height: window.innerHeight },
                { side: "top", align: "center", gap: 8 },
            )

            this.hintStyle = {
                position: "fixed",
                left: `${place.left}px`,
                top: `${place.top}px`,
            }
        },

        onHintKeydown(event: KeyboardEvent) {
            if (event.key === "Escape") this.closeHint()
        },

        onHintWindowScroll() {
            this.repositionHint()
        },

        onHintWindowResize() {
            this.repositionHint()
        },

        attachHintListeners() {
            document.addEventListener("keydown", this.onHintKeydown)
            window.addEventListener("scroll", this.onHintWindowScroll, true)
            window.addEventListener("resize", this.onHintWindowResize)
        },

        detachHintListeners() {
            document.removeEventListener("keydown", this.onHintKeydown)
            window.removeEventListener("scroll", this.onHintWindowScroll, true)
            window.removeEventListener("resize", this.onHintWindowResize)
        },

        onInput(e: Event) {
            this.text = (e.target as HTMLInputElement).value
            this.$emit('update:modelValue', this.text)
        },

        search() {
            this.$emit('search', this.text)
        },

        clear() {
            this.text = ''
            this.$emit('update:modelValue', '')
            this.$emit('clear')
            this.search()
        },

        /** Zera o texto sem emitir `search` (só `update:modelValue`). */
        reset() {
            this.text = ''
            this.$emit('update:modelValue', '')
        },

        /** Foca o `<input>`. */
        focus() {
            (this.$refs.input as HTMLInputElement).focus()
        },
    },
} as Component
</script>
