import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `ShadcnSkeletonComponent` — Angular port do SFC Vue `ShadcnSkeleton`.
 *
 * Attribute selector num `<span>` (`<span arcanaShadcnSkeleton>`): emite
 * `span.shadcn-skeleton shadcn-skeleton--rounded-${rounded}` com width/height inline e
 * `aria-hidden`, idêntico ao Vue/React.
 */
export type SkeletonRounded = "sm" | "md" | "lg" | "full" | "none";

@Component({
  selector: "span[arcanaShadcnSkeleton]",
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
export class ShadcnSkeletonComponent {
  @Input() width = "100%";
  @Input() height = "14px";
  @Input() rounded: SkeletonRounded = "md";
  @Input() className = "";

  get rootClass(): string {
    return [
      "shadcn-skeleton",
      `shadcn-skeleton--rounded-${this.rounded}`,
      this.className
    ].filter(Boolean).join(" ");
  }
}
