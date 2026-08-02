import { describe, expect, it } from "vitest";
import { availableQty, materialPayload, projectActions, taskActions } from "./domain";

describe("domain helpers", () => {
  it("calculates non-negative available warehouse quantity", () => {
    expect(availableQty({ qty: 10, reservedQty: 3 })).toBe(7);
    expect(availableQty({ qty: 1, reservedQty: 2 })).toBe(0);
    expect(availableQty({ qty: 4 })).toBe(4);
  });
  it("exposes only valid lifecycle actions", () => {
    expect(projectActions("active").start).toBe(true);
    expect(projectActions("completed")).toEqual({ start: false, pause: false, resume: false });
    expect(taskActions("pending", "in-progress")).toEqual({ pause: false, resume: false, complete: false });
    expect(taskActions("in-progress", "in-progress")).toEqual({ pause: true, resume: false, complete: true });
    expect(taskActions("paused", "in-progress")).toEqual({ pause: false, resume: true, complete: false });
    expect(taskActions("in-progress", "paused")).toEqual({ pause: false, resume: false, complete: false });
  });
  it("maps the stable warehouse item id into material payload", () => {
    expect(materialPayload({ id: "w1", name: "Steel", specs: "2mm", useQty: 2 })).toEqual({
      warehouseItemId: "w1", name: "Steel", specs: "2mm", useQty: 2,
    });
  });
});
