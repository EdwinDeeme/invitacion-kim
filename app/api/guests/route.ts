import { NextRequest, NextResponse } from 'next/server';
import { getAllGuests, createGuest, getRSVPStats } from '@/lib/guests';

/**
 * GET /api/guests
 * Lista todos los invitados
 */
export async function GET(request: NextRequest) {
  try {
    const guests = await getAllGuests();

    return NextResponse.json({
      success: true,
      data: guests,
    });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/guests
 * Crea un nuevo invitado (requiere autenticación)
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación (password en header)
    const adminPassword = request.headers.get('x-admin-password');
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword || adminPassword !== correctPassword) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.name || !body.numberOfGuests) {
      return NextResponse.json(
        { success: false, error: 'Nombre y número de invitados son requeridos' },
        { status: 400 }
      );
    }

    const guest = await createGuest({
      slug: body.slug,
      name: body.name,
      numberOfGuests: body.numberOfGuests,
      guestType: body.guestType || 'individual',
    });

    if (!guest) {
      return NextResponse.json(
        { success: false, error: 'No se pudo crear el invitado' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: guest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating guest:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/guests/stats
 * Obtiene estadísticas de RSVP
 */
export async function getStats() {
  try {
    const stats = await getRSVPStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
