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
