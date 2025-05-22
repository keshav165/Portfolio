'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        class?: string;
        'loading-anim'?: string;
        'loading-anim-type'?: string;
        'events-target'?: string;
        'events-toggle'?: string;
        'events-sync'?: string;
        'shadow-quality'?: string;
        onLoad?: () => void;
        onError?: (e: Event) => void;
      };
    }
  }
}

export function SplineModel() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const loadSpline = () => {
      if (!splineRef.current) return;
      
      // Clear any existing content
      splineRef.current.innerHTML = '';
      
      // Create the spline-viewer element
      const splineViewer = document.createElement('spline-viewer');
      splineViewer.setAttribute('url', 'https://prod.spline.design/KuT8NlMsfAGLS5ra/scene.splinecode');
      splineViewer.setAttribute('loading-anim', 'true');
      splineViewer.setAttribute('loading-anim-type', 'spinner');
      splineViewer.setAttribute('events-target', 'global');
      splineViewer.setAttribute('events-toggle', 'true');
      splineViewer.setAttribute('events-sync', 'true');
      splineViewer.setAttribute('shadow-quality', 'soft');
      
      // Handle loading state
      splineViewer.onload = () => {
        setIsLoading(false);
        setError(null);
      };
      
      // Handle errors
      splineViewer.onerror = (e) => {
        console.error('Spline error:', e);
        setIsLoading(false);
        setError('Failed to load 3D model. Please try again later.');
      };
      
      // Append to container
      splineRef.current.appendChild(splineViewer);
    };

    // Check if the script is already loaded
    let script = document.querySelector('script[src*="spline-viewer"]') as HTMLScriptElement | null;
    
    if (!script) {
      // Load the script if not already loaded
      script = document.createElement('script') as HTMLScriptElement;
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js';
      script.type = 'module';
      script.async = true;
      script.onload = loadSpline as unknown as (this: GlobalEventHandlers, ev: Event) => any;
      script.onerror = () => {
        console.error('Failed to load Spline viewer script');
        setIsLoading(false);
        setError('Failed to load 3D viewer resources.');
      };
      document.head.appendChild(script);
    } else if (window.customElements && window.customElements.get('spline-viewer')) {
      // If script is already loaded and custom element is defined
      loadSpline();
    } else {
      // If script is loaded but custom element isn't defined yet
      script.addEventListener('load', loadSpline);
    }

    // Cleanup
    return () => {
      if (script) {
        script.removeEventListener('load', loadSpline);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-transparent">
      <div 
        ref={splineRef} 
        className="w-full h-full"
      />
      
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
