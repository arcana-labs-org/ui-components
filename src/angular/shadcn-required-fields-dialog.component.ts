import {
  ChangeDetectionStrategy, Component, Input, ViewChild
} from "@angular/core";
import { ShadcnDialogComponent, type ShadcnDialogSize } from "./shadcn-dialog.component";
import { LabeledButtonComponent } from "./labeled-button.component";

/**
 * `ShadcnRequiredFieldsDialogComponent` — Angular port do SFC Vue `ShadcnRequiredFieldsDialog`.
 *
 * Attribute selector (`<div arcanaShadcnRequiredFieldsDialog>`): dialog amber/warning que
 * lista campos obrigatórios pendentes. Reusa o `ShadcnDialogComponent` (header + footer
 * custom via `TemplateRef`). Reproduz `.rf-header`/`.rf-list`/`.rf-item`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - API ref-based `show()`/`hide()` → métodos públicos (delegam ao `ShadcnDialog`).
 * - header custom → `[headerTemplate]`; footer com `LabeledButton` (Voltar) → `[footerTemplate]`
 *   (contexto `{ hide }`).
 */
export interface RequiredField {
  key: string;
  label: string;
  hint: string;
}

@Component({
  selector: "div[arcanaShadcnRequiredFieldsDialog]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShadcnDialogComponent, LabeledButtonComponent],
  template: `
    <div
      arcanaShadcnDialog
      #dialog
      [size]="size"
      [flatFooter]="true"
      [headerTemplate]="headerTpl"
      [footerTemplate]="footerTpl"
    >
      <div class="rf-list">
        @for (field of fields; track field.key) {
          <div class="rf-item">
            <div class="rf-item__icon">
              <i class="fa-solid fa-circle-exclamation"></i>
            </div>
            <div class="rf-item__body">
              <div class="rf-item__label">{{ field.label }}</div>
              <div class="rf-item__hint">{{ field.hint }}</div>
            </div>
          </div>
        }
      </div>
    </div>

    <ng-template #headerTpl>
      <div class="rf-header">
        <div class="rf-header__icon">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div class="rf-header__text">
          <h2 class="rf-header__title">{{ title }}</h2>
          <p class="rf-header__desc">{{ description }}</p>
        </div>
      </div>
    </ng-template>

    <ng-template #footerTpl let-hide>
      <button
        arcanaLabeledButton
        [label]="buttonLabel"
        icon="fa-solid fa-arrow-left"
        color="amber-600"
        [shadcn]="true"
        (click)="hide()"
      ></button>
    </ng-template>
  `
})
export class ShadcnRequiredFieldsDialogComponent {
  @ViewChild("dialog") private dialog?: ShadcnDialogComponent;

  @Input() title = "Faltam campos obrigatórios";
  @Input() description = "Os campos abaixo precisam ser preenchidos antes de continuar.";
  @Input() fields: RequiredField[] = [];
  @Input() buttonLabel = "Voltar e corrigir";
  @Input() size: ShadcnDialogSize = 560;

  show(): void {
    this.dialog?.show();
  }

  hide(): void {
    this.dialog?.hide();
  }
}
