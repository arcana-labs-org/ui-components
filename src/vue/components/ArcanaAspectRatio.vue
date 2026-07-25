<template>
    <div class="arcana-aspect-ratio" :style="rootStyle">
        <div class="arcana-aspect-ratio__content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

/**
 * `<ArcanaAspectRatio>` — mantém a proporção do conteúdo (imagem, vídeo, iframe,
 * mapa, placeholder…) independentemente da largura disponível.
 *
 * Implementação SEM JavaScript: a razão vira o custom property inline
 * `--arcana-aspect-ratio` e quem faz o trabalho é a propriedade `aspect-ratio`
 * do CSS (a lib mira browsers modernos — nada de padding-hack, nada de
 * `ResizeObserver`). O conteúdo do slot é envolvido por
 * `.arcana-aspect-ratio__content`, que preenche 100% da caixa; mídia direta
 * (`img`/`video`/`iframe`/`canvas`/`svg`) recebe `object-fit: cover` (ajustável
 * por `--arcana-aspect-ratio-fit`).
 *
 * API:
 * - `ratio` — número (largura ÷ altura). Default `16 / 9`. Ex: `1` (quadrado),
 *   `4 / 3`, `3 / 4` (retrato). Valores não-finitos ou ≤ 0 caem no default.
 *
 * Custom properties: `--arcana-aspect-ratio-radius` (arredondamento),
 * `--arcana-aspect-ratio-background` (fundo enquanto a mídia carrega) e
 * `--arcana-aspect-ratio-fit` (`cover` por padrão).
 *
 * @example
 * <ArcanaAspectRatio :ratio="16 / 9">
 *   <img src="/capa.jpg" alt="Capa" />
 * </ArcanaAspectRatio>
 */
const DEFAULT_RATIO = 16 / 9

export default defineComponent({
    name: "ArcanaAspectRatio",

    props: {
        /** Largura ÷ altura. Default `16 / 9`; valores inválidos caem no default. */
        ratio: {
            type: Number,
            default: DEFAULT_RATIO,
        },
    },

    computed: {
        /** Blinda contra `0`, negativos e `NaN` (que quebrariam o layout inteiro). */
        safeRatio(): number {
            const value = Number(this.ratio)
            return Number.isFinite(value) && value > 0 ? value : DEFAULT_RATIO
        },

        rootStyle(): Record<string, string> {
            return { "--arcana-aspect-ratio": String(this.safeRatio) }
        },
    },
})
</script>
