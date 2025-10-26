'use client'

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-red-600">Error</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Something went wrong!</h2>
          <p className="mt-2 text-sm text-gray-600">
            An error occurred while processing your request.
          </p>
        </div>
        <div className="mt-8">
          <Button onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}