import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `LabeledButtonComponent` — Angular port do SFC Vue `LabeledButton`.
 *
 * Attribute selector num `<button>` (`<button arcanaLabeledButton label="…">`). Reproduz o
 * mapping de `color` legado → variant shadcn e os dois modos de render (shadcn vs. legado
 * Bootstrap `btn bg-{color} btn-labeled`), com as MESMAS classes/markup do Vue/React.
 *
 * Vue → Angular:
 * - props → `@Input()`; `emit('click', ev)` → binde o `(click)` DOM direto no host `<button>`
 *   (o host já preventDefault o clique nativo, como o `@click.prevent` do SFC)
 * - `class` extra do caller → `@Input() className` (mesclado nas classes do botão)
 * - `v-bind="forwardedAttrs"` (attrs arbitrários) NÃO é reproduzido nesta fase — passe os
 *   atributos nativos direto no elemento `<button>` já que ele é o próprio host.
 */
function shadcnVariantFrom(color: string): string {
  const c = String(color ?? "").toLowerCase();
  const isDanger = c.startsWith("danger") || c.startsWith("error") || c.startsWith("red");
  if (isDanger && c.includes("outline")) return "destructive-outline";
  if (isDanger) return "destructive";
  if (c === "white" || c.startsWith("grey") || c.startsWith("gray") || c.startsWith("slate")) return "ghost";
  if (c.startsWith("teal")) return "teal";
  if (c.startsWith("success") || c.startsWith("green") || c.startsWith("emerald")) return "success";
  if (c.startsWith("blue") || c.startsWith("sky") || c.startsWith("azure")) return "info";
  if (c.startsWith("amber") || c.startsWith("orange") || c.startsWith("yellow")) return "warning";
  if (c.startsWith("indigo") || c.startsWith("violet") || c.startsWith("purple")) return "alert";
  return "primary";
}

@Component({
  selector: "button[arcanaLabeledButton]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "type": "button",
    "[class]": "rootClass",
    "[disabled]": "disabled || loading",
    "(click)": "onClick($event)"
  },
  template: `
    @if (shadcn) {
      @if (loading) {
        <i class="fa-solid fa-spinner fa-spin shadcn-btn__icon"></i>
      } @else if (icon) {
        <i [class]="icon + ' shadcn-btn__icon'"></i>
      }
      <span>{{ label }}</span>
    } @else {
      <b><i [class]="loading ? 'fa-solid fa-spinner fa-spin' : icon" style="font-size: 15px;"></i></b>
      {{ label }}
    }
  `
})
export class LabeledButtonComponent {
  @Input() icon = "";
  @Input() color = "info-700";
  @Input() disabled = false;
  @Input() label = "";
  @Input() shadcn = false;
  @Input() loading = false;
  @Input() centerLabel = false;
  @Input() centerContent = false;
  @Input() className = "";

  get rootClass(): string {
    const list: string[] = [];
    if (this.shadcn) {
      list.push("shadcn-btn", `shadcn-btn--${shadcnVariantFrom(this.color)}`);
      if (this.centerLabel) list.push("shadcn-btn--center-label");
      else if (this.centerContent) list.push("shadcn-btn--center-content");
    } else {
      list.push("btn", `bg-${this.color}`, "btn-labeled");
    }
    if (this.className) list.push(this.className);
    return list.join(" ");
  }

  onClick(ev: MouseEvent): void {
    ev.preventDefault();
  }
}
