import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ArcanaLoadingOverlayComponent` — Angular port do SFC Vue `ArcanaLoadingOverlay`.
 * Overlay de carregamento (spinner + texto).
 *
 * Attribute selector num `<div>` (`<div arcanaLoadingOverlay>`): reproduz
 * `.arcana-loading-overlay` (com `__box`/`__spinner`/`__text`), idêntico ao Vue/React.
 * A `<transition>` de fade do Vue é omitida — o overlay some via `display:none` quando
 * `visible` é `false` (equivalente observável ao `if (!visible) return null` do React).
 */
@Component({
  selector: "div[arcanaLoadingOverlay]",
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
      <div class="arcana-loading-overlay__box">
        <span class="arcana-loading-overlay__spinner" aria-hidden="true"></span>
        <span class="arcana-loading-overlay__text">{{ text }}</span>
      </div>
    }
  `
})
export class ArcanaLoadingOverlayComponent {
  @Input() visible = false;
  @Input() text = "Carregando…";
  @Input() className = "";

  get rootClass(): string {
    return ["arcana-loading-overlay", this.className].filter(Boolean).join(" ");
  }
}
