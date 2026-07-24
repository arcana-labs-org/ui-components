<template>
    <div v-if="divided" class="arcana-dropdown-item__separator"></div>

    <button
        type="button"
        class="arcana-dropdown-item"
        :class="[
            variant ? `arcana-dropdown-item--${variant}` : null,
            effectiveSize === 'comfortable' ? 'arcana-dropdown-item--comfortable' : null,
            { 'is-disabled': disabled },
        ]"
        :disabled="disabled"
        role="menuitem"
        @click="handleClick"
    >
        <i v-if="icon" :class="['arcana-dropdown-item__icon', icon]" :style="iconColor ? { color: iconColor } : null" aria-hidden="true"></i>
        <span class="arcana-dropdown-item__label"><slot/></span>
        <span v-if="$slots.suffix" class="arcana-dropdown-item__suffix"><slot name="suffix"/></span>
    </button>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * Item do `<ArcanaDropdown>`. Apresenta ícone + label + (opcional) suffix.
 *
 * Variants:
 * - default — texto neutro (#18181b)
 * - danger  — texto vermelho, hover bg rosa (#fef2f2). Use pra deletar.
 * - success — texto verde, hover bg verde claro. Use pra confirmar/salvar.
 *
 * `divided`: insere uma linha separadora ANTES deste item (útil pra agrupar
 * "deletar" longe das ações benignas). Espelha o `divided` do el-dropdown.
 *
 * `closeOnClick` (default true): após o handler do `@click` rodar, dispara
 * um CustomEvent `arcana-dropdown-close` que o parent escuta pra fechar.
 * Setar false pra items que mostram sub-menu ou expandem alguma seção
 * interna sem fechar o dropdown.
 */
export default {
    name: 'ArcanaDropdownItem',

    props: {
        icon: String,
        /** Cor custom só do ícone (ex: "#16a34a"). Não afeta o texto nem o hover.
         *  Pra colorir o item inteiro, use `variant`. */
        iconColor: { type: String, default: '' },
        variant: {
            type: String as () => 'default' | 'danger' | 'success' | 'warning',
            default: 'default',
        },
        disabled: { type: Boolean, default: false },
        divided: { type: Boolean, default: false },
        closeOnClick: { type: Boolean, default: true },
        /**
         * Densidade do item. Normalmente herdada do `<ArcanaDropdown size>` via
         * inject; passar aqui sobrescreve só este item.
         */
        size: {
            type: String as () => 'default' | 'comfortable' | null,
            default: null,
        },
    },

    // Herda a densidade do ArcanaDropdown pai (provide). Default 'default'
    // quando usado fora de um dropdown com size definido.
    inject: {
        shadcnDropdownSize: { default: 'default' },
    },

    emits: ['click'],

    computed: {
        // Prop local `size` tem prioridade sobre o valor herdado por inject.
        effectiveSize(): string {
            return this.size ?? (this as any).shadcnDropdownSize
        },
    },

    methods: {
        handleClick(e: MouseEvent) {
            if (this.disabled) return
            this.$emit('click', e)

            // CustomEvent bubbla pro <document> onde o ArcanaDropdown ouve e fecha.
            // Evita acoplamento via provide/inject — funciona mesmo com Teleport
            // (que quebra a hierarquia DOM mas mantém parent-child Vue).
            if (this.closeOnClick) {
                e.target?.dispatchEvent?.(new CustomEvent('arcana-dropdown-close', { bubbles: true }))
            }
        },
    },
} as Component
</script>
