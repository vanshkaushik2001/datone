import { motion } from 'motion/react';
import { Scissors, Sliders, BarChart3, Upload, Download, Zap } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';

const tools = [
  {
    id: 1,
    name: 'Stem Splitter',
    icon: Scissors,
    description: 'Separate vocals, drums, bass, and instruments from any track',
    features: ['AI-Powered Separation', 'High Quality Output', 'Multiple Formats'],
    color: 'from-[#FFE3A5]/20 to-[#4A0807]/20',
  },
  {
    id: 2,
    name: 'Free Mixer & Master',
    icon: Sliders,
    description: 'Professional mixing and mastering tools for your tracks',
    features: ['EQ & Compression', 'Reverb & Delay', 'Auto-Mastering'],
    color: 'from-[#4A0807]/20 to-[#FFE3A5]/20',
  },
  {
    id: 3,
    name: 'Audio Analysis',
    icon: BarChart3,
    description: 'Detect tempo, BPM, musical key, and more from your audio',
    features: ['BPM Detection', 'Key Detection', 'Waveform Analysis'],
    color: 'from-[#FFE3A5]/20 to-[#0a3a5a]/40',
  },
];

export function Create() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#082F49] via-[#0a3a5a] to-[#082F49]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Zap size={48} className="text-[#FFE3A5]" />
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-[#FFE3A5] uppercase tracking-tight">
              Create
            </h1>
            <p className="text-[#A9B2AC] text-lg mt-2">
              Professional audio tools. Free. No limits.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Studio Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16 relative overflow-hidden aspect-[21/9] max-h-[400px]"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1757612550685-d15d473f2e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2ODYwMzc1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#082F49] via-[#082F49]/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-[#FFE3A5] mb-4">
              Your Digital Studio
            </h2>
            <p className="text-[#A9B2AC] text-lg">
              Everything you need to produce professional-quality tracks, right in your browser.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tools Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedTool(tool.id)}
            className={`group bg-gradient-to-br ${tool.color} border-2 p-8 cursor-pointer transition-all duration-300 ${
              selectedTool === tool.id
                ? 'border-[#FFE3A5] bg-[#0a3a5a]'
                : 'border-[#FFE3A5]/10 hover:border-[#FFE3A5]/30'
            }`}
          >
            <div className="mb-6">
              <tool.icon size={56} className="text-[#FFE3A5]" strokeWidth={1.5} />
            </div>

            <h3 className="text-2xl font-black text-[#FFE3A5] mb-3 group-hover:text-[#4A0807] transition-colors">
              {tool.name}
            </h3>

            <p className="text-[#A9B2AC] mb-6">{tool.description}</p>

            <ul className="space-y-2 mb-6">
              {tool.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-[#A9B2AC] text-sm">
                  <div className="w-1.5 h-1.5 bg-[#FFE3A5]" />
                  {feature}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-[#FFE3A5] text-[#082F49] font-black uppercase hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all"
            >
              Launch Tool
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#0a3a5a] border-2 border-dashed border-[#FFE3A5]/30 p-12 text-center"
      >
        <Upload size={64} className="text-[#FFE3A5] mx-auto mb-6" />
        <h3 className="text-2xl font-black text-[#FFE3A5] mb-3">
          Ready to Create?
        </h3>
        <p className="text-[#A9B2AC] mb-6 max-w-2xl mx-auto">
          Drag and drop your audio file here, or click to browse. Supported formats: MP3, WAV, FLAC, M4A
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-[#FFE3A5] text-[#082F49] font-black uppercase tracking-wider hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all inline-flex items-center gap-3"
        >
          <Upload size={20} />
          Upload Audio
        </motion.button>
      </motion.div>

      {/* Info Boxes */}
      <div className="grid gap-6 md:grid-cols-2 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#FFE3A5]/10 to-transparent p-6 border border-[#FFE3A5]/20"
        >
          <h4 className="text-xl font-black text-[#FFE3A5] mb-3 flex items-center gap-2">
            <Zap size={24} />
            Fast Processing
          </h4>
          <p className="text-[#A9B2AC]">
            Our AI-powered tools process your audio in seconds, not minutes. Get results fast and keep your creative flow going.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#4A0807]/10 to-transparent p-6 border border-[#FFE3A5]/20"
        >
          <h4 className="text-xl font-black text-[#FFE3A5] mb-3 flex items-center gap-2">
            <Download size={24} />
            High Quality Output
          </h4>
          <p className="text-[#A9B2AC]">
            All tools maintain the highest audio quality. Download your processed files in multiple formats without any loss.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
