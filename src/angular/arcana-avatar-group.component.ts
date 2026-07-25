import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";
import { ArcanaAvatarComponent, type AvatarShape, type AvatarSize } from "./arcana-avatar.component";

/**
 * `ArcanaAvatarGroupComponent` — Angular port do SFC Vue `ArcanaAvatarGroup`.
 *
 * Attribute selector num `<div>` (`<div arcanaAvatarGroup>`): pilha de avatares
 * sobrepostos. Reproduz `.arcana-avatar-group` (+ `--{size}`/`--{shape}`) com os
 * avatares e a bolha `.arcana-avatar-group__overflow`, idêntico ao Vue/React/Svelte.
 *
 * Duas formas de alimentar, combináveis (os data-driven vêm primeiro, depois o
 * `<ng-content>`):
 * 1. **Data-driven** — `@Input() avatars`. É a única em que o `max` sabe cortar, então
 *    é ela que rende o "+N" automático.
 * 2. **Composição** — `<span arcanaAvatar>` projetado. Aqui o grupo NÃO fatia
 *    (`<ng-content>` não é uma lista contável): passe `overflowCount` com quantos
 *    ficaram de fora e o grupo desenha a mesma bolha "+N".
 *
 * `size` propaga para TODOS os filhos, inclusive os projetados: o grupo seta
 * `--arcana-avatar-size` e o avatar resolve o tamanho por herança (o valor herdado do
 * grupo vence o tamanho próprio do filho). Ver `styles/parts/avatar.scss`.
 *
 * Vue → Angular:
 * - slot default → `<ng-content>`
 */
export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  initials?: string;
  /** Classe de ícone do fallback (ex: `fa-solid fa-user`). */
  icon?: string;
  /** Cor de fundo do fallback deste avatar. */
  color?: string;
}

@Component({
  selector: "div[arcanaAvatarGroup]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArcanaAvatarComponent],
  host: {
    "[class]": "rootClass",
    "[style.--arcana-avatar-size]": "sizeVar",
    "[style.--arcana-avatar-group-overlap]": "overlapVar",
    "role": "group",
    "[attr.aria-label]": "ariaLabel || null"
  },
  template: `
    @for (avatar of visibleAvatars; track $index) {
      <span
        arcanaAvatar
        [src]="avatar.src || ''"
        [alt]="avatar.alt || ''"
        [initials]="avatar.initials || ''"
        [icon]="avatar.icon || ''"
        [color]="avatar.color || ''"
        [shape]="shape || 'circle'"
      ></span>
    }

    <ng-content></ng-content>

    @if (overflowTotal > 0) {
      <span
        [class]="'arcana-avatar arcana-avatar-group__overflow arcana-avatar--' + (shape || 'circle')"
      >+{{ overflowTotal }}</span>
    }
  `
})
export class ArcanaAvatarGroupComponent {
  @Input() avatars: AvatarGroupItem[] = [];
  /** Máximo de itens de `avatars` a exibir; o excedente vira "+N". `0` = sem limite. */
  @Input() max = 0;
  /** "+N" manual, para quando os avatares vêm projetados (o grupo não fatia). */
  @Input() overflowCount = 0;
  /** Propaga aos filhos. Omitido = cada avatar usa o seu. */
  @Input() size?: AvatarSize | number;
  /** Normaliza os filhos (inclusive projetados). Omitido = cada avatar usa o seu. */
  @Input() shape?: AvatarShape;
  /** px que cada avatar cobre do anterior. Default: 30% do tamanho. */
  @Input() overlap?: number;
  /** Espaçamento positivo (px). Informado, vence o `overlap`. */
  @Input() spacing?: number;
  @Input() ariaLabel = "";
  @Input() className = "";

  get normalizedAvatars(): AvatarGroupItem[] {
    return this.avatars ?? [];
  }

  get visibleAvatars(): AvatarGroupItem[] {
    const limit = Number(this.max) || 0;
    return limit > 0 ? this.normalizedAvatars.slice(0, limit) : this.normalizedAvatars;
  }

  /** Excedente do `avatars` + o "+N" manual (caso composição). */
  get overflowTotal(): number {
    const hidden = this.normalizedAvatars.length - this.visibleAvatars.length;
    return hidden + Math.max(0, Number(this.overflowCount) || 0);
  }

  /** Tamanho numérico (px) quando `size` não é um degrau da escala. */
  get numericSize(): number | null {
    if (this.size === undefined || this.size === null || (this.size as unknown) === "") return null;
    const n = typeof this.size === "number" ? this.size : Number(this.size);
    return Number.isFinite(n) ? n : null;
  }

  get sizeVar(): string | null {
    return this.numericSize === null ? null : `${this.numericSize}px`;
  }

  /** `spacing` (espaço positivo) vence `overlap` (sobreposição). */
  get overlapVar(): string | null {
    if (this.spacing !== undefined && this.spacing !== null) return `${-Number(this.spacing)}px`;
    if (this.overlap !== undefined && this.overlap !== null) return `${Number(this.overlap)}px`;
    return null;
  }

  get rootClass(): string {
    return [
      "arcana-avatar-group",
      this.size !== undefined && this.numericSize === null ? `arcana-avatar-group--${this.size}` : "",
      this.shape ? `arcana-avatar-group--${this.shape}` : "",
      this.className
    ].filter(Boolean).join(" ");
  }
}
