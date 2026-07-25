<template>
    <span class="arcana-hover-card" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
        <span
            ref="triggerRef"
            class="arcana-hover-card__trigger"
            :aria-describedby="isOpen ? panelId : undefined"
            @mouseenter="onTriggerEnter"
            @mouseleave="onTriggerLeave"
            @focusin="onTriggerFocusIn"
            @focusout="onTriggerFocusOut"
        >
            <slot name="trigger" />
        </span>

        <!--
            Cartão teleportado pro <body> (position: fixed via `placeHoverCard`) pra
            escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
        -->
        <Teleport to="body">
            <div
                v-if="isOpen"
                :id="panelId"
                ref="panelRef"
                :class="['arcana-hover-card__panel', `arcana-hover-card__panel--${resolvedSide}`, panelClass]"
                :style="panelStyle"
                role="tooltip"
                @mouseenter="onPanelEnter"
                @mouseleave="onPanelLeave"
                @focusin="onPanelEnter"
                @focusout="onPanelLeave"
            >
                <slot />
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
 * `<ArcanaHoverCard>` — cartão de preview que abre ao passar o mouse pelo gatilho
 * (e ao focá-lo pelo teclado). Irmão "não-modal" do `<ArcanaDropdown>`: nunca
 * rouba o foco, não tem estado de seleção e some sozinho.
 *
 * Estrutura: um gatilho inline (slot `trigger`) + o cartão TELEPORTADO pro
 * `<body>` com `position: fixed`, posicionado por `placeHoverCard`
 * (`core/hover-card`, que estende o `placePanel` usado por Select/TreeSelect)
 * com flip automático quando não cabe do lado pedido.
 *
 * API:
 * - `openDelay` — ms de espera no `mouseenter` antes de abrir (default `300`).
 * - `closeDelay` — ms de **carência** ao sair (default `150`). É essa carência
 *   que permite ir do gatilho ATÉ o cartão sem ele fechar: o `mouseenter` do
 *   painel cancela o timer de fechamento agendado pelo `mouseleave` do gatilho.
 * - `side` — `'top' | 'right' | 'bottom' | 'left'` (default `'bottom'`).
 * - `align` — `'start' | 'center' | 'end'` (default `'center'`).
 * - `placement` — atalho no formato da casa (`'bottom-start'`, `'left-end'`…);
 *   quando informado, vence `side`/`align`.
 * - `offset` — distância entre gatilho e cartão em px (default `8`).
 * - `disabled` — nunca abre (e fecha se estiver aberto).
 * - `panelClass` — classe extra no cartão. Como ele é teleportado pro `<body>`,
 *   um seletor no wrapper não o alcança; é assim que se tematiza uma instância
 *   (mesmo contrato do `panelClass` do `ArcanaTreeSelect`).
 *
 * Slots: `trigger` (o gatilho) e default (o conteúdo do cartão).
 *
 * Emite: `open-change` (`boolean`) a cada transição.
 *
 * Acessibilidade: o gatilho recebe `aria-describedby` apontando pro cartão
 * enquanto ele está aberto, e o cartão é `role="tooltip"` — NÃO recebe foco
 * (é hover, não popover modal) e não prende o teclado. `Escape` fecha. Ponha um
 * elemento naturalmente focável (link/botão) dentro do slot `trigger` pra que a
 * abertura por teclado (`focusin`) funcione.
 *
 * @example
 * <ArcanaHoverCard side="top" align="start">
 *   <template #trigger><a href="/perfil">@arcana</a></template>
 *   <p class="arcana-hover-card__title">Arcana Labs</p>
 *   <p class="arcana-hover-card__text">Design system multi-framework.</p>
 * </ArcanaHoverCard>
 */

/** Tamanho presumido antes da 1ª medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 280, height: 120 }

let panelIdSeq = 0

export default defineComponent({
    name: "ArcanaHoverCard",

    emits: ["open-change"],

    props: {
        /** ms até abrir depois do `mouseenter` (o foco por teclado abre na hora). */
        openDelay: {
            type: Number,
            default: 300,
        },
        /** ms de carência antes de fechar — cobre o trajeto gatilho → cartão. */
        closeDelay: {
            type: Number,
            default: 150,
        },
        side: {
            type: String as PropType<HoverCardSide>,
            default: "bottom",
            validator: (value: string) => ["top", "right", "bottom", "left"].includes(value),
        },
        align: {
            type: String as PropType<HoverCardAlign>,
            default: "center",
            validator: (value: string) => ["start", "center", "end"].includes(value),
        },
        /** Atalho `'{side}-{align}'` (ex: `'bottom-start'`); vence `side`/`align`. */
        placement: {
            type: String as PropType<HoverCardPlacement>,
            default: undefined,
        },
        offset: {
            type: Number,
            default: 8,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /** Classe extra no cartão teleportado (tema por instância). */
        panelClass: {
            type: String,
            default: undefined,
        },
    },

    data() {
        panelIdSeq += 1
        return {
            isOpen: false,
            panelId: `arcana-hover-card-${panelIdSeq}`,
            panelStyle: {} as Record<string, string>,
            resolvedSide: "bottom" as HoverCardSide,
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
        /* ───────────────────────── eventos do gatilho ──────────────────────── */

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

        onTriggerFocusOut(event: FocusEvent) {
            // Foco que caminhou PRA DENTRO do cartão (link no conteúdo) não fecha.
            const next = event.relatedTarget as Node | null
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (next && panel?.contains(next)) return
            this.scheduleClose()
        },

        /* ───────────────────────── eventos do cartão ───────────────────────── */

        /**
         * O ponto que costuma quebrar num hover card: ao sair do gatilho rumo ao
         * cartão, o `mouseleave` do gatilho já agendou o fechamento. O
         * `mouseenter` do cartão (dentro da carência de `closeDelay`) CANCELA
         * esse timer — o cartão fica aberto e navegável.
         */
        onPanelEnter() {
            this.cancelClose()
        },

        onPanelLeave() {
            this.scheduleClose()
        },

        /* ───────────────────────── agendamento ─────────────────────────────── */

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
            if (!this.isOpen || this.closeTimer) return
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

        /* ───────────────────────── abertura / fechamento ───────────────────── */

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

        /* ───────────────────────── posicionamento ──────────────────────────── */

        reposition() {
            const trigger = this.$refs.triggerRef as HTMLElement | undefined
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (!trigger) return

            const place = placeHoverCard(
                trigger.getBoundingClientRect(),
                {
                    width: panel?.offsetWidth || PANEL_ESTIMATE.width,
                    height: panel?.offsetHeight || PANEL_ESTIMATE.height,
                },
                { width: window.innerWidth, height: window.innerHeight },
                { ...this.placementParts, gap: this.offset },
            )

            this.resolvedSide = place.side
            this.panelStyle = {
                position: "fixed",
                left: `${place.left}px`,
                top: `${place.top}px`,
            }
        },

        /* ───────────────────────── listeners globais ───────────────────────── */

        onDocumentKeydown(event: KeyboardEvent) {
            if (event.key === "Escape") this.close()
        },

        onWindowScroll(event: Event) {
            // Rolagem DENTRO do cartão não o fecha nem o desloca.
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (event.target instanceof Node && panel?.contains(event.target)) return
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
