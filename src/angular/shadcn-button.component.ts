import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `ShadcnButtonComponent` — Angular port do SFC Vue `ShadcnButton`.
 *
 * Attribute selector num `<button>` (`<button arcanaShadcnButton>`) para que o DOM de
 * saída seja idêntico ao Vue/React: um `<button class="shadcn-button shadcn-button--…">`
 * de verdade, sem wrapper. As classes são aplicadas via host binding.
 *
 * Vue → Angular:
 * - props `variant`/`type`/`disabled` → `@Input()`
 * - slot default → `<ng-content>`
 * - `emit('click', ev)` → o host É um `<button>` nativo, então o consumidor binda o
 *   `(click)` DOM diretamente (`<button arcanaShadcnButton (click)="…">`) — sem Output
 *   custom (que colidiria com o evento nativo do próprio host).
 */
export type ShadcnButtonVariant =
  | "primary" | "outline" | "outline-danger" | "ghost" | "danger" | "destructive"
  | "destructive-outline" | "success" | "secondary" | "dark" | "indigo" | "alert"
  | "info" | "warning" | "teal";

@Component({
  selector: "button[arcanaShadcnButton]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[attr.type]": "type",
    "[disabled]": "disabled"
  },
  template: `<ng-content></ng-content>`
})
export class ShadcnButtonComponent {
  @Input() variant: ShadcnButtonVariant = "primary";
  @Input() type: "button" | "submit" = "button";
  @Input() disabled = false;
  @Input() className = "";

  get rootClass(): string {
    return [
      "shadcn-button",
      `shadcn-button--${this.variant}`,
      this.disabled ? "is-disabled" : "",
      this.className
    ].filter(Boolean).join(" ");
  }
}
