'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Work } from '@/components/sections/work';
import { Contact } from '@/components/sections/contact';
import { scrollToElement } from '@/lib/smooth-scroll';

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle scroll to section when page loads with a hash
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Small delay to ensure all components are mounted
        const timer = setTimeout(() => {
          scrollToElement(hash);
        }, 100);
        return () => clearTimeout(timer);
      }
    };

    // Initial check
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, [searchParams]);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
