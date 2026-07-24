<template>
    <div class="arcana-dropdown" ref="containerRef">
        <span class="arcana-dropdown__trigger" @click.stop="toggle">
            <slot name="trigger" :open="isOpen" :toggle="toggle"/>
        </span>

        <Teleport to="body">
            <transition name="arcana-dropdown">
                <div
                    v-if="isOpen"
                    class="arcana-dropdown__menu"
                    :class="{ 'arcana-dropdown__menu--comfortable': size === 'comfortable' }"
                    :style="menuStyle"
                    ref="menuRef"
                    role="menu"
                    @click="onMenuClick"
                >
                    <slot :close="close"/>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import type { Component } from "vue"
import { nextTick } from "vue"

/**
 * `<ArcanaDropdown>` — dropdown menu no padrão shadcn (palette zinc, radius 8px,
 * sombra suave, animação fade+slide). Substitui `<el-dropdown>` do Element Plus
 * pra manter a linguagem visual consistente com `ArcanaDialog`/`ArcanaButton`.
 *
 * Como usar:
 * ```vue
 * <ArcanaDropdown placement="bottom-end">
 *     <template #trigger>
 *         <button class="my-btn">⋮</button>
 *     </template>
 *
 *     <ArcanaDropdownItem icon="fa-solid fa-pen" @click="rename">Renomear</ArcanaDropdownItem>
 *     <ArcanaDropdownItem icon="fa-solid fa-trash" variant="danger" @click="del">Deletar</ArcanaDropdownItem>
 * </ArcanaDropdown>
 * ```
 *
 * Decisões:
 * - **Teleport pro body**: evita ser cortado por `overflow:hidden` em
 *   containers ancestrais (problema comum em grids/tables).
 * - **Posicionamento via JS**: `getBoundingClientRect` + position fixed. Ajusta
 *   automaticamente quando estouraria a viewport (flip pra cima OU shift
 *   horizontal pra direita/esquerda).
 * - **Close on**: click fora, ESC, ou click em `ArcanaDropdownItem` (item
 *   dispatcha `arcana-dropdown-close` que sobe via bubble e o menu fecha).
 * - **Não há focus trap**: dropdown é navegação rápida, focus trap atrapalha.
 *   ESC funciona pra cancelar.
 */
export default {
    name: 'ArcanaDropdown',

    props: {
        /**
         * Onde posicionar o menu relativo ao trigger.
         * - `bottom-end` (default): abaixo, alinhado pela direita do trigger
         * - `bottom-start`: abaixo, alinhado pela esquerda
         * - `top-end` / `top-start`: acima (raramente usado — flip automático cuida disso)
         */
        placement: {
            type: String as () => 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start',
            default: 'bottom-end',
        },
        offset: { type: Number, default: 4 },
        disabled: { type: Boolean, default: false },
        /**
         * Densidade do menu. Propagada pros `ArcanaDropdownItem` filhos via
         * provide/inject (funciona através do Teleport — segue a árvore de
         * componentes, não o DOM).
         * - `default`: padding compacto (item 7×10, menu 4)
         * - `comfortable`: padding folgado (item 10×14, menu 6, min-width maior)
         */
        size: {
            type: String as () => 'default' | 'comfortable',
            default: 'default',
        },
    },

    // Filhos leem isto via inject('shadcnDropdownSize'). Prop estática — não
    // muda em runtime —, então a forma de função (avaliada uma vez) basta.
    provide() {
        return { shadcnDropdownSize: this.size }
    },

    emits: ['open', 'close'],

    data() {
        return {
            isOpen: false,
            menuStyle: {} as Record<string, string>,
        }
    },

    methods: {
        async toggle() {
            if (this.disabled) return
            this.isOpen ? this.close() : await this.open()
        },

        async open() {
            this.isOpen = true
            this.$emit('open')
            await nextTick()
            this.positionMenu()
            document.addEventListener('click', this.handleOutsideClick, true)
            document.addEventListener('keydown', this.handleKeydown)
            window.addEventListener('resize', this.positionMenu)
            window.addEventListener('scroll', this.positionMenu, true)
        },

        close() {
            if (!this.isOpen) return
            this.isOpen = false
            this.$emit('close')
            document.removeEventListener('click', this.handleOutsideClick, true)
            document.removeEventListener('keydown', this.handleKeydown)
            window.removeEventListener('resize', this.positionMenu)
            window.removeEventListener('scroll', this.positionMenu, true)
        },

        positionMenu() {
            const container = this.$refs.containerRef as HTMLElement
            const menu = this.$refs.menuRef as HTMLElement
            if (!container || !menu) return

            const triggerRect = container.getBoundingClientRect()
            const menuRect = menu.getBoundingClientRect()
            const vw = window.innerWidth
            const vh = window.innerHeight
            const margin = 8

            const wantsTop = this.placement.startsWith('top')
            const wantsEnd = this.placement.endsWith('end')

            // Vertical: prefere a direção pedida; faz flip se estouraria viewport
            let top: number
            if (wantsTop) {
                top = triggerRect.top - menuRect.height - this.offset
                if (top < margin) {
                    top = triggerRect.bottom + this.offset // flip pra baixo
                }
            } else {
                top = triggerRect.bottom + this.offset
                if (top + menuRect.height > vh - margin) {
                    top = triggerRect.top - menuRect.height - this.offset // flip pra cima
                }
            }

            // Horizontal: alinha pela direita (end) ou esquerda (start) do trigger;
            // shifta pra dentro se estouraria viewport
            let left = wantsEnd
                ? triggerRect.right - menuRect.width
                : triggerRect.left
            if (left < margin) left = margin
            if (left + menuRect.width > vw - margin) left = vw - menuRect.width - margin

            this.menuStyle = { top: `${top}px`, left: `${left}px` }
        },

        handleOutsideClick(e: MouseEvent) {
            const container = this.$refs.containerRef as HTMLElement
            const menu = this.$refs.menuRef as HTMLElement | undefined
            if (!container) return
            const target = e.target as Node
            if (container.contains(target)) return
            if (menu?.contains(target)) return
            this.close()
        },

        handleKeydown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                e.stopPropagation()
                this.close()
            }
        },

        onMenuClick(e: MouseEvent) {
            // Item disparou close-on-click via CustomEvent; bubbling chega aqui.
            // O CustomEvent foi escutado direto no menu via root listener abaixo.
            // Mantemos esse handler vazio só pra interceptar clicks que NÃO
            // venham de items (ex: gap entre items): não fechamos nesse caso.
            void e
        },
    },

    mounted() {
        // Listener pra evento customizado emitido por ArcanaDropdownItem ao
        // ser clicado (com closeOnClick=true). Bubble passa pelo menu (que
        // está no body via Teleport) — captura via document.
        const closeOnItem = (e: Event) => {
            const menu = this.$refs.menuRef as HTMLElement | undefined
            if (menu && menu.contains(e.target as Node)) {
                this.close()
            }
        }
        ;(this as any)._closeOnItem = closeOnItem
        document.addEventListener('arcana-dropdown-close', closeOnItem)
    },

    unmounted() {
        this.close()
        if ((this as any)._closeOnItem) {
            document.removeEventListener('arcana-dropdown-close', (this as any)._closeOnItem)
        }
    },
} as Component
</script>
