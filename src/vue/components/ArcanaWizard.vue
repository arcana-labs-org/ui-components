<template>
    <div class="arcana-wizard">
        <div class="arcana-wizard__stepper">
            <template v-for="(s, idx) in activeSteps" :key="s.originalIndex">
                <div
                    class="arcana-wizard__step"
                    :class="stepClasses(s.originalIndex)"
                    @click="goToStepIfAllowed(s.originalIndex)"
                >
                    <div class="arcana-wizard__indicator">
                        <svg
                            v-if="isCompleted(s.originalIndex)"
                            class="arcana-wizard__check"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <template v-else>{{ s.originalIndex + 1 }}</template>
                    </div>
                    <div class="arcana-wizard__label">
                        <div class="arcana-wizard__title">{{ s.title }}</div>
                        <div v-if="s.description" class="arcana-wizard__description">{{ s.description }}</div>
                    </div>
                </div>
                <div
                    v-if="idx < activeSteps.length - 1"
                    class="arcana-wizard__connector"
                    :class="{ 'is-completed': s.originalIndex < modelValue }"
                />
            </template>
            <div v-if="$slots['header-actions']" class="arcana-wizard__header-actions">
                <slot name="header-actions" />
            </div>
        </div>

        <div class="arcana-wizard__body">
            <slot />
        </div>

        <div class="arcana-wizard__footer">
            <div class="arcana-wizard__footer-text">{{ footerText }}</div>
            <div class="arcana-wizard__footer-actions">
                <slot
                    name="footer"
                    :step="modelValue"
                    :total="totalSteps"
                    :is-first="isFirst"
                    :is-last="isLast"
                    :back="goBack"
                    :next="handleNext"
                    :finish="emitFinish"
                    :cancel="emitCancel"
                >
                    <button
                        v-if="cancellable"
                        type="button"
                        class="arcana-wizard__btn arcana-wizard__btn--default"
                        @click="emitCancel"
                    >
                        {{ cancelLabel }}
                    </button>
                    <button
                        v-if="modelValue > 0"
                        type="button"
                        class="arcana-wizard__btn arcana-wizard__btn--default"
                        @click="goBack"
                    >
                        {{ backLabel }}
                    </button>
                    <button
                        v-if="!isLast"
                        type="button"
                        class="arcana-wizard__btn arcana-wizard__btn--primary"
                        @click="handleNext"
                    >
                        {{ continueLabel }}
                    </button>
                    <button
                        v-else
                        type="button"
                        class="arcana-wizard__btn arcana-wizard__btn--primary"
                        :disabled="finalDisabled"
                        @click="emitFinish"
                    >
                        {{ finalLabel }}
                    </button>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"

import { canNavigateTo, clampStep, formatStepLabel, stepStatus } from "../../core/wizard"

type WizardStepMeta = { title: string; description?: string }
type WizardValidate = (step: number) => boolean | string | Promise<boolean | string>

/**
 * `<ArcanaWizard>` — shell de passos (stepper + corpo + rodapé), pai do
 * `<ArcanaWizardStep>`. Fonte da verdade da anatomia/API que os ports (React,
 * Angular, Svelte) replicam — ver `src/styles/parts/wizard.scss` pro CSS
 * compartilhado (classes exatas usadas aqui).
 *
 * Anatomia (ver `wizard.scss` pro detalhe visual de cada bloco):
 *   .arcana-wizard
 *     .arcana-wizard__stepper
 *       .arcana-wizard__step (.is-active|.is-completed|.is-pending, +.is-clickable)
 *         .arcana-wizard__indicator (número OU .arcana-wizard__check quando concluído)
 *         .arcana-wizard__label > .arcana-wizard__title + .arcana-wizard__description
 *       .arcana-wizard__connector (+.is-completed entre passos já concluídos)
 *       .arcana-wizard__header-actions (slot `header-actions`)
 *     .arcana-wizard__body — os `<ArcanaWizardStep>` do slot padrão se auto-renderizam
 *       aqui, só o passo ativo (ver `<ArcanaWizardStep>`)
 *     .arcana-wizard__footer
 *       .arcana-wizard__footer-text — "Passo {current} de {total}" (`stepLabel`)
 *       .arcana-wizard__footer-actions — slot `footer` (com scope) ou os botões default
 *         (Cancel/Back/Continue/Finish), classes `.arcana-wizard__btn` +
 *         `--primary` (Continue/Finish) ou `--default` (Back/Cancel). Botões crus
 *         (`<button>`), não `<ArcanaButton>` — mantém a lib de testes de paridade
 *         entre frameworks livre de dependência cruzada.
 *
 * Contrato compartilhado com `<ArcanaWizardStep>` (injeção `wizardApi`, provida
 * aqui): `register({ title, description }) => index`, `unregister(index)`,
 * `isActive(index)`, `current()`. Os filhos se registram no `mounted` e se
 * desregistram no `beforeUnmount`.
 *
 * Passos estáticos apenas: os índices são a ordem de `register()` (= ordem de
 * declaração no template, para passos declarados estaticamente). `unregister`
 * NÃO reindexa a lista — só marca a posição como "tombstone" (`null`), pra que
 * os índices já entregues a outros passos continuem válidos. A renderização do
 * cabeçalho (`activeSteps`) filtra os tombstones. Adicionar/remover passos em
 * runtime (`v-if` num `<ArcanaWizardStep>` no meio da lista, por exemplo) está
 * fora do escopo — o comportamento nesse caso não é garantido.
 *
 * Contrato de `validate(step)`: chamado (com `await`) antes de avançar via
 * Continue. Retorno `false` ou uma `string` BLOQUEIA o avanço — a string não é
 * exibida automaticamente (sem toast embutido); cabe ao consumidor tratar o
 * retorno se quiser mostrá-la. `true`/`undefined` (ou promise resolvida assim)
 * libera o avanço, emite `next` e atualiza `modelValue`. No último passo, o
 * botão vira "Finish" e emite `finish` (sem chamar `validate`).
 */
export default defineComponent({
    name: "ArcanaWizard",
    props: {
        modelValue: { type: Number, default: 0 },
        validate: { type: Function as PropType<WizardValidate>, default: undefined },
        linear: { type: Boolean, default: true },
        cancellable: { type: Boolean, default: false },
        continueLabel: { type: String, default: "Continue" },
        backLabel: { type: String, default: "Back" },
        cancelLabel: { type: String, default: "Cancel" },
        finalLabel: { type: String, default: "Finish" },
        finalDisabled: { type: Boolean, default: false },
        stepLabel: { type: String, default: "Step {current} of {total}" },
    },
    emits: ["update:modelValue", "next", "back", "cancel", "finish"],
    provide() {
        return {
            wizardApi: {
                register: (step: WizardStepMeta) => {
                    this.steps.push(step)
                    return this.steps.length - 1
                },
                unregister: (index: number) => {
                    if (index >= 0 && index < this.steps.length) this.steps[index] = null
                },
                isActive: (index: number) => index === this.modelValue,
                current: () => this.modelValue,
            },
        }
    },
    data() {
        return {
            // Tombstone-on-unregister: posições desregistradas viram `null` em vez de
            // serem removidas, pra não deslocar os índices já entregues aos passos
            // que continuam montados. Ver nota de anatomia acima.
            steps: [] as Array<WizardStepMeta | null>,
        }
    },
    computed: {
        activeSteps(): Array<WizardStepMeta & { originalIndex: number }> {
            const out: Array<WizardStepMeta & { originalIndex: number }> = []
            this.steps.forEach((step, originalIndex) => {
                if (step) out.push({ ...step, originalIndex })
            })
            return out
        },
        totalSteps(): number {
            return this.activeSteps.length
        },
        isLast(): boolean {
            // `totalSteps === 0` acontece por um instante entre o primeiro render do
            // shell e o `mounted` dos `<ArcanaWizardStep>` (registro é assíncrono —
            // ver nota de anatomia). Sem essa guarda, `0 >= -1` faria o rodapé mostrar
            // "Finish" antes do primeiro passo existir.
            return this.totalSteps > 0 && this.modelValue >= this.totalSteps - 1
        },
        isFirst(): boolean {
            return this.modelValue <= 0
        },
        footerText(): string {
            return formatStepLabel(this.stepLabel, this.modelValue, this.totalSteps)
        },
    },
    methods: {
        isCompleted(i: number): boolean {
            return stepStatus(i, this.modelValue) === "completed"
        },
        stepClasses(i: number) {
            return [`is-${stepStatus(i, this.modelValue)}`, { "is-clickable": canNavigateTo(i, this.modelValue, this.linear) }]
        },
        goToStep(step: number) {
            const s = clampStep(step, this.totalSteps)
            this.$emit("update:modelValue", s)
        },
        goToStepIfAllowed(i: number) {
            if (canNavigateTo(i, this.modelValue, this.linear)) this.goToStep(i)
        },
        goBack() {
            this.$emit("back", this.modelValue)
            this.goToStep(this.modelValue - 1)
        },
        async handleNext() {
            if (this.validate) {
                const result = await this.validate(this.modelValue)
                if (result === false || typeof result === "string") return
            }
            this.$emit("next", this.modelValue)
            this.goToStep(this.modelValue + 1)
        },
        emitFinish() {
            this.$emit("finish")
        },
        emitCancel() {
            this.$emit("cancel")
        },
    },
})
</script>
