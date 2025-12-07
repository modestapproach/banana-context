'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

// Hardcoded key as requested previously
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function testGeminiConnection() {
    console.log('Testing Gemini connection...');
    try {
        // Try Gemini 3 Pro
        const model = genAI.getGenerativeModel({ model: 'gemini-3-pro-preview' });
        const result = await model.generateContent('Say "Hello, World!" if you can hear me.');
        const text = result.response.text();
        console.log('Test successful:', text);
        return { success: true, message: text };
    } catch (error: any) {
        console.error('Test failed:', error);
        return { success: false, message: error.message };
    }
}
