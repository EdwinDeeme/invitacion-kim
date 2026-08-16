import { NextRequest, NextResponse } from 'next/server';
import { getGuestBySlug } from '@/lib/guests';

/**
 * GET /api/guests/:slug
 * Obtiene información de un invitado por slug (para personalización de invitación)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const guest = await getGuestBySlug(params.slug);

    if (!guest) {
      return NextResponse.json(
        { success: false, error: 'Invitado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: guest,
    });
  } catch (error) {
    console.error('Error fetching guest:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
