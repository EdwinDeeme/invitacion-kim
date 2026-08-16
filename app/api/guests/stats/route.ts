import { NextRequest, NextResponse } from 'next/server';
import { getRSVPStats } from '@/lib/guests';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/guests/stats
 * Obtiene estadísticas de RSVP
 */
export async function GET(_request: NextRequest) {
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
