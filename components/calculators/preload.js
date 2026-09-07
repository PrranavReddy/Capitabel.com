// Single source of truth for each calculator's lazy-loaded chunk, shared by
// CalculatorLoader (which actually renders it) and CalculatorTile (which
// warms it up early on hover/click). Calling the same import() specifier
// from two call sites still resolves to one cached chunk request - this
// just gives the tile a way to kick that request off well before
// navigation, instead of it only starting once the destination page mounts.
export const CALCULATOR_IMPORTS = {
  "emi-calculator": () => import("./EMICalculator"),
  "income-eligibility": () => import("./IncomeEligibilitySimulator"),
  "balance-transfer": () => import("./BalanceTransferSimulator"),
  "max-savings": () => import("./MaxSavingsCalculator"),
  "prepayment-simulator": () => import("./PrepaymentSimulator"),
};

export function preloadCalculator(slug) {
  CALCULATOR_IMPORTS[slug]?.();
}
