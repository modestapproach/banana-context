'use client';

import { useState } from 'react';
import Link from 'next/link';
import { enrichCompanyData, anonymizeDescription, generateInfographic, analyzeImage } from './brand-test/actions';

export default function BrandTestPage() {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [apiKey, setApiKey] = useState('');

  const [status, setStatus] = useState<'idle' | 'enriching' | 'scrubbing' | 'generating' | 'analyzing' | 'complete' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [enrichedDesc, setEnrichedDesc] = useState('');
  const [anonymizedDesc, setAnonymizedDesc] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const handleRunTest = async () => {
    if (!companyName.trim()) return;

    setStatus('enriching');
    setLogs([]);
    setEnrichedDesc('');
    setAnonymizedDesc('');
    setGeneratedImage('');
    setAnalysisResult('');

    try {
      // Step 1: Enrich
      addLog(`🔍 Searching for information about ${companyName}...`);
      let currentDesc = userDescription;

      // If user didn't provide a long description, or even if they did, we enrich it.
      // But let's append the enriched info to the user's description.
      const enriched = await enrichCompanyData(companyName, website, apiKey);
      currentDesc = `${userDescription}\n\nAdditional Info from Search:\n${enriched}`;
      setEnrichedDesc(currentDesc);
      addLog('✅ Data enriched.');

      // Step 2: Scrub
      setStatus('scrubbing');
      addLog('🧹 Anonymizing description...');
      const anonymous = await anonymizeDescription(companyName, currentDesc, apiKey);
      setAnonymizedDesc(anonymous);
      addLog('✅ Description anonymized.');

      // Step 3: Generate
      setStatus('generating');
      addLog('🎨 Generating infographic (this may take a moment)...');
      const imageBase64 = await generateInfographic(anonymous, apiKey);
      setGeneratedImage(imageBase64);
      addLog('✅ Image generated.');

      // Step 4: Analyze
      setStatus('analyzing');
      addLog('👁️ Analyzing image for brand presence...');
      const analysis = await analyzeImage(imageBase64, companyName, apiKey);
      setAnalysisResult(analysis);
      addLog('✅ Analysis complete.');

      setStatus('complete');

    } catch (error: any) {
      console.error(error);
      setStatus('error');
      addLog(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/banana-scanner-logo.png" alt="Banana Scanner Logo" className="h-16 w-16 object-contain" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Banana Scanner</h1>
              <p className="text-gray-500 mt-1">LLM Brand Presence Test</p>
            </div>
          </div>
          <Link href="/simple-test" className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded">
            Go to Simple Test
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Company Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gemini API Key (Optional)</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-900"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Leave blank to use server env var"
                  />
                  <p className="text-xs text-gray-500 mt-1">If you don't provide a key, the app will try to use the server's environment variable.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-900"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Spotify"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website (Optional)</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-900"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="e.g. spotify.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Short Description</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-900"
                    value={userDescription}
                    onChange={(e) => setUserDescription(e.target.value)}
                    placeholder="What does the company do?"
                  />
                </div>
                <button
                  onClick={handleRunTest}
                  disabled={status !== 'idle' && status !== 'complete' && status !== 'error'}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${status === 'idle' || status === 'complete' || status === 'error'
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-indigo-400 cursor-not-allowed'
                    }`}
                >
                  {status === 'idle' || status === 'complete' || status === 'error' ? 'Run Test' : 'Running...'}
                </button>
              </div>
            </div>

            {/* Logs / Progress */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Process Log</h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
                {logs.length === 0 ? <span className="text-gray-500">Waiting to start...</span> : logs.map((log, i) => (
                  <div key={i} className="mb-1">{log}</div>
                ))}
                {status === 'enriching' && <div className="animate-pulse">Enriching data...</div>}
                {status === 'scrubbing' && <div className="animate-pulse">Anonymizing...</div>}
                {status === 'generating' && <div className="animate-pulse">Generating image...</div>}
                {status === 'analyzing' && <div className="animate-pulse">Analyzing results...</div>}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Intermediate Steps (Collapsible or visible) */}
            {enrichedDesc && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Enriched & Anonymized Prompt</h3>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 max-h-40 overflow-y-auto">
                  {anonymizedDesc || enrichedDesc}
                </div>
              </div>
            )}

            {/* Generated Image */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Generated Infographic</h2>
              <div className="flex justify-center bg-gray-100 rounded-lg p-4 min-h-[300px] items-center">
                {generatedImage ? (
                  <img
                    src={`data:image/png;base64,${generatedImage}`}
                    alt="Generated Infographic"
                    className="max-w-full h-auto rounded shadow-lg"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    {status === 'generating' ? 'Generating...' : 'Image will appear here'}
                  </div>
                )}
              </div>
            </div>

            {/* Final Analysis */}
            {analysisResult && (
              <div className={`shadow rounded-lg p-6 border-l-4 ${analysisResult.includes('NOT FOUND') ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'
                }`}>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">4. Analysis Result</h2>
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-medium">
                  {analysisResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
