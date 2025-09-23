// src/lib/calc.js
import rainfall from "../data/rainfall.json";

/** ---------------- Configurable constants ---------------- **/
export const FIRST_FLUSH_MM   = 3;     // mm discarded at start of an event
export const CONVEYANCE_LOSS  = 0.05;  // 5% (gutters, screens, etc.)
export const VOID_RATIO       = 0.35;  // gravel/sand filter pack effective porosity
export const DEFAULT_RUNOFF_C = 0.80;  // fallback roof runoff coefficient
export const LPCD             = 135;   // CPHEEO benchmark (urban)




/** ---------------- Core formulas (annual) ---------------- **/
export function harvestLitres(roofAreaM2, rainfallMm, coeff = DEFAULT_RUNOFF_C, firstFlushMm = FIRST_FLUSH_MM) {
  // First-flush is applied once as a conservative annual deduction.
  const effectiveRain = Math.max((rainfallMm ?? 0) - (firstFlushMm ?? 0), 0);
  const gross = (roofAreaM2 ?? 0) * effectiveRain * (coeff ?? DEFAULT_RUNOFF_C);
  return Math.round(gross * (1 - CONVEYANCE_LOSS));
}

export function monthlySplit(annualLitres, city) {
  const mon = rainfall[city]?.monthly_mm;
  if (!Array.isArray(mon) || mon.length !== 12) {
    return Array(12).fill(Math.round((annualLitres ?? 0) / 12));
  }
  const total = mon.reduce((a, b) => a + b, 0) || 1;
  return mon.map(mm => Math.round((annualLitres ?? 0) * (mm / total)));
}

export function domesticDemandLitres(dwellers, lpcd = LPCD) {
  return Math.round((dwellers ?? 0) * (lpcd ?? LPCD) * 365);
}

export function selfSufficiencyPct(harvestL, demandL) {
  if (!demandL) return "0.0";
  return ((harvestL / demandL) * 100).toFixed(1);
}

/** ---------------- Tank sizing (Ripple / sequent-peak) ---------------- **/
export function monthlyDemandSplit(annualDemandL) {
  const per = Math.round((annualDemandL ?? 0) / 12);
  return Array(12).fill(per);
}

export function rippleStorageLitres(monthlySupplyL, monthlyDemandL) {
  let S = 0, minCum = 0, cum = 0;
  for (let m = 0; m < 12; m++) {
    cum += (monthlySupplyL[m] ?? 0) - (monthlyDemandL[m] ?? 0);
    if (cum < minCum) minCum = cum;
    S = Math.max(S, -minCum);
  }
  return Math.round(S);
}

/** ---------------- Recharge sizing – design event ----------------
 *  1) Choose a design event P_event (mm). If no city curve/IDF, use a proxy.
 *  2) Event runoff (L) = A(m²) * C * max(P_event - firstFlush, 0)
 *  3) Net water volume (m³) = eventLitres / 1000
 *  4) Geometric volume needed (m³) = Net / VOID_RATIO
 *  5) Map to pit/trench geometry and count.
 * ----------------------------------------------------------------- */

export function designEventMm(city) {
  // Proxy:  ~1/6 of the wettest-month total as a single storm depth.
  const mm = (rainfall[city]?.monthly_mm || []).map(Number).filter(n => Number.isFinite(n));
  const wettest = mm.length ? Math.max(...mm) : 0;
  // keep it >= 0; use a simple 1/6 proxy or minimum of 5 mm if you prefer
  //const mon = rainfall[city]?.monthly_mm || [];
  //const wettest = mon.length ? Math.max(...mon) : 0;
  return Math.max(Math.round(wettest / 6), 0);
}

export function designEventLitres(roofAreaM2, eventMm, coeff = DEFAULT_RUNOFF_C, firstFlushMm = FIRST_FLUSH_MM) {
  const eff = Math.max((eventMm ?? 0) - (firstFlushMm ?? 0), 0);
  const L = (roofAreaM2 ?? 0) * eff * (coeff ?? DEFAULT_RUNOFF_C);
  return Math.round(L * (1 - CONVEYANCE_LOSS));
}

/*** export function sizeStructureByEvent({
  eventLitres,            // runoff for the chosen design event (L)
  kind = "pit",           // "pit" | "trench" | "shaft"
  voidRatio = VOID_RATIO, // 0.30–0.40 typical for coarse gravel/sand
  // Optional: infiltration during storm (advanced)
  infilMH = 0,            // tested percolation (m/h) at base
  stormHours = 0,         // assumed storm duration (h)
  baseAreaM2 = 0          // exposed base area for infil calc (m²)
}) {
  const Vnet_m3 = Math.max(eventLitres / 1000 - (infilMH * baseAreaM2 * stormHours), 0);
  const Vgeo_m3 = Vnet_m3 / (voidRatio || VOID_RATIO || 0.35);

  if (kind === "pit") {
    // Standard detail often used for rooftop recharge pits
    const d = 1.0;      // diameter (m)
    const h = 1.5;      // depth (m)
    const geomOne = Math.PI * (d / 2) * (d / 2) * h; // m³
    const count = Math.max(1, Math.ceil(Vgeo_m3 / geomOne));
    return {
      text: `Pit Ø ${d} m × ${h} m × ${count} nos`,
      volM3: +(count * geomOne).toFixed(2),
      count
    };
  }

  if (kind === "trench") {
    // Common guidance: trenches ~2–3 m deep, 0.6–1.0 m wide; length as available
    const w = 0.6, h = 1.2;        // width × depth (m)
    const geomPerM = w * h * 1.0;  // per metre length (m³)
    const L = Math.max(1, Math.ceil(Vgeo_m3 / geomPerM));
    return {
      text: `Trench ${L} m × ${w} m × ${h} m`,
      volM3: +(L * geomPerM).toFixed(2),
      count: 1
    };
  }

  if (kind === "shaft") {
    // Shaft/soak well recommendation placeholder (site-specific)
    return { text: "Recharge shaft with silt trap (consult local hydro-geology)", volM3: 0, count: 1 };
  }

  return { text: "Storage tank", volM3: 0, count: 0 };
} **/

/** Convenience: choose structure kind from site inputs */
export function suggestStructure({ openSpace, rockySoil, linearSpaceM }) {
  if (openSpace && (linearSpaceM ?? 0) >= 5) return "trench";
  if (openSpace && !rockySoil) return "pit";
  if (!openSpace || rockySoil) return "shaft";
  return "pit";
}

/** ---------------- Recharge & economics ---------------- **/
export function rechargePotential(harvestLitres, storedLitres, opts = null) {
  const surplus = Math.max(Math.round((harvestLitres ?? 0) - (storedLitres ?? 0)), 0);

  // No options? keep old behavior
  if (!opts || (!opts.openSpaceM2 && !opts.soilType)) return surplus;

  const {
    openSpaceM2 = 0,        // unpaved area available for recharge
    soilType = "loamy",     // 'sandy' | 'loamy' | 'clayey' | 'rocky'
    monsoonDays = 100       // conservative number of effective recharge days
  } = opts;

  if (openSpaceM2 <= 0) return surplus;

  const rateLpm2day = INFILTRATION_RATES[soilType] ?? INFILTRATION_RATES.loamy;
  const capacity = Math.max(0, Math.round(openSpaceM2 * rateLpm2day * monsoonDays));

  return Math.min(surplus, capacity);
}

// Keep this only as an *informational* display; not used for design
export function rechargePitVolume(annualLitres) {
  // This is the simple “annual ÷ 1000” figure from the formula sheet (info only).
  // Do NOT use it for sizing pits/trenches; use the design-event method above.
  return ((annualLitres ?? 0) / 1000).toFixed(1);
}

export function costSaving(harvestLitres, tariffPerL = 0.5) {
  return Math.round((harvestLitres ?? 0) * (tariffPerL ?? 0));
}

export function costEstimate(kind, volM3 = 0, shaftDepthM = 8) {
  if (kind === "pit")    return Math.round((volM3 ?? 0) * 2000);
  if (kind === "trench") return Math.round((volM3 ?? 0) * 1200);
  if (kind === "shaft")  return Math.round((shaftDepthM ?? 8) * 3500);
  return 0;
}

export function paybackYears(annualLitres, costINR, pricePerL = 0.5) {
  //const benefit = (annualLitres ?? 0) * (pricePerL ?? 0.5);
  const benefit = Math.max(Number(annualLitres || 0) * Number(pricePerL || 0), 1); // never 0
  const cost = Number.isFinite(Number(costINR)) ? Number(costINR) : 0;
  return ((costINR ?? 0) / Math.max(benefit, 1)).toFixed(2);
}
export function inferSoilType({ rockySoil }) {
  return rockySoil ? "rocky" : "loamy";
}

// ---------- OPTIONAL INFILTRATION SUPPORT (safe, isolated) ----------

// Typical infiltration capacity (L/m²/day)
export const INFILTRATION_RATES = {
  sandy: 300,
  loamy: 200,
  clayey: 100,
  rocky: 40,
};

// Normalize any free-text to our keys above 
// /** Infiltration rates  **/
// Typical infiltration capacity (litres per m² per day) — coarse defaults
export function normalizeSoilType(s) {
  const t = String(s || "").toLowerCase();
  if (t.includes("sand")) return "sandy";
  if (t.includes("rock")) return "rocky";
  if (t.includes("clay")) return "clayey";
  return "loamy";
}

// NEW function (doesn't replace your existing rechargePotential)
// Surplus is capped by infiltration capacity of open space.
/** export function rechargePotentialInfiltration(
  harvestLitres,
  storedLitres,
  { openSpaceM2 = 0, soilType: soilArg = "loamy", monsoonDays = 100 } = {}
) {
  const surplus = Math.max(Math.round((harvestLitres ?? 0) - (storedLitres ?? 0)), 0);
  if (openSpaceM2 <= 0) return surplus;

  // Use different variable names to avoid *any* collision
  const soilKey = normalizeSoilType(soilArg);
  const rate = INFILTRATION_RATES[soilKey] ?? INFILTRATION_RATES.loamy;

  const capacity = Math.max(0, Math.round(openSpaceM2 * rate * monsoonDays));
  return Math.min(surplus, capacity);
} **/


export function sizeStructureByEvent(eventLitres, kind = "pit") {
  const eL      = Number(eventLitres) || 0;
  const Veff_m3 = Math.max(0, (eL / 1000) * VOID_RATIO);

  if (kind === "pit") {
    const d = 1.0, h = 1.5;
    const geom = Math.PI * (d/2) * (d/2) * h;
    const effPer = geom * VOID_RATIO;
    const count = Math.max(1, Math.ceil(Veff_m3 / effPer));
    return { text: `Pit Ø ${d} m × ${h} m × ${count} nos`, volM3: +(count * geom).toFixed(2), count };
  }

  if (kind === "trench") {
    const w = 0.6, d = 1.2;
    const geomPerM = w * d * 1.0;
    const effPerM  = geomPerM * VOID_RATIO;
    const L = Math.max(1, Math.ceil(Veff_m3 / effPerM));
    return { text: `Trench ${L} m × ${w} m × ${d} m`, volM3: +(L * geomPerM).toFixed(2), count: L };
  }

  if (kind === "shaft") {
    return { text: "Shaft with silt trap (consult DTW/soil)", volM3: 0, count: 1 };
  }

  // 🔹 Default fallback — never return an empty object
  return { text: "Storage tank", volM3: 0, count: 0 };
}

/**
 * Site recharge capacity (liters) during the monsoon/active season.
 * openSpaceM2: unpaved area available for infiltration (m²)
 * soilType: one of 'sandy' | 'loamy' | 'clayey' | 'rocky'
 * monsoonDays: number of effective recharge days (conservative)
 */
export function siteRechargeCapacity(openSpaceM2 = 0, soilType = "loamy", monsoonDays = 100) {
  const area = Math.max(Number(openSpaceM2) || 0, 0);
  const rateMmPerDay = INFILTRATION_RATES[soilType] ?? INFILTRATION_RATES.loamy;
  // liters = m² * mm/day * days   (because 1 mm over 1 m² = 1 liter)
  const liters = area * rateMmPerDay * Math.max(Number(monsoonDays) || 0, 0);
  return Math.round(liters);
}

