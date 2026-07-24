<template>
    <transition name="arcana-loading-fade">
        <div v-if="visible" class="arcana-loading-overlay" role="status" aria-live="polite">
            <div class="arcana-loading-overlay__box">
                <span class="arcana-loading-overlay__spinner" aria-hidden="true"></span>
                <span class="arcana-loading-overlay__text">{{ text }}</span>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ArcanaLoadingOverlay>` — overlay de carregamento (spinner + texto) no padrão shadcn.
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
    name: "ArcanaLoadingOverlay",

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
