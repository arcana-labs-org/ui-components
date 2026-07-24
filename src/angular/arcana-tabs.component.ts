import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter,
  Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChildren
} from "@angular/core";
import { ArcanaTabPanelDirective } from "./tab-panel.directive";

/**
 * `ArcanaTabsComponent` — Angular port do SFC Vue `ArcanaTabs`.
 *
 * Attribute selector num `<div>` (`<div arcanaTabs>`): reproduz `.arcana-tabs`
 * (+ `--${variant}`, `--${orientation}`, `--flush`), `.arcana-tabs__list`,
 * `.arcana-tabs__trigger` (+ `is-active`/`is-disabled`/`is-tone-*`), `__trigger-icon`,
 * `__trigger-label`, `__trigger-badge`, `__group-header` e `.arcana-tabs__panel`,
 * idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - slots nomeados (um por `tab.name`) → diretiva estrutural `*arcanaTabPanel="name"`
 * - slot `#list-header` → `<ng-content select="[arcanaTabsListHeader]">`
 *
 * Nota: `tooltipPlacement` do SFC usa `<el-tooltip>` (Element Plus, Vue-only) — o port
 * Angular renderiza os triggers SEM tooltip (markup do `<button>` idêntico). A prop é
 * aceita mas ignorada nesta fase (paridade com o port React).
 */
export interface ArcanaTabItem {
  name: string | number;
  label: string;
  disabled?: boolean;
  icon?: string;
  iconColor?: string;
  badge?: string | number;
  group?: string;
  tone?: "default" | "danger";
  eager?: boolean;
}

export type ArcanaTabsVariant =
  | "pills" | "underline" | "boxed" | "sidebar" | "sidebar-soft" | "sidebar-shell" | "segmented";

type RenderableItem =
  | { type: "header"; label: string; key: string }
  | { type: "tab"; tab: ArcanaTabItem; key: string };

let uidCounter = 0;

@Component({
  selector: "div[arcanaTabs]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    "[class]": "rootClass"
  },
  template: `
    <div class="arcana-tabs__list" role="tablist" [attr.aria-label]="ariaLabel || null" (keydown)="onKeydown($event)">
      <ng-content select="[arcanaTabsListHeader]"></ng-content>

      @for (item of renderableItems; track item.key) {
        @if (item.type === 'header') {
          <div class="arcana-tabs__group-header" role="presentation">{{ item.label }}</div>
        } @else {
          <button
            #trigger
            type="button"
            [class]="triggerClass(item.tab)"
            role="tab"
            [id]="triggerId(item.tab)"
            [attr.aria-selected]="isActive(item.tab)"
            [attr.aria-controls]="panelId(item.tab)"
            [attr.aria-disabled]="isDisabled(item.tab)"
            [attr.tabindex]="isActive(item.tab) ? 0 : -1"
            [disabled]="isDisabled(item.tab)"
            (click)="select(item.tab)"
          >
            @if (item.tab.icon) {
              <i
                [class]="'arcana-tabs__trigger-icon ' + item.tab.icon"
                [style.color]="item.tab.iconColor || null"
              ></i>
            }
            <span class="arcana-tabs__trigger-label">{{ item.tab.label }}</span>
            @if (item.tab.badge != null) {
              <span class="arcana-tabs__trigger-badge">{{ item.tab.badge }}</span>
            }
          </button>
        }
      }
    </div>

    @if (keepAlive) {
      @for (tab of normalizedTabs; track tab.name) {
        @if (wasActivated(tab)) {
          <div
            class="arcana-tabs__panel"
            role="tabpanel"
            [id]="panelId(tab)"
            [attr.aria-labelledby]="triggerId(tab)"
            [attr.tabindex]="isActive(tab) ? 0 : -1"
            [hidden]="!isActive(tab) ? true : null"
            [style.display]="isActive(tab) ? null : 'none'"
          >
            <ng-container *ngTemplateOutlet="panelTemplate(tab)"></ng-container>
          </div>
        }
      }
    } @else if (activeTab) {
      <div
        class="arcana-tabs__panel"
        role="tabpanel"
        [id]="panelId(activeTab)"
        [attr.aria-labelledby]="triggerId(activeTab)"
        tabindex="0"
      >
        <ng-container *ngTemplateOutlet="panelTemplate(activeTab)"></ng-container>
      </div>
    }
  `
})
export class ArcanaTabsComponent implements OnInit, OnChanges {
  @Input({ required: true }) value!: string | number;
  @Input({ required: true }) tabs!: ArcanaTabItem[];
  @Input() variant: ArcanaTabsVariant = "pills";
  @Input() orientation: "horizontal" | "vertical" = "horizontal";
  @Input() ariaLabel = "";
  @Input() keepAlive = false;
  @Input() flush = false;
  /** Aceita, mas não renderiza tooltip (dependência el-tooltip é Vue-only). */
  @Input() tooltipPlacement = "";

  @Output() valueChange = new EventEmitter<string | number>();
  @Output() change = new EventEmitter<string | number>();

  @ViewChildren("trigger") triggerRefs!: QueryList<ElementRef<HTMLButtonElement>>;
  @ContentChildren(ArcanaTabPanelDirective) panels!: QueryList<ArcanaTabPanelDirective>;

  readonly uid = ++uidCounter;
  private activatedTabNames: string[] = [];

  ngOnInit(): void {
    if (this.value != null && this.value !== "") {
      this.activatedTabNames = [String(this.value)];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"]) {
      const v = changes["value"].currentValue;
      const name = v == null ? "" : String(v);
      if (name && !this.activatedTabNames.includes(name)) {
        this.activatedTabNames.push(name);
      }
    }
  }

  get normalizedTabs(): ArcanaTabItem[] {
    return this.tabs ?? [];
  }

  get activeTab(): ArcanaTabItem | null {
    return this.normalizedTabs.find((t) => t.name === this.value) ?? null;
  }

  private get showsGroupHeaders(): boolean {
    return this.variant === "sidebar-soft" || this.variant === "sidebar-shell";
  }

  get rootClass(): string {
    const isSidebarLike =
      this.variant === "sidebar" || this.variant === "sidebar-soft" || this.variant === "sidebar-shell";
    const effectiveOrientation = isSidebarLike ? "vertical" : this.orientation;
    return [
      "arcana-tabs",
      `arcana-tabs--${this.variant}`,
      `arcana-tabs--${effectiveOrientation}`,
      this.flush ? "arcana-tabs--flush" : ""
    ].filter(Boolean).join(" ");
  }

  get renderableItems(): RenderableItem[] {
    if (!this.showsGroupHeaders) {
      return this.normalizedTabs.map((t) => ({ type: "tab" as const, tab: t, key: String(t.name) }));
    }
    const out: RenderableItem[] = [];
    let currentGroup: string | null = null;
    for (const tab of this.normalizedTabs) {
      const tabGroup = tab.group ?? null;
      if (tabGroup && tabGroup !== currentGroup) {
        out.push({ type: "header", label: tabGroup, key: `__group__${tabGroup}` });
        currentGroup = tabGroup;
      } else if (!tabGroup) {
        currentGroup = null;
      }
      out.push({ type: "tab", tab, key: String(tab.name) });
    }
    return out;
  }

  isActive(tab: ArcanaTabItem): boolean {
    return tab.name === this.value;
  }

  isDisabled(tab: ArcanaTabItem): boolean {
    return Boolean(tab.disabled);
  }

  wasActivated(tab: ArcanaTabItem): boolean {
    return Boolean(tab.eager) || this.activatedTabNames.includes(String(tab.name));
  }

  triggerId(tab: ArcanaTabItem): string {
    return `arcana-tabs-${this.uid}-trigger-${String(tab.name)}`;
  }

  panelId(tab: ArcanaTabItem): string {
    return `arcana-tabs-${this.uid}-panel-${String(tab.name)}`;
  }

  triggerClass(tab: ArcanaTabItem): string {
    return [
      "arcana-tabs__trigger",
      this.isActive(tab) ? "is-active" : "",
      this.isDisabled(tab) ? "is-disabled" : "",
      tab.tone ? `is-tone-${tab.tone}` : ""
    ].filter(Boolean).join(" ");
  }

  panelTemplate(tab: ArcanaTabItem): TemplateRef<unknown> | null {
    return this.panels?.find((p) => String(p.name) === String(tab.name))?.templateRef ?? null;
  }

  select(tab: ArcanaTabItem): void {
    if (this.isDisabled(tab) || this.isActive(tab)) return;
    this.valueChange.emit(tab.name);
    this.change.emit(tab.name);
  }

  onKeydown(e: KeyboardEvent): void {
    const enabledTabs = this.normalizedTabs.filter((t) => !this.isDisabled(t));
    if (!enabledTabs.length) return;

    const currentIdx = enabledTabs.findIndex((t) => t.name === this.value);
    const isVertical =
      this.variant === "sidebar" ||
      this.variant === "sidebar-soft" ||
      this.variant === "sidebar-shell" ||
      this.orientation === "vertical";

    const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
    const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";

    if (e.key === nextKey) {
      e.preventDefault();
      const next = enabledTabs[(currentIdx + 1) % enabledTabs.length];
      this.select(next);
      this.focusTrigger(next);
      return;
    }
    if (e.key === prevKey) {
      e.preventDefault();
      const prev = enabledTabs[(currentIdx - 1 + enabledTabs.length) % enabledTabs.length];
      this.select(prev);
      this.focusTrigger(prev);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      this.select(enabledTabs[0]);
      this.focusTrigger(enabledTabs[0]);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      this.select(enabledTabs[enabledTabs.length - 1]);
      this.focusTrigger(enabledTabs[enabledTabs.length - 1]);
    }
  }

  private focusTrigger(tab: ArcanaTabItem): void {
    const tabIdx = this.normalizedTabs.findIndex((t) => t.name === tab.name);
    requestAnimationFrame(() => {
      this.triggerRefs?.get(tabIdx)?.nativeElement?.focus?.();
    });
  }
}
