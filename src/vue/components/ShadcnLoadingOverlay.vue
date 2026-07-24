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
