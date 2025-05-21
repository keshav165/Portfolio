'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">
            Oops!
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Something went wrong
          </h2>
        </div>
        
        <p className="text-foreground/70">
          We're sorry, but an unexpected error has occurred. Please try again or contact support if the problem persists.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            onClick={() => reset()}
            className="group"
          >
            <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-destructive/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-destructive/5 to-transparent blur-3xl" />
      </div>
    </div>
  );
}
