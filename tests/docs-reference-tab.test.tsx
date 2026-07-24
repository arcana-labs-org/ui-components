// Ephemeral verification: the docs SectionWorkbench exposes a 3rd "Props & Events"
// tab holding the props table/events, out of the section body.
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within, fireEvent } from "@testing-library/react";
import { DocsShell, type DocsGroup } from "../docs/src/components/DocsShell";
import { LangProvider } from "../docs/src/i18n";

afterEach(cleanup);

const groups: DocsGroup[] = [{
  label: "Demo",
  sections: [{
    id: "demo",
    title: "Demo",
    body: <p>blurb text</p>,
    preview: <button>live</button>,
    previewLabel: "live",
    code: {
      react: { file: "a.tsx", code: "REACTCODE" },
      vue: { file: "a.vue", code: "VUECODE" },
      angular: { file: "a.ts", code: "NGCODE" },
      svelte: { file: "a.svelte", code: "SVELTECODE" }
    },
    reference: <table className="ref-table"><tbody><tr><td>variant</td></tr></tbody></table>
  }]
}];

describe("docs Props & Events tab", () => {
  it("renders three tabs and moves props into the reference tab", () => {
    render(<LangProvider><DocsShell groups={groups} /></LangProvider>);

    const tablist = screen.getByRole("tablist");
    const tabs = within(tablist).getAllByRole("tab");
    expect(tabs.map((t) => t.textContent)).toEqual(
      expect.arrayContaining([expect.stringMatching(/Preview/i), expect.stringMatching(/Vue 3/), expect.stringMatching(/Props/i)])
    );
    expect(tabs).toHaveLength(3);

    // Preview is active first; the ref table lives in the (hidden) reference panel, not the body.
    const refTab = tabs.find((t) => /Props/i.test(t.textContent ?? ""))!;
    expect(refTab.getAttribute("aria-selected")).toBe("false");

    // Clicking the reference tab surfaces the props table.
    fireEvent.click(refTab);
    expect(refTab.getAttribute("aria-selected")).toBe("true");
    const panel = document.querySelector(".section-panel--reference")!;
    expect(panel).toBeTruthy();
    expect(within(panel as HTMLElement).getByText("variant")).toBeTruthy();
  });
});
