<template>
    <article :class="['shadcn-spec-sheet', { 'shadcn-spec-sheet--flat': flat }]">
        <!--
            Header: eyebrow mono (doc-num) + título sans (Inter) + meta lateral (status badge etc).
            Slots:
            - `#header` — substitui o header inteiro (title/doc-num/meta) caso o caller queira layout próprio
            - `#meta` — só o conteúdo do bloco meta (à direita), preserva a estrutura do header padrão
        -->
        <header v-if="hasHeader" class="shadcn-spec-sheet__header">
            <slot name="header">
                <div>
                    <div v-if="docNum" class="shadcn-spec-sheet__doc-num">{{ docNum }}</div>
                    <h2 v-if="title || $slots.title" class="shadcn-spec-sheet__doc-title">
                        <slot name="title">{{ title }}</slot>
                    </h2>
                </div>
                <div v-if="hasMeta" class="shadcn-spec-sheet__meta">
                    <div v-if="metaLabel" class="shadcn-spec-sheet__meta-label">{{ metaLabel }}</div>
                    <slot name="meta" />
                </div>
            </slot>
        </header>

        <!-- Sections (default slot — caller passa N `<ShadcnSpecSheetSection>`) -->
        <slot />

        <!--
            Footer com ações (botões "Alterar Dados", "Alterar Endereço" etc).
            Aparece automaticamente quando o slot `#footer` é fornecido — sem footer,
            o card fecha sem essa zona zinc-50 no rodapé.
        -->
        <footer v-if="$slots.footer" class="shadcn-spec-sheet__footer">
            <slot name="footer" />
        </footer>
    </article>
</template>

<script lang="ts">
import type { Component } from "vue"

/**
 * `<ShadcnSpecSheet>` — display read-only de dados em formato editorial/spec sheet.
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
 * - `default` — sections (use `<ShadcnSpecSheetSection>` como children)
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
 *     <ShadcnSpecSheet
 *         doc-num="Cadastro Nº 042"
 *         title="Popgás Distribuidora"
 *         meta-label="Status"
 *     >
 *         <template #meta>
 *             <span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>
 *         </template>
 *
 *         <ShadcnSpecSheetSection title="Dados Cadastrais" section-num="§ 01">
 *             <ShadcnSpecSheetField label="Razão Social" :value="form.trading_name" />
 *             <ShadcnSpecSheetField label="CNPJ" :value="form.document_number" />
 *         </ShadcnSpecSheetSection>
 *
 *         <template #footer>
 *             <button class="btn" @click="openEditModal">Alterar Dados</button>
 *         </template>
 *     </ShadcnSpecSheet>
 */
export default {
    name: 'ShadcnSpecSheet',

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
    Estilos NÃO scoped: as classes `.shadcn-spec-sheet*` são compartilhadas entre os 3
    componentes (`ShadcnSpecSheet`, `ShadcnSpecSheetSection`, `ShadcnSpecSheetField`).
    Mantemos um único `<style>` no parent (`ShadcnSpecSheet`) pra:
      1. evitar duplicação de CSS em cada filho;
      2. permitir que o caller use `<ShadcnSpecSheetSection>` standalone — quando ele
         só importa a section sem o sheet, perde o tema (esperado, é tema de página inteira);
      3. facilitar override no caller (mesmo escopo global, mesmas specifs).
    Importar este componente carrega os estilos globalmente via Vue SFC.
-->
<style lang="scss">
.shadcn-spec-sheet {
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 12px;
    overflow: hidden;
    font-family: inherit;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    /*
     * Sem `margin-top` intrínseca — quem coloca o componente é responsável pelo
     * espaçamento (ex: `<ShadcnTabs>` já fornece `gap: 16px` entre tablist e
     * panel). Tinha um `margin-top: 16px` aqui que causava double-spacing
     * quando usado dentro de tabs.
     */
}

/* ─────────────────────────────────────────────────────────────────────
   Modifier `--flat`: sheet embutido em outro card.
   Dropa o chrome próprio e ajusta header pra que badges/pills inline ao
   título quebrem linha em vez de empurrar o meta block. Usado em telas
   de detalhe onde o sheet vive dentro de um tab panel já com chrome.
   ───────────────────────────────────────────────────────────────────── */
.shadcn-spec-sheet--flat {
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
}

.shadcn-spec-sheet--flat .shadcn-spec-sheet__meta {
    text-align: left;
    min-width: 0;
}

.shadcn-spec-sheet--flat .shadcn-spec-sheet__doc-title {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

/* ─────────────────────────────────────────────────────────────────────
   Header — eyebrow mono + título sans (Inter) + meta lateral
   Versão compacta: paddings e tamanhos reduzidos pra densidade maior.
   ───────────────────────────────────────────────────────────────────── */
.shadcn-spec-sheet__header {
    padding: 10px 28px 28px 28px;
    border-bottom: 1px dashed #eeeef1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
}

.shadcn-spec-sheet__doc-num {
    font-family: inherit;
    font-size: 11px;
    color: #71717a;
    letter-spacing: 0;
    margin-bottom: 6px;
}

.shadcn-spec-sheet__doc-title {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: #09090b;
    line-height: 1.25;
    margin: 0;
}

.shadcn-spec-sheet__doc-title em {
    font-style: italic;
    font-weight: 500;
    color: #52525b;
}

.shadcn-spec-sheet__meta {
    text-align: right;
    flex-shrink: 0;
    min-width: 90px;
}

.shadcn-spec-sheet__meta-label {
    font-family: inherit;
    font-size: 11px;
    color: #71717a;
    letter-spacing: 0;
    margin-bottom: 6px;
}

/* Section — bloco com título + section-num + grid de fields */
.shadcn-spec-sheet__section {
    padding: 18px 28px 30px;
    border-bottom: 1px dashed #eeeef1;
}

.shadcn-spec-sheet__section:last-of-type {
    border-bottom: none;
}

.shadcn-spec-sheet__section--compact {
    padding: 0 0 10px 40px;
}

.shadcn-spec-sheet__section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 12px;
    margin-bottom: 14px;
}

.shadcn-spec-sheet__section-head-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
}

.shadcn-spec-sheet__section-title {
    font-size: 14px;
    font-weight: 600;
    color: #09090b;
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.005em;
}

/* Ícone boxed (32×32, color tokens shadcn) à esquerda do título */
.shadcn-spec-sheet__section-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
}

.shadcn-spec-sheet__section-icon--blue {
    background: #dbeafe;
    color: #1d4ed8;
}

.shadcn-spec-sheet__section-icon--emerald {
    background: #d1fae5;
    color: #047857;
}

.shadcn-spec-sheet__section-icon--amber {
    background: #fef3c7;
    color: #b45309;
}

.shadcn-spec-sheet__section-icon--rose {
    background: #ffe4e6;
    color: #be123c;
}

.shadcn-spec-sheet__section-icon--violet {
    background: #ede9fe;
    color: #6d28d9;
}

.shadcn-spec-sheet__section-icon--indigo {
    background: #e0e7ff;
    color: #4338ca;
}

.shadcn-spec-sheet__section-icon--teal {
    background: #ccfbf1;
    color: #0f766e;
}

.shadcn-spec-sheet__section-icon--slate {
    background: #f1f5f9;
    color: #475569;
}

.shadcn-spec-sheet__section-num {
    font-family: inherit;
    font-size: 11px;
    color: #71717a;
    letter-spacing: 0;
}

.shadcn-spec-sheet__section-head-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

.shadcn-spec-sheet__grid {
    display: grid;
    gap: 0;
}

.shadcn-spec-sheet__grid--cols-1 {
    grid-template-columns: 1fr;
}

.shadcn-spec-sheet__grid--cols-2 {
    grid-template-columns: 1fr 1fr;
}

.shadcn-spec-sheet__grid--cols-3 {
    grid-template-columns: repeat(3, 1fr);
}

.shadcn-spec-sheet__grid--cols-4 {
    grid-template-columns: repeat(4, 1fr);
}

.shadcn-spec-sheet__grid--cols-5 {
    grid-template-columns: repeat(5, 1fr);
}

.shadcn-spec-sheet__grid--cols-6 {
    grid-template-columns: repeat(6, 1fr);
}

/* Field — base */
.shadcn-spec-sheet__field {
    padding: 10px 0;
    border-top: 1px dashed #e4e4e7;
    min-width: 0;
}

/* ─── 1-col layout (sem dashed dividers entre cols) ─── */
.shadcn-spec-sheet__grid--cols-1>.shadcn-spec-sheet__field:nth-child(1) {
    border-top: none;
    padding-top: 2px;
}

/* ─── 2-col layout (default original) ─── */
.shadcn-spec-sheet__grid--cols-2>.shadcn-spec-sheet__field:nth-child(-n+2) {
    border-top: none;
    padding-top: 2px;
}

.shadcn-spec-sheet__grid--cols-2>.shadcn-spec-sheet__field:nth-child(2n+1) {
    padding-right: 22px;
}

.shadcn-spec-sheet__grid--cols-2>.shadcn-spec-sheet__field:nth-child(2n) {
    padding-left: 22px;
    border-left: 1px dashed #e4e4e7;
}

/* ─── 3-col layout ─── */
.shadcn-spec-sheet__grid--cols-3>.shadcn-spec-sheet__field {
    padding: 10px 18px;
    border-left: 1px dashed #e4e4e7;
}

.shadcn-spec-sheet__grid--cols-3>.shadcn-spec-sheet__field:nth-child(3n+1) {
    padding-left: 0;
    border-left: none;
}

.shadcn-spec-sheet__grid--cols-3>.shadcn-spec-sheet__field:nth-child(3n) {
    padding-right: 0;
}

.shadcn-spec-sheet__grid--cols-3>.shadcn-spec-sheet__field:nth-child(-n+3) {
    border-top: none;
    padding-top: 2px;
}

/* ─── 4-col layout ─── */
.shadcn-spec-sheet__grid--cols-4>.shadcn-spec-sheet__field {
    padding: 10px 14px;
    border-left: 1px dashed #e4e4e7;
}

.shadcn-spec-sheet__grid--cols-4>.shadcn-spec-sheet__field:nth-child(4n+1) {
    padding-left: 0;
    border-left: none;
}

.shadcn-spec-sheet__grid--cols-4>.shadcn-spec-sheet__field:nth-child(4n) {
    padding-right: 0;
}

.shadcn-spec-sheet__grid--cols-4>.shadcn-spec-sheet__field:nth-child(-n+4) {
    border-top: none;
    padding-top: 2px;
}

/* ─── 5-col layout ─── */
.shadcn-spec-sheet__grid--cols-5>.shadcn-spec-sheet__field {
    padding: 10px 12px;
    border-left: 1px dashed #e4e4e7;
}

.shadcn-spec-sheet__grid--cols-5>.shadcn-spec-sheet__field:nth-child(5n+1) {
    padding-left: 0;
    border-left: none;
}

.shadcn-spec-sheet__grid--cols-5>.shadcn-spec-sheet__field:nth-child(5n) {
    padding-right: 0;
}

.shadcn-spec-sheet__grid--cols-5>.shadcn-spec-sheet__field:nth-child(-n+5) {
    border-top: none;
    padding-top: 2px;
}

/* ─── 6-col layout ─── */
.shadcn-spec-sheet__grid--cols-6>.shadcn-spec-sheet__field {
    padding: 10px 10px;
    border-left: 1px dashed #e4e4e7;
}

.shadcn-spec-sheet__grid--cols-6>.shadcn-spec-sheet__field:nth-child(6n+1) {
    padding-left: 0;
    border-left: none;
}

.shadcn-spec-sheet__grid--cols-6>.shadcn-spec-sheet__field:nth-child(6n) {
    padding-right: 0;
}

.shadcn-spec-sheet__grid--cols-6>.shadcn-spec-sheet__field:nth-child(-n+6) {
    border-top: none;
    padding-top: 2px;
}

/* ─── No-row-dividers modifier ─── */
/* Remove dashed border-top de todos os fields (incluindo o reset da 1ª linha) */
.shadcn-spec-sheet__grid--no-row-dividers>.shadcn-spec-sheet__field {
    border-top: none;
    padding-top: 10px;
}

.shadcn-spec-sheet__label {
    font-family: inherit;
    font-size: 12px;
    color: #7e7e89;
    font-weight: 500;
    letter-spacing: 0;
    margin-bottom: 4px;
}

.shadcn-spec-sheet__value {
    font-size: 13.5px;
    color: #09090b;
    font-weight: 500;
    word-break: break-word;
    line-height: 1.4;
}

.shadcn-spec-sheet__value--empty {
    color: #a1a1aa;
    font-weight: 400;
    font-style: italic;
}

/* Footer — bg zinc-50, ações alinhadas à direita */
.shadcn-spec-sheet__footer {
    padding: 14px 28px;
    background: #fafafa;
    border-top: 1px solid #e4e4e7;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    flex-wrap: wrap;
}

/* Status badge (compartilhado — usado tipicamente no slot meta) */
.shadcn-spec-sheet-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.02em;
    padding: 4px 11px 4px 9px;
    border-radius: 999px;
}

.shadcn-spec-sheet-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
}

.shadcn-spec-sheet-badge--active {
    background: #ecfdf5;
    color: #047857;
    border: 1px solid #3fc73f;
}

.shadcn-spec-sheet-badge--active::before {
    background: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
}

.shadcn-spec-sheet-badge--inactive {
    background: #fef2f2;
    color: #b91c1c;
}

.shadcn-spec-sheet-badge--inactive::before {
    background: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18);
}

.shadcn-spec-sheet-badge--amber {
    background: #fffbeb;
    color: #b45309;
}

.shadcn-spec-sheet-badge--amber::before {
    background: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.18);
}

.shadcn-spec-sheet-badge--neutral {
    background: #f4f4f5;
    color: #52525b;
    border: 1px solid #dbdbdb;
}

.shadcn-spec-sheet-badge--neutral::before {
    background: #a1a1aa;
    box-shadow: 0 0 0 3px rgba(161, 161, 170, 0.18);
}

.shadcn-spec-sheet-badge--blue {
    background: #eff6ff;
    color: #1e40af;
}

.shadcn-spec-sheet-badge--blue::before {
    background: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
}

.shadcn-spec-sheet-badge--violet {
    background: #ede9fe;
    color: #5b21b6;
}

.shadcn-spec-sheet-badge--violet::before {
    background: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.18);
}

/* Responsive — mobile vira coluna única, ajustes nos paddings */
@media (max-width: 880px) {
    .shadcn-spec-sheet__header {
        padding: 18px 20px 14px;
        flex-direction: column;
        align-items: flex-start;
    }

    .shadcn-spec-sheet__meta {
        text-align: left;
    }

    .shadcn-spec-sheet__section {
        padding: 14px 20px 10px;
    }

    /* Colapsa qualquer variante de cols pra 1-col em mobile */
    .shadcn-spec-sheet__grid--cols-2,
    .shadcn-spec-sheet__grid--cols-3,
    .shadcn-spec-sheet__grid--cols-4,
    .shadcn-spec-sheet__grid--cols-5,
    .shadcn-spec-sheet__grid--cols-6 {
        grid-template-columns: 1fr;
    }

    /* Reset dividers/paddings entre cols (já não há cols lado-a-lado em mobile) */
    .shadcn-spec-sheet__grid--cols-2>.shadcn-spec-sheet__field,
    .shadcn-spec-sheet__grid--cols-3>.shadcn-spec-sheet__field,
    .shadcn-spec-sheet__grid--cols-4>.shadcn-spec-sheet__field,
    .shadcn-spec-sheet__grid--cols-5>.shadcn-spec-sheet__field,
    .shadcn-spec-sheet__grid--cols-6>.shadcn-spec-sheet__field {
        padding-left: 0;
        padding-right: 0;
        border-left: none;
    }

    /* Cada field volta a ter border-top exceto o primeiro */
    .shadcn-spec-sheet__grid--cols-2>.shadcn-spec-sheet__field:not(:first-child),
    .shadcn-spec-sheet__grid--cols-3>.shadcn-spec-sheet__field:not(:first-child),
    .shadcn-spec-sheet__grid--cols-4>.shadcn-spec-sheet__field:not(:first-child),
    .shadcn-spec-sheet__grid--cols-5>.shadcn-spec-sheet__field:not(:first-child),
    .shadcn-spec-sheet__grid--cols-6>.shadcn-spec-sheet__field:not(:first-child) {
        border-top: 1px dashed #e4e4e7;
        padding-top: 10px;
    }

    .shadcn-spec-sheet__footer {
        padding: 12px 20px;
    }
}
</style>
