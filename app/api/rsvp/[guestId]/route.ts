import { NextRequest, NextResponse } from 'next/server';
import { submitRSVP, getRSVPByGuestId } from '@/lib/rsvp';

/**
 * GET /api/rsvp/:guestId
 * Obtiene el estado RSVP de un invitado
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { guestId: string } }
) {
  try {
    const rsvp = await getRSVPByGuestId(params.guestId);

    if (!rsvp) {
      return NextResponse.json(
        { success: true, data: null }
      );
    }

    return NextResponse.json({
      success: true,
      data: rsvp,
    });
  } catch (error) {
    console.error('Error fetching RSVP:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/rsvp/:guestId
 * Confirma o declina asistencia
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { guestId: string } }
) {
  try {
    const body = await request.json();

    const rsvpData = {
      guestId: params.guestId,
      attending: body.attending === true,
      numberOfGuestsAttending: body.numberOfGuestsAttending || 0,
      guestName: body.guestName || null,
    };

    const rsvp = await submitRSVP(rsvpData);

    if (!rsvp) {
      return NextResponse.json(
        { success: false, error: 'No se pudo procesar la confirmación' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rsvp,
    });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
