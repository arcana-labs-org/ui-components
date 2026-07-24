import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ShadcnLoadingOverlayComponent` — Angular port do SFC Vue `ShadcnLoadingOverlay`.
 * Overlay de carregamento (spinner + texto).
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnLoadingOverlay>`): reproduz
 * `.shadcn-loading-overlay` (com `__box`/`__spinner`/`__text`), idêntico ao Vue/React.
 * A `<transition>` de fade do Vue é omitida — o overlay some via `display:none` quando
 * `visible` é `false` (equivalente observável ao `if (!visible) return null` do React).
 */
@Component({
  selector: "div[arcanaShadcnLoadingOverlay]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.display]": "visible ? null : 'none'",
    "role": "status",
    "aria-live": "polite"
  },
  template: `
    @if (visible) {
      <div class="shadcn-loading-overlay__box">
        <span class="shadcn-loading-overlay__spinner" aria-hidden="true"></span>
        <span class="shadcn-loading-overlay__text">{{ text }}</span>
      </div>
    }
  `
})
export class ShadcnLoadingOverlayComponent {
  @Input() visible = false;
  @Input() text = "Carregando…";
  @Input() className = "";

  get rootClass(): string {
    return ["shadcn-loading-overlay", this.className].filter(Boolean).join(" ");
  }
}
