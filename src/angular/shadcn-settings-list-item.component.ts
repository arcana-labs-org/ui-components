import {
  ChangeDetectionStrategy, Component, Input, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ShadcnSettingsListItemComponent` — Angular port do SFC Vue `ShadcnSettingsListItem`.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnSettingsListItem>`): item individual da
 * `ShadcnSettingsList`. Estrutura `[label + caption] ←→ [action]`. Reproduz
 * `.shadcn-settings-list__item` (+ `--disabled`/`--nested`), `__text`/`__label`/`__caption`/
 * `__action`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default (controle à direita) → `<ng-content>`.
 * - slot `#label` / `#caption` → `@Input() labelTemplate` / `captionTemplate` (`TemplateRef`),
 *   fallback pras props string.
 */
@Component({
  selector: "div[arcanaShadcnSettingsListItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "rootClass" },
  template: `
    <div class="shadcn-settings-list__text">
      <div class="shadcn-settings-list__label">
        @if (labelTemplate) {
          <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
        } @else {
          {{ label }}
        }
      </div>
      @if (hasCaption) {
        <div class="shadcn-settings-list__caption">
          @if (captionTemplate) {
            <ng-container [ngTemplateOutlet]="captionTemplate"></ng-container>
          } @else {
            {{ caption }}
          }
        </div>
      }
    </div>
    <div class="shadcn-settings-list__action">
      <ng-content></ng-content>
    </div>
  `
})
export class ShadcnSettingsListItemComponent {
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
      "shadcn-settings-list__item",
      this.disabled ? "shadcn-settings-list__item--disabled" : "",
      this.nested ? "shadcn-settings-list__item--nested" : ""
    ].filter(Boolean).join(" ");
  }
}
