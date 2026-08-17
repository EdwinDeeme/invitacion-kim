'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HogwartsHouse, Guest } from '@/types';

import InvitationIntro from './InvitationIntro';
import HogwartsLetter from './HogwartsLetter';
import MagicWandReveal from './MagicWandReveal';
import SortingHat from './SortingHat';
import MaraudersMap from './MaraudersMap';
import { ArcaneSigil } from './ArcaneIcons';
import BackgroundAudio from './BackgroundAudio';

const getStorageKey = (guestId: string) => `invitation-progress:${guestId}`;

interface InvitationExperienceProps {
  guest: Guest;
}

type Scene = 'intro' | 'letter' | 'wand' | 'hat' | 'map';

/**
 * InvitationExperience - Orquestador de las 5 escenas
 * Coordina el flujo narrativo completo
 */
export default function InvitationExperience({ guest }: InvitationExperienceProps) {
  const [currentScene, setCurrentScene] = useState<Scene>('intro');
  const [selectedHouse, setSelectedHouse] = useState<HogwartsHouse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(getStorageKey(guest.id));

    if (raw) {
      try {
        const saved = JSON.parse(raw) as {
          currentScene?: Scene;
          selectedHouse?: HogwartsHouse | null;
        };

        if (saved.currentScene) {
          setCurrentScene(saved.currentScene);
        }

        if (saved.selectedHouse) {
          setSelectedHouse(saved.selectedHouse);
        }
      } catch (error) {
        console.error('No se pudo restaurar el progreso guardado:', error);
      }
    }

    setIsReady(true);
  }, [guest.id]);

  useEffect(() => {
    if (!isReady) return;

    window.localStorage.setItem(
      getStorageKey(guest.id),
      JSON.stringify({
        currentScene,
        selectedHouse,
      })
    );
  }, [currentScene, selectedHouse, guest.id, isReady]);

  // Flujo de escenas
  const handleSceneTransition = (nextScene: Scene) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentScene(nextScene);
      setIsLoading(false);
    }, 600);
  };

  const handleRestart = () => {
    window.localStorage.removeItem(getStorageKey(guest.id));
    setSelectedHouse(null);
    setCurrentScene('intro');
  };

  if (!isReady) {
    return null;
  }

  return (
    <div className="relative min-h-[100dvh]">
      <BackgroundAudio src="/audio/audio-fondo.mp3" />

      <AnimatePresence mode="wait">
        {isLoading ? (
        /* Loading state */
        <motion.div
          key="loading"
          className="fixed inset-0 scene-backdrop flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            <ArcaneSigil className="w-16 h-16" />
          </motion.div>
        </motion.div>
      ) : (
        <>
          {/* ESCENA 1: Intro */}
          {currentScene === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InvitationIntro
                guestName={guest.name}
                numberOfGuests={guest.numberOfGuests}
                onContinue={() => handleSceneTransition('letter')}
              />
            </motion.div>
          )}

          {/* ESCENA 2: Carta Hogwarts */}
          {currentScene === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HogwartsLetter
                guestName={guest.name}
                onContinue={() => handleSceneTransition('wand')}
              />
            </motion.div>
          )}

          {/* ESCENA 3: Varita Mágica */}
          {currentScene === 'wand' && (
            <motion.div
              key="wand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MagicWandReveal
                guestName={guest.name}
                numberOfGuests={guest.numberOfGuests}
                onContinue={() => handleSceneTransition('hat')}
              />
            </motion.div>
          )}

          {/* ESCENA 4: Sombrero Seleccionador */}
          {currentScene === 'hat' && (
            <motion.div
              key="hat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SortingHat
                onComplete={(house) => {
                  setSelectedHouse(house);
                }}
                onContinue={() => handleSceneTransition('map')}
              />
            </motion.div>
          )}

          {/* ESCENA 5: Mapa del Merodeador */}
          {currentScene === 'map' && selectedHouse && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MaraudersMap
                guestId={guest.id}
                guestName={guest.name}
                house={selectedHouse}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </>
        )}
      </AnimatePresence>
    </div>
  );
}
