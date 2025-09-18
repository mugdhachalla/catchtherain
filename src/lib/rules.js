export function suggestStructure({ openSpace, rockySoil, linearSpaceM }) {
  if (openSpace && linearSpaceM >= 5) return "trench";
  if (openSpace && !rockySoil) return "pit";
  if (!openSpace || rockySoil) return "shaft";
  return "tank";
}
