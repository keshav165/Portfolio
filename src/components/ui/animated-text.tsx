"use client";

import { motion } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export const AnimatedText = ({ text, className = '', delay = 0 }: AnimatedTextProps) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.03, 
        delayChildren: 0.04 * i + (delay || 0)
      }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      }
    }
  };

  return (
    <motion.span
      style={{ display: 'flex', overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span 
          variants={child} 
          key={index}
          style={letter === ' ' ? { width: '0.25em' } : {}}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

type AnimatedWordProps = {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
};

export const AnimatedWord = ({ text, className = '', delay = 0, staggerDelay = 0.1 }: AnimatedWordProps) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay, 
        delayChildren: delay
      }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    },
    hidden: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span 
          key={i} 
          variants={child}
          className="mr-2 whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
