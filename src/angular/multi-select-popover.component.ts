import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef,
  ViewChild, ViewContainerRef, inject
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `MultiSelectPopoverComponent` — Angular port do SFC Vue `MultiSelectPopover`.
 *
 * Attribute selector num `<div>` (`<div arcanaMultiSelectPopover>`): popover genérico com
 * tabs configuráveis e multi-seleção por checkbox. Reproduz `.msp`, o `.msp-trigger`
 * default (customizável via `triggerTemplate`), o painel TELEPORTADO (`.msp-panel`,
 * `.msp-segmented`/`.msp-seg`, `.msp-search-wrap`/`.msp-search`, `.msp-list`/`.msp-item`,
 * `.msp-footer`), idêntico ao Vue/React.
 *
 * Portal: mesma técnica do `ShadcnSelect` (EmbeddedView movida pro `document.body`, sem CDK).
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change'|'open'|'close')`
 *   → `@Output() change`/`opened`/`closed`
 * - slot `#trigger` → `@Input() triggerTemplate` (contexto = MultiSelectTriggerContext)
 * - slot `#item` → `@Input() itemTemplate` (contexto `{ $implicit: item, item, tab, selected }`)
 */
export interface MultiSelectTab {
  key: string;
  label: string;
  icon?: string;
  placeholder?: string;
  fetch: () => Promise<unknown[]>;
  searchFields?: string[];
  countLabel?: string;
}

export interface MultiSelectTriggerContext {
  open: () => void;
  toggle: () => void;
  isOpen: boolean;
  summary: string;
  isEmpty: boolean;
  selectedCount: number;
}

interface PanelStyle {
  top: number;
  left: number;
  width: number;
}

@Component({
  selector: "div[arcanaMultiSelectPopover]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "rootClass" },
  template: `
    @if (triggerTemplate) {
      <ng-container
        [ngTemplateOutlet]="triggerTemplate"
        [ngTemplateOutletContext]="triggerContext"
      ></ng-container>
    } @else {
      <button
        type="button"
        class="msp-trigger"
        [class.msp-trigger--open]="isOpen"
        [class.msp-trigger--empty]="isEmpty"
        (click)="toggle()"
      >
        <i [class]="triggerIcon + ' msp-trigger__icon'"></i>
        <span class="msp-trigger__summary">{{ summary }}</span>
        <i class="fa-solid fa-chevron-down msp-trigger__chevron"></i>
      </button>
    }

    <ng-template #panelTpl>
      <div
        class="msp-panel"
        style="position: fixed;"
        [style.top.px]="panelStyle.top"
        [style.left.px]="panelStyle.left"
        [style.width.px]="panelStyle.width"
        (click)="$event.stopPropagation()"
      >
        @if (tabs.length > 1) {
          <div class="msp-segmented">
            @for (t of tabs; track t.key) {
              <button
                type="button"
                class="msp-seg"
                [class.msp-seg--active]="activeKey === t.key"
                (click)="setActive(t.key)"
              >
                @if (t.icon) { <i [class]="t.icon"></i> }
                {{ t.label }}
              </button>
            }
          </div>
        }

        <div class="msp-search-wrap">
          <i class="fa-solid fa-magnifying-glass msp-search-icon"></i>
          <input
            #searchInput
            [value]="search"
            (input)="onSearch($event)"
            type="text"
            class="msp-search"
            [placeholder]="searchPlaceholder"
          />
        </div>

        @if (loading) {
          <div class="msp-empty">Carregando…</div>
        } @else if (!filteredItems.length) {
          <div class="msp-empty">Nenhum item encontrado</div>
        } @else {
          <div class="msp-list">
            @for (item of filteredItems; track item.id) {
              <div
                class="msp-item"
                [class.msp-item--selected]="isSelected(item.id)"
                (click)="toggleItem(item.id)"
              >
                <span class="msp-check">
                  @if (isSelected(item.id)) { <i class="fa-solid fa-check"></i> }
                </span>
                @if (itemTemplate) {
                  <ng-container
                    [ngTemplateOutlet]="itemTemplate"
                    [ngTemplateOutletContext]="{ $implicit: item, item: item, tab: activeTab, selected: isSelected(item.id) }"
                  ></ng-container>
                } @else {
                  <span class="msp-item__name">{{ item.name }}</span>
                }
              </div>
            }
          </div>
        }

        @if (selectedCount > 0) {
          <div class="msp-footer">
            <span class="msp-footer__count">{{ footerSummary }}</span>
            <button type="button" class="msp-footer__clear" (click)="clearActive()">Limpar</button>
          </div>
        }
      </div>
    </ng-template>
  `
})
export class MultiSelectPopoverComponent implements OnChanges, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild("panelTpl") panelTpl?: TemplateRef<unknown>;
  @ViewChild("searchInput") searchInputRef?: ElementRef<HTMLInputElement>;

  @Input() value: Record<string, number[]> = {};
  @Input() tabs: MultiSelectTab[] = [];
  @Input() emptyLabel = "Selecionar…";
  @Input() triggerIcon = "fa-solid fa-list-check";
  @Input() defaultTab = "";
  @Input() triggerTemplate?: TemplateRef<unknown>;
  @Input() itemTemplate?: TemplateRef<unknown>;
  @Input() className = "";

  @Output() valueChange = new EventEmitter<Record<string, number[]>>();
  @Output() change = new EventEmitter<Record<string, number[]>>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen = false;
  activeKey = "";
  search = "";
  cache: Record<string, unknown[]> = {};
  loadingKey: string | null = null;
  panelStyle: PanelStyle = { top: 0, left: 0, width: 280 };

  private loadingFlags: Record<string, boolean> = {};
  private loadedFlags: Record<string, boolean> = {};
  private view?: EmbeddedViewRef<unknown>;
  private panelEl?: HTMLElement;

  private readonly onOutsideClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (this.host.nativeElement.contains(target)) return;
    if (this.panelEl?.contains(target)) return;
    this.close();
  };
  private readonly onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      this.close();
    }
  };
  private readonly reposition = () => {
    this.positionPanel();
    this.cdr.markForCheck();
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["tabs"] || changes["defaultTab"]) {
      if (!this.activeKey || !this.tabs.find((t) => t.key === this.activeKey)) {
        this.activeKey = this.defaultTab || this.tabs[0]?.key || "";
      }
    }
  }

  get rootClass(): string {
    return ["msp", this.className].filter(Boolean).join(" ");
  }

  get activeTab(): MultiSelectTab | undefined {
    return this.tabs.find((t) => t.key === this.activeKey);
  }

  get items(): { id: number; name?: string }[] {
    return (this.cache[this.activeKey] ?? []) as { id: number; name?: string }[];
  }

  get loading(): boolean {
    return this.loadingKey === this.activeKey;
  }

  get searchPlaceholder(): string {
    return this.activeTab?.placeholder || `Buscar ${this.activeTab?.label?.toLowerCase() ?? ""}…`;
  }

  get filteredItems(): { id: number; name?: string }[] {
    const term = this.search.trim().toLowerCase();
    if (!term) return this.items;
    const fields = this.activeTab?.searchFields ?? ["name"];
    return this.items.filter((it) => {
      for (const f of fields) {
        const v = (it as Record<string, unknown>)[f];
        if (typeof v === "string" && v.toLowerCase().includes(term)) return true;
      }
      return false;
    });
  }

  get selectedIdsForActive(): number[] {
    return this.value?.[this.activeKey] ?? [];
  }

  get selectedCount(): number {
    return this.tabs.reduce((acc, t) => acc + (this.value?.[t.key] ?? []).length, 0);
  }

  get isEmpty(): boolean {
    return this.selectedCount === 0;
  }

  get summary(): string {
    if (this.selectedCount === 0) return this.emptyLabel;
    const names: string[] = [];
    for (const tab of this.tabs) {
      const ids = this.value?.[tab.key] ?? [];
      if (!ids.length) continue;
      const list = (this.cache[tab.key] ?? []) as { id: number; name?: string }[];
      for (const id of ids) {
        const found = list.find((x) => x.id === id);
        if (found?.name) names.push(found.name);
      }
    }
    if (names.length === 0) return `${this.selectedCount} selecionado(s)`;
    const visible = names.slice(0, 2);
    const rest = this.selectedCount - visible.length;
    return rest > 0 ? `${visible.join(", ")}, +${rest}` : visible.join(", ");
  }

  get footerSummary(): string {
    const parts: string[] = [];
    for (const tab of this.tabs) {
      const count = (this.value?.[tab.key] ?? []).length;
      if (!count) continue;
      const label = tab.countLabel ?? tab.label.toLowerCase();
      parts.push(`${count} ${label}`);
    }
    return parts.join(", ") + " selecionado(s)";
  }

  get triggerContext(): MultiSelectTriggerContext & { $implicit: MultiSelectTriggerContext } {
    const ctx: MultiSelectTriggerContext = {
      open: () => void this.open(),
      toggle: () => this.toggle(),
      isOpen: this.isOpen,
      summary: this.summary,
      isEmpty: this.isEmpty,
      selectedCount: this.selectedCount
    };
    return { ...ctx, $implicit: ctx };
  }

  isSelected(id: number): boolean {
    return this.selectedIdsForActive.includes(id);
  }

  toggle(): void {
    if (this.isOpen) this.close();
    else void this.open();
  }

  async open(): Promise<void> {
    if (!this.activeKey || this.isOpen || !this.panelTpl) return;
    this.isOpen = true;
    this.opened.emit();

    this.view = this.vcr.createEmbeddedView(this.panelTpl);
    this.view.detectChanges();
    this.panelEl = this.view.rootNodes[0] as HTMLElement;
    document.body.appendChild(this.panelEl);

    document.addEventListener("click", this.onOutsideClick, true);
    document.addEventListener("keydown", this.onKeydown);
    window.addEventListener("resize", this.reposition);
    window.addEventListener("scroll", this.reposition, true);

    requestAnimationFrame(() => {
      this.positionPanel();
      this.cdr.markForCheck();
      this.searchInputRef?.nativeElement.focus();
    });

    await Promise.all(this.tabs.map((t) => this.ensureLoaded(t.key)));
    this.cdr.markForCheck();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.search = "";
    document.removeEventListener("click", this.onOutsideClick, true);
    document.removeEventListener("keydown", this.onKeydown);
    window.removeEventListener("resize", this.reposition);
    window.removeEventListener("scroll", this.reposition, true);
    this.view?.destroy();
    this.view = undefined;
    this.panelEl = undefined;
    this.closed.emit();
    this.cdr.markForCheck();
  }

  private positionPanel(): void {
    const trigger = this.host.nativeElement.firstElementChild as HTMLElement | null;
    const panel = this.panelEl;
    if (!trigger || !panel) return;
    const tRect = trigger.getBoundingClientRect();
    const pRect = panel.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const margin = 8;
    const offset = 4;

    let top = tRect.bottom + offset;
    if (top + pRect.height > vh - margin) {
      const flipped = tRect.top - pRect.height - offset;
      if (flipped >= margin) top = flipped;
    }
    const width = Math.max(tRect.width, 280);
    let left = tRect.left;
    if (left + width > vw - margin) left = Math.max(margin, vw - width - margin);

    this.panelStyle = { top, left, width };
  }

  private async ensureLoaded(key: string): Promise<void> {
    if (this.loadedFlags[key] || this.loadingFlags[key]) return;
    const tab = this.tabs.find((t) => t.key === key);
    if (!tab) return;
    this.loadingFlags[key] = true;
    this.loadingKey = key;
    this.cdr.markForCheck();
    try {
      const result = await tab.fetch();
      const data = Array.isArray(result) ? result : (result as { data?: unknown[] })?.data ?? [];
      this.cache = { ...this.cache, [key]: data };
      this.loadedFlags[key] = true;
    } catch (e) {
      console.error(`[multi-select-popover] erro ao carregar tab "${key}"`, e);
    } finally {
      this.loadingFlags[key] = false;
      if (this.loadingKey === key) this.loadingKey = null;
      this.cdr.markForCheck();
    }
  }

  async setActive(key: string): Promise<void> {
    if (this.activeKey === key) return;
    this.activeKey = key;
    this.search = "";
    await this.ensureLoaded(key);
    this.cdr.markForCheck();
  }

  onSearch(ev: Event): void {
    this.search = (ev.target as HTMLInputElement).value;
  }

  private emitValue(next: Record<string, number[]>): void {
    this.valueChange.emit(next);
    this.change.emit(next);
  }

  toggleItem(id: number): void {
    const next: Record<string, number[]> = { ...(this.value || {}) };
    const arr = [...(next[this.activeKey] ?? [])];
    const idx = arr.indexOf(id);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(id);
    next[this.activeKey] = arr;
    this.emitValue(next);
  }

  clearActive(): void {
    const next: Record<string, number[]> = { ...(this.value || {}) };
    next[this.activeKey] = [];
    this.emitValue(next);
  }

  ngOnDestroy(): void {
    this.close();
  }
}
