import {
  ChangeDetectionStrategy, Component, Input, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ShadcnSpecSheetComponent` — Angular port do SFC Vue `ShadcnSpecSheet`.
 *
 * Attribute selector num `<article>` (`<article arcanaShadcnSpecSheet>`): display read-only
 * de dados em formato editorial/spec sheet. Reproduz `.shadcn-spec-sheet` (+ `--flat`),
 * `__header`/`__doc-num`/`__doc-title`/`__meta`/`__meta-label`/`__footer`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default (sections) → `<ng-content>`.
 * - slots `#header` / `#title` / `#meta` / `#footer` → `@Input()` `TemplateRef`
 *   (`headerTemplate` / `titleTemplate` / `metaTemplate` / `footerTemplate`), fallback pras props.
 */
@Component({
  selector: "article[arcanaShadcnSpecSheet]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "rootClass" },
  template: `
    @if (hasHeader) {
      <header class="shadcn-spec-sheet__header">
        @if (headerTemplate) {
          <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
        } @else {
          <div>
            @if (docNum) {
              <div class="shadcn-spec-sheet__doc-num">{{ docNum }}</div>
            }
            @if (title || titleTemplate) {
              <h2 class="shadcn-spec-sheet__doc-title">
                @if (titleTemplate) {
                  <ng-container [ngTemplateOutlet]="titleTemplate"></ng-container>
                } @else {
                  {{ title }}
                }
              </h2>
            }
          </div>
          @if (hasMeta) {
            <div class="shadcn-spec-sheet__meta">
              @if (metaLabel) {
                <div class="shadcn-spec-sheet__meta-label">{{ metaLabel }}</div>
              }
              @if (metaTemplate) {
                <ng-container [ngTemplateOutlet]="metaTemplate"></ng-container>
              }
            </div>
          }
        }
      </header>
    }

    <ng-content></ng-content>

    @if (footerTemplate) {
      <footer class="shadcn-spec-sheet__footer">
        <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
      </footer>
    }
  `
})
export class ShadcnSpecSheetComponent {
  @Input() docNum = "";
  @Input() title = "";
  @Input() metaLabel = "";
  @Input() flat = false;
  @Input() headerTemplate?: TemplateRef<unknown>;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() metaTemplate?: TemplateRef<unknown>;
  @Input() footerTemplate?: TemplateRef<unknown>;

  get rootClass(): string {
    return ["shadcn-spec-sheet", this.flat ? "shadcn-spec-sheet--flat" : ""].filter(Boolean).join(" ");
  }

  get hasMeta(): boolean {
    return Boolean(this.metaLabel || this.metaTemplate);
  }

  get hasHeader(): boolean {
    return Boolean(
      this.docNum || this.title || this.metaLabel ||
      this.titleTemplate || this.headerTemplate || this.metaTemplate
    );
  }
}
