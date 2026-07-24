<template>
    <div :class="['arcana-date-picker', { 'is-disabled': disabled }, `arcana-date-picker--${size}`]">
        <!--
            type=date → input com digitação mascarada ao vivo (DD/MM/AAAA) + placeholder
            de data, e o calendário é o popover do Element Plus.

            Composição: um <input v-maska> mascarado faz a digitação (DD/MM/AAAA, máscara
            aplicada caractere a caractere); o ícone abre o popover de um <el-date-picker>
            invisível posicionado por cima do campo (serve só de âncora/calendário).
        -->
        <div v-if="isComposite" class="arcana-date-picker__box">
            <!-- el-date-picker invisível atrás do campo — só fornece o popover (âncora). -->
            <div class="arcana-date-picker__picker-anchor" aria-hidden="true">
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
                class="arcana-date-picker__text"
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
                class="arcana-date-picker__icon-btn"
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
 * `<ArcanaDatePicker>` — input de data arcana-styled com calendário do Element Plus.
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
    name: 'ArcanaDatePicker',

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
