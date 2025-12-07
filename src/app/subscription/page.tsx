'use client';

import { useState } from 'react';
import { processSubscriptionUpgrade } from '@/lib/payments';
import Link from 'next/link';

export default function SubscriptionPage() {
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpgrade = async (tier: 'pro' | 'enterprise') => {
        setProcessing(true);
        setMessage('');
        try {
            await processSubscriptionUpgrade('user_123', tier);
            setMessage(`Successfully upgraded to ${tier.toUpperCase()}!`);
        } catch (error) {
            setMessage('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
                    <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
                        &larr; Back to Dashboard
                    </Link>
                </header>

                {message && (
                    <div className={`mb-6 p-4 rounded-md ${message.includes('Success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Free Tier */}
                    <div className="bg-white shadow rounded-lg p-6 border-t-4 border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Free</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">$0<span className="text-base font-normal text-gray-500">/mo</span></p>
                        <p className="mt-4 text-gray-500">Basic access to context tools.</p>
                        <button disabled className="mt-6 w-full block bg-gray-100 text-gray-400 font-bold py-2 px-4 rounded cursor-not-allowed">
                            Current Plan
                        </button>
                    </div>

                    {/* Pro Tier */}
                    <div className="bg-white shadow rounded-lg p-6 border-t-4 border-indigo-500 transform scale-105">
                        <h3 className="text-lg font-medium text-gray-900">Pro</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">$29<span className="text-base font-normal text-gray-500">/mo</span></p>
                        <p className="mt-4 text-gray-500">Advanced analysis and priority support.</p>
                        <button
                            onClick={() => handleUpgrade('pro')}
                            disabled={processing}
                            className="mt-6 w-full block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            {processing ? 'Processing...' : 'Upgrade to Pro'}
                        </button>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="bg-white shadow rounded-lg p-6 border-t-4 border-purple-500">
                        <h3 className="text-lg font-medium text-gray-900">Enterprise</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">$99<span className="text-base font-normal text-gray-500">/mo</span></p>
                        <p className="mt-4 text-gray-500">Custom agents and dedicated infrastructure.</p>
                        <button
                            onClick={() => handleUpgrade('enterprise')}
                            disabled={processing}
                            className="mt-6 w-full block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            {processing ? 'Processing...' : 'Upgrade to Enterprise'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
