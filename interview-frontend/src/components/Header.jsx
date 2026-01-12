import React from 'react';
import { Bell, Search, ChevronRight } from 'lucide-react';

export default function Header({ title }) {
    return (
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                <span className="hover:text-cyan-400 cursor-pointer transition-colors hover:underline decoration-cyan-500/30 underline-offset-4">Home</span>
                <ChevronRight size={14} className="text-slate-700" />
                <span className="font-bold text-cyan-50">{title}</span>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="SEARCH_DB..."
                        className="w-64 pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-none text-sm text-cyan-100 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all placeholder:text-slate-600 font-mono"
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-950/30 rounded-lg transition-all">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-fuchsia-500 rounded-none shadow-[0_0_8px_rgba(217,70,239,0.8)]"></span>
                    </button>

                    <div className="h-8 w-px bg-slate-800"></div>

                    <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-900 p-1.5 rounded-sm transition-all pr-3 border border-transparent hover:border-slate-800 group">
                        <div className="w-9 h-9 bg-slate-800 group-hover:bg-cyan-950 rounded-sm flex items-center justify-center text-cyan-400 font-bold text-sm border border-slate-700 group-hover:border-cyan-500/30 shadow-lg">
                            RB
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-200 transition-colors">Rohith</p>
                            <p className="text-[10px] text-slate-500 font-mono uppercase">Lvl 4 Recruiter</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
