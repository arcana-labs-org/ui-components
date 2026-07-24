<template>
    <div class="shadcn-tabs" :class="rootClasses">
        <!--
            Tab list (triggers). Cada trigger é um <button> com role="tab" pra acessibilidade.
            A navegação por teclado (←/→/Home/End) é gerenciada via @keydown no list.
        -->
        <div class="shadcn-tabs__list" role="tablist" :aria-label="ariaLabel || undefined" @keydown="onKeydown">
            <!--
                Slot opcional renderizado ANTES dos triggers — útil pra "chrome" interno
                do tablist (ex: botão de minimizar sidebar, ações rápidas). Wrappers como
                `<SidebarShell>` usam isto pra injetar o toggle de collapse.
            -->
            <slot name="list-header"></slot>

            <!--
                Renderização "interleaved": quando o variant suporta agrupamento semântico
                (`sidebar-soft`), `renderableItems` injeta entradas `{ type: 'header' }` antes
                de cada bloco de tabs com `tab.group` distinto. Para os demais variants, o
                array é só `{ type: 'tab' }` — comportamento idêntico ao original. Refs ficam
                exclusivamente nos `<button>` (headers usam `<div>`), preservando o índice
                em `triggerRefs` 1:1 com `normalizedTabs`.
            -->
            <template v-for="item in renderableItems" :key="item.key">
                <div v-if="item.type === 'header'" class="shadcn-tabs__group-header" role="presentation">{{ item.label
                    }}</div>
                <el-tooltip v-else :content="item.tab.label" :placement="tooltipPlacement || 'right'" :show-after="80"
                    :hide-after="0" :disabled="!tooltipPlacement" effect="dark">
                    <button ref="triggerRefs" type="button" class="shadcn-tabs__trigger" :class="{
                        'is-active': isActive(item.tab),
                        'is-disabled': isDisabled(item.tab),
                        [`is-tone-${item.tab.tone}`]: item.tab.tone,
                    }" role="tab" :id="triggerId(item.tab)" :aria-selected="isActive(item.tab)"
                        :aria-controls="panelId(item.tab)" :aria-disabled="isDisabled(item.tab)"
                        :tabindex="isActive(item.tab) ? 0 : -1" :disabled="isDisabled(item.tab)"
                        @click="select(item.tab)" @focus="onFocusTrigger(item.tab)">
                        <i v-if="item.tab.icon" :class="['shadcn-tabs__trigger-icon', item.tab.icon]"
                            :style="item.tab.iconColor ? { color: item.tab.iconColor } : undefined"></i>
                        <span class="shadcn-tabs__trigger-label">{{ item.tab.label }}</span>
                        <span v-if="item.tab.badge != null" class="shadcn-tabs__trigger-badge">{{ item.tab.badge
                            }}</span>
                    </button>
                </el-tooltip>
            </template>
        </div>

        <!--
            Tab panel ativo. Modo default: renderiza só o slot correspondente ao `modelValue`
            (lazy — tabs inativas desmontam quando troca, similar ao shadcn UI).

            Modo `keepAlive` (LAZY): o panel de uma tab só monta quando ela é ativada pela 1ª vez
            (`v-if="wasActivated"` — lazy). Depois fica montado e alterna via `v-show` (keep-alive:
            preserva grids paginados, scroll, formulário parcial — sem refetch ao voltar).
        -->
        <template v-if="keepAlive">
            <template v-for="tab in normalizedTabs" :key="String(tab.name)">
                <div v-if="wasActivated(tab)" v-show="isActive(tab)" class="shadcn-tabs__panel"
                    role="tabpanel" :id="panelId(tab)" :aria-labelledby="triggerId(tab)" :tabindex="isActive(tab) ? 0 : -1"
                    :hidden="!isActive(tab) || undefined">
                    <slot :name="String(tab.name)" :tab="tab" />
                </div>
            </template>
        </template>
        <div v-else-if="activeTab" class="shadcn-tabs__panel" role="tabpanel" :id="panelId(activeTab)"
            :aria-labelledby="triggerId(activeTab)" tabindex="0">
            <slot :name="String(activeTab.name)" :tab="activeTab" />
        </div>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnTabs>` — tabs shadcn-style (palette zinc), implementação custom (sem `<el-tabs>`).
 *
 * Variants visuais:
 * - `'pills'` (default) — container com bg `#f4f4f5`, tab ativa com bg branco + sombra sutil.
 *   Ideal pra modais/painéis pequenos com 2-5 abas.
 * - `'underline'` — sem container, linha underline `#18181b` embaixo da tab ativa. Ideal pra
 *   contextos data-heavy / páginas com várias seções.
 * - `'boxed'` — cada tab é um card separado (border zinc); ativa fica preta sólida com texto
 *   branco. Sem container externo, gap de 8px entre tabs. Ideal pra contextos onde o destaque
 *   da tab ativa é forte (admin painéis, seções configuráveis).
 * - `'sidebar'` — list vertical full-width (auto-vira `orientation="vertical"` se passada
 *   horizontal). Items ocupam 100% do width, ativa com bg `#18181b` + texto branco e chevron
 *   indicator. Ideal pra menus laterais de páginas com várias seções.
 * - `'sidebar-soft'` — *(novo, "Aurora")* sidebar refinada num card com fundo creme/branco-translúcido,
 *   borda suave e cantos arredondados. Suporta agrupamento semântico via `tab.group` —
 *   itens com mesmo `group` ficam sob um header em mono uppercase. Ativa: bg gradiente
 *   ink → graphite, ícone na cor de acento (default coral). Override via CSS vars
 *   `--shadcn-tabs-accent`, `--shadcn-tabs-soft-bg`, `--shadcn-tabs-soft-border`.
 * - `'segmented'` — *(novo, "Aurora")* pills refinadas: container `rgba(0,0,0,.04)` arredondado,
 *   ativa com bg branco + sombra dupla (sutil interna + difusa externa) + ícone em
 *   cor de acento. Ideal pra sub-tabs em telas de detalhe.
 *
 * Tone (apenas `'sidebar-soft'`): `tab.tone === 'danger'` aplica cor de risco no item
 * (vermelho zinc-soft) — usar pra "Zona de Perigo" e similares. Outros variants ignoram.
 *
 * Orientation:
 * - `'horizontal'` (default) — tablist em cima, panel embaixo
 * - `'vertical'` — tablist à esquerda, panel à direita (auto-aplicado quando variant=
 *   `'sidebar'` ou `'sidebar-soft'`)
 *
 * API:
 * - `modelValue` (v-model) — name da tab ativa
 * - `tabs` — `Array<TabItem>` com `{ name, label, disabled?, icon?, badge?, group?, tone? }`
 *   - `group` é renderizado APENAS pelo variant `'sidebar-soft'` (ignorado pelos demais).
 *   - `tone` é interpretado APENAS pelo variant `'sidebar-soft'` (ignorado pelos demais).
 * - `variant` — `'pills' | 'underline' | 'boxed' | 'sidebar' | 'sidebar-soft' | 'segmented'`
 *   (default `'pills'`)
 * - `ariaLabel` — texto descritivo do tablist pra screen readers
 *
 * Cada tab vira um slot nomeado igual ao `tab.name`. Renderização é lazy: só o slot da
 * aba ativa monta no DOM (panes inativas desmontam quando troca).
 *
 * Acessibilidade:
 * - `role="tablist"` no container, `role="tab"` em cada trigger, `role="tabpanel"` no slot
 * - `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-disabled`
 * - Headers de grupo (`sidebar-soft`) usam `role="presentation"` (não navegáveis por teclado).
 * - Teclado: ←/→ navegam, Home/End vão pra primeira/última, Tab sai do tablist.
 *   Group headers são *skippados* automaticamente — o keyboard nav itera só nos triggers.
 *
 * Exemplo (segmented + sidebar-soft):
 *
 *     <ShadcnTabs v-model="area" variant="sidebar-soft" :tabs="[
 *         { name: 'home', label: 'Resumo', icon: 'fa fa-house', group: 'Visão' },
 *         { name: 'orders', label: 'Pedidos', icon: 'fa fa-cart', group: 'Operação' },
 *         { name: 'logs', label: 'Logs', icon: 'fa fa-clock', group: 'Plataforma' },
 *         { name: 'danger', label: 'Zona de Perigo', icon: 'fa fa-warning',
 *           group: 'Plataforma', tone: 'danger' },
 *     ]">
 *         <template #home>...</template>
 *         ...
 *     </ShadcnTabs>
 *
 *     <ShadcnTabs v-model="sub" variant="segmented" :tabs="[
 *         { name: 'data', label: 'Dados', icon: 'fa fa-id-card' },
 *         { name: 'brand', label: 'Branding', icon: 'fa fa-palette' },
 *     ]">...</ShadcnTabs>
 */

interface TabItem {
    name: string | number
    label: string
    disabled?: boolean
    icon?: string
    /**
     * Cor inline aplicada ao ícone (qualquer string CSS válida — hex, rgb, var(...)).
     * Sobrescreve o accent default tanto no estado ativo quanto inativo, permitindo
     * cores semânticas por aba (ex: emerald em "Pagamentos", violet em "Webhooks").
     * Quando omitido, o ícone segue o comportamento default do variant (muted inativo,
     * accent ativo).
     */
    iconColor?: string
    badge?: string | number
    /**
     * Header de seção sob o qual o item aparece. **Renderizado apenas pelo variant
     * `'sidebar-soft'`** — itens consecutivos com o mesmo `group` ficam visualmente
     * agrupados sob um header mono uppercase. Em outros variants o campo é ignorado.
     * Itens sem `group` ficam "soltos" no início da lista (sem header).
     */
    group?: string
    /**
     * Tonalidade visual do item. Por enquanto só `'danger'` é interpretado (cor vermelha
     * suave) — usado pra distinguir "Zona de Perigo" e similares no menu lateral. Aplicado
     * apenas pelo variant `'sidebar-soft'`; demais variants ignoram.
     */
    tone?: 'default' | 'danger'
    /**
     * Só relevante com `keepAlive`: quando `true`, o panel monta imediatamente junto com
     * o componente (em vez de esperar a 1ª ativação da tab). Use quando o conteúdo da tab
     * precisa carregar dados assim que a tela abre (ex: badges de contagem que dependem
     * do fetch interno do panel). Sem `keepAlive` o campo é ignorado.
     */
    eager?: boolean
}

let uidCounter = 0

export default {
    name: 'ShadcnTabs',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: [String, Number] as PropType<string | number>,
            required: true,
        },
        tabs: {
            type: Array as PropType<TabItem[]>,
            required: true,
        },
        variant: {
            type: String as PropType<'pills' | 'underline' | 'boxed' | 'sidebar' | 'sidebar-soft' | 'sidebar-shell' | 'segmented'>,
            default: 'pills',
            validator: (v: string) => ['pills', 'underline', 'boxed', 'sidebar', 'sidebar-soft', 'sidebar-shell', 'segmented'].includes(v),
        },
        /**
         * Orientação do tablist:
         * - `'horizontal'` (default) — tablist em cima do panel
         * - `'vertical'` — tablist à esquerda do panel (sidebar layout)
         *
         * Os variants `'sidebar'` e `'sidebar-soft'` forçam automaticamente vertical (não
         * faz sentido horizontal nesses layouts).
         */
        orientation: {
            type: String as PropType<'horizontal' | 'vertical'>,
            default: 'horizontal',
            validator: (v: string) => ['horizontal', 'vertical'].includes(v),
        },
        ariaLabel: {
            type: String,
            default: '',
        },
        /**
         * Quando `true`, todos os panels permanecem montados no DOM e o panel inativo
         * é apenas escondido via `display: none` (preserva estado interno de cada slot —
         * grids paginados, formulários parcialmente preenchidos, etc.). Use quando trocar
         * de tab e voltar não deveria fazer refetch.
         */
        keepAlive: {
            type: Boolean,
            default: false,
        },
        /**
         * Remove qualquer margin do `.shadcn-tabs__list`. Útil quando o `ShadcnTabs` está
         * ANINHADO dentro de outro cujo wrapper aplica margin via `:deep(.shadcn-tabs__list)`
         * (seletor descendente vaza pro tablist filho) — `flush` zera essa margin herdada.
         */
        flush: {
            type: Boolean,
            default: false,
        },
        /**
         * Quando definido (ex: `'right'`, `'top'`), cada trigger é envolvido por um
         * `<el-tooltip>` mostrando `tab.label` na posição especificada. String vazia
         * (default) desabilita os tooltips. Útil pra wrappers como `<SidebarShell>` que
         * escondem labels em modo collapsed e querem mostrar o nome via tooltip.
         */
        tooltipPlacement: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            uid: ++uidCounter,
            // `keepAlive` LAZY: nomes das tabs já visitadas ao menos uma vez. Um panel só monta
            // quando sua tab é ativada pela 1ª vez (lazy); depois fica montado e alterna via
            // `v-show` (keep-alive — sem refetch/perda de estado ao voltar).
            activatedTabNames: [] as string[],
        }
    },

    created() {
        if (this.modelValue != null && this.modelValue !== '') {
            this.activatedTabNames = [String(this.modelValue)]
        }
    },

    watch: {
        modelValue(value: string | number | null | undefined) {
            const name = value == null ? '' : String(value)
            if (name && !this.activatedTabNames.includes(name)) {
                this.activatedTabNames.push(name)
            }
        },
    },

    computed: {
        rootClasses(): string {
            // `sidebar`, `sidebar-soft` e `sidebar-shell` forçam vertical — não faz sentido horizontal.
            const isSidebarLike = this.variant === 'sidebar' || this.variant === 'sidebar-soft' || this.variant === 'sidebar-shell'
            const effectiveOrientation = isSidebarLike ? 'vertical' : this.orientation
            return [
                `shadcn-tabs--${this.variant}`,
                `shadcn-tabs--${effectiveOrientation}`,
                this.flush ? 'shadcn-tabs--flush' : '',
            ].filter(Boolean).join(' ')
        },
        normalizedTabs(): TabItem[] {
            return this.tabs ?? []
        },
        activeTab(): TabItem | null {
            return this.normalizedTabs.find((t) => t.name === this.modelValue) ?? null
        },
        /**
         * Variants que renderizam headers de grupo (a partir do campo `tab.group`).
         * `'sidebar-soft'` e `'sidebar-shell'` suportam; novos variants podem opt-in adicionando o nome aqui.
         */
        showsGroupHeaders(): boolean {
            return this.variant === 'sidebar-soft' || this.variant === 'sidebar-shell'
        },
        /**
         * Lista "intercalada" pro template: para variants com agrupamento, injeta
         * `{ type: 'header', label }` antes de cada bloco com `group` distinto. Para os
         * demais, é só um espelho dos tabs originais (sem headers). Itens sem `group`
         * vão soltos no topo (sem header), mesmo em variants que suportam grupos.
         *
         * IMPORTANTE: a ordem dos `{ type: 'tab' }` aqui PRECISA bater com a ordem de
         * `normalizedTabs`, porque `triggerRefs` (preenchido só pelos `<button>`) é
         * indexado por `normalizedTabs.findIndex` em `focusTrigger`.
         */
        renderableItems(): Array<
            | { type: 'header'; label: string; key: string }
            | { type: 'tab'; tab: TabItem; key: string }
        > {
            if (!this.showsGroupHeaders) {
                return this.normalizedTabs.map((t) => ({
                    type: 'tab' as const,
                    tab: t,
                    key: String(t.name),
                }))
            }

            const out: Array<
                | { type: 'header'; label: string; key: string }
                | { type: 'tab'; tab: TabItem; key: string }
            > = []
            let currentGroup: string | null = null
            for (const tab of this.normalizedTabs) {
                const tabGroup = tab.group ?? null
                if (tabGroup && tabGroup !== currentGroup) {
                    out.push({
                        type: 'header',
                        label: tabGroup,
                        key: `__group__${tabGroup}`,
                    })
                    currentGroup = tabGroup
                } else if (!tabGroup) {
                    // Item sem grupo "quebra" o agrupamento — próximo item com grupo
                    // re-renderiza header. Útil pra "destacados" no topo da lista.
                    currentGroup = null
                }
                out.push({ type: 'tab', tab, key: String(tab.name) })
            }
            return out
        },
    },

    methods: {
        isActive(tab: TabItem): boolean {
            return tab.name === this.modelValue
        },
        /** keepAlive lazy: a tab já foi visitada ao menos uma vez? (controla o mount inicial).
         *  Tabs `eager` montam imediatamente, sem esperar a 1ª ativação. */
        wasActivated(tab: TabItem): boolean {
            return Boolean(tab.eager) || this.activatedTabNames.includes(String(tab.name))
        },
        isDisabled(tab: TabItem): boolean {
            return Boolean(tab.disabled)
        },
        triggerId(tab: TabItem): string {
            return `shadcn-tabs-${this.uid}-trigger-${String(tab.name)}`
        },
        panelId(tab: TabItem): string {
            return `shadcn-tabs-${this.uid}-panel-${String(tab.name)}`
        },
        select(tab: TabItem) {
            if (this.isDisabled(tab) || this.isActive(tab)) return
            this.$emit('update:modelValue', tab.name)
            this.$emit('change', tab.name)
        },

        /* ─── Keyboard navigation ─── */
        onKeydown(e: KeyboardEvent) {
            const enabledTabs = this.normalizedTabs.filter((t) => !this.isDisabled(t))
            if (!enabledTabs.length) return

            const currentIdx = enabledTabs.findIndex((t) => t.name === this.modelValue)
            const isVertical = this.variant === 'sidebar'
                || this.variant === 'sidebar-soft'
                || this.variant === 'sidebar-shell'
                || this.orientation === 'vertical'

            // Setas "next" — Direita em horizontal, Baixo em vertical
            const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'
            // Setas "prev" — Esquerda em horizontal, Cima em vertical
            const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft'

            if (e.key === nextKey) {
                e.preventDefault()
                const next = enabledTabs[(currentIdx + 1) % enabledTabs.length]
                this.select(next)
                this.focusTrigger(next)
                return
            }

            if (e.key === prevKey) {
                e.preventDefault()
                const prev = enabledTabs[(currentIdx - 1 + enabledTabs.length) % enabledTabs.length]
                this.select(prev)
                this.focusTrigger(prev)
                return
            }

            if (e.key === 'Home') {
                e.preventDefault()
                this.select(enabledTabs[0])
                this.focusTrigger(enabledTabs[0])
                return
            }

            if (e.key === 'End') {
                e.preventDefault()
                this.select(enabledTabs[enabledTabs.length - 1])
                this.focusTrigger(enabledTabs[enabledTabs.length - 1])
            }
        },

        focusTrigger(tab: TabItem) {
            this.$nextTick(() => {
                const refs = this.$refs.triggerRefs as HTMLElement[] | undefined
                if (!refs) return
                const tabIdx = this.normalizedTabs.findIndex((t) => t.name === tab.name)
                refs[tabIdx]?.focus?.()
            })
        },

        onFocusTrigger(_tab: TabItem) {
            // Hook reservado caso queiramos auto-select on-focus no futuro.
            // Hoje a seleção só acontece em click/Enter/Setas — estável.
        },
    },
} as Component
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════
   Container raiz — orientation horizontal/vertical
   ═══════════════════════════════════════════════════════════════════════ */
.shadcn-tabs {
    display: flex;
    gap: 16px;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Horizontal (default): tablist em cima, panel embaixo */
.shadcn-tabs--horizontal {
    flex-direction: column;
}

/* Vertical: tablist à esquerda, panel à direita */
.shadcn-tabs--vertical {
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
}

/*
 * Tablist em vertical não estica — ocupa só a largura mínima necessária pra caber
 * os items mais longos (`flex-shrink: 0`). Sem isso, o flex layout do root distribui
 * espaço igual entre tablist+panel — tablist fica gigante e panel esmagado.
 */
.shadcn-tabs--vertical>.shadcn-tabs__list {
    flex-shrink: 0;
}

.shadcn-tabs--vertical>.shadcn-tabs__panel {
    flex: 1 1 auto;
    min-width: 0;
}

/* ═══════════════════════════════════════════════════════════════════════
   Tab list (botões)
   ═══════════════════════════════════════════════════════════════════════ */
.shadcn-tabs__list {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

/*
 * IMPORTANTE: todos os seletores aqui usam `>` (child combinator) em vez de descendant
 * combinator. Isso é crítico porque `<ShadcnTabs>` pode ser ANINHADO (ex: tabs sidebar
 * com tabs boxed dentro de um dos panels). Sem o `>`, os estilos do tablist pai (vertical)
 * vazam pro tablist filho — a child variant ficaria vertical/empilhada quando deveria
 * ser horizontal/boxed.
 */

/* Variant `pills`: container com bg cinza, tab ativa branca com shadow */
.shadcn-tabs--pills>.shadcn-tabs__list {
    background: #f4f4f5;
    padding: 4px;
    border-radius: 8px;
    width: fit-content;
}

/* `flush`: zera a margin do tablist (inclusive a herdada de um wrapper pai via :deep) */
.shadcn-tabs--flush>.shadcn-tabs__list {
    margin: 0 !important;
}

/* Variant `underline`: sem container, gap maior, border-bottom global */
.shadcn-tabs--underline>.shadcn-tabs__list {
    gap: 0;
    border-bottom: 1px solid #e4e4e7;
    width: 100%;
    padding: 0;
    border-radius: 0;
    background: transparent;
}

/* Variant `boxed`: cada tab vira um card separado, sem container externo, gap 8px */
.shadcn-tabs--boxed>.shadcn-tabs__list {
    gap: 8px;
    background: transparent;
    padding: 0;
    border-radius: 0;
    flex-wrap: wrap;
}

/*
 * Variant `sidebar`: list vertical com largura intrínseca (do item mais longo).
 * `width: max-content` faz o tablist ter EXATAMENTE a largura necessária pros menus —
 * nem mais, nem menos. Combinado com `flex-shrink: 0` (em `.shadcn-tabs--vertical`),
 * a sidebar fica "ajustada" ao conteúdo e o panel ocupa todo o resto da largura.
 */
.shadcn-tabs--sidebar>.shadcn-tabs__list {
    flex-direction: column;
    align-items: stretch;
    width: max-content;
    gap: 4px;
    background: transparent;
    padding: 0;
    border-radius: 0;
}

/* Quando a orientation é vertical em outras variants, força o tablist coluna */
.shadcn-tabs--vertical>.shadcn-tabs__list {
    flex-direction: column;
    align-items: stretch;
}

/* Em vertical com variant `pills`, container com largura intrínseca também */
.shadcn-tabs--vertical.shadcn-tabs--pills>.shadcn-tabs__list {
    width: max-content;
}

/* Em vertical com variant `underline`, border vai pra LADO em vez de bottom */
.shadcn-tabs--vertical.shadcn-tabs--underline>.shadcn-tabs__list {
    border-bottom: none;
    border-right: 1px solid #e4e4e7;
}

/* ═══════════════════════════════════════════════════════════════════════
   Trigger (cada botão de tab)
   ═══════════════════════════════════════════════════════════════════════ */
.shadcn-tabs__trigger {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    color: #71717a;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
}

.shadcn-tabs__trigger:hover:not(.is-active):not(.is-disabled) {
    color: #18181b;
}

.shadcn-tabs__trigger:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 2px;
    z-index: 1;
}

.shadcn-tabs__trigger.is-disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

/* ─── Variant `pills` — tab ativa com bg branco + shadow ─── */
.shadcn-tabs--pills>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active {
    background: #ffffff;
    color: #09090b;
    font-weight: 600;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* ─── Variant `underline` — linha embaixo da ativa ─── */
.shadcn-tabs--underline>.shadcn-tabs__list>.shadcn-tabs__trigger {
    padding: 10px 16px;
    border-radius: 0;
    margin-bottom: -1px;
    /* sobrepõe a border-bottom do list */
    border-bottom: 2px solid transparent;
}

.shadcn-tabs--underline>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active {
    color: #09090b;
    font-weight: 600;
    border-bottom-color: #18181b;
}

/* ─── Variant `boxed` — card separado, ativa preta sólida ─── */
.shadcn-tabs--boxed>.shadcn-tabs__list>.shadcn-tabs__trigger {
    padding: 8px 16px;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    color: #71717a;
    font-weight: 500;
}

.shadcn-tabs--boxed>.shadcn-tabs__list>.shadcn-tabs__trigger:hover:not(.is-active):not(.is-disabled) {
    background: #fafafa;
    border-color: #d4d4d8;
    color: #18181b;
}

.shadcn-tabs--boxed>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active {
    background: #18181b;
    border-color: #18181b;
    color: #ffffff;
    font-weight: 600;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* Badge na variant boxed precisa de ajuste pra contraste com o bg preto da ativa */
.shadcn-tabs--boxed>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active .shadcn-tabs__trigger-badge {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
}

/* ─── Variant `sidebar` — list vertical estilo menu nav ─── */
.shadcn-tabs--sidebar>.shadcn-tabs__list>.shadcn-tabs__trigger {
    /*
     * `width: 100%` aqui faz cada item preencher a largura do tablist (que é `max-content`,
     * ou seja, do item mais longo). Resultado: todos os items ficam alinhados à direita
     * (badges) e à esquerda (texto), com mesma largura visual.
     */
    width: 100%;
    justify-content: flex-start;
    /* texto/icone alinhado à esquerda */
    padding: 11px 14px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #18181b;
    font-weight: 500;
    text-align: left;
    position: relative;
}

/*
 * Hover do sidebar: bg `#e4e4e7` (zinc-200, mais visível que zinc-100 contra o fundo
 * cinza claro da página). `cursor: pointer` reforçado pra evitar herdar `default` em
 * algum container ancestral. Transição já vem da regra base do `__trigger`.
 */
.shadcn-tabs--sidebar>.shadcn-tabs__list>.shadcn-tabs__trigger:hover:not(.is-active):not(.is-disabled) {
    background: #e4e4e7;
    color: #09090b;
    cursor: pointer;
}

.shadcn-tabs--sidebar>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active {
    background: #18181b;
    color: #ffffff;
    font-weight: 600;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* Indicator chevron ▶ à esquerda da tab ativa (estilo "selected nav item") */
.shadcn-tabs--sidebar>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid #ffffff;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    margin-right: 4px;
    flex-shrink: 0;
}

/* Badge na variant sidebar (ativa: branco semitransparente; inativa: zinc).
   `.shadcn-tabs__trigger-badge` é descendente do trigger (não filho direto do list),
   por isso usamos descendant combinator a partir do trigger escopado. */
.shadcn-tabs--sidebar>.shadcn-tabs__list>.shadcn-tabs__trigger>.shadcn-tabs__trigger-badge {
    margin-left: auto;
    /* empurra badge pra direita do item */
}

.shadcn-tabs--sidebar>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active>.shadcn-tabs__trigger-badge {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
}

/* ═══════════════════════════════════════════════════════════════════════
   Ícone + Badge dentro do trigger
   ═══════════════════════════════════════════════════════════════════════ */
.shadcn-tabs__trigger-icon {
    font-size: 12px;
    line-height: 1;
}

.shadcn-tabs__trigger-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    font-size: 10.5px;
    font-weight: 600;
    line-height: 1;
    border-radius: 9999px;
    background: #e4e4e7;
    color: #18181b;
    transition: background-color 150ms ease, color 150ms ease;
}

.shadcn-tabs__trigger.is-active .shadcn-tabs__trigger-badge {
    background: #18181b;
    color: #ffffff;
}

/* ═══════════════════════════════════════════════════════════════════════
   Panel (conteúdo da tab ativa)
   ═══════════════════════════════════════════════════════════════════════ */
.shadcn-tabs__panel {
    outline: none;
}

.shadcn-tabs__panel:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 4px;
    border-radius: 4px;
}

/* ═══════════════════════════════════════════════════════════════════════
   Variant `sidebar-soft` — sidebar refinada (Aurora)
   ═══════════════════════════════════════════════════════════════════════
   Card creme/branco com cantos arredondados, agrupamento via `tab.group`,
   active com gradient ink → graphite e ícone em cor de acento.

   CSS vars overridáveis (no caller ou em :root pra theming global):
   - `--shadcn-tabs-accent`        cor do ícone ativo (default sky `#7eb6f0`,
                                   família do navy `#365c86` do `TopMenu.vue`
                                   mas claro o suficiente pra dar contraste
                                   ≈ 8.5:1 contra o gradient ink-→-graphite
                                   do estado ativo)
   - `--shadcn-tabs-soft-bg`       fundo do card (default near-white)
   - `--shadcn-tabs-soft-border`   borda do card (default zinc-200/8%)
   - `--shadcn-tabs-soft-active`   gradient da tab ativa (default ink→graphite)
   - `--shadcn-tabs-soft-text`     cor do texto inativo (default zinc-700)
   - `--shadcn-tabs-soft-text-muted` cor dos group headers (default zinc-400)
   ═══════════════════════════════════════════════════════════════════════ */
.shadcn-tabs--sidebar-soft {
    --shadcn-tabs-accent: #7eb6f0;
    --shadcn-tabs-soft-bg: #ffffff;
    --shadcn-tabs-soft-border: rgba(21, 19, 26, 0.07);
    --shadcn-tabs-soft-active: linear-gradient(135deg, #18181b 0%, #28232f 100%);
    --shadcn-tabs-soft-text: #000;
    --shadcn-tabs-soft-text-muted: #a1a1aa;
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list {
    flex-direction: column;
    align-items: stretch;
    width: max-content;
    min-width: 220px;
    gap: 2px;
    padding: 12px 10px;
    background: var(--shadcn-tabs-soft-bg);
    border: 1px solid var(--shadcn-tabs-soft-border);
    border-radius: 18px;
    /* Sombra sutil pra "elevar" o card sem competir com o conteúdo da página */
    box-shadow:
        0 1px 2px rgba(21, 19, 26, 0.03),
        0 12px 32px -20px rgba(21, 19, 26, 0.08);
}

/* Group headers — pequenos, mono, uppercase */
.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__group-header {
    font-family: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--shadcn-tabs-soft-text-muted);
    padding: 14px 14px 6px;
    user-select: none;
}

/* Primeiro group header não precisa de top-padding extra */
.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__group-header:first-child {
    padding-top: 4px;
}

/* Triggers da sidebar-soft */
.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger {
    width: 100%;
    justify-content: flex-start;
    padding: 9px 12px;
    gap: 11px;
    background: transparent;
    border: none;
    border-radius: 10px;
    color: var(--shadcn-tabs-soft-text);
    font-weight: 500;
    font-size: 13px;
    text-align: left;
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger>.shadcn-tabs__trigger-icon {
    width: 16px;
    font-size: 13px;
    opacity: 0.7;
    text-align: center;
    flex-shrink: 0;
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger:hover:not(.is-active):not(.is-disabled) {
    background: rgba(21, 19, 26, 0.04);
    color: #18181b;
    cursor: pointer;
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger:hover:not(.is-active):not(.is-disabled)>.shadcn-tabs__trigger-icon {
    opacity: 1;
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active {
    background: var(--shadcn-tabs-soft-active);
    color: #ffffff;
    font-weight: 600;
    box-shadow:
        0 8px 22px -10px rgba(21, 19, 26, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active>.shadcn-tabs__trigger-icon {
    color: var(--shadcn-tabs-accent);
    opacity: 1;
}

/* Tone `danger` — vermelho suave, vira destaque ao hover */
.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:not(.is-active) {
    color: #b91c1c;
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:not(.is-active)>.shadcn-tabs__trigger-icon {
    color: #ef4444;
    opacity: 0.85;
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:hover:not(.is-active):not(.is-disabled) {
    background: rgba(239, 68, 68, 0.08);
    color: #991b1b;
}

/* Quando danger fica ativo, mantém o ink bg geral mas o ícone vai pro vermelho
   pra preservar o sinal de "área sensível" mesmo em estado selecionado. */
.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger.is-active>.shadcn-tabs__trigger-icon {
    color: #fca5a5;
}

/* Badges da sidebar-soft: empurra pra direita, estiliza com tinta de acento
   (navy PopGas) quando inativo, branco-translúcido quando ativo. */
.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger>.shadcn-tabs__trigger-badge {
    margin-left: auto;
    background: rgba(54, 92, 134, 0.12);
    color: #1f4068;
    font-weight: 700;
}

.shadcn-tabs--sidebar-soft>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active>.shadcn-tabs__trigger-badge {
    background: rgba(255, 255, 255, 0.18);
    color: #ffffff;
}

/* ═══════════════════════════════════════════════════════════════════════
   Variant `sidebar-shell` — sidebar + conteúdo num shell unificado (Cohesão)
   ═══════════════════════════════════════════════════════════════════════
   Estende o conceito de `sidebar-soft`: ao invés de a sidebar ser um card
   flutuante isolado do conteúdo, AMBOS vivem dentro do mesmo card-shell
   externo (mesma borda, mesmo raio, mesma sombra). Uma divisória vertical
   sutil separa as duas colunas.

   Diferença visual chave vs `sidebar-soft`:
   - sidebar-soft: card-sidebar à esquerda + área de conteúdo "naked" à direita
   - sidebar-shell: um único card envolve sidebar + conteúdo; sidebar perde
     sombra/borda própria; conteúdo herda o background do shell

   Quando usar:
   - Telas tipo "workspace" onde a página inteira é o módulo (ex: Cadastros
     de Logística — Empresas/Áreas/Veículos/Feriados)
   - Quando a sidebar é parte estrutural da página, não navegação auxiliar

   CSS vars (mesmas do sidebar-soft, herda os defaults):
   - `--shadcn-tabs-accent`       cor do ícone ativo
   - `--shadcn-tabs-soft-bg`      fundo do shell
   - `--shadcn-tabs-soft-border`  borda externa do shell
   - `--shadcn-tabs-soft-active`  gradient da tab ativa
   - `--shadcn-tabs-soft-text`    texto inativo
   - `--shadcn-tabs-soft-text-muted` group headers
   ═══════════════════════════════════════════════════════════════════════ */
.shadcn-tabs--sidebar-shell {
    --shadcn-tabs-accent: #7eb6f0;
    --shadcn-tabs-soft-bg: #ffffff;
    --shadcn-tabs-soft-border: rgba(21, 19, 26, 0.08);
    --shadcn-tabs-soft-active: linear-gradient(135deg, #18181b 0%, #28232f 100%);
    --shadcn-tabs-soft-text: #4a4554;
    --shadcn-tabs-soft-text-muted: #a1a1aa;
    min-height: 100vh;

    /* O root vira o shell — borda, raio e sombra externos */
    background: var(--shadcn-tabs-soft-bg);
    border: 1px solid var(--shadcn-tabs-soft-border);
    border-radius: 16px;
    box-shadow:
        0 1px 2px rgba(21, 19, 26, 0.04),
        0 18px 44px -22px rgba(21, 19, 26, 0.10);
    overflow: hidden;
    /* Override do gap padrão do root vertical — colunas ficam coladas, divisória é via border */
    gap: 0;
    align-items: stretch;
}

/* Tablist é a coluna esquerda — sem card próprio, sem sombra; borda direita é o divisor */
.shadcn-tabs--sidebar-shell>.shadcn-tabs__list {
    flex-direction: column;
    align-items: stretch;
    width: max-content;
    min-width: 220px;
    gap: 2px;
    padding: 16px 12px;
    background: #fafaf8;
    border: none;
    border-right: 1px solid var(--shadcn-tabs-soft-border);
    border-radius: 0;
    box-shadow: none;
}

/* Group header — mesma estética do sidebar-soft */
.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__group-header {
    font-family: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--shadcn-tabs-soft-text-muted);
    padding: 14px 14px 6px;
    user-select: none;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__group-header:first-child {
    padding-top: 4px;
}

/* Triggers — idênticos ao sidebar-soft (mantém consistência de comportamento) */
.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger {
    width: 100%;
    justify-content: flex-start;
    padding: 9px 12px;
    gap: 11px;
    background: transparent;
    border: none;
    border-radius: 10px;
    color: var(--shadcn-tabs-soft-text);
    font-weight: 500;
    font-size: 13px;
    text-align: left;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger>.shadcn-tabs__trigger-icon {
    width: 16px;
    font-size: 13px;
    opacity: 0.7;
    text-align: center;
    flex-shrink: 0;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger:hover:not(.is-active):not(.is-disabled) {
    background: rgba(21, 19, 26, 0.04);
    color: #18181b;
    cursor: pointer;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger:hover:not(.is-active):not(.is-disabled)>.shadcn-tabs__trigger-icon {
    opacity: 1;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active {
    background: var(--shadcn-tabs-soft-active);
    color: #ffffff;
    font-weight: 600;
    box-shadow:
        0 8px 22px -10px rgba(21, 19, 26, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active>.shadcn-tabs__trigger-icon {
    color: var(--shadcn-tabs-accent);
    opacity: 1;
}

/* Tone danger — herda da sidebar-soft */
.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:not(.is-active) {
    color: #b91c1c;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:not(.is-active)>.shadcn-tabs__trigger-icon {
    color: #ef4444;
    opacity: 0.85;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:hover:not(.is-active):not(.is-disabled) {
    background: rgba(239, 68, 68, 0.08);
    color: #991b1b;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger.is-active>.shadcn-tabs__trigger-icon {
    color: #fca5a5;
}

/* Badges */
.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger>.shadcn-tabs__trigger-badge {
    margin-left: auto;
    background: rgba(54, 92, 134, 0.12);
    color: #1f4068;
    font-weight: 700;
}

.shadcn-tabs--sidebar-shell>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active>.shadcn-tabs__trigger-badge {
    background: #fff;
    color: #26456c;
}

/* Panel — coluna direita, sem padding externo (o consumidor controla espaçamento interno) */
.shadcn-tabs--sidebar-shell>.shadcn-tabs__panel {
    background: var(--shadcn-tabs-soft-bg);
    padding: 0;
    min-width: 0;
}

/* ═══════════════════════════════════════════════════════════════════════
   Variant `segmented` — pills refinadas (Aurora)
   ═══════════════════════════════════════════════════════════════════════
   Container `rgba(0,0,0,.04)` com borda fininha e cantos 12px. Tab ativa
   com bg branco + sombra dupla (sutil interna + difusa externa). Ícone
   ativo recebe cor de acento (default navy PopGas — mesmo `#365c86` do
   hover dos botões do TopMenu). Boa pra sub-tabs em telas de detalhe
   que precisam de visual leve mas distinto.

   CSS vars:
   - `--shadcn-tabs-accent`             cor do ícone ativo (default navy)
   - `--shadcn-tabs-segmented-bg`       fundo do container
   - `--shadcn-tabs-segmented-border`   borda do container
   ═══════════════════════════════════════════════════════════════════════ */
.shadcn-tabs--segmented {
    --shadcn-tabs-accent: #365c86;
    --shadcn-tabs-segmented-bg: rgba(21, 19, 26, 0.04);
    --shadcn-tabs-segmented-border: rgba(21, 19, 26, 0.06);
}

.shadcn-tabs--segmented>.shadcn-tabs__list {
    display: inline-flex;
    gap: 2px;
    padding: 4px;
    background: var(--shadcn-tabs-segmented-bg);
    border: 1px solid var(--shadcn-tabs-segmented-border);
    border-radius: 12px;
    width: fit-content;
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger {
    padding: 8px 14px;
    gap: 8px;
    border-radius: 8px;
    color: #52525b;
    font-weight: 500;
    background: transparent;
    border: none;
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger>.shadcn-tabs__trigger-icon {
    font-size: 12px;
    opacity: 0.7;
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger:hover:not(.is-active):not(.is-disabled) {
    color: #18181b;
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active {
    background: #ffffff;
    color: #09090b;
    font-weight: 600;
    /* Dual-layer: sombra dura curta pra "destacar" + sombra difusa pra "flutuar" */
    box-shadow:
        0 1px 2px rgba(21, 19, 26, 0.06),
        0 4px 12px -4px rgba(21, 19, 26, 0.10);
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active>.shadcn-tabs__trigger-icon {
    color: var(--shadcn-tabs-accent);
    opacity: 1;
}

/* Badge no segmented — segue o padrão dos demais variants, mas com tinta de acento (navy) */
.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-active>.shadcn-tabs__trigger-badge {
    background: rgba(54, 92, 134, 0.14);
    color: #1f4068;
}

/* ─── Tone `danger` no variant `segmented` ───────────────────────────────────
   Escopo ESTRITO: só `.shadcn-tabs--segmented` + `.is-tone-danger`.
   Nenhum outro variant ou tab é afetado.
   Cores derivadas da paleta danger usada nos sidebar variants:
     inativo  → texto #b91c1c (red-700), ícone #ef4444 (red-500, 85% op)
     hover    → bg rgba(239,68,68,.08), texto #991b1b (red-800)
     ativo    → texto #991b1b (red-800), ícone #dc2626 (red-600), bg levemente rosado
   ─────────────────────────────────────────────────────────────────────────── */
.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:not(.is-active) {
    color: #b91c1c;
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:not(.is-active)>.shadcn-tabs__trigger-icon {
    color: #ef4444;
    opacity: 0.85;
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger:hover:not(.is-active):not(.is-disabled) {
    background: rgba(239, 68, 68, 0.08);
    color: #991b1b;
}

/* Ativo danger no segmented: bg branco rosado + texto e ícone vermelhos */
.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger.is-active {
    background: #fff1f2;
    color: #991b1b;
    box-shadow:
        0 1px 2px rgba(220, 38, 38, 0.10),
        0 4px 12px -4px rgba(220, 38, 38, 0.14);
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger.is-active>.shadcn-tabs__trigger-icon {
    color: #dc2626;
    opacity: 1;
}

.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger.is-tone-danger.is-active>.shadcn-tabs__trigger-badge {
    background: rgba(220, 38, 38, 0.12);
    color: #991b1b;
}

@media (max-width: 640px) {

    /* Em mobile: tabs horizontais permitem wrap; vertical mantém comportamento (sidebar
       em mobile geralmente vai pra cima do conteúdo via media query do caller) */
    .shadcn-tabs--horizontal>.shadcn-tabs__list {
        flex-wrap: wrap;
    }

    .shadcn-tabs--horizontal.shadcn-tabs--pills>.shadcn-tabs__list {
        width: 100%;
    }

    .shadcn-tabs--horizontal>.shadcn-tabs__list>.shadcn-tabs__trigger {
        flex: 1 1 auto;
        justify-content: center;
    }

    /* `segmented` em mobile estica os triggers pra ocupar a largura toda */
    .shadcn-tabs--horizontal.shadcn-tabs--segmented>.shadcn-tabs__list {
        width: 100%;
        display: flex;
    }

    .shadcn-tabs--horizontal.shadcn-tabs--segmented>.shadcn-tabs__list>.shadcn-tabs__trigger {
        flex: 1 1 auto;
        justify-content: center;
    }
}
</style>
