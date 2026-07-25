<script lang="ts">
  import { ArcanaContextMenu, ArcanaContextMenuItem } from "../../src/svelte";

  let { onSelect, onClose }: { onSelect?: (v: string) => void; onClose?: () => void } = $props();
</script>

<ArcanaContextMenu ariaLabel="Ações" panelClass="minha-tela" {onClose}>
  {#snippet trigger()}
    <div class="alvo">clique com o botão direito</div>
  {/snippet}

  <ArcanaContextMenuItem icon="fa-solid fa-copy" suffix="⌘C" onSelect={() => onSelect?.("copy")}>
    Copiar
  </ArcanaContextMenuItem>
  <ArcanaContextMenuItem variant="danger" divided onSelect={() => onSelect?.("delete")}>
    Excluir
  </ArcanaContextMenuItem>
</ArcanaContextMenu>
