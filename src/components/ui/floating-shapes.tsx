'use client';

import { motion } from 'framer-motion';

export function FloatingShapes() {
  const shapes = [
    {
      id: 1,
      size: 'w-4 h-4',
      color: 'from-primary/20 to-primary/5',
      top: 'top-[15%]',
      left: 'left-[15%]',
      delay: 0.2,
      duration: 8,
      rotate: 0,
    },
    {
      id: 2,
      size: 'w-8 h-8',
      color: 'from-secondary/20 to-secondary/5',
      top: 'top-[25%]',
      left: 'left-[80%]',
      delay: 0.4,
      duration: 10,
      rotate: 45,
    },
    {
      id: 3,
      size: 'w-6 h-6',
      color: 'from-accent/20 to-accent/5',
      top: 'top-[70%]',
      left: 'left-[10%]',
      delay: 0.6,
      duration: 12,
      rotate: 15,
    },
    {
      id: 4,
      size: 'w-10 h-10',
      color: 'from-primary/20 to-primary/5',
      top: 'top-[80%]',
      left: 'left-[70%]',
      delay: 0.8,
      duration: 14,
      rotate: -15,
    },
    {
      id: 5,
      size: 'w-5 h-5',
      color: 'from-secondary/20 to-secondary/5',
      top: 'top-[50%]',
      left: 'left-[50%]',
      delay: 1,
      duration: 16,
      rotate: 30,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.top} ${shape.left} rounded-full bg-gradient-to-br ${shape.color} backdrop-blur-sm`}
          style={{
            rotate: shape.rotate,
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, -20, 10, 0],
            opacity: [0, 1, 0.8, 1, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
