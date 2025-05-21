'use client';

import { motion } from 'framer-motion';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export const FadeIn = ({ children, delay = 0, className = '', y = 20 }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut', delay }}
    viewport={{ once: true, margin: '-100px' }}
    className={className}
  >
    {children}
  </motion.div>
);

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
};

export const StaggerContainer = ({
  children,
  className = '',
  staggerChildren = 0.1,
  delayChildren = 0.1,
}: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-100px' }}
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren,
          delayChildren,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay = 0) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
        delay,
      },
    },
  };
};

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
};
