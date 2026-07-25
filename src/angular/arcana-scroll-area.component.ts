import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaType = "auto" | "always" | "hover";

/**
 * `ArcanaScrollAreaComponent` — Angular port do SFC Vue `ArcanaScrollArea`.
 *
 * Attribute selector num `<div>` (`<div arcanaScrollArea>`): área rolável com
 * barra estilizada. Emite o MESMO markup e as MESMAS classes do Vue/React/Svelte
 * — `.arcana-scroll-area` (+ `--{orientation}` / `--type-{type}`) no host e
 * `.arcana-scroll-area__viewport` como o elemento que rola.
 *
 * A rolagem é **NATIVA**: o componente só pinta a barra (`::-webkit-scrollbar` no
 * Chrome/Safari/Edge + `scrollbar-width`/`scrollbar-color` no Firefox) e limita a
 * altura do viewport. NÃO reimplementamos scroll em JS (translate no conteúdo +
 * polegar sintético) de propósito: assim o teclado (setas, PageUp/PageDown,
 * Home/End, Space), o touch com inércia, o scroll anchoring, o `scrollIntoView` e
 * os leitores de tela continuam funcionando de graça.
 *
 * @example
 * <div arcanaScrollArea [maxHeight]="240" type="hover">…</div>
 */
@Component({
  selector: "div[arcanaScrollArea]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--arcana-scroll-area-size]": "scrollbarSizeCss",
    "[style.--arcana-scroll-area-hide-delay]": "hideDelayCss"
  },
  template: `
    <div
      #viewportEl
      class="arcana-scroll-area__viewport"
      [style.height]="heightCss"
      [style.max-height]="maxHeightCss"
      [attr.tabindex]="tabbable ? 0 : null"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class ArcanaScrollAreaComponent {
  /** Eixos liberados. Default `'vertical'` (o outro eixo fica `overflow: hidden`). */
  @Input() orientation: ScrollAreaOrientation = "vertical";
  /** Altura fixa do viewport. `number` = px; string = valor CSS cru. */
  @Input() height: number | string | null = null;
  /** Altura máxima do viewport. `number` = px; string = valor CSS cru. */
  @Input() maxHeight: number | string | null = null;
  /** Espessura da barra em px (WebKit; no Firefox a espessura é `thin`). Default `10`. */
  @Input() scrollbarSize = 10;
  /**
   * `'auto'` (default): barra nativa, aparece quando há transbordo;
   * `'always'`: `overflow: scroll`, calha sempre reservada;
   * `'hover'`: polegar transparente em repouso, pintado no hover/foco.
   */
  @Input() type: ScrollAreaType = "auto";
  /** Atraso do auto-ocultar (ms) — só tem efeito com `type="hover"`. Default `500`. */
  @Input() hideDelay = 500;
  /** `tabindex="0"` no viewport pra rolar por teclado sem foco interno. Default `true`. */
  @Input() tabbable = true;

  @ViewChild("viewportEl") private viewportRef?: ElementRef<HTMLDivElement>;

  get rootClass(): string {
    return [
      "arcana-scroll-area",
      `arcana-scroll-area--${this.orientation}`,
      `arcana-scroll-area--type-${this.type}`
    ].join(" ");
  }

  get scrollbarSizeCss(): string {
    return `${this.scrollbarSize}px`;
  }

  get hideDelayCss(): string {
    return `${this.hideDelay}ms`;
  }

  get heightCss(): string | null {
    return toCssLength(this.height);
  }

  get maxHeightCss(): string | null {
    return toCssLength(this.maxHeight);
  }

  /** Elemento que realmente rola — útil pra `scrollTo`/`scrollTop` do caller. */
  get viewport(): HTMLDivElement | undefined {
    return this.viewportRef?.nativeElement;
  }
}

/** `number` vira px; string passa crua; `null`/`''` some. */
function toCssLength(value: number | string | null | undefined): string | null {
  if (value === null || value === undefined || value === "") return null;
  return typeof value === "number" ? `${value}px` : String(value);
}
