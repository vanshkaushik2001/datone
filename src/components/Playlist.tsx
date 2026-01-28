import { motion } from 'motion/react';
import { Play, Music2, Headphones } from 'lucide-react';

const playlists = [
  {
    id: 1,
    name: 'DHH Essentials',
    trackCount: 50,
    description: 'The ultimate Desi Hip-Hop starter pack',
  },
  {
    id: 2,
    name: 'Underground Heat',
    trackCount: 35,
    description: 'Raw and unfiltered street anthems',
  },
  {
    id: 3,
    name: 'Cypher Sessions',
    trackCount: 42,
    description: 'Live freestyles and battle tracks',
  },
  {
    id: 4,
    name: 'New Wave',
    trackCount: 28,
    description: 'Fresh voices pushing the culture forward',
  },
];

export function Playlist() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#082F49] via-[#0a3a5a] to-[#082F49]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Music2 size={36} className="text-[#FFE3A5]" />
          <h2 className="text-4xl md:text-5xl font-black text-[#FFE3A5] uppercase tracking-tight">
            DATONE Playlists
          </h2>
        </div>
        <p className="text-[#A9B2AC] text-lg max-w-2xl mx-auto">
          Curated collections of the best in Desi Hip-Hop
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-[#0a3a5a] p-6 border border-[#FFE3A5]/10 hover:border-[#FFE3A5]/30 transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-square bg-gradient-to-br from-[#FFE3A5]/20 to-[#4A0807]/20 mb-4 flex items-center justify-center relative overflow-hidden">
              <Headphones size={64} className="text-[#FFE3A5] opacity-30" />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 bg-[#4A0807]/80 flex items-center justify-center"
              >
                <Play size={48} className="text-[#FFE3A5] fill-[#FFE3A5]" />
              </motion.div>
            </div>
            <h3 className="text-xl font-black text-[#FFE3A5] mb-2 group-hover:text-[#4A0807] transition-colors">
              {playlist.name}
            </h3>
            <p className="text-[#A9B2AC] text-sm mb-3">{playlist.description}</p>
            <p className="text-[#FFE3A5] text-xs font-bold">{playlist.trackCount} tracks</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-[#FFE3A5] text-[#082F49] font-black uppercase tracking-wider hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all duration-300 inline-flex items-center gap-3"
        >
          <Play size={20} className="fill-current" />
          Listen to the DATONE Sound
        </motion.button>
      </motion.div>
    </section>
  );
}
