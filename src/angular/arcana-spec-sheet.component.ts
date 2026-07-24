import {
  ChangeDetectionStrategy, Component, Input, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ArcanaSpecSheetComponent` — Angular port do SFC Vue `ArcanaSpecSheet`.
 *
 * Attribute selector num `<article>` (`<article arcanaSpecSheet>`): display read-only
 * de dados em formato editorial/spec sheet. Reproduz `.arcana-spec-sheet` (+ `--flat`),
 * `__header`/`__doc-num`/`__doc-title`/`__meta`/`__meta-label`/`__footer`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default (sections) → `<ng-content>`.
 * - slots `#header` / `#title` / `#meta` / `#footer` → `@Input()` `TemplateRef`
 *   (`headerTemplate` / `titleTemplate` / `metaTemplate` / `footerTemplate`), fallback pras props.
 */
@Component({
  selector: "article[arcanaSpecSheet]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "rootClass" },
  template: `
    @if (hasHeader) {
      <header class="arcana-spec-sheet__header">
        @if (headerTemplate) {
          <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
        } @else {
          <div>
            @if (docNum) {
              <div class="arcana-spec-sheet__doc-num">{{ docNum }}</div>
            }
            @if (title || titleTemplate) {
              <h2 class="arcana-spec-sheet__doc-title">
                @if (titleTemplate) {
                  <ng-container [ngTemplateOutlet]="titleTemplate"></ng-container>
                } @else {
                  {{ title }}
                }
              </h2>
            }
          </div>
          @if (hasMeta) {
            <div class="arcana-spec-sheet__meta">
              @if (metaLabel) {
                <div class="arcana-spec-sheet__meta-label">{{ metaLabel }}</div>
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
      <footer class="arcana-spec-sheet__footer">
        <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
      </footer>
    }
  `
})
export class ArcanaSpecSheetComponent {
  @Input() docNum = "";
  @Input() title = "";
  @Input() metaLabel = "";
  @Input() flat = false;
  @Input() headerTemplate?: TemplateRef<unknown>;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() metaTemplate?: TemplateRef<unknown>;
  @Input() footerTemplate?: TemplateRef<unknown>;

  get rootClass(): string {
    return ["arcana-spec-sheet", this.flat ? "arcana-spec-sheet--flat" : ""].filter(Boolean).join(" ");
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
