import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getGuestBySlug } from '@/lib/guests';
import InvitationExperience from '@/components/invitation/InvitationExperience';
import { eventConfig } from '@/data/eventConfig';

interface InvitationPageProps {
  params: {
    guestSlug: string;
  };
}

/**
 * Genera metadata dinámica para cada invitado
 */
export async function generateMetadata({
  params,
}: InvitationPageProps): Promise<Metadata> {
  const guest = await getGuestBySlug(params.guestSlug);

  if (!guest) {
    return {
      title: 'Invitación no encontrada',
    };
  }

  return {
    title: `Invitacion Magica para ${guest.name}`,
    description: `Una invitación especial para celebrar los ${eventConfig.celebrant.age} años de ${eventConfig.celebrant.name} en Hogwarts.`,
    openGraph: {
      title: `Invitacion Magica para ${guest.name}`,
      description: `Celebra con nosotros los ${eventConfig.celebrant.age} años de ${eventConfig.celebrant.name}. Una experiencia mágica te espera.`,
      type: 'website',
      images: [
        {
          url: '/howards-logo.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

const REVALIDATE_TIME = 3600; // Revalidar cada hora

export default async function InvitationPage({ params }: InvitationPageProps) {
  const guest = await getGuestBySlug(params.guestSlug);

  if (!guest) {
    notFound();
  }

  return (
    <div>
      <InvitationExperience guest={guest} />
    </div>
  );
}

// ISR - Revalidar cada cierto tiempo
export const revalidate = REVALIDATE_TIME;
