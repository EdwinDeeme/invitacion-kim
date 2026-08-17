'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const AUDIO_MUTED_KEY = 'invitation-audio-muted';
const AUDIO_ENABLED_KEY = 'invitation-audio-enabled';
const AUDIO_START_SECONDS = 44;

interface BackgroundAudioProps {
  src: string;
}

export default function BackgroundAudio({ src }: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAppliedStartOffsetRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasSourceError, setHasSourceError] = useState(false);
  const [autoplayBootstrap, setAutoplayBootstrap] = useState(false);

  const applyStartOffset = () => {
    const audio = audioRef.current;
    if (!audio || hasAppliedStartOffsetRef.current) return;

    // Espera metadata para evitar errores al buscar en pistas aun no cargadas.
    if (Number.isNaN(audio.duration) || !Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    const safeStart = Math.max(0, Math.min(AUDIO_START_SECONDS, Math.max(0, audio.duration - 0.25)));

    try {
      audio.currentTime = safeStart;
      hasAppliedStartOffsetRef.current = true;
    } catch {
      // Algunos navegadores bloquean seek temprano; se reintentara en siguientes eventos.
    }
  };

  const storageState = useMemo(() => {
    if (typeof window === 'undefined') {
      return { muted: true, enabled: false };
    }

    return {
      muted: window.localStorage.getItem(AUDIO_MUTED_KEY) !== 'false',
      enabled: window.localStorage.getItem(AUDIO_ENABLED_KEY) === 'true',
    };
  }, []);

  useEffect(() => {
    setIsMuted(storageState.muted);
    setIsEnabled(storageState.enabled);

    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem(AUDIO_MUTED_KEY) === null) {
        window.localStorage.setItem(AUDIO_MUTED_KEY, String(storageState.muted));
      }

      if (window.localStorage.getItem(AUDIO_ENABLED_KEY) === null) {
        window.localStorage.setItem(AUDIO_ENABLED_KEY, String(storageState.enabled));
      }
    }
  }, [storageState]);

  useEffect(() => {
    setHasSourceError(false);
    setAutoplayBootstrap(false);
    hasAppliedStartOffsetRef.current = false;
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    audio.volume = 0.38;

    if (!isEnabled) {
      audio.pause();
      return;
    }

    audio.play().catch(() => {
      // El navegador puede bloquear autoplay; se volvera a intentar en la siguiente interaccion.
    });
  }, [isMuted, isEnabled]);

  const toggleMute = () => {
    setAutoplayBootstrap(false);

    if (!isEnabled) {
      setIsMuted(false);
      setIsEnabled(true);
      window.localStorage.setItem(AUDIO_MUTED_KEY, 'false');
      window.localStorage.setItem(AUDIO_ENABLED_KEY, 'true');

      const audio = audioRef.current;
      if (audio) {
        audio.muted = false;
        audio.volume = 0.38;
        audio.play().catch(() => {
          // El navegador puede seguir exigiendo una interaccion adicional.
        });
      }

      return;
    }

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    window.localStorage.setItem(AUDIO_MUTED_KEY, String(nextMuted));
  };

  const buttonAriaLabel = !isEnabled || isMuted ? 'Iniciar musica de fondo' : 'Silenciar musica de fondo';

  if (hasSourceError) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        muted={isMuted || autoplayBootstrap}
        preload="auto"
        loop
        playsInline
        onLoadedMetadata={applyStartOffset}
        onError={() => setHasSourceError(true)}
        onCanPlay={() => {
          const audio = audioRef.current;
          if (!audio || !isEnabled) return;

          applyStartOffset();
          audio.muted = isMuted || autoplayBootstrap;
          audio.volume = 0.38;
          audio.play().catch(() => {
            // Algunos navegadores seguiran exigiendo interaccion del usuario.
          });
        }}
      />

      <div className="fixed bottom-3 right-3 z-50">
        <button
          className="antique-button antique-button-dark h-11 w-11 p-0 grid place-items-center"
          onClick={toggleMute}
          type="button"
          aria-pressed={!isMuted}
          aria-label={buttonAriaLabel}
        >
          <i
            className={isMuted ? 'fa-solid fa-volume-xmark text-[#e4d2af] text-[18px]' : 'fa-solid fa-volume-high text-[#e4d2af] text-[18px]'}
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );
}