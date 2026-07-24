<template>
    <ArcanaDialog ref="dialog" :size="size" flat-footer>
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
            <ArcanaButton variant="warning" @click="hide"><i class="fa-solid fa-arrow-left"></i> {{ buttonLabel }}</ArcanaButton>
        </template>
    </ArcanaDialog>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import ArcanaDialog from "./ArcanaDialog.vue"
import ArcanaButton from "./ArcanaButton.vue"

/**
 * `<ArcanaRequiredFieldsDialog>` — dialog amber/warning que lista campos obrigatórios
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
 *     <ArcanaRequiredFieldsDialog
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
    name: 'ArcanaRequiredFieldsDialog',

    components: { ArcanaDialog, ArcanaButton },

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
