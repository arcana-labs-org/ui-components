<template>
    <div
        class="arcana-context-menu"
        ref="rootRef"
        tabindex="-1"
        @contextmenu="onContextMenu"
    >
        <slot name="trigger" :open="isOpen" :close="close"/>

        <Teleport to="body">
            <div
                v-if="isOpen"
                ref="panelRef"
                class="arcana-context-menu__panel"
                :class="panelClass"
                :style="panelStyle"
                role="menu"
                :aria-label="ariaLabel || undefined"
                tabindex="-1"
                @keydown="onPanelKeydown"
                @contextmenu.prevent.stop
            >
                <slot :close="close">
                    <ArcanaContextMenuItem
                        v-for="(item, index) in items"
                        :key="index"
                        :icon="item.icon"
                        :suffix="item.suffix"
                        :variant="item.variant || 'default'"
                        :disabled="item.disabled === true"
                        :divided="item.divided === true"
                        :close-on-click="item.closeOnClick !== false"
                        @select="$emit('select', item, index)"
                    >{{ item.label }}</ArcanaContextMenuItem>
                </slot>
            </div>
        </Teleport>
    </div>
</template>

<script lang="ts">
import type { Component } from "vue"
import { nextTick } from "vue"
import ArcanaContextMenuItem from "./ArcanaContextMenuItem.vue"
import {
    CONTEXT_MENU_PANEL_ESTIMATE,
    handleContextMenuKey,
    placeAtPointer,
    registerOpenContextMenu,
    unregisterOpenContextMenu,
    type ArcanaContextMenuItemSpec,
} from "../../core/context-menu"

/**
 * `<ArcanaContextMenu>` — menu de contexto (botão direito). Na prática é um
 * `<ArcanaDropdown>` acionado por `contextmenu`: mesma arquitetura de painel
 * teleportado pro `<body>`, mesma coordenação pai↔item por provide/inject.
 *
 * A ÚNICA diferença estrutural: o painel não é ancorado no gatilho, e sim nas
 * COORDENADAS DO CURSOR. O `placeAtPointer` (core/context-menu) trata o ponto
 * clicado como uma âncora de largura zero e delega ao `placePanel` o flip/shift
 * que impede o menu de sair da viewport.
 *
 * ```vue
 * <ArcanaContextMenu aria-label="Ações do arquivo">
 *     <template #trigger>
 *         <div class="file-card">relatorio.pdf</div>
 *     </template>
 *
 *     <ArcanaContextMenuItem icon="fa-solid fa-copy" suffix="⌘C" @select="copy">Copiar</ArcanaContextMenuItem>
 *     <ArcanaContextMenuItem icon="fa-solid fa-trash" variant="danger" divided @select="del">Excluir</ArcanaContextMenuItem>
 * </ArcanaContextMenu>
 * ```
 *
 * Modo data-driven (sem slot default): passe `:items="[{ label, icon, suffix, … }]"`
 * e escute `@select="(item, index) => …"`.
 *
 * Fecha em: clique fora, Escape (devolve o foco ao gatilho), scroll externo,
 * resize, seleção de item e abertura de OUTRO menu de contexto (registro global
 * em `core/context-menu`, compartilhado com os ports React/Svelte/Angular).
 */
export default {
    name: 'ArcanaContextMenu',

    components: { ArcanaContextMenuItem },

    props: {
        /** Não abre o menu — deixa o menu nativo do navegador aparecer. */
        disabled: { type: Boolean, default: false },
        /** Classe extra no painel teleportado (a lib usa isso pra tematizar portais). */
        panelClass: { type: String, default: '' },
        /** Rótulo acessível do `role="menu"`. */
        ariaLabel: { type: String, default: '' },
        /** Modo data-driven — ignorado quando o slot default é usado. */
        items: {
            type: Array as () => ArcanaContextMenuItemSpec[],
            default: () => [],
        },
    },

    // Os itens leem isto via inject('arcanaContextMenu'). Chave string (não um
    // símbolo importado do próprio pai) pra evitar import circular pai↔item.
    provide() {
        return {
            arcanaContextMenu: {
                close: () => (this as any).close(),
            },
        }
    },

    emits: ['open', 'close', 'select'],

    data() {
        return {
            isOpen: false,
            // Nasce fora da tela: o painel precisa existir pra ser medido, e assim
            // não pisca no canto superior esquerdo antes do posicionamento real.
            panelStyle: { position: 'fixed', left: '-9999px', top: '-9999px' } as Record<string, string>,
            point: { x: 0, y: 0 },
        }
    },

    methods: {
        async onContextMenu(event: MouseEvent) {
            if (this.disabled) return
            // Menus aninhados: só o gatilho mais interno responde.
            event.preventDefault()
            event.stopPropagation()
            await this.openAt(event.clientX, event.clientY)
        },

        async openAt(x: number, y: number) {
            if (this.disabled) return
            this.point = { x, y }

            const wasOpen = this.isOpen
            if (!wasOpen) {
                this.isOpen = true
                this.$emit('open')
                registerOpenContextMenu(this.closeFromRegistry)
                document.addEventListener('mousedown', this.onOutsidePointerDown, true)
                document.addEventListener('keydown', this.onDocumentKeydown, true)
                window.addEventListener('resize', this.close)
                window.addEventListener('scroll', this.onScroll, true)
            }

            await nextTick()
            this.position()
            ;(this.$refs.panelRef as HTMLElement | undefined)?.focus()
        },

        close() {
            if (!this.isOpen) return
            this.isOpen = false
            this.$emit('close')
            unregisterOpenContextMenu(this.closeFromRegistry)
            document.removeEventListener('mousedown', this.onOutsidePointerDown, true)
            document.removeEventListener('keydown', this.onDocumentKeydown, true)
            window.removeEventListener('resize', this.close)
            window.removeEventListener('scroll', this.onScroll, true)
        },

        /** Fechamento pedido por OUTRO menu de contexto que abriu. */
        closeFromRegistry() {
            this.close()
        },

        closeAndRestoreFocus() {
            const root = this.$refs.rootRef as HTMLElement | undefined
            this.close()
            root?.focus()
        },

        position() {
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (!panel) return

            const place = placeAtPointer(
                this.point,
                {
                    width: panel.offsetWidth || CONTEXT_MENU_PANEL_ESTIMATE.width,
                    height: panel.offsetHeight || CONTEXT_MENU_PANEL_ESTIMATE.height,
                },
                { width: window.innerWidth, height: window.innerHeight },
            )

            this.panelStyle = {
                position: 'fixed',
                left: `${place.left}px`,
                top: `${place.top}px`,
            }
        },

        onOutsidePointerDown(event: MouseEvent) {
            const panel = this.$refs.panelRef as HTMLElement | undefined
            const root = this.$refs.rootRef as HTMLElement | undefined
            const target = event.target as Node
            // Dentro do gatilho: um novo botão direito só reposiciona (onContextMenu).
            if (root?.contains(target)) return
            if (panel?.contains(target)) return
            this.close()
        },

        onDocumentKeydown(event: KeyboardEvent) {
            if (event.key !== 'Escape') return
            event.stopPropagation()
            this.closeAndRestoreFocus()
        },

        onPanelKeydown(event: KeyboardEvent) {
            const result = handleContextMenuKey(event, this.$refs.panelRef as HTMLElement | undefined)
            if (result === 'close') {
                event.preventDefault()
                event.stopPropagation()
                this.closeAndRestoreFocus()
            }
        },

        onScroll(event: Event) {
            const panel = this.$refs.panelRef as HTMLElement | undefined
            // Scroll DENTRO do painel (menu longo) não fecha.
            if (panel && event.target instanceof Node && panel.contains(event.target)) return
            this.close()
        },
    },

    unmounted() {
        this.close()
    },
} as Component
</script>
