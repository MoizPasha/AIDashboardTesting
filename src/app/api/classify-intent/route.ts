import { NextRequest, NextResponse } from 'next/server';
import { NlpManager } from 'node-nlp';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const modelPath = path.join(process.cwd(), 'src', 'models', 'intentmodel.nlp');
const manager = new NlpManager({ languages: ['en'], forceNER: false });

// Load the model once
if (existsSync(modelPath)) {
  manager.load(modelPath);
} else {
  throw new Error(`Model file not found at ${modelPath}`);
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
    }

    const result = await manager.process('en', prompt);
    const { intent, score } = result;

    return NextResponse.json({ intent, score });
  } catch (error: any) {
    console.error('Intent classification error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
