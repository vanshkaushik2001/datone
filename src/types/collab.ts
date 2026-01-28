export type Role = 'Artist' | 'Music Producer' | 'Mixing & Mastering';

export interface CurrentUser {
  email: string;
  profileCompleted: boolean;
  id?: string;
}

export interface ArtistProfile {
  id: string;
  email: string;
  displayName: string;
  bio: string;
  roles: Role[];
  tags: string[];
  profilePhotoDataUrl: string;
  sampleTrackDataUrl: string;
  createdAt: string;
  instagramHandle?: string;
  youtubeLink?: string;
}

export const STORAGE_KEYS = {
  currentUser: 'datone_currentUser',
  profiles: 'datone_profiles',
} as const;
