<template>
    <div v-if="divided" class="shadcn-dropdown-item__separator"></div>

    <button
        type="button"
        class="shadcn-dropdown-item"
        :class="[
            variant ? `shadcn-dropdown-item--${variant}` : null,
            effectiveSize === 'comfortable' ? 'shadcn-dropdown-item--comfortable' : null,
            { 'is-disabled': disabled },
        ]"
        :disabled="disabled"
        role="menuitem"
        @click="handleClick"
    >
        <i v-if="icon" :class="['shadcn-dropdown-item__icon', icon]" :style="iconColor ? { color: iconColor } : null" aria-hidden="true"></i>
        <span class="shadcn-dropdown-item__label"><slot/></span>
        <span v-if="$slots.suffix" class="shadcn-dropdown-item__suffix"><slot name="suffix"/></span>
    </button>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * Item do `<ShadcnDropdown>`. Apresenta ícone + label + (opcional) suffix.
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
 * um CustomEvent `shadcn-dropdown-close` que o parent escuta pra fechar.
 * Setar false pra items que mostram sub-menu ou expandem alguma seção
 * interna sem fechar o dropdown.
 */
export default {
    name: 'ShadcnDropdownItem',

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
         * Densidade do item. Normalmente herdada do `<ShadcnDropdown size>` via
         * inject; passar aqui sobrescreve só este item.
         */
        size: {
            type: String as () => 'default' | 'comfortable' | null,
            default: null,
        },
    },

    // Herda a densidade do ShadcnDropdown pai (provide). Default 'default'
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

            // CustomEvent bubbla pro <document> onde o ShadcnDropdown ouve e fecha.
            // Evita acoplamento via provide/inject — funciona mesmo com Teleport
            // (que quebra a hierarquia DOM mas mantém parent-child Vue).
            if (this.closeOnClick) {
                e.target?.dispatchEvent?.(new CustomEvent('shadcn-dropdown-close', { bubbles: true }))
            }
        },
    },
} as Component
</script>
