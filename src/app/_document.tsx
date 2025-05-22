import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to required domains */}
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="preconnect" href="https://www.gstatic.com" />
        
        {/* Preload Spline viewer script */}
        <link 
          rel="preload" 
          href="https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js" 
          as="script"
        />
        
        {/* Add CSP meta tag as a fallback */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content={`
            default-src 'self' data: blob: https:;
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
            style-src 'self' 'unsafe-inline' https:;
            img-src 'self' data: blob: https:;
            connect-src 'self' https: wss:;
            frame-src 'self' https:;
            worker-src 'self' blob: https:;
            media-src 'self' https:;
            font-src 'self' https: data:;
            manifest-src 'self' https:;
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            upgrade-insecure-requests;
            block-all-mixed-content;
          `.replace(/\s+/g, ' ').trim()}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
