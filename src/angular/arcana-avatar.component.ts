import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges
} from "@angular/core";

/**
 * `ArcanaAvatarComponent` — Angular port do SFC Vue `ArcanaAvatar`.
 *
 * Attribute selector num `<span>` (`<span arcanaAvatar>`): avatar com fallback em
 * cascata. Reproduz `.arcana-avatar` (+ `--{size}`/`--{shape}`/`has-image`) com
 * `__img` / `__initials` / `__icon` / `__glyph`, idêntico ao Vue/React/Svelte.
 *
 * Cascata (para no primeiro que existir): **imagem → iniciais → ícone → silhueta**.
 * A imagem que falha ao carregar sai da cascata em runtime (o componente guarda a
 * `src` quebrada), então URL morta nunca deixa um quadrado vazio. Trocar a `src`
 * re-arma a tentativa.
 *
 * Vue → Angular:
 * - `emit('error')` → `@Output() error`
 *
 * Dentro de um `<div arcanaAvatarGroup [size]>`, o tamanho do GRUPO vence o deste
 * componente — o grupo seta `--arcana-avatar-size` e os filhos herdam. Ver o
 * cabeçalho de `styles/parts/avatar.scss`.
 */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";

const GLYPH_PATH =
  "M12 12.6a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6zm0 1.8c-3.6 0-7.2 1.85-7.2 4.1V20h14.4v-1.5c0-2.25-3.6-4.1-7.2-4.1z";

@Component({
  selector: "span[arcanaAvatar]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--arcana-avatar-own-size]": "ownSizeVar",
    "[style.--arcana-avatar-color]": "color || null"
  },
  template: `
    @if (showImage) {
      <img class="arcana-avatar__img" [src]="src" [alt]="alt" (error)="onError($event)" />
    } @else if (initials) {
      <span class="arcana-avatar__initials">{{ initials }}</span>
    } @else if (icon) {
      <i [class]="'arcana-avatar__icon ' + icon" aria-hidden="true"></i>
    } @else {
      <svg class="arcana-avatar__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path [attr.d]="glyphPath"></path>
      </svg>
    }
  `
})
export class ArcanaAvatarComponent implements OnChanges {
  @Input() src = "";
  @Input() alt = "";
  /** Texto curto do fallback (o CSS aplica `text-transform: uppercase`). */
  @Input() initials = "";
  /** Classe de ícone do fallback (ex: `fa-solid fa-user`). */
  @Input() icon = "";
  /** `'xs' | 'sm' | 'md' | 'lg' | 'xl'` (default `'md'` = 40px) ou um número de px. */
  @Input() size: AvatarSize | number = "md";
  @Input() shape: AvatarShape = "circle";
  /** Cor de fundo do fallback. Default: token `--arcana-solid` (acento da paleta). */
  @Input() color = "";
  @Input() className = "";

  @Output() error = new EventEmitter<Event>();

  /** `src` que já falhou — usada para pular a imagem na cascata. */
  private failedSrc: string | null = null;

  readonly glyphPath = GLYPH_PATH;

  ngOnChanges(changes: SimpleChanges): void {
    // Nova `src` re-arma a tentativa (a falha era da URL anterior).
    if (changes["src"] && !changes["src"].firstChange) {
      this.failedSrc = null;
    }
  }

  /** Tamanho numérico (px) quando `size` não é um degrau da escala. */
  get numericSize(): number | null {
    if (this.size === undefined || this.size === null || (this.size as unknown) === "") return null;
    const n = typeof this.size === "number" ? this.size : Number(this.size);
    return Number.isFinite(n) ? n : null;
  }

  get ownSizeVar(): string | null {
    return this.numericSize === null ? null : `${this.numericSize}px`;
  }

  get showImage(): boolean {
    return !!this.src && this.failedSrc !== this.src;
  }

  get rootClass(): string {
    return [
      "arcana-avatar",
      this.numericSize === null ? `arcana-avatar--${this.size}` : "",
      `arcana-avatar--${this.shape}`,
      this.showImage ? "has-image" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  onError(event: Event): void {
    this.failedSrc = this.src;
    this.error.emit(event);
  }
}
