import {
  ChangeDetectionStrategy, Component, Input, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ShadcnSpecSheetSectionComponent` — Angular port do SFC Vue `ShadcnSpecSheetSection`.
 *
 * Attribute selector num `<section>` (`<section arcanaShadcnSpecSheetSection>`): section
 * interna do `ShadcnSpecSheet` com ícone boxed colorido opcional + título + section-num +
 * actions + grid N-col. Reproduz `.shadcn-spec-sheet__section` (+ `--compact`), `__section-head`/
 * `-icon`(+`--${color}`)/`-title`/`-num`, `__grid` (+`--cols-${n}`/`--no-row-dividers`),
 * idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default (fields) → `<ng-content>`; slot `#title` → `@Input() titleTemplate`;
 *   slot `#actions` → `@Input() actionsTemplate`.
 */
export type SpecSheetAccentColor =
  "blue" | "emerald" | "amber" | "rose" | "violet" | "indigo" | "teal" | "slate";

@Component({
  selector: "section[arcanaShadcnSpecSheetSection]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "rootClass" },
  template: `
    @if (hasHeader) {
      <header class="shadcn-spec-sheet__section-head">
        <div class="shadcn-spec-sheet__section-head-left">
          @if (icon) {
            <span
              [class]="'shadcn-spec-sheet__section-icon shadcn-spec-sheet__section-icon--' + iconColor"
              aria-hidden="true"
            >
              <i [class]="icon"></i>
            </span>
          }
          <h3 class="shadcn-spec-sheet__section-title">
            @if (titleTemplate) {
              <ng-container [ngTemplateOutlet]="titleTemplate"></ng-container>
            } @else {
              {{ title }}
            }
          </h3>
        </div>
        <div class="shadcn-spec-sheet__section-head-right">
          @if (sectionNum) {
            <span class="shadcn-spec-sheet__section-num">{{ sectionNum }}</span>
          }
          @if (actionsTemplate) {
            <ng-container [ngTemplateOutlet]="actionsTemplate"></ng-container>
          }
        </div>
      </header>
    }

    <div [class]="gridClass">
      <ng-content></ng-content>
    </div>
  `
})
export class ShadcnSpecSheetSectionComponent {
  @Input() title = "";
  @Input() sectionNum = "";
  @Input() icon = "";
  @Input() iconColor: SpecSheetAccentColor = "slate";
  @Input() columns: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  @Input() noRowDividers = false;
  @Input() compact = false;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() actionsTemplate?: TemplateRef<unknown>;

  get rootClass(): string {
    return [
      "shadcn-spec-sheet__section",
      this.compact ? "shadcn-spec-sheet__section--compact" : ""
    ].filter(Boolean).join(" ");
  }

  get gridClass(): string {
    return [
      "shadcn-spec-sheet__grid",
      `shadcn-spec-sheet__grid--cols-${this.columns}`,
      this.noRowDividers ? "shadcn-spec-sheet__grid--no-row-dividers" : ""
    ].filter(Boolean).join(" ");
  }

  get hasHeader(): boolean {
    return Boolean(this.title || this.sectionNum || this.icon || this.titleTemplate || this.actionsTemplate);
  }
}
