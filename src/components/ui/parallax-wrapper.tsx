'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxWrapperProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  direction?: 'up' | 'down';
  speed?: number;
  opacity?: boolean;
  scale?: boolean;
}

export function ParallaxWrapper({
  children,
  offset = 50,
  className = '',
  direction = 'up',
  speed = 0.5,
  opacity = false,
  scale = false,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [offset, -offset * speed] : [-offset, offset * speed]
  );

  const opacityValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    opacity ? [0, 1, 0] : [1, 1, 1]
  );

  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scale ? [0.8, 1, 0.8] : [1, 1, 1]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y,
          opacity: opacity ? opacityValue : 1,
          scale: scale ? scaleValue : 1,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
