import { NextRequest, NextResponse } from 'next/server';
import { getGuestById, updateGuest, deleteGuest } from '@/lib/guests';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/guests/by-id/:id
 * Obtiene un invitado por ID
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requerido' },
        { status: 400 }
      );
    }

    const guest = await getGuestById(id);

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

/**
 * PUT /api/guests/by-id/:id
 * Actualiza un invitado (requiere autenticación)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requerido' },
        { status: 400 }
      );
    }

    const adminPassword = request.headers.get('x-admin-password');
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword || adminPassword !== correctPassword) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const guest = await updateGuest(id, {
      name: body.name,
      numberOfGuests: body.numberOfGuests,
      guestType: body.guestType,
      status: body.status,
    } as any);

    if (!guest) {
      return NextResponse.json(
        { success: false, error: 'No se pudo actualizar el invitado' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: guest,
    });
  } catch (error) {
    console.error('Error updating guest:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/guests/by-id/:id
 * Elimina un invitado (requiere autenticación)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requerido' },
        { status: 400 }
      );
    }

    const adminPassword = request.headers.get('x-admin-password');
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword || adminPassword !== correctPassword) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const success = await deleteGuest(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'No se pudo eliminar el invitado' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Invitado eliminado',
    });
  } catch (error) {
    console.error('Error deleting guest:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
