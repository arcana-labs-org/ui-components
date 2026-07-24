import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ArcanaSummaryTileComponent` — Angular port do SFC Vue `ArcanaSummaryTile`.
 * Tile compacto de KPI.
 *
 * Attribute selector num `<div>` (`<div arcanaSummaryTile>`): reproduz
 * `.arcana-summary-tile--${tone}`, o `__icon`, `__main`/`__label`/`__sub` e `__value`,
 * idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slots `#value`/`#sub` → conteúdo projetado `[tileValue]`/`[tileSub]` (fallback: value/sub inputs)
 */
export type SummaryTileTone = "neutral" | "positive" | "negative" | "indigo";

@Component({
  selector: "div[arcanaSummaryTile]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "rootClass" },
  template: `
    @if (icon) {
      <span class="arcana-summary-tile__icon" aria-hidden="true"><i [class]="icon"></i></span>
    }

    <div class="arcana-summary-tile__main">
      <span class="arcana-summary-tile__label">{{ label }}</span>
      @if (sub) {
        <span class="arcana-summary-tile__sub">
          <ng-content select="[tileSub]">{{ sub }}</ng-content>
        </span>
      }
    </div>

    <span class="arcana-summary-tile__value">
      <ng-content select="[tileValue]">{{ value }}</ng-content>
    </span>
  `
})
export class ArcanaSummaryTileComponent {
  @Input() label = "";
  @Input() value: string | number | null = null;
  @Input() icon = "";
  @Input() sub = "";
  @Input() tone: SummaryTileTone = "neutral";
  @Input() className = "";

  get rootClass(): string {
    return [
      "arcana-summary-tile",
      `arcana-summary-tile--${this.tone}`,
      this.className
    ].filter(Boolean).join(" ");
  }
}
