'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 outline-none font-semibold tracking-[0.14em] uppercase text-[0.74rem] leading-none transition-all duration-300 min-h-[46px] px-5 border relative';

    const variants = {
      primary: 'antique-button border-magic-gold/80 text-magic-charcoal',
      secondary: 'antique-button antique-button-dark border-magic-gold/50 text-magic-parchment',
      ghost: 'bg-transparent border-magic-gold/40 text-magic-gold hover:bg-magic-gold/10',
      danger: 'bg-magic-red/90 border-magic-red-bright text-magic-parchment hover:bg-magic-red-bright',
    };

    const sizes = {
      sm: 'min-h-[42px] px-4 text-[0.68rem]',
      md: 'min-h-[48px] px-5 text-[0.74rem]',
      lg: 'min-h-[54px] px-7 text-[0.78rem]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
          disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-[1px] active:translate-y-[1px]'
        } ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
