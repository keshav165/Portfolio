"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Real-Time Sign Language Transcription',
    description: 'Led a team in building a real-time sign language transcription system that can be integrated into video calls. Used Conv3D model to predict signs with high accuracy.',
    tags: ['Python', 'TensorFlow', 'Computer Vision', 'Keras', 'Conv3D'],
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    demo: '#',
    code: '#',
  },
  {
    title: 'NSS Connect App',
    description: 'Cross-platform app for NSS event tracking and volunteer engagement with blockchain-based certificate issuance and transparent fund records.',
    tags: ['Flutter', 'Blockchain', 'Supabase', 'Smart Contracts'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    demo: '#',
    code: '#',
  },
  {
    title: 'Pneumonia Detection System',
    description: 'Real-time model that detects pneumonia from chest X-ray images using a VGG16 deep convolutional neural network.',
    tags: ['Python', 'TensorFlow', 'Keras', 'Medical Imaging'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    demo: '#',
    code: '#',
  },
  {
    title: 'LLM Chatbot Platform',
    description: 'Full-stack chatbot platform supporting multiple open-source LLMs with real-time communication and file uploads.',
    tags: ['Ollama', 'LangChain', 'FastAPI', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    demo: '#',
    code: '#',
  },
];

export function Work() {
  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Here are some of my recent projects that showcase my expertise in AI/ML, Computer Vision, and Full-Stack Development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/50 bg-card",
                "transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              )}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-foreground/70 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 text-xs rounded-full bg-muted text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 group"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      Live Demo
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 group"
                    asChild
                  >
                    <a href={project.code} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/projects" className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
