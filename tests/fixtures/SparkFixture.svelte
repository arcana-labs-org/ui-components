<script lang="ts">
  import { SparkGridEmptyState } from "../../src/svelte";

  let { onPanelVisible }: { onPanelVisible?: (v: boolean) => void } = $props();

  // Começa carregando; `finish()` dispara o flip loading:true→false que arma o painel.
  let loading = $state(true);

  export function finish() {
    loading = false;
  }
</script>

<SparkGridEmptyState
  total={0}
  {loading}
  filtered={false}
  icon="fa-solid fa-box"
  title="Nada por aqui"
  actionLabel="Adicionar"
  {onPanelVisible}
>
  <div class="spark-children">Conteúdo real</div>
</SparkGridEmptyState>
