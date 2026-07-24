import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ShadcnSummaryTilesComponent` — Angular port do SFC Vue `ShadcnSummaryTiles`.
 * Container grid pros tiles de resumo.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnSummaryTiles>`): reproduz
 * `.shadcn-summary-tiles` com `style="--shadcn-summary-tiles-cols: N"`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default → `<ng-content>`
 */
@Component({
  selector: "div[arcanaShadcnSummaryTiles]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--shadcn-summary-tiles-cols]": "columnsVar"
  },
  template: `<ng-content></ng-content>`
})
export class ShadcnSummaryTilesComponent {
  @Input() columns: number | string = 3;
  @Input() className = "";

  get columnsVar(): string {
    return String(this.columns);
  }

  get rootClass(): string {
    return ["shadcn-summary-tiles", this.className].filter(Boolean).join(" ");
  }
}
