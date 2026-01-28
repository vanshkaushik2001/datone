import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'collab' | 'create' | 'explore' | 'signup' | 'profile';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation with glass morphism */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 lg:px-20 backdrop-blur-md bg-[#082F49]/70 border-b border-[#FFE3A5]/10"
      >
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => handleNavigate('home')}
            className="font-megazoid text-2xl md:text-3xl font-black tracking-tighter text-[#FFE3A5] hover:text-[#4A0807] transition-colors relative"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 227, 165, 0.5)',
                '0 0 20px rgba(255, 227, 165, 0.8)',
                '0 0 10px rgba(255, 227, 165, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            DA<span className="text-base md:text-xl">t</span>ONE
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['collab', 'create', 'explore'].map((page, index) => (
              <motion.button
                key={page}
                onClick={() => handleNavigate(page as any)}
                className={`font-megazoid uppercase tracking-wide font-black text-lg transition-colors relative ${
                  currentPage === page
                    ? 'text-[#FFE3A5]'
                    : 'text-[#A9B2AC] hover:text-[#FFE3A5]'
                }`}
                style={{ fontFamily: '"Megazoid", system-ui, sans-serif' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
                {currentPage === page && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FFE3A5]"
                    style={{ boxShadow: '0 0 10px rgba(255, 227, 165, 0.8)' }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FFE3A5] hover:text-[#4A0807] transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-40 bg-[#082F49] md:hidden backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-12">
              {['home', 'collab', 'create', 'explore'].map((page, index) => (
                <motion.button
                  key={page}
                  onClick={() => handleNavigate(page as any)}
                  className={`font-megazoid text-4xl uppercase tracking-wide font-black transition-colors ${
                    currentPage === page
                      ? 'text-[#FFE3A5]'
                      : 'text-[#A9B2AC] hover:text-[#FFE3A5]'
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, x: 20 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {page}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}