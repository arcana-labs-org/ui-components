<template>
    <div
        class="shadcn-select"
        :class="rootClasses"
    >
        <!--
            Trigger: button visível que mostra label/placeholder + caret.
            Click ou ↓/↑/Enter/Space abrem o dropdown.
        -->
        <button
            ref="triggerRef"
            type="button"
            class="shadcn-select__trigger"
            :class="{
                'shadcn-select__trigger--open': isOpen,
                'shadcn-select__trigger--has-clear': canClear,
            }"
            :disabled="disabled"
            :aria-haspopup="'listbox'"
            :aria-expanded="isOpen"
            @click="toggle"
            @keydown="onTriggerKeydown"
        >
            <span
                class="shadcn-select__label"
                :class="{ 'shadcn-select__label--placeholder': !hasValue }"
            >
                {{ displayLabel }}
            </span>
            <!--
                Clear: span (não button) pra ser HTML válido dentro do <button> trigger.
                Aparece só no hover do trigger via CSS, igual `clearable` do el-input.
                `@click.stop` impede que o clique abra/feche o dropdown.
            -->
            <span
                v-if="canClear"
                class="shadcn-select__clear"
                role="button"
                tabindex="-1"
                aria-label="Limpar"
                @click.stop="clear"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </span>
            <svg
                class="shadcn-select__caret"
                :class="{ 'is-open': isOpen }"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <polyline points="6 9 12 15 18 9" />
            </svg>
        </button>

        <!--
            Dropdown panel: teleportado pro <body> pra escapar de qualquer container
            com `overflow: hidden` ou z-index restritivo (ex: dentro do ShadcnDialog).
            Posição calculada com base no rect do trigger (position: fixed).
        -->
        <Teleport to="body">
            <Transition name="shadcn-select-fade">
                <div
                    v-if="isOpen"
                    ref="panelRef"
                    class="shadcn-select__panel"
                    :style="panelStyles"
                    role="listbox"
                    @keydown="onPanelKeydown"
                    tabindex="-1"
                >
                    <!--
                        Search: input sticky no topo. Keydown bubbla pro panel pra
                        ArrowUp/Down/Enter/Esc reusarem `onPanelKeydown`. Setas verticais
                        navegam itens (preventDefault); Home/End/Space ficam livres no
                        searchable pra editar texto.
                    -->
                    <div v-if="searchable" class="shadcn-select__search">
                        <svg
                            class="shadcn-select__search-icon"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            ref="searchRef"
                            v-model="searchTerm"
                            type="search"
                            name="shadcn-select-search"
                            class="shadcn-select__search-input"
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

                    <ul class="shadcn-select__list">
                        <li
                            v-for="(opt, idx) in filteredOptions"
                            :key="String(opt.value)"
                            class="shadcn-select__item"
                            :class="{
                                'is-selected': isSelected(opt),
                                'is-highlighted': highlightedIndex === idx,
                                'is-disabled': opt.disabled,
                            }"
                            role="option"
                            :aria-selected="isSelected(opt)"
                            :aria-disabled="opt.disabled || false"
                            @mouseenter="!opt.disabled && (highlightedIndex = idx)"
                            @click="onItemClick(opt)"
                        >
                            <span class="shadcn-select__item-body">
                                <span class="shadcn-select__item-label">{{ opt.label }}</span>
                                <span
                                    v-if="opt.description"
                                    class="shadcn-select__item-desc"
                                >{{ opt.description }}</span>
                            </span>
                            <svg
                                v-if="isSelected(opt)"
                                class="shadcn-select__item-check"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </li>

                        <li v-if="!filteredOptions.length" class="shadcn-select__empty">
                            {{ searchTerm.trim() ? 'Nenhum resultado' : 'Nenhuma opção' }}
                        </li>
                    </ul>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"

/**
 * `<ShadcnSelect>` — Select custom shadcn-style, totalmente implementado em Vue/CSS.
 * NÃO usa Element Plus internamente.
 *
 * Por que não usar `<el-select>` como base?
 * ─────────────────────────────────────────
 * O Element Plus tem várias camadas internas (`__wrapper`, `__inner`, `__suffix`,
 * `box-shadow inset` em vários estados) que dificultam aplicar um tema shadcn limpo
 * sem "bordas duplas" / overrides agressivos. Reimplementar do zero é mais limpo,
 * sem dependência de internals da lib que podem mudar entre versões.
 *
 * API:
 * ────
 * - `modelValue` (v-model) — valor selecionado
 * - `options` — `Array<{ label, value, disabled? }>` ou `string[]`/`number[]`
 * - `placeholder`, `disabled` — comportamento óbvio
 * - `size` — `'sm' | 'md' | 'lg'` (default `'md'`)
 *
 * Acessibilidade:
 * ───────────────
 * - `role="listbox"` no panel, `role="option"` nos items
 * - `aria-haspopup`, `aria-expanded`, `aria-selected`, `aria-disabled`
 * - Keyboard: `↓/↑` navega, `Enter`/`Space` abre/seleciona, `Esc`/`Tab` fecha
 *
 * Posicionamento:
 * ───────────────
 * Dropdown teleportado pro `<body>` com `position: fixed`. Posição calculada via
 * `getBoundingClientRect()` do trigger. Listeners de `scroll` + `resize` reposicionam
 * enquanto aberto. Auto-flip pra cima quando não cabe abaixo.
 */

interface SelectOption {
    label: string
    value: string | number | boolean | null
    disabled?: boolean
    /**
     * Legenda opcional exibida abaixo do `label` dentro do dropdown (não no trigger).
     * Útil pra explicar o que cada opção faz sem poluir a UI fora do menu aberto.
     */
    description?: string
}

export default {
    name: 'ShadcnSelect',

    emits: ['update:modelValue', 'change'],

    props: {
        modelValue: {
            type: [String, Number, Boolean, Array, null] as PropType<any>,
            default: null,
        },
        options: {
            type: Array as PropType<SelectOption[] | string[] | number[]>,
            default: () => [],
        },
        placeholder: {
            type: String,
            default: 'Selecione…',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<'sm' | 'md' | 'lg'>,
            default: 'md',
            validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
        },
        /**
         * Quando `true`, o select aceita múltiplas seleções:
         * - `modelValue` é tratado como array (ou `null` → array vazio)
         * - clicar num item faz TOGGLE (não fecha o panel)
         * - label do trigger mostra labels selecionados separados por vírgula
         * - keyboard Enter/Space também faz toggle sem fechar
         * Fechar: clique fora, Esc, ou Tab.
         */
        multiple: {
            type: Boolean,
            default: false,
        },
        /**
         * Mostra um X no hover do trigger pra limpar o valor selecionado.
         * Emite `null` (single) ou `[]` (multiple) quando clicado.
         */
        clearable: {
            type: Boolean,
            default: true,
        },
        /**
         * Habilita um input de busca no topo do dropdown. Filtra `options`
         * localmente por substring (case-insensitive) no `label`.
         */
        searchable: {
            type: Boolean,
            default: false,
        },
        searchPlaceholder: {
            type: String,
            default: 'Buscar...',
        },
    },

    data() {
        return {
            isOpen: false,
            highlightedIndex: -1,
            panelStyles: {} as Record<string, string>,
            searchTerm: '' as string,
            // Bound handlers pra remover listeners no unmount
            boundClickOutside: null as ((e: MouseEvent) => void) | null,
            boundReposition: null as (() => void) | null,
        }
    },

    computed: {
        rootClasses(): string {
            const cls = ['shadcn-select', `shadcn-select--${this.size}`]
            if (this.disabled) cls.push('shadcn-select--disabled')
            if (this.isOpen) cls.push('shadcn-select--open')
            return cls.join(' ')
        },

        normalizedOptions(): SelectOption[] {
            return (this.options as any[]).map((opt) => {
                if (typeof opt === 'string' || typeof opt === 'number') {
                    return { label: String(opt), value: opt }
                }
                return opt as SelectOption
            })
        },

        selectedOptions(): SelectOption[] {
            if (this.multiple) {
                const arr = Array.isArray(this.modelValue) ? this.modelValue : []
                return this.normalizedOptions.filter((o) => arr.includes(o.value))
            }
            const single = this.normalizedOptions.find((o) => o.value === this.modelValue)
            return single ? [single] : []
        },

        hasValue(): boolean {
            if (this.multiple) {
                return Array.isArray(this.modelValue) && this.modelValue.length > 0
            }
            return this.modelValue !== null && this.modelValue !== undefined && this.modelValue !== ''
        },

        displayLabel(): string {
            if (!this.hasValue) return this.placeholder
            return this.selectedOptions.map((o: SelectOption) => o.label).join(', ')
        },

        canClear(): boolean {
            return this.clearable && !this.disabled && this.hasValue
        },

        filteredOptions(): SelectOption[] {
            if (!this.searchable) return this.normalizedOptions
            const needle = this.searchTerm.trim().toLowerCase()
            if (!needle) return this.normalizedOptions
            return this.normalizedOptions.filter((o) =>
                String(o.label).toLowerCase().includes(needle),
            )
        },
    },

    watch: {
        searchTerm() {
            // Após filtrar, o highlightedIndex aponta pra um índice da nova lista.
            // Resetamos pro primeiro habilitável e reposicionamos o panel (altura muda).
            this.highlightedIndex = this.firstEnabledIndex()
            this.$nextTick(() => this.updatePanelPosition())
        },
    },

    methods: {
        isSelected(opt: SelectOption): boolean {
            if (this.multiple) {
                return Array.isArray(this.modelValue) && (this.modelValue as any[]).includes(opt.value)
            }
            return opt.value === this.modelValue
        },

        toggle() {
            if (this.disabled) return
            this.isOpen ? this.close() : this.open()
        },

        async open() {
            if (this.disabled || this.isOpen) return

            // Pré-aplica posição/largura aproximadas no panel ANTES de montá-lo.
            //
            // Sem isso o panel renderiza primeiro com largura natural do body (bem
            // maior que o trigger). Os items não quebram em duas linhas, então o
            // `offsetHeight` medido sai menor que a altura real (quando a largura
            // estiver constrita ao trigger e os labels longos quebrarem). Aí o
            // `updatePanelPosition` usa essa medida errada, e o auto-flip pra cima
            // dispara erroneamente — visual fica "fora de posição" na primeira vez.
            //
            // Setando largura/posição agora, o panel já monta com a largura final;
            // o re-measure no nextTick a seguir devolve a altura correta.
            const trigger = this.$refs.triggerRef as HTMLElement | undefined
            if (trigger) {
                const rect = trigger.getBoundingClientRect()
                this.panelStyles = {
                    position: 'fixed',
                    left: `${rect.left}px`,
                    width: `${rect.width}px`,
                    top: `${rect.bottom + 4}px`,
                    maxHeight: '280px',
                }
            }

            this.isOpen = true

            // Pré-seleciona o item atual no highlight (ou o primeiro disponível)
            const currentIdx = this.filteredOptions.findIndex((o) => this.isSelected(o))
            this.highlightedIndex = currentIdx >= 0 ? currentIdx : this.firstEnabledIndex()

            await this.$nextTick()
            this.updatePanelPosition()
            this.attachGlobalListeners()

            // Foca o input de busca (searchable) ou o panel (não-searchable).
            // `preventScroll: true` é crítico: o panel é teleportado pro <body> com
            // `position: fixed`. Sem isso o browser tenta trazer o elemento focado
            // pra viewport via scroll padrão e, como o panel teleportado fica no
            // final do DOM, a página inteira scrolla pro fim (bug visual reportado).
            const focusTarget = this.searchable
                ? (this.$refs.searchRef as HTMLElement | undefined)
                : (this.$refs.panelRef as HTMLElement | undefined)
            focusTarget?.focus({ preventScroll: true })
        },

        close() {
            if (!this.isOpen) return
            this.isOpen = false
            this.searchTerm = ''
            this.detachGlobalListeners()
            // Devolve o foco pro trigger pra que Tab/Shift+Tab continue natural.
            // `preventScroll: true` por simetria — evita jump caso o trigger esteja
            // fora da viewport quando o dropdown fecha.
            ;(this.$refs.triggerRef as HTMLElement | undefined)?.focus({ preventScroll: true })
        },

        firstEnabledIndex(): number {
            return this.filteredOptions.findIndex((o) => !o.disabled)
        },

        onItemClick(opt: SelectOption) {
            if (opt.disabled) return

            if (this.multiple) {
                const current = Array.isArray(this.modelValue) ? [...(this.modelValue as any[])] : []
                const idx = current.indexOf(opt.value)
                idx >= 0 ? current.splice(idx, 1) : current.push(opt.value)
                this.$emit('update:modelValue', current)
                this.$emit('change', current)
                // Não fecha em multi-select — usuário continua selecionando.
                // Recalcula posição em caso de altura ter mudado.
                this.$nextTick(() => this.updatePanelPosition())
                return
            }

            this.$emit('update:modelValue', opt.value)
            this.$emit('change', opt.value)
            this.close()
        },

        clear() {
            if (this.disabled) return
            const emptyValue = this.multiple ? [] : null
            this.$emit('update:modelValue', emptyValue)
            this.$emit('change', emptyValue)
        },

        /* ─── Keyboard nav ─── */

        onTriggerKeydown(e: KeyboardEvent) {
            if (this.disabled) return
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                this.open()
            }
        },

        onPanelKeydown(e: KeyboardEvent) {
            if (e.key === 'Escape' || e.key === 'Tab') {
                e.preventDefault()
                this.close()
                return
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                this.moveHighlight(1)
                return
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault()
                this.moveHighlight(-1)
                return
            }

            // Space no searchable é typing no input; só seleciona quando não é searchable.
            if (e.key === 'Enter' || (e.key === ' ' && !this.searchable)) {
                e.preventDefault()
                const opt = this.filteredOptions[this.highlightedIndex]
                if (opt && !opt.disabled) {
                    this.onItemClick(opt)
                }
                return
            }

            // Home/End no searchable navegam cursor do input (não fazem preventDefault).
            if (e.key === 'Home' && !this.searchable) {
                e.preventDefault()
                this.highlightedIndex = this.firstEnabledIndex()
                return
            }

            if (e.key === 'End' && !this.searchable) {
                e.preventDefault()
                for (let i = this.filteredOptions.length - 1; i >= 0; i--) {
                    if (!this.filteredOptions[i].disabled) {
                        this.highlightedIndex = i
                        return
                    }
                }
            }
        },

        moveHighlight(delta: 1 | -1) {
            const list = this.filteredOptions
            const len = list.length
            if (!len) return

            let idx = this.highlightedIndex
            for (let i = 0; i < len; i++) {
                idx = (idx + delta + len) % len
                if (!list[idx].disabled) {
                    this.highlightedIndex = idx
                    this.scrollHighlightedIntoView()
                    return
                }
            }
        },

        scrollHighlightedIntoView() {
            this.$nextTick(() => {
                const panel = this.$refs.panelRef as HTMLElement | undefined
                if (!panel) return
                const item = panel.querySelector<HTMLElement>('.shadcn-select__item.is-highlighted')
                item?.scrollIntoView({ block: 'nearest' })
            })
        },

        /* ─── Posicionamento + listeners globais ─── */

        updatePanelPosition() {
            const trigger = this.$refs.triggerRef as HTMLElement | undefined
            const panel = this.$refs.panelRef as HTMLElement | undefined
            if (!trigger || !panel) return

            const rect = trigger.getBoundingClientRect()
            const panelHeight = panel.offsetHeight || 240   // estimativa enquanto não mediu
            const viewportHeight = window.innerHeight
            const spaceBelow = viewportHeight - rect.bottom
            const spaceAbove = rect.top

            // Auto-flip: se não cabe abaixo, abre pra cima (se houver espaço)
            const flipUp = spaceBelow < panelHeight + 16 && spaceAbove > spaceBelow

            this.panelStyles = {
                position: 'fixed',
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                top: flipUp
                    ? `${Math.max(8, rect.top - panelHeight - 4)}px`
                    : `${rect.bottom + 4}px`,
                maxHeight: flipUp
                    ? `${Math.min(280, spaceAbove - 16)}px`
                    : `${Math.min(280, spaceBelow - 16)}px`,
            }
        },

        attachGlobalListeners() {
            this.boundClickOutside = (e: MouseEvent) => this.onDocumentClick(e)
            this.boundReposition = () => this.updatePanelPosition()

            document.addEventListener('mousedown', this.boundClickOutside, true)
            window.addEventListener('scroll', this.boundReposition, true)
            window.addEventListener('resize', this.boundReposition)
        },

        detachGlobalListeners() {
            if (this.boundClickOutside) {
                document.removeEventListener('mousedown', this.boundClickOutside, true)
                this.boundClickOutside = null
            }
            if (this.boundReposition) {
                window.removeEventListener('scroll', this.boundReposition, true)
                window.removeEventListener('resize', this.boundReposition)
                this.boundReposition = null
            }
        },

        onDocumentClick(e: MouseEvent) {
            const trigger = this.$refs.triggerRef as HTMLElement | undefined
            const panel = this.$refs.panelRef as HTMLElement | undefined
            const target = e.target as Node

            if (trigger?.contains(target)) return
            if (panel?.contains(target)) return

            this.close()
        },
    },

    beforeUnmount() {
        this.detachGlobalListeners()
    },
} as Component
</script>

<style>
/*
 * Estilos GLOBAIS (não-scoped) porque o `.shadcn-select__panel` é teleportado
 * pro <body> e ficaria fora do escopo `data-v-*` do componente.
 * Tokens espelham `ShadcnDialog`/`LabeledButton` (palette zinc).
 */

.shadcn-select {
    position: relative;
    display: inline-block;
    width: 100%;
    font-family: inherit;
}

/* ═════════════════════════════════════════════════
   TRIGGER
   ═════════════════════════════════════════════════ */
.shadcn-select__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    min-height: 36px;
    padding: 6px 12px;
    background: #ffffff;
    color: #09090b;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    font-family: inherit;
    font-size: 13px;
    line-height: 1.4;
    cursor: pointer;
    text-align: left;
    transition: border-color 150ms ease, background-color 150ms ease;
    outline: none;
    box-shadow: none;
}

.shadcn-select__trigger:hover:not(:disabled) {
    border-color: #d4d4d8;
}

.shadcn-select__trigger:focus-visible {
    border-color: #18181b;
}

.shadcn-select__trigger--open,
.shadcn-select__trigger--open:hover {
    border-color: #18181b;
}

.shadcn-select__trigger:disabled {
    background: #fafafa;
    color: #a1a1aa;
    cursor: not-allowed;
    opacity: 0.7;
}

/* Tamanhos */
.shadcn-select--sm .shadcn-select__trigger {
    min-height: 30px;
    padding: 4px 10px;
    font-size: 12px;
}

.shadcn-select--lg .shadcn-select__trigger {
    min-height: 42px;
    padding: 9px 14px;
    font-size: 14px;
}

/* Label dentro do trigger */
.shadcn-select__label {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.shadcn-select__label--placeholder {
    color: #a1a1aa;
}

/* Caret (chevron) */
.shadcn-select__caret {
    flex-shrink: 0;
    color: #71717a;
    transition: transform 200ms ease, color 150ms ease;
}

.shadcn-select__trigger--open .shadcn-select__caret,
.shadcn-select__caret.is-open {
    transform: rotate(180deg);
    color: #18181b;
}

/* Clear button (X): só aparece no hover do trigger e oculta o caret enquanto visível */
.shadcn-select__clear {
    flex-shrink: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: #71717a;
    cursor: pointer;
    border-radius: 4px;
    transition: color 100ms ease, background-color 100ms ease;
}

.shadcn-select__clear:hover {
    color: #18181b;
    background: #f4f4f5;
}

.shadcn-select__trigger--has-clear:hover .shadcn-select__clear {
    display: flex;
}

.shadcn-select__trigger--has-clear:hover .shadcn-select__caret {
    display: none;
}

/* ═════════════════════════════════════════════════
   PANEL (dropdown teleportado pro body)
   ═════════════════════════════════════════════════ */
.shadcn-select__panel {
    /*
     * z-index 10100 fica ACIMA do ShadcnDialog (10000/10001).
     * Position: fixed pra escapar de qualquer overflow:hidden ancestor.
     */
    z-index: 10100;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 8px;
    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.06),
        0 2px 4px rgba(0, 0, 0, 0.04);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 4px;
    font-family: inherit;
    outline: none;
}

.shadcn-select__list {
    margin: 0;
    padding: 0;
    list-style: none;
}

/* ── Search (sticky no topo do panel) ── */
.shadcn-select__search {
    /*
     * `position: sticky; top: -4px` cola no topo do panel respeitando o `padding: 4px`
     * dele (margins negativos esticam o search até a borda do panel, eliminando o
     * gap visual). z-index isola da scroll-area dos items.
     */
    position: sticky;
    top: -4px;
    z-index: 1;
    margin: -4px -4px 4px;
    padding: 8px;
    background: #ffffff;
    border-bottom: 1px solid #e4e4e7;
}

.shadcn-select__search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #71717a;
    pointer-events: none;
}

.shadcn-select__search-input {
    width: 100%;
    padding: 6px 10px 6px 32px;
    background: #ffffff;
    color: #09090b;
    border: 1px solid #e4e4e7;
    border-radius: 6px;
    font-family: inherit;
    font-size: 13px;
    line-height: 1.4;
    outline: none;
    transition: border-color 150ms ease;
}

.shadcn-select__search-input::placeholder {
    color: #a1a1aa;
}

.shadcn-select__search-input:focus {
    border-color: #18181b;
}

/* ── Items ── */
.shadcn-select__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 13px;
    color: #18181b;
    cursor: pointer;
    user-select: none;
    transition: background-color 100ms ease, color 100ms ease;
    line-height: 1.4;
}

/* Item com legenda (title + caption): alinha o check ao topo e empilha o texto. */
.shadcn-select__item-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1 1 auto;
}
.shadcn-select__item-desc {
    font-size: 11.5px;
    font-weight: 400;
    line-height: 1.35;
    color: #71717a;
    white-space: normal;
}

.shadcn-select__item:hover,
.shadcn-select__item.is-highlighted {
    background: #f4f4f5;
    color: #09090b;
}

.shadcn-select__item.is-selected {
    background: transparent;       /* shadcn-style: selected NÃO muda bg, só mostra checkmark */
    color: #09090b;
    font-weight: 500;
}

.shadcn-select__item.is-selected.is-highlighted,
.shadcn-select__item.is-selected:hover {
    background: #f4f4f5;
}

.shadcn-select__item.is-disabled {
    color: #a1a1aa;
    cursor: not-allowed;
}

.shadcn-select__item.is-disabled:hover {
    background: transparent;
}

.shadcn-select__item-label {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.shadcn-select__item-check {
    flex-shrink: 0;
    color: #09090b;
}

/* Empty state */
.shadcn-select__empty {
    padding: 14px 10px;
    text-align: center;
    color: #71717a;
    font-size: 12.5px;
    font-style: italic;
}

/* ═════════════════════════════════════════════════
   ANIMAÇÃO — fade + slide-down sutil
   ═════════════════════════════════════════════════ */
.shadcn-select-fade-enter-active,
.shadcn-select-fade-leave-active {
    transition: opacity 150ms ease, transform 150ms ease;
}

.shadcn-select-fade-enter-from,
.shadcn-select-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
