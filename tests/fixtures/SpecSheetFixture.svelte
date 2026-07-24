<script lang="ts">
  import {
    ArcanaSpecSheet,
    ArcanaSpecSheetSection,
    ArcanaSpecSheetField,
  } from "../../src/svelte";
</script>

<ArcanaSpecSheet docNum="Cadastro Nº 042" title="Popgás Distribuidora" metaLabel="Status">
  {#snippet meta()}
    <span class="arcana-spec-sheet-badge arcana-spec-sheet-badge--active">Ativo</span>
  {/snippet}

  <ArcanaSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01" columns={2}>
    <ArcanaSpecSheetField label="Razão Social" value="Popgás LTDA" />
    <ArcanaSpecSheetField label="CNPJ" value={null} />
  </ArcanaSpecSheetSection>

  {#snippet footer()}
    <button class="spec-edit" type="button">Alterar Dados</button>
  {/snippet}
</ArcanaSpecSheet>
