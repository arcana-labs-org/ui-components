<template>
    <div class="arcana-accordion">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"

/**
 * `<ArcanaAccordion>` — container dos itens colapsáveis.
 *
 * Compartilha estado com os `<ArcanaAccordionItem>` via `provide`/`inject`
 * (`accordionApi`): quem está aberto (`isOpen`), como alternar (`toggle`) e se o
 * expandir/recolher é animado (`animated`).
 *
 * Props:
 * - `modelValue` (v-model) — `string | string[] | null`: item(ns) aberto(s)
 * - `accordion` — `true` (default): só um item aberto por vez; `false`: múltiplos (array)
 * - `animated` — `false` (default): abre/fecha instantâneo (comportamento histórico).
 *   `true`: transição de altura (0 → altura real medida) + fade, ~200ms.
 *   Cada `<ArcanaAccordionItem>` também aceita `animated`; quando informada no item,
 *   ela tem **precedência** sobre a do container (permite um item animado dentro de um
 *   accordion estático e vice-versa). Respeita `prefers-reduced-motion: reduce`
 *   (sem animação nesse caso).
 */
export default defineComponent({
    name: "ArcanaAccordion",
    props: {
        modelValue: { type: [String, Array, null] as PropType<string | string[] | null>, default: null },
        accordion: { type: Boolean, default: true },
        animated: { type: Boolean, default: false },
    },
    emits: ["update:modelValue"],
    provide() {
        return {
            accordionApi: {
                isOpen: (name: string) => this.isOpen(name),
                toggle: (name: string) => this.toggle(name),
                // Closure (e não valor cru) pra preservar a reatividade no item.
                animated: () => this.animated,
            },
        }
    },
    methods: {
        isOpen(name: string): boolean {
            const v = this.modelValue
            if (Array.isArray(v)) return v.includes(name)
            return v === name
        },
        toggle(name: string) {
            if (this.accordion) {
                this.$emit("update:modelValue", this.modelValue === name ? null : name)
                return
            }
            const current = Array.isArray(this.modelValue) ? [...this.modelValue] : []
            const idx = current.indexOf(name)
            if (idx >= 0) current.splice(idx, 1)
            else current.push(name)
            this.$emit("update:modelValue", current)
        },
    },
})
</script>
