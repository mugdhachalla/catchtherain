import { create } from "zustand";
import {
  harvestLitres,
  monthlySplit,
  domesticDemandLitres,
  selfSufficiencyPct,
  monthlyDemandSplit,
  rippleStorageLitres,
  rechargePotential,
  rechargePitVolume,
  costSaving,
  designEventMm,
  designEventLitres,
  sizeStructureByEvent,
  costEstimate,
  paybackYears
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

  compute: () => {
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
  }
}));
