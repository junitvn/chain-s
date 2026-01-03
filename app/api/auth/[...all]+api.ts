import { auth } from '@/lib/auth';
import { toWebRequest } from 'better-auth/expo';

export async function GET(request: Request) {
  return auth.handler(toWebRequest(request));
}

export async function POST(request: Request) {
  return auth.handler(toWebRequest(request));
}

