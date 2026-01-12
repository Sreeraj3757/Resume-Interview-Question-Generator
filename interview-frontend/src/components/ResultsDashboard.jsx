import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Briefcase, Code, Award, Target, MessageSquare, Binary, Terminal } from 'lucide-react';

const API_BASE = 'http://127.0.0.1:8001';

export default function ResultsDashboard({ results }) {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (results && results.questions) {
            const qs = [];
            if (results.questions.skills) {
                Object.entries(results.questions.skills).forEach(([k, v]) => v.forEach(q => qs.push({ category: k, text: q, type: 'Technical' })));
            }
            if (results.questions.experience) {
                results.questions.experience.forEach(q => qs.push({ category: 'Experience', text: q, type: 'Behavioral' }));
            }
            if (results.questions.projects) {
                Object.entries(results.questions.projects).forEach(([k, v]) => v.forEach(q => qs.push({ category: k, text: q, type: 'Project' })));
            }
            setQuestions(qs);
        }
    }, [results]);

    const currentQuestion = questions[currentQuestionIdx];

    const toggleAudio = () => {
        if (!audioRef.current || !currentQuestion) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            const filename = currentQuestion.text.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
            const audioUrl = `${API_BASE}/audio/${filename}.wav`;

            if (audioRef.current.src !== audioUrl) {
                audioRef.current.src = audioUrl;
            }

            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Playback failed", e));
        }
    };

    const handleAudioEnded = () => setIsPlaying(false);

    const nextQ = () => {
        setIsPlaying(false);
        if (currentQuestionIdx < questions.length - 1) setCurrentQuestionIdx(prev => prev + 1);
    };

    const prevQ = () => {
        setIsPlaying(false);
        if (currentQuestionIdx > 0) setCurrentQuestionIdx(prev => prev - 1);
    };

    if (!results) return null;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: Terminal, label: "SKILL_NODES", val: results.skills?.length || 0, color: "text-cyan-400", border: "border-cyan-500/30" },
                    { icon: Briefcase, label: "EXP_ENTRIES", val: results.experience?.length || 0, color: "text-blue-400", border: "border-blue-500/30" },
                    { icon: Target, label: "PROJECTS", val: results.projects?.length || 0, color: "text-green-400", border: "border-green-500/30" },
                    { icon: MessageSquare, label: "QUERIES", val: questions.length, color: "text-fuchsia-400", border: "border-fuchsia-500/30" },
                ].map((item, i) => (
                    <div key={i} className={`p-6 bg-slate-900/60 border ${item.border} flex items-center gap-4 hover:bg-slate-800/50 transition-colors`}>
                        <div className={`p-2 bg-slate-950 border border-slate-700 ${item.color}`}>
                            <item.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 font-mono tracking-widest">{item.label}</p>
                            <p className={`text-2xl font-bold font-mono ${item.color} drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`}>
                                {String(item.val).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Parsed Data */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Skills Card */}
                    <div className="bg-slate-900/80 border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <Binary size={100} />
                        </div>
                        <div className="px-6 py-3 border-b border-slate-700 bg-slate-950/50 flex items-center justify-between">
                            <h3 className="font-bold text-cyan-50 flex items-center gap-2 font-mono text-sm uppercase tracking-wider">
                                <Code size={16} className="text-cyan-400" /> Detected_Skills
                            </h3>
                        </div>
                        <div className="p-6 flex flex-wrap gap-2">
                            {results.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-cyan-950/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/20 hover:border-cyan-400 cursor-default transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Experience Timeline */}
                    <div className="bg-slate-900/80 border border-slate-700">
                        <div className="px-6 py-3 border-b border-slate-700 bg-slate-950/50">
                            <h3 className="font-bold text-white flex items-center gap-2 font-mono text-sm uppercase tracking-wider">
                                <Briefcase size={16} className="text-blue-400" /> Career_Log
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-0 before:w-[1px] before:bg-slate-700">
                                {results.experience.map((exp, i) => (
                                    <div key={i} className="relative pl-10 group">
                                        <div className="absolute left-[0.65rem] top-1.5 w-2 h-2 bg-slate-950 border border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                                        <div className="text-sm text-slate-400 leading-relaxed font-mono border-l-2 border-transparent pl-2 group-hover:border-blue-500/50 group-hover:text-slate-200 transition-all">
                                            {exp}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="bg-slate-900/80 border border-slate-700">
                        <div className="px-6 py-3 border-b border-slate-700 bg-slate-950/50">
                            <h3 className="font-bold text-white flex items-center gap-2 font-mono text-sm uppercase tracking-wider">
                                <Target size={16} className="text-green-400" /> Project_Modules
                            </h3>
                        </div>
                        <div className="p-6 grid gap-4">
                            {results.projects.map((proj, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 border border-slate-800 bg-slate-950/30 hover:border-green-500/50 transition-colors group">
                                    <div className="mt-1 text-green-500/50 group-hover:text-green-400">
                                        <Target size={16} />
                                    </div>
                                    <p className="text-sm text-slate-400 font-mono group-hover:text-green-100/80">{proj}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Interview Agent */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 border border-fuchsia-600/30 sticky top-24 shadow-[0_0_20px_rgba(192,38,211,0.1)]">
                        <div className="p-1 bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-indigo-600/20">
                            <div className="bg-slate-950 p-6 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-fuchsia-400 font-mono text-xs font-bold uppercase blink">
                                        <span className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse"></span> Livesession
                                    </div>
                                    <span className="text-slate-600 font-mono text-[10px]">ID: #8821X</span>
                                </div>

                                <div className="h-[200px] flex items-center justify-center relative">
                                    {/* Audio Visualizer Decoration */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                            <div key={n} className="w-2 bg-fuchsia-500" style={{ height: `${Math.random() * 100}%` }}></div>
                                        ))}
                                    </div>

                                    {questions.length > 0 && (
                                        <div className="relative z-10 text-center">
                                            <h3 className="text-fuchsia-100 font-bold text-lg mb-2">{currentQuestion.type}</h3>
                                            <p className="text-slate-400 text-xs font-mono mb-4">{currentQuestion.category}</p>

                                            <div className="w-16 h-16 mx-auto bg-fuchsia-950 border border-fuchsia-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(217,70,239,0.3)] cursor-pointer hover:scale-110 transition-transform" onClick={toggleAudio}>
                                                {isPlaying ? <Pause className="text-fuchsia-400" /> : <Play className="text-fuchsia-400 ml-1" />}
                                            </div>
                                            <p className="text-[10px] text-fuchsia-500/50 tracking-widest uppercase">{isPlaying ? 'AUDIO_STREAM_ACTIVE' : 'AUDIO_STREAM_Idle'}</p>
                                        </div>
                                    )}
                                </div>

                                {questions.length > 0 && (
                                    <div className="mt-4 border-t border-slate-800 pt-4">
                                        <p className="text-sm text-slate-200 font-mono mb-6 min-h-[80px]">
                                            &gt; {currentQuestion.text} <span className="animate-pulse">_</span>
                                        </p>

                                        <div className="flex justify-between gap-2">
                                            <button onClick={prevQ} disabled={currentQuestionIdx === 0} className="flex-1 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 font-mono text-xs transition-all disabled:opacity-20">&lt; PREV</button>
                                            <button onClick={nextQ} disabled={currentQuestionIdx === questions.length - 1} className="flex-1 py-2 bg-fuchsia-900/30 border border-fuchsia-500/50 text-fuchsia-300 hover:bg-fuchsia-800/40 font-mono text-xs transition-all disabled:opacity-20 shadow-[0_0_10px_rgba(217,70,239,0.2)]">NEXT &gt;</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <audio
                            ref={audioRef}
                            onEnded={handleAudioEnded}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
