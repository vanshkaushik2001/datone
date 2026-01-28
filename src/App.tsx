import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { WeeklyArtists } from './components/WeeklyArtists';
import { TopArtists } from './components/TopArtists';
import { Playlist } from './components/Playlist';
import { Events } from './components/Events';
import { Collab } from './components/pages/Collab';
import { Create } from './components/pages/Create';
import { Explore } from './components/pages/Explore';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ArtistProfile, CurrentUser, STORAGE_KEYS } from './types/collab';
import { Signup } from './components/pages/Signup';
import { ProfileSetup } from './components/pages/ProfileSetup';
import { supabase } from './lib/supabase-client';

type Page = 'home' | 'collab' | 'create' | 'explore' | 'signup' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [profiles, setProfiles] = useState<ArtistProfile[]>([]);

  useEffect(() => {
    // Check for authenticated session
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Auth error:', error);
          return;
        }

        if (data.session?.user) {
          // User is logged in
          const storedUser = localStorage.getItem(STORAGE_KEYS.currentUser);
          if (!storedUser) {
            // First time after auth redirect, set the user
            const newUser: CurrentUser = {
              email: data.session.user.email || '',
              profileCompleted: false,
              id: data.session.user.id,
            };
            persistUser(newUser);
          } else {
            setCurrentUser(JSON.parse(storedUser));
          }
        } else {
          // Check localStorage as fallback
          const storedUser = localStorage.getItem(STORAGE_KEYS.currentUser);
          if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
          }
        }
      } catch {
        // ignore auth errors
      }
    };

    checkAuth();

    // Fetch artists from Supabase
    const fetchArtists = async () => {
      try {
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching artists:', error);
          return;
        }

        if (data) {
          const artists: ArtistProfile[] = data.map((artist) => ({
            id: artist.id,
            email: artist.email,
            displayName: artist.display_name,
            bio: artist.bio || '',
            roles: [],
            tags: artist.tags || [],
            profilePhotoDataUrl: artist.profile_photo_url || '',
            sampleTrackDataUrl: artist.sample_track_url || '',
            createdAt: artist.created_at,
            youtubeLink: artist.youtube_link,
            instagramHandle: artist.instagram_handle,
          }));
          setProfiles(artists);
        }
      } catch (err) {
        console.error('Unexpected error fetching artists:', err);
      }
    };

    fetchArtists();
  }, []);

  const persistUser = (user: CurrentUser | null) => {
    setCurrentUser(user);
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.currentUser);
      }
    } catch {
      // ignore storage errors
    }
  };

  const persistProfiles = (nextProfiles: ArtistProfile[]) => {
    setProfiles(nextProfiles);
    // No longer persisting to localStorage since we use Supabase
  };

  const handleNavigate = (page: Page) => {
    if (page === 'collab') {
      if (!currentUser) {
        setCurrentPage('signup');
        return;
      }
      if (!currentUser.profileCompleted) {
        setCurrentPage('profile');
        return;
      }
    }
    setCurrentPage(page);
  };

  const handleSignupComplete = (user: CurrentUser) => {
    const nextUser: CurrentUser = { ...user, profileCompleted: false };
    persistUser(nextUser);
    setCurrentPage('profile');
  };

  const handleProfileSaved = (profile: ArtistProfile) => {
    // Add the new profile to the list
    const nextProfiles = [profile, ...profiles].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    persistProfiles(nextProfiles);

    if (currentUser) {
      const updatedUser: CurrentUser = { ...currentUser, profileCompleted: true };
      persistUser(updatedUser);
    }

    setCurrentPage('collab');
  };

  return (
    <div className="min-h-screen bg-[#fdf6e3] text-[#082F49] relative">
      <AnimatedBackground />
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'home' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <WeeklyArtists />
          <TopArtists />
          <Playlist />
          <Events />
        </>
      )}

      {currentPage === 'signup' && <Signup onComplete={handleSignupComplete} />}
      {currentPage === 'profile' && currentUser && (
        <ProfileSetup currentUser={currentUser} onSave={handleProfileSaved} />
      )}

      {currentPage === 'collab' && (
        <Collab profiles={profiles} currentUserEmail={currentUser?.email ?? null} />
      )}
      {currentPage === 'create' && <Create />}
      {currentPage === 'explore' && <Explore />}
    </div>
  );
}

export default App;
