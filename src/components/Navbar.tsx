import { Book, Calendar, GraduationCap, Briefcase, BarChart3, Search, FileText, TrendingUp, LayoutDashboard } from "lucide-react";
import { GemId } from "@/src/types";

export function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'Book': return <Book className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'BarChart3': return <BarChart3 className={className} />;
    case 'Search': return <Search className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'LayoutDashboard': return <LayoutDashboard className={className} />;
    default: return <Book className={className} />;
  }
}

interface NavbarProps {
  activeGemId: GemId | 'dashboard';
  onSelectGem: (id: GemId | 'dashboard') => void;
}

export function Navbar({ activeGemId, onSelectGem }: NavbarProps) {
  const navItems: { id: GemId | 'dashboard', label: string, icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'university-regulations', label: 'Regulations', icon: 'Book' },
    { id: 'lesson-plan', label: 'Lesson Plan', icon: 'Calendar' },
    { id: 'academics', label: 'Academics', icon: 'GraduationCap' },
    { id: 'placements', label: 'Placements', icon: 'Briefcase' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' },
    { id: 'plagiarism', label: 'Plagiarism', icon: 'Search' },
    { id: 'docs-gen', label: 'Docs Gen', icon: 'FileText' },
    { id: 'semester-forecast', label: 'Forecast', icon: 'TrendingUp' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-full">
      <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => onSelectGem('dashboard')}>
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-sm">A</div>
        <span className="font-bold text-xl tracking-tight text-slate-800">IntelliGems</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectGem(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 ${
              activeGemId === item.id 
                ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 pl-2.5' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon name={item.icon} className={`w-5 h-5 ${activeGemId === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
            {item.label}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-white shadow-sm shrink-0">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya&backgroundColor=b6e3f4" alt="User" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">Academic Admin</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium truncate">Aditya University</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
