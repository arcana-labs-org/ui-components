<template>
    <button
        type="button"
        role="switch"
        class="shadcn-switch"
        :class="rootClasses"
        :aria-checked="isChecked"
        :aria-label="ariaLabel || undefined"
        :disabled="disabled"
        @click="toggle"
        @keydown="onKeydown"
    >
        <span class="shadcn-switch__thumb" aria-hidden="true"></span>

        <!--
            Native input escondido pra integrar com forms HTML (submit, validação)
            e screen readers que não suportam role="switch" nativo. Sincroniza com
            o estado do componente.
        -->
        <input
            v-if="name"
            type="checkbox"
            class="shadcn-switch__hidden-input"
            :name="name"
            :checked="isChecked"
            :disabled="disabled"
            tabindex="-1"
            aria-hidden="true"
            @change.stop
        />
    </button>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnSwitch>` — toggle binário on/off (palette zinc).
 *
 * UX: pra valores booleanos onde "ligar/desligar" faz mais sentido que "Sim/Não" num
 * select. Casos típicos: auto-renew, notifications, dark mode, etc.
 *
 * API:
 * - `modelValue` (v-model) — boolean
 * - `disabled` — boolean
 * - `size` — `'sm' | 'md' | 'lg'` (default `md`)
 * - `name` — opcional, name do checkbox HTML escondido (pra forms tradicionais)
 * - `ariaLabel` — opcional, descrição pra screen reader (recomendado quando não há `<label for>`)
 *
 * Acessibilidade:
 * - `role="switch"` + `aria-checked` (padrão WAI-ARIA pra toggle)
 * - `Space`/`Enter` ativam (browser default em `<button>`)
 * - `<input type="checkbox">` escondido pra integração com formulários nativos
 *
 * Exemplo:
 *
 *     <label class="form-row">
 *         <span>Auto-renovação</span>
 *         <ShadcnSwitch v-model="form.auto_renew" aria-label="Auto-renovação" />
 *     </label>
 */
export default {
    name: 'ShadcnSwitch',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<'sm' | 'md' | 'lg'>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg'].includes(v),
        },
        name: {
            type: String,
            default: '',
        },
        ariaLabel: {
            type: String,
            default: '',
        },
    },

    computed: {
        isChecked(): boolean {
            return Boolean(this.modelValue)
        },
        rootClasses(): string {
            const cls = [`shadcn-switch--${this.size}`]
            if (this.isChecked) cls.push('is-checked')
            if (this.disabled) cls.push('is-disabled')
            return cls.join(' ')
        },
    },

    methods: {
        toggle() {
            if (this.disabled) return
            const next = !this.isChecked
            this.$emit('update:modelValue', next)
            this.$emit('change', next)
        },

        onKeydown(e: KeyboardEvent) {
            // Space/Enter já ativam o button por default; aqui só interceptamos
            // pra evitar scroll da página ao apertar Space.
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                this.toggle()
            }
        },
    },
} as Component
</script>

<style scoped>
.shadcn-switch {
    /*
     * Track (background) — feedback semântico de status:
     * - OFF: vermelho (red-500 #ef4444) — comunica "desligado / inativo"
     * - ON:  verde   (emerald-500 #10b981) — comunica "habilitado / ativo"
     *
     * Antes era zinc-200 → zinc-900 (neutro). Mudança torna o estado MUITO mais
     * scannable em listas longas de configurações (admin varre a tela e vê
     * imediatamente quais features estão off/on pela cor, sem precisar olhar
     * a posição do thumb).
     *
     * Thumb branco mantém contraste AA contra ambos os tracks.
     */
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    border: none;
    border-radius: 9999px;
    background: #ef4444;     /* off — red-500 */
    cursor: pointer;
    transition: background-color 200ms ease, opacity 200ms ease;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: inherit;
}

.shadcn-switch:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 2px;
}

.shadcn-switch.is-checked {
    background: #10b981;     /* on — emerald-500 */
}

.shadcn-switch.is-disabled,
.shadcn-switch:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Thumb (círculo branco que move) */
.shadcn-switch__thumb {
    display: block;
    background: #ffffff;
    border-radius: 9999px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: transform 200ms ease;
    pointer-events: none;
    will-change: transform;
}

/* Hidden checkbox pra integração com forms HTML */
.shadcn-switch__hidden-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    margin: 0;
}

/* ─── Sizes ─── */

/* MD (default) — 36×20 track, 16 thumb */
.shadcn-switch--md {
    width: 36px;
    height: 20px;
    padding: 2px;
}

.shadcn-switch--md .shadcn-switch__thumb {
    width: 16px;
    height: 16px;
    transform: translateX(0);
}

.shadcn-switch--md.is-checked .shadcn-switch__thumb {
    transform: translateX(16px);
}

/* SM — 28×16 track, 12 thumb */
.shadcn-switch--sm {
    width: 28px;
    height: 16px;
    padding: 2px;
}

.shadcn-switch--sm .shadcn-switch__thumb {
    width: 12px;
    height: 12px;
    transform: translateX(0);
}

.shadcn-switch--sm.is-checked .shadcn-switch__thumb {
    transform: translateX(12px);
}

/* LG — 44×24 track, 20 thumb */
.shadcn-switch--lg {
    width: 44px;
    height: 24px;
    padding: 2px;
}

.shadcn-switch--lg .shadcn-switch__thumb {
    width: 20px;
    height: 20px;
    transform: translateX(0);
}

.shadcn-switch--lg.is-checked .shadcn-switch__thumb {
    transform: translateX(20px);
}
</style>
