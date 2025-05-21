"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Project Intern',
    company: 'National Remote Sensing Centre',
    duration: 'May 2023 - Jul 2023',
    location: 'Hyderabad, Telangana',
    description: [
      'Developed a Graphical User Interface (GUI) utility application for analyzing antenna assignments at the National Remote Sensing Centre (NRSC) Shadnagar Ground Station.',
      'Created a user-friendly tool that facilitates the analysis of antenna assignments by processing antenna assignment files, satellite visibility files, and configuration files.',
      'Enhanced communication efficiency and data reception from remote sensing satellites through improved antenna assignment analysis capabilities.'
    ],
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },
  {
    id: 2,
    role: 'Bachelor\'s in Computer Science',
    company: 'Geethanjali College of Engineering and Technology',
    duration: 'Nov 2021 - May 2025',
    location: 'Hyderabad, Telangana',
    description: [
      'GPA: 7.5/10.0',
      'Key Courses: Operating Systems, Database Management, Computer Architecture, Computer Networks, Machine Learning, Data Structures and Algorithms, Artificial Intelligence',
      'Specialized in Machine Learning, Computer Vision, and Full-Stack Development'
    ],
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted-foreground">
            My professional and educational background
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 w-0.5 h-full bg-border -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative group",
                  "md:grid md:grid-cols-2",
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                )}
              >
                <div 
                  className={cn(
                    "relative p-6 rounded-xl border border-border bg-card shadow-sm transition-all duration-300",
                    "md:p-8",
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8 md:col-start-2"
                  )}
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {exp.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <h4 className="text-foreground/80 font-medium mb-2">{exp.company}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {exp.duration} • {exp.location}
                  </p>
                  <ul className="space-y-2 text-foreground/80">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Mobile connector */}
                <div className="md:hidden absolute left-6 top-6 bottom-0 w-0.5 bg-border -z-10" />
                
                {/* Desktop connector */}
                <div className="hidden md:block absolute top-6 w-4 h-0.5 bg-border -z-10" 
                  style={index % 2 === 0 ? { right: '-1rem' } : { left: '-1rem' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
