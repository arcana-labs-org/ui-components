import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ArcanaOnboardingPanelComponent` — Angular port do SFC Vue `ArcanaOnboardingPanel`.
 *
 * Attribute selector num `<div>` (`<div arcanaOnboardingPanel>`): empty state / CTA
 * panel. Reproduz `.arcana-onboarding` (visual/ring/icon), `__title`/`__desc`/`__action`/
 * `__cta`(+`--secondary`)/`__sub-hint`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default (descrição rica) → `@Input() descriptionTemplate` (`TemplateRef`) OU
 *   `<ng-content>` (fallback: prop `description`).
 * - slot `#action` → `@Input() actionTemplate`; slot `#sub-hint` → `@Input() subHintTemplate`.
 * - `emit('action')` / `emit('secondary-action')` → `@Output() action` / `@Output() secondaryAction`.
 */
@Component({
  selector: "div[arcanaOnboardingPanel]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "class": "arcana-onboarding" },
  template: `
    <div class="arcana-onboarding__visual">
      <div class="arcana-onboarding__ring"></div>
      <div class="arcana-onboarding__ring arcana-onboarding__ring--2"></div>
      <div class="arcana-onboarding__icon">
        <i [class]="icon"></i>
      </div>
    </div>

    <h3 class="arcana-onboarding__title">{{ title }}</h3>

    @if (descriptionTemplate) {
      <p class="arcana-onboarding__desc">
        <ng-container [ngTemplateOutlet]="descriptionTemplate"></ng-container>
      </p>
    } @else if (description) {
      <p class="arcana-onboarding__desc">{{ description }}</p>
    }

    @if (actionTemplate || actionLabel || secondaryActionLabel) {
      <div class="arcana-onboarding__action">
        @if (actionTemplate) {
          <ng-container [ngTemplateOutlet]="actionTemplate"></ng-container>
        } @else {
          @if (actionLabel) {
            <button
              class="arcana-onboarding__cta"
              [disabled]="actionLoading"
              (click)="action.emit()"
            >
              @if (actionLoading) {
                <i class="fa-solid fa-spinner fa-spin"></i>
              } @else if (actionIcon) {
                <i [class]="actionIcon"></i>
              }
              <span>{{ actionLabel }}</span>
            </button>
          }
          @if (secondaryActionLabel) {
            <button
              class="arcana-onboarding__cta arcana-onboarding__cta--secondary"
              (click)="secondaryAction.emit()"
            >
              @if (secondaryActionIcon) {
                <i [class]="secondaryActionIcon"></i>
              }
              <span>{{ secondaryActionLabel }}</span>
            </button>
          }
        }
      </div>
    }

    @if (subHintTemplate || subHint) {
      <p class="arcana-onboarding__sub-hint">
        @if (subHintTemplate) {
          <ng-container [ngTemplateOutlet]="subHintTemplate"></ng-container>
        } @else {
          @if (subHintIcon) {
            <i [class]="subHintIcon"></i>
          }
          <span>{{ subHint }}</span>
        }
      </p>
    }
  `
})
export class ArcanaOnboardingPanelComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input() description = "";
  @Input() actionLabel = "";
  @Input() actionIcon = "fa-solid fa-plus";
  @Input() actionLoading = false;
  @Input() secondaryActionLabel = "";
  @Input() secondaryActionIcon = "";
  @Input() subHint = "";
  @Input() subHintIcon = "";
  @Input() descriptionTemplate?: TemplateRef<unknown>;
  @Input() actionTemplate?: TemplateRef<unknown>;
  @Input() subHintTemplate?: TemplateRef<unknown>;

  @Output() action = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();
}
