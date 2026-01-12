import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Cpu, Zap } from 'lucide-react';

export default function UploadSection({ onUpload }) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile) => {
        if (selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('System Error: Invalid File Format. PDF Required.');
            setFile(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;
        setLoading(true);
        try {
            await onUpload(file);
        } catch (err) {
            console.error(err);
            setError('Upload Sequence Failed. Retry.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pt-10">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase glitch-effect">
                    Initialize <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Analysis</span>
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto text-sm font-mono border-l-2 border-cyan-500/50 pl-4 py-1 text-left">
                    {'>>'} SYSTEM READY<br />
                    {'>>'} UPLOAD CANDIDATE DATA FOR PROCESSING...
                </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-md rounded-none border border-slate-700 relative group overflow-hidden">
                {/* Animated corner borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

                <div className="p-1">
                    <div
                        className={`relative border border-dashed p-16 transition-all duration-300 flex flex-col items-center justify-center text-center bg-slate-950/80
              ${dragActive
                                ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                                : 'border-slate-800 hover:border-cyan-500/30'
                            }
            `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {!file ? (
                            <>
                                <div className="w-20 h-20 bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
                                    <Upload size={32} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Drop Resume Data</h3>
                                <p className="text-slate-500 mb-8 font-mono text-xs text-cyan-700">Format: .PDF // Max: 10MB</p>

                                <label className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-cyan-600/10 border border-cyan-500/50 hover:bg-cyan-500/20 hover:border-cyan-400 cursor-pointer group">
                                    <span className="absolute flex items-center justify-center w-full h-full text-cyan-400 transition-all duration-300 transform group-hover:translate-x-full ease">Select File</span>
                                    <span className="relative invisible">Select File</span>
                                    <span className="absolute flex items-center justify-center w-full h-full text-cyan-400 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 ease">
                                        <FileText size={18} className="mr-2" /> Browsing...
                                    </span>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </>
                        ) : (
                            <div className="space-y-4 w-full max-w-md border border-slate-800 bg-slate-900/50 p-6 relative">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <FileText size={24} className="text-green-500" />
                                        <div className="text-left">
                                            <h3 className="text-lg font-bold text-white truncate max-w-[200px]">{file.name}</h3>
                                            <p className="text-slate-500 text-xs font-mono">{(file.size / 1024).toFixed(2)} KB // LOADED</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="text-xs text-red-500 hover:text-red-400 font-mono hover:underline uppercase"
                                    >
                                        [DISCARD]
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="px-1 pb-1">
                        <div className="bg-red-950/30 text-red-400 p-4 border border-red-500/30 flex items-center gap-3 text-sm font-mono">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    </div>
                )}

                <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-end gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={!file || loading}
                        className={`
              flex items-center gap-3 px-8 py-3 font-bold text-sm tracking-widest uppercase transition-all border
              ${!file || loading
                                ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                                : 'bg-cyan-600/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                            }
            `}
                    >
                        {loading ? (
                            <>
                                <RefreshCw size={18} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Initialize_Analysis <Zap size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-3 gap-6 mt-16">
                {[
                    { icon: Cpu, title: "Neural Parse", desc: "Extracts key data points" },
                    { icon: RefreshCw, title: "Query Gen", desc: "Synthesizing questions" },
                    { icon: Zap, title: "Voice Synth", desc: "Audio simulation ready" }
                ].map((feature, idx) => (
                    <div key={idx} className="bg-slate-900/40 p-6 border border-slate-800 flex flex-col items-center text-center hover:border-cyan-500/30 transition-all group">
                        <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-cyan-600 mb-4 border border-slate-700 group-hover:border-cyan-500/50 group-hover:text-cyan-400 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all">
                            <feature.icon size={20} />
                        </div>
                        <h4 className="font-bold text-slate-200 mb-1 font-mono text-sm uppercase">{feature.title}</h4>
                        <p className="text-[10px] text-slate-500 font-mono">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
