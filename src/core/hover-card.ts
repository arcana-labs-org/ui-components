/**
 * Placement math do `<ArcanaHoverCard>` — compartilhada pelos 4 adapters.
 *
 * O `placePanel` (`core/popover`) resolve o caso canônico dos popovers da casa
 * (painel ABAIXO do gatilho, com flip pra cima quando não cabe, largura casada).
 * O hover card precisa de dois eixos (`side`) e de alinhamento (`align`), então
 * esta função ESTENDE aquele contrato:
 *
 * - `side: 'bottom'` (default) → delega o eixo Y ao `placePanel` (mesmo flip,
 *   mesma margem de borda), e só recalcula o X pelo `align`;
 * - `side: 'top' | 'left' | 'right'` → espelha a mesma regra (tenta o lado
 *   pedido, cai pro oposto quando o espaço lá é maior) com a MESMA margem `EDGE`.
 *
 * Como o painel é renderizado em portal no `<body>` com `position: fixed`, tudo
 * é calculado a partir do `getBoundingClientRect()` do gatilho — os valores
 * devolvidos já são coordenadas de viewport, prontas pro inline style.
 */

import { placePanel, type PanelSize, type ViewportSize } from "./popover";

/** Margem mínima até a borda da viewport (idêntica à do `placePanel`). */
const EDGE = 8;

export type HoverCardSide = "top" | "right" | "bottom" | "left";
export type HoverCardAlign = "start" | "center" | "end";

/**
 * Atalho no formato da casa (`ArcanaDropdown`): `"bottom-start"`, `"left-end"`, …
 * Quando informado, vence `side`/`align` separados.
 */
export type HoverCardPlacement = HoverCardSide | `${HoverCardSide}-${HoverCardAlign}`;

/** Retângulo do gatilho — um `DOMRect` satisfaz esta interface. */
export interface HoverCardAnchorRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface HoverCardPlaceOptions {
  side?: HoverCardSide;
  align?: HoverCardAlign;
  /** Distância entre gatilho e cartão. Default 8. */
  gap?: number;
}

export interface HoverCardPlacementResult {
  left: number;
  top: number;
  /** Lado EFETIVO depois do flip (pode diferir do pedido) — vira a classe `--{side}`. */
  side: HoverCardSide;
  align: HoverCardAlign;
}

const SIDES: HoverCardSide[] = ["top", "right", "bottom", "left"];
const ALIGNS: HoverCardAlign[] = ["start", "center", "end"];

function clamp(value: number, min: number, max: number): number {
  // `max < min` (painel maior que a viewport) resolve pro `min` — nunca sai pela
  // borda inicial, que é a que o usuário enxerga primeiro.
  return Math.max(min, Math.min(value, max));
}

/**
 * Normaliza `placement` (`"bottom-start"`) + `side`/`align` soltos num par válido.
 * Valores desconhecidos caem nos defaults (`bottom` / `center`).
 */
export function resolveHoverCardPlacement(
  placement?: HoverCardPlacement | string | null,
  side: HoverCardSide = "bottom",
  align: HoverCardAlign = "center"
): { side: HoverCardSide; align: HoverCardAlign } {
  let resolvedSide: HoverCardSide = SIDES.includes(side) ? side : "bottom";
  let resolvedAlign: HoverCardAlign = ALIGNS.includes(align) ? align : "center";

  if (placement) {
    const [rawSide, rawAlign] = String(placement).split("-");
    if (SIDES.includes(rawSide as HoverCardSide)) resolvedSide = rawSide as HoverCardSide;
    if (ALIGNS.includes(rawAlign as HoverCardAlign)) resolvedAlign = rawAlign as HoverCardAlign;
  }

  return { side: resolvedSide, align: resolvedAlign };
}

/** X do painel nos lados verticais (top/bottom), já preso à viewport. */
function alignX(
  anchor: HoverCardAnchorRect,
  panel: PanelSize,
  viewport: ViewportSize,
  align: HoverCardAlign
): number {
  const raw =
    align === "start"
      ? anchor.left
      : align === "end"
        ? anchor.right - panel.width
        : anchor.left + anchor.width / 2 - panel.width / 2;
  return clamp(raw, EDGE, viewport.width - panel.width - EDGE);
}

/** Y do painel nos lados horizontais (left/right), já preso à viewport. */
function alignY(
  anchor: HoverCardAnchorRect,
  panel: PanelSize,
  viewport: ViewportSize,
  align: HoverCardAlign
): number {
  const raw =
    align === "start"
      ? anchor.top
      : align === "end"
        ? anchor.bottom - panel.height
        : anchor.top + anchor.height / 2 - panel.height / 2;
  return clamp(raw, EDGE, viewport.height - panel.height - EDGE);
}

export function placeHoverCard(
  anchor: HoverCardAnchorRect,
  panel: PanelSize,
  viewport: ViewportSize,
  options: HoverCardPlaceOptions = {}
): HoverCardPlacementResult {
  const gap = options.gap ?? 8;
  const { side, align } = resolveHoverCardPlacement(undefined, options.side, options.align);

  if (side === "bottom") {
    // Caso canônico: reaproveita integralmente o flip do `placePanel`.
    const base = placePanel(anchor, panel, viewport, { gap });
    return {
      left: alignX(anchor, panel, viewport, align),
      top: base.top,
      side: base.flipUp ? "top" : "bottom",
      align,
    };
  }

  if (side === "top") {
    const spaceAbove = anchor.top;
    const spaceBelow = viewport.height - anchor.bottom;
    const flipDown = spaceAbove < panel.height + gap + EDGE && spaceBelow > spaceAbove;
    const effective: HoverCardSide = flipDown ? "bottom" : "top";
    return {
      left: alignX(anchor, panel, viewport, align),
      top: effective === "top" ? Math.max(EDGE, anchor.top - panel.height - gap) : anchor.bottom + gap,
      side: effective,
      align,
    };
  }

  // Lados horizontais.
  const spaceRight = viewport.width - anchor.right;
  const spaceLeft = anchor.left;
  const wanted = side === "right" ? spaceRight : spaceLeft;
  const other = side === "right" ? spaceLeft : spaceRight;
  const flip = wanted < panel.width + gap + EDGE && other > wanted;
  const effective: HoverCardSide = flip ? (side === "right" ? "left" : "right") : side;

  const rawLeft = effective === "right" ? anchor.right + gap : anchor.left - panel.width - gap;

  return {
    left: clamp(rawLeft, EDGE, viewport.width - panel.width - EDGE),
    top: alignY(anchor, panel, viewport, align),
    side: effective,
    align,
  };
}
