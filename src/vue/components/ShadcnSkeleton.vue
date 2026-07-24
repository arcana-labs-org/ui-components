<template>
    <span
        class="shadcn-skeleton"
        :class="rootClasses"
        :style="rootStyles"
        :aria-hidden="true"
    />
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnSkeleton>` — placeholder visual com shimmer animation pra estados de loading.
 *
 * Padrão shadcn UI: bloco cinza zinc-100/200 com gradiente animado horizontal que
 * simula "carregamento". Ideal pra mostrar enquanto dados ainda estão sendo buscados,
 * substituindo placeholders falsos (ex: "Plano #N", "R$ 0,00") que causam flickering
 * quando os dados reais chegam e re-renderizam.
 *
 * Uso típico:
 *
 *     <!-- Block fixo (avatar, ícone) -->
 *     <ShadcnSkeleton width="40px" height="40px" rounded="full" />
 *
 *     <!-- Linhas de texto -->
 *     <ShadcnSkeleton width="200px" height="14px" />
 *     <ShadcnSkeleton width="60%" height="12px" />
 *
 *     <!-- Block customizado via class (Tailwind ou CSS próprio) -->
 *     <ShadcnSkeleton class="h-8 w-full" />
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
    name: 'ShadcnSkeleton',

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
            return `shadcn-skeleton--rounded-${this.rounded}`
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

<style scoped>
.shadcn-skeleton {
    display: inline-block;
    background: #f4f4f5;
    /*
     * Shimmer animation — gradiente que move horizontalmente. Opacidade variando 1→0.6→1
     * suaviza a transição, evita parecer "piscando". Duration 1.6s é o sweet spot:
     * rápido o bastante pra dar feedback (de que algo está acontecendo), lento o
     * bastante pra não cansar visualmente.
     */
    background-image: linear-gradient(
        90deg,
        rgba(244, 244, 245, 0) 0%,
        rgba(228, 228, 231, 0.6) 50%,
        rgba(244, 244, 245, 0) 100%
    );
    background-repeat: no-repeat;
    background-size: 200% 100%;
    animation: shadcn-skeleton-shimmer 1.6s ease-in-out infinite;
    will-change: background-position;
}

/* Rounded variants */
.shadcn-skeleton--rounded-none { border-radius: 0; }
.shadcn-skeleton--rounded-sm   { border-radius: 4px; }
.shadcn-skeleton--rounded-md   { border-radius: 6px; }
.shadcn-skeleton--rounded-lg   { border-radius: 10px; }
.shadcn-skeleton--rounded-full { border-radius: 9999px; }

@keyframes shadcn-skeleton-shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/*
 * Pra usuários que preferem reduzir motion (configuração de SO), desativa a animação
 * mas mantém o bg sólido — ainda comunica "loading" via cor.
 */
@media (prefers-reduced-motion: reduce) {
    .shadcn-skeleton {
        animation: none;
        background-image: none;
        background: #e4e4e7;
    }
}
</style>
