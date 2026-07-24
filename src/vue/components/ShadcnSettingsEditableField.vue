<template>
    <ShadcnSettingsListItem :label="label" :caption="caption" :disabled="disabled" :nested="nested">
        <template v-if="$slots.label" #label>
            <slot name="label" />
        </template>

        <span :class="valueClasses">{{ displayValue }}</span>
        <button
            class="shadcn-settings-list__edit-btn"
            type="button"
            :disabled="disabled"
            @click="openModal"
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
            Alterar
        </button>

        <!--
            Modal teleportado pro <body> via `<ShadcnDialog>`. Renderizado fora do
            `<ShadcnSettingsListItem>` no DOM real, mas declarado aqui pra acoplar
            a lógica de edição com o display.
        -->
        <Teleport to="body">
            <ShadcnEditFieldModal
                ref="modal"
                :title="resolvedModalTitle"
                :description="modalDescription"
                @save="onSave"
            >
                <FormGroup md="12" :label="resolvedInputLabel">
                    <ShadcnInput
                        v-if="type === 'text'"
                        v-model="bufferValue"
                        :placeholder="inputPlaceholder"
                    />
                    <InputCurrency
                        v-else-if="type === 'currency'"
                        v-model="bufferValue"
                    />
                    <ShadcnInput
                        v-else-if="type === 'number'"
                        v-model="bufferValue"
                        type="number"
                        :min="min"
                        :max="max"
                        :placeholder="inputPlaceholder"
                    />
                    <ShadcnSelect
                        v-else-if="type === 'select'"
                        v-model="bufferValue"
                        :options="options"
                    />
                </FormGroup>
            </ShadcnEditFieldModal>
        </Teleport>
    </ShadcnSettingsListItem>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import ShadcnSettingsListItem from "./ShadcnSettingsListItem.vue"
import ShadcnEditFieldModal from "./ShadcnEditFieldModal.vue"
import ShadcnInput from "./ShadcnInput.vue"
import ShadcnSelect from "./ShadcnSelect.vue"
// EXTERNAL DEPENDENCIES: InputCurrency + CurrencyFormatter live outside ui/ —
// copy them (or replace InputCurrency usage) when porting this folder to another project.
import InputCurrency from "./InputCurrency.vue"
import { CurrencyFormatter } from "../../core/currency"

interface SelectOption {
    label: string
    value: string | number | boolean | null
}

/**
 * `<ShadcnSettingsEditableField>` — item smart de `<ShadcnSettingsList>` que combina
 * display read-only do valor + botão "Alterar" + modal de edição num único componente.
 *
 * Em vez de declarar 3 elementos separados pra cada campo editável (item +
 * `current-value` + `<ShadcnEditFieldModal>` com input específico), esse wrapper
 * reduz a uma única tag:
 *
 *     <ShadcnSettingsEditableField
 *         label="Desconto Primeira Compra"
 *         caption="Valor unitário aplicado..."
 *         type="currency"
 *         v-model="parameters.first_order_discount"
 *         @save="autoSave"
 *     />
 *
 * Suporta 4 tipos de input:
 * - `'text'` — `<ShadcnInput>` com placeholder opcional
 * - `'currency'` — `<InputCurrency>` v-money3 (preserva visual atual da lib; trocar por
 *   shadcn-style currency exigiria reimplementação da máscara monetária)
 * - `'number'` — `<ShadcnInput type="number">` com min/max
 * - `'select'` — `<ShadcnSelect>` com `:options`
 *
 * Estratégia de buffer:
 * O `modelValue` recebido é COPIADO pra `bufferValue` quando o modal abre. Edições
 * no modal mexem no buffer; cancelar fecha sem persistir; salvar emite tanto
 * `update:modelValue` (com o buffer) quanto `save` (mesmo valor pra trigger de
 * autosave no parent). Sem buffer, edições e cancelamento mexeriam no parent direto.
 *
 * Display:
 * - Texto/select: usa `displayFormatter` opcional, ou label da option (select), ou
 *   string crua do valor. Vazio (null/undefined/"") mostra `emptyText` em italic muted.
 * - Currency: formata via `CurrencyFormatter.format` (R$ 1.234,56) automaticamente.
 * - Number: string crua (caller passa `displayFormatter` se quiser formatação tipo
 *   "5 dias").
 */
export default {
    name: 'ShadcnSettingsEditableField',

    components: {
        ShadcnSettingsListItem,
        ShadcnEditFieldModal,
        ShadcnInput,
        ShadcnSelect,
        InputCurrency,
    },

    props: {
        modelValue: {
            type: [String, Number, Boolean, null] as PropType<any>,
            default: null,
        },
        label: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            default: '',
        },
        type: {
            type: String as PropType<'text' | 'currency' | 'number' | 'select'>,
            default: 'text',
            validator: (v: string) => ['text', 'currency', 'number', 'select'].includes(v),
        },
        options: {
            type: Array as PropType<SelectOption[]>,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Repassa pro `<ShadcnSettingsListItem>` interno — aplica indent + bg muted
         * + marcador `╲╱` quando este campo é subordinado a um item principal acima
         * (ex: "Tempo Médio" como sub-config de um tipo de entrega ativo).
         */
        nested: {
            type: Boolean,
            default: false,
        },
        /**
         * Função opcional pra formatar o display. Recebe o `modelValue` cru e retorna
         * a string que aparece ao lado do botão Alterar. Útil pra agregar unidade
         * ("5 dias", "R$ 1,50/un").
         */
        displayFormatter: {
            type: Function as PropType<(value: any) => string>,
            default: null,
        },
        modalTitle: {
            type: String,
            default: '',
        },
        modalDescription: {
            type: String,
            default: '',
        },
        inputLabel: {
            type: String,
            default: '',
        },
        inputPlaceholder: {
            type: String,
            default: '',
        },
        min: {
            type: [Number, String],
            default: undefined,
        },
        max: {
            type: [Number, String],
            default: undefined,
        },
        emptyText: {
            type: String,
            default: 'Não definido',
        },
    },

    emits: ['update:modelValue', 'save'],

    data() {
        return {
            bufferValue: null as any,
        }
    },

    computed: {
        isEmpty(): boolean {
            const v = this.modelValue
            return v === null || v === undefined || v === ''
        },
        displayValue(): string {
            if (this.isEmpty) return this.emptyText
            if (this.displayFormatter) return this.displayFormatter(this.modelValue)
            if (this.type === 'currency') return CurrencyFormatter.format(this.modelValue)
            if (this.type === 'select') {
                const opt = this.options.find((o) => o.value === this.modelValue)
                return opt?.label ?? String(this.modelValue)
            }
            return String(this.modelValue)
        },
        valueClasses(): string {
            const classes = ['shadcn-settings-list__current-value']
            if (this.isEmpty) classes.push('shadcn-settings-list__current-value--empty')
            return classes.join(' ')
        },
        resolvedModalTitle(): string {
            return this.modalTitle || `Alterar ${this.label}`
        },
        resolvedInputLabel(): string {
            return this.inputLabel || this.label
        },
    },

    methods: {
        openModal() {
            // Snapshot do modelValue pro buffer — edições no modal não tocam no parent
            // até o user clicar em Salvar. Cancelar simplesmente descarta o buffer.
            this.bufferValue = this.modelValue
            ;(this.$refs.modal as any)?.show?.()
        },
        onSave() {
            this.$emit('update:modelValue', this.bufferValue)
            this.$emit('save', this.bufferValue)
            ;(this.$refs.modal as any)?.hide?.()
        },
    },
} as Component
</script>
