import type { HogwartsHouse } from '@/types';
import { hogwartsHouses } from '@/data/eventConfig';

/**
 * Selecciona aleatoriamente una casa de Hogwarts
 */
export function getRandomHouse(): HogwartsHouse {
  const houses: HogwartsHouse[] = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
  return houses[Math.floor(Math.random() * houses.length)];
}

/**
 * Obtiene la información de una casa
 */
export function getHouseInfo(house: HogwartsHouse) {
  return hogwartsHouses[house];
}

/**
 * Genera un slug único a partir de un nombre
 * "Helen y Andrés" → "helen-andres"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .trim();
}

/**
 * Determina el tipo de invitado basado en el nombre y número de invitados
 */
export function determineGuestType(numberOfGuests: number): 'individual' | 'couple' | 'family' | 'group' {
  if (numberOfGuests === 1) return 'individual';
  if (numberOfGuests === 2) return 'couple';
  if (numberOfGuests <= 4) return 'family';
  return 'group';
}

/**
 * Pluraliza o singulariza según el tipo de invitado
 */
export function getPronoun(numberOfGuests: number): {
  singular: boolean;
  article: string; // "Estimados" vs "Querido/a"
  pronoun: string; // "ustedes" vs "ti"
  plural: string; // "ustedes" vs "tu"
} {
  if (numberOfGuests === 1) {
    return {
      singular: true,
      article: 'Querido/a',
      pronoun: 'ti',
      plural: 'tu',
    };
  }
  return {
    singular: false,
    article: 'Estimados',
    pronoun: 'ustedes',
    plural: 'vosotros', // "¿Podemos contar con ustedes?"
  };
}

/**
 * Formatea un número con puntos (1000 → "1.000")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('es-ES');
}

/**
 * Validaciones de contraseña admin (super simple)
 */
export function validateAdminPassword(password: string): boolean {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) {
    console.error('ADMIN_PASSWORD no configurada en .env');
    return false;
  }
  return password === correctPassword;
}

/**
 * Genera una URL amigable QR
 */
export function generateQRUrl(guestSlug: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/i/${guestSlug}`;
}
