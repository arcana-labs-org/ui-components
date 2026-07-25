<script lang="ts">
  // Fixture: o teste precisa de um accordion Svelte já aberto para conferir o
  // par aria-expanded/aria-controls do padrão de disclosure.
  import ArcanaAccordion from "../../src/svelte/ArcanaAccordion.svelte";
  import ArcanaAccordionItem from "../../src/svelte/ArcanaAccordionItem.svelte";
</script>

<ArcanaAccordion value="a">
  <ArcanaAccordionItem name="a" title="Um" />
</ArcanaAccordion>
