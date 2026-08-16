// Types for the invitation system

export type GuestType = 'individual' | 'couple' | 'family' | 'group';
export type GuestStatus = 'pending' | 'confirmed' | 'declined';
export type HogwartsHouse = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface Guest {
  id: string;
  slug: string;
  name: string;
  numberOfGuests: number;
  guestType: GuestType;
  status: GuestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface RSVP {
  id: string;
  guestId: string;
  guest?: Guest;
  attending: boolean | null;
  numberOfGuestsAttending: number | null;
  guestName: string | null;
  submittedAt: Date;
  updatedAt: Date;
}

export interface EventConfig {
  celebrant: {
    name: string;
    age: number;
  };
  event: {
    date: string; // "2026-09-13"
    time: string; // "15:00" (3:00 PM)
    location: string;
    address: string;
    dressCode: string;
    additionalInfo: string;
    mapsUrl: string;
    wazeUrl: string;
  };
}

export interface InvitationSession {
  guestId: string;
  guestName: string;
  guestType: GuestType;
  numberOfGuests: number;
  currentScene: 'intro' | 'letter' | 'wand' | 'hat' | 'map';
  selectedHouse: HogwartsHouse | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
