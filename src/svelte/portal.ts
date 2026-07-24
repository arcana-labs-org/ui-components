/**
 * Action `use:portal` — move o nó pro `document.body` (ou target dado) enquanto o
 * Svelte continua controlando/reagindo a ele. Equivale ao `<Teleport to="body">` do
 * Vue e ao `createPortal(..., document.body)` do React usados nos overlays (Select,
 * MultiSelectPopover). Ao destruir (`{#if}` fecha), o nó é removido do body.
 */
export function portal(node: HTMLElement, target: HTMLElement | undefined = undefined) {
  const to = target ?? (typeof document !== "undefined" ? document.body : null);
  to?.appendChild(node);
  return {
    destroy() {
      if (node.parentNode) node.parentNode.removeChild(node);
    },
  };
}
