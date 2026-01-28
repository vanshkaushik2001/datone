import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Music, Tag, Plus, X, Youtube, Instagram } from 'lucide-react';
import type { ArtistProfile, CurrentUser } from '../../types/collab';
import { supabase } from '../../lib/supabase-client';

interface ProfileSetupProps {
  currentUser: CurrentUser;
  onSave: (profile: ArtistProfile) => void;
}

const TAG_RECOMMENDATIONS = [
  'Rapper',
  'Singer',
  'Producer',
  'Beat Maker',
  'Mixer',
  'Mastering Engineer',
  'DJ',
  'Hip-Hop',
  'Trap',
  'Lo-Fi',
  'Boom Bap',
  'Drill',
  'Sampling',
  'Beatboxing',
  'Vocals',
  'Mixing',
];

export function ProfileSetup({ currentUser, onSave }: ProfileSetupProps) {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [profilePhotoDataUrl, setProfilePhotoDataUrl] = useState('');
  const [sampleTrackDataUrl, setSampleTrackDataUrl] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t: string) => t !== tag));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSampleTrackDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!displayName.trim()) {
        setError('Display name is required');
        setLoading(false);
        return;
      }

      if (tags.length === 0) {
        setError('Please add at least one tag/skill');
        setLoading(false);
        return;
      }

      let profilePhotoUrl: string | undefined = profilePhotoDataUrl;
      let sampleTrackUrl: string | undefined = sampleTrackDataUrl;

      // Upload profile photo to Supabase Storage
      if (profilePhotoDataUrl && profilePhotoDataUrl.startsWith('data:')) {
        try {
          const photoFile = await dataURLtoFile(profilePhotoDataUrl, 'profile-photo.jpg');
          const photoPath = `${currentUser.email}/${Date.now()}-profile-photo.jpg`;
          const { data: photoData, error: photoError } = await supabase.storage
            .from('profile-photos')
            .upload(photoPath, photoFile);

          if (photoError) throw photoError;
          if (photoData) {
            const { data: urlData } = supabase.storage
              .from('profile-photos')
              .getPublicUrl(photoPath);
            profilePhotoUrl = urlData.publicUrl;
          }
        } catch (uploadError) {
          console.error('Photo upload error:', uploadError);
          setError('Failed to upload profile photo');
          setLoading(false);
          return;
        }
      }

      // Upload sample track to Supabase Storage
      if (sampleTrackDataUrl && sampleTrackDataUrl.startsWith('data:')) {
        try {
          const audioFile = await dataURLtoFile(sampleTrackDataUrl, 'sample-track.mp3');
          const audioPath = `${currentUser.email}/${Date.now()}-sample-track.mp3`;
          const { data: audioData, error: audioError } = await supabase.storage
            .from('audio-samples')
            .upload(audioPath, audioFile);

          if (audioError) throw audioError;
          if (audioData) {
            const { data: urlData } = supabase.storage
              .from('audio-samples')
              .getPublicUrl(audioPath);
            sampleTrackUrl = urlData.publicUrl;
          }
        } catch (uploadError) {
          console.error('Audio upload error:', uploadError);
          setError('Failed to upload sample track');
          setLoading(false);
          return;
        }
      }

      // Create artist profile object
      const profile: ArtistProfile = {
        id: Math.random().toString(36).substring(2, 11),
        email: currentUser.email,
        displayName,
        bio,
        roles: [],
        tags,
        profilePhotoDataUrl: profilePhotoUrl || '',
        sampleTrackDataUrl: sampleTrackUrl || '',
        createdAt: new Date().toISOString(),
        youtubeLink: youtubeLink.trim() || undefined,
        instagramHandle: instagramHandle.trim() || undefined,
      };

      // Save to Supabase database
      const { error: dbError } = await supabase.from('artists').insert([
        {
          email: profile.email,
          display_name: profile.displayName,
          bio: profile.bio,
          tags: profile.tags,
          youtube_link: profile.youtubeLink,
          instagram_handle: profile.instagramHandle,
          profile_photo_url: profilePhotoUrl,
          sample_track_url: sampleTrackUrl,
        },
      ]);

      if (dbError) {
        console.error('Database error:', dbError);
        setError('Failed to save profile to database');
        setLoading(false);
        return;
      }

      setLoading(false);
      onSave(profile);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  // Helper function to convert data URL to File
  const dataURLtoFile = (dataURL: string, filename: string): Promise<File> => {
    return new Promise((resolve) => {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      resolve(new File([u8arr], filename, { type: mime }));
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#082F49] to-[#0a3a5a]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <User size={48} className="text-[#FFE3A5]" />
            <h1 className="text-5xl md:text-6xl font-black text-[#FFE3A5] uppercase tracking-tight">
              Artist Profile
            </h1>
          </div>
          <p className="text-[#A9B2AC] text-lg">
            Set up your profile to start collaborating
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Display Name */}
          <div>
            <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm">
              Display Name *
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your artist name"
              className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors"
            />
          </div>

          {/* Tags / Skills with Recommendations */}
          <div>
            <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm">
              Tags / Skills *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                placeholder="Add a tag (e.g., trap, lo-fi)"
                className="flex-1 bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] px-4 py-2 focus:outline-none focus:border-[#FFE3A5] transition-colors"
              />
              <button
                type="button"
                onClick={() => handleAddTag(tagInput)}
                className="px-4 py-2 bg-[#FFE3A5] text-[#082F49] font-bold hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Selected Tags */}
            {tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE3A5]/10 text-[#FFE3A5] text-xs font-bold uppercase"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-400"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag Recommendations */}
            <div>
              <p className="text-[#A9B2AC] text-xs uppercase font-bold mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {TAG_RECOMMENDATIONS.filter((tag: string) => !tags.includes(tag)).map(
                  (tag: string) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      className="px-3 py-1 text-[11px] uppercase border border-[#FFE3A5]/30 text-[#A9B2AC] hover:text-[#FFE3A5] hover:border-[#FFE3A5]/60 hover:bg-[#FFE3A5]/5 transition-all"
                    >
                      + {tag}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* YouTube Link */}
          <div>
            <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm flex items-center gap-2">
              <Youtube size={16} />
              YouTube Link
            </label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://youtube.com/@yourhandle"
              className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors"
            />
          </div>

          {/* Instagram Link */}
          <div>
            <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm flex items-center gap-2">
              <Instagram size={16} />
              Instagram Handle
            </label>
            <div className="flex items-center">
              <span className="text-[#A9B2AC] px-4 py-3 bg-[#0a3a5a] border border-[#FFE3A5]/20 border-r-0">
                @
              </span>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                placeholder="yourhandle"
                className="flex-1 bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors"
              />
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors"
            />
            {profilePhotoDataUrl && (
              <div className="mt-3">
                <img
                  src={profilePhotoDataUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Sample Track */}
          <div>
            <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm flex items-center gap-2">
              <Music size={16} />
              Sample Track
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleSampleUpload}
              className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm font-bold">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-[#FFE3A5] text-[#082F49] font-black uppercase text-sm hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
