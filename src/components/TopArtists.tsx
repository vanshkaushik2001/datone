import { motion } from 'motion/react';
import { Trophy, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const topArtists = [
  {
    id: 1,
    rank: 1,
    name: 'Divine Flow',
    genre: 'Gully Rap Legend',
    streams: '2.4M',
    image: 'https://images.unsplash.com/photo-1603239750288-ada929eb33dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXBwZXIlMjBzdHVkaW8lMjBzZXNzaW9ufGVufDF8fHx8MTc2ODY0Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=600',
  },
  {
    id: 2,
    rank: 2,
    name: 'Karma Killz',
    genre: 'Underground King',
    streams: '1.8M',
    image: 'https://images.unsplash.com/photo-1718141765361-059d7337f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg1NTczMjV8MA&ixlib=rb-4.1.0&q=80&w=600',
  },
  {
    id: 3,
    rank: 3,
    name: 'Rebel Rhymes',
    genre: 'Street Poet',
    streams: '1.5M',
    image: 'https://images.unsplash.com/photo-1603239750288-ada929eb33dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXBwZXIlMjBzdHVkaW8lMjBzZXNzaW9ufGVufDF8fHx8MTc2ODY0Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=600',
  },
];

export function TopArtists() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#082F49] relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #FFE3A5 35px, #FFE3A5 36px)`,
        }}
      />

      {/* Floating accent shapes */}
      <motion.div
        className="absolute top-40 left-10 w-64 h-64 bg-[#4A0807] opacity-10 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Trophy size={48} className="text-[#FFE3A5]" />
          </motion.div>
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FFE3A5] uppercase tracking-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Top Artists
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 w-24 bg-[#4A0807] mt-2"
              style={{ transformOrigin: 'left' }}
            />
            <motion.p 
              className="text-[#A9B2AC] text-lg mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              The leaders of the movement
            </motion.p>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-gradient-to-br from-[#0a3a5a] to-[#082F49] overflow-hidden border-2 border-[#FFE3A5]/20 hover:border-[#FFE3A5] transition-all duration-300"
              style={{ perspective: '1000px' }}
            >
              {/* Rank Badge with animation */}
              <motion.div 
                className="absolute top-4 left-4 z-20 bg-[#FFE3A5] text-[#082F49] w-12 h-12 flex items-center justify-center font-black text-2xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                {artist.rank}
              </motion.div>

              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082F49] via-[#082F49]/50 to-transparent" />
                
                {/* Animated hover overlay */}
                <motion.div 
                  className="absolute inset-0 bg-[#4A0807] mix-blend-multiply"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Pulsing border on hover */}
                <motion.div
                  className="absolute inset-0 border-4 border-[#FFE3A5]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>

              <div className="p-6">
                <motion.h3 
                  className="text-2xl font-black text-[#FFE3A5] mb-2 transition-colors"
                  whileHover={{ color: '#4A0807', x: 5 }}
                >
                  {artist.name}
                </motion.h3>
                <motion.p 
                  className="text-[#A9B2AC] text-sm mb-4"
                  whileHover={{ x: 5 }}
                >
                  {artist.genre}
                </motion.p>
                
                <motion.div 
                  className="flex items-center gap-2 text-[#FFE3A5]"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <TrendingUp size={20} />
                  <span className="font-black text-lg">{artist.streams}</span>
                  <span className="text-[#A9B2AC] text-sm">streams</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}