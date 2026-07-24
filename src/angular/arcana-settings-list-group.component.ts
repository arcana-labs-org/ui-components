import {
  ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ArcanaSettingsListGroupComponent` — Angular port do SFC Vue `ArcanaSettingsListGroup`.
 *
 * Attribute selector num `<section>` (`<section arcanaSettingsListGroup>`): section
 * interna do `ArcanaSettingsList` com header (ícone boxed + título + meta) e opção
 * `collapsible` (header vira botão + chevron). Reproduz `.arcana-settings-list__group`
 * (+ `--compact`/`--collapsible`/`--collapsed`), `__group-head`/`-icon`/`-num`/`-title`/
 * `-meta`/`-chevron`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `<component :is="collapsible ? 'button' : 'header'">` → dois ramos `@if`.
 * - slot `#title` / `#meta` → `@Input() titleTemplate` / `metaTemplate` (`TemplateRef`),
 *   fallback pras props string. slot default → `<ng-content>`.
 */
export type SettingsGroupIconColor =
  "blue" | "emerald" | "amber" | "rose" | "violet" | "indigo" | "teal" | "slate";

@Component({
  selector: "section[arcanaSettingsListGroup]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "rootClass" },
  template: `
    @if (title || titleTemplate) {
      @if (collapsible) {
        <button
          type="button"
          class="arcana-settings-list__group-head"
          [attr.aria-expanded]="!isCollapsed"
          (click)="toggle()"
        >
          <ng-container [ngTemplateOutlet]="headInner"></ng-container>
        </button>
      } @else {
        <header class="arcana-settings-list__group-head">
          <ng-container [ngTemplateOutlet]="headInner"></ng-container>
        </header>
      }
    }

    <div [style.display]="(!collapsible || !isCollapsed) ? null : 'none'">
      <ng-content></ng-content>
    </div>

    <ng-template #headInner>
      <div class="arcana-settings-list__group-head-left">
        @if (icon) {
          <span
            [class]="'arcana-settings-list__group-icon arcana-settings-list__group-icon--' + iconColor"
            aria-hidden="true"
          >
            <i [class]="icon"></i>
          </span>
        }
        <div>
          @if (sectionNum) {
            <div class="arcana-settings-list__group-num">{{ sectionNum }}</div>
          }
          <div class="arcana-settings-list__group-title">
            @if (titleTemplate) {
              <ng-container [ngTemplateOutlet]="titleTemplate"></ng-container>
            } @else {
              {{ title }}
            }
          </div>
        </div>
      </div>

      <div class="arcana-settings-list__group-head-right">
        @if (meta || metaTemplate) {
          <div class="arcana-settings-list__group-meta">
            @if (metaTemplate) {
              <ng-container [ngTemplateOutlet]="metaTemplate"></ng-container>
            } @else {
              {{ meta }}
            }
          </div>
        }
        @if (collapsible) {
          <svg
            class="arcana-settings-list__group-chevron"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        }
      </div>
    </ng-template>
  `
})
export class ArcanaSettingsListGroupComponent implements OnInit {
  @Input() title = "";
  @Input() sectionNum = "";
  @Input() meta = "";
  @Input() icon = "";
  @Input() iconColor: SettingsGroupIconColor = "slate";
  @Input() collapsible = false;
  @Input() defaultCollapsed = false;
  @Input() compact = false;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() metaTemplate?: TemplateRef<unknown>;

  isCollapsed = false;

  ngOnInit(): void {
    this.isCollapsed = this.collapsible && this.defaultCollapsed;
  }

  get rootClass(): string {
    return [
      "arcana-settings-list__group",
      this.compact ? "arcana-settings-list__group--compact" : "",
      this.collapsible ? "arcana-settings-list__group--collapsible" : "",
      this.collapsible && this.isCollapsed ? "arcana-settings-list__group--collapsed" : ""
    ].filter(Boolean).join(" ");
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
