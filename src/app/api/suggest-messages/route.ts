import {  streamText } from 'ai';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 30;

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, personal or sensitive topics, focusing instead on universal themes and encourage friendly interaction, For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."

    const result = await streamText({
      openai: openAi,
      model: 'gpt-3.5-turbo',
      prompt,
    });

    return result.toAIStreamResponse()
    
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        { name, status, headers, message },
        { status }
      );
    } else {
      console.error("An error occurred while suggesting the messages", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}
