'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PaymentsPage() {
    const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'enterprise'>('pro');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Navbar - Separate from main app */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">B</div>
                                <span className="font-bold text-xl tracking-tight text-gray-900">Banana<span className="text-indigo-600">Pay</span></span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                                Back to Scanner
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Upgrade your analysis.
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Unlock deeper insights, unlimited scans, and enterprise-grade security.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <div className="relative bg-white rounded-lg p-0.5 flex sm:mt-0 shadow-sm border border-gray-200">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                type="button"
                                className={`relative w-1/2 py-2 px-6 border-transparent rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                Monthly billing
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                type="button"
                                className={`relative w-1/2 py-2 px-6 border-transparent rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 ${billingCycle === 'yearly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                Yearly billing <span className="ml-1 text-indigo-200 text-xs">(Save 20%)</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Plan Selection */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
                            <div className="p-6 sm:p-10">
                                <h3 className="text-lg font-medium text-gray-900">Select a Plan</h3>
                                <div className="mt-6 space-y-4">
                                    {/* Starter Plan */}
                                    <div
                                        onClick={() => setSelectedPlan('starter')}
                                        className={`relative rounded-lg border p-4 cursor-pointer flex justify-between items-center transition-all ${selectedPlan === 'starter' ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'}`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${selectedPlan === 'starter' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                                                {selectedPlan === 'starter' && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                                            </div>
                                            <div className="ml-4">
                                                <span className="block text-sm font-medium text-gray-900">Starter</span>
                                                <span className="block text-sm text-gray-500">Perfect for individuals and hobbyists.</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-bold text-gray-900">{billingCycle === 'yearly' ? '$190' : '$19'}</span>
                                            <span className="block text-xs text-gray-500">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                                        </div>
                                    </div>

                                    {/* Pro Plan */}
                                    <div
                                        onClick={() => setSelectedPlan('pro')}
                                        className={`relative rounded-lg border p-4 cursor-pointer flex justify-between items-center transition-all ${selectedPlan === 'pro' ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'}`}
                                    >
                                        <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                            Most Popular
                                        </div>
                                        <div className="flex items-center">
                                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${selectedPlan === 'pro' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                                                {selectedPlan === 'pro' && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                                            </div>
                                            <div className="ml-4">
                                                <span className="block text-sm font-medium text-gray-900">Pro</span>
                                                <span className="block text-sm text-gray-500">For serious analysts and small teams.</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-bold text-gray-900">{billingCycle === 'yearly' ? '$490' : '$49'}</span>
                                            <span className="block text-xs text-gray-500">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                                        </div>
                                    </div>

                                    {/* Enterprise Plan */}
                                    <div
                                        onClick={() => setSelectedPlan('enterprise')}
                                        className={`relative rounded-lg border p-4 cursor-pointer flex justify-between items-center transition-all ${selectedPlan === 'enterprise' ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'}`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${selectedPlan === 'enterprise' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                                                {selectedPlan === 'enterprise' && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                                            </div>
                                            <div className="ml-4">
                                                <span className="block text-sm font-medium text-gray-900">Enterprise</span>
                                                <span className="block text-sm text-gray-500">Custom solutions for large organizations.</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-bold text-gray-900">{billingCycle === 'yearly' ? '$990' : '$99'}</span>
                                            <span className="block text-xs text-gray-500">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
                            <div className="p-6 sm:p-10">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Details</h3>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div className="sm:col-span-6">
                                            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                                Card number
                                            </label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="card-number"
                                                    id="card-number"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:text-sm border-gray-300 rounded-md py-3 text-gray-900 border"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                                Expiration date (MM/YY)
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="expiration-date"
                                                    id="expiration-date"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 text-gray-900 border px-4"
                                                    placeholder="MM / YY"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                                                CVC
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="cvc"
                                                    id="cvc"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 text-gray-900 border px-4"
                                                    placeholder="CVC"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700">
                                                Cardholder name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="card-holder"
                                                    id="card-holder"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 text-gray-900 border px-4"
                                                    placeholder="Full name on card"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="same-as-shipping"
                                            name="same-as-shipping"
                                            type="checkbox"
                                            defaultChecked
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="same-as-shipping" className="ml-2 block text-sm text-gray-900">
                                            Billing address is the same as shipping address
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 sticky top-24">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            {selectedPlan === 'starter' ? 'Starter Plan' : selectedPlan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
                                            <span className="block text-xs text-gray-400">{billingCycle === 'yearly' ? 'Billed yearly' : 'Billed monthly'}</span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {selectedPlan === 'starter'
                                                ? (billingCycle === 'yearly' ? '$190.00' : '$19.00')
                                                : selectedPlan === 'pro'
                                                    ? (billingCycle === 'yearly' ? '$490.00' : '$49.00')
                                                    : (billingCycle === 'yearly' ? '$990.00' : '$99.00')
                                            }
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                        <div className="text-base font-medium text-gray-900">Total due today</div>
                                        <div className="text-base font-bold text-indigo-600">
                                            {selectedPlan === 'starter'
                                                ? (billingCycle === 'yearly' ? '$190.00' : '$19.00')
                                                : selectedPlan === 'pro'
                                                    ? (billingCycle === 'yearly' ? '$490.00' : '$49.00')
                                                    : (billingCycle === 'yearly' ? '$990.00' : '$99.00')
                                            }
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                        >
                                            Confirm Payment
                                        </button>
                                        <p className="mt-4 text-center text-xs text-gray-500">
                                            By confirming, you agree to our Terms of Service and Privacy Policy.
                                            <br />This is a secure 256-bit SSL encrypted payment.
                                        </p>
                                        <div className="mt-4 flex justify-center space-x-2 opacity-50 grayscale">
                                            <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                            <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                            <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-500">Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
