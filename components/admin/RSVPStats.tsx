'use client';

import { motion } from 'framer-motion';
import { containerStagger, itemStagger } from '@/lib/animations';

interface RSVPStatsProps {
  total: number;
  confirmed: number;
  pending: number;
  declined: number;
  totalGuests: number;
  guestsConfirmed: number;
}

/**
 * Panel de estadísticas RSVP
 */
export default function RSVPStats({
  total,
  confirmed,
  pending,
  declined,
  totalGuests,
  guestsConfirmed,
}: RSVPStatsProps) {
  const stats = [
    { label: 'Total Invitados', value: total, mark: 'TOTAL', color: 'text-magic-gold' },
    { label: 'Confirmados', value: confirmed, mark: 'OK', color: 'text-magic-emerald' },
    { label: 'Pendientes', value: pending, mark: 'PEND', color: 'text-magic-gold' },
    { label: 'Declinados', value: declined, mark: 'NO', color: 'text-magic-red' },
  ];

  const confirmationRate = total > 0 ? Math.round((confirmed / total) * 100) : 0;

  return (
    <motion.div
      className="space-y-6"
      variants={containerStagger.variants}
      initial={containerStagger.initial}
      animate={containerStagger.animate}
    >
      {/* Encabezado */}
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-magic-gold mb-2">
          Estadisticas RSVP
        </h2>
        <p className="text-magic-parchment/70">
          Resumen de confirmaciones para la celebración
        </p>
      </div>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="bg-magic-navy/50 border border-magic-gold/30 rounded-lg p-6 text-center"
            variants={itemStagger}
          >
            <div className={`text-xs tracking-[0.22em] uppercase mb-2 ${stat.color}`}>{stat.mark}</div>
            <p className="text-magic-parchment/70 text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-magic-gold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Progreso */}
      <div className="bg-magic-navy/40 border border-magic-gold/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-magic-parchment font-semibold">Tasa de Confirmación</p>
          <p className="text-2xl font-bold text-magic-gold">{confirmationRate}%</p>
        </div>
        <div className="w-full bg-magic-dark/50 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-magic-gold to-magic-gold-dark h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${confirmationRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-magic-parchment/60 text-sm mt-3">
          {confirmed} de {total} invitados han confirmado
        </p>
      </div>

      {/* Total personas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-magic-navy/50 border border-magic-gold/30 rounded-lg p-6">
          <p className="text-magic-parchment/70 text-sm mb-2">Total de Personas Invitadas</p>
          <p className="text-3xl font-bold text-magic-gold">{totalGuests}</p>
        </div>
        <div className="bg-magic-navy/50 border border-magic-gold/30 rounded-lg p-6">
          <p className="text-magic-parchment/70 text-sm mb-2">Personas que Confirmaron</p>
          <p className="text-3xl font-bold text-magic-emerald">{guestsConfirmed}</p>
        </div>
      </div>
    </motion.div>
  );
}
