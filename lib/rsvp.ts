'use server';

import { prisma } from './db';
import type { RSVP } from '@prisma/client';

/**
 * Obtiene RSVP de un invitado por ID
 */
export async function getRSVPByGuestId(guestId: string): Promise<RSVP | null> {
  try {
    return await prisma.rsvp.findUnique({
      where: { guestId },
      include: { guest: true },
    });
  } catch (error) {
    console.error('Error fetching RSVP:', error);
    return null;
  }
}

/**
 * Crea o actualiza un RSVP
 */
export async function submitRSVP(data: {
  guestId: string;
  attending: boolean;
  numberOfGuestsAttending?: number;
  guestName?: string;
}): Promise<RSVP | null> {
  try {
    // Verificar que el invitado existe
    const guest = await prisma.guest.findUnique({
      where: { id: data.guestId },
    });

    if (!guest) {
      throw new Error('Guest not found');
    }

    // Buscar RSVP existente
    const existingRSVP = await prisma.rsvp.findUnique({
      where: { guestId: data.guestId },
    });

    if (existingRSVP) {
      // Actualizar RSVP existente
      return await prisma.rsvp.update({
        where: { guestId: data.guestId },
        data: {
          attending: data.attending,
          numberOfGuestsAttending: data.numberOfGuestsAttending,
          guestName: data.guestName,
          updatedAt: new Date(),
        },
      });
    } else {
      // Crear nuevo RSVP
      return await prisma.rsvp.create({
        data: {
          guestId: data.guestId,
          attending: data.attending,
          numberOfGuestsAttending: data.numberOfGuestsAttending,
          guestName: data.guestName,
        },
      });
    }
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return null;
  }
}

/**
 * Obtiene todos los RSVPs confirmados
 */
export async function getConfirmedRSVPs(): Promise<RSVP[]> {
  try {
    return await prisma.rsvp.findMany({
      where: { attending: true },
      include: { guest: true },
      orderBy: { submittedAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching confirmed RSVPs:', error);
    return [];
  }
}

/**
 * Obtiene todos los RSVPs declinados
 */
export async function getDeclinedRSVPs(): Promise<RSVP[]> {
  try {
    return await prisma.rsvp.findMany({
      where: { attending: false },
      include: { guest: true },
      orderBy: { submittedAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching declined RSVPs:', error);
    return [];
  }
}
