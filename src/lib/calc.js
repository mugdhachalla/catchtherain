export function harvestLitres(areaM2, rainfallMm, coeff) {
  return areaM2 * rainfallMm * coeff;
}

export function monthlySplit(annual) {
  const pct = [3,3,4,5,6,10,18,18,12,9,7,5].map(p=>p/100);
  return pct.map(p=> Math.round(annual*p));
}

export function sizeStructure(peakMonthL, kind="pit") {
  if (kind==="pit") {
    const h = 1.2;
    const V = (peakMonthL/1000)*0.6;
    const d = Math.sqrt((4*V)/(Math.PI*h));
    return { text: `Pit Ø ${d.toFixed(2)} m × ${h} m`, volM3: +V.toFixed(2) };
  }
  if (kind==="trench") {
    const w=0.8, d=1.2, V=(peakMonthL/1000)*0.6;
    const L = V/(w*d);
    return { text: `Trench ${L.toFixed(2)} m × ${w} m × ${d} m`, volM3: +V.toFixed(2) };
  }
  if (kind==="shaft") return { text: "Shaft Ø 0.45 m × 8 m", volM3: 0 };
  return { text: "Storage tank (consult installer)", volM3: 0 };
}

export function costEstimate(kind, volM3=0, shaftDepthM=8) {
  if (kind==="pit") return Math.round(volM3*2000);
  if (kind==="trench") return Math.round(volM3*1200);
  if (kind==="shaft") return Math.round(shaftDepthM*3500);
  return 0;
}

export function paybackYears(annualL, costINR, pricePerL=0.5) {
  const benefit = annualL * pricePerL;
  return (costINR / Math.max(benefit,1)).toFixed(2);
}
