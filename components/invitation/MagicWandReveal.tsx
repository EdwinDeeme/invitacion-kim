'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import ParticleEffect from '@/components/magic/ParticleEffect';
import { eventConfig, getFormattedDateTime } from '@/data/eventConfig';
import { ArcaneSigil, ArtifactIcon } from './ArcaneIcons';

interface MagicWandRevealProps {
  guestName: string;
  numberOfGuests: number;
  onContinue: () => void;
}

export default function MagicWandReveal({ guestName, numberOfGuests, onContinue }: MagicWandRevealProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const isSingular = numberOfGuests === 1;

  const lines = useMemo(
    () => [
      `${isSingular ? 'Estimado' : 'Estimados'} ${guestName}:`,
      isSingular
        ? 'Tengo el enorme placer de informarte que has sido convocado a una celebracion reservada.'
        : 'Tenemos el enorme placer de informarles que han sido convocados a una celebracion reservada.',
      `${eventConfig.celebrant.name}`,
      isSingular
        ? 'Tu invitacion ha sido registrada para este gran encuentro.'
        : 'Su invitacion ha sido registrada para este gran encuentro.',
    ],
    [guestName, isSingular]
  );

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const timer = setTimeout(() => {
      setLineIndex((prev) => prev + 1);
    }, lineIndex === 0 ? 1000 : 1700);

    return () => clearTimeout(timer);
  }, [lineIndex, lines.length, onContinue]);

  return (
    <div className="scene-backdrop flex items-center justify-center px-4 py-3 md:py-4">
      <ParticleEffect count={22} speed={0.2} size={1.2} className="opacity-45" />
      <div className="dust-overlay" />

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          className="parchment-panel px-5 py-6 md:px-8 md:py-8"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="glyph-divider">Registro encantado</div>
            <ArcaneSigil className="w-7 h-7" />
          </div>

          <div className="relative min-h-[200px] md:min-h-[220px] ink-box p-4 md:p-5">
            <svg viewBox="0 0 540 180" className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" fill="none" aria-hidden="true">
              <path
                className="reveal-stroke"
                d="M24 42 C120 10, 180 90, 276 62 C334 46, 382 22, 516 40"
                stroke="#7b6334"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                className="reveal-stroke"
                style={{ animationDelay: '0.6s' }}
                d="M24 104 C130 130, 230 90, 310 122 C388 152, 458 110, 516 128"
                stroke="#7b6334"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative z-10 space-y-4 text-[#2a1b10]">
              {lines.slice(0, lineIndex).map((line, i) => (
                <motion.p
                  key={`${line}-${i}`}
                  initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.65 }}
                  className={i === 2 ? 'font-display text-4xl md:text-5xl ink-title' : 'ink-script text-lg md:text-xl leading-relaxed'}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {lineIndex >= lines.length && (
            <motion.div
              className="mt-6 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-3 text-[#2a1b10]">
                <div className="ink-box p-4">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.15em] text-[#4a341c] mb-2">
                    <ArtifactIcon kind="info" className="w-5 h-5" />
                    Fecha y hora
                  </div>
                  <p className="text-base md:text-lg">{getFormattedDateTime()}</p>
                </div>

                <div className="ink-box p-4">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.15em] text-[#4a341c] mb-2">
                    <ArtifactIcon kind="location" className="w-5 h-5" />
                    Lugar
                  </div>
                  <p className="text-base md:text-lg">{eventConfig.event.location}</p>
                </div>
              </div>

              <p className="text-sm md:text-base uppercase tracking-[0.08em] text-[#4d341f]">{eventConfig.event.additionalInfo}</p>

              <div className="pt-1">
                <button onClick={onContinue} className="antique-button flex items-center justify-center leading-none">
                  Continuar ritual de invitacion
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
