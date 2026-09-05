import React from "react";
import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-14 bg-matrix-live flex items-center justify-center px-4">
      <div className="glass-holographic rounded-3xl max-w-md w-full p-10 text-center animate-fadeIn">
        <div className="w-20 h-20 rounded-2xl glass-sapphire flex items-center justify-center mx-auto mb-5">
          <Globe size={36} className="text-blue-500" />
        </div>
        <h1 className="font-display font-black text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 leading-none mb-2">404</h1>
        <h2 className="font-display font-bold text-[20px] text-gray-900 mb-3">Domain Not Found</h2>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
          This page doesn't exist in the ESOneWorld matrix. Navigate back to the dashboard.
        </p>
        <button onClick={() => navigate("/")} className="btn-primary w-full">← Return to Dashboard</button>
      </div>
    </div>
  );
}
