export const DESCRIPTIONS_MOCK: string[] = [
  "PlayStation 5 Controller Skin high quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.",
  "High quality materials and ergonomic design deliver comfort for long sessions. Durable build ensures reliable performance.",
  "Engineered for precision and responsiveness with smooth controls and consistent results across games and apps.",
  "Lightweight yet sturdy construction with a premium finish. Easy to clean and made to withstand daily use.",
  "Designed to fit seamlessly with modern setups, offering a clean look and dependable day‑to‑day usability.",
];

export function pickRandomDescription(): string {
  // TODO: Throw in utils
  const i = Math.floor(Math.random() * DESCRIPTIONS_MOCK.length);
  return DESCRIPTIONS_MOCK[i];
}
