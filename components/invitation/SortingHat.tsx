'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getRandomHouse, getHouseInfo } from '@/lib/utils';
import type { HogwartsHouse } from '@/types';
import { HouseCrest, HogwartsCrest } from './ArcaneIcons';

interface SortingHatProps {
  onComplete: (house: HogwartsHouse) => void;
  onContinue: () => void;
}

export default function SortingHat({ onComplete, onContinue }: SortingHatProps) {
  const [selectedHouse, setSelectedHouse] = useState<HogwartsHouse | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (!selectedHouse) return;

    const timer = setTimeout(() => {
      onContinue();
    }, 30000);

    return () => clearTimeout(timer);
  }, [selectedHouse, onContinue]);

  const handleSelect = () => {
    if (isSelecting) return;
    setIsSelecting(true);

    setTimeout(() => {
      const house = getRandomHouse();
      setSelectedHouse(house);
      onComplete(house);
    }, 1600);
  };

  const houseInfo = selectedHouse ? getHouseInfo(selectedHouse) : null;

  return (
    <div className="scene-backdrop flex items-center justify-center px-4 py-4">
      <div className="dust-overlay" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <AnimatePresence mode="wait">
          {!selectedHouse ? (
            <motion.div
              key="hat-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="parchment-panel p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#4a341c] mb-3">Ritual heralico</p>
                <div className="flex justify-center mb-3">
                  <HogwartsCrest className="w-14 h-14 md:w-16 md:h-16" />
                </div>
                <h2 className="ink-title text-4xl md:text-5xl">Sombrero Seleccionador</h2>
                <p className="ink-script text-[#3c2918] text-lg md:text-xl mt-4">
                  Toca el sombrero para conocer la casa que custodiara tu presencia en la celebracion.
                </p>
              </div>

              <div className="artifact-choice p-5 md:p-6">
                <motion.div
                  className="mx-auto w-[190px] md:w-[230px]"
                  animate={
                    isSelecting
                      ? { rotate: [0, -5, 6, -4, 4, 0], y: [0, -3, 2, 0] }
                      : { y: [-4, 4, -4] }
                  }
                  transition={{ duration: isSelecting ? 1.1 : 5, repeat: isSelecting ? 0 : Infinity }}
                >
                  <img
                    src="/sombrero-seleccionador.gif"
                    alt="Sombrero seleccionador"
                    className="w-full h-auto object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.65)]"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>

                <div className="mt-6">
                  <button onClick={handleSelect} className="antique-button" disabled={isSelecting}>
                    {isSelecting ? 'Consultando el destino' : 'Iniciar seleccion'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hat-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="parchment-panel p-6 md:p-8"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#4f381d] mb-4">Casa revelada</p>
              <div className="flex justify-center mb-4">
                <HouseCrest house={selectedHouse} className="w-24 h-28" />
              </div>
              <h3 className={`text-5xl md:text-6xl font-display ${houseInfo?.color}`}>{houseInfo?.name.toUpperCase()}</h3>
              <p className="ink-script text-base md:text-lg text-[#362414] mt-4">{houseInfo?.description}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#4b3320] mt-6">La casa permanecera visible antes del siguiente paso.</p>
              <div className="mt-6 flex justify-center">
                <button className="antique-button" onClick={onContinue}>Ir al escritorio encantado</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
