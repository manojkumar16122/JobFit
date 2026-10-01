import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

const requestSchema = z.object({
  resume: z.string(),
  jobDescription: z.string(),
  userApiKey: z.string().optional(),
});

const analysisSchema = z.object({
  matchScore: z.number().min(0).max(100),
  missingKeywords: z.array(z.string()),
  strengths: z.array(z.string()),
  tailoredSummary: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resume, jobDescription, userApiKey } = requestSchema.parse(body);

    const apiKey = userApiKey || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key required' }, { status: 400 });
    }

    const client = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    const completion = await client.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: 'You are an expert ATS optimizer. You must return ONLY valid JSON with fields: matchScore (number 0-100), missingKeywords (string array), strengths (string array), tailoredSummary (string).',
        },
        {
          role: 'user',
          content: `Resume: ${resume}\n\nJob Description: ${jobDescription}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      return NextResponse.json({ error: 'Empty response from model' }, { status: 502 });
    }

    const result = analysisSchema.parse(JSON.parse(content));
    return NextResponse.json(result);

  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}