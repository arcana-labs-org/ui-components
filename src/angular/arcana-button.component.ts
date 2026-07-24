import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `ArcanaButtonComponent` — Angular port do SFC Vue `ArcanaButton`.
 *
 * Attribute selector num `<button>` (`<button arcanaButton>`) para que o DOM de
 * saída seja idêntico ao Vue/React: um `<button class="arcana-button arcana-button--…">`
 * de verdade, sem wrapper. As classes são aplicadas via host binding.
 *
 * Vue → Angular:
 * - props `variant`/`type`/`disabled` → `@Input()`
 * - slot default → `<ng-content>`
 * - `emit('click', ev)` → o host É um `<button>` nativo, então o consumidor binda o
 *   `(click)` DOM diretamente (`<button arcanaButton (click)="…">`) — sem Output
 *   custom (que colidiria com o evento nativo do próprio host).
 */
export type ArcanaButtonVariant =
  | "primary" | "outline" | "outline-danger" | "ghost" | "danger" | "destructive"
  | "destructive-outline" | "success" | "secondary" | "dark" | "indigo" | "alert"
  | "info" | "warning" | "teal";

@Component({
  selector: "button[arcanaButton]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[attr.type]": "type",
    "[disabled]": "disabled"
  },
  template: `<ng-content></ng-content>`
})
export class ArcanaButtonComponent {
  @Input() variant: ArcanaButtonVariant = "primary";
  @Input() type: "button" | "submit" = "button";
  @Input() disabled = false;
  @Input() className = "";

  get rootClass(): string {
    return [
      "arcana-button",
      `arcana-button--${this.variant}`,
      this.disabled ? "is-disabled" : "",
      this.className
    ].filter(Boolean).join(" ");
  }
}
