import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const weeklyArtists = [
  {
    id: 1,
    name: 'MC Vortex',
    genre: 'Trap / Hindi Rap',
    image: 'https://images.unsplash.com/photo-1718141765361-059d7337f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg1NTczMjV8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 2,
    name: 'Desi Cipher',
    genre: 'Boom Bap / Punjabi',
    image: 'https://images.unsplash.com/photo-1603239750288-ada929eb33dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXBwZXIlMjBzdHVkaW8lMjBzZXNzaW9ufGVufDF8fHx8MTc2ODY0Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 3,
    name: 'Urban Poet',
    genre: 'Conscious Rap',
    image: 'https://images.unsplash.com/photo-1718141765361-059d7337f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg1NTczMjV8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 4,
    name: 'Street Sage',
    genre: 'Drill / Gully Rap',
    image: 'https://images.unsplash.com/photo-1603239750288-ada929eb33dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXBwZXIlMjBzdHVkaW8lMjBzZXNzaW9ufGVufDF8fHx8MTc2ODY0Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 5,
    name: 'Rhythm Rebel',
    genre: 'Experimental Hip-Hop',
    image: 'https://images.unsplash.com/photo-1718141765361-059d7337f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg1NTczMjV8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
];

export function WeeklyArtists() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#082F49] to-[#0a3a5a] relative overflow-hidden">
      {/* Animated background accent */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-[#FFE3A5] opacity-5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FFE3A5] mb-4 uppercase tracking-tight"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Weekly Artists
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 w-32 bg-[#4A0807] mb-4"
          style={{ transformOrigin: 'left' }}
        />
        <motion.p 
          className="text-[#A9B2AC] text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Discover the freshest voices in Desi Hip-Hop
        </motion.p>
      </motion.div>

      <div className="overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 relative z-10">
        <div className="flex gap-6 min-w-max md:grid md:grid-cols-2 lg:grid-cols-5 md:min-w-0">
          {weeklyArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group w-64 md:w-auto"
              style={{ perspective: '1000px' }}
            >
              <div className="relative overflow-hidden bg-[#0a3a5a] rounded-none aspect-[3/4] mb-4 border-2 border-[#FFE3A5]/20 group-hover:border-[#FFE3A5] transition-all duration-300">
                <ImageWithFallback
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082F49] via-transparent opacity-60" />
                
                {/* Animated overlay on hover */}
                <motion.div 
                  className="absolute inset-0 bg-[#4A0807] mix-blend-multiply"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#FFE3A5]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              
              <motion.h3 
                className="text-[#FFE3A5] font-black text-xl mb-1 transition-colors"
                whileHover={{ color: '#4A0807', x: 5 }}
              >
                {artist.name}
              </motion.h3>
              <motion.p 
                className="text-[#A9B2AC] text-sm"
                whileHover={{ x: 5 }}
              >
                {artist.genre}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}