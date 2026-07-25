/**
 * Lógica compartilhada do `ArcanaContextMenu` (menu de contexto — botão direito).
 *
 * O menu de contexto é um "dropdown ancorado no cursor": o painel vive num portal
 * no `<body>` com `position: fixed`, mas a âncora não é o gatilho e sim o PONTO
 * onde o usuário clicou. Como `placePanel` (core/popover) já resolve flip/shift
 * contra a viewport, tratamos o cursor como uma âncora de largura zero.
 *
 * Aqui ficam as partes que não dependem de framework — assim Vue, React, Svelte e
 * Angular posicionam, navegam por teclado e se fecham mutuamente do MESMO jeito.
 */

import { placePanel, type PanelSize, type ViewportSize } from "./popover";

export type ArcanaContextMenuVariant = "default" | "danger" | "success" | "warning";

/** Item no modo data-driven (prop `items`). Espelha as props do `ArcanaContextMenuItem`. */
export interface ArcanaContextMenuItemSpec {
  label: string;
  icon?: string;
  /** Atalho/afixo à direita (ex: "⌘C"). */
  suffix?: string;
  variant?: ArcanaContextMenuVariant;
  disabled?: boolean;
  /** Separador ACIMA deste item. */
  divided?: boolean;
  closeOnClick?: boolean;
}

export interface PointerPoint {
  x: number;
  y: number;
}

export interface ContextMenuPlacement {
  left: number;
  top: number;
}

/** Folga entre o cursor e o canto do painel. */
export const POINTER_GAP = 2;

/**
 * Tamanho presumido do painel quando ainda não foi medido (ou quando o ambiente
 * não calcula layout, como o happy-dom dos testes). Mesmo truque do ArcanaTreeSelect.
 */
export const CONTEXT_MENU_PANEL_ESTIMATE: PanelSize = { width: 200, height: 240 };

/** Classe do item — usada também para localizar os alvos de navegação por teclado. */
export const CONTEXT_MENU_ITEM_CLASS = "arcana-context-menu-item";

/**
 * Posiciona o painel a partir das coordenadas do cursor, evitando que ele saia da
 * viewport (o `placePanel` cuida do shift horizontal e do flip vertical).
 */
export function placeAtPointer(
  point: PointerPoint,
  panel: PanelSize,
  viewport: ViewportSize,
  gap: number = POINTER_GAP
): ContextMenuPlacement {
  const place = placePanel(
    { left: point.x, top: point.y, bottom: point.y, width: 0 },
    panel,
    viewport,
    { gap }
  );
  return { left: place.left, top: place.top };
}

/** Itens habilitados do painel, na ordem do DOM. */
export function contextMenuItems(panel: HTMLElement | null | undefined): HTMLElement[] {
  if (!panel) return [];
  const nodes = Array.from(panel.querySelectorAll<HTMLElement>(`.${CONTEXT_MENU_ITEM_CLASS}`));
  return nodes.filter(
    (node) =>
      !(node as HTMLButtonElement).disabled && node.getAttribute("aria-disabled") !== "true"
  );
}

/** Move o foco `delta` posições (com wrap) entre os itens habilitados. */
export function moveContextMenuFocus(panel: HTMLElement | null | undefined, delta: number): void {
  const items = contextMenuItems(panel);
  if (items.length === 0) return;

  const active = typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;
  const current = active ? items.indexOf(active) : -1;
  const next =
    current === -1
      ? delta > 0
        ? 0
        : items.length - 1
      : (current + delta + items.length) % items.length;

  items[next]?.focus();
}

export type ContextMenuKeyResult = "handled" | "close" | "ignored";

/**
 * Teclado do painel (WAI-ARIA menu): ↑/↓ navegam, Home/End vão às pontas,
 * Enter/Espaço acionam o item focado, Escape pede fechamento.
 *
 * Enter/Espaço chamam `.click()` e dão `preventDefault()` para NÃO somar com a
 * ativação nativa do `<button>` (que dispararia um segundo clique).
 *
 * Devolve `"close"` para o Escape — quem chama decide como fechar e devolver o
 * foco ao gatilho (isso depende do framework).
 */
export function handleContextMenuKey(
  event: KeyboardEvent,
  panel: HTMLElement | null | undefined
): ContextMenuKeyResult {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      moveContextMenuFocus(panel, 1);
      return "handled";
    case "ArrowUp":
      event.preventDefault();
      moveContextMenuFocus(panel, -1);
      return "handled";
    case "Home": {
      event.preventDefault();
      contextMenuItems(panel)[0]?.focus();
      return "handled";
    }
    case "End": {
      event.preventDefault();
      const items = contextMenuItems(panel);
      items[items.length - 1]?.focus();
      return "handled";
    }
    case "Enter":
    case " ": {
      const active = typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;
      const target = active && panel?.contains(active) && active.classList.contains(CONTEXT_MENU_ITEM_CLASS)
        ? active
        : contextMenuItems(panel)[0];
      if (!target) return "ignored";
      event.preventDefault();
      target.click();
      return "handled";
    }
    case "Escape":
      return "close";
    default:
      return "ignored";
  }
}

/**
 * Registro global dos menus abertos. Abrir um menu fecha qualquer outro — inclusive
 * de outro framework na mesma página, já que todos passam por aqui.
 */
const openContextMenus = new Set<() => void>();

export function registerOpenContextMenu(close: () => void): void {
  for (const other of Array.from(openContextMenus)) {
    if (other === close) continue;
    openContextMenus.delete(other);
    other();
  }
  openContextMenus.add(close);
}

export function unregisterOpenContextMenu(close: () => void): void {
  openContextMenus.delete(close);
}
