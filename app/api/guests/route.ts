import { NextRequest, NextResponse } from 'next/server';
import { getAllGuests, createGuest } from '@/lib/guests';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/guests
 * Lista todos los invitados
 */
export async function GET(_request: NextRequest) {
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
 * Crea un nuevo invitado
 */
export async function POST(request: NextRequest) {
  try {
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('❌ Error creating guest:', errorMessage);
    console.error('   Stack:', errorStack);
    console.error('   Full error object:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        debug: errorMessage // incluye el error real en respuesta para debugging
      },
      { status: 500 }
    );
  }
}

