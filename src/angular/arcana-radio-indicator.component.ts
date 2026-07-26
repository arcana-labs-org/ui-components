import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `ArcanaRadioIndicatorComponent` — Angular port do SFC Vue `ArcanaRadioIndicator`.
 *
 * Element selector (`<arcana-radio-indicator>`): o círculo + dot visual de um radio button,
 * puramente decorativo (`aria-hidden`). É o building block compartilhado entre
 * `ArcanaRadio`, `ArcanaRadioCardGroup`, `ArcanaSegmentedControl` e `ArcanaSwitchSegmented`.
 *
 * O host emite `span.arcana-radio-indicator` (+ `--${size}`/`--${tone}` + `is-checked`/
 * `is-disabled`) contendo o `span.arcana-radio-indicator__dot`, idêntico ao Vue/React. O
 * estado marcado vem do `@Input() checked` (não do CSS do ancestral), então o mesmo
 * indicador serve tanto pro radio de verdade quanto pros círculos decorativos dentro de
 * botões `role="radio"`.
 *
 * Props:
 * - `checked` — preenche o dot (animado, scale 0→1).
 * - `disabled` — apenas esmaece (o controle de foco/interação é de quem embrulha).
 * - `size` — `'sm' | 'md' | 'lg'` (14 / 16 / 18px). Default `'md'`.
 * - `tone` — `'solid'` (borda neutra, marcado na cor de marca) | `'on-solid'` (branco,
 *   pra círculo sobre um pill colorido ativo). Default `'solid'`.
 */
@Component({
  selector: "arcana-radio-indicator",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "aria-hidden": "true"
  },
  template: `<span class="arcana-radio-indicator__dot"></span>`
})
export class ArcanaRadioIndicatorComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() tone: "solid" | "on-solid" = "solid";

  get rootClass(): string {
    return [
      "arcana-radio-indicator",
      `arcana-radio-indicator--${this.size}`,
      `arcana-radio-indicator--${this.tone}`,
      this.checked ? "is-checked" : "",
      this.disabled ? "is-disabled" : ""
    ].filter(Boolean).join(" ");
  }
}
