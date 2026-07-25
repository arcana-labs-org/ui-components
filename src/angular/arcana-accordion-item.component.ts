import {
  AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, ElementRef,
  Input, OnDestroy, ViewChild, inject
} from "@angular/core";
import { animateCollapse, applyCollapsedState } from "../core/collapse";
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
 * Vue → Angular:
 * - slot `#title` → `@Input() title` (string) nesta fase; slot default → `<ng-content>`
 * - `watch` + `$refs` da animação → `ngDoCheck` (o `open` deriva do pai, não há
 *   `ngOnChanges` pra ele) + `@ViewChild` do content
 *
 * `animated` (opcional): quando **não** informada, herda o `animated` do
 * `ArcanaAccordionComponent` (default `false`); quando informada, tem **precedência**
 * sobre a do container. A animação é imperativa (`core/collapse.ts`), porque
 * `height: auto` não anima: o conteúdo é medido e a altura em px é escrita inline; a
 * transição em si está no CSS (`.arcana-accordion-content--animated`). Com
 * `prefers-reduced-motion: reduce` a animação é ignorada e o estado final é aplicado direto.
 */
/** Sequência para os ids de painel — ver `panelId` na classe. */
let panelUid = 0;

@Component({
  selector: "div[arcanaAccordionItem]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    "[class]": "rootClass"
  },
  template: `
    <button
      type="button"
      class="arcana-accordion-trigger"
      [disabled]="disabled"
      [attr.aria-expanded]="isOpen"
      [attr.aria-controls]="panelId"
      (click)="onToggle()"
    >
      <span class="arcana-accordion-title">{{ title }}</span>
      <i class="fa-solid fa-chevron-down arcana-accordion-chevron"></i>
    </button>
    <!--
      Modo estático: [style.display] reproduz o v-show do Vue (content montado, alterna
      display). Modo animado: o binding fica null de propósito; quem escreve
      display/height/opacity é o core/collapse.
    -->
    <div
      #content
      [id]="panelId"
      role="region"
      class="arcana-accordion-content"
      [class.arcana-accordion-content--animated]="isAnimated"
      [style.display]="isAnimated || isOpen ? null : 'none'"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class ArcanaAccordionItemComponent implements AfterViewInit, DoCheck, OnDestroy {
  private readonly accordion = inject(ArcanaAccordionComponent);

  @Input({ required: true }) name!: string;
  /** Amarra `aria-controls` do gatilho ao painel. Contador de módulo: a lib é
      client-only, então não há hidratação de SSR para divergir. */
  readonly panelId = `arcana-accordion-panel-${++panelUid}`;

  @Input() title = "";
  @Input() disabled = false;
  /** `undefined` = herda do `ArcanaAccordionComponent`; informado = tem precedência. */
  @Input() animated?: boolean;

  @ViewChild("content") private contentRef?: ElementRef<HTMLElement>;

  private viewReady = false;
  private prevOpen = false;
  private cancelAnimation: (() => void) | null = null;

  get isOpen(): boolean {
    return this.accordion.isOpen(this.name);
  }

  get isAnimated(): boolean {
    return this.animated ?? this.accordion.animated;
  }

  get rootClass(): string {
    return [
      "arcana-accordion-item",
      this.isOpen ? "open" : "",
      this.disabled ? "disabled" : ""
    ].filter(Boolean).join(" ");
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.prevOpen = this.isOpen;
    const el = this.contentRef?.nativeElement;
    if (el && this.isAnimated) applyCollapsedState(el, this.isOpen);
  }

  ngDoCheck(): void {
    if (!this.viewReady) return;
    const open = this.isOpen;
    if (open === this.prevOpen) return;
    this.prevOpen = open;
    const el = this.contentRef?.nativeElement;
    if (!el || !this.isAnimated) return;
    this.cancelAnimation?.();
    this.cancelAnimation = animateCollapse(el, open);
  }

  ngOnDestroy(): void {
    this.cancelAnimation?.();
    this.cancelAnimation = null;
  }

  onToggle(): void {
    if (this.disabled) return;
    this.accordion.toggle(this.name);
  }
}
