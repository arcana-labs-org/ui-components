import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `ShadcnBadgeComponent` — Angular port do SFC Vue `ShadcnBadge`.
 *
 * Attribute selector num `<span>` (`<span arcanaShadcnBadge>`): emite
 * `span.shadcn-badge` + `shadcn-badge--${variant}` (+ `--sm`, `--clickable`) e o
 * `span.shadcn-badge__dot` opcional, idêntico ao Vue/React. O `@click` cai no próprio host.
 *
 * Vue → Angular: props → `@Input()`; slot default → `<ng-content>`.
 */
export type ShadcnBadgeVariant = "neutral" | "blue" | "green" | "red" | "amber" | "violet";

@Component({
  selector: "span[arcanaShadcnBadge]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass"
  },
  template: `
    @if (dot) {
      <span class="shadcn-badge__dot"></span>
    }
    <ng-content></ng-content>
  `
})
export class ShadcnBadgeComponent {
  @Input() variant: ShadcnBadgeVariant = "neutral";
  @Input() dot = false;
  @Input() size: "sm" | "md" = "md";
  @Input() clickable = false;
  @Input() className = "";

  get rootClass(): string {
    return [
      "shadcn-badge",
      `shadcn-badge--${this.variant}`,
      this.size === "sm" ? "shadcn-badge--sm" : "",
      this.clickable ? "shadcn-badge--clickable" : "",
      this.className
    ].filter(Boolean).join(" ");
  }
}
