<template>
    <div class="msp" ref="rootRef">
        <slot
            name="trigger"
            :open="open"
            :toggle="toggle"
            :is-open="isOpen"
            :summary="summary"
            :is-empty="isEmpty"
            :selected-count="selectedCount"
        >
            <button
                type="button"
                class="msp-trigger"
                :class="{ 'msp-trigger--open': isOpen, 'msp-trigger--empty': isEmpty }"
                @click="toggle"
            >
                <i :class="triggerIcon" class="msp-trigger__icon"></i>
                <span class="msp-trigger__summary">{{ summary }}</span>
                <i class="fa-solid fa-chevron-down msp-trigger__chevron"></i>
            </button>
        </slot>

        <Teleport to="body">
            <transition name="msp-panel">
                <div
                    v-if="isOpen"
                    ref="panelRef"
                    class="msp-panel"
                    :style="panelStyle"
                    @click.stop
                >
                    <div v-if="tabs.length > 1" class="msp-segmented">
                        <button
                            v-for="t in tabs"
                            :key="t.key"
                            type="button"
                            :class="['msp-seg', { 'msp-seg--active': activeKey === t.key }]"
                            @click="setActive(t.key)"
                        >
                            <i v-if="t.icon" :class="t.icon"></i>
                            {{ t.label }}
                        </button>
                    </div>

                    <div class="msp-search-wrap">
                        <i class="fa-solid fa-magnifying-glass msp-search-icon"></i>
                        <input
                            ref="searchInput"
                            v-model="search"
                            type="text"
                            class="msp-search"
                            :placeholder="activeTab?.placeholder || `Buscar ${activeTab?.label?.toLowerCase() ?? ''}…`"
                        />
                    </div>

                    <div v-if="loading" class="msp-empty">Carregando…</div>

                    <div v-else-if="filteredItems.length === 0" class="msp-empty">
                        Nenhum item encontrado
                    </div>

                    <div v-else class="msp-list">
                        <div
                            v-for="item in filteredItems"
                            :key="`item-${activeKey}-${item.id}`"
                            class="msp-item"
                            :class="{ 'msp-item--selected': isSelected(item.id) }"
                            @click="toggleItem(item.id)"
                        >
                            <span class="msp-check">
                                <i v-if="isSelected(item.id)" class="fa-solid fa-check"></i>
                            </span>
                            <slot name="item" :item="item" :tab="activeTab" :selected="isSelected(item.id)">
                                <span class="msp-item__name">{{ item.name }}</span>
                            </slot>
                        </div>
                    </div>

                    <div v-if="selectedCount > 0" class="msp-footer">
                        <span class="msp-footer__count">{{ footerSummary }}</span>
                        <button type="button" class="msp-footer__clear" @click="clearActive">
                            Limpar
                        </button>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import { nextTick } from "vue"

/**
 * `<MultiSelectPopover>` — popover genérico com tabs configuráveis e
 * multi-seleção via checkbox. Base reutilizável pra pickers de
 * usuários+departamentos, filiais, máquinas, ou qualquer combinação de
 * "buckets" que o user precise selecionar simultaneamente.
 *
 * Modelo: `modelValue` é `{ [tabKey]: number[] }`. Cada tab tem seu próprio
 * array de IDs selecionados — não há mistura entre eles. Isso permite que o
 * consumidor componha sua API (ex: `user_ids` + `department_ids`).
 *
 * Loaders: cada tab fornece um `fetch()` async. Resultado é cacheado em
 * memória pelo lifetime do componente. Re-trigger se quiser invalidar.
 *
 * Teleport: o painel é montado no body pra escapar `overflow:hidden` de
 * dialogs/cards ancestrais. Posicionamento via `getBoundingClientRect`,
 * com re-posicionamento em resize + scroll (capture pra pegar scroll de
 * ancestrais, não só window).
 *
 * Slots:
 * - `trigger`: customiza o botão que abre o popover.
 *   Recebe `{ open, toggle, isOpen, summary, isEmpty, selectedCount }`.
 * - `item`: customiza render de cada item dentro da lista. Recebe
 *   `{ item, tab, selected }`. Por default mostra `item.name`.
 *
 * @example
 * ```vue
 * <MultiSelectPopover
 *     v-model="selections"
 *     :tabs="[
 *         { key: 'USER', label: 'Usuários', icon: 'fa-solid fa-user', fetch: loadUsers },
 *         { key: 'DEPARTMENT', label: 'Departamentos', icon: 'fa-solid fa-sitemap', fetch: loadDepts },
 *     ]"
 *     empty-label="Selecione pessoas ou departamentos"
 * />
 * ```
 */

interface MultiSelectTab {
    key: string
    label: string
    icon?: string
    placeholder?: string
    fetch: () => Promise<any[]>
    /** Campos onde a busca é aplicada (`item[field].toLowerCase().includes(term)`). Default: `['name']`. */
    searchFields?: string[]
    /** Label singular pra usar no count footer ("3 usuários"). Default: `tab.label.toLowerCase()`. */
    countLabel?: string
}

export default {
    name: 'MultiSelectPopover',

    props: {
        modelValue: {
            type: Object as PropType<Record<string, number[]>>,
            default: () => ({}),
        },
        tabs: {
            type: Array as PropType<MultiSelectTab[]>,
            required: true,
        },
        /** Texto do trigger quando nada está selecionado. */
        emptyLabel: {
            type: String,
            default: 'Selecionar…',
        },
        /** Ícone do trigger default. Ignorado se você usar o slot `#trigger`. */
        triggerIcon: {
            type: String,
            default: 'fa-solid fa-list-check',
        },
        /** Aba inicial. Se omitido, usa a primeira de `tabs`. */
        defaultTab: {
            type: String,
            default: '',
        },
    },

    emits: ['update:modelValue', 'change', 'open', 'close'],

    data() {
        return {
            isOpen: false,
            activeKey: '' as string,
            search: '',
            cache: {} as Record<string, any[]>,
            loadingMap: {} as Record<string, boolean>,
            loadedMap: {} as Record<string, boolean>,
            panelStyle: {} as Record<string, string>,
        }
    },

    computed: {
        activeTab(): MultiSelectTab | undefined {
            return (this.tabs as MultiSelectTab[]).find(t => t.key === this.activeKey)
        },

        items(): any[] {
            return this.cache[this.activeKey] ?? []
        },

        loading(): boolean {
            return Boolean(this.loadingMap[this.activeKey])
        },

        filteredItems(): any[] {
            const term = this.search.trim().toLowerCase()
            if (!term) return this.items
            const fields = this.activeTab?.searchFields ?? ['name']
            return this.items.filter((it: any) => {
                for (const f of fields) {
                    const v = it?.[f]
                    if (typeof v === 'string' && v.toLowerCase().includes(term)) return true
                }
                return false
            })
        },

        selectedIdsForActive(): number[] {
            return (this.modelValue?.[this.activeKey] ?? []) as number[]
        },

        selectedCount(): number {
            return (this.tabs as MultiSelectTab[]).reduce((acc, t) => {
                return acc + ((this.modelValue?.[t.key] ?? []).length)
            }, 0)
        },

        isEmpty(): boolean {
            return this.selectedCount === 0
        },

        /**
         * Resumo curto pro trigger: lista os 2 primeiros nomes selecionados
         * e indica `+N` extras. Achata todas as tabs num só array (depts
         * primeiro pra dar prioridade visual a "grupos").
         */
        summary(): string {
            if (this.selectedCount === 0) return this.emptyLabel

            const names: string[] = []
            for (const tab of this.tabs as MultiSelectTab[]) {
                const ids = (this.modelValue?.[tab.key] ?? []) as number[]
                if (!ids.length) continue
                const list = this.cache[tab.key] ?? []
                for (const id of ids) {
                    const found = list.find((x: any) => x.id === id)
                    if (found?.name) names.push(found.name)
                }
            }

            if (names.length === 0) return `${this.selectedCount} selecionado(s)`

            const visible = names.slice(0, 2)
            const rest = this.selectedCount - visible.length
            return rest > 0 ? `${visible.join(', ')}, +${rest}` : visible.join(', ')
        },

        footerSummary(): string {
            const parts: string[] = []
            for (const tab of this.tabs as MultiSelectTab[]) {
                const count = (this.modelValue?.[tab.key] ?? []).length
                if (!count) continue
                const label = tab.countLabel ?? tab.label.toLowerCase()
                parts.push(`${count} ${label}`)
            }
            return parts.join(', ') + ' selecionado(s)'
        },
    },

    watch: {
        tabs: {
            immediate: true,
            handler() {
                if (!this.activeKey || !(this.tabs as MultiSelectTab[]).find(t => t.key === this.activeKey)) {
                    this.activeKey = this.defaultTab || (this.tabs as MultiSelectTab[])[0]?.key || ''
                }
            },
        },
    },

    methods: {
        async toggle() {
            if (this.isOpen) this.close()
            else await this.open()
        },

        async open() {
            if (!this.activeKey) return
            this.isOpen = true
            this.$emit('open')
            document.addEventListener('click', this.handleOutsideClick, true)
            document.addEventListener('keydown', this.handleKeydown)
            window.addEventListener('resize', this.positionPanel)
            window.addEventListener('scroll', this.positionPanel, true)

            await nextTick()
            this.positionPanel()

            // Eager-load all tabs first time. Quem abre o picker tipicamente
            // quer trocar de tab sem esperar — vale o roundtrip extra.
            await Promise.all(
                (this.tabs as MultiSelectTab[]).map(t => this.ensureLoaded(t.key)),
            )

            nextTick(() => (this.$refs.searchInput as HTMLInputElement)?.focus())
        },

        close() {
            if (!this.isOpen) return
            this.isOpen = false
            this.search = ''
            this.$emit('close')
            document.removeEventListener('click', this.handleOutsideClick, true)
            document.removeEventListener('keydown', this.handleKeydown)
            window.removeEventListener('resize', this.positionPanel)
            window.removeEventListener('scroll', this.positionPanel, true)
        },

        positionPanel() {
            const root = this.$refs.rootRef as HTMLElement | undefined
            const trigger = root?.firstElementChild as HTMLElement | undefined
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (!trigger || !panel) return

            const tRect = trigger.getBoundingClientRect()
            const pRect = panel.getBoundingClientRect()
            const vh = window.innerHeight
            const vw = window.innerWidth
            const margin = 8
            const offset = 4

            let top = tRect.bottom + offset
            if (top + pRect.height > vh - margin) {
                const flipped = tRect.top - pRect.height - offset
                if (flipped >= margin) top = flipped
            }

            const width = Math.max(tRect.width, 280)
            let left = tRect.left
            if (left + width > vw - margin) left = Math.max(margin, vw - width - margin)

            this.panelStyle = {
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
            }
        },

        async ensureLoaded(key: string) {
            if (this.loadedMap[key] || this.loadingMap[key]) return
            const tab = (this.tabs as MultiSelectTab[]).find(t => t.key === key)
            if (!tab) return

            this.loadingMap[key] = true
            try {
                const result = await tab.fetch()
                this.cache[key] = Array.isArray(result) ? result : ((result as any)?.data ?? [])
                this.loadedMap[key] = true
            } catch (e) {
                console.error(`[multi-select-popover] erro ao carregar tab "${key}"`, e)
            } finally {
                this.loadingMap[key] = false
            }
        },

        async setActive(key: string) {
            if (this.activeKey === key) return
            this.activeKey = key
            this.search = ''
            await this.ensureLoaded(key)
        },

        isSelected(id: number): boolean {
            return this.selectedIdsForActive.includes(id)
        },

        toggleItem(id: number) {
            const next = { ...(this.modelValue || {}) }
            const arr = [...(next[this.activeKey] ?? [])]
            const idx = arr.indexOf(id)
            if (idx >= 0) arr.splice(idx, 1)
            else arr.push(id)
            next[this.activeKey] = arr

            this.$emit('update:modelValue', next)
            this.$emit('change', next)
        },

        clearActive() {
            const next = { ...(this.modelValue || {}) }
            next[this.activeKey] = []
            this.$emit('update:modelValue', next)
            this.$emit('change', next)
        },

        clearAll() {
            const next: Record<string, number[]> = {}
            for (const tab of this.tabs as MultiSelectTab[]) next[tab.key] = []
            this.$emit('update:modelValue', next)
            this.$emit('change', next)
        },

        handleOutsideClick(e: MouseEvent) {
            const root = this.$refs.rootRef as HTMLElement
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (!root) return
            const target = e.target as Node
            if (root.contains(target)) return
            if (panel?.contains(target)) return
            this.close()
        },

        handleKeydown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                e.stopPropagation()
                this.close()
            }
        },
    },

    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, true)
        document.removeEventListener('keydown', this.handleKeydown)
        window.removeEventListener('resize', this.positionPanel)
        window.removeEventListener('scroll', this.positionPanel, true)
    },
} as Component
</script>

<style scoped lang="scss">
.msp {
    position: relative;
    display: inline-block;
    width: 100%;
}

.msp-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 36px;
    padding: 0 10px 0 12px;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: #18181b;
    transition: border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
    text-align: left;

    &:hover {
        border-color: #a1a1aa;
        background: #fafafa;
    }

    &--open {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
    }

    &--empty {
        color: #a1a1aa;
    }
}

.msp-trigger__icon {
    color: #71717a;
    font-size: 12px;
    flex-shrink: 0;
}

.msp-trigger__summary {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
    letter-spacing: -0.005em;
}

.msp-trigger__chevron {
    color: #a1a1aa;
    font-size: 10px;
    flex-shrink: 0;
}
</style>

<style lang="scss">
/* NÃO scoped: painel é teleportado pro <body>, fora do escopo de `data-v-*`.
   Namespace `.msp-*` evita colisão. */
.msp-panel {
    position: fixed;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 10px;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.06),
        0 12px 32px -8px rgba(24, 24, 27, 0.18);
    z-index: 10600;
    overflow: hidden;
    font-family: 'Inter', 'Geist', system-ui, -apple-system, sans-serif;
    letter-spacing: -0.005em;
}

.msp-panel-enter-active,
.msp-panel-leave-active {
    transition: opacity 0.12s ease, transform 0.12s ease;
}
.msp-panel-enter-from,
.msp-panel-leave-to {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
}

.msp-segmented {
    display: flex;
    gap: 4px;
    margin: 10px 12px;
    padding: 3px;
    background: #f4f4f5;
    border-radius: 7px;
}

.msp-seg {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 5px 0;
    border: none;
    background: transparent;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 500;
    color: #71717a;
    cursor: pointer;
    transition: background 100ms ease, color 100ms ease, box-shadow 100ms ease;
    font-family: inherit;

    i { font-size: 11px; }

    &:hover:not(.msp-seg--active) {
        color: #18181b;
    }

    &--active {
        background: #ffffff;
        color: #09090b;
        font-weight: 600;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.05);
    }
}

.msp-search-wrap {
    position: relative;
    padding: 10px 12px 8px;
}

/* Quando há tabs segmentadas acima, elas já provêem o espaçamento
   superior — zera o top-padding do search pra não dobrar o gap. */
.msp-segmented + .msp-search-wrap {
    padding-top: 0;
}

.msp-search-icon {
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translate(0, -50%);
    color: #a1a1aa;
    font-size: 11px;
    pointer-events: none;
}

.msp-search {
    width: 100%;
    background: #fafafa;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    padding: 6px 8px 6px 28px;
    font-size: 12.5px;
    color: #27272a;
    outline: none;
    transition: border-color 100ms ease, background 100ms ease;
    font-family: inherit;

    &:focus {
        border-color: #a1a1aa;
        background: #fff;
    }

    &::placeholder { color: #a1a1aa; }
}

.msp-empty {
    padding: 24px 12px;
    text-align: center;
    color: #71717a;
    font-size: 12px;
}

.msp-list {
    max-height: 280px;
    overflow-y: auto;
    padding: 4px 6px;
}

.msp-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 100ms ease;

    &:hover { background: #f4f4f5; }

    &--selected {
        background: #f4f4f5;
    }
}

.msp-check {
    width: 14px;
    height: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #d4d4d8;
    border-radius: 4px;
    color: #fff;
    flex-shrink: 0;
    transition: background 100ms ease, border-color 100ms ease;
    font-size: 8.5px;
}

.msp-item--selected .msp-check {
    background: #18181b;
    border-color: #18181b;
}

.msp-item__name {
    font-size: 12.5px;
    font-weight: 500;
    color: #18181b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.msp-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 9px 12px 11px;
    border-top: 1px solid #f4f4f5;
    background: #fafafa;
}

.msp-footer__count {
    font-size: 11.5px;
    font-weight: 500;
    color: #52525b;
}

.msp-footer__clear {
    background: transparent;
    border: none;
    color: #2563eb;
    font-size: 11.5px;
    font-weight: 500;
    cursor: pointer;
    padding: 2px 4px;
    font-family: inherit;

    &:hover {
        color: #1d4ed8;
        text-decoration: underline;
    }
}
</style>
