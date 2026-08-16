'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import type { Guest } from '@/types';

interface GuestListProps {
  guests: Guest[];
  onEdit: (guest: Guest) => void;
  onDelete: (guestId: string) => Promise<void>;
  onRefresh: () => Promise<void>;
}

/**
 * Tabla de invitados con acciones
 */
export default function GuestList({
  guests,
  onEdit,
  onDelete,
  onRefresh,
}: GuestListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/i/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleDelete = async (guestId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este invitado?')) {
      setDeletingId(guestId);
      try {
        await onDelete(guestId);
      } finally {
        setDeletingId(null);
        await onRefresh();
      }
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { mark: 'OK', text: 'Confirmado', color: 'text-magic-emerald' };
      case 'declined':
        return { mark: 'NO', text: 'Declinado', color: 'text-magic-red' };
      case 'pending':
      default:
        return { mark: 'PEND', text: 'Pendiente', color: 'text-magic-gold' };
    }
  };

  if (guests.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-magic-parchment/70 text-lg mb-4">
          No hay invitados aún. ¡Agrega el primero!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="overflow-hidden border border-magic-gold/30 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-magic-navy/50 border-b border-magic-gold/30">
            <tr>
              <th className="px-6 py-4 text-left text-magic-gold font-semibold text-sm">
                Nombre
              </th>
              <th className="px-6 py-4 text-center text-magic-gold font-semibold text-sm">
                Personas
              </th>
              <th className="px-6 py-4 text-center text-magic-gold font-semibold text-sm">
                Estado
              </th>
              <th className="px-6 py-4 text-center text-magic-gold font-semibold text-sm">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-magic-gold/10">
            {guests.map((guest) => {
              const status = getStatusDisplay(guest.status);
              return (
                <motion.tr
                  key={guest.id}
                  className="hover:bg-magic-navy/20 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-magic-parchment font-semibold">{guest.name}</p>
                      <p className="text-magic-parchment/50 text-xs mt-1">/{guest.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-magic-parchment font-semibold">
                      {guest.numberOfGuests}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${status.color}`}>
                      {status.mark} {status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {/* Copiar enlace */}
                      <button
                        onClick={() => handleCopyLink(guest.slug)}
                        className="px-3 py-2 bg-magic-navy/40 border border-magic-gold/30 rounded hover:border-magic-gold text-magic-parchment text-sm transition-colors"
                        title="Copiar enlace"
                      >
                        {copiedSlug === guest.slug ? 'Copiado' : 'Copiar'}
                      </button>

                      {/* Editar */}
                      <button
                        onClick={() => onEdit(guest)}
                        className="px-3 py-2 bg-magic-navy/40 border border-magic-gold/30 rounded hover:border-magic-gold text-magic-parchment text-sm transition-colors"
                        title="Editar"
                      >
                        Editar
                      </button>

                      {/* Eliminar */}
                      <button
                        onClick={() => handleDelete(guest.id)}
                        disabled={deletingId === guest.id}
                        className="px-3 py-2 bg-magic-navy/40 border border-magic-red/30 rounded hover:border-magic-red text-magic-parchment text-sm transition-colors disabled:opacity-50"
                        title="Eliminar"
                      >
                        {deletingId === guest.id ? 'Eliminando' : 'Eliminar'}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
