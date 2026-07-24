<template>
    <div class="shadcn-accordion-item" :class="{ open: isOpen, disabled }">
        <button type="button" class="shadcn-accordion-trigger" :disabled="disabled" @click="onToggle">
            <span class="shadcn-accordion-title">
                <slot name="title">{{ title }}</slot>
            </span>
            <i class="fa-solid fa-chevron-down shadcn-accordion-chevron"></i>
        </button>
        <div v-show="isOpen" class="shadcn-accordion-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "ShadcnAccordionItem",
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
