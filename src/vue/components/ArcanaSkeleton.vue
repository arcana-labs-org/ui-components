<template>
    <span
        class="arcana-skeleton"
        :class="rootClasses"
        :style="rootStyles"
        :aria-hidden="true"
    />
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ArcanaSkeleton>` — placeholder visual com shimmer animation pra estados de loading.
 *
 * Padrão shadcn UI: bloco cinza zinc-100/200 com gradiente animado horizontal que
 * simula "carregamento". Ideal pra mostrar enquanto dados ainda estão sendo buscados,
 * substituindo placeholders falsos (ex: "Plano #N", "R$ 0,00") que causam flickering
 * quando os dados reais chegam e re-renderizam.
 *
 * Uso típico:
 *
 *     <!-- Block fixo (avatar, ícone) -->
 *     <ArcanaSkeleton width="40px" height="40px" rounded="full" />
 *
 *     <!-- Linhas de texto -->
 *     <ArcanaSkeleton width="200px" height="14px" />
 *     <ArcanaSkeleton width="60%" height="12px" />
 *
 *     <!-- Block customizado via class (Tailwind ou CSS próprio) -->
 *     <ArcanaSkeleton class="h-8 w-full" />
 *
 * Props:
 * - `width` / `height` — qualquer valor CSS válido (px, %, rem, etc)
 * - `rounded` — `'sm' | 'md' | 'lg' | 'full' | 'none'` (default `'md'`)
 *
 * Acessibilidade:
 * - `aria-hidden="true"` (skeleton é visual-only, screen readers ignoram)
 * - O caller deve fornecer um `<span aria-live="polite">Carregando…</span>` ou
 *   similar pra anunciar o estado de loading pra screen readers.
 */

type SkeletonRounded = 'sm' | 'md' | 'lg' | 'full' | 'none'

export default {
    name: 'ArcanaSkeleton',

    props: {
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '14px',
        },
        rounded: {
            type: String as PropType<SkeletonRounded>,
            default: 'md',
            validator: (v: string) => ['sm', 'md', 'lg', 'full', 'none'].includes(v),
        },
    },

    computed: {
        rootClasses(): string {
            return `arcana-skeleton--rounded-${this.rounded}`
        },
        rootStyles(): Record<string, string> {
            return {
                width: this.width,
                height: this.height,
            }
        },
    },
} as Component
</script>
