import {
  ChangeDetectionStrategy, Component, Input, ViewChild
} from "@angular/core";
import { ArcanaDialogComponent, type ArcanaDialogSize } from "./arcana-dialog.component";
import { ArcanaButtonComponent } from "./arcana-button.component";

/**
 * `ArcanaRequiredFieldsDialogComponent` — Angular port do SFC Vue `ArcanaRequiredFieldsDialog`.
 *
 * Attribute selector (`<div arcanaRequiredFieldsDialog>`): dialog amber/warning que
 * lista campos obrigatórios pendentes. Reusa o `ArcanaDialogComponent` (header + footer
 * custom via `TemplateRef`). Reproduz `.rf-header`/`.rf-list`/`.rf-item`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - API ref-based `show()`/`hide()` → métodos públicos (delegam ao `ArcanaDialog`).
 * - header custom → `[headerTemplate]`; footer com `ArcanaButton` (Voltar) → `[footerTemplate]`
 *   (contexto `{ hide }`).
 */
export interface RequiredField {
  key: string;
  label: string;
  hint: string;
}

@Component({
  selector: "div[arcanaRequiredFieldsDialog]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArcanaDialogComponent, ArcanaButtonComponent],
  template: `
    <div
      arcanaDialog
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
        arcanaButton
        variant="warning"
        (click)="hide()"
      ><i class="fa-solid fa-arrow-left"></i> {{ buttonLabel }}</button>
    </ng-template>
  `
})
export class ArcanaRequiredFieldsDialogComponent {
  @ViewChild("dialog") private dialog?: ArcanaDialogComponent;

  @Input() title = "Faltam campos obrigatórios";
  @Input() description = "Os campos abaixo precisam ser preenchidos antes de continuar.";
  @Input() fields: RequiredField[] = [];
  @Input() buttonLabel = "Voltar e corrigir";
  @Input() size: ArcanaDialogSize = 560;

  show(): void {
    this.dialog?.show();
  }

  hide(): void {
    this.dialog?.hide();
  }
}
