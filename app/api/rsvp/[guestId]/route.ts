import { NextRequest, NextResponse } from 'next/server';
import { submitRSVP, getRSVPByGuestId } from '@/lib/rsvp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/rsvp/:guestId
 * Obtiene el estado RSVP de un invitado
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { guestId: string } }
) {
  try {
    const guestId = params?.guestId;

    if (!guestId) {
      return NextResponse.json(
        { success: false, error: 'guestId requerido' },
        { status: 400 }
      );
    }

    const rsvp = await getRSVPByGuestId(guestId);

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
    const guestId = params?.guestId;

    if (!guestId) {
      return NextResponse.json(
        { success: false, error: 'guestId requerido' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const rsvpData = {
      guestId,
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
