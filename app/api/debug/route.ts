import { NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prisma = getPrismaClient();
    
    // Test 1: Contar guests
    const count = await prisma.guest.count();
    
    // Test 2: Traer todos los guests
    const guests = await prisma.guest.findMany();
    
    // Test 3: Variables de entorno (sin mostrar valores sensibles)
    const env = {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
      DIRECT_URL_EXISTS: !!process.env.DIRECT_URL,
      DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
      DIRECT_URL_LENGTH: process.env.DIRECT_URL?.length || 0,
    };

    return NextResponse.json({
      success: true,
      environment: env,
      database: {
        guestCount: count,
        guests: guests.map(g => ({
          id: g.id,
          name: g.name,
          slug: g.slug,
          createdAt: g.createdAt,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const err = error as any;
    
    return NextResponse.json({
      success: false,
      error: msg,
      code: err.code,
      meta: err.meta,
      env: {
        DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
        DIRECT_URL_EXISTS: !!process.env.DIRECT_URL,
      },
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
