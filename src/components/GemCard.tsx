import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Icon } from "./Navbar";
import { Gem } from "@/src/types";

interface GemCardProps {
  gem: Gem;
  onClick: (gem: Gem) => void;
}

export function GemCard({ gem, onClick }: GemCardProps) {
  return (
    <Card className="flex flex-col border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group rounded-xl bg-white overflow-hidden h-full">
      <CardHeader className="space-y-4 p-6">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          <Icon name={gem.icon} className="w-5 h-5" />
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-lg font-bold text-slate-800 tracking-tight">
            {gem.title}
          </CardTitle>
          <CardDescription className="text-slate-500 text-sm leading-relaxed line-clamp-3">
            {gem.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto p-6 pt-0">
        <Button 
          onClick={() => onClick(gem)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 font-semibold h-10 rounded-lg shadow-sm transition-colors"
        >
          Open Gem
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
