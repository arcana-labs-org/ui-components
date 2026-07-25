<template>
    <div class="arcana-scroll-area" :class="rootClasses" :style="rootStyle">
        <div ref="viewportRef" class="arcana-scroll-area__viewport" :style="viewportStyle" :tabindex="tabbable ? 0 : undefined">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both"
export type ScrollAreaType = "auto" | "always" | "hover"

/**
 * `<ArcanaScrollArea>` — área rolável com barra de rolagem estilizada.
 *
 * A rolagem é **NATIVA**: o componente só pinta a barra (`::-webkit-scrollbar`
 * no Chrome/Safari/Edge + `scrollbar-width`/`scrollbar-color` no Firefox) e
 * limita a altura/largura do viewport. NÃO reimplementamos scroll em JS
 * (translate no conteúdo + polegar sintético) de propósito: assim o teclado
 * (setas, PageUp/PageDown, Home/End, Space), o touch com inércia, o
 * scroll anchoring, o `scrollIntoView` e os leitores de tela continuam
 * funcionando de graça — é o modo mais acessível e o que menos quebra.
 *
 * API:
 * - `orientation` — `'vertical'` (default) | `'horizontal'` | `'both'`: quais
 *   eixos podem rolar (o outro fica `overflow: hidden`).
 * - `height` / `maxHeight` — `number` (px) ou string CSS (`'40vh'`), aplicados
 *   ao viewport. Sem nenhum dos dois, a altura vem do contexto (ex: um flex pai).
 * - `scrollbarSize` — espessura da barra em px (default `10`). Vira
 *   `--arcana-scroll-area-size` (WebKit; no Firefox a espessura é `thin`).
 * - `type` — `'auto'` (default): barra nativa, aparece quando há transbordo;
 *   `'always'`: `overflow: scroll`, calha sempre reservada; `'hover'`: polegar
 *   transparente em repouso, pintado no hover/foco (auto-ocultar).
 * - `hideDelay` — atraso em ms do auto-ocultar no `type="hover"` (default `500`).
 *   Vira `--arcana-scroll-area-hide-delay` (transition-delay do polegar).
 * - `tabbable` — força/desliga o `tabindex="0"` do viewport (default: ligado, pra
 *   que a região role por teclado mesmo sem nenhum foco interno).
 *
 * Custom properties: `--arcana-scroll-area-thumb`, `--arcana-scroll-area-thumb-hover`,
 * `--arcana-scroll-area-track`, `--arcana-scroll-area-radius`.
 *
 * @example
 * <ArcanaScrollArea :max-height="240" type="hover">
 *   <p v-for="linha in linhas" :key="linha">{{ linha }}</p>
 * </ArcanaScrollArea>
 */
export default defineComponent({
    name: "ArcanaScrollArea",

    props: {
        orientation: {
            type: String as PropType<ScrollAreaOrientation>,
            default: "vertical",
            validator: (value: string) => ["vertical", "horizontal", "both"].includes(value),
        },
        /** Altura fixa do viewport. `number` = px; string = valor CSS cru. */
        height: {
            type: [Number, String] as PropType<number | string | null>,
            default: null,
        },
        /** Altura máxima do viewport. `number` = px; string = valor CSS cru. */
        maxHeight: {
            type: [Number, String] as PropType<number | string | null>,
            default: null,
        },
        /** Espessura da barra em px (WebKit). Default `10`. */
        scrollbarSize: {
            type: Number,
            default: 10,
        },
        type: {
            type: String as PropType<ScrollAreaType>,
            default: "auto",
            validator: (value: string) => ["auto", "always", "hover"].includes(value),
        },
        /** Atraso do auto-ocultar (ms) — só tem efeito com `type="hover"`. */
        hideDelay: {
            type: Number,
            default: 500,
        },
        /** `tabindex="0"` no viewport pra rolar por teclado sem foco interno. */
        tabbable: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        rootClasses(): string[] {
            return [`arcana-scroll-area--${this.orientation}`, `arcana-scroll-area--type-${this.type}`]
        },

        rootStyle(): Record<string, string> {
            return {
                "--arcana-scroll-area-size": `${this.scrollbarSize}px`,
                "--arcana-scroll-area-hide-delay": `${this.hideDelay}ms`,
            }
        },

        viewportStyle(): Record<string, string> {
            const style: Record<string, string> = {}
            const height = toCssLength(this.height)
            const maxHeight = toCssLength(this.maxHeight)
            if (height) style.height = height
            if (maxHeight) style.maxHeight = maxHeight
            return style
        },
    },

    methods: {
        /** Elemento que realmente rola — útil pra `scrollTo`/`scrollTop` do caller. */
        viewport(): HTMLElement | undefined {
            return this.$refs.viewportRef as HTMLElement | undefined
        },
    },
})

/** `number` vira px; string passa crua; `null`/`''` some. */
function toCssLength(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === "") return ""
    return typeof value === "number" ? `${value}px` : String(value)
}
</script>
