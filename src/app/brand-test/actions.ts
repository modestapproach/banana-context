'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const DEFAULT_API_KEY = process.env.GOOGLE_GEMINI_API_KEY || '';

function getGenAI(apiKey?: string) {
    const key = apiKey?.trim() || DEFAULT_API_KEY;
    if (!key) {
        throw new Error('API Key is missing. Please provide one in the UI or set GOOGLE_GEMINI_API_KEY in .env.local');
    }
    return new GoogleGenerativeAI(key);
}

export interface BrandTestState {
    step: 'idle' | 'enriching' | 'scrubbing' | 'generating' | 'analyzing' | 'complete' | 'error';
    enrichedDescription?: string;
    anonymizedDescription?: string;
    generatedImageBase64?: string;
    analysisResult?: string;
    error?: string;
}

// Step 1: Enrich
export async function enrichCompanyData(companyName: string, website: string, userDescription: string, apiKey?: string): Promise<string> {
    console.log(`Enriching data for ${companyName}...`);
    const genAI = getGenAI(apiKey);
    // Use Gemini 3 Pro for advanced reasoning and search
    const model = genAI.getGenerativeModel({
        model: 'gemini-3-pro-preview',
        tools: [{ googleSearch: {} }]
    });

    const prompt = `You are an expert researcher helping to verify if a company is present in an LLM's training data.
  
  Target Company: "${companyName}"
  Website: "${website || 'Not provided'}"
  User's Description: "${userDescription}"

  Task:
  1. Search for the company "${companyName}".
  2. COMPARE the search results with the User's Description.
  3. CRITICAL: If the search results describe a DIFFERENT company or a DIFFERENT industry than the User's Description, DISCARD the search results.
     - Example: User says "Tractor company", Search finds "Software company". -> Discard search.
  4. Output a detailed description of the company.
     - If search matched: Combine search info with user info.
     - If search conflicted: Use ONLY the User's Description (you can expand on it slightly using general knowledge of that type of business, but do NOT include specific facts from the conflicting search).

  Return ONLY the final description. Do not explain your reasoning.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log('Enrichment complete.');
    return text;
}

// Step 2: Scrub (Anonymize)
export async function anonymizeDescription(companyName: string, description: string, apiKey?: string): Promise<string> {
    console.log(`Anonymizing description for ${companyName}...`);
    const genAI = getGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-pro-preview' });

    const prompt = `Rewrite the following company description to be completely generic and anonymous. 
  Remove the name "${companyName}" and any specific brand names, trademarks, or identifying details. 
  Focus on the * functionality *, * service *, and * value proposition *.
  
  Original Description:
"${description}"
  
  Anonymous Description: `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log('Anonymization complete.');
    return text;
}

// Step 3: Generate Image
export async function generateInfographic(description: string, apiKey?: string): Promise<string> {
    console.log('Generating infographic with Gemini 3 Pro Image...');
    const genAI = getGenAI(apiKey);

    // Use Gemini 3 Pro Image Preview
    const model = genAI.getGenerativeModel({ model: 'gemini-3-pro-image-preview' });

    const prompt = `A professional, high - quality infographic listing companies that provide this service: ${description}. 
  The style should be modern, clean, and business - oriented. 
  Show a list of logos or names of companies that fit this description.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;

        // Check for inline data (image)
        if (!response.candidates || !response.candidates[0].content.parts) {
            throw new Error('No content parts in response');
        }

        const parts = response.candidates[0].content.parts;
        let base64Image = '';

        for (const part of parts) {
            if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                base64Image = part.inlineData.data;
                break;
            }
        }

        if (!base64Image) {
            console.error('Response structure:', JSON.stringify(response, null, 2));
            throw new Error('No image found in Gemini 3 response');
        }

        console.log('Image generation complete.');
        return base64Image;

    } catch (error: any) {
        console.error('Image generation failed:', error);
        throw new Error(`Image generation failed: ${error.message} `);
    }
}

// Step 4: Analyze (Vision)
export async function analyzeImage(base64Image: string, originalCompanyName: string, apiKey?: string): Promise<string> {
    console.log(`Analyzing image for presence of ${originalCompanyName}...`);
    const genAI = getGenAI(apiKey);
    // Use Gemini 3 Pro for vision analysis
    const model = genAI.getGenerativeModel({ model: 'gemini-3-pro-preview' });

    const prompt = `Analyze this image carefully. 
  1. List ALL company names, logos, or brands you can see in the image.
  2. Check specifically if the company "${originalCompanyName}" is present.
  3. Return a final verdict: "FOUND" or "NOT FOUND".

    Format:
  Companies Detected: [List]
Verdict: [FOUND / NOT FOUND]`;

    // Convert base64 to Part
    const imagePart = {
        inlineData: {
            data: base64Image,
            mimeType: 'image/png',
        },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text();
    console.log('Analysis complete.');
    return text;
}

