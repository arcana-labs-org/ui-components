import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `ArcanaSkeletonComponent` — Angular port do SFC Vue `ArcanaSkeleton`.
 *
 * Attribute selector num `<span>` (`<span arcanaSkeleton>`): emite
 * `span.arcana-skeleton arcana-skeleton--rounded-${rounded}` com width/height inline e
 * `aria-hidden`, idêntico ao Vue/React.
 */
export type SkeletonRounded = "sm" | "md" | "lg" | "full" | "none";

@Component({
  selector: "span[arcanaSkeleton]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.width]": "width",
    "[style.height]": "height",
    "[attr.aria-hidden]": "true"
  },
  template: ""
})
export class ArcanaSkeletonComponent {
  @Input() width = "100%";
  @Input() height = "14px";
  @Input() rounded: SkeletonRounded = "md";
  @Input() className = "";

  get rootClass(): string {
    return [
      "arcana-skeleton",
      `arcana-skeleton--rounded-${this.rounded}`,
      this.className
    ].filter(Boolean).join(" ");
  }
}
