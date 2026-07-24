<template>
    <section :class="['arcana-spec-sheet__section', { 'arcana-spec-sheet__section--compact': compact }]">
        <header v-if="hasHeader" class="arcana-spec-sheet__section-head">
            <div class="arcana-spec-sheet__section-head-left">
                <span
                    v-if="icon"
                    :class="['arcana-spec-sheet__section-icon', `arcana-spec-sheet__section-icon--${iconColor}`]"
                    aria-hidden="true"
                >
                    <i :class="icon"></i>
                </span>
                <h3 class="arcana-spec-sheet__section-title">
                    <slot name="title">{{ title }}</slot>
                </h3>
            </div>
            <div class="arcana-spec-sheet__section-head-right">
                <span v-if="sectionNum" class="arcana-spec-sheet__section-num">{{ sectionNum }}</span>
                <!--
                    Slot opcional para ações no canto direito do header (botões "Alterar",
                    toggles, etc). Renderiza ao lado/depois do `sectionNum`.
                -->
                <slot name="actions" />
            </div>
        </header>

        <!--
            Grid configurável (1/2/3/4 colunas). Cada child deve ser um `<ArcanaSpecSheetField>`.
            Caller é livre pra usar `v-if` pra esconder fields condicionais.
        -->
        <div
            :class="[
                'arcana-spec-sheet__grid',
                `arcana-spec-sheet__grid--cols-${columns}`,
                { 'arcana-spec-sheet__grid--no-row-dividers': noRowDividers },
            ]"
        >
            <slot />
        </div>
    </section>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

type SectionAccentColor = 'blue' | 'emerald' | 'amber' | 'rose' | 'violet' | 'indigo' | 'teal' | 'slate'

/**
 * `<ArcanaSpecSheetSection>` — section interna do `<ArcanaSpecSheet>`.
 *
 * Cada section tem ícone boxed colorido opcional + título + section-num opcional +
 * actions à direita + grid 2-col com fields (`<ArcanaSpecSheetField>`).
 *
 * Quando `iconColor` é passado, a section ganha um sutil accent visual (border-left
 * colorida + background tint) que ajuda a categorizar visualmente entre seções.
 *
 * API:
 * - `title` — título (string OU slot `#title`)
 * - `sectionNum` — pequeno label à direita (ex: `'§ 01'`, `'§ 02'`)
 * - `icon` — classe Font Awesome (ex: `'fa-solid fa-dollar-sign'`)
 * - `iconColor` — variante de cor do accent (default `'slate'`). 8 paletas:
 *   blue, emerald, amber, rose, violet, indigo, teal, slate.
 */
export default {
    name: 'ArcanaSpecSheetSection',

    props: {
        title: {
            type: String,
            default: '',
        },
        sectionNum: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        iconColor: {
            type: String as PropType<SectionAccentColor>,
            default: 'slate',
            validator: (v: string) => ['blue', 'emerald', 'amber', 'rose', 'violet', 'indigo', 'teal', 'slate'].includes(v),
        },
        /**
         * Número de colunas no grid de fields. Default 2 (preserva layout original);
         * usar 3 ou 4 pra fields curtos numéricos lado-a-lado.
         */
        columns: {
            type: [Number, String] as PropType<1 | 2 | 3 | 4 | 5 | 6>,
            default: 2,
            validator: (v: any) => [1, 2, 3, 4, 5, 6].includes(Number(v)),
        },
        /**
         * Remove as dashed lines horizontais entre linhas de fields. Útil quando os
         * valores têm alturas variáveis (chips, badges multi-linha) e a borda fica
         * descontínua/feia. Mantém apenas dividers verticais entre colunas.
         */
        noRowDividers: {
            type: Boolean,
            default: false,
        },
        /**
         * Versão compacta: remove o padding vertical e lateral direito, mantendo
         * apenas um recuo à esquerda (`padding: 0 0 0 40px`). Útil pra seções sem
         * header que devem alinhar o conteúdo de forma enxuta.
         */
        compact: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        hasHeader(): boolean {
            return Boolean(
                this.title
                || this.sectionNum
                || this.icon
                || this.$slots.title
                || this.$slots.actions,
            )
        },
    },
} as Component
</script>
