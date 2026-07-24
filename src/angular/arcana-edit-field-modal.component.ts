import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild
} from "@angular/core";
import { ArcanaDialogComponent, type ArcanaDialogSize } from "./arcana-dialog.component";
import { ArcanaButtonComponent } from "./arcana-button.component";

/**
 * `ArcanaEditFieldModalComponent` — Angular port do SFC Vue `ArcanaEditFieldModal`.
 *
 * Attribute selector (`<div arcanaEditFieldModal>`): wrapper genérico pra modais de
 * "Alterar X". Recebe o input via `<ng-content>` e fornece o chrome (header + footer com
 * Cancelar/Salvar). Reusa o `ArcanaDialogComponent` já portado (portal pro body).
 *
 * Vue → Angular:
 * - API ref-based `show()`/`hide()` → métodos públicos (delegam ao `ArcanaDialog` interno).
 * - `emit('save')` → `@Output() save` (sem auto-close; caller fecha via `hide()` após validar).
 * - slot default → `<ng-content>`; footer com dois `ArcanaButton`, contexto `{ hide }`.
 */
@Component({
  selector: "div[arcanaEditFieldModal]",
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
        variant="ghost"
        [className]="cancelClass"
        (click)="hide()"
      >{{ cancelLabel }}</button>
      <button
        arcanaButton
        variant="primary"
        [className]="saveClass"
        (click)="onSave()"
      >{{ saveLabel }}</button>
    </ng-template>
  `
})
export class ArcanaEditFieldModalComponent {
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
