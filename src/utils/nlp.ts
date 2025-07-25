export async function classifyIntent(prompt: string): Promise<{ intent: string; score: number }> {
  const response = await fetch('/api/classify-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Intent classification failed');
  }

  return response.json(); 
}