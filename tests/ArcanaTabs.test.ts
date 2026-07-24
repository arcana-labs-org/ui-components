import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import ArcanaTabs from "../src/vue/components/ArcanaTabs.vue"

/**
 * Modo `keepAlive` LAZY: o panel de uma aba só monta na 1ª visita (lazy) e depois fica montado,
 * alternando via v-show (keep-alive — sem refetch/perda de estado ao voltar).
 */
describe("ArcanaTabs — keepAlive lazy", () => {
    const tabs = [
        { name: "a", label: "A" },
        { name: "b", label: "B" },
    ]

    const mountTabs = (modelValue: string) =>
        mount(ArcanaTabs, {
            props: { tabs, modelValue, keepAlive: true },
            slots: {
                a: '<div class="pane-a">A</div>',
                b: '<div class="pane-b">B</div>',
            },
            global: {
                stubs: { "el-tooltip": { template: "<div><slot /></div>" } },
            },
        })

    it("monta só o panel da aba ativa — aba nunca visitada não monta (lazy)", () => {
        const w = mountTabs("a")
        expect(w.find(".pane-a").exists()).toBe(true)
        expect(w.find(".pane-b").exists()).toBe(false)
    })

    it("após visitar uma aba, mantém o panel montado ao trocar (keep-alive)", async () => {
        const w = mountTabs("a")

        await w.setProps({ modelValue: "b" })
        expect(w.find(".pane-b").exists()).toBe(true) // montou ao ativar
        expect(w.find(".pane-a").exists()).toBe(true) // a continua no DOM (v-show)

        await w.setProps({ modelValue: "a" })
        expect(w.find(".pane-a").exists()).toBe(true)
        expect(w.find(".pane-b").exists()).toBe(true) // b permanece montado (sem remount)
    })
})
