'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
// Using span instead of Badge component

// Metadata is now handled through the layout file or page config

const projects = [
  {
    title: 'Real-Time Sign Language Transcription',
    description: 'Led a team in building a real-time sign language transcription system that can be integrated into video calls. Used Conv3D model to predict signs with high accuracy.',
    tags: ['Python', 'TensorFlow', 'Computer Vision', 'Keras', 'Conv3D'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    demo: '#',
    code: 'https://github.com/keshav165/sign-language-live-transcription',
  },
  {
    title: 'NSS Connect App',
    description: 'Cross-platform app for NSS event tracking and volunteer engagement with blockchain-based certificate issuance and transparent fund records.',
    tags: ['Flutter', 'Blockchain', 'Supabase', 'Smart Contracts'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    demo: '#',
    code: 'https://github.com/keshav165/NSS-Connect',
  },
  {
    title: 'Pneumonia Detection System',
    description: 'Real-time model that detects pneumonia from chest X-ray images using a VGG16 deep convolutional neural network.',
    tags: ['Python', 'TensorFlow', 'Keras', 'Medical Imaging'],
    image: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    demo: '#',
    code: 'https://github.com/keshav165/Pneumonia-Detection',
  },
  {
    title: 'LLM Chatbot Platform',
    description: 'Full-stack chatbot platform supporting multiple open-source LLMs with real-time communication and file uploads.',
    tags: ['Ollama', 'LangChain', 'FastAPI', 'WebSockets'],
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*_zIYIh8BwufEnQngii8lfA.png',
    demo: '#',
    code: 'https://github.com/keshav165/LLM-Chatbot-Platform',
  },
  {
    title: 'Vox-AR (Voice Assisted AR Creation)',
    description: 'Built an augmented reality application to overlay interactive digital content onto the real-world environment with 3D model generation and real-time rendering.',
    tags: ['Augmented Reality', 'Blender', '3D Modeling', 'Voice Control'],
    image: 'https://mavigadget.com/cdn/shop/files/See1e5a8dc9ba4489af76405ed971e88cJ-removebg-preview.png?v=1732016191&width=1400',
    demo: '#',
    code: 'https://github.com/keshav165/Vox-AR',
  },
  {
    title: 'Solar Grass Cutter',
    description: 'Automated grass cutting robot that detects fields through cameras, processes video feed using ML, and implements autonomous mapping.',
    tags: ['IoT', 'Robotics', 'Computer Vision', 'Embedded Systems'],
    image: 'https://assets.architecturaldigest.in/photos/60083e9908ae763b9ae8540f/1:1/w_768,h_768,c_limit/artificial-grass-turf-pros-cons-pexels-free-nature-stock-7174-1366x768.jpg',
    demo: '#',
    code: 'https://github.com/keshav165/Solar-Grass-Cutter',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my work in AI/ML, Computer Vision, and Full-Stack Development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedCard 
              key={project.title}
              delay={index * 0.1}
              className="h-full"
            >
              <div className="h-full flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-300">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="flex space-x-1" style={{ position: 'relative', zIndex: 50 }}>
                      {project.demo && project.demo !== '#' && (
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.code && project.code !== '#' && (
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                          <a href={project.code} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
