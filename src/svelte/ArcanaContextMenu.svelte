<script lang="ts">
  /**
   * `<ArcanaContextMenu>` — Svelte 5 port do SFC Vue. Menu de contexto (botão
   * direito): um `ArcanaDropdown` acionado por `contextmenu` e ancorado nas
   * COORDENADAS DO CURSOR (`placeAtPointer` → `placePanel`, que garante o
   * flip/shift contra a viewport).
   *
   * Equivalências Vue → Svelte 5 (mesmas do ArcanaDropdown):
   * - `<Teleport to="body">` → action `use:portal`
   * - `provide`/`inject` → `setContext`/`getContext` (chave em `context-menu-context.ts`)
   * - slot `#trigger` → snippet `trigger`; slot default → snippet `children`
   * - `emit('open'|'close'|'select')` → `onOpen` / `onClose` / `onSelect`
   */
  import type { Snippet } from "svelte";
  import { setContext, tick } from "svelte";
  import { portal } from "./portal";
  import ArcanaContextMenuItem from "./ArcanaContextMenuItem.svelte";
  import { CONTEXT_MENU_CONTEXT, type ContextMenuContextValue } from "./context-menu-context";
  import {
    CONTEXT_MENU_PANEL_ESTIMATE,
    handleContextMenuKey,
    placeAtPointer,
    registerOpenContextMenu,
    unregisterOpenContextMenu,
    type ArcanaContextMenuItemSpec,
  } from "../core/context-menu";

  let {
    disabled = false,
    panelClass = undefined,
    ariaLabel = undefined,
    items = [],
    trigger,
    children,
    onOpen,
    onClose,
    onSelect,
  }: {
    disabled?: boolean;
    panelClass?: string;
    ariaLabel?: string;
    items?: ArcanaContextMenuItemSpec[];
    trigger?: Snippet<[{ open: boolean; close: () => void }]>;
    children?: Snippet<[{ close: () => void }]>;
    onOpen?: () => void;
    onClose?: () => void;
    onSelect?: (item: ArcanaContextMenuItemSpec, index: number) => void;
  } = $props();

  let isOpen = $state(false);
  // Nasce fora da tela: o painel precisa existir pra ser medido e não deve piscar.
  let panelStyle = $state("position:fixed;left:-9999px;top:-9999px;");
  let rootEl: HTMLDivElement | null = $state(null);
  let panelEl: HTMLDivElement | null = $state(null);
  let point = { x: 0, y: 0 };

  function position() {
    if (!panelEl) return;
    const place = placeAtPointer(
      point,
      {
        width: panelEl.offsetWidth || CONTEXT_MENU_PANEL_ESTIMATE.width,
        height: panelEl.offsetHeight || CONTEXT_MENU_PANEL_ESTIMATE.height,
      },
      { width: window.innerWidth, height: window.innerHeight }
    );
    panelStyle = `position:fixed;left:${place.left}px;top:${place.top}px;`;
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    onClose?.();
  }

  function closeAndRestoreFocus() {
    close();
    rootEl?.focus();
  }

  async function onContextMenu(event: MouseEvent) {
    if (disabled) return;
    // Menus aninhados: só o gatilho mais interno responde.
    event.preventDefault();
    event.stopPropagation();
    point = { x: event.clientX, y: event.clientY };

    if (!isOpen) {
      isOpen = true;
      onOpen?.();
    }
    await tick();
    position();
    panelEl?.focus();
  }

  function onPanelKeydown(event: KeyboardEvent) {
    const result = handleContextMenuKey(event, panelEl);
    if (result === "close") {
      event.preventDefault();
      event.stopPropagation();
      closeAndRestoreFocus();
    }
  }

  // Listeners globais + registro (abrir um menu fecha os outros) enquanto aberto.
  $effect(() => {
    if (!isOpen) return;

    registerOpenContextMenu(close);

    const onOutsidePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootEl?.contains(target)) return;
      if (panelEl?.contains(target)) return;
      close();
    };
    const onDocumentKeydown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      closeAndRestoreFocus();
    };
    const onScroll = (event: Event) => {
      if (panelEl && event.target instanceof Node && panelEl.contains(event.target)) return;
      close();
    };

    document.addEventListener("mousedown", onOutsidePointerDown, true);
    document.addEventListener("keydown", onDocumentKeydown, true);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      unregisterOpenContextMenu(close);
      document.removeEventListener("mousedown", onOutsidePointerDown, true);
      document.removeEventListener("keydown", onDocumentKeydown, true);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", onScroll, true);
    };
  });

  setContext<ContextMenuContextValue>(CONTEXT_MENU_CONTEXT, { close });

  const panelClasses = $derived(
    ["arcana-context-menu__panel", panelClass].filter(Boolean).join(" ")
  );
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class="arcana-context-menu"
  bind:this={rootEl}
  tabindex="-1"
  oncontextmenu={onContextMenu}
>
  {@render trigger?.({ open: isOpen, close })}

  {#if isOpen}
    <div
      use:portal
      bind:this={panelEl}
      class={panelClasses}
      style={panelStyle}
      role="menu"
      aria-label={ariaLabel}
      tabindex="-1"
      onkeydown={onPanelKeydown}
      oncontextmenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {#if children}
        {@render children({ close })}
      {:else}
        {#each items as item, index (index)}
          <ArcanaContextMenuItem
            icon={item.icon}
            suffix={item.suffix}
            variant={item.variant ?? "default"}
            disabled={item.disabled === true}
            divided={item.divided === true}
            closeOnClick={item.closeOnClick !== false}
            onSelect={() => onSelect?.(item, index)}
          >
            {item.label}
          </ArcanaContextMenuItem>
        {/each}
      {/if}
    </div>
  {/if}
</div>
