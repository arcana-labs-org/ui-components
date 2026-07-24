<template>
    <button
        :type="type"
        class="shadcn-button"
        :class="[`shadcn-button--${variant}`, { 'is-disabled': disabled }]"
        :disabled="disabled"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
defineOptions({ name: "ShadcnButton" })

withDefaults(defineProps<{
    variant?: "primary" | "outline" | "outline-danger" | "ghost" | "danger" | "destructive" | "destructive-outline" | "success" | "secondary" | "dark" | "indigo" | "alert" | "info" | "warning" | "teal"
    type?: "button" | "submit"
    disabled?: boolean
}>(), {
    variant: "primary",
    type: "button",
    disabled: false,
})

const emit = defineEmits<{ (e: "click", ev: MouseEvent): void }>()

function onClick(ev: MouseEvent) {
    emit("click", ev)
}
</script>

<style scoped>
/*
 * Geometria/tipografia espelham EXATAMENTE o `.shadcn-btn` do LabeledButton (shadcn prop) —
 * mesmo tamanho/peso/radius/focus, pra que os dois componentes sejam visualmente
 * intercambiáveis (font 13px / weight 500 / padding 9px 16px / radius 6px / focus ring zinc).
 */
.shadcn-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 16px;
    border-radius: 6px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease, opacity 150ms ease;
    outline: none;
    border: 1px solid transparent;
    white-space: nowrap;
}

.shadcn-button:focus-visible {
    outline: 2px solid #18181b;
    outline-offset: 2px;
}

.shadcn-button.is-disabled, .shadcn-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/*
 * Paleta espelha EXATAMENTE as variantes shadcn do LabeledButton (`.shadcn-btn--*`).
 * Nomes legados do ShadcnButton viram aliases do semântico equivalente:
 * - primary/dark → primary preto · danger/destructive → vermelho sólido
 * - outline-danger/destructive-outline → vermelho outline · indigo/alert → indigo sólido
 * - outline → outline cinza neutro (back-outline) · ghost → zinc-500 preenchido
 * `secondary` é o único sem par no LabeledButton (mantido cinza claro).
 */

/* primary / dark — preto sólido */
.shadcn-button--primary,
.shadcn-button--dark {
    background: #18181b;
    color: #ffffff;
}
.shadcn-button--primary:hover:not(:disabled),
.shadcn-button--dark:hover:not(:disabled) { background: #27272a; }
.shadcn-button--primary:active:not(:disabled),
.shadcn-button--dark:active:not(:disabled) { background: #09090b; }

/* danger / destructive — vermelho sólido */
.shadcn-button--danger,
.shadcn-button--destructive {
    background: #dc2626;
    color: #ffffff;
}
.shadcn-button--danger:hover:not(:disabled),
.shadcn-button--destructive:hover:not(:disabled) { background: #b91c1c; }
.shadcn-button--danger:active:not(:disabled),
.shadcn-button--destructive:active:not(:disabled) { background: #991b1b; }

/* outline-danger / destructive-outline — vermelho com borda, fundo transparente */
.shadcn-button--outline-danger,
.shadcn-button--destructive-outline {
    background: transparent;
    color: #dc2626;
    border-color: #dc2626;
}
.shadcn-button--outline-danger:hover:not(:disabled),
.shadcn-button--destructive-outline:hover:not(:disabled) {
    background: #fef2f2;
    border-color: #b91c1c;
    color: #b91c1c;
}
.shadcn-button--outline-danger:active:not(:disabled),
.shadcn-button--destructive-outline:active:not(:disabled) {
    background: #fee2e2;
    border-color: #991b1b;
    color: #991b1b;
}

/* outline — cinza neutro com borda (back-outline) */
.shadcn-button--outline {
    background: transparent;
    color: #52525b;
    border-color: #d4d4d8;
}
.shadcn-button--outline:hover:not(:disabled) {
    background: #f4f4f5;
    color: #27272a;
    border-color: #a1a1aa;
}
.shadcn-button--outline:active:not(:disabled) {
    background: #e4e4e7;
    color: #18181b;
    border-color: #71717a;
}

/* ghost — zinc-500 preenchido, texto branco */
.shadcn-button--ghost {
    background: #71717a;
    color: #ffffff;
    border-color: #71717a;
}
.shadcn-button--ghost:hover:not(:disabled) { background: #52525b; border-color: #52525b; }
.shadcn-button--ghost:active:not(:disabled) { background: #3f3f46; border-color: #3f3f46; }

/* success — verde sólido */
.shadcn-button--success {
    background: #16a34a;
    color: #ffffff;
}
.shadcn-button--success:hover:not(:disabled) { background: #15803d; }
.shadcn-button--success:active:not(:disabled) { background: #166534; }

/* teal — teal sólido (teal-700) */
.shadcn-button--teal {
    background: #0f766e;
    color: #ffffff;
}
.shadcn-button--teal:hover:not(:disabled) { background: #115e59; }
.shadcn-button--teal:active:not(:disabled) { background: #134e4a; }

/* info — azul claro sólido (sky-500) */
.shadcn-button--info {
    background: #0ea5e9;
    color: #ffffff;
}
.shadcn-button--info:hover:not(:disabled) { background: #0284c7; }
.shadcn-button--info:active:not(:disabled) { background: #0369a1; }

/* warning — amber sólido */
.shadcn-button--warning {
    background: #f59e0b;
    color: #ffffff;
}
.shadcn-button--warning:hover:not(:disabled) { background: #d97706; }
.shadcn-button--warning:active:not(:disabled) { background: #b45309; }

/* indigo / alert — indigo sólido (indigo-600) */
.shadcn-button--indigo,
.shadcn-button--alert {
    background: #4f46e5;
    color: #ffffff;
}
.shadcn-button--indigo:hover:not(:disabled),
.shadcn-button--alert:hover:not(:disabled) { background: #4338ca; }
.shadcn-button--indigo:active:not(:disabled),
.shadcn-button--alert:active:not(:disabled) { background: #3730a3; }

/* secondary — cinza claro (sem par no LabeledButton) */
.shadcn-button--secondary {
    background: #e4e4e7;
    color: #18181b;
}
.shadcn-button--secondary:hover:not(:disabled) { background: #d4d4d8; }
</style>
