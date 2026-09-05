import React, { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import { useAdminContext } from "@/stores/AdminContext";
import ThemeLauncher from "@/components/features/ThemeLauncher";
import FilterPanel from "@/components/features/FilterPanel";
import LeftSidebarContent from "@/components/layout/LeftSidebarContent";
import RightSidebarContent from "@/components/layout/RightSidebarContent";

export default function StarToggle() {
  const { settings, toggleLeftSidebar, toggleRightSidebar } = useAdminContext();
  const [showTheme, setShowTheme] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (leftRef.current && !leftRef.current.contains(e.target as Node)) {
        if (settings.leftSidebarOpen) toggleLeftSidebar();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [settings.leftSidebarOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rightRef.current && !rightRef.current.contains(e.target as Node)) {
        if (settings.rightSidebarOpen) toggleRightSidebar();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [settings.rightSidebarOpen]);

  return (
    <>
      {/* LEFT STAR TOGGLE */}
      <div ref={leftRef} className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleLeftSidebar}
          className={`star-btn w-11 h-11 rounded-full flex items-center justify-center ${settings.leftSidebarOpen ? "active" : ""}`}
          title="Navigation Menu"
        >
          <Star
            size={18}
            fill={settings.leftSidebarOpen ? "#00c88a" : "none"}
            color={settings.leftSidebarOpen ? "#00c88a" : "#374151"}
            className={settings.leftSidebarOpen ? "animate-star-spin" : ""}
          />
        </button>
        {settings.leftSidebarOpen && (
          <div className="absolute top-14 left-0 animate-slide-in-left z-50">
            <LeftSidebarContent onClose={toggleLeftSidebar} />
          </div>
        )}
      </div>

      {/* RIGHT STAR TOGGLE */}
      <div ref={rightRef} className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleRightSidebar}
          className={`star-btn w-11 h-11 rounded-full flex items-center justify-center ${settings.rightSidebarOpen ? "active" : ""}`}
          title="Customization & Tools"
        >
          <Star
            size={18}
            fill={settings.rightSidebarOpen ? "#0066ff" : "none"}
            color={settings.rightSidebarOpen ? "#0066ff" : "#374151"}
            className={settings.rightSidebarOpen ? "animate-star-spin" : ""}
          />
        </button>
        {settings.rightSidebarOpen && (
          <div className="absolute top-14 right-0 animate-slide-in-right z-50">
            <RightSidebarContent onClose={toggleRightSidebar} />
          </div>
        )}
      </div>
    </>
  );
}
