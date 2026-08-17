import { describe, expect, it } from "vitest";
import router from "./index";

describe("contextual routes", () => {
  it.each([
    ["/projects/project-1", "project", { id: "project-1" }],
    ["/history/projects/project-2", "history-project", { id: "project-2" }],
    ["/projects/project-1/drawings/drawing-1", "drawing", { projectId: "project-1", drawingId: "drawing-1" }],
    ["/workers/worker-1", "worker-detail", { id: "worker-1" }],
    ["/clients/client-1", "client-detail", { id: "client-1" }],
  ])("resolves %s to %s", (path, name, params) => {
    const resolved = router.resolve(path);
    expect(resolved.name).toBe(name);
    expect(resolved.params).toEqual(params);
  });
});
