"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Download, ArrowRight } from 'lucide-react';

const skills = [
  'Machine Learning',
  'Computer Vision',
  'React & Next.js',
  'Python',
  'Artificial Intelligence',
  'Natural Language Processing',
  'TypeScript',
  'Three.js',
  'TensorFlow',
  'Blockchain',
  'Flutter',
  'Docker',
];

export function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto group">
              {/* Decorative background elements with hover effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/30 -rotate-6 transition-transform duration-700 group-hover:rotate-0" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/20 rotate-6 transition-transform duration-700 group-hover:rotate-0" />
              
              {/* Main photo container */}
              <div className={cn(
                "relative w-full h-full rounded-2xl overflow-hidden",
                "bg-background/50 backdrop-blur-sm border border-border/30",
                "shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-500",
                "group-hover:shadow-3xl group-hover:shadow-primary/30"
              )}>
                {/* Photo with enhanced styling */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/Keshav-Photoroom.png"
                    alt="Keshav Reddy"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                </div>
                
                {/* Text overlay with gradient */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-1"
                  >
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">Veeramreddy Keshav Reddy</h3>
                    <p className="text-white/80 font-medium">Computer Science Engineer</p>
                    <p className="text-sm text-white/60 mt-2">
                      Hyderabad, Telangana
                    </p>
                  </motion.div>
                </div>
                
                {/* Subtle reflection effect at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground">
              I'm a passionate Computer Science student at Geethanjali College of Engineering and Technology with a strong interest in Machine Learning, Computer Vision, and Full-Stack Development. I love building intelligent systems and immersive web experiences.
            </p>
            <div className="space-y-4 text-foreground/80">
              <p>
              Currently, I'm building full-stack applications, working on blockchain-integrated apps, and exploring ways to merge design with impactful functionality.
              </p>
              <p>
                My approach combines aesthetic sensibility with technical expertise, ensuring that every project I work on 
                is not only visually stunning but also performs flawlessly across all devices and platforms.
              </p>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 text-sm rounded-full bg-muted text-foreground/80 border border-border/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" className="group px-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Download CV <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group px-6" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View Work <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-gradient-to-r from-primary/5 to-transparent blur-3xl -z-10" />
    </section>
  );
}
