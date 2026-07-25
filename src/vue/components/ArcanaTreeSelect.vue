<template>
    <div class="arcana-tree-select" :class="rootClasses">
        <!--
            Trigger (modo múltiplo): caixa de tags removíveis. É uma <div> (e não
            <button>) porque cada tag traz seu próprio <button> de remover — botão
            dentro de botão é HTML inválido.
        -->
        <div
            v-if="multiple"
            ref="triggerRef"
            class="arcana-tree-select__trigger arcana-tree-select__trigger--multiple"
            :class="triggerClasses"
            role="combobox"
            aria-haspopup="tree"
            :aria-expanded="isOpen"
            :aria-label="ariaLabel"
            :aria-disabled="disabled"
            :tabindex="disabled ? -1 : 0"
            @click="toggle"
            @keydown="onTriggerKeydown"
        >
            <span class="arcana-tree-select__tags">
                <span
                    v-for="id in selectedIds"
                    :key="String(id)"
                    class="arcana-tree-select__tag"
                >
                    <span class="arcana-tree-select__tag-label">{{ labelFor(id) }}</span>
                    <button
                        v-if="!disabled"
                        type="button"
                        class="arcana-tree-select__tag-remove"
                        :aria-label="`Remover ${labelFor(id)}`"
                        @click.stop="removeValue(id)"
                    >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </span>
                <span v-if="!selectedIds.length" class="arcana-tree-select__placeholder">{{ placeholder }}</span>
            </span>
            <span
                v-if="canClear"
                class="arcana-tree-select__clear"
                role="button"
                tabindex="-1"
                aria-label="Limpar"
                @click.stop="clear"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </span>
            <svg class="arcana-tree-select__caret" :class="{ 'is-open': isOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
        </div>

        <!-- Trigger (modo simples): botão com o rótulo do nó selecionado. -->
        <button
            v-else
            ref="triggerRef"
            type="button"
            class="arcana-tree-select__trigger"
            :class="triggerClasses"
            :disabled="disabled"
            aria-haspopup="tree"
            :aria-expanded="isOpen"
            :aria-label="ariaLabel"
            @click="toggle"
            @keydown="onTriggerKeydown"
        >
            <span
                class="arcana-tree-select__label"
                :class="{ 'arcana-tree-select__label--placeholder': !hasValue }"
            >{{ displayLabel }}</span>
            <span
                v-if="canClear"
                class="arcana-tree-select__clear"
                role="button"
                tabindex="-1"
                aria-label="Limpar"
                @click.stop="clear"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </span>
            <svg class="arcana-tree-select__caret" :class="{ 'is-open': isOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
        </button>

        <!--
            Painel teleportado pro <body> (position: fixed via `placePanel`) pra
            escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
        -->
        <Teleport to="body">
            <Transition name="arcana-tree-select-fade">
                <div
                    v-if="isOpen"
                    ref="panelRef"
                    class="arcana-tree-select__panel"
                    :style="panelStyle"
                    :aria-label="ariaLabel"
                    tabindex="-1"
                    @keydown="onPanelKeydown"
                >
                    <div class="arcana-tree-select__search">
                        <svg class="arcana-tree-select__search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input
                            ref="searchRef"
                            v-model="searchTerm"
                            type="search"
                            name="arcana-tree-select-search"
                            class="arcana-tree-select__search-input"
                            :placeholder="searchPlaceholder"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="off"
                            spellcheck="false"
                            data-lpignore="true"
                            data-1p-ignore
                            data-form-type="other"
                        />
                    </div>

                    <div class="arcana-tree-select__tree" role="tree">
                        <div
                            v-for="row in visibleRows"
                            :key="row.key"
                            class="arcana-tree-select__node"
                            :class="{
                                'is-selected': row.selected,
                                'is-selectable': row.selectable,
                                'is-branch': row.hasChildren,
                                'is-disabled': row.disabled,
                            }"
                            role="treeitem"
                            :aria-level="row.level + 1"
                            :aria-expanded="row.hasChildren ? row.expanded : undefined"
                            :aria-selected="row.selected"
                            :aria-disabled="row.disabled || undefined"
                            @click="onNodeClick(row)"
                        >
                            <span
                                class="arcana-tree-select__indent"
                                :style="{ width: `${row.level * 14}px` }"
                                aria-hidden="true"
                            ></span>

                            <!-- Chevron: só em nós com filhos; clique expande sem selecionar. -->
                            <span
                                v-if="row.hasChildren"
                                class="arcana-tree-select__chevron"
                                :class="{ 'is-expanded': row.expanded }"
                                role="button"
                                tabindex="-1"
                                :aria-label="row.expanded ? 'Recolher' : 'Expandir'"
                                @click.stop="toggleExpand(row.key)"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                            <span v-else class="arcana-tree-select__chevron arcana-tree-select__chevron--empty" aria-hidden="true"></span>

                            <!-- Pasta (nó com filhos) vs documento (folha) -->
                            <svg
                                v-if="row.hasChildren"
                                class="arcana-tree-select__icon arcana-tree-select__icon--folder"
                                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                            ><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                            <svg
                                v-else
                                class="arcana-tree-select__icon arcana-tree-select__icon--leaf"
                                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                            ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>

                            <!-- eslint-disable-next-line vue/no-v-html — conteúdo já escapado em `highlight()` -->
                            <span class="arcana-tree-select__node-label" v-html="row.html"></span>

                            <svg
                                v-if="row.selected"
                                class="arcana-tree-select__check"
                                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                            ><polyline points="20 6 9 17 4 12" /></svg>
                        </div>

                        <div v-if="!visibleRows.length" class="arcana-tree-select__empty">{{ emptyText }}</div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import { placePanel } from "../../core/popover"

/**
 * `<ArcanaTreeSelect>` — select hierárquico (árvore) arcana-style, sem Element Plus
 * e agnóstico de domínio: os nós chegam prontos pela prop `options`, o componente
 * nunca busca dados por conta própria.
 *
 * Estrutura: um trigger (input-like no modo simples, caixa de tags no `multiple`)
 * que abre um painel teleportado pro `<body>` com um campo de busca + a árvore
 * navegável. Clicar num nó seleciona; num nó não-selecionável, apenas expande.
 *
 * API:
 * ────
 * - `modelValue` (v-model) — `string | number | null` (simples) ou
 *   `(string | number)[]` (`multiple`).
 * - `options` — `TreeSelectNode[]` (`{ id, name, children?, disabled? }`).
 * - `multiple` — tags removíveis no trigger; clique faz toggle sem fechar.
 * - `allowParentSelection` — quando `false` (default), só folhas selecionam e
 *   clicar num nó-pai expande/recolhe. Quando `true`, qualquer nó seleciona
 *   (a expansão fica a cargo do chevron).
 * - `disabled`, `placeholder`, `searchPlaceholder`, `emptyText`,
 *   `clearable` (default `true`), `size` (`'sm' | 'md' | 'lg'`), `ariaLabel`.
 *
 * Emite: `update:modelValue`, `change` — sempre com o valor completo
 * (id no modo simples / array de ids no `multiple`; `null` / `[]` ao limpar).
 *
 * Busca:
 * ──────
 * Filtra a árvore preservando os ancestrais dos matches, auto-expande tudo
 * enquanto há termo, destaca o trecho encontrado com `<mark>` (texto escapado
 * antes de virar HTML) e mostra `emptyText` quando nada casa. A comparação
 * ignora acentos e caixa.
 *
 * Posicionamento:
 * ───────────────
 * `placePanel` (core/popover) com `matchWidth`, auto-flip pra cima quando não
 * cabe abaixo. Fecha em clique-fora, `Escape` e scroll externo; reposiciona no
 * resize.
 *
 * @example
 * <ArcanaTreeSelect
 *   v-model="costCenterId"
 *   :options="tree"
 *   placeholder="Selecione um centro de custo…"
 *   @change="onChange"
 * />
 *
 * @example <caption>Múltiplo, permitindo selecionar nós-pai</caption>
 * <ArcanaTreeSelect v-model="ids" :options="tree" multiple allow-parent-selection />
 */

/** Nó da árvore. `children` vazio/ausente ⇒ folha. */
export interface TreeSelectNode {
    id: string | number
    name: string
    children?: TreeSelectNode[]
    disabled?: boolean
}

type TreeSelectValue = string | number | null | (string | number)[]

/** Linha achatada da árvore, pronta pro `v-for` (a recursão vira profundidade + indent). */
interface TreeRow {
    key: string
    node: TreeSelectNode
    level: number
    hasChildren: boolean
    expanded: boolean
    selectable: boolean
    selected: boolean
    disabled: boolean
    html: string
}

const HTML_ESCAPES: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
}

/** Painel estimado antes da primeira medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 280, height: 340 }

export default defineComponent({
    name: "ArcanaTreeSelect",

    emits: ["update:modelValue", "change"],

    props: {
        modelValue: {
            type: [String, Number, Array, null] as PropType<TreeSelectValue>,
            default: null,
        },
        options: {
            type: Array as PropType<TreeSelectNode[]>,
            default: () => [],
        },
        /** Seleção múltipla: `modelValue` vira array e o trigger mostra tags removíveis. */
        multiple: {
            type: Boolean,
            default: false,
        },
        /** `false` (default): nós com filhos apenas expandem; só folhas selecionam. */
        allowParentSelection: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "Selecione…",
        },
        searchPlaceholder: {
            type: String,
            default: "Buscar...",
        },
        emptyText: {
            type: String,
            default: "Nenhum resultado encontrado",
        },
        /** Mostra o X de limpar no hover do trigger. */
        clearable: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String as PropType<"sm" | "md" | "lg">,
            default: "md",
            validator: (value: string) => ["sm", "md", "lg"].includes(value),
        },
        ariaLabel: {
            type: String,
            default: undefined,
        },
    },

    data() {
        return {
            isOpen: false,
            searchTerm: "",
            expandedKeys: [] as string[],
            panelStyle: {} as Record<string, string>,
        }
    },

    computed: {
        rootClasses(): Record<string, boolean> {
            return {
                [`arcana-tree-select--${this.size}`]: true,
                "arcana-tree-select--disabled": this.disabled,
                "arcana-tree-select--open": this.isOpen,
                "arcana-tree-select--multiple": this.multiple,
            }
        },

        triggerClasses(): Record<string, boolean> {
            return {
                "arcana-tree-select__trigger--open": this.isOpen,
                "arcana-tree-select__trigger--has-clear": this.canClear,
                "arcana-tree-select__trigger--disabled": this.disabled,
            }
        },

        isSearching(): boolean {
            return this.searchTerm.trim().length > 0
        },

        selectedIds(): (string | number)[] {
            const value = this.modelValue
            if (Array.isArray(value)) return value
            if (value === null || value === undefined || value === "") return []
            return [value]
        },

        hasValue(): boolean {
            return this.selectedIds.length > 0
        },

        canClear(): boolean {
            return this.clearable && !this.disabled && this.hasValue
        },

        displayLabel(): string {
            if (!this.hasValue) return this.placeholder
            return this.selectedIds.map((id) => this.labelFor(id)).join(", ")
        },

        /** Árvore após a busca: mantém matches + todos os seus ancestrais. */
        filteredOptions(): TreeSelectNode[] {
            if (!this.isSearching) return this.options
            return this.filterTree(this.options, this.normalize(this.searchTerm))
        },

        /** Árvore achatada em linhas visíveis (respeita expandido/recolhido). */
        visibleRows(): TreeRow[] {
            const rows: TreeRow[] = []
            const walk = (nodes: TreeSelectNode[], level: number) => {
                for (const node of nodes) {
                    const key = String(node.id)
                    const hasChildren = Boolean(node.children && node.children.length)
                    const expanded = this.isSearching || this.expandedKeys.includes(key)
                    const disabled = Boolean(node.disabled)

                    rows.push({
                        key,
                        node,
                        level,
                        hasChildren,
                        expanded,
                        disabled,
                        selectable: !disabled && (!hasChildren || this.allowParentSelection),
                        selected: this.isSelected(node.id),
                        html: this.highlight(node.name),
                    })

                    if (hasChildren && expanded) walk(node.children as TreeSelectNode[], level + 1)
                }
            }
            walk(this.filteredOptions, 0)
            return rows
        },
    },

    watch: {
        modelValue() {
            if (this.isOpen) this.expandToValue()
        },
        searchTerm() {
            // Altura do painel muda com o filtro → recalcula a posição.
            this.$nextTick(() => this.reposition())
        },
    },

    methods: {
        /* ─────────────────────────── helpers de árvore ─────────────────────── */

        /** Ids podem chegar como string ou number vindos de APIs distintas. */
        sameId(a: string | number, b: string | number): boolean {
            return String(a) === String(b)
        },

        findNode(nodes: TreeSelectNode[], id: string | number): TreeSelectNode | null {
            for (const node of nodes) {
                if (this.sameId(node.id, id)) return node
                if (node.children && node.children.length) {
                    const found = this.findNode(node.children, id)
                    if (found) return found
                }
            }
            return null
        },

        /** Chaves dos ancestrais de `id` (exclui o próprio nó). `null` se não achar. */
        pathToId(nodes: TreeSelectNode[], id: string | number, acc: string[] = []): string[] | null {
            for (const node of nodes) {
                if (this.sameId(node.id, id)) return acc
                if (node.children && node.children.length) {
                    const found = this.pathToId(node.children, id, [...acc, String(node.id)])
                    if (found) return found
                }
            }
            return null
        },

        /** Rótulo do id; cai pro próprio id quando o nó ainda não está em `options`. */
        labelFor(id: string | number): string {
            const node = this.findNode(this.options, id)
            return node ? node.name : String(id)
        },

        isSelected(id: string | number): boolean {
            return this.selectedIds.some((selected) => this.sameId(selected, id))
        },

        normalize(text: string): string {
            return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        },

        filterTree(nodes: TreeSelectNode[], query: string): TreeSelectNode[] {
            const result: TreeSelectNode[] = []
            for (const node of nodes) {
                const matches = this.normalize(node.name).includes(query)
                const children = node.children && node.children.length
                    ? this.filterTree(node.children, query)
                    : []

                if (matches || children.length) {
                    result.push({
                        ...node,
                        // Nó que casa sozinho mantém a subárvore inteira; caso contrário
                        // mostra só o caminho até os descendentes que casaram.
                        children: children.length ? children : (matches ? node.children : []),
                    })
                }
            }
            return result
        },

        escapeHtml(text: string): string {
            return text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
        },

        /** Escapa o rótulo e envolve os trechos que casam com a busca em `<mark>`. */
        highlight(text: string): string {
            const term = this.searchTerm.trim()
            if (!term) return this.escapeHtml(text)

            const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
            let out = ""
            let last = 0
            let match: RegExpExecArray | null

            while ((match = regex.exec(text)) !== null) {
                if (!match[0].length) { regex.lastIndex++; continue }
                out += this.escapeHtml(text.slice(last, match.index))
                out += `<mark class="arcana-tree-select__mark">${this.escapeHtml(match[0])}</mark>`
                last = match.index + match[0].length
            }
            return out + this.escapeHtml(text.slice(last))
        },

        /* ─────────────────────────── expansão ─────────────────────────────── */

        toggleExpand(key: string) {
            const index = this.expandedKeys.indexOf(key)
            if (index >= 0) this.expandedKeys.splice(index, 1)
            else this.expandedKeys.push(key)
            this.$nextTick(() => this.reposition())
        },

        /** Abre o caminho até cada valor selecionado (mantém o que já estava aberto). */
        expandToValue() {
            const keys = new Set(this.expandedKeys)
            for (const id of this.selectedIds) {
                const path = this.pathToId(this.options, id)
                if (path) path.forEach((key) => keys.add(key))
            }
            this.expandedKeys = Array.from(keys)
        },

        /* ─────────────────────────── seleção ──────────────────────────────── */

        emitValue(value: TreeSelectValue) {
            this.$emit("update:modelValue", value)
            this.$emit("change", value)
        },

        onNodeClick(row: TreeRow) {
            if (!row.selectable) {
                if (row.hasChildren) this.toggleExpand(row.key)
                return
            }

            if (this.multiple) {
                const current = [...this.selectedIds]
                const index = current.findIndex((id) => this.sameId(id, row.node.id))
                if (index >= 0) current.splice(index, 1)
                else current.push(row.node.id)
                this.emitValue(current)
                this.$nextTick(() => this.reposition())
                return
            }

            this.emitValue(row.node.id)
            this.close()
        },

        removeValue(id: string | number) {
            if (this.disabled) return
            this.emitValue(this.selectedIds.filter((selected) => !this.sameId(selected, id)))
        },

        clear() {
            if (this.disabled) return
            this.emitValue(this.multiple ? [] : null)
        },

        /* ─────────────────────── abertura / fechamento ─────────────────────── */

        toggle() {
            if (this.disabled) return
            if (this.isOpen) this.close()
            else void this.open()
        },

        async open() {
            if (this.disabled || this.isOpen) return

            this.searchTerm = ""
            this.expandToValue()

            // Pré-posiciona com a estimativa pra que o painel já monte na largura
            // final (medir depois de montado devolve a altura correta).
            const trigger = this.$refs.triggerRef as HTMLElement | undefined
            if (trigger) this.applyPlacement(trigger.getBoundingClientRect(), PANEL_ESTIMATE)

            this.isOpen = true
            await this.$nextTick()
            this.reposition()
            this.attach()

            // `preventScroll` evita que o browser role a página até o painel
            // teleportado (que fica no fim do <body>).
            ;(this.$refs.searchRef as HTMLElement | undefined)?.focus({ preventScroll: true })
        },

        close() {
            if (!this.isOpen) return
            this.isOpen = false
            this.searchTerm = ""
            this.detach()
            ;(this.$refs.triggerRef as HTMLElement | undefined)?.focus({ preventScroll: true })
        },

        onTriggerKeydown(event: KeyboardEvent) {
            if (this.disabled) return
            if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
                event.preventDefault()
                void this.open()
            }
        },

        onPanelKeydown(event: KeyboardEvent) {
            if (event.key === "Escape" || event.key === "Tab") {
                event.preventDefault()
                this.close()
            }
        },

        /* ─────────────────────── posicionamento ───────────────────────────── */

        applyPlacement(rect: DOMRect, panel: { width: number; height: number }) {
            const place = placePanel(
                rect,
                panel,
                { width: window.innerWidth, height: window.innerHeight },
                { matchWidth: true },
            )
            this.panelStyle = {
                position: "fixed",
                left: `${place.left}px`,
                top: `${place.top}px`,
                width: `${place.width ?? rect.width}px`,
            }
        },

        reposition() {
            const trigger = this.$refs.triggerRef as HTMLElement | undefined
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (!trigger || !panel) return
            this.applyPlacement(trigger.getBoundingClientRect(), {
                width: panel.offsetWidth || PANEL_ESTIMATE.width,
                height: panel.offsetHeight || PANEL_ESTIMATE.height,
            })
        },

        onDocumentMouseDown(event: MouseEvent) {
            const target = event.target as Node
            const trigger = this.$refs.triggerRef as HTMLElement | undefined
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (trigger?.contains(target) || panel?.contains(target)) return
            this.close()
        },

        onDocumentScroll(event: Event) {
            // Scroll DENTRO do painel (lista da árvore) não fecha.
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (event.target instanceof Node && panel?.contains(event.target)) return
            this.close()
        },

        onWindowResize() {
            this.reposition()
        },

        onDocumentKeydown(event: KeyboardEvent) {
            if (event.key === "Escape") this.close()
        },

        attach() {
            document.addEventListener("mousedown", this.onDocumentMouseDown, true)
            window.addEventListener("scroll", this.onDocumentScroll, true)
            window.addEventListener("resize", this.onWindowResize)
            document.addEventListener("keydown", this.onDocumentKeydown)
        },

        detach() {
            document.removeEventListener("mousedown", this.onDocumentMouseDown, true)
            window.removeEventListener("scroll", this.onDocumentScroll, true)
            window.removeEventListener("resize", this.onWindowResize)
            document.removeEventListener("keydown", this.onDocumentKeydown)
        },
    },

    beforeUnmount() {
        this.detach()
    },
})
</script>
