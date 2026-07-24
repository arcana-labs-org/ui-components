import {
  ChangeDetectionStrategy, Component, Input, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ArcanaSettingsListItemComponent` — Angular port do SFC Vue `ArcanaSettingsListItem`.
 *
 * Attribute selector num `<div>` (`<div arcanaSettingsListItem>`): item individual da
 * `ArcanaSettingsList`. Estrutura `[label + caption] ←→ [action]`. Reproduz
 * `.arcana-settings-list__item` (+ `--disabled`/`--nested`), `__text`/`__label`/`__caption`/
 * `__action`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default (controle à direita) → `<ng-content>`.
 * - slot `#label` / `#caption` → `@Input() labelTemplate` / `captionTemplate` (`TemplateRef`),
 *   fallback pras props string.
 */
@Component({
  selector: "div[arcanaSettingsListItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "rootClass" },
  template: `
    <div class="arcana-settings-list__text">
      <div class="arcana-settings-list__label">
        @if (labelTemplate) {
          <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
        } @else {
          {{ label }}
        }
      </div>
      @if (hasCaption) {
        <div class="arcana-settings-list__caption">
          @if (captionTemplate) {
            <ng-container [ngTemplateOutlet]="captionTemplate"></ng-container>
          } @else {
            {{ caption }}
          }
        </div>
      }
    </div>
    <div class="arcana-settings-list__action">
      <ng-content></ng-content>
    </div>
  `
})
export class ArcanaSettingsListItemComponent {
  @Input() label = "";
  @Input() caption = "";
  @Input() disabled = false;
  @Input() nested = false;
  @Input() labelTemplate?: TemplateRef<unknown>;
  @Input() captionTemplate?: TemplateRef<unknown>;

  get hasCaption(): boolean {
    return Boolean(this.caption) || Boolean(this.captionTemplate);
  }

  get rootClass(): string {
    return [
      "arcana-settings-list__item",
      this.disabled ? "arcana-settings-list__item--disabled" : "",
      this.nested ? "arcana-settings-list__item--nested" : ""
    ].filter(Boolean).join(" ");
  }
}
