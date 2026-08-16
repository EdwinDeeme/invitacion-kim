import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'magic-dark': '#070604',
        'magic-night': '#0d0b09',
        'magic-charcoal': '#17120c',
        'magic-parchment': '#d7c39a',
        'magic-parchment-deep': '#b79a67',
        'magic-parchment-ink': '#8c6d42',
        'magic-gold': '#b99a5a',
        'magic-gold-dark': '#7b6334',
        'magic-red': '#4b1518',
        'magic-red-bright': '#672024',
        'magic-emerald': '#18251c',
        'magic-emerald-bright': '#2b3f32',
        'magic-sky': '#1f2835',
        'magic-silver': '#b5ab97',
      },
      fontFamily: {
        'display': ['HarryP', 'Cinzel Decorative', 'Times New Roman', 'serif'],
        'body': ['WizardText', 'Cormorant Garamond', 'Garamond', 'serif'],
        'ink': ['WizardText', 'Garamond', 'serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 3.4s ease-in-out infinite',
        'shimmer': 'shimmer 5s ease-in-out infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
        'drift': 'drift 14s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.75', textShadow: '0 0 10px rgba(185, 154, 90, 0.25)' },
          '50%': { opacity: '1', textShadow: '0 0 22px rgba(185, 154, 90, 0.5)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.65' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.9' },
          '14%': { opacity: '0.72' },
          '27%': { opacity: '1' },
          '51%': { opacity: '0.8' },
          '70%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(8px, -10px, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};

export default config;
