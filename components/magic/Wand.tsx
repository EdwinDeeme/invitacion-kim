'use client';

import { motion } from 'framer-motion';
import SVGWand from './SVGWand';

interface WandProps {
  isActive?: boolean;
  direction?: 'left' | 'right' | 'center';
  scale?: number;
}

/**
 * Varita mágica animada
 * Se mueve de forma natural y lanza hechizos
 */
export default function Wand({ isActive = false, direction = 'center', scale = 1 }: WandProps) {
  const getVariant = () => {
    switch (direction) {
      case 'left':
        return {
          initial: { x: -100, y: 0, opacity: 0 },
          animate: { x: 0, y: 0, opacity: 1 },
        };
      case 'right':
        return {
          initial: { x: 100, y: 0, opacity: 0 },
          animate: { x: 0, y: 0, opacity: 1 },
        };
      default:
        return {
          initial: { y: -100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
    }
  };

  const variant = getVariant();

  return (
    <motion.div
      className="relative inline-block"
      style={{ scale }}
      initial={variant.initial}
      animate={variant.animate}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        animate={
          isActive
            ? {
                y: [0, -10, 0],
                rotate: [0, 15, -15, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <SVGWand />
      </motion.div>
    </motion.div>
  );
}
