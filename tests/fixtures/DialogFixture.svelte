<script lang="ts">
  import { ShadcnDialog } from "../../src/svelte";

  let dialog: { show: () => void; hide: () => void };

  export function show() {
    dialog.show();
  }
  export function hide() {
    dialog.hide();
  }
</script>

<ShadcnDialog bind:this={dialog} title="Título Teste" description="Descrição">
  <p class="dialog-body-content">Corpo do dialog</p>

  {#snippet footer(hide)}
    <button class="dialog-cancel" type="button" onclick={hide}>Cancelar</button>
  {/snippet}
</ShadcnDialog>
