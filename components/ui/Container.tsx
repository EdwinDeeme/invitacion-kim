'use client';

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Container({
  children,
  className = '',
  maxWidth = 'lg',
}: ContainerProps) {
  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${maxWidths[maxWidth]} w-full mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}
