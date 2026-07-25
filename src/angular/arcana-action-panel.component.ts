import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { ArcanaButtonComponent } from "./arcana-button.component";

/**
 * `ArcanaActionPanelComponent` — Angular port do SFC Vue `ArcanaActionPanel`.
 *
 * Attribute selector num `<div>` (`<div arcanaActionPanel>`): empty state / CTA
 * panel. Reproduz `.arcana-action-panel` (visual/ring/icon), `__title`/`__desc`/`__action`/
 * `__cta`(+`--secondary`)/`__sub-hint`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default (descrição rica) → `@Input() descriptionTemplate` (`TemplateRef`) OU
 *   `<ng-content>` (fallback: prop `description`).
 * - slot `#action` → `@Input() actionTemplate`; slot `#sub-hint` → `@Input() subHintTemplate`.
 * - `emit('action')` / `emit('secondary-action')` → `@Output() action` / `@Output() secondaryAction`.
 */
@Component({
  selector: "div[arcanaActionPanel]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ArcanaButtonComponent],
  host: { "class": "arcana-action-panel" },
  template: `
    <div class="arcana-action-panel__visual">
      <div class="arcana-action-panel__ring"></div>
      <div class="arcana-action-panel__ring arcana-action-panel__ring--2"></div>
      <div class="arcana-action-panel__icon">
        <i [class]="icon"></i>
      </div>
    </div>

    <h3 class="arcana-action-panel__title">{{ title }}</h3>

    @if (descriptionTemplate) {
      <p class="arcana-action-panel__desc">
        <ng-container [ngTemplateOutlet]="descriptionTemplate"></ng-container>
      </p>
    } @else if (description) {
      <p class="arcana-action-panel__desc">{{ description }}</p>
    }

    @if (actionTemplate || actionLabel || secondaryActionLabel) {
      <div class="arcana-action-panel__action">
        @if (actionTemplate) {
          <ng-container [ngTemplateOutlet]="actionTemplate"></ng-container>
        } @else {
          @if (actionLabel) {
            <button
              arcanaButton
              variant="primary"
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
              arcanaButton
              variant="outline"
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
      <p class="arcana-action-panel__sub-hint">
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
export class ArcanaActionPanelComponent {
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
