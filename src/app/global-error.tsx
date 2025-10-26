'use client'

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <h1 className="text-6xl font-bold text-red-600">Error</h1>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Application Error
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                A critical error occurred. Please try refreshing the page.
              </p>
            </div>
            <div className="mt-8">
              <Button onClick={reset}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}