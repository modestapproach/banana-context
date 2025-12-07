'use client';

import { useEffect, useState } from 'react';
import { getUser, User } from '@/lib/auth';
import Link from 'next/link';

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUser().then(setUser);
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-xl font-semibold text-gray-600">Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <Link href="/" className="text-blue-600 hover:text-blue-800">
                        &larr; Back to Home
                    </Link>
                </header>

                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">User Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-lg font-medium text-gray-900">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-lg font-medium text-gray-900">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Subscription Tier</p>
                            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${user.subscriptionTier === 'free' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                                }`}>
                                {user.subscriptionTier.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
                    <div className="flex space-x-4">
                        <Link href="/subscription" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Manage Subscription
                        </Link>
                        <Link href="/context-check" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Run Context Check
                        </Link>
                        <Link href="/brand-test" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            Brand Presence Test
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
