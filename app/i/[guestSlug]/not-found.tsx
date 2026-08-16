'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen scene-backdrop flex items-center justify-center px-4">
      <div className="text-center max-w-2xl parchment-panel p-8 md:p-10">
        <motion.div
          className="mb-6 flex justify-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/howards-logo.png" alt="Escudo Hogwarts" className="w-16 h-16 object-contain" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-magic-gold mb-6">
          Invitación no encontrada
        </h1>

        <p className="text-xl text-magic-parchment mb-8">
          Parece que esta invitacion magica no existe o ha expirado.
        </p>

        <p className="text-magic-parchment/70 mb-12">
          Verifica que el enlace sea correcto. Si continuas teniendo problemas, contacta al organizador.
        </p>

        <Link
          href="/"
          className="inline-block antique-button"
        >
          Volver al inicio
        </Link>

        <div className="mt-10 text-magic-parchment/70 text-sm uppercase tracking-[0.12em]">
          <p>Confirma con el organizador el enlace ceremonial</p>
        </div>
      </div>
    </main>
  );
}
