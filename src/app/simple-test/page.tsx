'use client';

import { useState } from 'react';
import { testGeminiConnection } from './actions';
import Link from 'next/link';

export default function SimpleTestPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await testGeminiConnection();
            setResult(res);
        } catch (e: any) {
            setResult({ success: false, message: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Simple API Test</h1>
            <Link href="/" className="text-blue-500 hover:underline mb-4 block">&larr; Back to Home</Link>

            <button
                onClick={runTest}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Testing...' : 'Test Connection'}
            </button>

            {result && (
                <div className={`mt-4 p-4 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <h3 className="font-bold">{result.success ? 'Success!' : 'Failed'}</h3>
                    <pre className="whitespace-pre-wrap text-sm mt-2">{result.message}</pre>
                </div>
            )}
        </div>
    );
}
