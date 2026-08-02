<template>
    <div
        class="arcana-quick-search"
        :class="{ 'is-disabled': disabled, 'has-counter': counter != null }"
    >
        <div v-if="searchFields.length" class="arcana-quick-search__info" role="button" tabindex="0">
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
            <div :id="hintId" class="arcana-quick-search__hint" role="tooltip">
                <span class="arcana-quick-search__hint-label">{{ fieldsLabel }}</span>
                <ul class="arcana-quick-search__hint-list">
                    <li v-for="field in searchFields" :key="field" class="arcana-quick-search__hint-item">
                        {{ field }}
                    </li>
                </ul>
            </div>
        </div>

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
            :aria-describedby="searchFields.length ? hintId : undefined"
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

/** Contador de instâncias pra gerar um `id` determinístico (sem `Math.random`) usado
 *  no `aria-describedby` do input e no `id` do balão de dica. */
let uid = 0

/**
 * `<ArcanaQuickSearch>` — campo de busca compacto com dica dos campos pesquisáveis e
 * contador opcional de resultados.
 *
 * Anatomia:
 *   .arcana-quick-search                 wrapper do campo (borda + foco via `:focus-within`)
 *     .arcana-quick-search__info         gatilho da dica (`role="button"`, abre no hover/foco)
 *       .arcana-quick-search__info-icon
 *       .arcana-quick-search__hint       balão da dica (`role="tooltip"`)
 *         .arcana-quick-search__hint-label
 *         .arcana-quick-search__hint-list
 *           .arcana-quick-search__hint-item
 *     .arcana-quick-search__icon         lupa
 *     .arcana-quick-search__input
 *     .arcana-quick-search__clear        botão de limpar
 *     .arcana-quick-search__counter      contador opcional de resultados
 *       .arcana-quick-search__counter-value
 *       .arcana-quick-search__counter-unit
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
            type: [Number, String, null] as PropType<number | string | null>,
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
        }
    },

    watch: {
        // Mantém o buffer local sincronizado quando o consumidor controla `modelValue`
        // externamente (ex.: reset feito pelo pai via prop, não pelo método `reset()`).
        modelValue(value: string) {
            if (value !== this.text) this.text = value
        },
    },

    methods: {
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
