import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import robotoRegular from "@/assets/roboto-regular.js";
import robotoBold from "@/assets/roboto-bold.js";
const logoUrl = require("@/assets/logo-dmf.png");

let logoBase64 = null;

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
  const startY = addPdfHeader(doc, "Radnici / Workers", userName, companyName);
  autoTable(doc, {
    startY,
    head: [
      [
        "#",
        "Ime i prezime",
        "Kontakt",
        "CP",
        "CS",
        "D",
        "G",
        "B",
        "W",
        "A",
        "Ocjena",
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
  doc.save("radnici.pdf");
}

export async function exportClientsPdf(clients, userName, companyName) {
  await initPdf();
  const doc = createDoc("l");
  const startY = addPdfHeader(doc, "Klijenti / Clients", userName, companyName);
  autoTable(doc, {
    startY,
    head: [
      ["#", "Tip", "Naziv", "Država", "Adresa", "Kontakt", "Email", "OIB"],
    ],
    body: clients.map((c, i) => [
      i + 1,
      c.clientType === "person" ? "Osoba" : "Firma",
      c.clientName,
      c.country,
      c.adressa,
      c.contact || "",
      c.email || "",
      c.oib || "",
    ]),
    ...tableStyles,
  });
  doc.save("klijenti.pdf");
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
    "Radnik: " + (worker.fullName || ""),
    userName,
    companyName,
  );
  const t1 = autoTable(doc, {
    startY,
    head: [["Polje", "Vrijednost"]],
    body: [
      ["Ime i prezime", worker.fullName || ""],
      ["Email", worker.email || ""],
      ["Adresa", worker.address || ""],
      ["Kontakt", worker.contact || ""],
      ["Radno mjesto", worker.jobPosition || ""],
      ["Ukupna ocjena", String(totalRating)],
      ["Završeni projekti", String(projectsCompleted)],
    ],
    ...tableStyles,
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
  });
  autoTable(doc, {
    startY: t1.finalY + 8,
    head: [["Operacija", "Ocjena", "Aktivno"]],
    body: [
      [
        "Rezanje cijevi",
        ratings.pipeCutting,
        operations.pipeCutting ? "Da" : "Ne",
      ],
      [
        "Rezanje lima",
        ratings.sheetCutting,
        operations.sheetCutting ? "Da" : "Ne",
      ],
      ["Zavarivanje", ratings.welding, operations.welding ? "Da" : "Ne"],
      ["Savijanje", ratings.bending, operations.bending ? "Da" : "Ne"],
      ["Brušenje", ratings.grinding, operations.grinding ? "Da" : "Ne"],
      ["Bušenje", ratings.drilling, operations.drilling ? "Da" : "Ne"],
      ["Montaža", ratings.assembly, operations.assembly ? "Da" : "Ne"],
    ],
    ...tableStyles,
  });
  doc.save(`radnik-${(worker.fullName || "radnik").replace(/\s+/g, "_")}.pdf`);
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
    "Klijent: " + (form.clientName || ""),
    userName,
    companyName,
  );
  const t1 = autoTable(doc, {
    startY,
    head: [["Polje", "Vrijednost"]],
    body: [
      ["Tip", form.clientType === "person" ? "Osoba" : "Firma"],
      ["Naziv", form.clientName || ""],
      ["OIB", form.oib || ""],
      ["Država", form.country || ""],
      ["Adresa", form.adressa || ""],
      ["Vlasnik", form.owner || ""],
      ["Kontakt", form.contact || ""],
      ["Email", form.email || ""],
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
        head: [["Ime i prezime", "Email", "Kontakt", "Napomena"]],
        body: filled.map((p) => [p.fullName, p.email, p.contact, p.note]),
        ...tableStyles,
      });
    }
  }
  doc.save(
    `klijent-${(form.clientName || "klijent").replace(/\s+/g, "_")}.pdf`,
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
    "Radnici",
    `<table><tr><th>#</th><th>Ime i prezime</th><th>Kontakt</th><th>CP</th><th>CS</th><th>D</th><th>G</th><th>B</th><th>W</th><th>A</th><th>Ocjena</th></tr>${rows}</table>`,
    userName,
    companyName,
  );
}

export function printClientsList(clients, userName, companyName) {
  let rows = clients
    .map(
      (c, i) =>
        `<tr><td>${i + 1}</td><td>${
          c.clientType === "person" ? "Osoba" : "Firma"
        }</td><td>${c.clientName}</td><td>${c.country}</td><td>${
          c.adressa
        }</td><td>${c.contact || ""}</td><td>${c.email || ""}</td></tr>`,
    )
    .join("");
  printContent(
    "Klijenti",
    `<table><tr><th>#</th><th>Tip</th><th>Naziv</th><th>Država</th><th>Adresa</th><th>Kontakt</th><th>Email</th></tr>${rows}</table>`,
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
    <tr><th>Polje</th><th>Vrijednost</th></tr>
    <tr><td><b>Ime i prezime</b></td><td>${worker.fullName || ""}</td></tr>
    <tr><td><b>Email</b></td><td>${worker.email || ""}</td></tr>
    <tr><td><b>Adresa</b></td><td>${worker.address || ""}</td></tr>
    <tr><td><b>Kontakt</b></td><td>${worker.contact || ""}</td></tr>
    <tr><td><b>Radno mjesto</b></td><td>${worker.jobPosition || ""}</td></tr>
    <tr><td><b>Ukupna ocjena</b></td><td>${totalRating}</td></tr>
    <tr><td><b>Završeni projekti</b></td><td>${projectsCompleted}</td></tr>
  </table><br><table><tr><th>Operacija</th><th>Ocjena</th><th>Aktivno</th></tr>
    <tr><td>Rezanje cijevi</td><td>${ratings.pipeCutting}</td><td>${
    operations.pipeCutting ? "Da" : "Ne"
  }</td></tr>
    <tr><td>Rezanje lima</td><td>${ratings.sheetCutting}</td><td>${
    operations.sheetCutting ? "Da" : "Ne"
  }</td></tr>
    <tr><td>Zavarivanje</td><td>${ratings.welding}</td><td>${
    operations.welding ? "Da" : "Ne"
  }</td></tr>
    <tr><td>Savijanje</td><td>${ratings.bending}</td><td>${
    operations.bending ? "Da" : "Ne"
  }</td></tr>
    <tr><td>Brušenje</td><td>${ratings.grinding}</td><td>${
    operations.grinding ? "Da" : "Ne"
  }</td></tr>
    <tr><td>Bušenje</td><td>${ratings.drilling}</td><td>${
    operations.drilling ? "Da" : "Ne"
  }</td></tr>
    <tr><td>Montaža</td><td>${ratings.assembly}</td><td>${
    operations.assembly ? "Da" : "Ne"
  }</td></tr>
  </table>`;
  printContent("Radnik: " + worker.fullName, info, userName, companyName);
}

export function printSingleClient(
  form,
  responsiblePersons,
  userName,
  companyName,
) {
  let info = `<table>
    <tr><th>Polje</th><th>Vrijednost</th></tr>
    <tr><td><b>Tip</b></td><td>${
      form.clientType === "person" ? "Osoba" : "Firma"
    }</td></tr>
    <tr><td><b>Naziv</b></td><td>${form.clientName || ""}</td></tr>
    <tr><td><b>OIB</b></td><td>${form.oib || ""}</td></tr>
    <tr><td><b>Država</b></td><td>${form.country || ""}</td></tr>
    <tr><td><b>Adresa</b></td><td>${form.adressa || ""}</td></tr>
    <tr><td><b>Vlasnik</b></td><td>${form.owner || ""}</td></tr>
    <tr><td><b>Kontakt</b></td><td>${form.contact || ""}</td></tr>
    <tr><td><b>Email</b></td><td>${form.email || ""}</td></tr>
  </table>`;
  if (form.clientType === "company" && responsiblePersons?.length) {
    const filled = responsiblePersons.filter(
      (p) => p.fullName || p.email || p.contact,
    );
    if (filled.length) {
      info += `<br><h3 style="color:#2b579a;">Odgovorne osobe</h3><table><tr><th>Ime i prezime</th><th>Email</th><th>Kontakt</th><th>Napomena</th></tr>`;
      filled.forEach((p) => {
        info += `<tr><td>${p.fullName}</td><td>${p.email}</td><td>${p.contact}</td><td>${p.note}</td></tr>`;
      });
      info += "</table>";
    }
  }
  printContent("Klijent: " + form.clientName, info, userName, companyName);
}

export async function exportWarehousePdf(items, userName, companyName) {
  await initPdf();
  const doc = createDoc("l");
  const startY = addPdfHeader(
    doc,
    "Skladište / Warehouse",
    userName,
    companyName,
  );
  autoTable(doc, {
    startY,
    head: [["#", "Tip", "Naziv", "Specifikacija", "Količina"]],
    body: items.map((item, i) => [
      i + 1,
      item.type || "",
      item.name || "",
      item.specs || "",
      item.qty ?? 0,
    ]),
    ...tableStyles,
  });
  doc.save("skladiste.pdf");
}

export function printWarehouseList(items, userName, companyName) {
  let rows = items
    .map(
      (item, i) =>
        `<tr><td>${i + 1}</td><td>${item.type || ""}</td><td>${
          item.name || ""
        }</td><td>${item.specs || ""}</td><td>${item.qty ?? 0}</td></tr>`,
    )
    .join("");
  printContent(
    "Skladište",
    `<table><tr><th>#</th><th>Tip</th><th>Naziv</th><th>Specifikacija</th><th>Količina</th></tr>${rows}</table>`,
    userName,
    companyName,
  );
}

export async function exportHistoryPdf(projects, userName, companyName) {
  await initPdf();
  const doc = createDoc("l");
  const startY = addPdfHeader(
    doc,
    "Povijest proizvodnje / Production History",
    userName,
    companyName,
  );
  autoTable(doc, {
    startY,
    head: [["#", "RN", "Klijent", "Naziv", "Završeno"]],
    body: projects.map((p, i) => [
      i + 1,
      p.rn || "",
      p.client || "",
      p.name || "",
      p.completedOn || "",
    ]),
    ...tableStyles,
  });
  doc.save("povijest-proizvodnje.pdf");
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
    "Povijest proizvodnje",
    `<table><tr><th>#</th><th>RN</th><th>Klijent</th><th>Naziv</th><th>Završeno</th></tr>${rows}</table>`,
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
    "Analitika / Analytics",
    userName,
    companyName,
  );
  const t1 = autoTable(doc, {
    startY,
    head: [["Pokazatelj", "Vrijednost"]],
    body: [
      ["Projekti", String(stats.projects || 0)],
      ["Završeno", String(stats.completed || 0)],
      ["Prosječno trajanje", stats.avgDuration || "0h"],
      ["Točnost", stats.accuracy || "0%"],
    ],
    ...tableStyles,
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 60 } },
  });
  if (workerPerformance && workerPerformance.length) {
    autoTable(doc, {
      startY: t1.finalY + 8,
      head: [
        ["Radnik", "Vrijednost", "Zadaci", "Prosječno vrijeme", "Efikasnost"],
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
  doc.save("analitika.pdf");
}

export function printAnalytics(
  stats,
  workerPerformance,
  userName,
  companyName,
) {
  let info = `<table>
    <tr><th>Pokazatelj</th><th>Vrijednost</th></tr>
    <tr><td><b>Projekti</b></td><td>${stats.projects || 0}</td></tr>
    <tr><td><b>Završeno</b></td><td>${stats.completed || 0}</td></tr>
    <tr><td><b>Prosječno trajanje</b></td><td>${
      stats.avgDuration || "0h"
    }</td></tr>
    <tr><td><b>Točnost</b></td><td>${stats.accuracy || "0%"}</td></tr>
  </table>`;
  if (workerPerformance && workerPerformance.length) {
    info += `<br><h3 style="color:#2b579a;">Radnici</h3><table><tr><th>Radnik</th><th>Vrijednost</th><th>Zadaci</th><th>Prosječno vrijeme</th><th>Efikasnost</th></tr>`;
    workerPerformance.forEach((w) => {
      info += `<tr><td>${w.name || ""}</td><td>${w.value ?? ""}</td><td>${
        w.tasks ?? ""
      }</td><td>${w.avgTime || ""}</td><td>${w.efficiency || ""}</td></tr>`;
    });
    info += "</table>";
  }
  printContent("Analitika", info, userName, companyName);
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
    "Aktivni projekti / Active Projects",
    userName,
    companyName,
  );
  const t1 = autoTable(doc, {
    startY,
    head: [["RN", "Naziv", "Klijent", "Radi na", "Napredak (%)", "EST"]],
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
      head: [["RN", "Operacija", "Radi na", "EST", "Napredak (%)"]],
      body: assemblies.map((a) => [
        a.rn || "",
        a.operation || "",
        a.worksOn || "",
        a.est || "-",
        a.progress ?? 0,
      ]),
      ...tableStyles,
    });
  }
  doc.save("aktivni-projekti.pdf");
}

export function printDashboard(projects, assemblies, userName, companyName) {
  let info = `<h3 style="color:#2b579a;">Aktivni projekti</h3><table><tr><th>RN</th><th>Naziv</th><th>Klijent</th><th>Radi na</th><th>Napredak (%)</th><th>EST</th></tr>`;
  projects.forEach((p) => {
    info += `<tr><td>${p.rn || ""}</td><td>${p.name || ""}</td><td>${
      p.client || ""
    }</td><td>${p.worksOn || ""}</td><td>${p.progress ?? 0}</td><td>${
      p.est || "-"
    }</td></tr>`;
  });
  info += "</table>";
  if (assemblies && assemblies.length) {
    info += `<br><h3 style="color:#2b579a;">Sklopovi</h3><table><tr><th>RN</th><th>Operacija</th><th>Radi na</th><th>EST</th><th>Napredak (%)</th></tr>`;
    assemblies.forEach((a) => {
      info += `<tr><td>${a.rn || ""}</td><td>${a.operation || ""}</td><td>${
        a.worksOn || ""
      }</td><td>${a.est || "-"}</td><td>${a.progress ?? 0}</td></tr>`;
    });
    info += "</table>";
  }
  printContent("Aktivni projekti", info, userName, companyName);
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
  const title = "Projekt: " + (project.rn || "") + " – " + (project.name || "");
  const startY = addPdfHeader(doc, title, userName, companyName);
  autoTable(doc, {
    startY,
    head: [["Polje", "Vrijednost"]],
    body: [
      ["RN", project.rn || ""],
      ["Naziv", project.name || ""],
      ["Klijent", project.client || ""],
      ["Telefon", clientPhone || "–"],
      ["Email", clientEmail || "–"],
      ["Status", project.status || "active"],
      [
        "Započeto",
        (project.startedAt || project.createdAt)
          ? new Date(project.startedAt || project.createdAt).toLocaleString("hr-HR")
          : "–",
      ],
      ["Napredak", (overallProgress ?? 0) + "%"],
      ["Predviđeni završetak", estimatedEnd || "–"],
    ],
    ...tableStyles,
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
  });
  if (drawings && drawings.length) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [["Br. nacrta", "Naziv dijela", "Sklop", "Težina", "Količina"]],
      body: drawings.map((d) => [
        d.no || "",
        d.partName || "",
        d.assembly || "",
        d.weight || "",
        d.qty ?? "",
      ]),
      ...tableStyles,
    });
  }
  if (productionPlan && productionPlan.length) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [
        [
          "Br. nacrta",
          "Operacija",
          "Radi na",
          "Proces (%)",
          "Predviđeni završetak",
          "Stvarni završetak",
        ],
      ],
      body: productionPlan.map((p) => [
        p.drawingNo || "",
        p.operation || "",
        p.worksOn || "",
        (p.progress ?? 0) + "%",
        p.estimatedEndDate || "–",
        p.actualEndDate || "–",
      ]),
      ...tableStyles,
    });
  }
  doc.save(`projekt-${(project.rn || "projekt").replace(/\s+/g, "_")}.pdf`);
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
    ? new Date(project.startedAt || project.createdAt).toLocaleString("hr-HR")
    : "–";
  let info = `<table>
    <tr><th>Polje</th><th>Vrijednost</th></tr>
    <tr><td><b>RN</b></td><td>${project.rn || ""}</td></tr>
    <tr><td><b>Naziv</b></td><td>${project.name || ""}</td></tr>
    <tr><td><b>Klijent</b></td><td>${project.client || ""}</td></tr>
    <tr><td><b>Telefon</b></td><td>${clientPhone || "–"}</td></tr>
    <tr><td><b>Email</b></td><td>${clientEmail || "–"}</td></tr>
    <tr><td><b>Status</b></td><td>${project.status || "active"}</td></tr>
    <tr><td><b>Započeto</b></td><td>${startedAt}</td></tr>
    <tr><td><b>Napredak</b></td><td>${overallProgress ?? 0}%</td></tr>
    <tr><td><b>Predviđeni završetak</b></td><td>${estimatedEnd || "–"}</td></tr>
  </table>`;
  if (drawings && drawings.length) {
    info += `<br><h3 style="color:#2b579a;">Nacrti</h3><table><tr><th>Br. nacrta</th><th>Naziv dijela</th><th>Sklop</th><th>Težina</th><th>Količina</th></tr>`;
    drawings.forEach((d) => {
      info += `<tr><td>${d.no || ""}</td><td>${d.partName || ""}</td><td>${
        d.assembly || ""
      }</td><td>${d.weight || ""}</td><td>${d.qty ?? ""}</td></tr>`;
    });
    info += "</table>";
  }
  if (productionPlan && productionPlan.length) {
    info += `<br><h3 style="color:#2b579a;">Plan proizvodnje</h3><table><tr><th>Br. nacrta</th><th>Operacija</th><th>Radi na</th><th>Proces (%)</th><th>Predviđeni završetak</th><th>Stvarni završetak</th></tr>`;
    productionPlan.forEach((p) => {
      const color =
        (p.progress ?? 0) >= 100
          ? "#27ae60"
          : (p.progress ?? 0) >= 50
          ? "#e67e22"
          : "#2196f3";
      info += `<tr><td>${p.drawingNo || ""}</td><td>${
        p.operation || ""
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
    "Projekt: " + (project.rn || "") + " – " + (project.name || ""),
    info,
    userName,
    companyName,
  );
}
