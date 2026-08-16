'use client';

/**
 * SVG de Varita Mágica
 * Diseño elegante inspirado en HP
 */
export default function SVGWand() {
  return (
    <svg
      viewBox="0 0 100 300"
      width="60"
      height="180"
      className="drop-shadow-lg"
      style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))' }}
    >
      {/* Empuñadura */}
      <defs>
        <linearGradient id="wandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="50%" stopColor="#A0522D" />
          <stop offset="100%" stopColor="#6B3410" />
        </linearGradient>
        <linearGradient id="tipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>

      {/* Varita principal (palo) */}
      <rect
        x="42"
        y="60"
        width="16"
        height="180"
        rx="8"
        fill="url(#wandGradient)"
        opacity="0.9"
      />

      {/* Marcas en la varita */}
      <line x1="35" y1="100" x2="65" y2="100" stroke="#654321" strokeWidth="1" opacity="0.5" />
      <line x1="35" y1="140" x2="65" y2="140" stroke="#654321" strokeWidth="1" opacity="0.5" />
      <line x1="35" y1="180" x2="65" y2="180" stroke="#654321" strokeWidth="1" opacity="0.5" />

      {/* Empuñadura ornamental */}
      <ellipse cx="50" cy="50" rx="12" ry="18" fill="url(#wandGradient)" opacity="0.8" />
      <circle cx="50" cy="45" r="6" fill="#D4AF37" opacity="0.7" />
      <circle cx="50" cy="55" r="6" fill="#D4AF37" opacity="0.7" />

      {/* Punta mágica (Phoenix feather / core) */}
      <g filter="url(#glow)">
        <circle cx="50" cy="250" r="8" fill="url(#tipGradient)" opacity="0.9" />
        <circle cx="50" cy="250" r="6" fill="#FFD700" opacity="0.6" />
      </g>

      {/* Destellos mágicos alrededor de la punta */}
      <circle cx="50" cy="250" r="12" fill="none" stroke="#FFD700" strokeWidth="0.5" opacity="0.4" />
      <circle cx="50" cy="250" r="16" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />

      {/* Filtro de brillo */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
