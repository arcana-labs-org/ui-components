<template>
    <Teleport to="body">
        <transition name="shadcn-dialog">
            <div
                v-if="visible"
                class="shadcn-dialog-overlay"
                :style="{ zIndex: currentZIndex }"
                @click.self="handleOverlayClick"
            >
                <div
                    class="shadcn-dialog-content"
                    :class="[{ 'shadcn-dialog-content--full-height': fullHeight }, contentClass]"
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="title ? 'shadcn-dialog-title' : undefined"
                    :aria-describedby="description ? 'shadcn-dialog-desc' : undefined"
                    :style="{ maxWidth: resolvedMaxWidth, zIndex: currentZIndex + 1 }"
                >
                    <header v-if="title || $slots.header" class="shadcn-dialog-header">
                        <slot name="header">
                            <h2 id="shadcn-dialog-title" class="shadcn-dialog-title">{{ title }}</h2>
                            <p
                                v-if="description"
                                id="shadcn-dialog-desc"
                                class="shadcn-dialog-description"
                            >{{ description }}</p>
                        </slot>
                        <button
                            v-if="closeable"
                            type="button"
                            class="shadcn-dialog-close"
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
                        class="shadcn-dialog-body"
                        :class="{
                            'shadcn-dialog-body--no-padding': noBodyPadding,
                            'shadcn-dialog-body--no-scroll': !bodyScrollable,
                        }"
                    >
                        <slot />
                    </div>

                    <footer
                        v-if="$slots.footer"
                        class="shadcn-dialog-footer"
                        :class="{ 'shadcn-dialog-footer--flat': flatFooter }"
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
 * Modal shadcn-style com API ref-based e shape consistente com o `ConfirmDialog.vue` global.
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
 * pelo Modal legado, garantindo que ShadcnDialog aberto de dentro de Modal (ou
 * vice-versa) sempre fique POR CIMA do que ja estava aberto.
 */
import { acquireZIndex, releaseZIndex } from '../services/dialog-stack'

const BASE_Z_INDEX = 10000

export default {
    name: 'ShadcnDialog',
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
         * Classe(s) extra aplicada(s) ao `.shadcn-dialog-content`. Como o dialog é teleportado
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
            const root = this.$el?.querySelector?.('.shadcn-dialog-content') as HTMLElement | null
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

<style>
/*
 * Estilos NÃO escopados de propósito — variáveis e tokens espelham o ConfirmDialog.vue. Mantemos
 * paridade visual entre confirms e dialogs maiores. Se ConfirmDialog mudar palette/radius/etc no
 * futuro, mexer aqui também.
 */

/*
 * Z-index dos popovers do Element Plus (el-select, el-tooltip, el-popover,
 * el-picker, el-cascader, el-dropdown) precisa ficar ACIMA de qualquer modal/
 * dialog aberto.
 *
 * --el-index-popper e setada DINAMICAMENTE em runtime por services/dialog-stack.ts:
 * sempre que um modal abre/fecha, a variavel e ajustada pra ficar
 * counter + POPPER_OFFSET (100) acima do z-index do modal mais novo.
 *
 * O 10100 abaixo e so fallback inicial — em runtime, dialog-stack sobrescreve
 * via document.documentElement.style.setProperty(). Garantir o fallback aqui
 * cobre o caso "popover aberto sem nenhum modal ativo" (ex: el-select numa
 * pagina de listagem comum).
 */
:root {
    --el-index-popper: 10100;
}

/*
 * Fallback com !important — usa a CSS variable em vez de hardcoded.
 * Por que e necessario:
 * - Element Plus 2.x usa useZIndex() que LE --el-index-popper, mas alguns
 *   componentes (versoes antigas, custom themes) setam z-index inline sem ler
 *   a variable.
 * Esse !important garante que mesmo esses popovers herdem o valor dinamico —
 * quando dialog-stack atualiza a variavel, todos os popovers ja abertos
 * atualizam instantaneamente.
 */
.el-popper:not(.is-pure),
.el-select__popper,
.el-popover.el-popper,
.el-tooltip__popper,
.el-picker__popper,
.el-cascader__dropdown,
.el-dropdown__popper {
    z-index: var(--el-index-popper) !important;
}

.shadcn-dialog-overlay {
    /*
     * z-index é setado INLINE via :style (currentZIndex), não aqui — permite stacking dinâmico
     * de múltiplos dialogs (ver counter em dialog-stack.ts). Default fica 'auto'
     * pra não interferir caso a regra inline falhe por algum motivo.
     */
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    padding: 16px;
}

.shadcn-dialog-content {
    /* z-index inline via :style (currentZIndex + 1) — ver comentário do .shadcn-dialog-overlay */
    position: relative;
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 12px;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow: hidden;
    font-family: inherit;
}

/*
 * Variante `fullHeight`: força o dialog a ocupar 90vh fixo (em vez de `height: auto` limitado
 * por `max-height: 90vh`). Combina com `size="full"` (90vw) pra um dialog quase-fullscreen.
 *
 * O body herda `flex: 1 1 auto` da regra base e cresce naturalmente entre header+footer (que
 * têm `flex-shrink: 0`). Conteúdo do body (`.email-preview-iframe` etc) que precisa de altura
 * total deve usar `height: 100%` no descendente direto.
 */
.shadcn-dialog-content--full-height {
    height: 90vh;
}

/* Header */
.shadcn-dialog-header {
    position: relative;
    padding: 20px 48px 16px 24px;
    border-bottom: 1px solid #f4f4f5;
    flex-shrink: 0;
}

.shadcn-dialog-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    color: #09090b;
    margin: 0;
    letter-spacing: -0.01em;
}

.shadcn-dialog-description {
    font-size: 13px;
    line-height: 1.5;
    color: #71717a;
    margin: 4px 0 0;
}

.shadcn-dialog-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    color: #71717a;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 150ms ease, color 150ms ease;
}

.shadcn-dialog-close:hover {
    background: #f4f4f5;
    color: #09090b;
}

.shadcn-dialog-close:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 2px;
}

/* Body */
.shadcn-dialog-body {
    padding: 20px 24px;
    overflow-y: auto;
    flex: 1 1 auto;
    /*
     * Crítico: flex items têm `min-height: auto` por default, que impede o body de encolher
     * abaixo do tamanho do conteúdo. Sem isso, conteúdo alto empurra o footer pra fora dos
     * 90vh (clipped pelo overflow:hidden do content), e o scroll vaza pro container externo
     * em vez de rolar internamente. Com min-height:0, o body aceita encolher pro espaço
     * disponível e o overflow-y:auto rola só ele — header e footer ficam fixos.
     */
    min-height: 0;
}

.shadcn-dialog-body--no-padding {
    padding: 0;
}

/*
 * Variante `no-scroll`: body deixa de rolar e vira um flex column. Quem cuida do scroll
 * é o filho direto (que precisa de `flex: 1; min-height: 0; overflow-y: auto;` num descendente).
 * Útil pra wizards com stepper/footer fixos internos.
 */
.shadcn-dialog-body--no-scroll {
    overflow: visible;
    display: flex;
    flex-direction: column;
}

/* Footer */
.shadcn-dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 14px 24px;
    border-top: 1px solid #f4f4f5;
    background: #fafafa;
    flex-shrink: 0;
}

/* Variant `flat`: sem bg cinza, footer "transparente" (vira branco do body) */
.shadcn-dialog-footer--flat {
    background: transparent;
}

/* Animations — espelho do ConfirmDialog */
.shadcn-dialog-enter-active {
    animation: shadcn-dialog-fade-in 200ms ease;
}

.shadcn-dialog-leave-active {
    animation: shadcn-dialog-fade-out 150ms ease;
}

.shadcn-dialog-enter-active .shadcn-dialog-content {
    animation: shadcn-dialog-zoom-in 200ms ease;
}

.shadcn-dialog-leave-active .shadcn-dialog-content {
    animation: shadcn-dialog-zoom-out 150ms ease;
}

@keyframes shadcn-dialog-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes shadcn-dialog-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
}

@keyframes shadcn-dialog-zoom-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes shadcn-dialog-zoom-out {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}
</style>
