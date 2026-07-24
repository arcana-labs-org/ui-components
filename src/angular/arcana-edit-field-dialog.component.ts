import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild
} from "@angular/core";
import { ArcanaDialogComponent, type ArcanaDialogSize } from "./arcana-dialog.component";
import { ArcanaButtonComponent } from "./arcana-button.component";

/**
 * `ArcanaEditFieldDialogComponent` — Angular port do SFC Vue de edição de campo.
 *
 * Attribute selector (`<div arcanaEditFieldDialog>`): wrapper genérico pra modais de
 * "Alterar X". Recebe o input via `<ng-content>` e fornece o chrome (header + footer com
 * Cancelar/Salvar). Reusa o `ArcanaDialogComponent` já portado (portal pro body).
 *
 * Vue → Angular:
 * - API ref-based `show()`/`hide()` → métodos públicos (delegam ao `ArcanaDialog` interno).
 * - `emit('save')` → `@Output() save` (sem auto-close; caller fecha via `hide()` após validar).
 * - slot default → `<ng-content>`; footer com dois `ArcanaButton`, contexto `{ hide }`.
 */
@Component({
  selector: "div[arcanaEditFieldDialog]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArcanaDialogComponent, ArcanaButtonComponent],
  template: `
    <div
      arcanaDialog
      #dialog
      [title]="title"
      [description]="description"
      [size]="size"
      [footerTemplate]="footerTpl"
    >
      <ng-content></ng-content>
    </div>

    <ng-template #footerTpl let-hide>
      <button
        arcanaButton
        variant="outline-danger"
        [className]="cancelClass"
        (click)="hide()"
      ><i class="fa-solid fa-xmark"></i> {{ cancelLabel }}</button>
      <button
        arcanaButton
        variant="success"
        [className]="saveClass"
        (click)="onSave()"
      ><i class="fa-solid fa-check"></i> {{ saveLabel }}</button>
    </ng-template>
  `
})
export class ArcanaEditFieldDialogComponent {
  @ViewChild("dialog") private dialog?: ArcanaDialogComponent;

  @Input({ required: true }) title!: string;
  @Input() description = "";
  @Input() cancelLabel = "Cancelar";
  @Input() saveLabel = "Salvar Alterações";
  @Input() cancelColor = "white";
  @Input() saveColor = "primary-700";
  @Input() cancelClass = "";
  @Input() saveClass = "";
  @Input() size: ArcanaDialogSize = "md";

  @Output() save = new EventEmitter<void>();

  show(): void {
    this.dialog?.show();
  }

  hide(): void {
    this.dialog?.hide();
  }

  onSave(): void {
    // Não fecha automaticamente — caller valida/chama API antes e fecha via hide().
    this.save.emit();
  }
}
