<script lang="ts">
  import { ShadcnDropdown, ShadcnDropdownItem } from "../../src/svelte";

  let { onSelect }: { onSelect?: (v: string) => void } = $props();
</script>

<ShadcnDropdown placement="bottom-end" size="comfortable">
  {#snippet trigger()}
    <button class="trig" type="button">menu</button>
  {/snippet}

  <ShadcnDropdownItem icon="fa-solid fa-pen" onClick={() => onSelect?.("rename")}>
    Renomear
  </ShadcnDropdownItem>
  <ShadcnDropdownItem variant="danger" onClick={() => onSelect?.("delete")}>
    Deletar
  </ShadcnDropdownItem>
</ShadcnDropdown>
