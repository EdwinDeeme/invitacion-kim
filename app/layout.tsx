import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Una correspondencia magica ha llegado para ti',
  description:
    'Estás invitado a una celebración mágica inspirada en el universo de Harry Potter.',
  openGraph: {
    title: 'Una correspondencia magica ha llegado para ti',
    description:
      'Estás invitado a una celebración mágica inspirada en el universo de Harry Potter.',
    type: 'website',
    images: [
      {
        url: '/howards-logo.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/howards-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className="bg-magic-dark min-h-screen">
        {children}
      </body>
    </html>
  );
}
