<template>
    <div class="arcana-accordion">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"

export default defineComponent({
    name: "ArcanaAccordion",
    props: {
        modelValue: { type: [String, Array, null] as PropType<string | string[] | null>, default: null },
        accordion: { type: Boolean, default: true },
    },
    emits: ["update:modelValue"],
    provide() {
        return {
            accordionApi: {
                isOpen: (name: string) => this.isOpen(name),
                toggle: (name: string) => this.toggle(name),
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
