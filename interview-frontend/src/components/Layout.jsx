import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
    const [activeTab, setActiveTab] = useState('dashboard');

    const getTitle = () => {
        switch (activeTab) {
            case 'dashboard': return 'Dashboard';
            case 'analysis': return 'Resume Analysis';
            case 'history': return 'History';
            default: return 'Dashboard';
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-50 flex selection:bg-cyan-500/30 selection:text-cyan-200">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
                <Header title={getTitle()} />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {typeof children === 'function' ? children({ activeTab }) : children}
                    </div>
                </main>
            </div>

            {/* Neon Ambient Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>
            </div>

            {/* Grid overlay */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-[1]"></div>
        </div>
    );
}
