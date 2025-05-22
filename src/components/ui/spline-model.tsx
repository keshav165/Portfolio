'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Spline component with no SSR
const Spline = dynamic(
  () => import('@splinetool/react-spline').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
);

interface SplineProps {
  scene: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function SplineModel() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
    console.error('Spline error:', event);
    setIsLoading(false);
    setError('Failed to load 3D model. Please try again later.');
  };

  return (
    <div 
      className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-transparent"
      style={{ position: 'relative', touchAction: 'none' }}
    >
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <div className="w-full h-full" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          <Spline
            scene="https://prod.spline.design/KuT8NlMsfAGLS5ra/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </Suspense>
      
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 p-4 text-center">
          <div className="text-foreground/80">
            <p className="font-medium">Couldn't load 3D model</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
