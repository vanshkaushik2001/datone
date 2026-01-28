import { motion } from 'motion/react';

export function AnimatedBackground() {
  // Create multiple squiggle paths with hip-hop inspired shapes
  const squiggles = [
    // Microphone cable squiggle
    "M 50 100 Q 100 50, 150 100 T 250 100 Q 300 150, 350 100",
    // Vinyl record groove
    "M 200 200 Q 250 150, 300 200 T 400 200 Q 450 250, 500 200",
    // Graffiti tag line
    "M 600 300 Q 650 250, 700 300 T 800 300 Q 850 350, 900 300",
    // Beat wave
    "M 100 400 Q 150 350, 200 400 T 300 400 Q 350 450, 400 400",
    // Chain link
    "M 700 500 Q 750 450, 800 500 T 900 500 Q 950 550, 1000 500",
    // Speaker wire
    "M 300 600 Q 350 550, 400 600 T 500 600 Q 550 650, 600 600",
    // Boombox wave
    "M 50 700 Q 100 650, 150 700 T 250 700 Q 300 750, 350 700",
    // Turntable scratch
    "M 800 100 Q 850 50, 900 100 T 1000 100 Q 1050 150, 1100 100",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
      <svg className="w-full h-full" viewBox="0 0 1200 800">
        {squiggles.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            stroke="#FFE3A5"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0],
              x: [0, Math.sin(index) * 50, 0],
              y: [0, Math.cos(index) * 30, 0],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 227, 165, 0.5))',
            }}
          />
        ))}
        
        {/* Floating circles - like vinyl records */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={`circle-${i}`}
            cx={200 + i * 200}
            cy={150 + i * 100}
            r="30"
            stroke="#FFE3A5"
            strokeWidth="2"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "linear",
            }}
          />
        ))}

        {/* Spray paint dots */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={Math.random() * 1200}
            cy={Math.random() * 800}
            r={Math.random() * 5 + 2}
            fill="#4A0807"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Beat bars - like equalizer */}
        {[...Array(8)].map((_, i) => (
          <motion.rect
            key={`bar-${i}`}
            x={100 + i * 120}
            y="650"
            width="40"
            height="100"
            fill="#A9B2AC"
            opacity="0.3"
            animate={{
              height: [50, 150, 50],
              y: [675, 575, 675],
            }}
            transition={{
              duration: 0.8 + (i % 3) * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
