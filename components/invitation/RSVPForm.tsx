'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArtifactIcon } from './ArcaneIcons';

interface RSVPFormProps {
  guestId: string;
  guestName: string;
  onSubmit: () => void;
  onBack: () => void;
}

export default function RSVPForm({
  guestId,
  guestName,
  onSubmit,
  onBack,
}: RSVPFormProps) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [extraGuests, setExtraGuests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (willAttend: boolean) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/rsvp/${guestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attending: willAttend,
          numberOfGuestsAttending: willAttend ? 1 + extraGuests : 0,
          guestName: guestName.split(' ')[0],
        }),
      });

      if (!response.ok) {
        throw new Error('No fue posible registrar tu respuesta');
      }

      window.localStorage.setItem(
        `invitation-rsvp:${guestId}`,
        JSON.stringify({
          attending: willAttend,
          numberOfGuestsAttending: willAttend ? 1 + extraGuests : 0,
        })
      );

      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="parchment-panel p-4 md:p-5 space-y-3">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <ArtifactIcon kind="letter" className="w-8 h-8 text-[#4b3118]" />
        </div>
        <h2 className="ink-title text-2xl md:text-3xl">Registro de asistencia</h2>
        <p className="ink-script text-[#3a2816] text-base md:text-lg mt-1">Confirma si podremos contar con tu presencia en la celebracion.</p>
      </div>

      <div className="grid gap-3">
        <motion.button
          onClick={() => setAttending(true)}
          className={`text-left p-4 border ${
            attending === true
              ? 'bg-[#e3d4b2] border-[#6f512c]'
              : 'bg-[#eddfbe]/75 border-[#8a6a3f]/50'
          }`}
          whileHover={{ scale: 1.01 }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b3f22]">Asistencia</p>
          <p className="font-display text-lg md:text-xl text-[#27190f] mt-1">Si, asistire</p>
          <p className="text-sm md:text-base text-[#402d1a] mt-1">Reservare este dia para la velada.</p>
        </motion.button>

        <motion.button
          onClick={() => setAttending(false)}
          className={`text-left p-4 border ${
            attending === false
              ? 'bg-[#e4cdc0] border-[#6a2a2d]'
              : 'bg-[#eddfbe]/75 border-[#8a6a3f]/50'
          }`}
          whileHover={{ scale: 1.01 }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b3f22]">Asistencia</p>
          <p className="font-display text-lg md:text-xl text-[#27190f] mt-1">No podre asistir</p>
          <p className="text-sm md:text-base text-[#402d1a] mt-1">No me sera posible acudir en esta ocasion.</p>
        </motion.button>
      </div>

      {attending === true && (
        <motion.div className="ink-box p-3 space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b3f22]">Acompanantes adicionales</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExtraGuests(Math.max(0, extraGuests - 1))}
              className="antique-button antique-button-dark min-h-[40px] px-4"
            >
              Menos
            </button>
            <span className="text-xl font-display text-[#2b1c11] min-w-[40px] text-center">{extraGuests}</span>
            <button
              onClick={() => setExtraGuests(extraGuests + 1)}
              className="antique-button antique-button-dark min-h-[40px] px-4"
            >
              Mas
            </button>
          </div>
          <p className="text-sm md:text-base text-[#3f2b18]">Total de personas registradas: {1 + extraGuests}</p>
        </motion.div>
      )}

      {error && (
        <div className="border border-magic-red/50 bg-magic-red/10 p-3">
          <p className="text-sm text-magic-red">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <Button variant="secondary" size="md" onClick={onBack} disabled={isLoading}>
          Regresar
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => handleSubmit(attending === true)}
          disabled={attending === null || isLoading}
          isLoading={isLoading}
        >
          Registrar respuesta
        </Button>
      </div>
    </div>
  );
}
