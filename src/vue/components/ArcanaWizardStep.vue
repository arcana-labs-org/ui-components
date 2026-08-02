<template>
    <div v-if="isActive" class="arcana-wizard-step">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

/**
 * `<ArcanaWizardStep>` — um passo do `<ArcanaWizard>`.
 *
 * Se registra no `wizardApi` (via `inject`, provido pelo `<ArcanaWizard>` pai) no
 * `mounted` — `register({ title, description })` devolve o índice do passo — e se
 * desregistra no `beforeUnmount`. O corpo (slot padrão) só renderiza quando o índice
 * do passo é o ativo (`wizardApi.isActive(index)`); o cabeçalho do stepper (título,
 * indicador, connector) é responsabilidade exclusiva do `<ArcanaWizard>` pai, que lê
 * `title`/`description` a partir do registro.
 *
 * Ver o header do `<ArcanaWizard>` para a ressalva sobre passos estáticos (sem
 * adicionar/remover passos em runtime).
 */
export default defineComponent({
    name: "ArcanaWizardStep",
    inject: ["wizardApi"],
    props: {
        title: { type: String, required: true },
        description: { type: String, default: undefined },
    },
    data() {
        return {
            index: -1,
        }
    },
    computed: {
        isActive(): boolean {
            return (this as any).wizardApi.isActive(this.index)
        },
    },
    mounted() {
        this.index = (this as any).wizardApi.register({ title: this.title, description: this.description })
    },
    beforeUnmount() {
        ;(this as any).wizardApi.unregister(this.index)
    },
})
</script>
