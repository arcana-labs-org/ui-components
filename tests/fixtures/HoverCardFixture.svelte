<script lang="ts">
  /** Fixture do port Svelte do `ArcanaHoverCard` (snippets não dão pra montar direto do teste). */
  import ArcanaHoverCard from "../../src/svelte/ArcanaHoverCard.svelte";

  let {
    openDelay = 100,
    closeDelay = 200,
  }: { openDelay?: number; closeDelay?: number } = $props();
</script>

<ArcanaHoverCard {openDelay} {closeDelay}>
  {#snippet trigger()}
    <a class="gatilho" href="#perfil">@arcana</a>
  {/snippet}
  <p class="cartao">Arcana Labs</p>
</ArcanaHoverCard>
