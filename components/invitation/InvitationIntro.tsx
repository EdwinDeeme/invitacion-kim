'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ParticleEffect from '@/components/magic/ParticleEffect';
import FloatingCandles from '@/components/magic/FloatingCandles';
import { ArcaneSigil } from './ArcaneIcons';

interface InvitationIntroProps {
  guestName: string;
  numberOfGuests: number;
  onContinue: () => void;
}

export default function InvitationIntro({
  guestName,
  numberOfGuests,
  onContinue,
}: InvitationIntroProps) {
  const [sealPressed, setSealPressed] = useState(false);

  const recipientLine = numberOfGuests > 1
    ? `Para: ${guestName}`
    : `Para: ${guestName}`;

  const openEnvelope = () => {
    if (sealPressed) return;
    setSealPressed(true);
    setTimeout(onContinue, 900);
  };

  return (
    <div className="scene-backdrop flex items-center justify-center px-4 py-3 md:py-4 overflow-hidden">
      <ParticleEffect count={26} speed={0.22} size={1.4} className="opacity-45" />
      <FloatingCandles count={12} className="opacity-78" />
      <div className="dust-overlay" />

      <motion.div
        className="relative z-10 w-full max-w-xl text-center"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.p
          className="font-display text-[13px] uppercase tracking-[0.22em] text-magic-gold/70 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Correspondencia privada
        </motion.p>

        <motion.div
          className="envelope-shell mx-auto"
          animate={sealPressed ? { rotateX: -12, y: -14, scale: 0.98 } : { rotateX: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="envelope-flap" />

          <div className="absolute inset-x-0 top-[24%] -translate-y-1/2 text-center px-6">
            <p className="font-display text-[24px] md:text-[28px] tracking-[0.04em] text-[#2b1c11]">{recipientLine}</p>
          </div>

          <div className="absolute inset-x-0 bottom-[36%] flex justify-center z-10">
            <button
              onClick={openEnvelope}
              className="wax-seal grid place-items-center"
              aria-label="Romper sello de cera"
            >
              <motion.div
                animate={sealPressed ? { rotate: 18, scale: 0.94 } : { rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: sealPressed ? 0.4 : 5.5, repeat: sealPressed ? 0 : Infinity }}
              >
                <ArcaneSigil className="w-7 h-7" />
              </motion.div>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="mt-9 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-magic-parchment/85 text-base md:text-lg">
            Un sobre sellado aguarda en la penumbra.
          </p>
          <button onClick={openEnvelope} className="antique-button">
            Toca aquì para romper el sello y abrir carta
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
