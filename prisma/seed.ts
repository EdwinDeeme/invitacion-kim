import { PrismaClient } from '@prisma/client';
import { generateSlug, determineGuestType } from '../lib/utils';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sembrando base de datos...');

  // Limpiar datos existentes
  await prisma.rSVP.deleteMany();
  await prisma.guest.deleteMany();

  // Agregar invitados de ejemplo
  const guests = [
    { name: 'Helen y Andrés', numberOfGuests: 2 },
    { name: 'Laura', numberOfGuests: 1 },
    { name: 'Carlos y María con niños', numberOfGuests: 4 },
    { name: 'Diego', numberOfGuests: 1 },
    { name: 'Sofia y Juan', numberOfGuests: 2 },
  ];

  for (const guest of guests) {
    const slug = generateSlug(guest.name);
    const guestType = determineGuestType(guest.numberOfGuests);

    await prisma.guest.create({
      data: {
        slug,
        name: guest.name,
        numberOfGuests: guest.numberOfGuests,
        guestType,
        status: 'pending',
      },
    });

    console.log(`✅ Invitado creado: ${guest.name} (${slug})`);
  }

  console.log('🎉 Base de datos lista con invitados de ejemplo!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error durante seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
