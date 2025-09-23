import rainfall from "../data/rainfall.json";

// --- Configurable constants ---
export const FIRST_FLUSH_MM = 3;       // mm per event (default)
export const CONVEYANCE_LOSS = 0.05;   // 5% loss
export const VOID_RATIO = 0.35;        // effective porosity

// --- Core formulas ---
export function harvestLitres(roofAreaM2, rainfallMm, coeff = 0.8, firstFlushMm = FIRST_FLUSH_MM) {
  const effectiveRain = Math.max(rainfallMm - firstFlushMm, 0);
  const gross = roofAreaM2 * effectiveRain * coeff;
  return Math.round(gross * (1 - CONVEYANCE_LOSS));
}

export function monthlySplit(annualLitres, city) {
  const monthly = rainfall[city]?.monthly_mm;
  if (!Array.isArray(monthly) || monthly.length !== 12) {
    return Array(12).fill(Math.round(annualLitres / 12));
  }
  const total = monthly.reduce((a, b) => a + b, 0) || 1;
  return monthly.map(mm => Math.round(annualLitres * (mm / total)));
}

export function domesticDemandLitres(dwellers, lpcd = 135) {
  return Math.round((dwellers || 0) * lpcd * 365);
}

export function selfSufficiencyPct(harvestLitres, demandLitres) {
  if (!demandLitres) return "0.0";
  return ((harvestLitres / demandLitres) * 100).toFixed(1);
}

// --- Ripple storage sizing ---
export function monthlyDemandSplit(annualDemandL) {
  const per = Math.round(annualDemandL / 12);
  return Array(12).fill(per);
}

export function rippleStorageLitres(monthlySupplyL, monthlyDemandL) {
  let S = 0, minCum = 0, cum = 0;
  for (let m = 0; m < 12; m++) {
    cum += monthlySupplyL[m] - monthlyDemandL[m];
    if (cum < minCum) minCum = cum;
    S = Math.max(S, -minCum);
  }
  return Math.round(S);
}

// --- Recharge design event ---
export function designEventMm(city) {
  const monthly = rainfall[city]?.monthly_mm || [];
  const wettest = monthly.length ? Math.max(...monthly) : 0;
  return Math.round(wettest / 6); // simple proxy
}

export function designEventLitres(roofAreaM2, eventMm, coeff = 0.8, firstFlushMm = FIRST_FLUSH_MM) {
  const eff = Math.max(eventMm - firstFlushMm, 0);
  return Math.round(roofAreaM2 * eff * coeff);
}

// --- Structure sizing by event ---
export function sizeStructureByEvent(eventLitres, kind = "pit") {
  const Veff_m3 = (eventLitres / 1000) * VOID_RATIO;
  if (kind === "pit") {
    const d = 1.0, h = 1.5;
    const geom_m3 = Math.PI * (d/2) * (d/2) * h;
    const effPer = geom_m3 * VOID_RATIO;
    const count = Math.max(1, Math.ceil(Veff_m3 / effPer));
    return { text: `Pit Ø ${d} m × ${h} m × ${count} nos`, volM3: +(count * geom_m3).toFixed(2), count };
  }
  if (kind === "trench") {
    const w = 0.6, d = 1.2;
    const geomPerM = w * d * 1.0;
    const effPerM = geomPerM * VOID_RATIO;
    const L = Math.ceil(Veff_m3 / effPerM);
    return { text: `Trench ${L} m × ${w} m × ${d} m`, volM3: +(L * geomPerM).toFixed(2), count: 1 };
  }
  if (kind === "shaft") {
    return { text: "Shaft with silt trap (consult DTW/soil)", volM3: 0, count: 1 };
  }
  return { text: "Storage tank", volM3: 0, count: 0 };
}

// --- Recharge & economics ---
export function rechargePotential(harvestLitres, storedLitres) {
  return Math.max(Math.round(harvestLitres - (storedLitres || 0)), 0);
}

export function rechargePitVolume(annualLitres) {
  return (annualLitres / 1000).toFixed(1); // info only
}

export function costSaving(harvestLitres, tariffPerL = 0.5) {
  return Math.round((harvestLitres || 0) * tariffPerL);
}

export function costEstimate(kind, volM3 = 0, shaftDepthM = 8) {
  if (kind === "pit") return Math.round(volM3 * 2000);
  if (kind === "trench") return Math.round(volM3 * 1200);
  if (kind === "shaft") return Math.round(shaftDepthM * 3500);
  return 0;
}

export function paybackYears(annualLitres, costINR, pricePerL = 0.5) {
  const benefit = annualLitres * pricePerL;
  return ((costINR || 0) / Math.max(benefit, 1)).toFixed(2);
}
