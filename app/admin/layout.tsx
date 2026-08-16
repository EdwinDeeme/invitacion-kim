import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-magic-dark">
      {/* Header */}
      <header className="bg-magic-navy/50 border-b border-magic-gold/30">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <Link href="/" className="text-2xl font-display font-bold text-magic-gold">
              Panel Admin
            </Link>
            <p className="text-magic-parchment/60 text-sm">Cumpleaños de Kimberly Mora</p>
          </div>
          <Link
            href="/"
            className="text-magic-parchment hover:text-magic-gold transition"
          >
            Volver
          </Link>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
