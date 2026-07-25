import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

/**
 * `ArcanaAspectRatioComponent` — Angular port do SFC Vue `ArcanaAspectRatio`.
 *
 * Attribute selector num `<div>` (`<div arcanaAspectRatio>`): mantém a proporção
 * do conteúdo (imagem, vídeo, iframe, mapa…) independentemente da largura
 * disponível. Emite o MESMO markup e as MESMAS classes do Vue/React/Svelte —
 * `.arcana-aspect-ratio` no host + `.arcana-aspect-ratio__content` envolvendo o
 * conteúdo projetado.
 *
 * Implementação SEM JavaScript: a razão vira o custom property inline
 * `--arcana-aspect-ratio` e quem faz o trabalho é a propriedade `aspect-ratio`
 * do CSS (a lib mira browsers modernos — nada de padding-hack nem
 * `ResizeObserver`). Mídia projetada direta recebe `object-fit: cover`
 * (ajustável por `--arcana-aspect-ratio-fit`).
 *
 * @example
 * <div arcanaAspectRatio [ratio]="16 / 9">
 *   <img src="/capa.jpg" alt="Capa" />
 * </div>
 */
const DEFAULT_RATIO = 16 / 9;

@Component({
  selector: "div[arcanaAspectRatio]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "class": "arcana-aspect-ratio",
    "[style.--arcana-aspect-ratio]": "safeRatio"
  },
  template: `
    <div class="arcana-aspect-ratio__content">
      <ng-content></ng-content>
    </div>
  `
})
export class ArcanaAspectRatioComponent {
  /** Largura ÷ altura. Default `16 / 9`; valores não-finitos ou ≤ 0 caem no default. */
  @Input() ratio = DEFAULT_RATIO;

  /** Blinda contra `0`, negativos e `NaN` (que quebrariam o layout inteiro). */
  get safeRatio(): string {
    const value = Number(this.ratio);
    return String(Number.isFinite(value) && value > 0 ? value : DEFAULT_RATIO);
  }
}
