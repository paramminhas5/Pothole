import { NextResponse } from 'next/server';
import { generateChallenge, POW_DIFFICULTY } from '@/lib/proof-of-work';

// GET /api/pow — get a fresh challenge for proof-of-work
export async function GET() {
  const { challenge, timestamp } = generateChallenge();

  return NextResponse.json({
    challenge,
    difficulty: POW_DIFFICULTY,
    timestamp,
    expiresIn: 300, // 5 minutes in seconds
  });
}
