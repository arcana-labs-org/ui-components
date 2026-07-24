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

<style scoped>
.shadcn-accordion-item { border: 1px solid #e4e4e7; border-radius: 8px; background: #fff; overflow: hidden; }
.shadcn-accordion-trigger {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; background: #fafafa; border: 0; cursor: pointer;
    font-weight: 600; color: #18181b; font-size: 14px; text-align: left;
}
.shadcn-accordion-trigger:hover:not(:disabled) { background: #f4f4f5; }
.shadcn-accordion-trigger:disabled { cursor: not-allowed; opacity: .6; }
.shadcn-accordion-chevron { transition: transform .2s ease; color: #71717a; }
.shadcn-accordion-item.open .shadcn-accordion-chevron { transform: rotate(180deg); }
.shadcn-accordion-content { padding: 16px; border-top: 1px solid #e4e4e7; }
</style>
