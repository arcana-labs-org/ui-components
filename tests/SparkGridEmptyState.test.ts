import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SparkGridEmptyState from "../src/vue/components/SparkGridEmptyState.vue"

describe("SparkGridEmptyState", () => {
    const baseProps = {
        total: 0,
        loading: false,
        filtered: false,
        icon: "fa-solid fa-cube",
        title: "Cadastre seu primeiro item",
        actionLabel: "Novo Item",
    }

    it("mostra o slot (grid) quando total > 0", async () => {
        const w = mount(SparkGridEmptyState, {
            props: { ...baseProps, total: 5, loading: true },
            slots: { default: '<div class="grid-mock">Grid</div>' },
        })
        // Simula ciclo loaded (loading true → false)
        await w.setProps({ loading: false })

        expect(w.find(".grid-mock").isVisible()).toBe(true)
        expect(w.find(".shadcn-onboarding").exists()).toBe(false)
    })

    it("mostra o painel de onboarding quando vazio e não filtrado (após loaded)", async () => {
        const w = mount(SparkGridEmptyState, {
            props: { ...baseProps, total: 0, loading: true, filtered: false },
            slots: { default: '<div class="grid-mock">Grid</div>' },
        })
        // Antes de loaded, não mostra painel
        expect(w.find(".shadcn-onboarding").exists()).toBe(false)

        // Simula fim do loading (loaded = true)
        await w.setProps({ loading: false })

        expect(w.find(".shadcn-onboarding").exists()).toBe(true)
        // O slot (grid) fica escondido via `v-show` no wrapper. `isVisible()` do
        // @vue/test-utils não percorre ancestrais sob happy-dom, então checamos o
        // `display: none` do wrapper diretamente.
        const wrapper = w.find(".grid-mock").element.parentElement as HTMLElement
        expect(wrapper.style.display).toBe("none")
    })

    it("mostra o slot (grid) quando total=0 mas filtered=true", async () => {
        const w = mount(SparkGridEmptyState, {
            props: { ...baseProps, total: 0, loading: true, filtered: true },
            slots: { default: '<div class="grid-mock">Grid</div>' },
        })
        await w.setProps({ loading: false })

        expect(w.find(".grid-mock").isVisible()).toBe(true)
        expect(w.find(".shadcn-onboarding").exists()).toBe(false)
    })

    it("emite @action quando clica na CTA do painel", async () => {
        const w = mount(SparkGridEmptyState, {
            props: { ...baseProps, total: 0, loading: true, filtered: false },
            slots: { default: '<div class="grid-mock">Grid</div>' },
        })
        await w.setProps({ loading: false })

        await w.find(".shadcn-onboarding__cta").trigger("click")

        expect(w.emitted("action")).toHaveLength(1)
    })
})
