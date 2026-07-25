/**
 * Contexto compartilhado entre `<ArcanaContextMenu>` e `<ArcanaContextMenuItem>`.
 *
 * Fica num módulo à parte (e não no `<script module>` do pai, como no
 * `ArcanaDropdown`) porque o pai TAMBÉM importa o item — pro modo data-driven
 * `items`. Com a chave aqui, não há import circular pai ↔ item.
 */

export interface ContextMenuContextValue {
  /** Fecha o menu — chamado pelo item ao ser clicado com `closeOnClick`. */
  close: () => void;
}

export const CONTEXT_MENU_CONTEXT = Symbol("arcana-context-menu");
