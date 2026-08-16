'use client';

import { useEffect, useRef } from 'react';

interface ParticleEffectProps {
  count?: number;
  speed?: number;
  size?: number;
  className?: string;
}

/**
 * Efecto de partículas mágicas optimizado con Canvas
 * Alternativa de CPU baja a animaciones CSS masivas
 */
export default function ParticleEffect({
  count = 30,
  speed = 0.5,
  size = 2,
  className = '',
}: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar resolución
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    // Estado de partículas
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }> = [];

    // Inicializar partículas
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        life: Math.random(),
        maxLife: 1,
        size: Math.random() * (size * 1.5) + size / 2,
      });
    }

    let animationId: number;

    const animate = () => {
      // Limpiar canvas con transparencia
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        // Actualizar posición
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;

        // Reiniciar si se sale o se desvanece
        if (p.life <= 0 || p.x < 0 || p.x > canvas.offsetWidth || p.y > canvas.offsetHeight) {
          p.x = Math.random() * canvas.offsetWidth;
          p.y = -10;
          p.life = 1;
        }

        // Dibujar partícula
        ctx.fillStyle = `rgba(212, 175, 55, ${p.life * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [count, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
