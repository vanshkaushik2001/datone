import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

type Page = 'home' | 'collab' | 'create' | 'explore' | 'signup' | 'profile';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* YouTube Video Background */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ scale }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/UURU3c4he0c?autoplay=1&mute=1&loop=1&playlist=UURU3c4he0c"
            title="DATONE Hip-Hop"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#082F49]" />
        </motion.div>

        {/* Minimalistic DATONE Logo - fades out on scroll */}
        <motion.div 
          className="relative z-10 text-center"
          style={{ opacity: logoOpacity }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[10rem] md:text-[14rem] lg:text-[22rem] font-black tracking-tighter text-[#FFE3A5] leading-none select-none"
            style={{
              fontFamily: 'Megazoid, sans-serif',
              fontWeight: '400',
              letterSpacing: '-0.02em',
              textShadow: '0 0 80px rgba(255, 227, 165, 0.3)',
            }}
          >
            DATONE
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="h-2 bg-[#FFE3A5] mt-6 mx-auto"
            style={{ width: '80%', transformOrigin: 'left' }}
          />

          {/* Minimal tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base text-[#A9B2AC] mt-8 uppercase tracking-[0.3em] font-black"
          >
            DESI HIP-HOP
          </motion.p>
        </motion.div>

        {/* Scroll indicator - animated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ opacity: logoOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[#A9B2AC] text-xs uppercase tracking-widest font-black">
              Scroll to Enter
            </span>
            <motion.div
              animate={{ 
                scaleY: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="w-6 h-10 border-2 border-[#FFE3A5] rounded-full flex items-start justify-center p-2"
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-[#FFE3A5] rounded-full"
                animate={{ 
                  y: [0, 16, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
