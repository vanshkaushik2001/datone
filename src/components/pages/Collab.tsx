import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Users, MessageCircle, Instagram } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { ArtistProfile, Role } from '../../types/collab';

interface CollabProps {
  profiles: ArtistProfile[];
  currentUserEmail: string | null;
}

type RoleFilter = Role | 'All';

export function Collab({ profiles, currentUserEmail }: CollabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const audioRefs = useRef<Map<string, HTMLAudioElement | null>>(new Map());
  const cardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const stopTimeoutRef = useRef<number | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    profiles.forEach((p) => {
      p.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [profiles]);

  const roles: RoleFilter[] = ['All', 'Artist', 'Music Producer', 'Mixing & Mastering'];

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        !query ||
        profile.displayName.toLowerCase().includes(query) ||
        profile.bio.toLowerCase().includes(query) ||
        profile.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesRole =
        selectedRole === 'All' || profile.roles.includes(selectedRole as Role);

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          profile.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
        );

      return matchesSearch && matchesRole && matchesTags;
    });
  }, [profiles, searchTerm, selectedRole, selectedTags]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.profileId;
          if (!id) return;
          const audio = audioRefs.current.get(id);
          if (!audio) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            if (currentPlayingId && currentPlayingId !== id) {
              const prevAudio = audioRefs.current.get(currentPlayingId);
              if (prevAudio) {
                prevAudio.pause();
              }
            }

            audio.currentTime = 0;
            audio
              .play()
              .then(() => {
                setCurrentPlayingId(id);
                if (stopTimeoutRef.current) {
                  window.clearTimeout(stopTimeoutRef.current);
                }
                stopTimeoutRef.current = window.setTimeout(() => {
                  audio.pause();
                }, 25000);
              })
              .catch(() => {
                // auto-play might be blocked; ignore
              });
          } else {
            audio.pause();
          }
        });
      },
      {
        threshold: [0.6],
      },
    );

    cardRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => {
      observer.disconnect();
      if (stopTimeoutRef.current) {
        window.clearTimeout(stopTimeoutRef.current);
      }
    };
  }, [currentPlayingId, filteredProfiles.length]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#082F49] to-[#0a3a5a]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Users size={48} className="text-[#FFE3A5]" />
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-[#FFE3A5] uppercase tracking-tight">
              Collab
            </h1>
            <p className="text-[#A9B2AC] text-lg mt-2">
              Connect with artists. Build together. Create magic.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A9B2AC]" size={20} />
            <input
              type="text"
              placeholder="Search artists, bios, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] pl-12 pr-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 flex-wrap">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 font-bold uppercase text-xs transition-all ${
                  selectedRole === role
                    ? 'bg-[#FFE3A5] text-[#082F49]'
                    : 'bg-[#0a3a5a] text-[#A9B2AC] hover:bg-[#FFE3A5]/20 hover:text-[#FFE3A5]'
                }`}
              >
                {role === 'All' ? 'All roles' : role}
              </button>
            ))}
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTagFilter(tag)}
                  className={`px-3 py-1 text-[11px] uppercase border rounded-full transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-[#FFE3A5] text-[#082F49] border-[#FFE3A5]'
                      : 'bg-[#0a3a5a] text-[#A9B2AC] border-[#FFE3A5]/20 hover:border-[#FFE3A5]/60'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Artists Grid */}
      {filteredProfiles.length === 0 ? (
        <div className="border border-dashed border-[#FFE3A5]/30 bg-[#0a3a5a]/60 p-8 text-center text-sm text-[#A9B2AC]">
          <p className="font-bold text-[#FFE3A5] mb-2 uppercase tracking-widest text-xs">
            No profiles match yet
          </p>
          <p>
            Once artists create profiles with sample tracks, they&apos;ll appear here with
            auto-playing previews as you scroll.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            ref={(node) => {
              cardRefs.current.set(profile.id, node);
            }}
            data-profile-id={profile.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-[#0a3a5a] border border-[#FFE3A5]/10 hover:border-[#FFE3A5]/30 transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-square overflow-hidden">
              <ImageWithFallback
                src={profile.profilePhotoDataUrl}
                alt={profile.displayName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082F49] via-transparent opacity-80" />
              <div className="absolute inset-0 bg-[#4A0807] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-black text-[#FFE3A5] mb-1">
                  {profile.displayName}
                </h3>
                <p className="text-[#A9B2AC] text-sm">
                  {profile.roles.join(' · ')}
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#FFE3A5]/10 text-[#FFE3A5] text-xs font-bold uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-[#A9B2AC] text-sm mb-4">{profile.bio}</p>

              <audio
                ref={(node) => {
                  audioRefs.current.set(profile.id, node);
                }}
                src={profile.sampleTrackDataUrl}
                preload="none"
                className="w-full mb-4"
                controls={false}
              />

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 bg-[#FFE3A5] text-[#082F49] font-black uppercase text-sm hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  {currentUserEmail === profile.email ? 'Your Profile' : 'Connect'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-[#0a3a5a] border border-[#FFE3A5]/30 text-[#FFE3A5] hover:bg-[#FFE3A5] hover:text-[#082F49] transition-all"
                >
                  <Instagram size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}
    </div>
  );
}
