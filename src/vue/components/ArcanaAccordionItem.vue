<template>
    <div class="arcana-accordion-item" :class="{ open: isOpen, disabled }">
        <button
            type="button"
            class="arcana-accordion-trigger"
            :disabled="disabled"
            :aria-expanded="isOpen ? 'true' : 'false'"
            :aria-controls="panelId"
            @click="onToggle"
        >
            <span class="arcana-accordion-title">
                <slot name="title">{{ title }}</slot>
            </span>
            <i class="fa-solid fa-chevron-down arcana-accordion-chevron"></i>
        </button>
        <!--
            Modo estático: `display: none` via `:style` (equivale ao `v-show` antigo — o
            conteúdo fica montado e preserva estado). Modo animado: o binding fica `undefined`
            de propósito, porque quem escreve `display`/`height`/`opacity` é o `core/collapse`.
        -->
        <div
            ref="content"
            :id="panelId"
            role="region"
            class="arcana-accordion-content"
            :class="{ 'arcana-accordion-content--animated': isAnimated }"
            :style="contentStyle"
        >
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

/** Sequência para os ids de painel — ver `panelId` no `data()`. */
let panelUid = 0
import { animateCollapse, applyCollapsedState } from "../../core/collapse"

/**
 * `<ArcanaAccordionItem>` — item colapsável do `<ArcanaAccordion>`.
 *
 * Props:
 * - `name` (obrigatório) — chave do item no `modelValue` do accordion
 * - `title` — texto do trigger (ou use o slot `#title`)
 * - `disabled` — desabilita o trigger
 * - `animated` — opcional. Quando **não** informada, herda o `animated` do
 *   `<ArcanaAccordion>` (default `false`); quando informada, tem **precedência**
 *   sobre a do container. `true` = transição de altura (0 → altura real medida)
 *   + fade, ~200ms; `false` = abre/fecha instantâneo.
 *
 * A animação é imperativa (`core/collapse.ts`): `height: auto` não anima, então o
 * conteúdo é medido e a altura em px é escrita inline; a transição em si está no CSS
 * (`.arcana-accordion-content--animated`). Com `prefers-reduced-motion: reduce` a
 * animação é ignorada e o estado final é aplicado direto.
 */
export default defineComponent({
    name: "ArcanaAccordionItem",
    inject: ["accordionApi"],
    props: {
        name: { type: String, required: true },
        title: { type: String, default: "" },
        disabled: { type: Boolean, default: false },
        /** `undefined` = herda do `<ArcanaAccordion>`; informado = tem precedência. */
        animated: { type: Boolean, default: undefined },
    },
    computed: {
        isOpen(): boolean {
            return (this as any).accordionApi.isOpen(this.name)
        },
        isAnimated(): boolean {
            if (this.animated !== undefined && this.animated !== null) return this.animated
            const fromParent = (this as any).accordionApi?.animated
            return typeof fromParent === "function" ? Boolean(fromParent()) : Boolean(fromParent)
        },
        contentStyle(): Record<string, string> | undefined {
            if (this.isAnimated) return undefined
            return this.isOpen ? undefined : { display: "none" }
        },
    },
    watch: {
        isOpen: {
            // `post`: espera o DOM do item (classe `open`, conteúdo do slot) atualizar
            // antes de medir a altura real.
            flush: "post",
            handler(open: boolean) {
                const el = this.$refs.content as HTMLElement | undefined
                if (!el || !this.isAnimated) return
                this.cancelAnimation?.()
                this.cancelAnimation = animateCollapse(el, open)
            },
        },
        isAnimated: {
            flush: "post",
            handler() {
                const el = this.$refs.content as HTMLElement | undefined
                if (!el) return
                this.cancelAnimation?.()
                this.cancelAnimation = null
                if (this.isAnimated) applyCollapsedState(el, this.isOpen)
            },
        },
    },
    mounted() {
        const el = this.$refs.content as HTMLElement | undefined
        if (el && this.isAnimated) applyCollapsedState(el, this.isOpen)
    },
    beforeUnmount() {
        this.cancelAnimation?.()
        this.cancelAnimation = null
    },
    data() {
        return {
            cancelAnimation: null as (() => void) | null,
            // Id só para amarrar `aria-controls` do gatilho ao painel. Contador de
            // módulo em vez de random: a saída fica estável entre renders, e a lib
            // é client-only (não há hidratação de SSR para divergir).
            panelId: `arcana-accordion-panel-${++panelUid}`,
        }
    },
    methods: {
        onToggle() {
            if (this.disabled) return
            ;(this as any).accordionApi.toggle(this.name)
        },
    },
})
</script>
