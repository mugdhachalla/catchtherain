import { create } from "zustand";
import { harvestLitres, monthlySplit, sizeStructure, costEstimate, paybackYears } from "../lib/calc";
import { suggestStructure } from "../lib/rules";
import { ROOF_COEFF, PRICE_PER_L } from "../data/constants";

export const useAssessment = create((set, get) => ({
  inputs: {
    city: "Delhi", rainfallMm: 790,
    roofAreaM2: 100, roofType: "rcc",
    openSpace: true, rockySoil: false, linearSpaceM: 0, dwellers: 4
  },
  results: null,

  setInput: (k, v) => set(state => ({ inputs: { ...state.inputs, [k]: v } })),

  compute: () => {
    const i = get().inputs;
    const coeff = ROOF_COEFF[i.roofType] ?? 0.8;
    const annual = Math.round(harvestLitres(i.roofAreaM2, i.rainfallMm, coeff));
    const months = monthlySplit(annual);
    const structure = suggestStructure(i);
    const peak = Math.max(...months);
    const size = sizeStructure(peak, structure);
    const cost = costEstimate(structure, size.volM3);
    const payback = paybackYears(annual, cost, PRICE_PER_L);

    set({ results: {
      annual, months, structure, sizeText: size.text, cost, payback
    }});
  }
}));
