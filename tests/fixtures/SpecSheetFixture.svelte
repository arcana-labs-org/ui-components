<script lang="ts">
  import {
    ShadcnSpecSheet,
    ShadcnSpecSheetSection,
    ShadcnSpecSheetField,
  } from "../../src/svelte";
</script>

<ShadcnSpecSheet docNum="Cadastro Nº 042" title="Popgás Distribuidora" metaLabel="Status">
  {#snippet meta()}
    <span class="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>
  {/snippet}

  <ShadcnSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01" columns={2}>
    <ShadcnSpecSheetField label="Razão Social" value="Popgás LTDA" />
    <ShadcnSpecSheetField label="CNPJ" value={null} />
  </ShadcnSpecSheetSection>

  {#snippet footer()}
    <button class="spec-edit" type="button">Alterar Dados</button>
  {/snippet}
</ShadcnSpecSheet>
