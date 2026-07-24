<template>
    <div
        class="arcana-radio-card-group"
        :class="{
            'arcana-radio-card-group--inline': inline && !columns,
            'arcana-radio-card-group--grid': columns > 0,
            'arcana-radio-card-group--radio-end': radioPosition === 'end',
        }"
        :style="columns > 0 ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined"
        role="radiogroup"
        :aria-label="ariaLabel"
    >
        <label
            v-for="opt in normalizedOptions"
            :key="String(opt.value)"
            class="arcana-radio-card"
            :class="{
                'is-selected': isSelected(opt),
                'is-disabled': isOptionDisabled(opt),
            }"
        >
            <!-- Input radio nativo (escondido visualmente, ainda recebe foco/Tab) -->
            <input
                type="radio"
                class="arcana-radio-card__input"
                :name="groupName"
                :value="opt.value"
                :checked="isSelected(opt)"
                :disabled="isOptionDisabled(opt)"
                @change="onChange(opt)"
            />

            <!-- Radio circle custom (visual) -->
            <span class="arcana-radio-card__radio" aria-hidden="true">
                <span class="arcana-radio-card__dot"></span>
            </span>

            <!-- Ícone opcional (FontAwesome class). `iconBg` e `iconColor` aplicam cor
                 custom no badge esquerdo (inline style sobrescreve a regra `.is-selected`
                 graças à especificidade — cor permanece em ambos os estados). -->
            <span
                v-if="opt.icon"
                class="arcana-radio-card__icon"
                :style="{
                    background: opt.iconBg,
                    color: opt.iconColor,
                    border: opt.iconBorder ? `1px solid ${opt.iconBorder}` : undefined,
                }"
                aria-hidden="true"
            >
                <i :class="opt.icon"></i>
            </span>

            <!-- Conteúdo: label + descrição opcional -->
            <span class="arcana-radio-card__content">
                <span class="arcana-radio-card__label">{{ opt.label }}</span>
                <span
                    v-if="opt.description"
                    class="arcana-radio-card__desc"
                >{{ opt.description }}</span>
            </span>

            <!-- Badge opcional à direita (ex: "Recomendado", "Promo") -->
            <span
                v-if="opt.badge"
                class="arcana-radio-card__badge"
            >{{ opt.badge }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ArcanaRadioCardGroup>` — lista de painéis com radio button, padrão visual shadcn.
 *
 * Mais visual e tátil que um `<select>` quando:
 * - Há poucas opções (2-5)
 * - Cada opção tem diferenças semânticas relevantes pro user (descrição, ícone)
 * - Espaço vertical disponível
 *
 * API:
 * ────
 * - `modelValue` (v-model) — valor selecionado
 * - `options` — `Array<RadioCardOption>` com { label, value, description?, icon?, badge?, disabled? }
 * - `name` (opcional) — `name` HTML do grupo de radios. Default `radio-group-{uid}`.
 * - `ariaLabel` (opcional) — texto de acessibilidade pro `role="radiogroup"`.
 * - `disabled` (opcional, global) — desativa todas as opções.
 *
 * Cada option pode ter:
 * - `label` (obrigatório): título principal
 * - `value` (obrigatório): valor emitido em `update:modelValue`
 * - `description` (opcional): texto secundário abaixo do label
 * - `icon` (opcional): classe FontAwesome (ex: `'fa-solid fa-credit-card'`) — vira badge à esquerda
 * - `badge` (opcional): texto curto à direita (ex: `'Recomendado'`)
 * - `disabled` (opcional): desativa só essa option
 *
 * Exemplo:
 *
 *     <ArcanaRadioCardGroup
 *         v-model="form.payment_method"
 *         :options="[
 *             {
 *                 label: 'Cartão de Crédito',
 *                 value: 'credit_card',
 *                 icon: 'fa-solid fa-credit-card',
 *                 description: 'Cobrança recorrente automática.',
 *             },
 *             {
 *                 label: 'Pix',
 *                 value: 'pix',
 *                 icon: 'fa-solid fa-bolt',
 *             },
 *         ]"
 *         name="payment-method"
 *         aria-label="Método de pagamento"
 *     />
 *
 * Acessibilidade:
 * ───────────────
 * - `role="radiogroup"` no container
 * - `<input type="radio">` nativo (não escondido com display:none — só visualmente
 *   transparente) preserva navegação por Tab/Setas/Space do browser
 * - `:focus-within` no card propaga ring de foco quando o input recebe foco
 */

interface RadioCardOption {
    label: string
    value: string | number | boolean | null
    description?: string
    icon?: string
    badge?: string
    disabled?: boolean
    /** CSS color (qualquer formato) pro fundo do badge do ícone. Opcional. */
    iconBg?: string
    /** CSS color pro próprio ícone. Opcional. */
    iconColor?: string
    /** CSS color pra borda do badge do ícone. Opcional. */
    iconBorder?: string
}

let uidCounter = 0

export default {
    name: 'ArcanaRadioCardGroup',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: [String, Number, Boolean, null] as PropType<any>,
            default: null,
        },
        options: {
            type: Array as PropType<RadioCardOption[]>,
            required: true,
        },
        name: {
            type: String,
            default: '',
        },
        ariaLabel: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Renderiza os cards lado a lado (1 linha, larguras iguais via `flex: 1`) em vez do
         * default em coluna. Útil pra escolhas binárias/curtas onde stack vertical seria
         * desperdício de espaço (ex: Público/Privado, Pessoa Física/Jurídica).
         */
        inline: {
            type: Boolean,
            default: false,
        },
        /**
         * Quando setado (1-N), renderiza os cards em grid com N colunas de larguras iguais.
         * Sobrescreve `inline`. Útil pra listas médias (3-6 opções) onde queremos compactar
         * verticalmente mas preservar legibilidade — ex: padrões de dias da semana.
         */
        columns: {
            type: Number,
            default: 0,
        },
        /**
         * Posição do radio circle dentro do card.
         * - `'start'` (default): radio à esquerda — pattern shadcn original.
         * - `'end'`: radio à direita — útil quando o ícone (esquerda) carrega
         *   forte sinal visual e queremos manter o radio "fora do caminho"
         *   até a interação. Implementado via CSS `order`, sem alteração no DOM.
         */
        radioPosition: {
            type: String as PropType<'start' | 'end'>,
            default: 'start',
            validator: (v: string) => ['start', 'end'].includes(v),
        },
    },

    data() {
        return {
            // Garante name único por instância caso o caller não passe um — evita radios
            // de grupos diferentes interferirem entre si quando coexistem na mesma página.
            uid: ++uidCounter,
        }
    },

    computed: {
        groupName(): string {
            return this.name || `arcana-radio-card-group-${this.uid}`
        },

        normalizedOptions(): RadioCardOption[] {
            return this.options ?? []
        },
    },

    methods: {
        isSelected(opt: RadioCardOption): boolean {
            return opt.value === this.modelValue
        },

        isOptionDisabled(opt: RadioCardOption): boolean {
            return Boolean(this.disabled || opt.disabled)
        },

        onChange(opt: RadioCardOption) {
            if (this.isOptionDisabled(opt)) return
            this.$emit('update:modelValue', opt.value)
            this.$emit('change', opt.value)
        },
    },
} as Component
</script>
