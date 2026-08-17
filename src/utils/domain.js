export const availableQty = item => Math.max(0, Number(item?.qty || 0) - Number(item?.reservedQty || 0));

export const projectActions = status => ({
  start: status === "active",
  pause: status === "in-progress",
  resume: status === "paused",
});

export const taskActions = (status, projectStatus) => ({
  pause: projectStatus === "in-progress" && status === "in-progress",
  resume: projectStatus === "in-progress" && status === "paused",
  complete: projectStatus === "in-progress" && status === "in-progress",
});

const operationKeys = {
  "Rezanje cijevi": "pipeCutting",
  "Pipe cutting": "pipeCutting",
  "Rezanje lima": "sheetCutting",
  "Sheet cutting": "sheetCutting",
  Bušenje: "drilling",
  Drilling: "drilling",
  Zavarivanje: "welding",
  Welding: "welding",
  Brušenje: "grinding",
  Grinding: "grinding",
  Savijanje: "bending",
  Bending: "bending",
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
