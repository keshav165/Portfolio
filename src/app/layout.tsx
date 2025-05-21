import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";
import { ThemeProvider } from "@/components/layout/theme-provider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Metadata for the application
export const metadata: Metadata = {
  title: {
    default: 'Keshav - UI/UX Designer & Frontend Developer',
    template: '%s | Keshav',
  },
  description: 'Award-winning UI/UX designer and frontend developer creating beautiful, functional, and user-centered digital experiences.',
  keywords: ['portfolio', 'designer', 'developer', 'UI/UX', 'frontend', 'react', 'nextjs'],
  authors: [{ name: 'Keshav' }],
  creator: 'Keshav',
  publisher: 'Keshav',
  metadataBase: new URL('https://keshav.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://keshav.vercel.app',
    title: 'Keshav | Portfolio',
    description: 'Award-winning UI/UX Designer & Developer creating exceptional digital experiences.',
    siteName: 'Keshav',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keshav | Portfolio',
    description: 'Award-winning UI/UX Designer & Developer creating exceptional digital experiences.',
    creator: '@keshav',
  },
};

// Viewport configuration for the application
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
