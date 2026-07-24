<template>
    <div :class="['shadcn-date-picker', { 'is-disabled': disabled }, `shadcn-date-picker--${size}`]">
        <!--
            type=date → input com digitação mascarada ao vivo (DD/MM/AAAA) + placeholder
            de data, e o calendário é o popover do Element Plus.

            Composição: um <input v-maska> mascarado faz a digitação (DD/MM/AAAA, máscara
            aplicada caractere a caractere); o ícone abre o popover de um <el-date-picker>
            invisível posicionado por cima do campo (serve só de âncora/calendário).
        -->
        <div v-if="isComposite" class="shadcn-date-picker__box">
            <!-- el-date-picker invisível atrás do campo — só fornece o popover (âncora). -->
            <div class="shadcn-date-picker__picker-anchor" aria-hidden="true">
                <el-date-picker
                    ref="picker"
                    :model-value="modelValue"
                    type="date"
                    :disabled="disabled"
                    :clearable="false"
                    :editable="false"
                    format="DD/MM/YYYY"
                    value-format="YYYY-MM-DD"
                    @update:modelValue="onPick"
                />
            </div>

            <input
                ref="textInput"
                v-maska="'##/##/####'"
                class="shadcn-date-picker__text"
                inputmode="numeric"
                :value="displayText"
                placeholder="__/__/____"
                :disabled="disabled"
                @maska="onMaska"
                @blur="onTextBlur"
                @focus="$emit('focus', $event)"
            />

            <button
                type="button"
                class="shadcn-date-picker__icon-btn"
                :disabled="disabled"
                aria-label="Abrir calendário"
                @click="openPicker"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            </button>
        </div>

        <!-- ranges / month / year → el-date-picker padrão (calendário; editável p/ single não-date). -->
        <el-date-picker
            v-else
            :model-value="modelValue"
            :type="type"
            :disabled="disabled"
            :editable="!isRange && editable"
            :clearable="clearable"
            :placeholder="placeholder"
            :format="displayFormat"
            value-format="YYYY-MM-DD"
            @change="$emit('change', $event)"
            @update:modelValue="$emit('update:modelValue', $event)"
        />
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import { DateFormatter } from "../../core/date"

/**
 * `<ShadcnDatePicker>` — input de data shadcn-styled com calendário do Element Plus.
 *
 * Para `type="date"` usa um composite: input mascarado (digitação ao vivo `DD/MM/AAAA`,
 * placeholder de data) + popover do `<el-date-picker>` aberto pelo ícone de calendário.
 * Para os demais types (`daterange`, `month`, `year`, ...) usa o `<el-date-picker>` direto.
 *
 * API:
 * - `modelValue` (v-model) — string `'YYYY-MM-DD'` (ou tuple p/ ranges)
 * - `type` — `'date'` (default) | `'daterange'` | `'month'` | `'year'` | etc
 * - `editable` — permite digitar (default `true`; ignorado em ranges)
 * - `placeholder`, `disabled`, `clearable`, `size` (`'sm' | 'md' | 'lg'`)
 *
 * Emite: `update:modelValue`, `change`, `blur`, `focus`.
 */
export default {
    name: 'ShadcnDatePicker',

    emits: ['update:modelValue', 'change', 'blur', 'focus'],

    props: {
        modelValue: {
            type: [String, Array, null] as PropType<string | string[] | null>,
            default: null,
        },
        type: {
            type: String,
            default: 'date',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        editable: {
            type: Boolean,
            default: true,
        },
        placeholder: {
            type: String,
            default: '',
        },
        size: {
            type: String as PropType<'sm' | 'md' | 'lg'>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg'].includes(v),
        },
    },

    data() {
        return {
            // Display mascarado (DD/MM/YYYY). Estado local pra não brigar com o cursor
            // do maska enquanto digita; `lastEmitted` guarda o último YMD que emitimos
            // pra distinguir mudança externa (watch) de eco da própria emissão.
            displayText: null as string | null,
            lastEmitted: null as string | null,
        }
    },

    computed: {
        isRange(): boolean {
            return String(this.type).includes('range')
        },
        isComposite(): boolean {
            return this.type === 'date'
        },
        displayFormat(): string {
            if (this.type === 'year' || this.type === 'yearrange') return 'YYYY'
            if (this.type === 'month' || this.type === 'monthrange') return 'MM/YYYY'
            return 'DD/MM/YYYY'
        },
    },

    watch: {
        modelValue(v: any) {
            // Reflete mudanças externas (load de form, reset, seleção no calendário) no display.
            // Ignora o eco da própria emissão (já refletido pelo input).
            if (v !== this.lastEmitted) {
                this.lastEmitted = (v as string) ?? null
                this.displayText = v ? this.toDisplay(v as string) : null
            }
        },
    },

    mounted() {
        if (this.isComposite) {
            this.lastEmitted = (this.modelValue as string) ?? null
            this.displayText = this.modelValue ? this.toDisplay(this.modelValue as string) : null
        }
    },

    methods: {
        toDisplay(ymd: string): string {
            return DateFormatter.fromDate(ymd) ?? ''
        },

        rawToYmd(raw: string): string | undefined {
            if (raw.length !== 8) return undefined
            const d = raw.slice(0, 2), m = raw.slice(2, 4), y = raw.slice(4, 8)
            const dd = Number(d), mm = Number(m), yyyy = Number(y)
            if (mm < 1 || mm > 12 || dd < 1 || dd > 31 || yyyy < 1900) return undefined
            const dt = new Date(yyyy, mm - 1, dd)
            // Validação estrita (rejeita 31/02, 31/04, etc).
            if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) return undefined
            return `${y}-${m}-${d}`
        },

        emitValue(ymd: string | null) {
            this.lastEmitted = ymd
            this.$emit('update:modelValue', ymd)
            this.$emit('change', ymd)
        },

        onMaska(event: any) {
            this.displayText = event.target.value
            const raw = (event.target.dataset.maskRawValue ?? '') as string

            if (raw.length === 0) {
                this.emitValue(null)
                return
            }
            if (raw.length === 8) {
                const ymd = this.rawToYmd(raw)
                if (ymd) this.emitValue(ymd)
            }
            // Incompleto: não emite (mantém o último valor válido até completar ou limpar).
        },

        onTextBlur(event: FocusEvent) {
            this.$emit('blur', event)
            // Reverte digitação incompleta/inválida pro último valor confirmado.
            const raw = (this.displayText ?? '').replace(/\D/g, '')
            if (raw.length !== 8 || !this.rawToYmd(raw)) {
                this.displayText = this.modelValue ? this.toDisplay(this.modelValue as string) : null
            }
        },

        onPick(ymd: string | null) {
            // Seleção pelo calendário → emite; o watch atualiza o display.
            this.$emit('update:modelValue', ymd)
            this.$emit('change', ymd)
        },

        openPicker() {
            if (this.disabled) return
            ;(this.$refs.picker as any)?.handleOpen?.()
        },
    },
} as Component
</script>

<style scoped lang="scss">
.shadcn-date-picker {
    width: 100%;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* ───────────────────────── Composite (type=date) ───────────────────────── */
.shadcn-date-picker__box {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    background: #ffffff;
    box-sizing: border-box;
    transition: border-color 150ms ease;
}
.shadcn-date-picker__box:hover { border-color: #d4d4d8; }
.shadcn-date-picker__box:focus-within { border-color: #18181b; }
.shadcn-date-picker.is-disabled .shadcn-date-picker__box {
    background: #fafafa;
    opacity: 0.7;
}

.shadcn-date-picker__text {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    padding: 0 36px 0 12px;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 13px;
    line-height: 1.4;
    color: #09090b;
}
.shadcn-date-picker__text::placeholder { color: #a1a1aa; }
.shadcn-date-picker__text:disabled { color: #a1a1aa; cursor: not-allowed; }

.shadcn-date-picker__icon-btn {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    bottom: 0;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: #71717a;
    cursor: pointer;
    transition: color 150ms ease;
}
.shadcn-date-picker__box:focus-within .shadcn-date-picker__icon-btn { color: #18181b; }
.shadcn-date-picker__icon-btn:hover:not(:disabled) { color: #18181b; }
.shadcn-date-picker__icon-btn:disabled { color: #a1a1aa; cursor: not-allowed; }

/* el-date-picker invisível atrás do campo — só fornece o popover (âncora), nunca visível. */
.shadcn-date-picker__picker-anchor {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
}
.shadcn-date-picker__picker-anchor :deep(.el-date-editor) {
    width: 100%;
    height: 100%;
}

/* Sizes (composite) */
.shadcn-date-picker--sm .shadcn-date-picker__box { height: 30px; }
.shadcn-date-picker--sm .shadcn-date-picker__text { font-size: 12px; padding: 0 32px 0 10px; }
.shadcn-date-picker--lg .shadcn-date-picker__box { height: 42px; }
.shadcn-date-picker--lg .shadcn-date-picker__text { font-size: 14px; padding: 0 40px 0 14px; }

/* ───────────────────── Fallback el-date-picker (ranges/month/year) ──────────────────────
   :deep() porque o <el-date-picker> renderiza um .el-input__wrapper interno. */
.shadcn-date-picker :deep(.el-date-editor.el-input),
.shadcn-date-picker :deep(.el-date-editor.el-input__wrapper),
.shadcn-date-picker :deep(.el-date-editor) {
    width: 100%;
}

.shadcn-date-picker :deep(.el-input__wrapper) {
    height: 36px;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: none;
    padding: 0 12px;
    transition: border-color 150ms ease;
}

.shadcn-date-picker :deep(.el-input__wrapper:hover) {
    border-color: #d4d4d8;
    box-shadow: none;
}

.shadcn-date-picker :deep(.el-input__wrapper.is-focus),
.shadcn-date-picker :deep(.el-input.is-focus .el-input__wrapper) {
    border-color: #18181b;
    box-shadow: none;
}

.shadcn-date-picker :deep(.el-input__inner) {
    color: #09090b;
    font-size: 13px;
    font-family: inherit;
    line-height: 1.4;
    height: 100%;
    cursor: pointer;
}

.shadcn-date-picker :deep(.el-input__inner::placeholder) {
    color: #a1a1aa;
}

.shadcn-date-picker :deep(.el-input__prefix),
.shadcn-date-picker :deep(.el-input__suffix) {
    color: #71717a;
    transition: color 150ms ease;
}

.shadcn-date-picker :deep(.el-input.is-focus .el-input__prefix),
.shadcn-date-picker :deep(.el-input.is-focus .el-input__suffix) {
    color: #18181b;
}

.shadcn-date-picker :deep(.el-input__icon) {
    font-size: 14px;
}

.shadcn-date-picker.is-disabled :deep(.el-input__wrapper) {
    background: #fafafa;
    opacity: 0.7;
    cursor: not-allowed;
}

.shadcn-date-picker.is-disabled :deep(.el-input__inner) {
    color: #a1a1aa;
    cursor: not-allowed;
}

.shadcn-date-picker--sm :deep(.el-input__wrapper) {
    height: 30px;
    padding: 0 10px;
}

.shadcn-date-picker--sm :deep(.el-input__inner) {
    font-size: 12px;
}

.shadcn-date-picker--lg :deep(.el-input__wrapper) {
    height: 42px;
    padding: 0 14px;
}

.shadcn-date-picker--lg :deep(.el-input__inner) {
    font-size: 14px;
}
</style>
