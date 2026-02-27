import { useState } from "react";
import type { DrawingDetail as DrawingDetailType } from "@entities/drawing/model/detailTypes";
import DisciplineView from "./DisciplineView";
import HistoryView from "./HistoryView";
import OverlayView from "./OverlayView";
import { Tab, TABS } from "../const/TAB";

interface Props {
  drawing: DrawingDetailType;
}

export default function DrawingDetail({ drawing }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("discipline");

  return (
    <div>
      <div className="flex gap-1 border-b border-gray-200 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? "border-brand-500 text-brand-700"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "discipline" && <DisciplineView drawing={drawing} />}
      {activeTab === "history" && <HistoryView drawing={drawing} />}
      {activeTab === "overlay" && <OverlayView drawing={drawing} />}
    </div>
  );
}
