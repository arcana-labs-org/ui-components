<template>
    <section
        class="shadcn-settings-list__group"
        :class="{
            'shadcn-settings-list__group--compact': compact,
            'shadcn-settings-list__group--collapsible': collapsible,
            'shadcn-settings-list__group--collapsed': collapsible && isCollapsed,
        }"
    >
        <component
            :is="collapsible ? 'button' : 'header'"
            v-if="title || $slots.title"
            :type="collapsible ? 'button' : undefined"
            :aria-expanded="collapsible ? String(!isCollapsed) : undefined"
            class="shadcn-settings-list__group-head"
            @click="collapsible && toggle()"
        >
            <div class="shadcn-settings-list__group-head-left">
                <!--
                    Ícone boxed colorido (opcional) — quebra a uniformidade do bg cinza
                    do header com um quadrado pastel. Variantes via prop `iconColor`:
                    blue, emerald, amber, rose, violet, indigo, teal, slate.
                -->
                <span
                    v-if="icon"
                    :class="['shadcn-settings-list__group-icon', `shadcn-settings-list__group-icon--${iconColor}`]"
                    aria-hidden="true"
                >
                    <i :class="icon"></i>
                </span>

                <div>
                    <div v-if="sectionNum" class="shadcn-settings-list__group-num">{{ sectionNum }}</div>
                    <div class="shadcn-settings-list__group-title">
                        <slot name="title">{{ title }}</slot>
                    </div>
                </div>
            </div>

            <div class="shadcn-settings-list__group-head-right">
                <div v-if="meta || $slots.meta" class="shadcn-settings-list__group-meta">
                    <slot name="meta">{{ meta }}</slot>
                </div>

                <!--
                    Chevron indicador de estado expandido/colapsado. Só renderiza quando
                    `collapsible=true`. Rotaciona 180° entre estados.
                -->
                <svg
                    v-if="collapsible"
                    class="shadcn-settings-list__group-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </component>

        <div v-show="!collapsible || !isCollapsed">
            <slot />
        </div>
    </section>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

type GroupIconColor = 'blue' | 'emerald' | 'amber' | 'rose' | 'violet' | 'indigo' | 'teal' | 'slate'

/**
 * `<ShadcnSettingsListGroup>` — section interna do `<ShadcnSettingsList>` com header
 * (ícone boxed opcional + title sans-serif Inter + meta opcional). Útil pra agrupar items
 * relacionados quando a lista tem múltiplas categorias.
 *
 * Header support:
 * - **Ícone boxed colorido** (`icon` + `iconColor`) — quadrado 32×32 pastel `*-100`
 *   + cor `*-700`, quebra a uniformidade do bg cinza `#fafafa`. 8 variantes de
 *   cor pra categorização visual.
 * - **Section num** (`sectionNum`) — pequeno label mono uppercase ("§ 01") acima
 *   do title. Opcional, pode ser omitido pra design mais clean.
 * - **Meta** (`meta`) — contador/contexto à direita ("7 configurações").
 *
 * API:
 * - `title` — título serif (string OU slot `#title`)
 * - `icon` — classe Font Awesome (ex: `'fa-solid fa-cart-shopping'`)
 * - `iconColor` — variante de cor do ícone (default `'slate'`)
 * - `sectionNum` — pequeno label mono uppercase (ex: `'§ 01'`)
 * - `meta` — contador/contexto à direita (ex: `'7 configs'`)
 * - `collapsible` — header vira botão clicável que mostra/esconde os items + chevron
 * - `defaultCollapsed` — quando `collapsible=true`, inicia colapsado
 * - `compact` — header e items com padding reduzido pra densidade maior
 *
 * Slots:
 * - `default` — items
 * - `#title` / `#meta` — HTML custom
 *
 * Exemplo:
 *
 *     <ShadcnSettingsListGroup
 *         title="Pedidos"
 *         icon="fa-solid fa-cart-shopping"
 *         icon-color="indigo"
 *         collapsible
 *         default-collapsed
 *         compact
 *     >
 *         <ShadcnSettingsListItem ... />
 *     </ShadcnSettingsListGroup>
 */
export default {
    name: 'ShadcnSettingsListGroup',

    props: {
        title: {
            type: String,
            default: '',
        },
        sectionNum: {
            type: String,
            default: '',
        },
        meta: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        iconColor: {
            type: String as PropType<GroupIconColor>,
            default: 'slate',
            validator: (v: string) => ['blue', 'emerald', 'amber', 'rose', 'violet', 'indigo', 'teal', 'slate'].includes(v),
        },
        collapsible: {
            type: Boolean,
            default: false,
        },
        defaultCollapsed: {
            type: Boolean,
            default: false,
        },
        compact: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isCollapsed: this.collapsible && this.defaultCollapsed,
        }
    },

    methods: {
        toggle() {
            this.isCollapsed = !this.isCollapsed
        },
    },
} as Component
</script>
