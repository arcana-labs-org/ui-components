import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";
import { ArcanaSelectComponent, type SelectOption } from "./arcana-select.component";

/**
 * `ArcanaInputBooleanComponent` — Angular port do SFC Vue `ArcanaInputBoolean`.
 *
 * Wrapper do `ArcanaSelect` com opções Sim/Não (ou Ativo/Inativo, ou IS_NOT_NULL/IS_NULL)
 * + "Todos" opcional, idêntico ao Vue/React. O host usa `display: contents` pra NÃO
 * introduzir uma caixa extra — o `.arcana-select` interno se comporta como se estivesse
 * direto no pai (mesmo markup observável do React, que renderiza o Select sem wrapper).
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 */
@Component({
  selector: "[arcanaInputBoolean]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArcanaSelectComponent],
  host: { "[style.display]": "'contents'" },
  template: `
    <div
      arcanaSelect
      [value]="normalizedValue"
      [options]="computedOptions"
      [disabled]="!!disabled"
      [placeholder]="placeholder"
      [className]="className"
      (valueChange)="handleChange($event)"
    ></div>
  `
})
export class ArcanaInputBooleanComponent {
  @Input() value: unknown = undefined;
  @Input() variation: "" | "status" | "nullable" | string = "";
  @Input() disabled: boolean | number = false;
  @Input() clearable = true;
  @Input() placeholder = "Selecione…";
  @Input() className = "";

  @Output() valueChange = new EventEmitter<unknown>();
  @Output() change = new EventEmitter<unknown>();

  get computedOptions(): SelectOption[] {
    const yesText = this.variation === "status" ? "Ativo" : "Sim";
    const noText = this.variation === "status" ? "Inativo" : "Não";
    const yesValue: string | number = this.variation === "nullable" ? "IS_NOT_NULL" : 1;
    const noValue: string | number = this.variation === "nullable" ? "IS_NULL" : 0;
    const opts: SelectOption[] = [
      { label: yesText, value: yesValue },
      { label: noText, value: noValue }
    ];
    if (this.clearable) opts.unshift({ label: "Todos", value: null });
    return opts;
  }

  get normalizedValue(): unknown {
    if (this.value === true) return this.variation === "nullable" ? "IS_NOT_NULL" : 1;
    if (this.value === false) return this.variation === "nullable" ? "IS_NULL" : 0;
    return this.value;
  }

  handleChange(v: unknown): void {
    this.valueChange.emit(v);
    this.change.emit(v);
  }
}
