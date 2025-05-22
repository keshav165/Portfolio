'use client';

import { useEffect } from 'react';

export function SplineModel() {
  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js';
    script.type = 'module';
    script.async = true;
    
    // Create a container for the Spline viewer
    const container = document.getElementById('spline-container');
    if (container) {
      container.innerHTML = `
        <spline-viewer 
          url="https://prod.spline.design/KuT8NlMsfAGLS5ra/scene.splinecode"
          events-target="global"
          events-toggle="true"
          events-sync="true"
          loading-anim="true"
          loading-anim-type="spinner"
          shadow-quality="soft"
          width="100%"
          height="100%"
          style="width: 100%; height: 100%; border: none; outline: none;"
        ></spline-viewer>
      `;
    }
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      id="spline-container" 
      className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
    />
  );
}
