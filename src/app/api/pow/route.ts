import { NextResponse } from 'next/server';
import { issueProofOfWorkChallenge, POW_DIFFICULTY } from '@/lib/proof-of-work';

export async function GET() {
  try {
    const { challenge, timestamp } = await issueProofOfWorkChallenge();
    return NextResponse.json(
      { challenge, difficulty: POW_DIFFICULTY, timestamp, expiresIn: 300 },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json({ error: 'Verification service unavailable' }, { status: 503 });
  }
}
