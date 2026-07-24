<template>
    <ShadcnDialog ref="dialog" :size="size" flat-footer>
        <template #header>
            <div class="rf-header">
                <div class="rf-header__icon">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="rf-header__text">
                    <h2 class="rf-header__title">{{ title }}</h2>
                    <p class="rf-header__desc">{{ description }}</p>
                </div>
            </div>
        </template>

        <div class="rf-list">
            <div v-for="field in fields" :key="field.key" class="rf-item">
                <div class="rf-item__icon">
                    <i class="fa-solid fa-circle-exclamation"></i>
                </div>
                <div class="rf-item__body">
                    <div class="rf-item__label">{{ field.label }}</div>
                    <div class="rf-item__hint">{{ field.hint }}</div>
                </div>
            </div>
        </div>

        <template #footer="{ hide }">
            <LabeledButton
                :label="buttonLabel"
                icon="fa-solid fa-arrow-left"
                color="amber-600"
                shadcn
                @click="hide"
            />
        </template>
    </ShadcnDialog>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import ShadcnDialog from "./ShadcnDialog.vue"
import LabeledButton from "./LabeledButton.vue"

/**
 * `<ShadcnRequiredFieldsDialog>` — dialog amber/warning que lista campos obrigatórios
 * pendentes em formulários multi-step (wizards) ou validações batch.
 *
 * Substitui o padrão antigo de mostrar `Alert.info` um campo por vez — visualmente
 * mais claro e dá pro usuário ver tudo que falta de uma vez.
 *
 * API:
 * - `title` — título do header (default: "Faltam campos obrigatórios")
 * - `description` — texto sob o título (default genérico; passe contexto, ex:
 *   "antes de criar o cliente")
 * - `fields` — array de `{ key, label, hint }`. `hint` orienta o usuário em qual
 *   passo/seção corrigir.
 * - `buttonLabel` — label do botão de fechar (default: "Voltar e corrigir")
 * - `size` — width do dialog (default 560px)
 *
 * Como usar:
 * ──────────
 *     <ShadcnRequiredFieldsDialog
 *         ref="requiredFieldsDialog"
 *         description="Os campos abaixo precisam ser preenchidos antes de criar o veículo."
 *         :fields="missingRequiredFields"
 *     />
 *
 *     // pra abrir:
 *     this.$refs.requiredFieldsDialog.show()
 *
 *     // computed que filtra a lista:
 *     missingRequiredFields() {
 *         return REQUIRED_FIELDS.filter(f => !f.check(this.form))
 *     }
 */
interface RequiredField {
    key: string
    label: string
    hint: string
}

export default {
    name: 'ShadcnRequiredFieldsDialog',

    components: { ShadcnDialog, LabeledButton },

    props: {
        title: {
            type: String,
            default: 'Faltam campos obrigatórios',
        },
        description: {
            type: String,
            default: 'Os campos abaixo precisam ser preenchidos antes de continuar.',
        },
        fields: {
            type: Array as PropType<RequiredField[]>,
            default: () => [],
        },
        buttonLabel: {
            type: String,
            default: 'Voltar e corrigir',
        },
        size: {
            type: [Number, String],
            default: 560,
        },
    },

    methods: {
        show() {
            (this.$refs.dialog as any).show()
        },
        hide() {
            (this.$refs.dialog as any).hide()
        },
    },
} as Component
</script>

<style scoped lang="scss">
.rf-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
}
.rf-header__icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(180deg, #fef3c7 0%, #fde68a 100%);
    color: #b45309;
    font-size: 22px;
    border: 1px solid rgba(245, 158, 11, 0.35);
    box-shadow: 0 6px 14px -10px rgba(245, 158, 11, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
.rf-header__text {
    flex: 1;
    min-width: 0;
    padding-top: 2px;
}
.rf-header__title {
    font-size: 17px;
    font-weight: 600;
    color: #09090b;
    margin: 0 0 4px;
    letter-spacing: -0.015em;
}
.rf-header__desc {
    font-size: 13px;
    color: #71717a;
    margin: 0;
    line-height: 1.5;
}

.rf-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.rf-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid #fde68a;
    border-radius: 10px;
    background:
        radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.07) 0%, transparent 60%),
        #fffbeb;
}
.rf-item__icon {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #b45309;
    font-size: 13px;
}
.rf-item__body { flex: 1; min-width: 0; }
.rf-item__label {
    font-size: 13.5px;
    font-weight: 600;
    color: #78350f;
    letter-spacing: -0.005em;
}
.rf-item__hint {
    font-size: 12px;
    color: #92400e;
    margin-top: 2px;
    line-height: 1.45;
    opacity: 0.88;
}
</style>
