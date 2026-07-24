<template>
    <article :class="['arcana-spec-sheet', { 'arcana-spec-sheet--flat': flat }]">
        <!--
            Header: eyebrow mono (doc-num) + título sans (Inter) + meta lateral (status badge etc).
            Slots:
            - `#header` — substitui o header inteiro (title/doc-num/meta) caso o caller queira layout próprio
            - `#meta` — só o conteúdo do bloco meta (à direita), preserva a estrutura do header padrão
        -->
        <header v-if="hasHeader" class="arcana-spec-sheet__header">
            <slot name="header">
                <div>
                    <div v-if="docNum" class="arcana-spec-sheet__doc-num">{{ docNum }}</div>
                    <h2 v-if="title || $slots.title" class="arcana-spec-sheet__doc-title">
                        <slot name="title">{{ title }}</slot>
                    </h2>
                </div>
                <div v-if="hasMeta" class="arcana-spec-sheet__meta">
                    <div v-if="metaLabel" class="arcana-spec-sheet__meta-label">{{ metaLabel }}</div>
                    <slot name="meta" />
                </div>
            </slot>
        </header>

        <!-- Sections (default slot — caller passa N `<ArcanaSpecSheetSection>`) -->
        <slot />

        <!--
            Footer com ações (botões "Alterar Dados", "Alterar Endereço" etc).
            Aparece automaticamente quando o slot `#footer` é fornecido — sem footer,
            o card fecha sem essa zona zinc-50 no rodapé.
        -->
        <footer v-if="$slots.footer" class="arcana-spec-sheet__footer">
            <slot name="footer" />
        </footer>
    </article>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ArcanaSpecSheet>` — display read-only de dados em formato editorial/spec sheet.
 *
 * Visual inspirado em SEC filings, datasheets e cadastros formais — comunica formalidade
 * e arquivo. Hierarquia: eyebrow mono uppercase (doc-num) + título sans-serif Inter
 * (peso 600, tracking apertado) + meta lateral (badge/status). Sections internas com
 * label uppercase + valor.
 *
 * Quando usar:
 * - Cadastros que serão exportados em PDF (formal/document feel)
 * - Display de dados onde edição NÃO é a ação primária (admin lê mais do que edita)
 * - Telas que precisam transmitir "esse é o registro oficial" (dados da empresa, contratos)
 *
 * Quando NÃO usar:
 * - Dashboards modulares com muitos campos paralelos (use card grid)
 * - Forms de edição direta (use `<el-form>` + inputs shadcn)
 * - Listas densas de muitos itens (use grid/table)
 *
 * API:
 * - `docNum` — eyebrow mono uppercase no topo (ex: "Cadastro Nº 042 · Atualizado 14.Mar.2025")
 * - `title` — título principal serif (string OU slot `#title` pra HTML custom com `<em>`)
 * - `metaLabel` — pequeno label uppercase à direita do header (ex: "Status")
 * - `flat` — quando `true`, dropa o chrome do card (border/radius/bg/shadow). O sheet
 *   vira "transparente" e herda o background do container — use quando ele estiver
 *   embutido em outro card (ex: tab panel com chrome próprio) pra evitar nested cards.
 *   Side effects: meta alinha à esquerda (não faz sentido text-align: right sem o
 *   card ao redor) e o doc-title vira `inline-flex` com `flex-wrap` (permite badges/
 *   pills inline ao título sem quebrar layout).
 *
 * Slots:
 * - `default` — sections (use `<ArcanaSpecSheetSection>` como children)
 * - `#header` — substitui o header inteiro (caller controla layout)
 * - `#title` — apenas o título (mantém doc-num e meta padrão)
 * - `#meta` — conteúdo do bloco meta (badge, status etc) abaixo do `metaLabel`
 * - `#footer` — botões de ação no rodapé `#fafafa`
 *
 * Acessibilidade:
 * - `<article>` semântico (sheet é um documento auto-contido)
 * - Header com `<h2>` no título, sections com `<h3>` nos subtítulos
 *
 * Exemplo:
 *
 *     <ArcanaSpecSheet
 *         doc-num="Cadastro Nº 042"
 *         title="Popgás Distribuidora"
 *         meta-label="Status"
 *     >
 *         <template #meta>
 *             <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span>
 *         </template>
 *
 *         <ArcanaSpecSheetSection title="Dados Cadastrais" section-num="§ 01">
 *             <ArcanaSpecSheetField label="Razão Social" :value="form.trading_name" />
 *             <ArcanaSpecSheetField label="CNPJ" :value="form.document_number" />
 *         </ArcanaSpecSheetSection>
 *
 *         <template #footer>
 *             <button class="btn" @click="openEditModal">Alterar Dados</button>
 *         </template>
 *     </ArcanaSpecSheet>
 */
export default {
    name: 'ArcanaSpecSheet',

    props: {
        docNum: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        metaLabel: {
            type: String,
            default: '',
        },
        /**
         * Modo "embutido": dropa o chrome do card (border/radius/bg/shadow) e ajusta
         * os blocos do header (meta vira left, doc-title vira inline-flex wrap) pra
         * funcionar dentro de um wrapper que já fornece o chrome. Ver docblock acima.
         */
        flat: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        hasHeader(): boolean {
            // Header só renderiza se houver algo pra mostrar — evita div vazia com border-bottom.
            return Boolean(
                this.docNum
                || this.title
                || this.metaLabel
                || this.$slots.title
                || this.$slots.header
                || this.$slots.meta,
            )
        },
        hasMeta(): boolean {
            return Boolean(this.metaLabel || this.$slots.meta)
        },
    },
} as Component
</script>

<!--
    Estilos NÃO scoped: as classes `.arcana-spec-sheet*` são compartilhadas entre os 3
    componentes (`ArcanaSpecSheet`, `ArcanaSpecSheetSection`, `ArcanaSpecSheetField`).
    Mantemos um único `<style>` no parent (`ArcanaSpecSheet`) pra:
      1. evitar duplicação de CSS em cada filho;
      2. permitir que o caller use `<ArcanaSpecSheetSection>` standalone — quando ele
         só importa a section sem o sheet, perde o tema (esperado, é tema de página inteira);
      3. facilitar override no caller (mesmo escopo global, mesmas specifs).
    Importar este componente carrega os estilos globalmente via Vue SFC.
-->
