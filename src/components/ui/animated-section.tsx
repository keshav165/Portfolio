'use client';

import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState, forwardRef, MutableRefObject } from 'react';
import { useInView } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

// 🔧 Helper to safely merge refs
function mergeRefs<T = any>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref && 'current' in ref) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  fullWidth?: boolean;
  id?: string;
  threshold?: number;
  viewport?: boolean;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  fullWidth = false,
  id,
  threshold = 0.1,
  viewport = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const baseAnimation = fadeIn(direction, delay);

  const animationVariants: Variants = {
    hidden: baseAnimation.hidden,
    visible: {
      ...baseAnimation.show,
      transition: {
        ...(typeof baseAnimation.show === 'object' &&
          !('call' in baseAnimation.show) &&
          baseAnimation.show.transition),
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`${fullWidth ? 'w-full' : 'container mx-auto px-4'} ${className}`}
      initial="hidden"
      animate={viewport ? (hasAnimated ? 'visible' : 'hidden') : 'visible'}
      variants={viewport ? animationVariants : undefined}
      viewport={viewport ? { once: true, amount: threshold } : undefined}
    >
      {children}
    </motion.section>
  );
}

type AnimatedDivProps = Omit<AnimatedSectionProps, 'fullWidth' | 'id'> & {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
} & Omit<HTMLMotionProps<'div'>, 'ref' | 'onDrag'>;

export const AnimatedDiv = forwardRef<HTMLDivElement, AnimatedDivProps>(({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  viewport = true,
  threshold = 0.1,
  as: Component = motion.div,
  ...props
}, forwardedRef) => {
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, { once: true, amount: threshold });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const baseAnimation = fadeIn(direction, delay);

  const animationVariants: Variants = {
    hidden: baseAnimation.hidden,
    visible: {
      ...baseAnimation.show,
      transition: {
        ...(typeof baseAnimation.show === 'object' &&
          !('call' in baseAnimation.show) &&
          baseAnimation.show.transition),
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  return (
    <Component
      ref={mergeRefs(localRef, forwardedRef)}
      className={className}
      initial="hidden"
      animate={viewport ? (hasAnimated ? 'visible' : 'hidden') : 'visible'}
      variants={viewport ? animationVariants : undefined}
      viewport={viewport ? { once: true, amount: threshold } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

AnimatedDiv.displayName = 'AnimatedDiv';
