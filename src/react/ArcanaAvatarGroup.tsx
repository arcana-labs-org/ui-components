import type { CSSProperties, ReactNode } from "react";
import { ArcanaAvatar, type AvatarShape, type AvatarSize } from "./ArcanaAvatar";

/**
 * `<ArcanaAvatarGroup>` — React port. Pilha de avatares sobrepostos. Reproduz
 * `<div class="arcana-avatar-group">` (+ `--{size}`/`--{shape}`) com os avatares e a
 * bolha `.arcana-avatar-group__overflow`, idêntico ao SFC.
 *
 * Duas formas de alimentar, combináveis (os data-driven vêm primeiro, depois os
 * `children`):
 * 1. **Data-driven** — prop `avatars`. É a única em que o `max` sabe cortar, então é
 *    ela que rende o "+N" automático.
 * 2. **Composição** — `<ArcanaAvatar>` em `children`. Aqui o grupo NÃO fatia (Angular
 *    e Svelte não permitem contar/cortar conteúdo projetado, e fatiar só no React
 *    quebraria a paridade entre os ports): passe `overflowCount` com quantos ficaram
 *    de fora e o grupo desenha a mesma bolha "+N".
 *
 * `size` propaga para TODOS os filhos, inclusive os de `children`: o grupo seta
 * `--arcana-avatar-size` e o avatar resolve o tamanho por herança (o valor herdado do
 * grupo vence o tamanho próprio do filho). Ver `styles/parts/avatar.scss`.
 *
 * Equivalências Vue → React: slot default → `children`.
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

export interface ArcanaAvatarGroupProps {
    avatars?: AvatarGroupItem[];
    /** Máximo de itens de `avatars` a exibir; o excedente vira "+N". `0` = sem limite. */
    max?: number;
    /** "+N" manual, para quando os avatares vêm por `children` (o grupo não fatia). */
    overflowCount?: number;
    /** Propaga aos filhos. Omitido = cada avatar usa o seu. */
    size?: AvatarSize | number;
    /** Normaliza os filhos (inclusive projetados). Omitido = cada avatar usa o seu. */
    shape?: AvatarShape;
    /** px que cada avatar cobre do anterior. Default: 30% do tamanho. */
    overlap?: number;
    /** Espaçamento positivo (px). Informado, vence o `overlap`. */
    spacing?: number;
    ariaLabel?: string;
    children?: ReactNode;
    className?: string;
}

export function ArcanaAvatarGroup({
    avatars = [],
    max = 0,
    overflowCount = 0,
    size,
    shape,
    overlap,
    spacing,
    ariaLabel = "",
    children,
    className,
}: ArcanaAvatarGroupProps) {
    const normalizedAvatars = avatars ?? [];
    const limit = Number(max) || 0;
    const visibleAvatars = limit > 0 ? normalizedAvatars.slice(0, limit) : normalizedAvatars;

    // Excedente do `avatars` + o "+N" manual (caso composição).
    const overflowTotal =
        normalizedAvatars.length - visibleAvatars.length + Math.max(0, Number(overflowCount) || 0);

    // Tamanho numérico (px) quando `size` não é um degrau da escala.
    const numericSize = (() => {
        if (size === undefined || size === null || (size as unknown) === "") return null;
        const n = typeof size === "number" ? size : Number(size);
        return Number.isFinite(n) ? n : null;
    })();

    const style: Record<string, string> = {};
    if (numericSize !== null) style["--arcana-avatar-size"] = `${numericSize}px`;
    // `spacing` (espaço positivo) vence `overlap` (sobreposição).
    if (spacing !== undefined && spacing !== null) {
        style["--arcana-avatar-group-overlap"] = `${-Number(spacing)}px`;
    } else if (overlap !== undefined && overlap !== null) {
        style["--arcana-avatar-group-overlap"] = `${Number(overlap)}px`;
    }

    return (
        <div
            className={[
                "arcana-avatar-group",
                size !== undefined && numericSize === null ? `arcana-avatar-group--${size}` : "",
                shape ? `arcana-avatar-group--${shape}` : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
            style={Object.keys(style).length ? (style as CSSProperties) : undefined}
            role="group"
            aria-label={ariaLabel || undefined}
        >
            {visibleAvatars.map((avatar, i) => (
                <ArcanaAvatar
                    key={i}
                    src={avatar.src || ""}
                    alt={avatar.alt || ""}
                    initials={avatar.initials || ""}
                    icon={avatar.icon || ""}
                    color={avatar.color || ""}
                    shape={shape || "circle"}
                />
            ))}

            {children}

            {overflowTotal > 0 ? (
                <span
                    className={`arcana-avatar arcana-avatar-group__overflow arcana-avatar--${shape || "circle"}`}
                >
                    +{overflowTotal}
                </span>
            ) : null}
        </div>
    );
}
