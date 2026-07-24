<template>
    <div class="shadcn-notice" :class="rootClasses" role="status">
        <span v-if="showIcon" class="shadcn-notice__icon" aria-hidden="true">
            <slot name="icon">
                <i :class="resolvedIcon"></i>
            </slot>
        </span>

        <div class="shadcn-notice__content">
            <strong v-if="title || $slots.title" class="shadcn-notice__title">
                <slot name="title">{{ title }}</slot>
            </strong>
            <div class="shadcn-notice__body">
                <slot />
            </div>
        </div>

        <button
            v-if="dismissible"
            type="button"
            class="shadcn-notice__close"
            aria-label="Fechar"
            @click="$emit('dismiss')"
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnNotice>` — banner informativo com variants semânticas.
 *
 * Use pra:
 * - Avisos contextuais (Pagamento manual, Sub bloqueada, etc)
 * - Status cards (Aguardando ativação Stripe, Migração concluída, etc)
 * - Erros não-bloqueantes (Falha ao carregar, retry available, etc)
 *
 * Variants:
 * - `info` (default) — zinc neutro, ícone `fa-circle-info`
 * - `blue` — azul suave, ícone `fa-circle-info` (avisos informativos com destaque)
 * - `success` — verde, ícone `fa-circle-check`
 * - `warning` — âmbar, ícone `fa-triangle-exclamation`
 * - `pending` — âmbar mais sutil, ícone `fa-clock` (pra "aguardando processamento")
 * - `destructive` — vermelho, ícone `fa-circle-exclamation`
 *
 * Slots:
 * - default — body do notice (texto, lista, etc)
 * - title — substitui a prop title (pra HTML rico)
 * - icon — substitui o ícone padrão da variant
 *
 * Exemplo:
 *
 *     <ShadcnNotice variant="warning" title="Pagamento manual">
 *         Pix e Boleto geram um link novo de cobrança a cada ciclo.
 *     </ShadcnNotice>
 *
 *     <ShadcnNotice variant="pending" title="Aguardando ativação no Stripe" dismissible @dismiss="...">
 *         Clique em "Sincronizar" pra criar a assinatura no gateway.
 *     </ShadcnNotice>
 */

type NoticeVariant = 'info' | 'blue' | 'success' | 'warning' | 'pending' | 'destructive'

const VARIANT_DEFAULT_ICONS: Record<NoticeVariant, string> = {
    info: 'fa-solid fa-circle-info',
    blue: 'fa-solid fa-circle-info',
    success: 'fa-solid fa-circle-check',
    warning: 'fa-solid fa-triangle-exclamation',
    pending: 'fa-solid fa-clock',
    destructive: 'fa-solid fa-circle-exclamation',
}

export default {
    name: 'ShadcnNotice',

    emits: ['dismiss'],

    props: {
        variant: {
            type: String as PropType<NoticeVariant>,
            default: 'info',
            validator: (v: string) => ['info', 'blue', 'success', 'warning', 'pending', 'destructive'].includes(v),
        },
        title: {
            type: String,
            default: '',
        },
        /**
         * Override do ícone default da variant. Aceita classe FontAwesome (ex: `'fa-solid fa-rocket'`).
         */
        icon: {
            type: String,
            default: '',
        },
        showIcon: {
            type: Boolean,
            default: true,
        },
        /**
         * Mostra o botão "X" pra fechar (emite `dismiss`). Default false porque na maioria dos
         * lugares o notice é informativo permanente, não fechável.
         */
        dismissible: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        rootClasses(): string {
            return `shadcn-notice--${this.variant}`
        },

        resolvedIcon(): string {
            return this.icon || VARIANT_DEFAULT_ICONS[this.variant as NoticeVariant]
        },
    },
} as Component
</script>

<style scoped lang="scss">
.shadcn-notice {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid;
    border-radius: 8px;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 13px;
    line-height: 1.5;
    position: relative;
}

.shadcn-notice__icon {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin-top: 2px;     /* alinha visualmente com o título */
    line-height: 1;
}

.shadcn-notice__content {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.shadcn-notice__title {
    display: block;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.005em;
}

.shadcn-notice__body {
    font-size: 12.5px;
    line-height: 1.5;
}

.shadcn-notice__body :deep(p) {
    margin: 0;
}

.shadcn-notice__body :deep(p + p) {
    margin-top: 6px;
}

/* Botão dismiss (X) — discreto, herda cor do notice */
.shadcn-notice__close {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    color: inherit;
    opacity: 0.6;
    cursor: pointer;
    border-radius: 4px;
    transition: opacity 150ms ease, background-color 150ms ease;
    margin: -2px -2px 0 4px;
}

.shadcn-notice__close:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.06);
}

/* ════════════════════════════════════════════════════════════════════
   Variants — palette zinc-friendly (cada uma com bg muted, border tint
   e cor de texto que combine com o tom).
   ════════════════════════════════════════════════════════════════════ */

/* INFO — zinc neutro (default). Pra avisos genéricos sem urgência. */
.shadcn-notice--info {
    background: #fafafa;
    border-color: #e4e4e7;
    color: #18181b;
}

.shadcn-notice--info .shadcn-notice__icon {
    color: #71717a;
}

.shadcn-notice--info .shadcn-notice__title {
    color: #09090b;
}

/* BLUE — azul suave. Pra avisos informativos com um pouco mais de destaque. */
.shadcn-notice--blue {
    background: #eff6ff;
    border-color: #bfdbfe;
    color: #1e3a8a;
}

.shadcn-notice--blue .shadcn-notice__icon {
    color: #2563eb;
}

.shadcn-notice--blue .shadcn-notice__title {
    color: #1e40af;
}

.shadcn-notice--info .shadcn-notice__body {
    color: #52525b;
}

/* SUCCESS — verde. Confirmações positivas / ativação concluída. */
.shadcn-notice--success {
    background: #f0fdf4;
    border-color: #bbf7d0;
    color: #166534;
}

.shadcn-notice--success .shadcn-notice__icon {
    color: #16a34a;
}

.shadcn-notice--success .shadcn-notice__title {
    color: #14532d;
}

.shadcn-notice--success .shadcn-notice__body {
    color: #166534;
}

/* WARNING — âmbar. Avisos importantes (sub bloqueada, manual charge, etc). */
.shadcn-notice--warning {
    background: #fffbeb;
    border-color: #fcd34d;
    color: #92400e;
}

.shadcn-notice--warning .shadcn-notice__icon {
    color: #d97706;
}

.shadcn-notice--warning .shadcn-notice__title {
    color: #78350f;
}

.shadcn-notice--warning .shadcn-notice__body {
    color: #92400e;
}

/* PENDING — âmbar mais claro/sutil. "Aguardando processamento", spinning state. */
.shadcn-notice--pending {
    background: #fefce8;
    border-color: #fde68a;
    color: #854d0e;
}

.shadcn-notice--pending .shadcn-notice__icon {
    color: #ca8a04;
}

.shadcn-notice--pending .shadcn-notice__title {
    color: #713f12;
}

.shadcn-notice--pending .shadcn-notice__body {
    color: #854d0e;
}

/* DESTRUCTIVE — vermelho. Erros / falhas / ações irreversíveis. */
.shadcn-notice--destructive {
    background: #fef2f2;
    border-color: #fecaca;
    color: #991b1b;
}

.shadcn-notice--destructive .shadcn-notice__icon {
    color: #dc2626;
}

.shadcn-notice--destructive .shadcn-notice__title {
    color: #7f1d1d;
}

.shadcn-notice--destructive .shadcn-notice__body {
    color: #991b1b;
}
</style>
