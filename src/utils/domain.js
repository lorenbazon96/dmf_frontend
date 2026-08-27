export const availableQty = item => Math.max(0, Number(item?.qty || 0) - Number(item?.reservedQty || 0));

export const projectActions = status => ({
  start: status === "active",
  pause: status === "in-progress",
  resume: status === "paused",
});

export const taskActions = (status, projectStatus) => ({
  pause: projectStatus === "in-progress" && status === "in-progress",
  resume: projectStatus === "in-progress" && status === "paused",
  complete:
    projectStatus === "in-progress" &&
    ["in-progress", "estimated-completed"].includes(status),
});

const operationKeys = {
  pipeCutting: "pipeCutting",
  "Rezanje cijevi": "pipeCutting",
  "Pipe cutting": "pipeCutting",
  sheetCutting: "sheetCutting",
  "Rezanje lima": "sheetCutting",
  "Sheet cutting": "sheetCutting",
  drilling: "drilling",
  Bušenje: "drilling",
  Drilling: "drilling",
  welding: "welding",
  Zavarivanje: "welding",
  Welding: "welding",
  grinding: "grinding",
  Brušenje: "grinding",
  Grinding: "grinding",
  bending: "bending",
  Savijanje: "bending",
  Bending: "bending",
  assembly: "assembly",
  Montaža: "assembly",
  Assembly: "assembly",
};

export const operationKey = operation => operationKeys[operation] || null;

export const operationLabel = (operation, translate) => {
  const key = operationKey(operation);
  return key ? translate(`createProject.${key}`) : operation;
};

export const localeCode = locale => locale === "hr" ? "hr-HR" : "en-GB";

export const materialPayload = material => ({
  warehouseItemId: material.id,
  name: material.name,
  specs: material.specs,
  useQty: material.useQty,
});

export const linkedMaterials = (materials = [], warehouseItems = []) => {
  const ids = new Set(warehouseItems.map(item => String(item.id || item._id)));
  return materials.filter(material => {
    const id = material.warehouseItemId?._id || material.warehouseItemId || material.id;
    return id && ids.has(String(id));
  });
};
