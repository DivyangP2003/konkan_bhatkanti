'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const sections = [
    { name: 'Hero', id: 'hero', color: 'from-blue-500 to-cyan-500' },
    { name: 'Destinations', id: 'destinations', color: 'from-emerald-500 to-teal-500' },
    { name: 'Culture', id: 'culture', color: 'from-pink-500 to-rose-500' },
    { name: 'Cuisine', id: 'cuisine', color: 'from-amber-500 to-orange-500' },
    { name: 'Adventure', id: 'adventure', color: 'from-red-500 to-pink-500' },
    { name: 'Nature', id: 'nature', color: 'from-green-500 to-emerald-500' },
    { name: 'Festivals', id: 'festivals', color: 'from-purple-500 to-pink-500' },
    { name: 'Heritage', id: 'heritage', color: 'from-amber-600 to-orange-600' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      setProgress(Math.min(scrolled, 1));
      setShowProgress(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 z-40"
        style={{ scaleX: progress }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Floating Navigation Pill */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: showProgress ? 1 : 0, x: showProgress ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        pointerEvents={showProgress ? 'auto' : 'none'}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 shadow-lg">
          <div className="flex flex-col gap-2">
            {sections.map((section, idx) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-2 h-2 rounded-full bg-slate-400 hover:bg-white transition-all duration-300 group relative"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                title={section.name}
              >
                {/* Tooltip on hover */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {section.name}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile Progress Indicator */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-40 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs text-slate-400 font-medium">
          {Math.round(progress * 100)}%
        </div>
        <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Floating Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: progress > 0.3 ? 1 : 0,
          y: progress > 0.3 ? 0 : 20,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        pointerEvents={progress > 0.3 ? 'auto' : 'none'}
        title="Back to top"
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </motion.button>
    </>
  );
}
