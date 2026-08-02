<script lang="ts">
  import { ArcanaWizard, ArcanaWizardStep } from "../../src/svelte";

  type Validate = (step: number) => boolean | string | Promise<boolean | string>;

  let {
    step = $bindable(0),
    validate,
    linear = true,
    onFinish,
  }: {
    step?: number;
    validate?: Validate;
    linear?: boolean;
    onFinish?: () => void;
  } = $props();
</script>

<ArcanaWizard value={step} onValueChange={(v) => (step = v)} {validate} {linear} {onFinish}>
  <ArcanaWizardStep title="Type" description="A">
    <div class="c0">zero</div>
  </ArcanaWizardStep>
  <ArcanaWizardStep title="Doc">
    <div class="c1">one</div>
  </ArcanaWizardStep>
  <ArcanaWizardStep title="Confirm">
    <div class="c2">two</div>
  </ArcanaWizardStep>
</ArcanaWizard>
