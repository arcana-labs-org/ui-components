import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef, inject
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ArcanaSelectComponent` — Angular port do SFC Vue `ArcanaSelect`.
 *
 * Attribute selector num `<div>` (`<div arcanaSelect>`): select custom shadcn,
 * 100% em Angular/CSS (NÃO usa Element Plus). Reproduz o `.arcana-select`
 * (+ `--${size}`/`--disabled`/`--open`), o `__trigger`/`__label`/`__clear`/`__caret`
 * e o painel TELEPORTADO pro `<body>` (`__panel`/`__search`/`__list`/`__item`/`__empty`),
 * idêntico ao Vue/React.
 *
 * Decisão sobre o portal (sem deps novas — NÃO usa CDK Overlay):
 * - O painel vive num `<ng-template>`; ao abrir, criamos um `EmbeddedViewRef` via
 *   `ViewContainerRef` e MOVEMOS seus `rootNodes` pro `document.body` (mesma ideia do
 *   `createPortal` do React). A view continua na árvore de CD do componente, então
 *   bindings/eventos do painel seguem funcionando; `destroy()` remove o DOM ao fechar.
 * - Listeners globais (mousedown/scroll/resize) via `addEventListener`; como disparam
 *   fora do Angular, chamamos `cdr.markForCheck()` (zoneless agenda o CD).
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 *
 * Filtro por cor (padrão do filtro de Situação do ERP):
 * ```html
 * <div arcanaSelect multiple showFooter triggerMode="dots"
 *      icon="fa-solid fa-flag" placeholder="Situação"
 *      [options]="statusOptions" footerCountLabel="{count} selecionada(s)"
 *      clearLabel="Limpar" [value]="ids" (valueChange)="ids = $any($event)"></div>
 * ```
 */
export interface SelectOption {
  label: string;
  value: string | number | boolean | null;
  disabled?: boolean;
  description?: string;
  /**
   * Cor (valor CSS) da bolinha antes do label no item do painel — e no trigger
   * quando `triggerMode="dots"`. Ausente ⇒ item sem bolinha.
   */
  color?: string;
  /** Grupo visual da opção. Grupos consecutivos recebem cabeçalho e separador. */
  group?: string;
}

interface PanelPos {
  top: number;
  left: number;
  minWidth: number;
  maxHeight: number;
}

@Component({
  selector: "div[arcanaSelect]",
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "rootClass" },
  template: `
    <button
      #trigger
      type="button"
      class="arcana-select__trigger"
      [class.arcana-select__trigger--open]="isOpen"
      [class.arcana-select__trigger--has-clear]="canClear"
      [disabled]="disabled"
      aria-haspopup="listbox"
      [attr.aria-expanded]="isOpen"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
    >
      @if (prefixTemplate) {
        <span class="arcana-select__prefix">
          <ng-container [ngTemplateOutlet]="prefixTemplate"
                        [ngTemplateOutletContext]="triggerTemplateContext"></ng-container>
        </span>
      }
      @if (icon) {
        <i [class]="'arcana-select__icon ' + icon"
           [style.color]="iconColor || null" aria-hidden="true"></i>
      }

      @if (suffixTemplate) {
        <span class="arcana-select__suffix">
          <ng-container [ngTemplateOutlet]="suffixTemplate"
                        [ngTemplateOutletContext]="triggerTemplateContext"></ng-container>
        </span>
      }

      @if (isDotsMode && hasValue) {
        <span class="arcana-select__dots">
          @for (opt of selectedOptions; track $index) {
            <span class="arcana-select__dot" [style.background]="dotColor(opt)"
                  [title]="opt.label" [attr.aria-label]="opt.label"></span>
          }
        </span>
      } @else {
        <span
          class="arcana-select__label"
          [class.arcana-select__label--placeholder]="!hasValue"
        >{{ displayLabel }}</span>
      }

      @if (canClear) {
        <span
          class="arcana-select__clear"
          role="button"
          tabindex="-1"
          aria-label="Limpar"
          (click)="onClearClick($event)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      }

      <svg class="arcana-select__caret" [class.is-open]="isOpen" width="12" height="12"
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <ng-template #panelTpl>
      <div
        class="arcana-select__panel"
        [style.top.px]="panelPos.top"
        [style.left.px]="panelPos.left"
        style="position: fixed; width: max-content; max-width: calc(100vw - 16px);"
        [style.minWidth.px]="panelPos.minWidth"
        [style.maxHeight.px]="panelPos.maxHeight"
        role="listbox"
        tabindex="-1"
        (keydown)="onPanelKeydown($event)"
      >
        @if (searchable) {
          <div class="arcana-select__search">
            <svg class="arcana-select__search-icon" width="14" height="14" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              #searchInput
              [value]="searchTerm"
              (input)="onSearch($event)"
              type="search"
              name="arcana-select-search"
              class="arcana-select__search-input"
              [placeholder]="searchPlaceholder"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
          </div>
        }

        <ul class="arcana-select__list">
          @for (opt of filteredOptions; track $index) {
            @if (startsGroup(opt, $index)) {
              <li class="arcana-select__group" role="presentation">
                @if ($index > 0) {
                  <span class="arcana-select__group-separator"></span>
                }
                <span class="arcana-select__group-label">
                  @if (groupLabelTemplate) {
                    <ng-container [ngTemplateOutlet]="groupLabelTemplate"
                                  [ngTemplateOutletContext]="{ $implicit: opt.group, group: opt.group }"></ng-container>
                  } @else {
                    {{ opt.group }}
                  }
                </span>
              </li>
            }
            <li
              class="arcana-select__item"
              [class.is-selected]="isSelected(opt)"
              [class.is-highlighted]="highlightedIndex === $index"
              [class.is-disabled]="opt.disabled"
              role="option"
              [attr.aria-selected]="isSelected(opt)"
              [attr.aria-disabled]="opt.disabled || false"
              (mouseenter)="!opt.disabled && (highlightedIndex = $index)"
              (click)="onItemClick(opt)"
            >
              @if (optionPrefixTemplate) {
                <span class="arcana-select__option-prefix">
                  <ng-container [ngTemplateOutlet]="optionPrefixTemplate"
                                [ngTemplateOutletContext]="optionTemplateContext(opt)"></ng-container>
                </span>
              }
              @if (opt.color) {
                <span class="arcana-select__dot" [style.background]="opt.color" aria-hidden="true"></span>
              }
              <span class="arcana-select__item-body">
                <span class="arcana-select__item-label">{{ opt.label }}</span>
                @if (opt.description) {
                  <span class="arcana-select__item-desc">{{ opt.description }}</span>
                }
              </span>
              @if (optionSuffixTemplate) {
                <span class="arcana-select__option-suffix">
                  <ng-container [ngTemplateOutlet]="optionSuffixTemplate"
                                [ngTemplateOutletContext]="optionTemplateContext(opt)"></ng-container>
                </span>
              }
              @if (isSelected(opt)) {
                <svg class="arcana-select__item-check" width="14" height="14" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                     stroke-linejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              }
            </li>
          }

          @if (!filteredOptions.length) {
            <li class="arcana-select__empty">
              {{ searchTerm.trim() ? "Nenhum resultado" : "Nenhuma opção" }}
            </li>
          }
        </ul>

        @if (showFooter && multiple) {
          <div class="arcana-select__footer">
            <span class="arcana-select__footer-count">{{ footerCountText }}</span>
            <button type="button" class="arcana-select__footer-clear"
                    (click)="onFooterClearClick($event)">{{ clearLabel }}</button>
          </div>
        }
      </div>
    </ng-template>
  `
})
export class ArcanaSelectComponent implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild("trigger") triggerRef?: ElementRef<HTMLButtonElement>;
  @ViewChild("panelTpl") panelTpl?: TemplateRef<unknown>;
  @ViewChild("searchInput") searchInputRef?: ElementRef<HTMLInputElement>;

  @Input() value: unknown = null;
  @Input() options: SelectOption[] | string[] | number[] = [];
  @Input() placeholder = "Selecione…";
  @Input() disabled = false;
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() multiple = false;
  @Input() clearable = true;
  @Input() searchable = false;
  @Input() searchPlaceholder = "Buscar...";
  /** `"labels"` (default) ou `"dots"` (bolinhas coloridas no trigger; requer `multiple`). */
  @Input() triggerMode: "labels" | "dots" = "labels";
  /** Classe FontAwesome de um ícone à esquerda no trigger. */
  @Input() icon = "";
  /** Cor CSS inline aplicada no `icon`. */
  @Input() iconColor = "";
  @Input() prefixTemplate?: TemplateRef<{
    selectedOptions: SelectOption[];
    open: boolean;
  }>;
  @Input() suffixTemplate?: TemplateRef<{
    selectedOptions: SelectOption[];
    open: boolean;
  }>;
  @Input() optionPrefixTemplate?: TemplateRef<{
    $implicit: SelectOption;
    option: SelectOption;
    selected: boolean;
  }>;
  @Input() optionSuffixTemplate?: TemplateRef<{
    $implicit: SelectOption;
    option: SelectOption;
    selected: boolean;
  }>;
  @Input() groupLabelTemplate?: TemplateRef<{
    $implicit: string;
    group: string;
  }>;
  /** Rodapé do painel (só em `multiple`) com contagem + botão de limpar. */
  @Input() showFooter = false;
  /** Texto da contagem; `{count}` vira o total selecionado. */
  @Input() footerCountLabel = "{count} selecionada(s)";
  /** Rótulo do botão de limpar do rodapé. */
  @Input() clearLabel = "Limpar";
  @Input() className = "";

  @Output() valueChange = new EventEmitter<unknown>();
  @Output() change = new EventEmitter<unknown>();

  isOpen = false;
  highlightedIndex = -1;
  searchTerm = "";
  panelPos: PanelPos = { top: 0, left: 0, minWidth: 0, maxHeight: 280 };

  private view?: EmbeddedViewRef<unknown>;
  private panelEl?: HTMLElement;

  private readonly onDocumentClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (this.triggerRef?.nativeElement.contains(target)) return;
    if (this.panelEl?.contains(target)) return;
    this.close();
    this.cdr.markForCheck();
  };
  private readonly reposition = () => {
    this.updatePanelPosition();
    this.cdr.markForCheck();
  };

  get normalizedOptions(): SelectOption[] {
    return (this.options as unknown[]).map((opt) =>
      typeof opt === "string" || typeof opt === "number"
        ? ({ label: String(opt), value: opt } as SelectOption)
        : (opt as SelectOption)
    );
  }

  get filteredOptions(): SelectOption[] {
    const all = this.normalizedOptions;
    if (!this.searchable) return all;
    const needle = this.searchTerm.trim().toLowerCase();
    if (!needle) return all;
    return all.filter((o) => String(o.label).toLowerCase().includes(needle));
  }

  get selectedOptions(): SelectOption[] {
    if (this.multiple) {
      const arr = Array.isArray(this.value) ? (this.value as unknown[]) : [];
      return this.normalizedOptions.filter((o) => arr.includes(o.value));
    }
    const single = this.normalizedOptions.find((o) => o.value === this.value);
    return single ? [single] : [];
  }

  get hasValue(): boolean {
    if (this.multiple) return Array.isArray(this.value) && (this.value as unknown[]).length > 0;
    return this.value !== null && this.value !== undefined && this.value !== "";
  }

  get displayLabel(): string {
    return this.hasValue ? this.selectedOptions.map((o) => o.label).join(", ") : this.placeholder;
  }

  get canClear(): boolean {
    return this.clearable && !this.disabled && this.hasValue;
  }

  /** Modo bolinhas só faz sentido em multi-select. */
  get isDotsMode(): boolean {
    return this.triggerMode === "dots" && this.multiple;
  }

  get selectedCount(): number {
    if (this.multiple) return Array.isArray(this.value) ? (this.value as unknown[]).length : 0;
    return this.hasValue ? 1 : 0;
  }

  get footerCountText(): string {
    return String(this.footerCountLabel).replace("{count}", String(this.selectedCount));
  }

  get triggerTemplateContext(): { selectedOptions: SelectOption[]; open: boolean } {
    return { selectedOptions: this.selectedOptions, open: this.isOpen };
  }

  optionTemplateContext(opt: SelectOption): {
    $implicit: SelectOption;
    option: SelectOption;
    selected: boolean;
  } {
    return { $implicit: opt, option: opt, selected: this.isSelected(opt) };
  }

  startsGroup(opt: SelectOption, index: number): boolean {
    return Boolean(opt.group) &&
      opt.group !== (index > 0 ? this.filteredOptions[index - 1]?.group : undefined);
  }

  /** Cor da bolinha; fallback zinc-500 quando a opção não define `color`. */
  dotColor(opt: SelectOption): string {
    return opt.color || "#71717a";
  }

  get rootClass(): string {
    return [
      "arcana-select",
      `arcana-select--${this.size}`,
      this.disabled ? "arcana-select--disabled" : "",
      this.isOpen ? "arcana-select--open" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  isSelected(opt: SelectOption): boolean {
    if (this.multiple) return Array.isArray(this.value) && (this.value as unknown[]).includes(opt.value);
    return opt.value === this.value;
  }

  private firstEnabledIndex(list: SelectOption[]): number {
    return list.findIndex((o) => !o.disabled);
  }

  toggle(): void {
    if (this.disabled) return;
    this.isOpen ? this.close() : this.open();
  }

  open(): void {
    if (this.disabled || this.isOpen || !this.panelTpl) return;
    const trigger = this.triggerRef?.nativeElement;
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
      this.panelPos = { top: rect.bottom + 4, left: rect.left, minWidth: rect.width, maxHeight: 280 };
    }
    const list = this.filteredOptions;
    const currentIdx = list.findIndex((o) => this.isSelected(o));
    this.highlightedIndex = currentIdx >= 0 ? currentIdx : this.firstEnabledIndex(list);
    this.isOpen = true;

    this.view = this.vcr.createEmbeddedView(this.panelTpl);
    this.view.detectChanges();
    this.panelEl = this.view.rootNodes[0] as HTMLElement;
    document.body.appendChild(this.panelEl);

    document.addEventListener("mousedown", this.onDocumentClick, true);
    window.addEventListener("scroll", this.reposition, true);
    window.addEventListener("resize", this.reposition);

    requestAnimationFrame(() => {
      this.updatePanelPosition();
      this.cdr.markForCheck();
      const focusTarget = this.searchable ? this.searchInputRef?.nativeElement : this.panelEl;
      focusTarget?.focus({ preventScroll: true });
    });
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.searchTerm = "";
    document.removeEventListener("mousedown", this.onDocumentClick, true);
    window.removeEventListener("scroll", this.reposition, true);
    window.removeEventListener("resize", this.reposition);
    this.view?.destroy();
    this.view = undefined;
    this.panelEl = undefined;
    this.triggerRef?.nativeElement.focus({ preventScroll: true });
  }

  private updatePanelPosition(): void {
    const trigger = this.triggerRef?.nativeElement;
    const panel = this.panelEl;
    if (!trigger || !panel) return;
    const rect = trigger.getBoundingClientRect();
    const panelHeight = panel.offsetHeight || 240;
    const panelWidth = panel.offsetWidth || rect.width;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const flipUp = spaceBelow < panelHeight + 16 && spaceAbove > spaceBelow;
    this.panelPos = {
      left: Math.max(8, Math.min(rect.left, window.innerWidth - panelWidth - 8)),
      minWidth: rect.width,
      top: flipUp ? Math.max(8, rect.top - panelHeight - 4) : rect.bottom + 4,
      maxHeight: flipUp ? Math.min(280, spaceAbove - 16) : Math.min(280, spaceBelow - 16)
    };
  }

  onSearch(ev: Event): void {
    this.searchTerm = (ev.target as HTMLInputElement).value;
    this.highlightedIndex = this.firstEnabledIndex(this.filteredOptions);
    this.updatePanelPosition();
  }

  private emit(v: unknown): void {
    this.valueChange.emit(v);
    this.change.emit(v);
  }

  onItemClick(opt: SelectOption): void {
    if (opt.disabled) return;
    if (this.multiple) {
      const current = Array.isArray(this.value) ? [...(this.value as unknown[])] : [];
      const idx = current.indexOf(opt.value);
      idx >= 0 ? current.splice(idx, 1) : current.push(opt.value);
      this.emit(current);
      this.updatePanelPosition();
      return;
    }
    this.emit(opt.value);
    this.close();
  }

  clear(): void {
    if (this.disabled) return;
    this.emit(this.multiple ? [] : null);
  }

  onClearClick(ev: Event): void {
    ev.stopPropagation();
    this.clear();
  }

  /** Limpar do rodapé: emite `[]` e MANTÉM o painel aberto. */
  onFooterClearClick(ev: Event): void {
    ev.stopPropagation();
    this.clear();
    this.cdr.markForCheck();
  }

  private moveHighlight(delta: 1 | -1): void {
    const list = this.filteredOptions;
    const len = list.length;
    if (!len) return;
    let idx = this.highlightedIndex;
    for (let i = 0; i < len; i++) {
      idx = (idx + delta + len) % len;
      if (!list[idx].disabled) {
        this.highlightedIndex = idx;
        requestAnimationFrame(() => {
          const item = this.panelEl?.querySelector<HTMLElement>(".arcana-select__item.is-highlighted");
          item?.scrollIntoView({ block: "nearest" });
        });
        return;
      }
    }
  }

  onTriggerKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.open();
    }
  }

  onPanelKeydown(e: KeyboardEvent): void {
    if (e.key === "Escape" || e.key === "Tab") {
      e.preventDefault();
      this.close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.moveHighlight(1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.moveHighlight(-1);
      return;
    }
    if (e.key === "Enter" || (e.key === " " && !this.searchable)) {
      e.preventDefault();
      const opt = this.filteredOptions[this.highlightedIndex];
      if (opt && !opt.disabled) this.onItemClick(opt);
      return;
    }
    if (e.key === "Home" && !this.searchable) {
      e.preventDefault();
      this.highlightedIndex = this.firstEnabledIndex(this.filteredOptions);
      return;
    }
    if (e.key === "End" && !this.searchable) {
      e.preventDefault();
      const list = this.filteredOptions;
      for (let i = list.length - 1; i >= 0; i--) {
        if (!list[i].disabled) {
          this.highlightedIndex = i;
          return;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.close();
  }
}
