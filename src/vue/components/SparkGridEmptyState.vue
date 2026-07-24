<template>
    <div class="spark-grid-empty-state">
        <div v-show="!showPanel">
            <slot />
        </div>
        <ShadcnOnboardingPanel
            v-if="showPanel"
            :icon="icon"
            :title="title"
            :description="description"
            :action-label="actionLabel"
            :secondary-action-label="secondaryActionLabel"
            :secondary-action-icon="secondaryActionIcon"
            :sub-hint="subHint"
            @action="$emit('action')"
            @secondary-action="$emit('secondary-action')"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue"
import ShadcnOnboardingPanel from "./ShadcnOnboardingPanel.vue"

export default defineComponent({
    name: "SparkGridEmptyState",
    components: { ShadcnOnboardingPanel },
    emits: ["action", "secondary-action", "panel-visible"],
    props: {
        total: { type: Number, required: true },
        loading: { type: Boolean, required: true },
        filtered: { type: Boolean, required: true },
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        actionLabel: { type: String, required: true },
        secondaryActionLabel: { type: String, default: "" },
        secondaryActionIcon: { type: String, default: "" },
        subHint: { type: String, default: "" },
    },
    setup(props, { emit }) {
        const loaded = ref(false)

        watch(
            () => props.loading,
            (curr, prev) => {
                if (prev === true && curr === false) {
                    loaded.value = true
                }
            }
        )

        const showPanel = computed(() => {
            return loaded.value && !props.loading && props.total === 0 && !props.filtered
        })

        // Notifica o pai quando o painel de onboarding aparece/some — usado pra esconder
        // ações do header e a busca rápida enquanto o estado vazio está em foco.
        watch(showPanel, (visible) => emit("panel-visible", visible), { immediate: true })

        return { showPanel }
    },
})
</script>
