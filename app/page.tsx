import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen scene-backdrop flex items-center justify-center px-4">
      <div className="text-center max-w-2xl parchment-panel p-8 md:p-10">
        <div className="mb-6 flex justify-center">
          <img src="/howards-logo.png" alt="Escudo Hogwarts" className="w-16 h-16 object-contain" />
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-magic-gold mb-6 animate-glow">
          Una correspondencia magica
        </h1>

        <p className="text-xl md:text-2xl text-magic-parchment mb-8 font-light">
          Parece que no tienes invitación personalizada.
        </p>

        <p className="text-lg text-magic-parchment/70 mb-12">
          Si has recibido un enlace especial, usalo para descubrir tu invitacion magica.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admin"
            className="antique-button"
          >
            Panel Administrativo
          </Link>
        </div>

        <div className="mt-10 text-magic-parchment/70 text-sm uppercase tracking-[0.12em]">
          <p>Archivo ceremonial de acceso restringido</p>
        </div>
      </div>
    </main>
  );
}
