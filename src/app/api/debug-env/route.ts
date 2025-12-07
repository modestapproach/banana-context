import { NextResponse } from 'next/server';

export async function GET() {
    const key = process.env.GOOGLE_GEMINI_API_KEY;
    return NextResponse.json({
        status: key ? 'loaded' : 'missing',
        length: key ? key.length : 0
    });
}
