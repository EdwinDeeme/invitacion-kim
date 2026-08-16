'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'glass';
}

export default function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-magic-navy rounded-lg magic-shadow',
    bordered: 'bg-magic-midnight border-2 border-magic-gold rounded-lg',
    glass: 'bg-black/20 backdrop-blur-sm border border-magic-gold/30 rounded-lg',
  };

  return (
    <div className={`${variants[variant]} p-6 ${className}`}>
      {children}
    </div>
  );
}
