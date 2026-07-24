import {
  ChangeDetectionStrategy, Component, Input, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ShadcnSpecSheetFieldComponent` — Angular port do SFC Vue `ShadcnSpecSheetField`.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnSpecSheetField>`): campo individual da
 * `ShadcnSpecSheetSection`. Reproduz `.shadcn-spec-sheet__field`, `__label`, `__value`
 * (+`--empty`), com `gridColumn: span N` quando `span > 1`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default (substitui o valor por HTML/badge custom) → `@Input() valueTemplate`
 *   (`TemplateRef`). Quando presente, o campo NUNCA é renderizado como vazio.
 * - `value` vazio (null/undefined/"") → mostra `emptyText` em italic muted.
 */
@Component({
  selector: "div[arcanaShadcnSpecSheetField]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    "class": "shadcn-spec-sheet__field",
    "[style.gridColumn]": "spanStyle"
  },
  template: `
    <div class="shadcn-spec-sheet__label">{{ label }}</div>
    <div class="shadcn-spec-sheet__value" [class.shadcn-spec-sheet__value--empty]="isEmpty">
      @if (valueTemplate) {
        <ng-container [ngTemplateOutlet]="valueTemplate"></ng-container>
      } @else {
        {{ displayValue }}
      }
    </div>
  `
})
export class ShadcnSpecSheetFieldComponent {
  @Input({ required: true }) label!: string;
  @Input() value: string | number | null = "";
  @Input() emptyText = "Não informado";
  @Input() span: number | string = 1;
  @Input() valueTemplate?: TemplateRef<unknown>;

  get spanStyle(): string | null {
    return Number(this.span) > 1 ? `span ${this.span}` : null;
  }

  get isEmpty(): boolean {
    if (this.valueTemplate) return false;
    return this.value === null || this.value === undefined || this.value === "";
  }

  get displayValue(): string {
    if (this.isEmpty) return this.emptyText;
    return String(this.value);
  }
}
