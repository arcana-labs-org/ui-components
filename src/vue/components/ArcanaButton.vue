<template>
    <button
        :type="type"
        class="arcana-button"
        :class="[`arcana-button--${variant}`, { 'is-disabled': disabled }]"
        :disabled="disabled"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
defineOptions({ name: "ArcanaButton" })

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
