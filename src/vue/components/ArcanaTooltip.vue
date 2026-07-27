<template>
    <span class="arcana-tooltip" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
        <span
            ref="triggerRef"
            class="arcana-tooltip__trigger"
            :aria-describedby="isOpen ? panelId : undefined"
            @mouseenter="onTriggerEnter"
            @mouseleave="onTriggerLeave"
            @focusin="onTriggerFocusIn"
            @focusout="onTriggerFocusOut"
        >
            <slot name="trigger" />
        </span>

        <!--
            Balão teleportado pro <body> (position: fixed via `placeHoverCard`) pra
            escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
            `pointer-events: none` (no CSS) — nunca é alvo do mouse.
        -->
        <Teleport to="body">
            <div
                v-if="isOpen"
                :id="panelId"
                ref="panelRef"
                :class="['arcana-tooltip__panel', `arcana-tooltip__panel--${resolvedSide}`, panelClass]"
                :style="panelStyle"
                role="tooltip"
            >
                <slot>{{ label }}</slot>
                <span v-if="arrow" class="arcana-tooltip__arrow" aria-hidden="true"></span>
            </div>
        </Teleport>
    </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import { placeHoverCard, resolveHoverCardPlacement } from "../../core/hover-card"
import type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "../../core/hover-card"

/**
 * `<ArcanaTooltip>` — balão de texto curto que abre ao passar o mouse pelo gatilho
 * (e ao focá-lo pelo teclado). Versão enxuta e opinativa do `<ArcanaHoverCard>`:
 * conteúdo textual, balão escuro com setinha, e nunca interativo.
 *
 * Estrutura: gatilho inline (slot `trigger`) + balão TELEPORTADO pro `<body>` com
 * `position: fixed`, posicionado por `placeHoverCard` (`core/hover-card`) com flip
 * automático quando não cabe do lado pedido.
 *
 * API:
 * - `label` — texto do tooltip. Use o slot default pra conteúdo custom (o slot vence).
 * - `side` — `'top' | 'right' | 'bottom' | 'left'` (default `'top'`).
 * - `align` — `'start' | 'center' | 'end'` (default `'center'`).
 * - `placement` — atalho `'{side}-{align}'` (ex: `'top-start'`); vence `side`/`align`.
 * - `offset` — distância entre gatilho e balão em px (default `6`).
 * - `openDelay` — ms até abrir no `mouseenter` (default `200`; foco por teclado abre na hora).
 * - `closeDelay` — ms de carência antes de fechar (default `0`).
 * - `arrow` — mostra a setinha apontando pro gatilho (default `true`).
 * - `disabled` — nunca abre (e fecha se estiver aberto).
 * - `panelClass` — classe extra no balão teleportado (tema por instância).
 *
 * Slots: `trigger` (o gatilho) e default (o conteúdo — sobrepõe `label`).
 * Emite: `open-change` (`boolean`) a cada transição.
 *
 * Acessibilidade: o gatilho recebe `aria-describedby` apontando pro balão enquanto
 * aberto, e o balão é `role="tooltip"`. `Escape` fecha. Ponha um elemento naturalmente
 * focável (botão/link) dentro do slot `trigger` pra que a abertura por teclado funcione.
 *
 * @example
 * <ArcanaTooltip label="Salvar rascunho" side="top">
 *   <template #trigger><button aria-label="Salvar"><i class="icon-save" /></button></template>
 * </ArcanaTooltip>
 */

/** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 160, height: 32 }
/** Folga mínima entre a seta e o canto do balão. */
const ARROW_EDGE = 10

let panelIdSeq = 0

export default defineComponent({
    name: "ArcanaTooltip",

    emits: ["open-change"],

    props: {
        label: {
            type: String,
            default: "",
        },
        openDelay: {
            type: Number,
            default: 200,
        },
        closeDelay: {
            type: Number,
            default: 0,
        },
        side: {
            type: String as PropType<HoverCardSide>,
            default: "top",
            validator: (value: string) => ["top", "right", "bottom", "left"].includes(value),
        },
        align: {
            type: String as PropType<HoverCardAlign>,
            default: "center",
            validator: (value: string) => ["start", "center", "end"].includes(value),
        },
        /** Atalho `'{side}-{align}'` (ex: `'top-start'`); vence `side`/`align`. */
        placement: {
            type: String as PropType<HoverCardPlacement>,
            default: undefined,
        },
        offset: {
            type: Number,
            default: 6,
        },
        arrow: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /** Classe extra no balão teleportado (tema por instância). */
        panelClass: {
            type: String,
            default: undefined,
        },
    },

    data() {
        panelIdSeq += 1
        return {
            isOpen: false,
            panelId: `arcana-tooltip-${panelIdSeq}`,
            panelStyle: {} as Record<string, string>,
            resolvedSide: "top" as HoverCardSide,
            openTimer: undefined as ReturnType<typeof setTimeout> | undefined,
            closeTimer: undefined as ReturnType<typeof setTimeout> | undefined,
        }
    },

    computed: {
        /** `placement` (atalho) vence `side`/`align` soltos. */
        placementParts(): { side: HoverCardSide; align: HoverCardAlign } {
            return resolveHoverCardPlacement(this.placement, this.side, this.align)
        },
    },

    watch: {
        disabled(value: boolean) {
            if (value) this.close()
        },
    },

    beforeUnmount() {
        this.clearTimers()
        this.detach()
    },

    methods: {
        onTriggerEnter() {
            this.scheduleOpen(this.openDelay)
        },

        onTriggerLeave() {
            this.scheduleClose()
        },

        onTriggerFocusIn() {
            // Teclado não tem "trajeto do mouse": abrir com atraso só atrapalharia.
            this.scheduleOpen(0)
        },

        onTriggerFocusOut() {
            this.scheduleClose()
        },

        scheduleOpen(delay: number) {
            this.cancelClose()
            if (this.disabled || this.isOpen) return
            if (this.openTimer) clearTimeout(this.openTimer)
            if (delay <= 0) {
                void this.open()
                return
            }
            this.openTimer = setTimeout(() => {
                this.openTimer = undefined
                void this.open()
            }, delay)
        },

        scheduleClose() {
            if (this.openTimer) {
                clearTimeout(this.openTimer)
                this.openTimer = undefined
            }
            if (!this.isOpen) return
            if (this.closeDelay <= 0) {
                this.close()
                return
            }
            if (this.closeTimer) return
            this.closeTimer = setTimeout(() => {
                this.closeTimer = undefined
                this.close()
            }, this.closeDelay)
        },

        cancelClose() {
            if (!this.closeTimer) return
            clearTimeout(this.closeTimer)
            this.closeTimer = undefined
        },

        clearTimers() {
            if (this.openTimer) clearTimeout(this.openTimer)
            if (this.closeTimer) clearTimeout(this.closeTimer)
            this.openTimer = undefined
            this.closeTimer = undefined
        },

        async open() {
            if (this.disabled || this.isOpen) return
            this.isOpen = true
            this.$emit("open-change", true)
            await this.$nextTick()
            this.reposition()
            this.attach()
        },

        close() {
            if (!this.isOpen) return
            this.clearTimers()
            this.isOpen = false
            this.detach()
            this.$emit("open-change", false)
        },

        reposition() {
            const trigger = this.$refs.triggerRef as HTMLElement | undefined
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (!trigger) return

            const rect = trigger.getBoundingClientRect()
            const panelWidth = panel?.offsetWidth || PANEL_ESTIMATE.width
            const panelHeight = panel?.offsetHeight || PANEL_ESTIMATE.height

            const place = placeHoverCard(
                rect,
                { width: panelWidth, height: panelHeight },
                { width: window.innerWidth, height: window.innerHeight },
                { ...this.placementParts, gap: this.offset },
            )

            this.resolvedSide = place.side
            this.panelStyle = {
                position: "fixed",
                left: `${place.left}px`,
                top: `${place.top}px`,
                "--arcana-tooltip-arrow-offset": this.arrowOffset(place, rect, panelWidth, panelHeight),
            }
        },

        /**
         * Posição da seta ao longo da borda do balão, apontando pro centro do
         * gatilho. Nos lados verticais (top/bottom) é um X; nos horizontais, um Y.
         * Preso (clamp) pra não escapar do balão.
         */
        arrowOffset(
            place: { left: number; top: number; side: HoverCardSide },
            rect: DOMRect,
            panelWidth: number,
            panelHeight: number,
        ): string {
            const vertical = place.side === "top" || place.side === "bottom"
            if (vertical) {
                const center = rect.left + rect.width / 2 - place.left
                return `${this.clampArrow(center, panelWidth)}px`
            }
            const center = rect.top + rect.height / 2 - place.top
            return `${this.clampArrow(center, panelHeight)}px`
        },

        clampArrow(value: number, size: number): number {
            return Math.max(ARROW_EDGE, Math.min(value, size - ARROW_EDGE))
        },

        onDocumentKeydown(event: KeyboardEvent) {
            if (event.key === "Escape") this.close()
        },

        onWindowScroll() {
            this.reposition()
        },

        onWindowResize() {
            this.reposition()
        },

        attach() {
            document.addEventListener("keydown", this.onDocumentKeydown)
            window.addEventListener("scroll", this.onWindowScroll, true)
            window.addEventListener("resize", this.onWindowResize)
        },

        detach() {
            document.removeEventListener("keydown", this.onDocumentKeydown)
            window.removeEventListener("scroll", this.onWindowScroll, true)
            window.removeEventListener("resize", this.onWindowResize)
        },
    },
})
</script>
