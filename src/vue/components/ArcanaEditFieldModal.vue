<template>
    <ArcanaDialog
        ref="dialog"
        :title="title"
        :description="description"
        :size="size"
    >
        <!--
            Slot default — caller insere o input específico (ArcanaSelect, SearchField,
            ArcanaInput, etc). O modal é genérico: não sabe nem se importa com qual tipo
            de campo está sendo editado, só fornece o chrome (header/body/footer).
        -->
        <slot />

        <template #footer="{ hide }">
            <ArcanaButton variant="ghost" :class="cancelClass" @click="hide">{{ cancelLabel }}</ArcanaButton>
            <ArcanaButton variant="primary" :class="saveClass" @click="onSave">{{ saveLabel }}</ArcanaButton>
        </template>
    </ArcanaDialog>
</template>

<script lang="ts">
import type { Component, PropType } from "vue"
import ArcanaDialog from "./ArcanaDialog.vue"
import ArcanaButton from "./ArcanaButton.vue"

/**
 * `<ArcanaEditFieldModal>` — wrapper genérico pra modais de "Alterar X" em listas
 * de configurações.
 *
 * Em telas como "Configurações Gerais" muitas linhas têm o padrão "valor + botão
 * Alterar" — clicar no botão abre um modal com o input específico. Em vez de criar
 * 1 arquivo `.vue` por modal (Plano / Depósito / Produto / API Key / etc), esse
 * wrapper recebe o input via slot e cuida do chrome (header, footer, save/cancel).
 *
 * Caller é responsável por:
 * - Bind do v-model do input no estado do parent (alteração reflete antes do save)
 * - Tratar o evento `save` (validar, chamar API, fechar via ref)
 *
 * API ref-based:
 * - `this.$refs.modal.show()` — abre
 * - `this.$refs.modal.hide()` — fecha
 *
 * Props:
 * - `title` — título do modal (header)
 * - `description` — texto descritivo abaixo do título
 * - `cancelLabel` — texto do botão cancelar (default `'Cancelar'`)
 * - `saveLabel` — texto do botão salvar (default `'Salvar Alterações'`)
 *
 * Emite:
 * - `save` — quando o user clica em Salvar. Caller decide o que fazer (validar,
 *   chamar API, fechar modal). Sem auto-close pra dar controle total ao caller.
 *
 * Exemplo:
 *
 *     <ArcanaEditFieldModal
 *         ref="planModal"
 *         title="Alterar Plano"
 *         description="Define funcionalidades habilitadas para a organização."
 *         @save="savePlanChange"
 *     >
 *         <ArcanaSelect
 *             v-model="parameters.subscription_plan"
 *             :options="planOptions"
 *         />
 *     </ArcanaEditFieldModal>
 */
export default {
    name: 'ArcanaEditFieldModal',

    components: { ArcanaDialog, ArcanaButton },

    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        cancelLabel: {
            type: String,
            default: 'Cancelar',
        },
        saveLabel: {
            type: String,
            default: 'Salvar Alterações',
        },
        /**
         * Cor passada ao ArcanaButton do Cancelar. Default `'white'` (estilo ghost
         * cinza). Caller pode passar `'danger-700'` pra Cancelar vermelho, etc.
         */
        cancelColor: {
            type: String,
            default: 'white',
        },
        /**
         * Cor do botão Salvar. Default `'primary-700'` (preto). Caller pode passar
         * `'success-700'` / `'green-600'` pra Salvar verde, etc.
         */
        saveColor: {
            type: String,
            default: 'primary-700',
        },
        /**
         * Classe extra encaminhada ao botão Cancelar. Use junto com `cancelColor`
         * pra variantes visuais — ex: `cancel-class="btn-cancel-outline"` +
         * `cancel-color="danger-700"` rende um Cancelar outline vermelho.
         */
        cancelClass: {
            type: String,
            default: '',
        },
        /**
         * Classe extra encaminhada ao botão Salvar. Espelha `cancelClass`.
         */
        saveClass: {
            type: String,
            default: '',
        },
        /**
         * Largura do modal. Aceita presets `'sm' | 'md' | 'lg' | 'xl'` (470/580/720/880px)
         * ou número arbitrário em px. Default `'md'` (580px) preserva o tamanho original.
         */
        size: {
            type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | number>,
            default: 'md',
        },
    },

    emits: ['save'],

    methods: {
        show() {
            (this.$refs.dialog as any)?.show?.()
        },
        hide() {
            (this.$refs.dialog as any)?.hide?.()
        },
        onSave() {
            // Não fechamos automaticamente — caller pode querer validar/chamar API antes.
            // Após o save, o caller chama `this.$refs.modal.hide()` se tudo deu certo.
            this.$emit('save')
        },
    },
} as Component
</script>
