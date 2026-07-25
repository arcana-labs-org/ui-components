import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef,
  ViewChild, ViewContainerRef, inject
} from "@angular/core";
import { placePanel } from "../core/popover";

/**
 * `ArcanaTreeSelectComponent` — Angular port do SFC Vue `ArcanaTreeSelect`.
 *
 * Attribute selector num `<div>` (`<div arcanaTreeSelect>`): select hierárquico
 * (árvore) arcana-style, sem Element Plus e agnóstico de domínio — os nós chegam
 * prontos pelo input `options`, o componente nunca busca dados por conta própria.
 * Emite o MESMO markup e as MESMAS classes `.arcana-tree-select*` do Vue.
 *
 * Estrutura: um trigger (botão no modo simples, caixa de tags removíveis no
 * `multiple`) que abre um painel TELEPORTADO pro `<body>` com um campo de busca +
 * a árvore navegável. Clicar num nó seleciona; num nó não-selecionável, expande.
 *
 * Decisão sobre o portal (sem deps novas — NÃO usa CDK Overlay):
 * - O painel vive num `<ng-template>`; ao abrir criamos um `EmbeddedViewRef` via
 *   `ViewContainerRef` e MOVEMOS seus `rootNodes` pro `document.body` (mesma ideia
 *   do `ArcanaSelect`/`ArcanaDatePicker`). Posicionamento por `placePanel`
 *   (`core/popover`) com `matchWidth`; fecha em click-fora / Escape / scroll externo
 *   e reposiciona no resize.
 *
 * Busca: filtra a árvore preservando os ancestrais dos matches, auto-expande tudo
 * enquanto há termo, destaca o trecho encontrado com `<mark>` e mostra `emptyText`
 * quando nada casa. A comparação ignora acentos e caixa. O rótulo é ESCAPADO
 * (`escapeHtml`) antes de virar HTML e vai pro DOM via `[innerHTML]`, que o Angular
 * ainda sanitiza (`SecurityContext.HTML`) — nunca injetamos HTML cru do consumidor.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange` (suporta `[(value)]`);
 * - `emit('change')` → `@Output() change`.
 */

/** Nó da árvore. `children` vazio/ausente ⇒ folha. */
export interface TreeSelectNode {
  id: string | number;
  name: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

export type TreeSelectValue = string | number | null | (string | number)[];

/** Linha achatada da árvore, pronta pro `@for` (a recursão vira profundidade + indent). */
interface TreeRow {
  key: string;
  node: TreeSelectNode;
  level: number;
  hasChildren: boolean;
  expanded: boolean;
  selectable: boolean;
  selected: boolean;
  disabled: boolean;
  html: string;
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

/** Painel estimado antes da primeira medição (evita flip errado no 1º frame). */
const PANEL_ESTIMATE = { width: 280, height: 340 };

@Component({
  selector: "div[arcanaTreeSelect]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "rootClass" },
  template: `
    @if (multiple) {
      <!--
        Trigger (modo múltiplo): caixa de tags removíveis. É uma <div> (e não
        <button>) porque cada tag traz seu próprio <button> de remover — botão
        dentro de botão é HTML inválido.
      -->
      <div
        #triggerMultiple
        class="arcana-tree-select__trigger arcana-tree-select__trigger--multiple"
        [class.arcana-tree-select__trigger--open]="isOpen"
        [class.arcana-tree-select__trigger--has-clear]="canClear"
        [class.arcana-tree-select__trigger--disabled]="disabled"
        role="combobox"
        aria-haspopup="tree"
        [attr.aria-expanded]="isOpen"
        [attr.aria-label]="ariaLabel"
        [attr.aria-disabled]="disabled"
        [attr.tabindex]="disabled ? -1 : 0"
        (click)="toggle()"
        (keydown)="onTriggerKeydown($event)"
      >
        <span class="arcana-tree-select__tags">
          @for (id of selectedIds; track $index) {
            <span class="arcana-tree-select__tag">
              <span class="arcana-tree-select__tag-label">{{ labelFor(id) }}</span>
              @if (!disabled) {
                <button
                  type="button"
                  class="arcana-tree-select__tag-remove"
                  [attr.aria-label]="'Remover ' + labelFor(id)"
                  (click)="onTagRemoveClick($event, id)"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              }
            </span>
          }
          @if (!selectedIds.length) {
            <span class="arcana-tree-select__placeholder">{{ placeholder }}</span>
          }
        </span>
        @if (canClear) {
          <span
            class="arcana-tree-select__clear"
            role="button"
            tabindex="-1"
            aria-label="Limpar"
            (click)="onClearClick($event)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </span>
        }
        <svg class="arcana-tree-select__caret" [class.is-open]="isOpen" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    } @else {
      <!-- Trigger (modo simples): botão com o rótulo do nó selecionado. -->
      <button
        #triggerSingle
        type="button"
        class="arcana-tree-select__trigger"
        [class.arcana-tree-select__trigger--open]="isOpen"
        [class.arcana-tree-select__trigger--has-clear]="canClear"
        [class.arcana-tree-select__trigger--disabled]="disabled"
        [disabled]="disabled"
        aria-haspopup="tree"
        [attr.aria-expanded]="isOpen"
        [attr.aria-label]="ariaLabel"
        (click)="toggle()"
        (keydown)="onTriggerKeydown($event)"
      >
        <span
          class="arcana-tree-select__label"
          [class.arcana-tree-select__label--placeholder]="!hasValue"
        >{{ displayLabel }}</span>
        @if (canClear) {
          <span
            class="arcana-tree-select__clear"
            role="button"
            tabindex="-1"
            aria-label="Limpar"
            (click)="onClearClick($event)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </span>
        }
        <svg class="arcana-tree-select__caret" [class.is-open]="isOpen" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
    }

    <!--
      Painel teleportado pro <body> (position: fixed via placePanel) pra
      escapar de qualquer ancestral com overflow:hidden / z-index restritivo.
    -->
    <ng-template #panelTpl>
      <div
        [class]="panelClasses"
        [style]="panelStyle"
        [attr.aria-label]="ariaLabel"
        tabindex="-1"
        (keydown)="onPanelKeydown($event)"
      >
        <div class="arcana-tree-select__search">
          <svg class="arcana-tree-select__search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            #searchInput
            [value]="searchTerm"
            (input)="onSearch($event)"
            type="search"
            name="arcana-tree-select-search"
            class="arcana-tree-select__search-input"
            [placeholder]="searchPlaceholder"
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
          @for (row of visibleRows; track $index) {
            <div
              class="arcana-tree-select__node"
              [class.is-selected]="row.selected"
              [class.is-selectable]="row.selectable"
              [class.is-branch]="row.hasChildren"
              [class.is-disabled]="row.disabled"
              role="treeitem"
              [attr.aria-level]="row.level + 1"
              [attr.aria-expanded]="row.hasChildren ? row.expanded : null"
              [attr.aria-selected]="row.selected"
              [attr.aria-disabled]="row.disabled || null"
              (click)="onNodeClick(row)"
            >
              <span
                class="arcana-tree-select__indent"
                [style.width.px]="row.level * 14"
                aria-hidden="true"
              ></span>

              <!-- Chevron: só em nós com filhos; clique expande sem selecionar. -->
              @if (row.hasChildren) {
                <span
                  class="arcana-tree-select__chevron"
                  [class.is-expanded]="row.expanded"
                  role="button"
                  tabindex="-1"
                  [attr.aria-label]="row.expanded ? 'Recolher' : 'Expandir'"
                  (click)="onChevronClick($event, row)"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
              } @else {
                <span class="arcana-tree-select__chevron arcana-tree-select__chevron--empty" aria-hidden="true"></span>
              }

              <!-- Pasta (nó com filhos) vs documento (folha) -->
              @if (row.hasChildren) {
                <svg
                  class="arcana-tree-select__icon arcana-tree-select__icon--folder"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                ><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
              } @else {
                <svg
                  class="arcana-tree-select__icon arcana-tree-select__icon--leaf"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              }

              <!-- Conteudo ja escapado em highlight() (+ sanitizacao do Angular). -->
              <span class="arcana-tree-select__node-label" [innerHTML]="row.html"></span>

              @if (row.selected) {
                <svg
                  class="arcana-tree-select__check"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                ><polyline points="20 6 9 17 4 12" /></svg>
              }
            </div>
          }

          @if (!visibleRows.length) {
            <div class="arcana-tree-select__empty">{{ emptyText }}</div>
          }
        </div>
      </div>
    </ng-template>
  `
})
export class ArcanaTreeSelectComponent implements OnChanges, OnDestroy {
  @Input() value: TreeSelectValue = null;
  @Input() options: TreeSelectNode[] = [];
  /** Seleção múltipla: `value` vira array e o trigger mostra tags removíveis. */
  @Input() multiple = false;
  /** `false` (default): nós com filhos apenas expandem; só folhas selecionam. */
  @Input() allowParentSelection = false;
  @Input() disabled = false;
  @Input() placeholder = "Selecione…";
  @Input() searchPlaceholder = "Buscar...";
  @Input() emptyText = "Nenhum resultado encontrado";
  /** Mostra o X de limpar no hover do trigger. */
  @Input() clearable = true;
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() ariaLabel?: string;
  /**
   * Classe extra aplicada ao painel. Como o painel é teleportado pro `<body>`,
   * um seletor no wrapper do campo não o alcança — use isto pra escopar tema
   * (os custom properties `--arcana-tree-select-*`) a uma instância específica.
   */
  @Input() panelClass?: string;

  @Output() valueChange = new EventEmitter<TreeSelectValue>();
  @Output() change = new EventEmitter<TreeSelectValue>();

  @ViewChild("triggerSingle") triggerSingleRef?: ElementRef<HTMLButtonElement>;
  @ViewChild("triggerMultiple") triggerMultipleRef?: ElementRef<HTMLElement>;
  @ViewChild("panelTpl") panelTpl?: TemplateRef<unknown>;
  @ViewChild("searchInput") searchInputRef?: ElementRef<HTMLInputElement>;

  isOpen = false;
  searchTerm = "";
  expandedKeys: string[] = [];
  panelStyle = "";

  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private embeddedView?: EmbeddedViewRef<unknown>;
  private panelEl?: HTMLElement;
  private removeListeners: (() => void) | null = null;

  /* ─────────────────────────── estado derivado ───────────────────────────── */

  get rootClass(): string {
    return [
      "arcana-tree-select",
      `arcana-tree-select--${this.size}`,
      this.disabled ? "arcana-tree-select--disabled" : "",
      this.isOpen ? "arcana-tree-select--open" : "",
      this.multiple ? "arcana-tree-select--multiple" : ""
    ].filter(Boolean).join(" ");
  }

  get panelClasses(): string {
    return ["arcana-tree-select__panel", this.panelClass].filter(Boolean).join(" ");
  }

  get isSearching(): boolean {
    return this.searchTerm.trim().length > 0;
  }

  get selectedIds(): (string | number)[] {
    const value = this.value;
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined || value === "") return [];
    return [value];
  }

  get hasValue(): boolean {
    return this.selectedIds.length > 0;
  }

  get canClear(): boolean {
    return this.clearable && !this.disabled && this.hasValue;
  }

  get displayLabel(): string {
    if (!this.hasValue) return this.placeholder;
    return this.selectedIds.map((id) => this.labelFor(id)).join(", ");
  }

  /** Árvore após a busca: mantém matches + todos os seus ancestrais. */
  get filteredOptions(): TreeSelectNode[] {
    if (!this.isSearching) return this.options;
    return this.filterTree(this.options, this.normalize(this.searchTerm));
  }

  /** Árvore achatada em linhas visíveis (respeita expandido/recolhido). */
  get visibleRows(): TreeRow[] {
    const rows: TreeRow[] = [];
    const walk = (nodes: TreeSelectNode[], level: number): void => {
      for (const node of nodes) {
        const key = String(node.id);
        const hasChildren = Boolean(node.children && node.children.length);
        const expanded = this.isSearching || this.expandedKeys.includes(key);
        const disabled = Boolean(node.disabled);

        rows.push({
          key,
          node,
          level,
          hasChildren,
          expanded,
          disabled,
          selectable: !disabled && (!hasChildren || this.allowParentSelection),
          selected: this.isSelected(node.id),
          html: this.highlight(node.name)
        });

        if (hasChildren && expanded) walk(node.children as TreeSelectNode[], level + 1);
      }
    };
    walk(this.filteredOptions, 0);
    return rows;
  }

  /* ─────────────────────────── helpers de árvore ─────────────────────────── */

  /** Ids podem chegar como string ou number vindos de APIs distintas. */
  private sameId(a: string | number, b: string | number): boolean {
    return String(a) === String(b);
  }

  private findNode(nodes: TreeSelectNode[], id: string | number): TreeSelectNode | null {
    for (const node of nodes) {
      if (this.sameId(node.id, id)) return node;
      if (node.children && node.children.length) {
        const found = this.findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  /** Chaves dos ancestrais de `id` (exclui o próprio nó). `null` se não achar. */
  private pathToId(nodes: TreeSelectNode[], id: string | number, acc: string[] = []): string[] | null {
    for (const node of nodes) {
      if (this.sameId(node.id, id)) return acc;
      if (node.children && node.children.length) {
        const found = this.pathToId(node.children, id, [...acc, String(node.id)]);
        if (found) return found;
      }
    }
    return null;
  }

  /** Rótulo do id; cai pro próprio id quando o nó ainda não está em `options`. */
  labelFor(id: string | number): string {
    const node = this.findNode(this.options, id);
    return node ? node.name : String(id);
  }

  isSelected(id: string | number): boolean {
    return this.selectedIds.some((selected) => this.sameId(selected, id));
  }

  private normalize(text: string): string {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  private filterTree(nodes: TreeSelectNode[], query: string): TreeSelectNode[] {
    const result: TreeSelectNode[] = [];
    for (const node of nodes) {
      const matches = this.normalize(node.name).includes(query);
      const children = node.children && node.children.length
        ? this.filterTree(node.children, query)
        : [];

      if (matches || children.length) {
        result.push({
          ...node,
          // Nó que casa sozinho mantém a subárvore inteira; caso contrário
          // mostra só o caminho até os descendentes que casaram.
          children: children.length ? children : (matches ? node.children : [])
        });
      }
    }
    return result;
  }

  private escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
  }

  /** Escapa o rótulo e envolve os trechos que casam com a busca em `<mark>`. */
  private highlight(text: string): string {
    const term = this.searchTerm.trim();
    if (!term) return this.escapeHtml(text);

    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    let out = "";
    let last = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (!match[0].length) { regex.lastIndex++; continue; }
      out += this.escapeHtml(text.slice(last, match.index));
      out += `<mark class="arcana-tree-select__mark">${this.escapeHtml(match[0])}</mark>`;
      last = match.index + match[0].length;
    }
    return out + this.escapeHtml(text.slice(last));
  }

  /* ─────────────────────────── expansão ──────────────────────────────────── */

  toggleExpand(key: string): void {
    const index = this.expandedKeys.indexOf(key);
    if (index >= 0) this.expandedKeys.splice(index, 1);
    else this.expandedKeys.push(key);
    this.refreshPanel();
  }

  onChevronClick(event: Event, row: TreeRow): void {
    event.stopPropagation();
    this.toggleExpand(row.key);
  }

  /** Abre o caminho até cada valor selecionado (mantém o que já estava aberto). */
  private expandToValue(): void {
    const keys = new Set(this.expandedKeys);
    for (const id of this.selectedIds) {
      const path = this.pathToId(this.options, id);
      if (path) path.forEach((key) => keys.add(key));
    }
    this.expandedKeys = Array.from(keys);
  }

  /* ─────────────────────────── seleção ───────────────────────────────────── */

  private emitValue(value: TreeSelectValue): void {
    this.valueChange.emit(value);
    this.change.emit(value);
  }

  onNodeClick(row: TreeRow): void {
    if (!row.selectable) {
      if (row.hasChildren) this.toggleExpand(row.key);
      return;
    }

    if (this.multiple) {
      const current = [...this.selectedIds];
      const index = current.findIndex((id) => this.sameId(id, row.node.id));
      if (index >= 0) current.splice(index, 1);
      else current.push(row.node.id);
      this.emitValue(current);
      this.refreshPanel();
      return;
    }

    this.emitValue(row.node.id);
    this.close();
  }

  removeValue(id: string | number): void {
    if (this.disabled) return;
    this.emitValue(this.selectedIds.filter((selected) => !this.sameId(selected, id)));
  }

  onTagRemoveClick(event: Event, id: string | number): void {
    event.stopPropagation();
    this.removeValue(id);
  }

  clear(): void {
    if (this.disabled) return;
    this.emitValue(this.multiple ? [] : null);
  }

  onClearClick(event: Event): void {
    event.stopPropagation();
    this.clear();
  }

  /* ─────────────────────── abertura / fechamento ─────────────────────────── */

  toggle(): void {
    if (this.disabled) return;
    if (this.isOpen) this.close();
    else this.open();
  }

  open(): void {
    if (this.disabled || this.isOpen || !this.panelTpl) return;

    this.searchTerm = "";
    this.expandToValue();

    // Pré-posiciona com a estimativa pra que o painel já monte na largura
    // final (medir depois de montado devolve a altura correta).
    const rect = this.triggerEl?.getBoundingClientRect();
    if (rect) this.applyPlacement(rect, PANEL_ESTIMATE);

    this.isOpen = true;
    this.embeddedView = this.vcr.createEmbeddedView(this.panelTpl);
    this.embeddedView.detectChanges();
    this.panelEl = this.embeddedView.rootNodes[0] as HTMLElement;
    document.body.appendChild(this.panelEl);
    this.attachListeners();

    requestAnimationFrame(() => {
      this.reposition();
      // `preventScroll` evita que o browser role a página até o painel
      // teleportado (que fica no fim do <body>).
      const search = this.searchInputRef?.nativeElement
        ?? this.panelEl?.querySelector<HTMLInputElement>(".arcana-tree-select__search-input");
      search?.focus({ preventScroll: true });
      this.cdr.markForCheck();
    });
    this.cdr.markForCheck();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.searchTerm = "";
    this.detachListeners();
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
    this.panelEl = undefined;
    this.triggerEl?.focus({ preventScroll: true });
    this.cdr.markForCheck();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.open();
    }
  }

  onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      this.close();
    }
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    // Altura do painel muda com o filtro → recalcula a posição.
    this.refreshPanel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"] && this.isOpen) {
      this.expandToValue();
      this.refreshPanel();
    }
  }

  ngOnDestroy(): void {
    this.detachListeners();
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
    this.panelEl = undefined;
  }

  /* ─────────────────────── posicionamento ────────────────────────────────── */

  private get triggerEl(): HTMLElement | undefined {
    return this.multiple ? this.triggerMultipleRef?.nativeElement : this.triggerSingleRef?.nativeElement;
  }

  private applyPlacement(rect: DOMRect, panel: { width: number; height: number }): void {
    const place = placePanel(
      rect,
      panel,
      { width: window.innerWidth, height: window.innerHeight },
      { matchWidth: true }
    );
    this.panelStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px; width: ${place.width ?? rect.width}px`;
  }

  private reposition(): void {
    const trigger = this.triggerEl;
    const panel = this.panelEl;
    if (!trigger || !panel) return;
    this.applyPlacement(trigger.getBoundingClientRect(), {
      width: panel.offsetWidth || PANEL_ESTIMATE.width,
      height: panel.offsetHeight || PANEL_ESTIMATE.height
    });
    this.embeddedView?.detectChanges();
  }

  /** Re-renderiza o painel teleportado (fora da árvore de CD do host) e reposiciona. */
  private refreshPanel(): void {
    this.embeddedView?.detectChanges();
    this.reposition();
    this.cdr.markForCheck();
  }

  private attachListeners(): void {
    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (this.triggerEl?.contains(target) || this.panelEl?.contains(target)) return;
      this.close();
    };
    // Scroll DENTRO do painel (lista da árvore) não fecha.
    const onScroll = (event: Event) => {
      if (event.target instanceof Node && this.panelEl?.contains(event.target)) return;
      this.close();
    };
    const onResize = () => { this.reposition(); };
    const onDocKeydown = (event: KeyboardEvent) => { if (event.key === "Escape") this.close(); };
    document.addEventListener("mousedown", onMouseDown, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onDocKeydown);
    this.removeListeners = () => {
      document.removeEventListener("mousedown", onMouseDown, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onDocKeydown);
    };
  }

  private detachListeners(): void {
    this.removeListeners?.();
    this.removeListeners = null;
  }
}
