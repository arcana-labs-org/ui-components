import { describe, expect, it } from "vitest";
import { canNavigateTo, clampStep, formatStepLabel, stepStatus } from "../src/core/wizard";

describe("core/wizard", () => {
  it("stepStatus", () => {
    expect(stepStatus(0, 1)).toBe("completed");
    expect(stepStatus(1, 1)).toBe("active");
    expect(stepStatus(2, 1)).toBe("pending");
  });
  it("clampStep bounds to [0, total-1]", () => {
    expect(clampStep(-3, 3)).toBe(0);
    expect(clampStep(9, 3)).toBe(2);
    expect(clampStep(1, 3)).toBe(1);
    expect(clampStep(0, 0)).toBe(0);
  });
  it("canNavigateTo respects linear", () => {
    expect(canNavigateTo(3, 1, true)).toBe(false);   // ahead blocked in linear
    expect(canNavigateTo(0, 1, true)).toBe(true);     // back allowed
    expect(canNavigateTo(1, 1, true)).toBe(true);     // same
    expect(canNavigateTo(3, 1, false)).toBe(true);    // free navigation
  });
  it("formatStepLabel fills placeholders", () => {
    expect(formatStepLabel("Step {current} of {total}", 1, 4)).toBe("Step 2 of 4");
    expect(formatStepLabel("Passo {current} de {total}", 0, 3)).toBe("Passo 1 de 3");
  });
});
