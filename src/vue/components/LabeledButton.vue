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
<style>
.shadcn-btn {
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    padding: 9px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease, opacity 150ms ease;
    outline: none;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid transparent;
}

.shadcn-btn:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 2px;
}

.shadcn-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/*
 * IMPORTANTE: o seletor descendente `.shadcn-btn .shadcn-btn__icon` (especificidade 0,0,2,0)
 * sobrescreve o `[class^="icon-"]` do IcoMoon (especificidade 0,0,1,0) — sem isso, ícones
 * `icon-plus2`/`icon-cross2`/`icon-sync` etc. herdam `font-size: 16px` + `min-width: 1em`
 * + `top: -1px` do CSS global do IcoMoon, ficando visivelmente maiores que ícones FontAwesome
 * dentro do mesmo botão shadcn.
 */
.shadcn-btn .shadcn-btn__icon {
    font-size: 13px;
    line-height: 1;
    flex-shrink: 0;
    min-width: 0;
    top: 0;
    vertical-align: baseline;
}

/* Modifier: center-label — ícone ancorado à esquerda (absoluto), label centralizado no
   eixo do botão. O padding lateral simétrico garante que o texto fique visualmente no
   centro sem colidir com o ícone. */
.shadcn-btn--center-label {
    position: relative;
    justify-content: center;
    padding-left: 34px;
    padding-right: 34px;
}
.shadcn-btn--center-label .shadcn-btn__icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
}

/* Modifier: center-content — ícone + label centralizados juntos, como um grupo. */
.shadcn-btn--center-content {
    justify-content: center;
}

/* Variant: primary (default) — preto sólido */
.shadcn-btn--primary {
    background-color: #18181b;
    color: #ffffff;
}
.shadcn-btn--primary:hover:not(:disabled) { background-color: #27272a; }
.shadcn-btn--primary:active:not(:disabled) { background-color: #09090b; }

/* Variant: destructive — vermelho */
.shadcn-btn--destructive {
    background-color: #dc2626;
    color: #ffffff;
}
.shadcn-btn--destructive:hover:not(:disabled) { background-color: #b91c1c; }
.shadcn-btn--destructive:active:not(:disabled) { background-color: #991b1b; }

/* Variant: destructive-outline — vermelho com borda, fundo transparente (ação destrutiva secundária) */
.shadcn-btn--destructive-outline {
    background-color: transparent;
    color: #dc2626;
    border-color: #dc2626;
}
.shadcn-btn--destructive-outline:hover:not(:disabled) {
    background-color: #fef2f2;
    border-color: #b91c1c;
    color: #b91c1c;
}
.shadcn-btn--destructive-outline:active:not(:disabled) {
    background-color: #fee2e2;
    border-color: #991b1b;
    color: #991b1b;
}

/* Variant: ghost — outline sutil (white com border) */
/* Variant: ghost — cinza escuro preenchido (zinc-500), texto branco. Usado por Cancelar/Voltar
   como secundária com peso visual real, contrastando claramente com o primary preto ao lado. */
.shadcn-btn--ghost {
    background-color: #71717a;
    color: #ffffff;
    border-color: #71717a;
}
.shadcn-btn--ghost:hover:not(:disabled) {
    background-color: #52525b;
    border-color: #52525b;
}
.shadcn-btn--ghost:active:not(:disabled) {
    background-color: #3f3f46;
    border-color: #3f3f46;
}

/* Variant: success — verde sólido */
.shadcn-btn--success {
    background-color: #16a34a;
    color: #ffffff;
}
.shadcn-btn--success:hover:not(:disabled) { background-color: #15803d; }
.shadcn-btn--success:active:not(:disabled) { background-color: #166534; }

/* Variant: teal — teal sólido (teal-700) */
.shadcn-btn--teal {
    background-color: #0f766e;
    color: #ffffff;
}
.shadcn-btn--teal:hover:not(:disabled) { background-color: #115e59; }
.shadcn-btn--teal:active:not(:disabled) { background-color: #134e4a; }

/* Variant: info — azul claro sólido (sky-500) */
.shadcn-btn--info {
    background-color: #0ea5e9;
    color: #ffffff;
}
.shadcn-btn--info:hover:not(:disabled) { background-color: #0284c7; }
.shadcn-btn--info:active:not(:disabled) { background-color: #0369a1; }

/* Variant: warning — amber sólido (amber-500). Pareado com cards `--warning` da DangerZone
   (icon bg #fef3c7 amber-100, icon color #b45309 amber-700). Usado em ações de risco
   baixo-médio (duplicar, gerar token novo) — sinal amarelo, não vermelho. */
.shadcn-btn--warning {
    background-color: #f59e0b;
    color: #ffffff;
}
.shadcn-btn--warning:hover:not(:disabled) { background-color: #d97706; }
.shadcn-btn--warning:active:not(:disabled) { background-color: #b45309; }

/* Variant: alert — indigo sólido (indigo-600). Pareado com cards `--alert` da DangerZone
   (icon bg #e0e7ff indigo-100, icon color #4338ca indigo-700). Usado em ações sensíveis
   distintas de delete (alterar código, transferir) — pesa mais que `info` mas menos que
   `destructive`. */
.shadcn-btn--alert {
    background-color: #4f46e5;
    color: #ffffff;
}
.shadcn-btn--alert:hover:not(:disabled) { background-color: #4338ca; }
.shadcn-btn--alert:active:not(:disabled) { background-color: #3730a3; }

/* Modifier: cancel-outline — outline vermelho. Aplicado em conjunto com `color="danger-*"`
   pra Cancelar de diálogos: filled vermelho é forte demais pra ação secundária, mas a cor
   ainda sinaliza "saída/abandono". Override do `--destructive` filled.
   Antes ficava redefinido localmente em cada dialog (~10 arquivos com SCSS duplicado);
   agora centralizado aqui. */
.shadcn-btn.btn-cancel-outline {
    background-color: transparent;
    color: #dc2626;
    border-color: #dc2626;
}
.shadcn-btn.btn-cancel-outline:hover:not(:disabled) {
    background-color: #fef2f2; color: #b91c1c; border-color: #b91c1c;
}
.shadcn-btn.btn-cancel-outline:active:not(:disabled) {
    background-color: #fee2e2; color: #991b1b; border-color: #991b1b;
}

/* Modifier: back-outline — outline cinza neutro. Aplicado em conjunto com `color="grey-*"` pra
   "Voltar" / navegação secundária quando o ghost filled (zinc-500 sólido) pesa visualmente demais
   ao lado de um Cancelar outlined. Override do `--ghost` filled. */
.shadcn-btn.btn-back-outline {
    background-color: transparent;
    color: #52525b;
    border-color: #d4d4d8;
}
.shadcn-btn.btn-back-outline:hover:not(:disabled) {
    background-color: #f4f4f5; color: #27272a; border-color: #a1a1aa;
}
.shadcn-btn.btn-back-outline:active:not(:disabled) {
    background-color: #e4e4e7; color: #18181b; border-color: #71717a;
}
</style>
