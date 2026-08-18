import { describe, expect, it } from "vitest";
import { calcPipeCutting, calcTimePerOperation, calcTotalTime, formatTime } from "./calculations";
import {
  addWorkingMinutes,
  getPausedWorkingMinutes,
  getTaskProgressMinutes,
  getTaskWorkingMinutes,
  getWorkingMinutesBetween,
} from "./workingTime";

describe("production calculations", () => {
  it("returns deterministic operation and total values", () => {
    expect(calcPipeCutting({ qty: 2, cuts: 3, thickness: 3, length: 1 })).toBeCloseTo(7.8);
    expect(calcTotalTime({ pipeCutting: { qty: 2, cuts: 3, thickness: 3, m: 1 } })).toBeCloseTo(7.8);
    expect(formatTime(90)).toBe("1h 30min");
  });
  it("ignores malformed empty treatment entries without hiding projects", () => {
    expect(calcTimePerOperation([null, undefined])).toEqual({});
    expect(calcTimePerOperation(null)).toEqual({});
  });
});

describe("working time", () => {
  const schedule = { workStart: "07:00", workEnd: "15:00", breaks: [{ from: "11:00", to: "11:30" }], workDays: [1,2,3,4,5] };
  it("excludes breaks and weekends", () => {
    expect(getWorkingMinutesBetween(new Date(2026, 7, 3, 10), new Date(2026, 7, 3, 12), schedule)).toBe(90);
    expect(addWorkingMinutes(new Date(2026, 7, 7, 14), 120, schedule)).toEqual(new Date(2026, 7, 10, 8));
  });
  it("does not advance after the workday ends", () => {
    const startedAt = new Date(2026, 7, 3, 14);
    expect(getWorkingMinutesBetween(startedAt, new Date(2026, 7, 3, 15), schedule)).toBe(60);
    expect(getWorkingMinutesBetween(startedAt, new Date(2026, 7, 3, 19), schedule)).toBe(60);
  });
  it("counts only the working part of a pause", () => {
    const history = [
      { from: "in-progress", to: "paused", at: new Date(2026, 7, 3, 14, 30) },
      { from: "paused", to: "in-progress", at: new Date(2026, 7, 3, 18) },
    ];
    expect(getPausedWorkingMinutes(history, new Date(2026, 7, 3, 19), schedule)).toBe(30);
    expect(getTaskWorkingMinutes({
      startedAt: new Date(2026, 7, 3, 14),
      history,
    }, new Date(2026, 7, 3, 19), schedule)).toBe(30);
  });
  it("keeps completed work in progress after a worker is reassigned", () => {
    expect(getTaskProgressMinutes({
      status: "pending",
      estimatedMinutes: 40,
      previousAssignments: [{ actualMinutes: 20 }],
    }, new Date(), schedule)).toEqual({ estimated: 60, completed: 20 });
  });
});
