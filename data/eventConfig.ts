import type { EventConfig } from '@/types';

/**
 * CONFIGURACIÓN CENTRAL DEL EVENTO
 * 
 * Este es el único lugar donde debes cambiar información del evento.
 * Los cambios aquí se reflejan automáticamente en toda la aplicación.
 */

export const eventConfig: EventConfig = {
  celebrant: {
    name: 'Kimberly Mora',
    age: 32,
  },
  event: {
    // FECHA Y HORA
    date: '2026-09-13', // ISO format: YYYY-MM-DD
    time: '15:00', // HH:mm (24h) - 3:00 PM
    
    // UBICACION
    location: 'Farfalla Blu PZ, Barrio el Hoyon',
    address: 'Farfalla Blu PZ, Barrio el Hoyon', // Para Google Maps
    
    // DRESS CODE
    dressCode: 'Opcional: Caracterizar la casa a la que perteneces o algo de Harry Potter',
    
    // INFORMACION ADICIONAL
    additionalInfo: 'IMPORTANTE: Esto es una sorpresa. Por favor, no le comentes a Kimberly sobre esta fiesta.',
    
    // URLS PARA NAVEGACION
    mapsUrl: 'https://maps.app.goo.gl/rfbKmXQTA6QqRfRx9',
    wazeUrl: 'https://ul.waze.com/ul?place=ChIJo8HTUm5PoY8R1Sn0O_E1410&ll=9.36287810%2C-83.72407150&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location',
  },
};

/**
 * Funciones auxiliares para formatear la fecha y hora
 */

export function getFormattedDate(): string {
  const dateObj = new Date(`${eventConfig.event.date}T${eventConfig.event.time}`);
  return dateObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getFormattedTime(): string {
  const [hours, minutes] = eventConfig.event.time.split(':');
  const hour = parseInt(hours);
  const minute = parseInt(minutes);
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getFormattedDateTime(): string {
  return `${getFormattedDate()} a las ${getFormattedTime()}`;
}

/**
 * Información de las casas de Hogwarts
 * Usadas en el Sombrero Seleccionador
 */

export const hogwartsHouses = {
  gryffindor: {
    name: 'Gryffindor',
    sigil: 'lion-rampant',
    color: 'text-magic-red',
    bgColor: 'bg-magic-red/20',
    description: 'Valentía, lealtad y una gran capacidad para disfrutar una buena fiesta.',
  },
  slytherin: {
    name: 'Slytherin',
    sigil: 'serpent-coil',
    color: 'text-magic-emerald',
    bgColor: 'bg-magic-emerald/20',
    description: 'Astucia, ambición y determinación para celebraciones memorables.',
  },
  ravenclaw: {
    name: 'Ravenclaw',
    sigil: 'raven-flight',
    color: 'text-magic-sky',
    bgColor: 'bg-magic-sky/20',
    description: 'Sabiduría, creatividad y una mentalidad abierta para la magia.',
  },
  hufflepuff: {
    name: 'Hufflepuff',
    sigil: 'stag-crest',
    color: 'text-magic-gold',
    bgColor: 'bg-magic-gold/20',
    description: 'Lealtad, dedicación y el corazón perfecto para una fiesta extraordinaria.',
  },
} as const;
