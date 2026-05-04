import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { GemInterface } from "./components/GemInterface";
import { Gem, GEMS, GemId } from "./types";

export default function App() {
  const [activeGem, setActiveGem] = useState<Gem | null>(null);
  const [activeNavId, setActiveNavId] = useState<GemId | 'dashboard'>('dashboard');

  const handleSelectGem = (id: GemId | 'dashboard') => {
    setActiveNavId(id);
    if (id === 'dashboard') {
      setActiveGem(null);
    } else {
      const gem = GEMS.find(g => g.id === id);
      if (gem) setActiveGem(gem);
    }
  };

  const handleGemClick = (gem: Gem) => {
    setActiveGem(gem);
    setActiveNavId(gem.id);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      <Navbar activeGemId={activeNavId} onSelectGem={handleSelectGem} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="text-slate-400">Aditya IntelliGems</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-medium capitalize">
              {activeNavId === 'dashboard' ? 'Dashboard' : activeGem?.title || 'Gem Interface'}
            </span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Gemini AI Active</span>
              </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
          <AnimatePresence mode="wait">
            {!activeGem ? (
              <Dashboard key="dashboard" onSelectGem={handleGemClick} />
            ) : (
              <GemInterface 
                key={activeGem.id} 
                gem={activeGem} 
                onBack={() => handleSelectGem('dashboard')} 
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
