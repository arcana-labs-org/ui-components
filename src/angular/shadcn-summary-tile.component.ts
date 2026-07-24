import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ShadcnSummaryTileComponent` — Angular port do SFC Vue `ShadcnSummaryTile`.
 * Tile compacto de KPI.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnSummaryTile>`): reproduz
 * `.shadcn-summary-tile--${tone}`, o `__icon`, `__main`/`__label`/`__sub` e `__value`,
 * idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slots `#value`/`#sub` → conteúdo projetado `[tileValue]`/`[tileSub]` (fallback: value/sub inputs)
 */
export type SummaryTileTone = "neutral" | "positive" | "negative" | "indigo";

@Component({
  selector: "div[arcanaShadcnSummaryTile]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "rootClass" },
  template: `
    @if (icon) {
      <span class="shadcn-summary-tile__icon" aria-hidden="true"><i [class]="icon"></i></span>
    }

    <div class="shadcn-summary-tile__main">
      <span class="shadcn-summary-tile__label">{{ label }}</span>
      @if (sub) {
        <span class="shadcn-summary-tile__sub">
          <ng-content select="[tileSub]">{{ sub }}</ng-content>
        </span>
      }
    </div>

    <span class="shadcn-summary-tile__value">
      <ng-content select="[tileValue]">{{ value }}</ng-content>
    </span>
  `
})
export class ShadcnSummaryTileComponent {
  @Input() label = "";
  @Input() value: string | number | null = null;
  @Input() icon = "";
  @Input() sub = "";
  @Input() tone: SummaryTileTone = "neutral";
  @Input() className = "";

  get rootClass(): string {
    return [
      "shadcn-summary-tile",
      `shadcn-summary-tile--${this.tone}`,
      this.className
    ].filter(Boolean).join(" ");
  }
}
