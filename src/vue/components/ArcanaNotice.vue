<template>
    <div class="arcana-notice" :class="rootClasses" role="status">
        <span v-if="showIcon" class="arcana-notice__icon" aria-hidden="true">
            <slot name="icon">
                <i :class="resolvedIcon"></i>
            </slot>
        </span>

        <div class="arcana-notice__content">
            <strong v-if="title || $slots.title" class="arcana-notice__title">
                <slot name="title">{{ title }}</slot>
            </strong>
            <div class="arcana-notice__body">
                <slot />
            </div>
        </div>

        <button
            v-if="dismissible"
            type="button"
            class="arcana-notice__close"
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
 * `<ArcanaNotice>` — banner informativo com variants semânticas.
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
 *     <ArcanaNotice variant="warning" title="Pagamento manual">
 *         Pix e Boleto geram um link novo de cobrança a cada ciclo.
 *     </ArcanaNotice>
 *
 *     <ArcanaNotice variant="pending" title="Aguardando ativação no Stripe" dismissible @dismiss="...">
 *         Clique em "Sincronizar" pra criar a assinatura no gateway.
 *     </ArcanaNotice>
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
    name: 'ArcanaNotice',

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
            return `arcana-notice--${this.variant}`
        },

        resolvedIcon(): string {
            return this.icon || VARIANT_DEFAULT_ICONS[this.variant as NoticeVariant]
        },
    },
} as Component
</script>
