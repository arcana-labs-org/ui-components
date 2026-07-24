import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `ArcanaBadgeComponent` — Angular port do SFC Vue `ArcanaBadge`.
 *
 * Attribute selector num `<span>` (`<span arcanaBadge>`): emite
 * `span.arcana-badge` + `arcana-badge--${variant}` (+ `--sm`, `--clickable`) e o
 * `span.arcana-badge__dot` opcional, idêntico ao Vue/React. O `@click` cai no próprio host.
 *
 * Vue → Angular: props → `@Input()`; slot default → `<ng-content>`.
 */
export type ArcanaBadgeVariant = "neutral" | "blue" | "green" | "red" | "amber" | "violet";

@Component({
  selector: "span[arcanaBadge]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass"
  },
  template: `
    @if (dot) {
      <span class="arcana-badge__dot"></span>
    }
    <ng-content></ng-content>
  `
})
export class ArcanaBadgeComponent {
  @Input() variant: ArcanaBadgeVariant = "neutral";
  @Input() dot = false;
  @Input() size: "sm" | "md" = "md";
  @Input() clickable = false;
  @Input() className = "";

  get rootClass(): string {
    return [
      "arcana-badge",
      `arcana-badge--${this.variant}`,
      this.size === "sm" ? "arcana-badge--sm" : "",
      this.clickable ? "arcana-badge--clickable" : "",
      this.className
    ].filter(Boolean).join(" ");
  }
}
