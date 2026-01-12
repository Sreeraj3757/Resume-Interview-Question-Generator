import React from 'react';
import { FileText, History, Settings, LogOut, LayoutDashboard } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Resume Analysis', icon: FileText },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl z-50">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-cyan-950/30 p-2 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <FileText size={24} className="text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight text-white italic">
            TALENT<span className="text-cyan-400">SCOUT</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">v2.0 • NEON</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4 px-4 pt-2 font-mono">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-none border-l-2 transition-all duration-200 group relative ${isActive
                  ? 'border-cyan-400 bg-cyan-950/20 text-cyan-300'
                  : 'border-transparent text-slate-500 hover:text-cyan-200 hover:bg-white/5'
                }`}
            >
              <Icon size={20} className={`transition-colors ${isActive ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'text-slate-600 group-hover:text-cyan-300'}`} />
              <span className="font-bold tracking-wide text-sm">{item.label}</span>

              {isActive && (
                <div className="absolute right-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)] animate-pulse"></div>
              )}
            </button>
          );
        })}

        <div className="mt-8 text-xs font-bold text-slate-600 uppercase tracking-widest mb-4 px-4 font-mono">
          System
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 border-l-2 border-transparent text-slate-500 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={20} />
          <span className="font-bold tracking-wide text-sm">Settings</span>
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-sm border border-slate-800 text-slate-500 hover:border-red-500/50 hover:text-red-400 hover:bg-red-950/20 transition-all group">
          <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-bold text-sm">TERMINATE SESSION</span>
        </button>
      </div>
    </div>
  );
}
