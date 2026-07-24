import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ArcanaSummaryTilesComponent` — Angular port do SFC Vue `ArcanaSummaryTiles`.
 * Container grid pros tiles de resumo.
 *
 * Attribute selector num `<div>` (`<div arcanaSummaryTiles>`): reproduz
 * `.arcana-summary-tiles` com `style="--arcana-summary-tiles-cols: N"`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default → `<ng-content>`
 */
@Component({
  selector: "div[arcanaSummaryTiles]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--arcana-summary-tiles-cols]": "columnsVar"
  },
  template: `<ng-content></ng-content>`
})
export class ArcanaSummaryTilesComponent {
  @Input() columns: number | string = 3;
  @Input() className = "";

  get columnsVar(): string {
    return String(this.columns);
  }

  get rootClass(): string {
    return ["arcana-summary-tiles", this.className].filter(Boolean).join(" ");
  }
}
