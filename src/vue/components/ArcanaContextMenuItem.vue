<template>
    <div v-if="divided" class="arcana-context-menu-item__separator"></div>

    <button
        type="button"
        class="arcana-context-menu-item"
        :class="[
            variant ? `arcana-context-menu-item--${variant}` : null,
            { 'is-disabled': disabled },
        ]"
        :disabled="disabled"
        role="menuitem"
        tabindex="-1"
        @click="handleClick"
    >
        <i v-if="icon" :class="['arcana-context-menu-item__icon', icon]" aria-hidden="true"></i>
        <span class="arcana-context-menu-item__label"><slot/></span>
        <span v-if="suffix || $slots.suffix" class="arcana-context-menu-item__suffix">
            <slot name="suffix">{{ suffix }}</slot>
        </span>
    </button>
</template>

<script lang="ts">
import type { Component } from "vue"
import type { ArcanaContextMenuVariant } from "../../core/context-menu"

/**
 * Item do `<ArcanaContextMenu>`: ícone + label + (opcional) atalho no `suffix`.
 *
 * Espelha o `ArcanaDropdownItem`, com duas diferenças:
 * - `tabindex="-1"`: o painel é quem tem o foco; ↑/↓ movem o foco entre os itens
 *   (roving tabindex do padrão WAI-ARIA de menu).
 * - fecha o menu chamando `close()` do contexto injetado (`arcanaContextMenu`),
 *   em vez do CustomEvent do dropdown.
 *
 * `divided` insere um separador ANTES do item. `closeOnClick` (default true)
 * fecha o menu depois do handler — desligue em itens que expandem algo inline.
 *
 * Emite `click` (MouseEvent cru) e `select` (ativação semântica: também dispara
 * pelo Enter/Espaço, que o painel converte em clique).
 */
export default {
    name: 'ArcanaContextMenuItem',

    props: {
        icon: { type: String, default: '' },
        /** Atalho exibido à direita (ex: "⌘C"). Também aceita o slot `#suffix`. */
        suffix: { type: String, default: '' },
        variant: {
            type: String as () => ArcanaContextMenuVariant,
            default: 'default',
        },
        disabled: { type: Boolean, default: false },
        /** Separador acima deste item. */
        divided: { type: Boolean, default: false },
        closeOnClick: { type: Boolean, default: true },
    },

    // Contexto do `<ArcanaContextMenu>` pai. Default `null` pra permitir uso solto.
    inject: {
        arcanaContextMenu: { default: null },
    },

    emits: ['click', 'select'],

    methods: {
        handleClick(event: MouseEvent) {
            if (this.disabled) return
            this.$emit('click', event)
            this.$emit('select', event)
            if (this.closeOnClick) {
                ((this as any).arcanaContextMenu as { close: () => void } | null)?.close()
            }
        },
    },
} as Component
</script>
