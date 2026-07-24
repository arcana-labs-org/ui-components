<template>
    <button
        v-bind="forwardedAttrs"
        :disabled="Boolean(disabled) || Boolean(loading)"
        type="button"
        @click.prevent="emit('click', $event)"
        :class="classes"
    >
        <template v-if="shadcn">
            <i v-if="loading" class="fa-solid fa-spinner fa-spin shadcn-btn__icon"></i>
            <i v-else-if="icon" :class="icon" class="shadcn-btn__icon"></i>
            <span>{{ label }}</span>
        </template>
        <template v-else>
            <b><i :class="loading ? 'fa-solid fa-spinner fa-spin' : icon" style="font-size: 15px;"></i></b>
            {{ label }}
        </template>
    </button>
</template>

<script setup lang="ts">
import {computed, useAttrs} from 'vue'

defineOptions({
    inheritAttrs: false
})

interface Props {
    icon?: string,
    color?: string,
    disabled?: boolean,
    label: string,
    /**
     * Renderiza o botão no padrão visual shadcn (palette neutra zinc, radius 6px, font 13px).
     * Mapeia o `color` legado pra variant semântica:
     * - `danger-*` / `error-*` / `red-*` → variant `destructive` (vermelho sólido)
     * - `danger-outline` (ou qualquer danger/red/error contendo `outline`) → variant
     *   `destructive-outline` (vermelho com borda, fundo transparente)
     * - `grey-*` / `gray-*` / `slate-*` / `white` → variant `ghost` (branco com border)
     * - `teal-*` → variant `teal` (teal sólido)
     * - `success-*` / `green-*` / `emerald-*` → variant `success` (verde sólido)
     * - `blue-*` / `sky-*` / `azure-*` → variant `info` (azul sólido)
     * - `amber-*` / `orange-*` / `yellow-*` → variant `warning` (amber sólido)
     * - `indigo-*` / `violet-*` / `purple-*` → variant `alert` (indigo sólido)
     * - resto → variant `primary` (preto sólido)
     *
     * Sem essa prop o botão segue o estilo legado (Bootstrap `bg-{color}` + `btn-labeled`).
     */
    shadcn?: boolean,
    /**
     * Quando `true`, troca o `icon` por um spinner girando e desabilita o botão.
     * Útil pra ações async — substitui showScreenLoading/hideScreenLoading com
     * feedback localizado no próprio botão.
     */
    loading?: boolean,
    /**
     * (Só no modo `shadcn`) Ancora o ícone à esquerda do botão e centraliza o label no
     * eixo do botão — em vez do padrão ícone+label agrupados à esquerda. Útil em botões
     * `full-width` onde se quer o texto centralizado mas com o ícone no canto.
     */
    centerLabel?: boolean,
    /**
     * (Só no modo `shadcn`) Centraliza ícone + label juntos, como um grupo, no eixo do
     * botão (`justify-content: center`). Diferente de `centerLabel`, que ancora o ícone à
     * esquerda. Mutuamente exclusivos — se ambos forem passados, `centerLabel` prevalece.
     */
    centerContent?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
    color: "info-700",
    disabled: false,
    shadcn: false,
    loading: false,
    icon: "",
    centerLabel: false,
    centerContent: false,
})

const emit = defineEmits(['click'])

const attrs = useAttrs()

const forwardedAttrs = computed(() => {
    const normalized: Record<string, unknown> = {}

    Object.entries(attrs).forEach(([key, value]) => {
        if (key !== 'class') {
            normalized[key] = value
        }
    })

    return normalized
})

/**
 * Mapeia o `color` legado pra variant semântica do shadcn. A intenção é manter a API atual
 * (callers continuam passando `color="danger-700"` ou `"blue-600"`) mas trocar o visual quando
 * `shadcn=true`. Se um caller quiser controle explícito, pode forçar a variant via classe extra.
 *
 * Variants:
 * - `destructive` → ações irreversíveis (excluir, cancelar contrato) — vermelho
 * - `ghost` → ações secundárias (cancelar diálogo, voltar, "alterar dados") — branco com border
 * - `success` → confirmações positivas (salvar, confirmar criação) — verde
 * - `info` → ações informativas / refresh / sincronizar — azul (sky)
 * - `warning` → ações de risco baixo-médio (duplicar, gerar token) — amber
 * - `alert` → ações sensíveis distintas de delete (alterar código, transferir) — indigo
 * - `primary` (default) → ação principal do contexto — preto
 *
 * Importante:
 * - `info-*` continua mapeando pra `primary` (preto) porque é o default histórico usado em todo
 *   o sistema. Pra ativar a variant `info` (azul), passe `color="blue-*"`, `color="sky-*"` ou
 *   `color="azure-*"`.
 * - Review F1: `white`, `amber-*` e `indigo-*` eram usados em `OrganisationDangerZoneTab` (e
 *   modais de edição com botão "Cancelar" branco) e caíam silenciosamente no fallback `primary`,
 *   pintando os botões de preto. Agora têm mapping explícito.
 */
const shadcnVariant = computed(() => {
    const c = String(props.color ?? '').toLowerCase()
    const isDanger = c.startsWith('danger') || c.startsWith('error') || c.startsWith('red')
    if (isDanger && c.includes('outline')) return 'destructive-outline'
    if (isDanger) return 'destructive'
    if (c === 'white' || c.startsWith('grey') || c.startsWith('gray') || c.startsWith('slate')) return 'ghost'
    if (c.startsWith('teal')) return 'teal'
    if (c.startsWith('success') || c.startsWith('green') || c.startsWith('emerald')) return 'success'
    if (c.startsWith('blue') || c.startsWith('sky') || c.startsWith('azure')) return 'info'
    if (c.startsWith('amber') || c.startsWith('orange') || c.startsWith('yellow')) return 'warning'
    if (c.startsWith('indigo') || c.startsWith('violet') || c.startsWith('purple')) return 'alert'
    return 'primary'
})

const classes = computed(() => {
    const list: string[] = []

    if (props.shadcn) {
        list.push('shadcn-btn', `shadcn-btn--${shadcnVariant.value}`)
        if (props.centerLabel) list.push('shadcn-btn--center-label')
        else if (props.centerContent) list.push('shadcn-btn--center-content')
    } else {
        // Padrão legado: Bootstrap-style classes (`bg-{color}` + `btn-labeled`).
        list.push('btn', `bg-${props.color}`, 'btn-labeled')
    }

    if (attrs['class'] && typeof attrs['class'] == "string") {
        list.push(attrs['class'])
    }

    return list.join(" ");
})
</script>

<!--
    Estilos shadcn-style são GLOBAIS (sem `scoped`) porque:
    1. O LabeledButton é o componente base; wrappers (CancelButton, SaveButton, etc) renderizam
       o LabeledButton internamente — se os estilos fossem scoped, o `data-v-*` do LabeledButton
       não casaria com o do wrapper, e a classe `shadcn-btn` ficaria sem estilo.
    2. Estilos padrão do projeto (`btn bg-{color}`) também são globais (vêm do CSS framework).
    Mantemos paridade visual com `ConfirmDialog.vue` (que define os mesmos tokens shadcn).
-->
