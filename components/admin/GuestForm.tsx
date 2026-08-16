'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import type { Guest } from '@/types';

interface GuestFormProps {
  guest?: Guest;
  onSubmit: (data: { name: string; numberOfGuests: number }) => Promise<void>;
  onCancel: () => void;
}

/**
 * Formulario para crear/editar invitados
 */
export default function GuestForm({ guest, onSubmit, onCancel }: GuestFormProps) {
  const [name, setName] = useState(guest?.name || '');
  const [numberOfGuests, setNumberOfGuests] = useState(guest?.numberOfGuests || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (numberOfGuests < 1) {
      setError('Debe haber al menos 1 invitado');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await onSubmit({ name: name.trim(), numberOfGuests });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      className="bg-magic-navy/40 border border-magic-gold/30 rounded-lg p-8 space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-display font-bold text-magic-gold">
        {guest ? 'Editar Invitado' : 'Nuevo Invitado'}
      </h2>

      {/* Nombre */}
      <div className="space-y-2">
        <label className="block text-magic-parchment font-semibold text-sm">
          Nombre del Invitado
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Helen y Andrés, Laura, Familia García"
          className="w-full bg-magic-dark border border-magic-gold/30 rounded-lg px-4 py-3 text-magic-parchment placeholder-magic-parchment/40 focus:border-magic-gold focus:outline-none"
          disabled={isLoading}
        />
        <p className="text-magic-parchment/60 text-xs">
          Puede ser un nombre individual, pareja, familia o grupo
        </p>
      </div>

      {/* Número de invitados */}
      <div className="space-y-2">
        <label className="block text-magic-parchment font-semibold text-sm">
          Número de Invitados
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setNumberOfGuests(Math.max(1, numberOfGuests - 1))}
            disabled={isLoading}
            className="w-12 h-12 bg-magic-navy border border-magic-gold rounded-lg text-magic-gold font-bold hover:bg-magic-gold hover:text-magic-dark transition disabled:opacity-50"
          >
            −
          </button>
          <div className="flex-1 text-center">
            <p className="text-3xl font-bold text-magic-gold">{numberOfGuests}</p>
            <p className="text-magic-parchment/60 text-xs mt-1">
              {numberOfGuests === 1 && 'Individual'}
              {numberOfGuests === 2 && 'Pareja'}
              {numberOfGuests > 2 && numberOfGuests <= 4 && 'Familia'}
              {numberOfGuests > 4 && 'Grupo'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNumberOfGuests(numberOfGuests + 1)}
            disabled={isLoading}
            className="w-12 h-12 bg-magic-navy border border-magic-gold rounded-lg text-magic-gold font-bold hover:bg-magic-gold hover:text-magic-dark transition disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-magic-red/20 border border-magic-red rounded-lg p-4">
          <p className="text-magic-red text-sm">{error}</p>
        </div>
      )}

      {/* Acciones */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="flex-1"
        >
          {guest ? 'Actualizar' : 'Crear'} Invitado
        </Button>
      </div>
    </motion.form>
  );
}
