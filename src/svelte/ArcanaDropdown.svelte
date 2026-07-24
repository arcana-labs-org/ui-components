<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type ArcanaDropdownPlacement =
    | "bottom-end"
    | "bottom-start"
    | "top-end"
    | "top-start";
  export type ArcanaDropdownSize = "default" | "comfortable";

  export interface DropdownContextValue {
    /** Densidade herdada pelos `<ArcanaDropdownItem>` filhos. Getter — reativo. */
    readonly size: ArcanaDropdownSize;
    /** Fecha o menu (chamado pelo item ao clicar com `closeOnClick`). */
    close: () => void;
  }

  /** Chave de contexto compartilhada entre `<ArcanaDropdown>` e `<ArcanaDropdownItem>`. */
  export const DROPDOWN_CONTEXT = Symbol("arcana-dropdown");
</script>

<script lang="ts">
  /**
   * `<ArcanaDropdown>` — Svelte 5 port do SFC Vue. Dropdown menu arcana-style (palette
   * zinc) que substitui `<el-dropdown>`.
   *
   * Equivalências Vue → Svelte 5:
   * - `<Teleport to="body">` → action `use:portal` (menu no body; evita clipping por overflow)
   * - `provide('shadcnDropdownSize')` + `inject` → `setContext`/`getContext` (propaga através
   *   do portal — segue a árvore de componentes, não o DOM). Também expõe `close` no contexto,
   *   substituindo o CustomEvent `arcana-dropdown-close` do SFC (o item chama `ctx.close()`).
   * - slot `#trigger` (scope `{ open, toggle }`) → snippet `trigger`
   * - slot default (scope `{ close }`) → snippet `children`
   * - `emit('open'|'close')` → `onOpen` / `onClose`
   *
   * Posicionamento via `getBoundingClientRect` + flip/shift replica o SFC. Transição omitida.
   */
  import { setContext } from "svelte";
  import { portal } from "./portal";

  let {
    placement = "bottom-end",
    offset = 4,
    disabled = false,
    size = "default",
    trigger,
    children,
    onOpen,
    onClose,
  }: {
    placement?: ArcanaDropdownPlacement;
    offset?: number;
    disabled?: boolean;
    size?: ArcanaDropdownSize;
    trigger?: Snippet<[{ open: boolean; toggle: () => void }]>;
    children?: Snippet<[{ close: () => void }]>;
    onOpen?: () => void;
    onClose?: () => void;
  } = $props();

  let isOpen = $state(false);
  let menuStyle = $state("");
  let containerEl: HTMLDivElement | null = $state(null);
  let menuEl: HTMLDivElement | null = $state(null);

  function positionMenu() {
    const container = containerEl;
    const menu = menuEl;
    if (!container || !menu) return;

    const triggerRect = container.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 8;

    const wantsTop = placement.startsWith("top");
    const wantsEnd = placement.endsWith("end");

    let top: number;
    if (wantsTop) {
      top = triggerRect.top - menuRect.height - offset;
      if (top < margin) top = triggerRect.bottom + offset;
    } else {
      top = triggerRect.bottom + offset;
      if (top + menuRect.height > vh - margin) {
        top = triggerRect.top - menuRect.height - offset;
      }
    }

    let left = wantsEnd ? triggerRect.right - menuRect.width : triggerRect.left;
    if (left < margin) left = margin;
    if (left + menuRect.width > vw - margin) left = vw - menuRect.width - margin;

    menuStyle = `position:fixed;top:${top}px;left:${left}px;`;
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    onClose?.();
  }

  function open() {
    isOpen = true;
    onOpen?.();
  }

  function toggle() {
    if (disabled) return;
    isOpen ? close() : open();
  }

  // Posiciona o menu logo após abrir e anexa listeners globais (fora, ESC, resize/scroll).
  $effect(() => {
    if (!isOpen) return;
    positionMenu();

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerEl?.contains(target)) return;
      if (menuEl?.contains(target)) return;
      close();
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };

    document.addEventListener("click", handleOutsideClick, true);
    document.addEventListener("keydown", handleKeydown);
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", positionMenu, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
      document.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("scroll", positionMenu, true);
    };
  });

  // Contexto reativo: `size` via getter (prop pode mudar), `close` estável.
  setContext<DropdownContextValue>(DROPDOWN_CONTEXT, {
    get size() {
      return size;
    },
    close,
  });

  const menuClasses = $derived(
    [
      "arcana-dropdown__menu",
      size === "comfortable" ? "arcana-dropdown__menu--comfortable" : "",
    ]
      .filter(Boolean)
      .join(" ")
  );
</script>

<div class="arcana-dropdown" bind:this={containerEl}>
  <span
    class="arcana-dropdown__trigger"
    role="presentation"
    onclick={(e) => {
      e.stopPropagation();
      toggle();
    }}
  >
    {@render trigger?.({ open: isOpen, toggle })}
  </span>

  {#if isOpen}
    <div
      use:portal
      bind:this={menuEl}
      class={menuClasses}
      style={menuStyle}
      role="menu"
      tabindex="-1"
    >
      {@render children?.({ close })}
    </div>
  {/if}
</div>
