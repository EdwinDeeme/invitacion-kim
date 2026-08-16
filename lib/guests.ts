import { getPrismaClient } from './db';
import type { Guest } from '@prisma/client';

/**
 * Obtiene un invitado por slug
 */
export async function getGuestBySlug(slug: string): Promise<Guest | null> {
  try {
    const prisma = getPrismaClient();
    return await prisma.guest.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error('Error fetching guest:', error);
    return null;
  }
}

/**
 * Obtiene un invitado por ID
 */
export async function getGuestById(id: string): Promise<Guest | null> {
  try {
    const prisma = getPrismaClient();
    return await prisma.guest.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching guest:', error);
    return null;
  }
}

/**
 * Obtiene todos los invitados
 */
export async function getAllGuests(): Promise<Guest[]> {
  try {
    const prisma = getPrismaClient();
    return await prisma.guest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return [];
  }
}

/**
 * Crea un nuevo invitado
 */
export async function createGuest(data: {
  slug: string;
  name: string;
  numberOfGuests: number;
  guestType: string;
}): Promise<Guest | null> {
  try {
    const prisma = getPrismaClient();
    return await prisma.guest.create({
      data,
    });
  } catch (error) {
    console.error('Error creating guest:', error);
    return null;
  }
}

/**
 * Actualiza un invitado
 */
export async function updateGuest(
  id: string,
  data: Partial<Guest>
): Promise<Guest | null> {
  try {
    const prisma = getPrismaClient();
    return await prisma.guest.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error('Error updating guest:', error);
    return null;
  }
}

/**
 * Elimina un invitado
 */
export async function deleteGuest(id: string): Promise<boolean> {
  try {
    const prisma = getPrismaClient();
    await prisma.guest.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error('Error deleting guest:', error);
    return false;
  }
}

/**
 * Obtiene estadísticas de RSVP
 */
export async function getRSVPStats(): Promise<{
  total: number;
  confirmed: number;
  pending: number;
  declined: number;
  totalGuests: number;
  guestsConfirmed: number;
}> {
  try {
    const prisma = getPrismaClient();
    const guests = await prisma.guest.findMany();
    const rsvps = await prisma.rSVP.findMany();

    const confirmed = rsvps.filter((r) => r.attending === true).length;
    const declined = rsvps.filter((r) => r.attending === false).length;
    const pending = guests.length - rsvps.length;

    const guestsConfirmed = rsvps
      .filter((r) => r.attending === true)
      .reduce((sum, r) => sum + (r.numberOfGuestsAttending || 0), 0);

    return {
      total: guests.length,
      confirmed,
      pending,
      declined,
      totalGuests: guests.reduce((sum, g) => sum + g.numberOfGuests, 0),
      guestsConfirmed,
    };
  } catch (error) {
    console.error('Error fetching RSVP stats:', error);
    return {
      total: 0,
      confirmed: 0,
      pending: 0,
      declined: 0,
      totalGuests: 0,
      guestsConfirmed: 0,
    };
  }
}
