import { describe, it, expect } from "vitest"
import { defineComponent, nextTick } from "vue"
import { mount } from "@vue/test-utils"
import ArcanaAccordion from "../src/vue/components/ArcanaAccordion.vue"
import ArcanaAccordionItem from "../src/vue/components/ArcanaAccordionItem.vue"

/**
 * Prop `animated` (slide de altura + fade). Como happy-dom não roda transições CSS,
 * `transitionend` nunca dispara e quem finaliza é o fallback por timeout do
 * `core/collapse` — daí o `waitFor` com timers reais.
 */
const waitFor = async (predicate: () => boolean, timeoutMs = 1500) => {
    const started = Date.now()
    while (!predicate()) {
        if (Date.now() - started > timeoutMs) throw new Error("waitFor: timeout")
        await new Promise((resolve) => setTimeout(resolve, 10))
        await nextTick()
    }
}

const Host = defineComponent({
    components: { ArcanaAccordion, ArcanaAccordionItem },
    props: { animated: { type: Boolean, default: false } },
    data: () => ({ open: null as string | string[] | null }),
    template: `
        <ArcanaAccordion v-model="open" :animated="animated">
            <ArcanaAccordionItem name="a" title="A"><p class="body-a">Corpo A</p></ArcanaAccordionItem>
            <ArcanaAccordionItem name="b" title="B"><p class="body-b">Corpo B</p></ArcanaAccordionItem>
        </ArcanaAccordion>
    `,
})

describe("ArcanaAccordion — animated", () => {
    it("com `animated`, o conteúdo abre e fecha (e a classe de transição é aplicada)", async () => {
        const w = mount(Host, { props: { animated: true }, attachTo: document.body })

        const contents = w.findAll(".arcana-accordion-content")
        const first = contents[0].element as HTMLElement
        expect(contents[0].classes()).toContain("arcana-accordion-content--animated")

        // Repouso inicial: fechado ⇒ display none, sem height/opacity residuais.
        expect(first.style.display).toBe("none")

        // Abre: fica visível imediatamente e a altura em px é escrita durante a transição.
        await w.findAll(".arcana-accordion-trigger")[0].trigger("click")
        await nextTick()
        expect(w.findAll(".arcana-accordion-item")[0].classes()).toContain("open")
        expect(first.style.display).not.toBe("none")
        expect(w.find(".body-a").isVisible()).toBe(true)

        // Ao assentar, os estilos inline da animação são limpos (volta pra height auto).
        await waitFor(() => first.style.height === "")
        expect(first.style.display).not.toBe("none")
        expect(first.style.opacity).toBe("")
        expect(first.style.overflow).toBe("")

        // Fecha: só some do layout quando a transição termina.
        await w.findAll(".arcana-accordion-trigger")[0].trigger("click")
        await nextTick()
        expect(w.findAll(".arcana-accordion-item")[0].classes()).not.toContain("open")
        await waitFor(() => first.style.display === "none")
        expect(first.style.height).toBe("")

        w.unmount()
    })

    it("sem `animated` (default), mantém o comportamento instantâneo", async () => {
        const w = mount(Host, { attachTo: document.body })

        const content = w.findAll(".arcana-accordion-content")[0]
        const el = content.element as HTMLElement
        expect(content.classes()).not.toContain("arcana-accordion-content--animated")
        expect(el.style.display).toBe("none")

        await w.findAll(".arcana-accordion-trigger")[0].trigger("click")
        await nextTick()
        expect(el.style.display).toBe("")

        await w.findAll(".arcana-accordion-trigger")[0].trigger("click")
        await nextTick()
        expect(el.style.display).toBe("none")

        w.unmount()
    })

    it("a prop `animated` do item tem precedência sobre a do container", async () => {
        const Mixed = defineComponent({
            components: { ArcanaAccordion, ArcanaAccordionItem },
            data: () => ({ open: null as string | string[] | null }),
            template: `
                <ArcanaAccordion v-model="open" animated>
                    <ArcanaAccordionItem name="a" title="A">Corpo A</ArcanaAccordionItem>
                    <ArcanaAccordionItem name="b" title="B" :animated="false">Corpo B</ArcanaAccordionItem>
                </ArcanaAccordion>
            `,
        })
        const w = mount(Mixed, { attachTo: document.body })
        const contents = w.findAll(".arcana-accordion-content")
        expect(contents[0].classes()).toContain("arcana-accordion-content--animated")
        expect(contents[1].classes()).not.toContain("arcana-accordion-content--animated")

        // O item estático continua alternando via display, sem passar pela animação.
        await w.findAll(".arcana-accordion-trigger")[1].trigger("click")
        await nextTick()
        expect((contents[1].element as HTMLElement).style.display).toBe("")

        w.unmount()
    })
})
