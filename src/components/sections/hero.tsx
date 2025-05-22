"use client";

import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { ParallaxWrapper } from '@/components/ui/parallax-wrapper';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Button } from '@/components/ui/button';
import { SplineModel } from '@/components/ui/spline-model';
// @ts-ignore - Using deprecated icon to avoid additional dependencies
import { ChevronDown, ArrowRight, Github, X, Mail, Linkedin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const TITLES = [
  'Machine Learning Engineer',
  'Full Stack Developer',
  'Computer Vision Enthusiast',
  'Problem Solver',
  'Tech Enthusiast'
];

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: <Github className="h-5 w-5" />,
    url: 'https://github.com/keshav165',
    color: 'hover:bg-gray-800 hover:text-white'
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="h-5 w-5" />,
    url: 'https://www.linkedin.com/in/keshav-reddy-0261a323b/',
    color: 'hover:bg-blue-600 hover:text-white'
  },
  {
    name: 'X (Twitter)',
    icon: <X className="h-5 w-5" />,
    url: 'https://x.com/KeshavReddy29',
    color: 'hover:bg-black hover:text-white'
  },
  {
    name: 'Email',
    icon: <Mail className="h-5 w-5" />,
    url: 'mailto:keshavreddyv@gmail.com',
    color: 'hover:bg-red-500 hover:text-white'
  }
];

export function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start('visible');
  }, [currentTitleIndex, controls]);

  const fadeInVariant = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }
    }
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-24 overflow-hidden"
      id="home"
    >
      <ScrollProgress />

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <ParallaxWrapper offset={100} speed={0.5}>
          <motion.div
            className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, var(--primary) 0%, transparent 70%)',
              filter: 'blur(100px)',
              y,
              opacity,
              scale,
            }}
          />
        </ParallaxWrapper>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={staggerContainer(0.1)}
        >
          {/* Text Column */}
          <div className="space-y-6 text-center md:text-left">
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for freelance work
            </motion.div>

            <div ref={titleRef}>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                variants={fadeInVariant(0.4)}
                initial="hidden"
                animate={isTitleInView ? 'visible' : 'hidden'}
              >
                <span className="block text-foreground">Hi, I'm</span>
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Keshav
                </span>
              </motion.h1>
              <motion.p
                className="text-lg mt-4 text-muted-foreground"
                variants={fadeInVariant(0.5)}
                initial="hidden"
                animate={isTitleInView ? 'visible' : 'hidden'}
              >
                {TITLES[currentTitleIndex]} <br />
                I'm a passionate developer who loves to build innovative solutions using modern technologies.
                Let's create something amazing together!
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
            >
              <Button size="lg" className="group px-6" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View My Work <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Contact Me
              </Button>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 pt-4" 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.6
                  }
                }
              }}
            >
              {SOCIAL_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors ${link.color} relative group`}
                  whileHover={{ y: -3 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: 'easeOut'
                      }
                    }
                  }}
                >
                  {link.icon}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* 3D Model */}
          <motion.div 
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
            variants={{
              hidden: { opacity: 0, x: -40 },
              show: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.25, 0.25, 0, 1]
                }
              }
            }}
          >
            <div className="relative w-full h-full max-w-2xl">
              <SplineModel />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          className="text-sm text-muted-foreground mb-2 flex items-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 mr-2" />
          Scroll down
        </motion.span>
      </motion.div>
    </section>
  );
}
