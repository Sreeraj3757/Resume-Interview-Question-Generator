import React, { useState } from 'react';
import Layout from './components/Layout';
import UploadSection from './components/UploadSection';
import ResultsDashboard from './components/ResultsDashboard';

const API_BASE = 'http://127.0.0.1:8001';

export default function App() {
  const [results, setResults] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/upload_resume/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');

    const data = await response.json();
    setResults(data);
  };

  return (
    <Layout>
      {({ activeTab }) => (
        activeTab === 'dashboard' || activeTab === 'analysis' ? (
          !results ? (
            <UploadSection onUpload={handleUpload} />
          ) : (
            <ResultsDashboard results={results} />
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <p className="font-medium">Coming Soon</p>
              <p className="text-sm">This module is under development.</p>
            </div>
          </div>
        )
      )}
    </Layout>
  );
}




