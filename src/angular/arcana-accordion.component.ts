import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ArcanaAccordionComponent` — Angular port do SFC Vue `ArcanaAccordion`.
 *
 * Attribute selector num `<div>` (`<div arcanaAccordion>`): container `.arcana-accordion`.
 * O `provide`/`inject` do `accordionApi` (Vue) vira DI de componente pai: cada
 * `ArcanaAccordionItemComponent` injeta esta instância via `inject(ArcanaAccordionComponent)`.
 *
 * Vue → Angular:
 * - `modelValue` (v-model, `string | string[] | null`) → `value` + `@Output() valueChange`
 * - `accordion` (single-open) → `@Input() accordion`
 * - slot default → `<ng-content>`
 */
@Component({
  selector: "div[arcanaAccordion]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "class": "arcana-accordion"
  },
  template: `<ng-content></ng-content>`
})
export class ArcanaAccordionComponent {
  @Input() value: string | string[] | null = null;
  /** `true` (default): só um item aberto por vez. `false`: múltiplos (array). */
  @Input() accordion = true;

  @Output() valueChange = new EventEmitter<string | string[] | null>();

  isOpen(name: string): boolean {
    if (Array.isArray(this.value)) return this.value.includes(name);
    return this.value === name;
  }

  toggle(name: string): void {
    if (this.accordion) {
      this.valueChange.emit(this.value === name ? null : name);
      return;
    }
    const current = Array.isArray(this.value) ? [...this.value] : [];
    const idx = current.indexOf(name);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(name);
    this.valueChange.emit(current);
  }
}
