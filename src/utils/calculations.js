export function calcPipeCutting({
  qty,
  cuts,
  thickness,
  length,
  cutType,
  profile,
}) {
  const q = parseFloat(qty) || 0;
  const c = parseFloat(cuts) || 1;
  const t = parseFloat(thickness) || 0;
  const l = parseFloat(length) || 0;
  if (!q) return 0;

  let baseThickness;
  if (t <= 3) baseThickness = 0.8;
  else if (t <= 5) baseThickness = 1.1;
  else if (t <= 8) baseThickness = 1.5;
  else baseThickness = 2.0;

  let lengthFactor;
  if (l <= 1) lengthFactor = 1.0;
  else if (l <= 2) lengthFactor = 1.15;
  else if (l <= 3) lengthFactor = 1.3;
  else lengthFactor = 1.5;

  const cutTypeFactor = cutType === "kutni" ? 1.25 : 1.0;

  let profileFactor = 1.0;
  if (profile === "kvadratna") profileFactor = 1.05;
  else if (profile === "pravokutna") profileFactor = 1.1;

  return (
    3 + q * c * baseThickness * lengthFactor * cutTypeFactor * profileFactor
  );
}

export function calcSheetCutting({
  totalMeters,
  thickness,
  complexity,
  method,
}) {
  const m = parseFloat(totalMeters) || 0;
  const t = parseFloat(thickness) || 0;
  if (!m) return 0;

  let baseThickness;
  if (t <= 2) baseThickness = 0.8;
  else if (t <= 4) baseThickness = 1.2;
  else if (t <= 6) baseThickness = 1.8;
  else if (t <= 10) baseThickness = 2.8;
  else baseThickness = 4.0;

  const complexityFactor = complexity === "konture" ? 1.5 : 1.0;

  const methodFactors = { škare: 1.0, plazma: 0.9, laser: 0.7, brusilica: 1.4 };
  const methodFactor = methodFactors[method] || 1.0;

  return 4 + m * baseThickness * complexityFactor * methodFactor;
}

export function calcDrilling({ qty, diameter, thickness, machine }) {
  const q = parseFloat(qty) || 0;
  const d = parseFloat(diameter) || 0;
  const t = parseFloat(thickness) || 0;
  if (!q) return 0;

  let diaFactor;
  if (d <= 8) diaFactor = 1.0;
  else if (d <= 12) diaFactor = 1.2;
  else if (d <= 18) diaFactor = 1.5;
  else if (d <= 25) diaFactor = 2.0;
  else diaFactor = 2.6;

  let thickFactor;
  if (t <= 5) thickFactor = 1.0;
  else if (t <= 10) thickFactor = 1.3;
  else if (t <= 15) thickFactor = 1.7;
  else thickFactor = 2.3;

  const machineFactors = { stupna: 1.0, magnetna: 1.2, ručno: 1.5 };
  const machineFactor = machineFactors[machine] || 1.0;

  return 2 + q * 0.5 * diaFactor * thickFactor * machineFactor;
}

export function calcWelding({ meters, size, weldType, position, passes }) {
  const m = parseFloat(meters) || 0;
  const s = parseFloat(size) || 4;
  const p = parseInt(passes) || 1;
  if (!m) return 0;

  const sizeFactors = { 3: 0.8, 4: 1.0, 5: 1.2, 6: 1.45, 8: 1.9, 10: 2.4 };

  const sizes = [3, 4, 5, 6, 8, 10];
  let closest = sizes.reduce((prev, curr) =>
    Math.abs(curr - s) < Math.abs(prev - s) ? curr : prev,
  );
  const sizeFactor = sizeFactors[closest];

  const typeFactor = weldType === "sučelni" ? 1.3 : 1.0;

  const posFactors = { ravno: 1.0, vertikalno: 1.3, "iznad glave": 1.6 };
  const posFactor = posFactors[position] || 1.0;

  const passFactors = { 1: 1.0, 2: 1.6, 3: 2.2 };
  const passFactor = passFactors[p] || 1.0;

  return 5 + m * 6 * sizeFactor * typeFactor * posFactor * passFactor;
}

export function calcGrinding({ meters, grindType }) {
  const m = parseFloat(meters) || 0;
  if (!m) return 0;

  const typeFactors = { čišćenje: 0.8, standard: 1.0, estetsko: 1.5 };
  const factor = typeFactors[grindType] || 1.0;

  return 2 + m * 2.5 * factor;
}

export function calcBending({ qty, bends, length, thickness }) {
  const q = parseFloat(qty) || 0;
  const b = parseFloat(bends) || 1;
  const l = parseFloat(length) || 0;
  const t = parseFloat(thickness) || 0;
  if (!q) return 0;

  let thickFactor;
  if (t <= 2) thickFactor = 1.0;
  else if (t <= 4) thickFactor = 1.25;
  else if (t <= 6) thickFactor = 1.6;
  else thickFactor = 2.2;

  let lengthFactor;
  if (l <= 300) lengthFactor = 1.0;
  else if (l <= 1000) lengthFactor = 1.2;
  else if (l <= 2000) lengthFactor = 1.5;
  else lengthFactor = 1.9;

  return 4 + q * b * 0.7 * thickFactor * lengthFactor;
}

export function calcAssembly({ qty, mass, complexity }) {
  const q = parseFloat(qty) || 0;
  const m = parseFloat(mass) || 0;
  if (!q) return 0;

  let massFactor;
  if (m <= 10) massFactor = 1.0;
  else if (m <= 25) massFactor = 1.2;
  else if (m <= 50) massFactor = 1.5;
  else if (m <= 100) massFactor = 2.0;
  else massFactor = 2.8;

  const compFactors = { jednostavna: 1.0, srednja: 1.4, složena: 2.0 };
  const compFactor = compFactors[complexity] || 1.0;

  return 5 + q * 4 * massFactor * compFactor;
}

export function calcTimePerOperation(sections) {
  const totals = {};
  for (const section of sections) {
    const ops = {
      pipeCutting: calcPipeCutting({
        qty: section.pipeCutting?.qty,
        cuts: section.pipeCutting?.cuts,
        thickness: section.pipeCutting?.thickness,
        length: section.pipeCutting?.m,
        cutType: section.pipeCutting?.cutType,
        profile: section.pipeCutting?.profile,
      }),
      sheetCutting: calcSheetCutting({
        totalMeters: section.sheetCutting?.m,
        thickness: section.sheetCutting?.thickness,
        complexity: section.sheetCutting?.complexity,
        method: section.sheetCutting?.method,
      }),
      drilling: calcDrilling({
        qty: section.drilling?.qty,
        diameter: section.drilling?.dia,
        thickness: section.drilling?.thickness,
        machine: section.drilling?.machine,
      }),
      welding: calcWelding({
        meters: section.welding?.m,
        size: section.welding?.size,
        weldType: section.welding?.weldType,
        position: section.welding?.position,
        passes: section.welding?.passes,
      }),
      grinding: calcGrinding({
        meters: section.grinding?.m,
        grindType: section.grinding?.grindType,
      }),
      bending: calcBending({
        qty: section.bending?.qty,
        bends: section.bending?.bends,
        length: section.bending?.length,
        thickness: section.bending?.thickness,
      }),
      assembly: calcAssembly({
        qty: section.assembly?.qty,
        mass: section.assembly?.kg,
        complexity: section.assembly?.complexity,
      }),
    };
    for (const [key, val] of Object.entries(ops)) {
      if (val > 0) totals[key] = (totals[key] || 0) + val;
    }
  }
  return totals;
}

export function calcTotalTime(section) {
  let total = 0;

  total += calcPipeCutting({
    qty: section.pipeCutting?.qty,
    cuts: section.pipeCutting?.cuts,
    thickness: section.pipeCutting?.thickness,
    length: section.pipeCutting?.m,
    cutType: section.pipeCutting?.cutType,
    profile: section.pipeCutting?.profile,
  });

  total += calcSheetCutting({
    totalMeters: section.sheetCutting?.m,
    thickness: section.sheetCutting?.thickness,
    complexity: section.sheetCutting?.complexity,
    method: section.sheetCutting?.method,
  });

  total += calcDrilling({
    qty: section.drilling?.qty,
    diameter: section.drilling?.dia,
    thickness: section.drilling?.thickness,
    machine: section.drilling?.machine,
  });

  total += calcWelding({
    meters: section.welding?.m,
    size: section.welding?.size,
    weldType: section.welding?.weldType,
    position: section.welding?.position,
    passes: section.welding?.passes,
  });

  total += calcGrinding({
    meters: section.grinding?.m,
    grindType: section.grinding?.grindType,
  });

  total += calcBending({
    qty: section.bending?.qty,
    bends: section.bending?.bends,
    length: section.bending?.length,
    thickness: section.bending?.thickness,
  });

  total += calcAssembly({
    qty: section.assembly?.qty,
    mass: section.assembly?.kg,
    complexity: section.assembly?.complexity,
  });

  return total;
}

export function formatTime(minutes) {
  if (!minutes || minutes <= 0) return "–";
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m}min`;
}
