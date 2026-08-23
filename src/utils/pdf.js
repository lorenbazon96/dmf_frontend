import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import robotoRegular from "@/assets/roboto-regular.js";
import robotoBold from "@/assets/roboto-bold.js";
import i18n from "../i18n";
import { localeCode, operationLabel } from "./domain";
const logoUrl = require("@/assets/logo-dmf.png");

let logoBase64 = null;

const report = key => i18n.global.t(`reports.${key}`);
const workerDetail = key => i18n.global.t(`workerDetail.${key}`);
const operation = value => operationLabel(value, key => i18n.global.t(key));
const projectStatus = value => i18n.global.t(`project.projectStatus.${value || "active"}`);
const reportLocale = () => localeCode(
  typeof i18n.global.locale === "string" ? i18n.global.locale : i18n.global.locale.value,
);
const yesNo = value => report(value ? "yes" : "no");
const reportDate = value => {
  if (!value) return "";
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(reportLocale());
};
const reportMonth = value => {
  const match = /^(\d{4})-(\d{2})$/.exec(value || "");
  return match
    ? new Date(Number(match[1]), Number(match[2]) - 1, 1).toLocaleDateString(reportLocale(), { month:"long", year:"numeric" })
    : value || "";
};
const reportHours = minutes => `${(Number(minutes || 0) / 60).toLocaleString(reportLocale(), { maximumFractionDigits:1 })} h`;
const clientType = value => report(value === "person" ? "person" : "company");
const itemType = value => {
  const key = {
    Lim: "sheet",
    Cijev: "pipe",
    Profil: "profile",
    "Vijčani materijal": "fasteners",
    Ostalo: "other",
  }[value];
  return key ? i18n.global.t(`warehouseAdd.types.${key}`) : value;
};

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      c.getContext("2d").drawImage(img, 0, 0);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

async function initPdf() {
  if (!logoBase64) logoBase64 = await loadImage(logoUrl);
}

function createDoc(orientation) {
  const doc = new jsPDF(orientation, "mm", "a4");
  doc.addFileToVFS("Roboto-Regular.ttf", robotoRegular);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.addFileToVFS("Roboto-Bold.ttf", robotoBold);
  doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
  doc.setFont("Roboto", "normal");
  return doc;
}

function addPdfHeader(doc, title, userName, companyName) {
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 14, 8, 30, 14);
  }
  doc.setFontSize(14);
  doc.setTextColor(43, 87, 154);
  try {
    doc.setFont("Roboto", "bold");
  } catch (e) { console.warn("Roboto bold font not available, using default", e); }
  doc.text(title, logoBase64 ? 48 : 14, 16);

  doc.setFontSize(8);
  doc.setTextColor(100);
  try {
    doc.setFont("Roboto", "normal");
  } catch (e) { console.warn("Roboto normal font not available, using default", e); }
  const pageW = doc.internal.pageSize.getWidth();
  if (companyName) doc.text(companyName, pageW - 14, 12, { align: "right" });
  if (userName) doc.text(userName, pageW - 14, 17, { align: "right" });

  doc.setDrawColor(200);
  doc.line(14, 24, pageW - 14, 24);
  doc.setTextColor(0);
  try {
    doc.setFont("Roboto", "normal");
  } catch (e) { console.warn("Roboto normal font not available, using default", e); }
  return 29;
}

function getPrintHeader(title, userName, companyName) {
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:2px solid #2b579a;">
    <div style="display:flex;align-items:center;gap:12px;">
      <img src="${logoUrl}" style="height:40px;" />
      <span style="font-size:18px;font-weight:700;color:#2b579a;">${title}</span>
    </div>
    <div style="text-align:right;font-size:12px;color:#555;">
      ${companyName ? `<div style="font-weight:600;">${companyName}</div>` : ""}
      ${userName ? `<div>${userName}</div>` : ""}
    </div>
  </div>`;
}

const tableStyles = {
  styles: { fontSize: 8, font: "Roboto" },
  headStyles: { fillColor: [43, 87, 154], font: "Roboto", fontStyle: "bold" },
};

export async function exportWorkersPdf(workers, userName, companyName) {
  await initPdf();
  const doc = createDoc("l");
  const startY = addPdfHeader(doc, report("workers"), userName, companyName);
  autoTable(doc, {
    startY,
    head: [
      [
        "#",
        report("fullName"),
        report("contact"),
        "CP",
        "CS",
        "D",
        "G",
        "B",
        "W",
        "A",
        report("rating"),
      ],
    ],
    body: workers.map((w, i) => [
      i + 1,
      w.fullName,
      w.contact,
      w.cp ?? w.ratings?.pipeCutting ?? 0,
      w.cs ?? w.ratings?.sheetCutting ?? 0,
      w.d ?? w.ratings?.drilling ?? 0,
      w.g ?? w.ratings?.grinding ?? 0,
      w.b ?? w.ratings?.bending ?? 0,
      w.w ?? w.ratings?.welding ?? 0,
      w.a ?? w.ratings?.assembly ?? 0,
      w.rating ?? 0,
    ]),
    ...tableStyles,
  });
  doc.save(`${report("fileWorkers")}.pdf`);
}

export async function exportClientsPdf(clients, userName, companyName) {
  await initPdf();
  const doc = createDoc("l");
  const startY = addPdfHeader(doc, report("clients"), userName, companyName);
  autoTable(doc, {
    startY,
    head: [
      ["#", report("type"), report("name"), report("country"), report("address"), report("contact"), report("email"), report("taxId")],
    ],
    body: clients.map((c, i) => [
      i + 1,
      clientType(c.clientType),
      c.clientName,
      c.country,
      c.adressa,
      c.contact || "",
      c.email || "",
      c.oib || "",
    ]),
    ...tableStyles,
  });
  doc.save(`${report("fileClients")}.pdf`);
}

export async function exportSingleWorkerPdf(
  worker,
  ratings,
  operations,
  totalRating,
  projectsCompleted,
  userName,
  companyName,
) {
  await initPdf();
  const doc = createDoc("p");
  const startY = addPdfHeader(
    doc,
    `${report("worker")}: ${worker.fullName || ""}`,
    userName,
    companyName,
  );
  const t1 = autoTable(doc, {
    startY,
    head: [[report("field"), report("value")]],
    body: [
      [report("fullName"), worker.fullName || ""],
      [report("email"), worker.email || ""],
      [report("address"), worker.address || ""],
      [report("contact"), worker.contact || ""],
      [report("jobPosition"), worker.jobPosition || ""],
      [report("company"), worker.company || companyName || ""],
      [workerDetail("createdAt"), reportDate(worker.createdAt)],
      [report("totalRating"), String(totalRating)],
      [report("completedProjects"), String(projectsCompleted)],
      [workerDetail("month"), reportMonth(worker.selectedMonth)],
      [workerDetail("scheduledHours"), reportHours(worker.monthlyStats?.scheduledMinutes)],
      [workerDetail("effectiveHours"), reportHours(worker.monthlyStats?.effectiveMinutes)],
      [workerDetail("utilization"), `${worker.monthlyStats?.utilization || 0}%`],
    ],
    ...tableStyles,
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
  });
  const t2 = autoTable(doc, {
    startY: t1.finalY + 8,
    head: [[report("operation"), report("rating"), report("active")]],
    body: [
      [
        i18n.global.t("createProject.pipeCutting"),
        ratings.pipeCutting,
        yesNo(operations.pipeCutting),
      ],
      [
        i18n.global.t("createProject.sheetCutting"),
        ratings.sheetCutting,
        yesNo(operations.sheetCutting),
      ],
      [i18n.global.t("createProject.welding"), ratings.welding, yesNo(operations.welding)],
      [i18n.global.t("createProject.bending"), ratings.bending, yesNo(operations.bending)],
      [i18n.global.t("createProject.grinding"), ratings.grinding, yesNo(operations.grinding)],
      [i18n.global.t("createProject.drilling"), ratings.drilling, yesNo(operations.drilling)],
      [i18n.global.t("createProject.assembly"), ratings.assembly, yesNo(operations.assembly)],
    ],
    ...tableStyles,
  });
  autoTable(doc, {
    startY: t2.finalY + 8,
    head: [[
      workerDetail("date"),
      workerDetail("exceptionType"),
      workerDetail("hours"),
      workerDetail("reason"),
    ]],
    body: worker.scheduleExceptions?.length
      ? worker.scheduleExceptions.map(item => [
        reportDate(item.date),
        workerDetail(item.type === "absence" ? "absence" : "customHours"),
        item.type === "custom-hours" ? `${item.from}–${item.to}` : "—",
        item.reason || "—",
      ])
      : [[workerDetail("noExceptions"), "", "", ""]],
    ...tableStyles,
  });
  doc.save(`${report("fileWorker")}-${(worker.fullName || report("fileWorker")).replace(/\s+/g, "_")}.pdf`);
}

export async function exportSingleClientPdf(
  form,
  responsiblePersons,
  userName,
  companyName,
) {
  await initPdf();
  const doc = createDoc("p");
  const startY = addPdfHeader(
    doc,
    `${report("client")}: ${form.clientName || ""}`,
    userName,
    companyName,
  );
  const t1 = autoTable(doc, {
    startY,
    head: [[report("field"), report("value")]],
    body: [
      [report("type"), clientType(form.clientType)],
      [report("name"), form.clientName || ""],
      [report("taxId"), form.oib || ""],
      [report("country"), form.country || ""],
      [report("address"), form.adressa || ""],
      [report("owner"), form.owner || ""],
      [report("contact"), form.contact || ""],
      [report("email"), form.email || ""],
    ],
    ...tableStyles,
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
  });
  if (form.clientType === "company" && responsiblePersons?.length) {
    const filled = responsiblePersons.filter(
      (p) => p.fullName || p.email || p.contact,
    );
    if (filled.length) {
      autoTable(doc, {
        startY: t1.finalY + 8,
        head: [[report("fullName"), report("email"), report("contact"), report("note")]],
        body: filled.map((p) => [p.fullName, p.email, p.contact, p.note]),
        ...tableStyles,
      });
    }
  }
  doc.save(
    `${report("fileClient")}-${(form.clientName || report("fileClient")).replace(/\s+/g, "_")}.pdf`,
  );
}

function printContent(title, htmlContent, userName, companyName) {
  const header = getPrintHeader(title, userName, companyName);
  const win = window.open("", "_blank");
  win.document.write(`
    <html><head><title>${title}</title>
    <style>
      body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
      table { border-collapse: collapse; width: 100%; margin-top: 10px; }
      th, td { border: 1px solid #ccc; padding: 6px 10px; font-size: 12px; text-align: left; }
      th { background: #2b579a; color: #fff; }
    </style></head><body>
    ${header}${htmlContent}
    </body></html>
  `);
  win.document.close();
  win.onload = () => {
    win.print();
    win.close();
  };
}

export function printWorkersList(workers, userName, companyName) {
  let rows = workers
    .map(
      (w, i) =>
        `<tr><td>${i + 1}</td><td>${w.fullName}</td><td>${w.contact}</td><td>${
          w.cp ?? 0
        }</td><td>${w.cs ?? 0}</td><td>${w.d ?? 0}</td><td>${
          w.g ?? 0
        }</td><td>${w.b ?? 0}</td><td>${w.w ?? 0}</td><td>${w.a ?? 0}</td><td>${
          w.rating ?? 0
        }</td></tr>`,
    )
    .join("");
  printContent(
    report("workers"),
    `<table><tr><th>#</th><th>${report("fullName")}</th><th>${report("contact")}</th><th>CP</th><th>CS</th><th>D</th><th>G</th><th>B</th><th>W</th><th>A</th><th>${report("rating")}</th></tr>${rows}</table>`,
    userName,
    companyName,
  );
}

export function printClientsList(clients, userName, companyName) {
  let rows = clients
    .map(
      (c, i) =>
        `<tr><td>${i + 1}</td><td>${
          clientType(c.clientType)
        }</td><td>${c.clientName}</td><td>${c.country}</td><td>${
          c.adressa
        }</td><td>${c.contact || ""}</td><td>${c.email || ""}</td></tr>`,
    )
    .join("");
  printContent(
    report("clients"),
    `<table><tr><th>#</th><th>${report("type")}</th><th>${report("name")}</th><th>${report("country")}</th><th>${report("address")}</th><th>${report("contact")}</th><th>${report("email")}</th></tr>${rows}</table>`,
    userName,
    companyName,
  );
}

export function printSingleWorker(
  worker,
  ratings,
  operations,
  totalRating,
  projectsCompleted,
  userName,
  companyName,
) {
  let info = `<table>
    <tr><th>${report("field")}</th><th>${report("value")}</th></tr>
    <tr><td><b>${report("fullName")}</b></td><td>${worker.fullName || ""}</td></tr>
    <tr><td><b>${report("email")}</b></td><td>${worker.email || ""}</td></tr>
    <tr><td><b>${report("address")}</b></td><td>${worker.address || ""}</td></tr>
    <tr><td><b>${report("contact")}</b></td><td>${worker.contact || ""}</td></tr>
    <tr><td><b>${report("jobPosition")}</b></td><td>${worker.jobPosition || ""}</td></tr>
    <tr><td><b>${report("company")}</b></td><td>${worker.company || companyName || ""}</td></tr>
    <tr><td><b>${workerDetail("createdAt")}</b></td><td>${reportDate(worker.createdAt)}</td></tr>
    <tr><td><b>${report("totalRating")}</b></td><td>${totalRating}</td></tr>
    <tr><td><b>${report("completedProjects")}</b></td><td>${projectsCompleted}</td></tr>
    <tr><td><b>${workerDetail("month")}</b></td><td>${reportMonth(worker.selectedMonth)}</td></tr>
    <tr><td><b>${workerDetail("scheduledHours")}</b></td><td>${reportHours(worker.monthlyStats?.scheduledMinutes)}</td></tr>
    <tr><td><b>${workerDetail("effectiveHours")}</b></td><td>${reportHours(worker.monthlyStats?.effectiveMinutes)}</td></tr>
    <tr><td><b>${workerDetail("utilization")}</b></td><td>${worker.monthlyStats?.utilization || 0}%</td></tr>
  </table><br><table><tr><th>${report("operation")}</th><th>${report("rating")}</th><th>${report("active")}</th></tr>
    <tr><td>${i18n.global.t("createProject.pipeCutting")}</td><td>${ratings.pipeCutting}</td><td>${
    yesNo(operations.pipeCutting)
  }</td></tr>
    <tr><td>${i18n.global.t("createProject.sheetCutting")}</td><td>${ratings.sheetCutting}</td><td>${
    yesNo(operations.sheetCutting)
  }</td></tr>
    <tr><td>${i18n.global.t("createProject.welding")}</td><td>${ratings.welding}</td><td>${
    yesNo(operations.welding)
  }</td></tr>
    <tr><td>${i18n.global.t("createProject.bending")}</td><td>${ratings.bending}</td><td>${
    yesNo(operations.bending)
  }</td></tr>
    <tr><td>${i18n.global.t("createProject.grinding")}</td><td>${ratings.grinding}</td><td>${
    yesNo(operations.grinding)
  }</td></tr>
    <tr><td>${i18n.global.t("createProject.drilling")}</td><td>${ratings.drilling}</td><td>${
    yesNo(operations.drilling)
  }</td></tr>
    <tr><td>${i18n.global.t("createProject.assembly")}</td><td>${ratings.assembly}</td><td>${
    yesNo(operations.assembly)
  }</td></tr>
  </table><br><h3 style="color:#2b579a;">${workerDetail("availabilityExceptions")}</h3>
  <table><tr><th>${workerDetail("date")}</th><th>${workerDetail("exceptionType")}</th><th>${workerDetail("hours")}</th><th>${workerDetail("reason")}</th></tr>`;
  if (worker.scheduleExceptions?.length) {
    worker.scheduleExceptions.forEach(item => {
      info += `<tr><td>${reportDate(item.date)}</td><td>${workerDetail(item.type === "absence" ? "absence" : "customHours")}</td><td>${item.type === "custom-hours" ? `${item.from}–${item.to}` : "—"}</td><td>${item.reason || "—"}</td></tr>`;
    });
  } else {
    info += `<tr><td colspan="4">${workerDetail("noExceptions")}</td></tr>`;
  }
  info += "</table>";
  printContent(`${report("worker")}: ${worker.fullName}`, info, userName, companyName);
}

export function printSingleClient(
  form,
  responsiblePersons,
  userName,
  companyName,
) {
  let info = `<table>
    <tr><th>${report("field")}</th><th>${report("value")}</th></tr>
    <tr><td><b>${report("type")}</b></td><td>${
      clientType(form.clientType)
    }</td></tr>
    <tr><td><b>${report("name")}</b></td><td>${form.clientName || ""}</td></tr>
    <tr><td><b>${report("taxId")}</b></td><td>${form.oib || ""}</td></tr>
    <tr><td><b>${report("country")}</b></td><td>${form.country || ""}</td></tr>
    <tr><td><b>${report("address")}</b></td><td>${form.adressa || ""}</td></tr>
    <tr><td><b>${report("owner")}</b></td><td>${form.owner || ""}</td></tr>
    <tr><td><b>${report("contact")}</b></td><td>${form.contact || ""}</td></tr>
    <tr><td><b>${report("email")}</b></td><td>${form.email || ""}</td></tr>
  </table>`;
  if (form.clientType === "company" && responsiblePersons?.length) {
    const filled = responsiblePersons.filter(
      (p) => p.fullName || p.email || p.contact,
    );
    if (filled.length) {
      info += `<br><h3 style="color:#2b579a;">${report("responsiblePersons")}</h3><table><tr><th>${report("fullName")}</th><th>${report("email")}</th><th>${report("contact")}</th><th>${report("note")}</th></tr>`;
      filled.forEach((p) => {
        info += `<tr><td>${p.fullName}</td><td>${p.email}</td><td>${p.contact}</td><td>${p.note}</td></tr>`;
      });
      info += "</table>";
    }
  }
  printContent(`${report("client")}: ${form.clientName}`, info, userName, companyName);
}

export async function exportWarehousePdf(items, userName, companyName) {
  await initPdf();
  const doc = createDoc("l");
  const startY = addPdfHeader(
    doc,
    report("warehouse"),
    userName,
    companyName,
  );
  autoTable(doc, {
    startY,
    head: [["#", report("type"), report("name"), report("specification"), report("quantity")]],
    body: items.map((item, i) => [
      i + 1,
      itemType(item.type) || "",
      item.name || "",
      item.specs || "",
      item.qty ?? 0,
    ]),
    ...tableStyles,
  });
  doc.save(`${report("fileWarehouse")}.pdf`);
}

export function printWarehouseList(items, userName, companyName) {
  let rows = items
    .map(
      (item, i) =>
        `<tr><td>${i + 1}</td><td>${itemType(item.type) || ""}</td><td>${
          item.name || ""
        }</td><td>${item.specs || ""}</td><td>${item.qty ?? 0}</td></tr>`,
    )
    .join("");
  printContent(
    report("warehouse"),
    `<table><tr><th>#</th><th>${report("type")}</th><th>${report("name")}</th><th>${report("specification")}</th><th>${report("quantity")}</th></tr>${rows}</table>`,
    userName,
    companyName,
  );
}

export async function exportHistoryPdf(projects, userName, companyName) {
  await initPdf();
  const doc = createDoc("l");
  const startY = addPdfHeader(
    doc,
    report("productionHistory"),
    userName,
    companyName,
  );
  autoTable(doc, {
    startY,
    head: [["#", "RN", report("client"), report("name"), report("completed")]],
    body: projects.map((p, i) => [
      i + 1,
      p.rn || "",
      p.client || "",
      p.name || "",
      p.completedOn || "",
    ]),
    ...tableStyles,
  });
  doc.save(`${report("fileHistory")}.pdf`);
}

export function printHistoryList(projects, userName, companyName) {
  let rows = projects
    .map(
      (p, i) =>
        `<tr><td>${i + 1}</td><td>${p.rn || ""}</td><td>${
          p.client || ""
        }</td><td>${p.name || ""}</td><td>${p.completedOn || ""}</td></tr>`,
    )
    .join("");
  printContent(
    report("productionHistory"),
    `<table><tr><th>#</th><th>RN</th><th>${report("client")}</th><th>${report("name")}</th><th>${report("completed")}</th></tr>${rows}</table>`,
    userName,
    companyName,
  );
}

export async function exportAnalyticsPdf(
  stats,
  workerPerformance,
  userName,
  companyName,
) {
  await initPdf();
  const doc = createDoc("p");
  const startY = addPdfHeader(
    doc,
    report("analytics"),
    userName,
    companyName,
  );
  const t1 = autoTable(doc, {
    startY,
    head: [[report("metric"), report("value")]],
    body: [
      [report("projects"), String(stats.projects || 0)],
      [report("completed"), String(stats.completed || 0)],
      [report("averageDuration"), stats.avgDuration || "0 h"],
      [report("accuracy"), stats.accuracy || "0%"],
    ],
    ...tableStyles,
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 60 } },
  });
  if (workerPerformance && workerPerformance.length) {
    autoTable(doc, {
      startY: t1.finalY + 8,
      head: [
        [report("worker"), report("value"), report("tasks"), report("averageTime"), report("efficiency")],
      ],
      body: workerPerformance.map((w) => [
        w.name || "",
        w.value ?? "",
        w.tasks ?? "",
        w.avgTime || "",
        w.efficiency || "",
      ]),
      ...tableStyles,
    });
  }
  doc.save(`${report("fileAnalytics")}.pdf`);
}

export function printAnalytics(
  stats,
  workerPerformance,
  userName,
  companyName,
) {
  let info = `<table>
    <tr><th>${report("metric")}</th><th>${report("value")}</th></tr>
    <tr><td><b>${report("projects")}</b></td><td>${stats.projects || 0}</td></tr>
    <tr><td><b>${report("completed")}</b></td><td>${stats.completed || 0}</td></tr>
    <tr><td><b>${report("averageDuration")}</b></td><td>${
      stats.avgDuration || "0 h"
    }</td></tr>
    <tr><td><b>${report("accuracy")}</b></td><td>${stats.accuracy || "0%"}</td></tr>
  </table>`;
  if (workerPerformance && workerPerformance.length) {
    info += `<br><h3 style="color:#2b579a;">${report("workers")}</h3><table><tr><th>${report("worker")}</th><th>${report("value")}</th><th>${report("tasks")}</th><th>${report("averageTime")}</th><th>${report("efficiency")}</th></tr>`;
    workerPerformance.forEach((w) => {
      info += `<tr><td>${w.name || ""}</td><td>${w.value ?? ""}</td><td>${
        w.tasks ?? ""
      }</td><td>${w.avgTime || ""}</td><td>${w.efficiency || ""}</td></tr>`;
    });
    info += "</table>";
  }
  printContent(report("analytics"), info, userName, companyName);
}

export async function exportDashboardPdf(
  projects,
  assemblies,
  userName,
  companyName,
) {
  await initPdf();
  const doc = createDoc("l");
  const startY = addPdfHeader(
    doc,
    report("activeProjects"),
    userName,
    companyName,
  );
  const t1 = autoTable(doc, {
    startY,
    head: [["RN", report("name"), report("client"), report("worksOn"), report("progress"), report("estimated")]],
    body: projects.map((p) => [
      p.rn || "",
      p.name || "",
      p.client || "",
      p.worksOn || "",
      p.progress ?? 0,
      p.est || "-",
    ]),
    ...tableStyles,
  });
  if (assemblies && assemblies.length) {
    autoTable(doc, {
      startY: t1.finalY + 8,
      head: [["RN", report("operation"), report("worksOn"), report("estimated"), report("progress")]],
      body: assemblies.map((a) => [
        a.rn || "",
        operation(a.operation) || "",
        a.worksOn || "",
        a.est || "-",
        a.progress ?? 0,
      ]),
      ...tableStyles,
    });
  }
  doc.save(`${report("fileDashboard")}.pdf`);
}

export function printDashboard(projects, assemblies, userName, companyName) {
  let info = `<h3 style="color:#2b579a;">${report("activeProjects")}</h3><table><tr><th>RN</th><th>${report("name")}</th><th>${report("client")}</th><th>${report("worksOn")}</th><th>${report("progress")}</th><th>${report("estimated")}</th></tr>`;
  projects.forEach((p) => {
    info += `<tr><td>${p.rn || ""}</td><td>${p.name || ""}</td><td>${
      p.client || ""
    }</td><td>${p.worksOn || ""}</td><td>${p.progress ?? 0}</td><td>${
      p.est || "-"
    }</td></tr>`;
  });
  info += "</table>";
  if (assemblies && assemblies.length) {
    info += `<br><h3 style="color:#2b579a;">${report("assemblies")}</h3><table><tr><th>RN</th><th>${report("operation")}</th><th>${report("worksOn")}</th><th>${report("estimated")}</th><th>${report("progress")}</th></tr>`;
    assemblies.forEach((a) => {
      info += `<tr><td>${a.rn || ""}</td><td>${operation(a.operation) || ""}</td><td>${
        a.worksOn || ""
      }</td><td>${a.est || "-"}</td><td>${a.progress ?? 0}</td></tr>`;
    });
    info += "</table>";
  }
  printContent(report("activeProjects"), info, userName, companyName);
}

export async function exportProjectDetailPdf(
  project,
  drawings,
  productionPlan,
  userName,
  companyName,
  overallProgress,
  estimatedEnd,
  clientPhone,
  clientEmail,
) {
  await initPdf();
  const doc = createDoc("l");
  const title = `${report("project")}: ${project.rn || ""} – ${project.name || ""}`;
  const startY = addPdfHeader(doc, title, userName, companyName);
  autoTable(doc, {
    startY,
    head: [[report("field"), report("value")]],
    body: [
      ["RN", project.rn || ""],
      [report("name"), project.name || ""],
      [report("client"), project.client || ""],
      [report("phone"), clientPhone || "–"],
      [report("email"), clientEmail || "–"],
      [report("status"), projectStatus(project.status)],
      [
        report("startedAt"),
        (project.startedAt || project.createdAt)
          ? new Date(project.startedAt || project.createdAt).toLocaleString(reportLocale())
          : "–",
      ],
      [report("progress"), (overallProgress ?? 0) + "%"],
      [report("estimatedEnd"), estimatedEnd || "–"],
    ],
    ...tableStyles,
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
  });
  if (drawings && drawings.length) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [[report("drawingNo"), report("partName"), report("assembly"), report("weight"), report("quantity"), report("material")]],
      body: drawings.map((d) => [
        d.no || "",
        d.partName || "",
        d.assembly || "",
        d.weight || "",
        d.qty ?? "",
        d.materials || "–",
      ]),
      ...tableStyles,
    });
  }
  if (productionPlan && productionPlan.length) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [
        [
          report("drawingNo"),
          report("operation"),
          report("worksOn"),
          report("progress"),
          report("estimatedEnd"),
          report("actualEnd"),
        ],
      ],
      body: productionPlan.map((p) => [
        p.drawingNo || "",
        operation(p.operation) || "",
        p.worksOn || "",
        (p.progress ?? 0) + "%",
        p.estimatedEndDate || "–",
        p.actualEndDate || "–",
      ]),
      ...tableStyles,
    });
  }
  doc.save(`${report("fileProject")}-${(project.rn || report("fileProject")).replace(/\s+/g, "_")}.pdf`);
}

export async function exportProjectPreviewPdf(data, labels, userName, companyName) {
  await initPdf();
  const doc = createDoc("p");
  let startY = addPdfHeader(doc, labels.title, userName, companyName);
  autoTable(doc, {
    startY,
    head: [[labels.field, labels.value]],
    body: [
      [labels.rn, data.project.rn || "-"],
      [labels.name, data.project.name || "-"],
      [labels.client, data.project.client || "-"],
      [labels.drawing, [data.drawing.drawingNo, data.drawing.partName].filter(Boolean).join(" - ") || "-"],
      [labels.estimate, data.estimate || "-"],
    ],
    ...tableStyles,
  });
  startY = doc.lastAutoTable.finalY + 8;
  const sections = [
    [labels.treatments, data.treatments],
    [labels.workers, data.workers],
    [labels.materials, data.materials],
  ];
  sections.forEach(([title, rows]) => {
    doc.setFont("Roboto", "bold");
    doc.text(title, 14, startY);
    autoTable(doc, {
      startY: startY + 2,
      head: [["#", labels.description]],
      body: (rows.length ? rows : ["-"]).map((value, index) => [index + 1, value]),
      ...tableStyles,
    });
    startY = doc.lastAutoTable.finalY + 8;
  });
  const fileName = (data.project.rn || labels.fileName).replace(/[^\w-]+/g, "_");
  doc.save(`${fileName}.pdf`);
}

export function printProjectDetail(
  project,
  drawings,
  productionPlan,
  userName,
  companyName,
  overallProgress,
  estimatedEnd,
  clientPhone,
  clientEmail,
) {
  const startedAt = (project.startedAt || project.createdAt)
    ? new Date(project.startedAt || project.createdAt).toLocaleString(reportLocale())
    : "–";
  let info = `<table>
    <tr><th>${report("field")}</th><th>${report("value")}</th></tr>
    <tr><td><b>RN</b></td><td>${project.rn || ""}</td></tr>
    <tr><td><b>${report("name")}</b></td><td>${project.name || ""}</td></tr>
    <tr><td><b>${report("client")}</b></td><td>${project.client || ""}</td></tr>
    <tr><td><b>${report("phone")}</b></td><td>${clientPhone || "–"}</td></tr>
    <tr><td><b>${report("email")}</b></td><td>${clientEmail || "–"}</td></tr>
    <tr><td><b>${report("status")}</b></td><td>${projectStatus(project.status)}</td></tr>
    <tr><td><b>${report("startedAt")}</b></td><td>${startedAt}</td></tr>
    <tr><td><b>${report("progress")}</b></td><td>${overallProgress ?? 0}%</td></tr>
    <tr><td><b>${report("estimatedEnd")}</b></td><td>${estimatedEnd || "–"}</td></tr>
  </table>`;
  if (drawings && drawings.length) {
    info += `<br><h3 style="color:#2b579a;">${report("drawings")}</h3><table><tr><th>${report("drawingNo")}</th><th>${report("partName")}</th><th>${report("assembly")}</th><th>${report("weight")}</th><th>${report("quantity")}</th><th>${report("material")}</th></tr>`;
    drawings.forEach((d) => {
      info += `<tr><td>${d.no || ""}</td><td>${d.partName || ""}</td><td>${
        d.assembly || ""
      }</td><td>${d.weight || ""}</td><td>${d.qty ?? ""}</td><td>${
        d.materials || "–"
      }</td></tr>`;
    });
    info += "</table>";
  }
  if (productionPlan && productionPlan.length) {
    info += `<br><h3 style="color:#2b579a;">${report("productionPlan")}</h3><table><tr><th>${report("drawingNo")}</th><th>${report("operation")}</th><th>${report("worksOn")}</th><th>${report("progress")}</th><th>${report("estimatedEnd")}</th><th>${report("actualEnd")}</th></tr>`;
    productionPlan.forEach((p) => {
      const color =
        (p.progress ?? 0) >= 100
          ? "#27ae60"
          : (p.progress ?? 0) >= 50
          ? "#e67e22"
          : "#2196f3";
      info += `<tr><td>${p.drawingNo || ""}</td><td>${
        operation(p.operation) || ""
      }</td><td>${
        p.worksOn || ""
      }</td><td style="color:${color};font-weight:600">${
        p.progress ?? 0
      }%</td><td>${p.estimatedEndDate || "–"}</td><td>${
        p.actualEndDate || "–"
      }</td></tr>`;
    });
    info += "</table>";
  }
  printContent(
    `${report("project")}: ${project.rn || ""} – ${project.name || ""}`,
    info,
    userName,
    companyName,
  );
}
