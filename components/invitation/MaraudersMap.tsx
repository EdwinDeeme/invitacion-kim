'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { eventConfig } from '@/data/eventConfig';
import type { HogwartsHouse } from '@/types';
import RSVPForm from './RSVPForm';
import { ArtifactIcon, HouseCrest } from './ArcaneIcons';

interface MaraudersMapProps {
  guestId: string;
  guestName: string;
  house: HogwartsHouse;
  onRestart: () => void;
}

export default function MaraudersMap({ guestId, guestName, house, onRestart }: MaraudersMapProps) {
  const [activeSection, setActiveSection] = useState<'map' | 'rsvp' | 'info' | null>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadRSVP = async () => {
      try {
        const response = await fetch(`/api/rsvp/${guestId}`);
        if (!response.ok) return;
        const payload = await response.json();
        if (!ignore && payload.data) {
          setRsvpSubmitted(true);
        }
      } catch (error) {
        console.error('No se pudo cargar el RSVP:', error);
      }
    };

    loadRSVP();

    return () => {
      ignore = true;
    };
  }, [guestId]);

  return (
    <div className="scene-backdrop flex items-center justify-center px-4 py-4">
      <div className="dust-overlay" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/mapa.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.75) contrast(0.95) brightness(0.85)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          className="parchment-panel px-4 py-4 md:px-6 md:py-5 mb-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#4c341d]">Escritorio encantado</p>
              <h1 className="ink-title text-3xl md:text-4xl mt-1">Mapa y Artefactos</h1>
              <p className="ink-script text-[#3a2817] mt-1 text-sm md:text-base">{guestName}, elige que objeto deseas consultar a continuacion.</p>
            </div>
            <HouseCrest house={house} className="w-14 h-16 md:w-16 md:h-20" />
          </div>
        </motion.div>

        {!activeSection && !rsvpSubmitted && (
          <motion.div className="artifact-grid md:grid-cols-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={() => setActiveSection('map')} className="artifact-choice p-4 text-left min-h-[132px]">
              <ArtifactIcon kind="map" className="w-10 h-10 text-magic-gold mb-3" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-magic-gold/70">Mapa</p>
              <h3 className="text-lg md:text-xl font-display text-magic-parchment mt-1">Encontrar el camino</h3>
              <p className="text-xs md:text-sm text-magic-silver/80 mt-1">Desplegar plano encantado antes de abrir navegacion externa.</p>
            </button>

            <button onClick={() => setActiveSection('rsvp')} className="artifact-choice p-4 text-left min-h-[132px]">
              <ArtifactIcon kind="letter" className="w-10 h-10 text-magic-gold mb-3" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-magic-gold/70">Carta</p>
              <h3 className="text-lg md:text-xl font-display text-magic-parchment mt-1">Confirmar asistencia</h3>
              <p className="text-xs md:text-sm text-magic-silver/80 mt-1">Registrar respuesta para la celebracion privada.</p>
            </button>

            <button onClick={() => setActiveSection('info')} className="artifact-choice p-4 text-left min-h-[132px]">
              <ArtifactIcon kind="book" className="w-10 h-10 text-magic-gold mb-3" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-magic-gold/70">Libro</p>
              <h3 className="text-lg md:text-xl font-display text-magic-parchment mt-1">Consultar informacion</h3>
              <p className="text-xs md:text-sm text-magic-silver/80 mt-1">Ver etiqueta, notas y condiciones de la velada.</p>
            </button>

            <div className="md:col-span-3 pt-1">
              <button className="antique-button antique-button-dark w-full" onClick={onRestart}>
                Reiniciar experiencia
              </button>
            </div>
          </motion.div>
        )}

        {activeSection === 'map' && (
          <motion.div className="parchment-panel p-4 md:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-4">
              <ArtifactIcon kind="map" className="w-8 h-8 text-[#4c3219]" />
              <h2 className="ink-title text-2xl md:text-3xl">Mapa del encuentro</h2>
            </div>

            <div className="ink-box p-4 space-y-3">
              <img
                src="/mapa.png"
                alt="Mapa del merodeador"
                className="w-full max-h-28 md:max-h-32 object-cover border border-[#6a4d2a]/35"
                loading="lazy"
                decoding="async"
              />
              <div className="grid md:grid-cols-2 gap-3 items-center">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#563b1e]">Destino</p>
                  <p className="text-base md:text-lg text-[#291b10] mt-1">{eventConfig.event.location}</p>
                  <p className="text-xs md:text-sm text-[#3f2b17]/90 mt-1">{eventConfig.event.address}</p>
                </div>
                <svg viewBox="0 0 240 140" className="w-full max-h-24 md:max-h-28 h-auto text-[#5b4223]" fill="none" aria-hidden="true">
                  <rect x="4" y="4" width="232" height="132" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M24 110 C70 82, 90 80, 128 58 C152 44, 178 44, 216 26" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" />
                  <circle cx="24" cy="110" r="4" fill="currentColor" />
                  <circle cx="216" cy="26" r="4" fill="currentColor" />
                  <path d="M176 28 L216 28 L216 68" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-3">
              <button className="antique-button w-full" onClick={() => window.open(eventConfig.event.mapsUrl, '_blank')}>Abrir en Google Maps</button>
              <button className="antique-button antique-button-dark w-full" onClick={() => window.open(eventConfig.event.wazeUrl, '_blank')}>Abrir en Waze</button>
            </div>

            <button className="antique-button antique-button-dark w-full mt-4" onClick={() => setActiveSection(null)}>
              Regresar al escritorio
            </button>
          </motion.div>
        )}

        {activeSection === 'rsvp' && !rsvpSubmitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RSVPForm
              guestId={guestId}
              guestName={guestName}
              onSubmit={() => setRsvpSubmitted(true)}
              onBack={() => setActiveSection(null)}
            />
          </motion.div>
        )}

        {rsvpSubmitted && (
          <motion.div className="parchment-panel p-5 md:p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-center mb-3">
              <ArtifactIcon kind="letter" className="w-10 h-10 text-[#4a3319]" />
            </div>
            <h2 className="ink-title text-3xl md:text-4xl">Registro completado</h2>
            <p className="ink-script text-[#3b2715] text-base md:text-lg mt-2">La respuesta de {guestName} quedo sellada en el registro ceremonial.</p>
            <button className="antique-button w-full mt-5" onClick={() => { setRsvpSubmitted(false); setActiveSection(null); }}>
              Volver al escritorio
            </button>
          </motion.div>
        )}

        {activeSection === 'info' && (
          <motion.div className="parchment-panel p-4 md:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-4">
              <ArtifactIcon kind="book" className="w-8 h-8 text-[#4c3219]" />
              <h2 className="ink-title text-2xl md:text-3xl">Libro de informacion</h2>
            </div>

            <div className="ink-box p-4 space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#563b1e]">Fecha y hora</p>
                <p className="text-sm md:text-base text-[#291b10] mt-1">Domingo 13 de Septiembre</p>
                <p className="text-sm md:text-base text-[#291b10]">A las 3:00 p.m.</p>
              </div>
              <div className="h-px bg-[#6f512c]/35" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#563b1e]">Etiqueta sugerida</p>
                <p className="text-sm md:text-base text-[#291b10] mt-1">{eventConfig.event.dressCode}</p>
              </div>
              <div className="h-px bg-[#6f512c]/35" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#563b1e]">Aviso importante</p>
                <p className="text-sm md:text-base text-[#291b10] mt-1">{eventConfig.event.additionalInfo}</p>
              </div>
            </div>

            <button className="antique-button antique-button-dark w-full mt-4" onClick={() => setActiveSection(null)}>
              Regresar al escritorio
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
