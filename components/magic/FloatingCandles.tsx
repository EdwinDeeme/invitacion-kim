'use client';

import { motion } from 'framer-motion';

interface FloatingCandlesProps {
  count?: number;
  className?: string;
}

/**
 * Velas flotantes con animación suave
 * Crean atmósfera mágica en el fondo
 */
export default function FloatingCandles({ count = 5, className = '' }: FloatingCandlesProps) {
  const safeCount = Math.max(1, count);
  const candles = Array.from({ length: safeCount }, (_, i) => {
    const base = ((i + 1) * 100) / (safeCount + 1);
    const jitter = ((i % 3) - 1) * 1.8;

    return {
      id: i,
      duration: 4.8 + (i % 5) * 0.45,
      delay: i * 0.35,
      position: base + jitter,
      bottom: 14 + (i % 3) * 8,
      scale: 0.82 + (i % 4) * 0.08,
    };
  });

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {candles.map((candle) => (
        <motion.div
          key={candle.id}
          className="absolute w-4 h-14"
          style={{ left: `${candle.position}%`, bottom: `${candle.bottom}%` }}
          initial={{ y: 0, opacity: 0.6 }}
          animate={{
            y: [-14, 10, -14],
            opacity: [0.46, 0.78, 0.46],
            scale: [candle.scale, candle.scale * 1.03, candle.scale],
          }}
          transition={{
            duration: candle.duration,
            delay: candle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Vela SVG */}
          <svg viewBox="0 0 20 44" className="w-full h-full drop-shadow-lg">
            {/* Cera */}
            <rect x="7" y="11" width="6" height="28" rx="1.2" fill="#ead7b2" opacity="0.95" />

            {/* Llama */}
            <g filter="url(#candleGlow)">
              <ellipse cx="10" cy="8" rx="2.2" ry="4.2" fill="#d7a14e" opacity="0.88" className="candle-flame" />
              <ellipse cx="10" cy="6.5" rx="1.2" ry="2.4" fill="#f7d29a" opacity="0.8" className="candle-flame" />
            </g>

            {/* Mecha */}
            <line x1="10" y1="11" x2="10" y2="6" stroke="#8b7355" strokeWidth="0.5" opacity="0.7" />

            <defs>
              <filter id="candleGlow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
