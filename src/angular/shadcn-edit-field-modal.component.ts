import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild
} from "@angular/core";
import { ShadcnDialogComponent, type ShadcnDialogSize } from "./shadcn-dialog.component";
import { LabeledButtonComponent } from "./labeled-button.component";

/**
 * `ShadcnEditFieldModalComponent` — Angular port do SFC Vue `ShadcnEditFieldModal`.
 *
 * Attribute selector (`<div arcanaShadcnEditFieldModal>`): wrapper genérico pra modais de
 * "Alterar X". Recebe o input via `<ng-content>` e fornece o chrome (header + footer com
 * Cancelar/Salvar). Reusa o `ShadcnDialogComponent` já portado (portal pro body).
 *
 * Vue → Angular:
 * - API ref-based `show()`/`hide()` → métodos públicos (delegam ao `ShadcnDialog` interno).
 * - `emit('save')` → `@Output() save` (sem auto-close; caller fecha via `hide()` após validar).
 * - slot default → `<ng-content>`; footer com dois `LabeledButton`, contexto `{ hide }`.
 */
@Component({
  selector: "div[arcanaShadcnEditFieldModal]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShadcnDialogComponent, LabeledButtonComponent],
  template: `
    <div
      arcanaShadcnDialog
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
        arcanaLabeledButton
        [label]="cancelLabel"
        [color]="cancelColor"
        [className]="cancelClass"
        [shadcn]="true"
        (click)="hide()"
      ></button>
      <button
        arcanaLabeledButton
        [label]="saveLabel"
        [color]="saveColor"
        [className]="saveClass"
        [shadcn]="true"
        (click)="onSave()"
      ></button>
    </ng-template>
  `
})
export class ShadcnEditFieldModalComponent {
  @ViewChild("dialog") private dialog?: ShadcnDialogComponent;

  @Input({ required: true }) title!: string;
  @Input() description = "";
  @Input() cancelLabel = "Cancelar";
  @Input() saveLabel = "Salvar Alterações";
  @Input() cancelColor = "white";
  @Input() saveColor = "primary-700";
  @Input() cancelClass = "";
  @Input() saveClass = "";
  @Input() size: ShadcnDialogSize = "md";

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
