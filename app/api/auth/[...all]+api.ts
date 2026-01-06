import { auth } from '@/lib/auth';

function logRequestHeaders(request: Request, method: string) {
  const origin = request.headers.get('origin') || 'no-origin';
  const referer = request.headers.get('referer') || 'no-referer';
  const userAgent = request.headers.get('user-agent') || 'no-user-agent';
  const url = request.url;
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`[API ${method}] Request received`);
  console.log(`Origin: ${origin}`);
  console.log(`Referer: ${referer}`);
  console.log(`User-Agent: ${userAgent}`);
  console.log(`URL: ${url}`);
  console.log('All Headers:', Object.fromEntries(request.headers.entries()));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

export async function GET(request: Request) {
  logRequestHeaders(request, 'GET');
  return auth.handler(request);
}

export async function POST(request: Request) {
  logRequestHeaders(request, 'POST');
  return auth.handler(request);
}

