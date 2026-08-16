'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagicSparklesProps {
  count?: number;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}

/**
 * Destellos mágicos que aparecen y desaparecen
 * Ideal para momentos de revelación
 */
export default function MagicSparkles({
  count = 8,
  duration = 0.8,
  delay = 0,
  onComplete,
}: MagicSparklesProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newSparkles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setSparkles(newSparkles);

      const completeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, duration * 1000);

      return () => clearTimeout(completeTimer);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [count, duration, delay, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-magic-gold rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            y: -30,
          }}
          transition={{
            duration,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
