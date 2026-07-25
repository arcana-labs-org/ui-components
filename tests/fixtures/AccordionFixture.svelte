<script lang="ts">
  import { ArcanaAccordion, ArcanaAccordionItem } from "../../src/svelte";

  let { animated = false }: { animated?: boolean } = $props();
  let value = $state<string | string[] | null>(null);
</script>

<ArcanaAccordion {value} {animated} onValueChange={(v) => (value = v)}>
  <ArcanaAccordionItem name="a" title="A">
    <p class="body-a">Corpo A</p>
  </ArcanaAccordionItem>
  <ArcanaAccordionItem name="b" title="B">
    <p class="body-b">Corpo B</p>
  </ArcanaAccordionItem>
</ArcanaAccordion>
