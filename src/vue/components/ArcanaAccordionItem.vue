<template>
    <div class="arcana-accordion-item" :class="{ open: isOpen, disabled }">
        <button type="button" class="arcana-accordion-trigger" :disabled="disabled" @click="onToggle">
            <span class="arcana-accordion-title">
                <slot name="title">{{ title }}</slot>
            </span>
            <i class="fa-solid fa-chevron-down arcana-accordion-chevron"></i>
        </button>
        <div v-show="isOpen" class="arcana-accordion-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "ArcanaAccordionItem",
    inject: ["accordionApi"],
    props: {
        name: { type: String, required: true },
        title: { type: String, default: "" },
        disabled: { type: Boolean, default: false },
    },
    computed: {
        isOpen(): boolean {
            return (this as any).accordionApi.isOpen(this.name)
        },
    },
    methods: {
        onToggle() {
            if (this.disabled) return
            ;(this as any).accordionApi.toggle(this.name)
        },
    },
})
</script>
