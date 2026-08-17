'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArcaneSigil, HogwartsCrest } from './ArcaneIcons';

interface HogwartsLetterProps {
  guestName: string;
  onContinue: () => void;
}

export default function HogwartsLetter({ guestName, onContinue }: HogwartsLetterProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onContinue, 1300);
  };

  return (
    <div className="scene-backdrop flex items-center justify-center px-4 py-4 md:py-8">
      <div className="dust-overlay" />

      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.96, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="parchment-panel p-6 md:p-8"
          style={{ transformStyle: 'preserve-3d' }}
          animate={opened ? { rotateX: -12, y: -22 } : { rotateX: 0 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-magic-night border border-magic-gold/40 px-4 py-2">
            <ArcaneSigil className="w-7 h-7" />
          </div>

          <div className="text-center pt-3">
            <div className="flex justify-center mt-2 mb-1">
              <HogwartsCrest className="w-14 h-14" />
            </div>
            <h2 className="font-display text-5xl md:text-5xl text-[#2b1d10] mt-2">Carta de Convocatoria</h2>
            <p className="ink-script text-xl md:text-xl text-[#3e2a17] mt-2 leading-tight">
              <span className="block">Archivo ceremonial</span>
              <span className="block">Uso exclusivo del destinatario</span>
            </p>
          </div>

          <div className="glyph-divider mt-6 mb-6">Anuncio oficial</div>

          <div className="ink-box p-5 md:p-6 space-y-4 text-[#2a1c11]">
            <img
              src="/carta.png"
              alt="Carta de Hogwarts"
              className="w-full max-h-48 object-cover border border-[#6a4d2a]/30"
              loading="lazy"
              decoding="async"
            />
            <p className="ink-script text-lg md:text-xl leading-relaxed">
              Por medio de la presente, se extiende una invitacion de caracter extraordinario para {guestName},
              con el fin de asistir a una celebracion privada preparada con reserva absoluta y espiritu festivo.
            </p>
            <p className="text-base uppercase tracking-[0.12em] text-[#4a351f]">
              Mantener la sorpresa hasta el gran momento.
            </p>
          </div>

          <div className="mt-7 flex justify-center">
            <button onClick={handleOpen} className="antique-button flex items-center justify-center leading-none">
              Desplegar pergamino interior
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
