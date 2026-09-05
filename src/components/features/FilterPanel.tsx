import React from "react";
import { VISUAL_FILTERS } from "@/constants";
import { useAdminContext } from "@/stores/AdminContext";

interface FilterPanelProps {
  onClose: () => void;
}

export default function FilterPanel({ onClose }: FilterPanelProps) {
  const { settings, setFilter } = useAdminContext();

  return (
    <div className="glass-crystal rounded-2xl p-5 w-64">
      <h3 className="font-display font-semibold text-[15px] text-gray-900 mb-4 flex items-center gap-2">
        <span>✨</span> Visual Filters
      </h3>
      <div className="space-y-1">
        {VISUAL_FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => { setFilter(f.id); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all ${
              settings.filterActive === f.id
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <span className="text-base w-6 text-center">{f.icon}</span>
            <span>{f.label}</span>
            {settings.filterActive === f.id && (
              <span className="ml-auto text-emerald-600 text-xs font-bold">●</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
