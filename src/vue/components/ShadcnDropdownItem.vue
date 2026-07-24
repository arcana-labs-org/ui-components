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

<style scoped lang="scss">
.shadcn-dropdown-item {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 9px;
    padding: 7px 10px;
    background: transparent;
    border: none;
    border-radius: 5px;
    color: #18181b;
    font-family: inherit;
    font-size: 13px;
    line-height: 1.3;
    text-align: left;
    cursor: pointer;
    transition: background 0.10s, color 0.10s;
}
.shadcn-dropdown-item:hover:not(.is-disabled),
.shadcn-dropdown-item:focus-visible:not(.is-disabled) {
    background: #f4f4f5;
    outline: none;
}

/* Densidade folgada (size="comfortable"): herdada do <ShadcnDropdown size>. */
.shadcn-dropdown-item--comfortable {
    gap: 11px;
    padding: 10px 14px;
}
.shadcn-dropdown-item.is-disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.shadcn-dropdown-item__icon {
    font-size: 11px;
    color: #71717a;
    width: 14px;
    text-align: center;
    flex-shrink: 0;
}

.shadcn-dropdown-item__label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.shadcn-dropdown-item__suffix {
    color: #a1a1aa;
    font-size: 11.5px;
    font-family: 'JetBrains Mono', 'SF Mono', monospace;
    flex-shrink: 0;
}

/* DANGER */
.shadcn-dropdown-item--danger { color: #b91c1c; }
.shadcn-dropdown-item--danger:hover:not(.is-disabled),
.shadcn-dropdown-item--danger:focus-visible:not(.is-disabled) {
    background: #fef2f2;
    color: #991b1b;
}
.shadcn-dropdown-item--danger .shadcn-dropdown-item__icon { color: #dc2626; }

/* SUCCESS */
.shadcn-dropdown-item--success { color: #15803d; }
.shadcn-dropdown-item--success:hover:not(.is-disabled) { background: #f0fdf4; }
.shadcn-dropdown-item--success .shadcn-dropdown-item__icon { color: #16a34a; }

/* WARNING */
.shadcn-dropdown-item--warning { color: #b45309; }
.shadcn-dropdown-item--warning:hover:not(.is-disabled) { background: #fffbeb; }
.shadcn-dropdown-item--warning .shadcn-dropdown-item__icon { color: #d97706; }

.shadcn-dropdown-item__separator {
    height: 1px;
    background: #f4f4f5;
    margin: 4px 6px;
}
</style>
