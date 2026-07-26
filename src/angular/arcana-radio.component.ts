import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";
import { ArcanaRadioIndicatorComponent } from "./arcana-radio-indicator.component";

/**
 * `ArcanaRadioComponent` — Angular port do SFC Vue `ArcanaRadio`.
 *
 * Element selector (`<arcana-radio>`): radio button único. Reproduz
 * `<label class="arcana-radio">` (+ `is-checked`/`is-disabled`), o `arcana-radio__input`
 * nativo (escondido visualmente, ainda focável), o `<arcana-radio-indicator>` e o
 * `arcana-radio__label` opcional, idêntico ao Vue/React.
 *
 * Grupo se forma como no HTML: vários `<arcana-radio>` com o mesmo `name` e um `groupValue`
 * compartilhado. Fica marcado quando `groupValue === value`. Pra listas ricas (ícone,
 * descrição, badge) use `ArcanaRadioCardGroup`.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `@Input() groupValue`; `value` → `@Input() value`.
 * - `checked` explícito continua vencendo (`@Input() checked`).
 * - `emit('update:modelValue')` → `@Output() valueChange`; `emit('change')` → `@Output() change`.
 * - slot default → `<ng-content>` (fallback no `@Input() label`).
 */
@Component({
  selector: "arcana-radio",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArcanaRadioIndicatorComponent],
  template: `
    <label
      class="arcana-radio"
      [class.is-checked]="isChecked"
      [class.is-disabled]="disabled"
    >
      <input
        type="radio"
        class="arcana-radio__input"
        [attr.name]="name ?? null"
        [value]="value"
        [checked]="isChecked"
        [disabled]="disabled"
        (change)="onChange()"
      />
      <arcana-radio-indicator
        [checked]="isChecked"
        [disabled]="disabled"
        [size]="size"
        [tone]="tone"
      ></arcana-radio-indicator>
      @if (label) {
        <span class="arcana-radio__label"><ng-content>{{ label }}</ng-content></span>
      }
    </label>
  `
})
export class ArcanaRadioComponent {
  @Input() value: string | number | boolean | null = null;
  /** Valor selecionado do grupo (equivalente ao `modelValue`/v-model do SFC). */
  @Input() groupValue?: string | number | boolean | null;
  /** Força o estado marcado (alternativa a `groupValue`/`value`). */
  @Input() checked?: boolean;
  @Input() name?: string;
  @Input() disabled = false;
  @Input() label = "";
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() tone: "solid" | "on-solid" = "solid";

  @Output() valueChange = new EventEmitter<string | number | boolean | null>();
  @Output() change = new EventEmitter<string | number | boolean | null>();

  /**
   * `checked` explícito tem prioridade; senão deriva de `groupValue === value`.
   * Permite tanto o uso controlado por grupo quanto o standalone.
   */
  get isChecked(): boolean {
    return this.checked ?? (this.groupValue !== undefined && this.groupValue === this.value);
  }

  onChange(): void {
    if (this.disabled) return;
    this.valueChange.emit(this.value);
    this.change.emit(this.value);
  }
}
