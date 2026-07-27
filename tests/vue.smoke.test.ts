import { describe, it, expect } from "vitest";
import { h, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import {
  ArcanaContextMenu,
  ArcanaButton,
  ArcanaBadge,
  ArcanaInput,
  ArcanaSelect,
  ArcanaTabs,
  ArcanaSwitch,
  ArcanaSwitchSegmented,
  ArcanaSegmentedControl
} from "../src/vue";

// Smoke test: monta uma amostra variada de componentes da lib Vue e garante que
// renderizam sem lançar erro. Não valida comportamento — só que o barrel export
// e o build de SFC estão saudáveis.
describe("@arcanalabs/ui-components — Vue smoke", () => {
  it("ArcanaButton renderiza com um slot de label", () => {
    const wrapper = mount(ArcanaButton, {
      props: { variant: "primary" },
      slots: { default: "Salvar" }
    });
    expect(wrapper.text()).toContain("Salvar");
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("ArcanaBadge renderiza com variant e slot", () => {
    const wrapper = mount(ArcanaBadge, {
      props: { variant: "green" },
      slots: { default: "Ativo" }
    });
    expect(wrapper.text()).toContain("Ativo");
    expect(wrapper.classes().join(" ")).toContain("arcana-badge");
  });

  it("ArcanaInput renderiza um input com v-model", () => {
    const wrapper = mount(ArcanaInput, {
      props: { modelValue: "olá" }
    });
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect((input.element as HTMLInputElement).value).toBe("olá");
  });

  it("ArcanaSelect expõe slots de campo/opção e separa grupos", async () => {
    const wrapper = mount(ArcanaSelect, {
      attachTo: document.body,
      props: {
        options: [
          { label: "Pix", value: "pix", group: "À vista" },
          { label: "Cartão", value: "card", group: "A prazo" }
        ]
      },
      slots: {
        prefix: () => h("span", "Forma"),
        suffix: () => h("span", "BR"),
        "option-prefix": ({ option }: any) => h("span", `P:${option.value}`),
        "option-suffix": ({ option }: any) => h("span", `S:${option.label}`),
        "group-label": ({ group }: any) => h("strong", group)
      }
    });
    expect(wrapper.find(".arcana-select__prefix").text()).toBe("Forma");
    expect(wrapper.find(".arcana-select__suffix").text()).toBe("BR");
    await wrapper.find(".arcana-select__trigger").trigger("click");
    await nextTick();
    const panel = document.body.querySelector<HTMLElement>(".arcana-select__panel")!;
    expect(panel.style.width).toBe("max-content");
    expect(panel.style.maxWidth).toBe("calc(100vw - 16px)");
    expect(panel.querySelectorAll(".arcana-select__group")).toHaveLength(2);
    expect(panel.querySelectorAll(".arcana-select__group-separator")).toHaveLength(1);
    expect(panel.querySelectorAll(".arcana-select__option-prefix")).toHaveLength(2);
    expect(panel.querySelectorAll(".arcana-select__option-suffix")).toHaveLength(2);
    wrapper.unmount();
  });

  it("ArcanaTabs renderiza os triggers das abas", () => {
    const wrapper = mount(ArcanaTabs, {
      props: {
        modelValue: "a",
        tabs: [
          { name: "a", label: "Aba A" },
          { name: "b", label: "Aba B" }
        ]
      },
      slots: { a: "<div>Painel A</div>", b: "<div>Painel B</div>" }
    });
    expect(wrapper.text()).toContain("Aba A");
    expect(wrapper.text()).toContain("Aba B");
  });

  it("ArcanaSwitch renderiza e emite update ao alternar", async () => {
    const wrapper = mount(ArcanaSwitch, {
      props: { modelValue: false }
    });
    await wrapper.find("button, [role='switch']").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });

  it("ArcanaSegmentedControl: opção sem label é só-ícone e o ariaLabel nomeia o botão", () => {
    const wrapper = mount(ArcanaSegmentedControl, {
      props: {
        modelValue: "list",
        options: [
          { label: "", value: "list", icon: "fa-solid fa-list", ariaLabel: "Lista" },
          { label: "Grade", value: "grid", icon: "fa-solid fa-table-cells-large" }
        ]
      }
    });
    const options = wrapper.findAll("button.arcana-segmented-control__option");
    expect(options).toHaveLength(2);

    // Sem label → nenhum <span> de texto (nem vazio) e classe modificadora de só-ícone.
    const iconOnly = options[0];
    expect(iconOnly.classes()).toContain("arcana-segmented-control__option--icon-only");
    expect(iconOnly.findAll("span")).toHaveLength(0);
    expect(iconOnly.text()).toBe("");
    // O ícone é aria-hidden → quem dá nome ao botão é o `ariaLabel` da opção.
    expect(iconOnly.find(".arcana-segmented-control__icon").attributes("aria-hidden")).toBe("true");
    expect(iconOnly.attributes("aria-label")).toBe("Lista");
    expect(iconOnly.attributes("title")).toBe("Lista");

    // Com label: span preservado, nome vem do label e sem tooltip nativa.
    const labelled = options[1];
    expect(labelled.classes()).not.toContain("arcana-segmented-control__option--icon-only");
    expect(labelled.find("span").text()).toBe("Grade");
    expect(labelled.attributes("aria-label")).toBe("Grade");
    expect(labelled.attributes("title")).toBeUndefined();
  });

  it("ArcanaSwitchSegmented renderiza offIcon/onIcon antes do texto", () => {
    const wrapper = mount(ArcanaSwitchSegmented, {
      props: {
        modelValue: false,
        offIcon: "fa-solid fa-moon",
        onIcon: "fa-solid fa-sun",
        onIconColor: "#f59e0b",
        onLabel: ""
      }
    });
    const off = wrapper.find(".arcana-switch-segmented__option--off");
    const offIcon = off.find(".arcana-switch-segmented__icon");
    expect(offIcon.classes()).toContain("fa-moon");
    expect(offIcon.attributes("aria-hidden")).toBe("true");
    // Ícone vem ANTES do texto.
    expect(off.element.firstElementChild).toBe(offIcon.element);
    expect(off.text()).toContain("Inativo");
    const onIcon = wrapper.find(
      ".arcana-switch-segmented__option--on .arcana-switch-segmented__icon"
    );
    expect(onIcon.attributes("style")).toContain("#f59e0b");
    // Label vazio → lado icon-only, sem texto forçado.
    expect(wrapper.find(".arcana-switch-segmented__option--on").text()).toBe("");
    // aria-label descarta o label vazio.
    expect(wrapper.attributes("aria-label")).toBe("Inativo");
  });

  it("ArcanaContextMenu: ↑/↓ navegam entre os itens e Escape fecha devolvendo o foco", async () => {
    const wrapper = mount(ArcanaContextMenu, {
      attachTo: document.body,
      props: {
        items: [{ label: "Copiar" }, { label: "Colar" }, { label: "Excluir", variant: "danger" }]
      },
      slots: { trigger: '<div class="alvo">alvo</div>' }
    });

    wrapper.element.dispatchEvent(
      new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: 40, clientY: 40 })
    );
    await nextTick();
    await nextTick();

    const panel = document.body.querySelector(".arcana-context-menu__panel") as HTMLElement;
    // Ao abrir, o foco vai pro painel (role="menu") — o teclado passa a valer.
    expect(document.activeElement).toBe(panel);

    const items = panel.querySelectorAll<HTMLElement>(".arcana-context-menu-item");
    const key = (k: string) =>
      panel.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }));

    key("ArrowDown");
    expect(document.activeElement).toBe(items[0]);
    key("ArrowDown");
    expect(document.activeElement).toBe(items[1]);
    key("ArrowUp");
    expect(document.activeElement).toBe(items[0]);
    // Wrap: ↑ no primeiro item vai pro último.
    key("ArrowUp");
    expect(document.activeElement).toBe(items[2]);

    key("Escape");
    await nextTick();
    expect(document.body.querySelector(".arcana-context-menu__panel")).toBeNull();
    // Foco devolvido ao gatilho.
    expect(document.activeElement).toBe(wrapper.element);

    wrapper.unmount();
  });

  // ── ArcanaContextMenu ─────────────────────────────────────────────────────
  // O menu de contexto é o único componente ancorado no CURSOR (e não no
  // gatilho), então o teste fixa as duas pontas: onde o painel aparece e o que
  // acontece ao escolher um item.
  it("ArcanaContextMenu: contextmenu abre o painel no body nas coordenadas do cursor", async () => {
    const wrapper = mount(ArcanaContextMenu, {
      attachTo: document.body,
      props: {
        ariaLabel: "Ações",
        panelClass: "minha-tela",
        items: [
          { label: "Copiar", icon: "fa-solid fa-copy", suffix: "⌘C" },
          { label: "Excluir", variant: "danger", divided: true }
        ]
      },
      slots: { trigger: '<div class="alvo">clique com o botão direito</div>' }
    });

    expect(document.body.querySelector(".arcana-context-menu__panel")).toBeNull();

    wrapper.element.dispatchEvent(
      new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: 120, clientY: 80 })
    );
    await nextTick();
    await nextTick();

    // Teleportado pro <body> (fora da árvore do gatilho), com role/aria de menu.
    const panel = document.body.querySelector(".arcana-context-menu__panel") as HTMLElement;
    expect(panel).not.toBeNull();
    expect(wrapper.element.contains(panel)).toBe(false);
    expect(panel.getAttribute("role")).toBe("menu");
    expect(panel.getAttribute("aria-label")).toBe("Ações");
    expect(panel.classList.contains("minha-tela")).toBe(true);

    // Ancorado no ponto do clique (POINTER_GAP = 2 abaixo do cursor), sem flip
    // porque cabe na viewport do happy-dom.
    expect(panel.style.position).toBe("fixed");
    expect(panel.style.left).toBe("120px");
    expect(panel.style.top).toBe("82px");

    const items = panel.querySelectorAll(".arcana-context-menu-item");
    expect(items).toHaveLength(2);
    expect(items[0].getAttribute("role")).toBe("menuitem");
    expect(panel.querySelector(".arcana-context-menu-item__suffix")!.textContent).toBe("⌘C");
    expect(items[1].classList.contains("arcana-context-menu-item--danger")).toBe(true);
    expect(panel.querySelector(".arcana-context-menu-item__separator")).not.toBeNull();

    // Escolher um item emite `select` (item + índice) e fecha o menu.
    (items[0] as HTMLButtonElement).click();
    await nextTick();

    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")![0][0]).toMatchObject({ label: "Copiar" });
    expect(wrapper.emitted("select")![0][1]).toBe(0);
    expect(wrapper.emitted("close")).toBeTruthy();
    expect(document.body.querySelector(".arcana-context-menu__panel")).toBeNull();

    wrapper.unmount();
  });
});
