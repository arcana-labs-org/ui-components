import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ArcanaSummaryTilesGroupComponent` — Angular port do SFC Vue `ArcanaSummaryTilesGroup`.
 * Container grid pros tiles de resumo.
 *
 * Attribute selector num `<div>` (`<div arcanaSummaryTilesGroup>`): reproduz
 * `.arcana-summary-tiles` com `style="--arcana-summary-tiles-cols: N"`, idêntico ao Vue/React.
 * Quando `format === 'rows'`, acrescenta `.arcana-summary-tiles--rows`.
 *
 * Vue → Angular:
 * - slot default → `<ng-content>`
 */
@Component({
  selector: "div[arcanaSummaryTilesGroup]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[class.arcana-summary-tiles--rows]": "format === 'rows'",
    "[style.--arcana-summary-tiles-cols]": "columnsVar"
  },
  template: `<ng-content></ng-content>`
})
export class ArcanaSummaryTilesGroupComponent {
  @Input() columns: number | string = 3;
  @Input() format: "columns" | "rows" = "columns";
  @Input() className = "";

  get columnsVar(): string {
    return String(this.columns);
  }

  get rootClass(): string {
    return ["arcana-summary-tiles", this.className].filter(Boolean).join(" ");
  }
}
