import { motion } from "motion/react";
import { GEMS, Gem } from "@/src/types";
import { GemCard } from "./GemCard";

interface DashboardProps {
  onSelectGem: (gem: Gem) => void;
}

export function Dashboard({ onSelectGem }: DashboardProps) {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Academic Intelligence Dashboard
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Specialized Gemini Gems for the Aditya University ecosystem
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
        {GEMS.map((gem, index) => (
          <motion.div
            key={gem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <GemCard gem={gem} onClick={onSelectGem} />
          </motion.div>
        ))}
      </section>
    </div>
  );
}
