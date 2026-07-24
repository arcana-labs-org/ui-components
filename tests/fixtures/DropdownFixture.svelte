<script lang="ts">
  import { ArcanaDropdown, ArcanaDropdownItem } from "../../src/svelte";

  let { onSelect }: { onSelect?: (v: string) => void } = $props();
</script>

<ArcanaDropdown placement="bottom-end" size="comfortable">
  {#snippet trigger()}
    <button class="trig" type="button">menu</button>
  {/snippet}

  <ArcanaDropdownItem icon="fa-solid fa-pen" onClick={() => onSelect?.("rename")}>
    Renomear
  </ArcanaDropdownItem>
  <ArcanaDropdownItem variant="danger" onClick={() => onSelect?.("delete")}>
    Deletar
  </ArcanaDropdownItem>
</ArcanaDropdown>
