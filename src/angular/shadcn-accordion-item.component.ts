import {
  ChangeDetectionStrategy, Component, Input, inject
} from "@angular/core";
import { ShadcnAccordionComponent } from "./shadcn-accordion.component";

/**
 * `ShadcnAccordionItemComponent` — Angular port do SFC Vue `ShadcnAccordionItem`.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnAccordionItem name="…">`): reproduz
 * `.shadcn-accordion-item` (+ `open`/`disabled`), `.shadcn-accordion-trigger`,
 * `.shadcn-accordion-title`, `.shadcn-accordion-chevron` e `.shadcn-accordion-content`,
 * idêntico ao Vue/React. O `inject`/`provide` do Vue vira `inject(ShadcnAccordionComponent)`
 * (o item é projetado dentro do accordion, logo ele está na cadeia de injeção).
 *
 * Change detection Default (não OnPush): o estado `open` vem do `value` do accordion pai —
 * quando um item abre e os outros precisam fechar (modo single), a CD do consumidor
 * re-checa todos os itens sem precisar de `markForCheck` manual.
 *
 * Vue → Angular: slot `#title` → `@Input() title` (string) nesta fase; slot default → `<ng-content>`.
 */
@Component({
  selector: "div[arcanaShadcnAccordionItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    "[class]": "rootClass"
  },
  template: `
    <button type="button" class="shadcn-accordion-trigger" [disabled]="disabled" (click)="onToggle()">
      <span class="shadcn-accordion-title">{{ title }}</span>
      <i class="fa-solid fa-chevron-down shadcn-accordion-chevron"></i>
    </button>
    <div class="shadcn-accordion-content" [style.display]="isOpen ? null : 'none'">
      <ng-content></ng-content>
    </div>
  `
})
export class ShadcnAccordionItemComponent {
  private readonly accordion = inject(ShadcnAccordionComponent);

  @Input({ required: true }) name!: string;
  @Input() title = "";
  @Input() disabled = false;

  get isOpen(): boolean {
    return this.accordion.isOpen(this.name);
  }

  get rootClass(): string {
    return [
      "shadcn-accordion-item",
      this.isOpen ? "open" : "",
      this.disabled ? "disabled" : ""
    ].filter(Boolean).join(" ");
  }

  onToggle(): void {
    if (this.disabled) return;
    this.accordion.toggle(this.name);
  }
}
