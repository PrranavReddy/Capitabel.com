import { TileTransitionProvider } from "@/components/calculators/TileTransitionOverlay";

// Shared across /calculators and /calculators/[slug] so the tile-expand
// overlay (rendered inside TileTransitionProvider) survives the navigation
// between them instead of unmounting with the hub page. See
// components/calculators/TileTransitionOverlay.js for why that matters.
export default function CalculatorsLayout({ children }) {
  return <TileTransitionProvider>{children}</TileTransitionProvider>;
}
