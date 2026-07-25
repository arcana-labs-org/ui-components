<script lang="ts" module>
  export interface SelectOption {
    label: string;
    value: string | number | boolean | null;
    disabled?: boolean;
    description?: string;
    /**
     * Cor (valor CSS) da bolinha antes do label no item do panel — e no trigger
     * quando `triggerMode="dots"`. Ausente ⇒ item sem bolinha.
     */
    color?: string;
  }
</script>

<script lang="ts">
  /**
   * `<ArcanaSelect>` — Svelte 5 port. Select custom arcana-style, todo em Svelte/CSS
   * (NÃO usa Element Plus). Reproduz o `<div class="arcana-select">` (+ `--${size}`,
   * `--disabled`, `--open`), o `__trigger`/`__label`/`__clear`/`__caret` e o panel
   * teleportado pro `<body>` (`__panel`, `__search`, `__list`, `__item`, `__empty`),
   * idêntico ao SFC/React port.
   *
   * Decisões (parity com `react/ArcanaSelect.tsx`):
   * - `<Teleport>`+`<Transition>` → action `use:portal` (move o painel pro body; fade omitido)
   * - listeners globais (mousedown/scroll/resize) via `$effect` keyado em `isOpen`
   * - `modelValue` (v-model) → `value` + `onValueChange`; `emit('change')` → `onChange`
   *
   * Filtro por cor (padrão do filtro de Situação do ERP):
   * ```svelte
   * <ArcanaSelect
   *   multiple showFooter triggerMode="dots"
   *   icon="fa-solid fa-flag" placeholder="Situação"
   *   options={[{ label: "Aberto", value: 1, color: "#10b981" }]}
   *   footerCountLabel="{'{count}'} selecionada(s)" clearLabel="Limpar"
   * />
   * ```
   */
  import { untrack } from "svelte";
  import { portal } from "./portal";

  let {
    value = null,
    options = [],
    placeholder = "Selecione…",
    disabled = false,
    size = "md",
    multiple = false,
    clearable = true,
    searchable = false,
    searchPlaceholder = "Buscar...",
    triggerMode = "labels",
    icon = "",
    iconColor = "",
    showFooter = false,
    footerCountLabel = "{count} selecionada(s)",
    clearLabel = "Limpar",
    onValueChange,
    onChange,
    class: className = "",
  }: {
    value?: unknown;
    options?: SelectOption[] | string[] | number[];
    placeholder?: string;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    multiple?: boolean;
    clearable?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    /** `"labels"` (default) ou `"dots"` (bolinhas coloridas no trigger; requer `multiple`). */
    triggerMode?: "labels" | "dots";
    /** Classe FontAwesome de um ícone à esquerda no trigger. */
    icon?: string;
    /** Cor CSS inline aplicada no `icon`. */
    iconColor?: string;
    /** Rodapé do panel (só em `multiple`) com contagem + botão de limpar. */
    showFooter?: boolean;
    /** Texto da contagem; `{count}` vira o total selecionado. */
    footerCountLabel?: string;
    /** Rótulo do botão de limpar do rodapé. */
    clearLabel?: string;
    onValueChange?: (value: unknown) => void;
    onChange?: (value: unknown) => void;
    class?: string;
  } = $props();

  let isOpen = $state(false);
  let highlightedIndex = $state(-1);
  let searchTerm = $state("");
  let panelStyle = $state("");

  let triggerEl: HTMLButtonElement | null = $state(null);
  let panelEl: HTMLDivElement | null = $state(null);
  let searchEl: HTMLInputElement | null = $state(null);

  const normalizedOptions = $derived(
    (options as unknown[]).map((opt) =>
      typeof opt === "string" || typeof opt === "number"
        ? ({ label: String(opt), value: opt } as SelectOption)
        : (opt as SelectOption)
    )
  );

  function isSelected(opt: SelectOption): boolean {
    if (multiple) return Array.isArray(value) && (value as unknown[]).includes(opt.value);
    return opt.value === value;
  }

  const selectedOptions = $derived.by<SelectOption[]>(() => {
    if (multiple) {
      const arr = Array.isArray(value) ? (value as unknown[]) : [];
      return normalizedOptions.filter((o) => arr.includes(o.value));
    }
    const single = normalizedOptions.find((o) => o.value === value);
    return single ? [single] : [];
  });

  const hasValue = $derived.by<boolean>(() => {
    if (multiple) return Array.isArray(value) && (value as unknown[]).length > 0;
    return value !== null && value !== undefined && value !== "";
  });

  const displayLabel = $derived(
    hasValue ? selectedOptions.map((o) => o.label).join(", ") : placeholder
  );
  const canClear = $derived(clearable && !disabled && hasValue);

  // Modo bolinhas só faz sentido em multi-select.
  const isDotsMode = $derived(triggerMode === "dots" && multiple);
  const selectedCount = $derived.by<number>(() => {
    if (multiple) return Array.isArray(value) ? (value as unknown[]).length : 0;
    return hasValue ? 1 : 0;
  });
  const footerCountText = $derived(
    String(footerCountLabel).replace("{count}", String(selectedCount))
  );
  const dotColor = (opt: SelectOption): string => opt.color || "#71717a";

  const filteredOptions = $derived.by<SelectOption[]>(() => {
    if (!searchable) return normalizedOptions;
    const needle = searchTerm.trim().toLowerCase();
    if (!needle) return normalizedOptions;
    return normalizedOptions.filter((o) => String(o.label).toLowerCase().includes(needle));
  });

  const firstEnabledIndex = (list: SelectOption[]): number =>
    list.findIndex((o) => !o.disabled);

  function updatePanelPosition() {
    const trigger = triggerEl;
    const panel = panelEl;
    if (!trigger || !panel) return;
    const rect = trigger.getBoundingClientRect();
    const panelHeight = panel.offsetHeight || 240;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const flipUp = spaceBelow < panelHeight + 16 && spaceAbove > spaceBelow;
    const top = flipUp
      ? Math.max(8, rect.top - panelHeight - 4)
      : rect.bottom + 4;
    const maxHeight = flipUp
      ? Math.min(280, spaceAbove - 16)
      : Math.min(280, spaceBelow - 16);
    panelStyle = `position:fixed;left:${rect.left}px;width:${rect.width}px;top:${top}px;max-height:${maxHeight}px;`;
  }

  function close() {
    isOpen = false;
    searchTerm = "";
    triggerEl?.focus({ preventScroll: true });
  }

  function open() {
    if (disabled) return;
    if (triggerEl) {
      const rect = triggerEl.getBoundingClientRect();
      panelStyle = `position:fixed;left:${rect.left}px;width:${rect.width}px;top:${rect.bottom + 4}px;max-height:280px;`;
    }
    const currentIdx = filteredOptions.findIndex((o) => isSelected(o));
    highlightedIndex = currentIdx >= 0 ? currentIdx : firstEnabledIndex(filteredOptions);
    isOpen = true;
  }

  function toggle() {
    if (disabled) return;
    isOpen ? close() : open();
  }

  // Após montar o panel: mede posição, anexa listeners globais e foca.
  $effect(() => {
    if (!isOpen) return;
    updatePanelPosition();

    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerEl?.contains(target)) return;
      if (panelEl?.contains(target)) return;
      close();
    };
    const reposition = () => updatePanelPosition();

    document.addEventListener("mousedown", onDocumentClick, true);
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);

    const focusTarget = searchable ? searchEl : panelEl;
    focusTarget?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("mousedown", onDocumentClick, true);
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  });

  // searchTerm muda → reseta highlight e reposiciona (altura muda).
  $effect(() => {
    searchTerm;
    untrack(() => {
      if (!isOpen) return;
      highlightedIndex = firstEnabledIndex(filteredOptions);
      updatePanelPosition();
    });
  });

  function emit(v: unknown) {
    onValueChange?.(v);
    onChange?.(v);
  }

  function onItemClick(opt: SelectOption) {
    if (opt.disabled) return;
    if (multiple) {
      const current = Array.isArray(value) ? [...(value as unknown[])] : [];
      const idx = current.indexOf(opt.value);
      idx >= 0 ? current.splice(idx, 1) : current.push(opt.value);
      emit(current);
      updatePanelPosition();
      return;
    }
    emit(opt.value);
    close();
  }

  function clear() {
    if (disabled) return;
    emit(multiple ? [] : null);
  }

  function moveHighlight(delta: 1 | -1) {
    const list = filteredOptions;
    const len = list.length;
    if (!len) return;
    let idx = highlightedIndex;
    for (let i = 0; i < len; i++) {
      idx = (idx + delta + len) % len;
      if (!list[idx].disabled) {
        highlightedIndex = idx;
        requestAnimationFrame(() => {
          const item = panelEl?.querySelector<HTMLElement>(
            ".arcana-select__item.is-highlighted"
          );
          item?.scrollIntoView({ block: "nearest" });
        });
        return;
      }
    }
  }

  function onTriggerKeydown(e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  }

  function onPanelKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" || e.key === "Tab") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveHighlight(1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      moveHighlight(-1);
      return;
    }
    if (e.key === "Enter" || (e.key === " " && !searchable)) {
      e.preventDefault();
      const opt = filteredOptions[highlightedIndex];
      if (opt && !opt.disabled) onItemClick(opt);
      return;
    }
    if (e.key === "Home" && !searchable) {
      e.preventDefault();
      highlightedIndex = firstEnabledIndex(filteredOptions);
      return;
    }
    if (e.key === "End" && !searchable) {
      e.preventDefault();
      for (let i = filteredOptions.length - 1; i >= 0; i--) {
        if (!filteredOptions[i].disabled) {
          highlightedIndex = i;
          return;
        }
      }
    }
  }

  const rootClasses = $derived(
    [
      "arcana-select",
      `arcana-select--${size}`,
      disabled ? "arcana-select--disabled" : "",
      isOpen ? "arcana-select--open" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div class={rootClasses}>
  <button
    bind:this={triggerEl}
    type="button"
    class={[
      "arcana-select__trigger",
      isOpen ? "arcana-select__trigger--open" : "",
      canClear ? "arcana-select__trigger--has-clear" : "",
    ]
      .filter(Boolean)
      .join(" ")}
    {disabled}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    onclick={toggle}
    onkeydown={onTriggerKeydown}
  >
    {#if icon}
      <i
        class="arcana-select__icon {icon}"
        style={iconColor ? `color:${iconColor};` : undefined}
        aria-hidden="true"
      ></i>
    {/if}

    {#if isDotsMode && hasValue}
      <span class="arcana-select__dots">
        {#each selectedOptions as opt (String(opt.value))}
          <span
            class="arcana-select__dot"
            style={`background:${dotColor(opt)};`}
            title={opt.label}
            aria-label={opt.label}
          ></span>
        {/each}
      </span>
    {:else}
      <span
        class={[
          "arcana-select__label",
          !hasValue ? "arcana-select__label--placeholder" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {displayLabel}
      </span>
    {/if}

    {#if canClear}
      <span
        class="arcana-select__clear"
        role="button"
        tabindex="-1"
        aria-label="Limpar"
        onclick={(e) => {
          e.stopPropagation();
          clear();
        }}
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
    {/if}

    <svg
      class={["arcana-select__caret", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}
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

  {#if isOpen}
    <div
      use:portal
      bind:this={panelEl}
      class="arcana-select__panel"
      style={panelStyle}
      role="listbox"
      tabindex="-1"
      onkeydown={onPanelKeydown}
    >
      {#if searchable}
        <div class="arcana-select__search">
          <svg
            class="arcana-select__search-icon"
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
            bind:this={searchEl}
            bind:value={searchTerm}
            type="search"
            name="arcana-select-search"
            class="arcana-select__search-input"
            placeholder={searchPlaceholder}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            data-lpignore="true"
            data-1p-ignore
            data-form-type="other"
          />
        </div>
      {/if}

      <ul class="arcana-select__list">
        {#each filteredOptions as opt, idx (String(opt.value))}
          <li
            class={[
              "arcana-select__item",
              isSelected(opt) ? "is-selected" : "",
              highlightedIndex === idx ? "is-highlighted" : "",
              opt.disabled ? "is-disabled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            role="option"
            aria-selected={isSelected(opt)}
            aria-disabled={opt.disabled || false}
            onmouseenter={() => {
              if (!opt.disabled) highlightedIndex = idx;
            }}
            onclick={() => onItemClick(opt)}
          >
            {#if opt.color}
              <span
                class="arcana-select__dot"
                style={`background:${opt.color};`}
                aria-hidden="true"
              ></span>
            {/if}
            <span class="arcana-select__item-body">
              <span class="arcana-select__item-label">{opt.label}</span>
              {#if opt.description}
                <span class="arcana-select__item-desc">{opt.description}</span>
              {/if}
            </span>
            {#if isSelected(opt)}
              <svg
                class="arcana-select__item-check"
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
            {/if}
          </li>
        {/each}

        {#if !filteredOptions.length}
          <li class="arcana-select__empty">
            {searchTerm.trim() ? "Nenhum resultado" : "Nenhuma opção"}
          </li>
        {/if}
      </ul>

      {#if showFooter && multiple}
        <div class="arcana-select__footer">
          <span class="arcana-select__footer-count">{footerCountText}</span>
          <button
            type="button"
            class="arcana-select__footer-clear"
            onclick={(e) => {
              e.stopPropagation();
              clear();
            }}
          >
            {clearLabel}
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>
