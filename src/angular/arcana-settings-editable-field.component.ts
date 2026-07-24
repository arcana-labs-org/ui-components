import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { ArcanaSettingsListItemComponent } from "./arcana-settings-list-item.component";
import { ArcanaEditFieldDialogComponent } from "./arcana-edit-field-dialog.component";
import { ArcanaInputComponent } from "./arcana-input.component";
import { ArcanaSelectComponent } from "./arcana-select.component";
import { ArcanaInputCurrencyComponent } from "./arcana-input-currency.component";
import { CurrencyFormatter } from "../core/currency";

interface SelectOption {
  label: string;
  value: string | number | boolean | null;
}

/**
 * `ArcanaSettingsEditableFieldComponent` — Angular port do SFC Vue `ArcanaSettingsEditableField`.
 *
 * Attribute selector (`<div arcanaSettingsEditableField>`): item smart de
 * `ArcanaSettingsList` que combina display read-only + botão "Alterar" + modal de edição
 * (`ArcanaEditFieldDialog`) numa única tag. Suporta 4 tipos de input (text/currency/number/
 * select). Reproduz `__current-value`(+`--empty`)/`__edit-btn`, idêntico ao Vue/React.
 *
 * FormGroup (decisão de port): o SFC referencia um `<FormGroup>` GLOBAL do app host. No
 * Angular o wrapper de campo é REIMPLEMENTADO minimamente (`.demo-form-group` label + input —
 * mesma decisão do port React). Passe `@Input() fieldTemplate` (`TemplateRef`) pra substituir
 * o campo inteiro por um wrapper próprio; o contexto expõe `{ $implicit: value, value,
 * setValue, label }` pra ligar ao buffer.
 *
 * Vue → Angular:
 * - `v-model` (`modelValue`) → `value` + `@Output() valueChange`; `emit('save')` → `@Output() save`.
 * - buffer snapshotado ao abrir; cancelar descarta; salvar emite `valueChange`+`save` e fecha.
 */
@Component({
  selector: "div[arcanaSettingsEditableField]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ArcanaSettingsListItemComponent,
    ArcanaEditFieldDialogComponent,
    ArcanaInputComponent,
    ArcanaSelectComponent,
    ArcanaInputCurrencyComponent
  ],
  template: `
    <div
      arcanaSettingsListItem
      [label]="label"
      [caption]="caption"
      [disabled]="disabled"
      [nested]="nested"
      [labelTemplate]="labelTemplate"
    >
      <span [class]="valueClasses">{{ displayValue }}</span>
      <button
        class="arcana-settings-list__edit-btn"
        type="button"
        [disabled]="disabled"
        (click)="openModal()"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
        {{ editLabel }}
      </button>
    </div>

    <div
      arcanaEditFieldDialog
      #modal
      [title]="resolvedModalTitle"
      [description]="modalDescription"
      (save)="onSave()"
    >
      @if (fieldTemplate) {
        <ng-container [ngTemplateOutlet]="fieldTemplate" [ngTemplateOutletContext]="fieldContext"></ng-container>
      } @else {
        <div class="demo-form-group">
          @if (resolvedInputLabel) {
            <label class="demo-form-group__label">{{ resolvedInputLabel }}</label>
          }
          @switch (type) {
            @case ('text') {
              <input arcanaInput [value]="$any(bufferValue)" [placeholder]="inputPlaceholder" (valueChange)="bufferValue = $event" />
            }
            @case ('currency') {
              <div arcanaInputCurrency [shadcn]="true" [value]="$any(bufferValue)" (valueChange)="bufferValue = $event"></div>
            }
            @case ('number') {
              <input arcanaInput [value]="$any(bufferValue)" type="number" [min]="min" [max]="max" [placeholder]="inputPlaceholder" (valueChange)="bufferValue = $event" />
            }
            @case ('select') {
              <div arcanaSelect [value]="bufferValue" [options]="options" (valueChange)="bufferValue = $event"></div>
            }
          }
        </div>
      }
    </div>
  `
})
export class ArcanaSettingsEditableFieldComponent {
  @ViewChild("modal") private modal?: ArcanaEditFieldDialogComponent;

  @Input() value: unknown = null;
  @Input({ required: true }) label!: string;
  @Input() caption = "";
  @Input() type: "text" | "currency" | "number" | "select" = "text";
  @Input() options: SelectOption[] = [];
  @Input() disabled = false;
  @Input() nested = false;
  @Input() editLabel = "Alterar";
  @Input() displayFormatter?: (value: unknown) => string;
  @Input() modalTitle = "";
  @Input() modalDescription = "";
  @Input() inputLabel = "";
  @Input() inputPlaceholder = "";
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() emptyText = "Não definido";
  /** Slot `#label` do item interno (HTML custom com badge etc). */
  @Input() labelTemplate?: TemplateRef<unknown>;
  /** Substitui o campo dentro do modal; contexto `{ $implicit, value, setValue, label }`. */
  @Input() fieldTemplate?: TemplateRef<unknown>;

  @Output() valueChange = new EventEmitter<unknown>();
  @Output() save = new EventEmitter<unknown>();

  bufferValue: unknown = null;

  get isEmpty(): boolean {
    return this.value === null || this.value === undefined || this.value === "";
  }

  get displayValue(): string {
    if (this.isEmpty) return this.emptyText;
    if (this.displayFormatter) return this.displayFormatter(this.value);
    if (this.type === "currency") return CurrencyFormatter.format(this.value as number);
    if (this.type === "select") {
      const opt = this.options.find((o) => o.value === this.value);
      return opt?.label ?? String(this.value);
    }
    return String(this.value);
  }

  get valueClasses(): string {
    return [
      "arcana-settings-list__current-value",
      this.isEmpty ? "arcana-settings-list__current-value--empty" : ""
    ].filter(Boolean).join(" ");
  }

  get resolvedModalTitle(): string {
    return this.modalTitle || `${this.editLabel} ${this.label}`;
  }

  get resolvedInputLabel(): string {
    return this.inputLabel || this.label;
  }

  get fieldContext(): { $implicit: unknown; value: unknown; setValue: (v: unknown) => void; label: string } {
    return {
      $implicit: this.bufferValue,
      value: this.bufferValue,
      setValue: (v: unknown) => (this.bufferValue = v),
      label: this.resolvedInputLabel
    };
  }

  openModal(): void {
    this.bufferValue = this.value;
    this.modal?.show();
  }

  onSave(): void {
    this.valueChange.emit(this.bufferValue);
    this.save.emit(this.bufferValue);
    this.modal?.hide();
  }
}
