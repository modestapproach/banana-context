'use client';

import { useState } from 'react';
import { runContextCheck, AgentResult } from '@/lib/agents';
import Link from 'next/link';

export default function ContextCheckPage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<AgentResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRunCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults([]);
    try {
      const agentResults = await runContextCheck(input);
      setResults(agentResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">AI Context Check</h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
            &larr; Back to Dashboard
          </Link>
        </header>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <label htmlFor="context-input" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Context / Prompt
          </label>
          <textarea
            id="context-input"
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            placeholder="Describe the product context here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleRunCheck}
              disabled={loading || !input.trim()}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                loading || !input.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Running Agents...' : 'Run Context Check'}
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Agent Results</h2>
            {results.map((result, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{result.agentName}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {result.status.toUpperCase()}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 font-mono text-sm">{result.output}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
