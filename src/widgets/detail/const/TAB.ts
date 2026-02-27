export type Tab = "discipline" | "history" | "overlay";

export const TABS: { id: Tab; label: string }[] = [
  { id: "discipline", label: "공종별" },
  { id: "history", label: "리비전 히스토리" },
  { id: "overlay", label: "오버레이" },
];
