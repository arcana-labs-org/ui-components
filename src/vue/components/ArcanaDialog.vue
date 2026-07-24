<template>
    <Teleport to="body">
        <transition name="arcana-dialog">
            <div
                v-if="visible"
                class="arcana-dialog-overlay"
                :style="{ zIndex: currentZIndex }"
                @click.self="handleOverlayClick"
            >
                <div
                    class="arcana-dialog-content"
                    :class="[{ 'arcana-dialog-content--full-height': fullHeight }, contentClass]"
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="title ? 'arcana-dialog-title' : undefined"
                    :aria-describedby="description ? 'arcana-dialog-desc' : undefined"
                    :style="{ maxWidth: resolvedMaxWidth, zIndex: currentZIndex + 1 }"
                >
                    <header v-if="title || $slots.header" class="arcana-dialog-header">
                        <slot name="header">
                            <h2 id="arcana-dialog-title" class="arcana-dialog-title">{{ title }}</h2>
                            <p
                                v-if="description"
                                id="arcana-dialog-desc"
                                class="arcana-dialog-description"
                            >{{ description }}</p>
                        </slot>
                        <button
                            v-if="closeable"
                            type="button"
                            class="arcana-dialog-close"
                            aria-label="Fechar"
                            @click="hide"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </header>

                    <div
                        class="arcana-dialog-body"
                        :class="{
                            'arcana-dialog-body--no-padding': noBodyPadding,
                            'arcana-dialog-body--no-scroll': !bodyScrollable,
                        }"
                    >
                        <slot />
                    </div>

                    <footer
                        v-if="$slots.footer"
                        class="arcana-dialog-footer"
                        :class="{ 'arcana-dialog-footer--flat': flatFooter }"
                    >
                        <slot name="footer" :hide="hide" />
                    </footer>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * Modal arcana-style com API ref-based e shape consistente com o `ConfirmDialog.vue` global.
 *
 * Por que existe:
 * - O `Modal.vue` legado do projeto tem estética antiga (Bootstrap modal-header bg-slate). O
 *   `ConfirmDialog.vue` JÁ tem visual shadcn polido (radius 12, palette neutra, focus ring,
 *   animação fade+zoom) — esse componente extrai esses estilos pra um modal de uso geral
 *   reutilizável (`SubscriptionWizardModal` é o primeiro caller).
 * - Mantém compatibilidade com a API ref-based dos outros modais do projeto: `this.$refs.dialog
 *   .show()` / `hide()`. Sem v-model.
 *
 * Comportamentos prontos:
 * - Click no overlay fecha (configurável via `:close-on-overlay-click`)
 * - Escape fecha (configurável via `:close-on-escape`)
 * - Focus trap leve: foca o primeiro elemento focável ao abrir
 * - Animação fade + zoom 0.95→1 (mesma do ConfirmDialog)
 * - Body scrollable com `max-height: 70vh` por default
 *
 * Slots:
 * - `default`: corpo do dialog (sem padding pro caller controlar)
 * - `header`: substitui o título padrão (caso queira algo custom)
 * - `footer`: rodapé (opcional). Se ausente, dialog fica sem barra de rodapé.
 *   Recebe `{ hide }` no scope pra facilitar fechar via slot.
 *
 * Props principais:
 * - `title` / `description`: texto do header padrão. Se `header` slot for usado, ignorados.
 * - `size`: presets `'sm' | 'md' | 'lg' | 'xl' | 'full'` ou número (px). Default 'md' (580px).
 *   `'full'` = 90vw (largura quase total da viewport).
 * - `fullHeight`: quando `true`, força altura de 90vh — útil pra dialogs com conteúdo rico tipo
 *   preview de email/HTML. Sem isso, o dialog cresce conforme o conteúdo até o `max-height: 90vh`.
 * - `closeable`: mostra X no header. Default true.
 * - `noBodyPadding`: remove padding interno do body (caller controla espaçamento). Default false.
 */
/**
 * Z-index dinamico pra empilhamento correto de modais aninhados.
 * Usa o stack compartilhado (`@/services/dialog-stack`) — o mesmo counter e usado
 * pelo Modal legado, garantindo que ArcanaDialog aberto de dentro de Modal (ou
 * vice-versa) sempre fique POR CIMA do que ja estava aberto.
 */
import { acquireZIndex, releaseZIndex } from '../services/dialog-stack'

const BASE_Z_INDEX = 10000

export default {
    name: 'ArcanaDialog',
    props: {
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        size: {
            type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | 'full' | number>,
            default: 'md',
        },
        /**
         * Força o dialog a ocupar 90% da altura da viewport (90vh) em vez de crescer conforme o
         * conteúdo. Útil pra dialogs com conteúdo extenso/scrollável (preview de email/HTML,
         * editores de código, listas longas) onde o admin precisa de espaço vertical fixo.
         *
         * Sem essa prop, o dialog usa `height: auto` limitado por `max-height: 90vh` — adequado
         * pra formulários e wizards comuns.
         */
        fullHeight: {
            type: Boolean,
            default: false,
        },
        closeable: {
            type: Boolean,
            default: true,
        },
        /**
         * Classe(s) extra aplicada(s) ao `.arcana-dialog-content`. Como o dialog é teleportado
         * pro body, estilos scoped do caller não alcançam o content — passe uma classe e defina
         * o CSS num `<style>` NÃO escopado. Útil pra overrides pontuais de tamanho/layout
         * (ex: dialog quase-fullscreen a 95vw/95vh) sem mudar os presets compartilhados.
         */
        contentClass: {
            type: String,
            default: '',
        },
        closeOnOverlayClick: {
            type: Boolean,
            default: false,
        },
        closeOnEscape: {
            type: Boolean,
            default: true,
        },
        noBodyPadding: {
            type: Boolean,
            default: false,
        },
        /**
         * Quando `true` (default), o body tem `overflow-y: auto` — todo o conteúdo do dialog rola
         * por aqui. Setar `false` faz o body virar um flex column SEM scroll próprio, delegando
         * a rolagem pro conteúdo (útil quando o conteúdo tem header/footer fixos internos, tipo
         * `WizardShell` com stepper no topo + botões Voltar/Continuar embaixo — a gente quer que
         * só a seção do meio role, não tudo).
         */
        bodyScrollable: {
            type: Boolean,
            default: true,
        },
        /**
         * Quando `true`, o footer fica sem bg cinza (`#fafafa`) — útil pra dialogs onde o
         * footer é só um par de botões sem necessidade de "barra" visual separada do body.
         * O `border-top` ainda separa visualmente.
         */
        flatFooter: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['show', 'hide'],
    data() {
        return {
            visible: false,
            // Z-index dinâmico atribuído na hora do `show()` — garante stacking correto
            // quando múltiplos dialogs estão abertos simultaneamente (overlay = currentZIndex,
            // content = currentZIndex + 1).
            currentZIndex: BASE_Z_INDEX,
            // Mapa de presets → max-width. Match com o que o ConfirmDialog usa (470px) + tamanhos
            // úteis pra wizards/forms.
            sizePresets: {
                sm: '470px',
                md: '580px',
                lg: '720px',
                xl: '880px',
                full: '90vw',
            } as Record<string, string>,
        }
    },
    computed: {
        resolvedMaxWidth(): string {
            if (typeof this.size === 'number') {
                return `${this.size}px`
            }
            return this.sizePresets[this.size as string] ?? this.sizePresets.md
        },
    },
    methods: {
        show() {
            // Pega o proximo nivel do stack compartilhado (overlay = N, content = N + 1).
            // Garante que esse dialog fique POR CIMA de qualquer modal/dialog ja aberto,
            // inclusive Modal legado.
            this.currentZIndex = acquireZIndex()

            this.visible = true
            this.$emit('show')
            this.$nextTick(() => this.focusFirstElement())
        },
        hide() {
            if (!this.visible) return
            this.visible = false
            releaseZIndex()

            this.$emit('hide')
        },
        handleOverlayClick() {
            if (this.closeOnOverlayClick) {
                this.hide()
            }
        },
        handleKeydown(e: KeyboardEvent) {
            if (!this.visible) return
            if (e.key === 'Escape' && this.closeOnEscape) {
                e.preventDefault()
                this.hide()
            }
        },
        focusFirstElement() {
            const root = this.$el?.querySelector?.('.arcana-dialog-content') as HTMLElement | null
            if (!root) return
            // Foca primeiro elemento interativo. Ordem natural prioriza inputs > buttons. Se nada
            // for focável, foca o próprio dialog (assistive tech ainda lê o título).
            const focusable = root.querySelector<HTMLElement>(
                'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
            ;(focusable ?? root).focus?.()
        },
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeydown)
    },
    unmounted() {
        document.removeEventListener('keydown', this.handleKeydown)
    },
} as Component
</script>
