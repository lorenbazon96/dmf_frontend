export const availableQty = item => Math.max(0, Number(item?.qty || 0) - Number(item?.reservedQty || 0));

export const projectActions = status => ({
  start: status === "active",
  pause: status === "in-progress",
  resume: status === "paused",
});

export const taskActions = (status, projectStatus) => ({
  start: projectStatus === "in-progress" && status === "pending",
  pause: projectStatus === "in-progress" && status === "in-progress",
  resume: projectStatus === "in-progress" && status === "paused",
  complete: projectStatus === "in-progress" && status === "in-progress",
});

export const materialPayload = material => ({
  warehouseItemId: material.id,
  name: material.name,
  specs: material.specs,
  useQty: material.useQty,
});
