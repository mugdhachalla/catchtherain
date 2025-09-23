import { create } from "zustand";
import {
  harvestLitres,
  monthlySplit,
  domesticDemandLitres,
  monthlyDemandSplit,
  selfSufficiencyPct,
  rippleStorageLitres,
  rechargePotential,      // existing: harvest − stored
  siteRechargeCapacity,   // NEW: field capacity
  designEventMm,
  designEventLitres,
  sizeStructureByEvent,
  costEstimate,
  costSaving,
  paybackYears,
  rechargePitVolume
} from "../lib/calc";

import { suggestStructure } from "../lib/rules";
import { ROOF_COEFF, PRICE_PER_L } from "../data/constants";

export const useAssessment = create((set, get) => ({
  inputs: {
    city: "Bengaluru",
    rainfallMm: 970,
    roofAreaM2: 100,
    roofType: "rcc",
    openSpace: true,
    rockySoil: false,
    linearSpaceM: 0,
    dwellers: 4
  },
  results: {},

  setInput: (key, value) =>
    set((state) => ({ inputs: { ...state.inputs, [key]: value } })),

  /** compute: () => {
    const i = get().inputs;
    const coeff = ROOF_COEFF?.[i.roofType] ?? 0.8;

    // Annual harvest & monthly split
    const annual = harvestLitres(i.roofAreaM2, i.rainfallMm, coeff);
    const months = monthlySplit(annual, i.city);

    // Demand & storage (Ripple)
    const demandAnnual = domesticDemandLitres(i.dwellers);
    const demandMonths = monthlyDemandSplit(demandAnnual);
    const selfSuff = selfSufficiencyPct(annual, demandAnnual);
    const tankSizeRipple = rippleStorageLitres(months, demandMonths);

    // Recharge & economics
    const recharge = rechargePotential(annual, tankSizeRipple);
    const pitVol = rechargePitVolume(annual);
    const saving = costSaving(annual, PRICE_PER_L);

    // Structure sizing by design event
    const structure = suggestStructure(i);
    const eventMm = designEventMm(i.city);
    const eventLitres = designEventLitres(i.roofAreaM2, eventMm, coeff);
    const size = sizeStructureByEvent(eventLitres, structure);
    const cost = costEstimate(structure, size.volM3);
    const payback = paybackYears(annual, cost, PRICE_PER_L);
    

    set({
      results: {
        annual,
        months,
        demand: demandAnnual,
        selfSuff,
        tankSize: tankSizeRipple,
        recharge,
        pitVol,
        saving,
        structure,
        sizeText: size.text,
        cost,
        payback
      }
    });
    console.log("DBG:", { structure, eventMm, eventLitres, size, cost });
  }
}));
**/
compute: () => {
  const i = get().inputs;

  // ------------- Roof runoff -------------
  const coeff = ROOF_COEFF?.[i.roofType] ?? 0.8;
  const annual = harvestLitres(i.roofAreaM2, i.rainfallMm, coeff);   // L/year
  const months = monthlySplit(annual, i.city);                       // 12 mo split

  // ------------- Demand & storage (Ripple) -------------
  const demandAnnual = domesticDemandLitres(i.dwellers);             // L/year
  const demandMonths = monthlyDemandSplit(demandAnnual);             // 12 × equal
  const selfSuff = selfSufficiencyPct(annual, demandAnnual);         // %
  const tankSizeRipple = rippleStorageLitres(months, demandMonths);   // L

  // ------------- Recharge (two paths) -------------
  // A) Surplus available for recharge (harvest − stored)
  const surplusRecharge = rechargePotential(annual, tankSizeRipple);  // L

  // B) Site recharge capacity (soil × unpaved area × effective days)
  // If you don’t yet have an explicit open area, we use a conservative
  // estimate from the linear trench space the user gave you (1 m wide).
  let openSpaceM2 = 0;
  if (i.openSpace) {
    openSpaceM2 = Math.max(Number(i.linearSpaceM) || 0, 0) * 1; // m²
  }
  const soilType = i.rockySoil ? "rocky" : "loamy";  // later: replace with a soil dropdown
  const monsoonDays = 100;                           // conservative default
  const siteCapacity = siteRechargeCapacity(openSpaceM2, soilType, monsoonDays);

  // C) Recommended recharge = min(surplus, site capacity)
  const recommendedRecharge = Math.min(surplusRecharge, siteCapacity);

  // ------------- Economics -------------
  const pitVol = rechargePitVolume(annual);          // info-only (m³)
  const saving = costSaving(annual, PRICE_PER_L);    // ₹/year

  // ------------- Structure sizing by design event -------------
  const structure = suggestStructure(i);             // "pit" | "trench" | "shaft" | "tank"
  const eventMm = designEventMm(i.city);             // design rainfall (mm)
  const eventLitres = designEventLitres(i.roofAreaM2, eventMm, coeff); // L per event
  const size = sizeStructureByEvent(eventLitres, structure);           // { text, volM3, count }

  // Guard volM3 to avoid NaN cost if a type returns undefined
  const volForCost = Number(size?.volM3) || 0;
  const cost = costEstimate(structure, volForCost);
  const payback = paybackYears(annual, cost, PRICE_PER_L);

  // ------------- Save -------------
  set({
    results: {
      // supply & demand
      annual,
      months,
      demand: demandAnnual,
      selfSuff,
      tankSize: tankSizeRipple,

      // recharge
      surplusRecharge,      // harvest − stored
      siteCapacity,         // soil × area × days
      recommendedRecharge,  // min of the two
      pitVol,

      // economics & structure
      saving,
      structure,
      sizeText: size?.text || "-",
      cost,
      payback
    }
  });
}
}));
