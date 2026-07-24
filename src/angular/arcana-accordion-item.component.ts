import {
  ChangeDetectionStrategy, Component, Input, inject
} from "@angular/core";
import { ArcanaAccordionComponent } from "./arcana-accordion.component";

/**
 * `ArcanaAccordionItemComponent` — Angular port do SFC Vue `ArcanaAccordionItem`.
 *
 * Attribute selector num `<div>` (`<div arcanaAccordionItem name="…">`): reproduz
 * `.arcana-accordion-item` (+ `open`/`disabled`), `.arcana-accordion-trigger`,
 * `.arcana-accordion-title`, `.arcana-accordion-chevron` e `.arcana-accordion-content`,
 * idêntico ao Vue/React. O `inject`/`provide` do Vue vira `inject(ArcanaAccordionComponent)`
 * (o item é projetado dentro do accordion, logo ele está na cadeia de injeção).
 *
 * Change detection Default (não OnPush): o estado `open` vem do `value` do accordion pai —
 * quando um item abre e os outros precisam fechar (modo single), a CD do consumidor
 * re-checa todos os itens sem precisar de `markForCheck` manual.
 *
 * Vue → Angular: slot `#title` → `@Input() title` (string) nesta fase; slot default → `<ng-content>`.
 */
@Component({
  selector: "div[arcanaAccordionItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    "[class]": "rootClass"
  },
  template: `
    <button type="button" class="arcana-accordion-trigger" [disabled]="disabled" (click)="onToggle()">
      <span class="arcana-accordion-title">{{ title }}</span>
      <i class="fa-solid fa-chevron-down arcana-accordion-chevron"></i>
    </button>
    <div class="arcana-accordion-content" [style.display]="isOpen ? null : 'none'">
      <ng-content></ng-content>
    </div>
  `
})
export class ArcanaAccordionItemComponent {
  private readonly accordion = inject(ArcanaAccordionComponent);

  @Input({ required: true }) name!: string;
  @Input() title = "";
  @Input() disabled = false;

  get isOpen(): boolean {
    return this.accordion.isOpen(this.name);
  }

  get rootClass(): string {
    return [
      "arcana-accordion-item",
      this.isOpen ? "open" : "",
      this.disabled ? "disabled" : ""
    ].filter(Boolean).join(" ");
  }

  onToggle(): void {
    if (this.disabled) return;
    this.accordion.toggle(this.name);
  }
}
