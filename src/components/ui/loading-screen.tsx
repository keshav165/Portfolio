"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type LoadingScreenProps = {
  className?: string;
};

export function LoadingScreen({ className }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background',
        className
      )}
    >
      <div className="relative flex flex-col items-center justify-center space-y-4">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          className="text-lg font-medium text-foreground/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}
