<template>
    <div
        class="shadcn-radio-card-group"
        :class="{
            'shadcn-radio-card-group--inline': inline && !columns,
            'shadcn-radio-card-group--grid': columns > 0,
            'shadcn-radio-card-group--radio-end': radioPosition === 'end',
        }"
        :style="columns > 0 ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined"
        role="radiogroup"
        :aria-label="ariaLabel"
    >
        <label
            v-for="opt in normalizedOptions"
            :key="String(opt.value)"
            class="shadcn-radio-card"
            :class="{
                'is-selected': isSelected(opt),
                'is-disabled': isOptionDisabled(opt),
            }"
        >
            <!-- Input radio nativo (escondido visualmente, ainda recebe foco/Tab) -->
            <input
                type="radio"
                class="shadcn-radio-card__input"
                :name="groupName"
                :value="opt.value"
                :checked="isSelected(opt)"
                :disabled="isOptionDisabled(opt)"
                @change="onChange(opt)"
            />

            <!-- Radio circle custom (visual) -->
            <span class="shadcn-radio-card__radio" aria-hidden="true">
                <span class="shadcn-radio-card__dot"></span>
            </span>

            <!-- Ícone opcional (FontAwesome class). `iconBg` e `iconColor` aplicam cor
                 custom no badge esquerdo (inline style sobrescreve a regra `.is-selected`
                 graças à especificidade — cor permanece em ambos os estados). -->
            <span
                v-if="opt.icon"
                class="shadcn-radio-card__icon"
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
            <span class="shadcn-radio-card__content">
                <span class="shadcn-radio-card__label">{{ opt.label }}</span>
                <span
                    v-if="opt.description"
                    class="shadcn-radio-card__desc"
                >{{ opt.description }}</span>
            </span>

            <!-- Badge opcional à direita (ex: "Recomendado", "Promo") -->
            <span
                v-if="opt.badge"
                class="shadcn-radio-card__badge"
            >{{ opt.badge }}</span>
        </label>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnRadioCardGroup>` — lista de painéis com radio button, padrão visual shadcn.
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
 *     <ShadcnRadioCardGroup
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
    name: 'ShadcnRadioCardGroup',

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
            return this.name || `shadcn-radio-card-group-${this.uid}`
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

<style scoped lang="scss">
.shadcn-radio-card-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* Inline: 1 linha, cards de larguras iguais (flex: 1) */
.shadcn-radio-card-group--inline {
    flex-direction: row;
    flex-wrap: wrap;
}

/* Grid: N colunas iguais (controlado por gridTemplateColumns inline via :style) */
.shadcn-radio-card-group--grid {
    display: grid;
    gap: 8px;
}

.shadcn-radio-card-group--inline > .shadcn-radio-card {
    flex: 1 1 0;
    min-width: 0;
}

@media (max-width: 480px) {
    /* Em mobile estreito, volta pra coluna pra evitar text-overflow severo */
    .shadcn-radio-card-group--inline {
        flex-direction: column;
    }
}

/* ─────────────────────────────────────────────────────────
   Card individual (cada option)
   ───────────────────────────────────────────────────────── */
.shadcn-radio-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    border: 1px solid #e4e4e7;
    border-radius: 8px;
    background: #ffffff;
    cursor: pointer;
    transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
    position: relative;
    margin: 0;                       /* override default <label> margin */
    font-family: inherit;

    &:hover:not(.is-disabled):not(.is-selected) {
        border-color: #d4d4d8;
        background: #fafafa;
    }

    /*
     * Estado selecionado: borda preta + bg muted + box-shadow inset 1px pra
     * reforçar visualmente sem "dobrar" a borda externa (o inset preenche
     * a borda existente, deixando o card destacado sem deslocar layout).
     */
    &.is-selected {
        border-color: #18181b;
        background: #fafafa;
        box-shadow: 0 0 0 1px #18181b inset;
    }

    &.is-disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

}

/* ─────────────────────────────────────────────────────────
   Input radio nativo — escondido VISUALMENTE mas continua
   focável (Tab/Setas/Space funcionam normalmente).
   ───────────────────────────────────────────────────────── */
.shadcn-radio-card__input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 1px;
    height: 1px;
}

/* ─────────────────────────────────────────────────────────
   Radio circle custom (substitui o visual nativo)
   ───────────────────────────────────────────────────────── */
.shadcn-radio-card__radio {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border: 1.5px solid #d4d4d8;
    border-radius: 9999px;
    background: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: border-color 150ms ease;
}

.shadcn-radio-card.is-selected .shadcn-radio-card__radio {
    border-color: #18181b;
}

/* Dot interno (animado com scale 0→1) */
.shadcn-radio-card__dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: #18181b;
    transform: scale(0);
    transition: transform 150ms ease;
}

.shadcn-radio-card.is-selected .shadcn-radio-card__dot {
    transform: scale(1);
}

/* ─────────────────────────────────────────────────────────
   Ícone (badge à esquerda) — opcional
   ───────────────────────────────────────────────────────── */
.shadcn-radio-card__icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #f4f4f5;
    color: #18181b;
    border-radius: 8px;
    font-size: 15px;
    transition: background-color 150ms ease, color 150ms ease;

    > i {
        line-height: 1;
    }
}

.shadcn-radio-card.is-selected .shadcn-radio-card__icon {
    background: #18181b;
    color: #ffffff;
}

/* ─────────────────────────────────────────────────────────
   Conteúdo (label + descrição)
   ───────────────────────────────────────────────────────── */
.shadcn-radio-card__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 auto;
    min-width: 0;
}

.shadcn-radio-card__label {
    font-size: 13.5px;
    font-weight: 600;
    color: #09090b;
    line-height: 1.3;
    letter-spacing: -0.005em;
}

.shadcn-radio-card__desc {
    font-size: 12px;
    color: #71717a;
    line-height: 1.45;
}

/* ─────────────────────────────────────────────────────────
   Badge à direita (opcional — ex: "Recomendado", "Promo")
   ───────────────────────────────────────────────────────── */
.shadcn-radio-card__badge {
    flex-shrink: 0;
    align-self: flex-start;
    font-size: 10.5px;
    font-weight: 600;
    color: #18181b;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 9999px;
    padding: 3px 8px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1;
}

.shadcn-radio-card.is-selected .shadcn-radio-card__badge {
    border-color: #18181b;
    background: #18181b;
    color: #ffffff;
}

/* ─────────────────────────────────────────────────────────
   radioPosition='end': empurra o radio circle pra direita
   sem alterar o DOM. CSS `order` reordena visualmente os
   filhos do .shadcn-radio-card (que é flex).
   ───────────────────────────────────────────────────────── */
.shadcn-radio-card-group--radio-end .shadcn-radio-card__radio {
    order: 1;
}
</style>
