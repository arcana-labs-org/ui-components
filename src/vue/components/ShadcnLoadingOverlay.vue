<template>
    <transition name="shadcn-loading-fade">
        <div v-if="visible" class="shadcn-loading-overlay" role="status" aria-live="polite">
            <div class="shadcn-loading-overlay__box">
                <span class="shadcn-loading-overlay__spinner" aria-hidden="true"></span>
                <span class="shadcn-loading-overlay__text">{{ text }}</span>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ShadcnLoadingOverlay>` — overlay de carregamento (spinner + texto) no padrão shadcn.
 *
 * Cobre o ELEMENTO PAI (precisa ter `position: relative`) com um backdrop branco translúcido
 * + blur, centralizando um spinner e um texto. Use pra feedback de operações assíncronas
 * escopadas a um card/seção/dialog em vez do loading full-screen global.
 *
 * API:
 * - `visible` (boolean) — mostra/esconde (com fade)
 * - `text` — mensagem exibida abaixo do spinner (default `'Carregando…'`)
 */
export default {
    name: "ShadcnLoadingOverlay",

    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: "Carregando…",
        },
    },
} as Component
</script>

<style scoped>
.shadcn-loading-overlay {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(2px);
    border-radius: inherit;
}

.shadcn-loading-overlay__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.shadcn-loading-overlay__spinner {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid #e4e4e7;
    border-top-color: #18181b;
    animation: shadcn-loading-spin 0.7s linear infinite;
}

@keyframes shadcn-loading-spin {
    to { transform: rotate(360deg); }
}

.shadcn-loading-overlay__text {
    font-size: 13px;
    font-weight: 500;
    color: #52525b;
}

.shadcn-loading-fade-enter-active,
.shadcn-loading-fade-leave-active {
    transition: opacity 0.15s ease;
}

.shadcn-loading-fade-enter-from,
.shadcn-loading-fade-leave-to {
    opacity: 0;
}
</style>
