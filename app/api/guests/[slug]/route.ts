import { NextResponse } from 'next/server';
import { getGuestBySlug } from '@/lib/guests';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/guests/:slug
 * Obtiene información de un invitado por slug (para personalización de invitación)
 */
export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params?.slug;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug requerido' },
        { status: 400 }
      );
    }

    const guest = await getGuestBySlug(slug);

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
