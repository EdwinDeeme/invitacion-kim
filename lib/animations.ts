/**
 * Presets de animaciones Framer Motion
 * Reutilizables en toda la aplicación
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 60 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const letterOpen = {
  initial: { rotateX: 0, y: 0 },
  animate: {
    rotateX: -180,
    y: -40,
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
};

export const typeWriter = (delay = 0, duration = 0.05) => ({
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: 'auto' },
  transition: { delay, duration: duration * 50, ease: 'linear' },
});

export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const glowAnimation = {
  animate: {
    textShadow: [
      '0 0 10px rgba(212, 175, 55, 0.5)',
      '0 0 20px rgba(212, 175, 55, 0.8)',
      '0 0 10px rgba(212, 175, 55, 0.5)',
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const shimmerAnimation = {
  animate: {
    opacity: [0.3, 1, 0.3],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const rotateAnimation = (duration = 2) => ({
  animate: {
    rotate: 360,
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'linear',
  },
});

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Stagger para listas
export const containerStagger = {
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
};

export const itemStagger = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};
