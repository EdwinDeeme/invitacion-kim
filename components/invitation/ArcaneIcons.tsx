import type { HogwartsHouse } from '@/types';

interface IconProps {
  className?: string;
}

export function ArcaneSigil({ className = 'w-8 h-8' }: IconProps) {
  return (
    <svg viewBox="0 0 96 96" className={`arcane-sigil ${className}`} fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="34" stroke="currentColor" strokeWidth="2" opacity="0.8" />
      <circle cx="48" cy="48" r="24" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M48 16 L56 38 L80 38 L61 52 L68 76 L48 62 L28 76 L35 52 L16 38 L40 38 Z" fill="currentColor" opacity="0.2" />
      <path d="M48 27 L52.5 41.5 L67 41.5 L55.2 50 L59.6 64 L48 55.5 L36.4 64 L40.8 50 L29 41.5 L43.5 41.5 Z" fill="currentColor" />
    </svg>
  );
}

export function ArtifactIcon({ kind, className = 'w-10 h-10' }: { kind: 'map' | 'letter' | 'book' | 'location' | 'info'; className?: string }) {
  if (kind === 'map') {
    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
        <path d="M10 15 L24 10 L39 15 L54 10 V49 L39 54 L24 49 L10 54 Z" stroke="currentColor" strokeWidth="2" />
        <path d="M24 10V49M39 15V54" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <circle cx="32" cy="30" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (kind === 'letter') {
    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
        <rect x="8" y="14" width="48" height="36" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M9 15 L32 34 L55 15" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="34" r="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (kind === 'book') {
    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
        <path d="M10 14 H32 V50 H10 Z" stroke="currentColor" strokeWidth="2" />
        <path d="M32 14 H54 V50 H32 Z" stroke="currentColor" strokeWidth="2" />
        <path d="M32 18 C28 15, 22 15, 14 18" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
        <path d="M32 18 C36 15, 42 15, 50 18" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      </svg>
    );
  }

  if (kind === 'location') {
    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
        <path d="M32 56 C41 44, 47 36, 47 27 C47 18.7, 40.3 12, 32 12 C23.7 12, 17 18.7, 17 27 C17 36, 23 44, 32 56 Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="27" r="5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" />
      <path d="M32 44V30" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="22" r="1.5" fill="currentColor" />
    </svg>
  );
}

const houseAssets: Record<HogwartsHouse, { src: string; alt: string }> = {
  gryffindor: { src: '/griffindor.png', alt: 'Escudo Gryffindor' },
  slytherin: { src: '/slytherin.webp', alt: 'Escudo Slytherin' },
  ravenclaw: { src: '/ravenclaw.png', alt: 'Escudo Ravenclaw' },
  hufflepuff: { src: '/hufflepuff.webp', alt: 'Escudo Hufflepuff' },
};

export function HogwartsCrest({ className = 'w-16 h-16' }: IconProps) {
  return (
    <img
      src="/howards-logo.png"
      alt="Escudo de Hogwarts"
      className={`${className} object-contain`}
      loading="lazy"
      decoding="async"
    />
  );
}

export function HouseCrest({ house, className = 'w-20 h-24' }: { house: HogwartsHouse; className?: string }) {
  const asset = houseAssets[house];

  return (
    <img
      src={asset.src}
      alt={asset.alt}
      className={`${className} object-contain`}
      loading="lazy"
      decoding="async"
    />
  );
}
