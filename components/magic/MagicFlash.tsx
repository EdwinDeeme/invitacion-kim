'use client';

import { motion } from 'framer-motion';

interface MagicFlashProps {
  trigger?: boolean;
  duration?: number;
  intensity?: 'soft' | 'medium' | 'strong';
  onComplete?: () => void;
}

/**
 * Flash/destello mágico
 * Se usa en momentos de impacto o revelación
 */
export default function MagicFlash({
  trigger = true,
  duration = 0.3,
  intensity = 'medium',
  onComplete,
}: MagicFlashProps) {
  const maxOpacity = {
    soft: 0.3,
    medium: 0.5,
    strong: 0.8,
  };

  return (
    <motion.div
      className="absolute inset-0 bg-magic-gold pointer-events-none"
      initial={{ opacity: 0 }}
      animate={
        trigger
          ? {
              opacity: [0, maxOpacity[intensity], 0],
            }
          : { opacity: 0 }
      }
      transition={{
        duration,
        ease: 'easeOut',
        times: [0, 0.5, 1],
      }}
      onAnimationComplete={onComplete}
      style={{ pointerEvents: 'none' }}
    />
  );
}
