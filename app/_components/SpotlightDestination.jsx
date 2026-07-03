'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, Users, Zap, ArrowRight } from 'lucide-react';
import { useScrollReveal, useParallax } from '@/app/_hooks/useScrollAnimation';

export default function SpotlightDestination() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const { parallaxY } = useParallax(0.3);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const destination = {
    title: 'Explore Alibaug',
    subtitle: 'The Gateway to Konkan Adventure',
    description:
      'Alibaug stands as a perfect introduction to Konkan\'s charm—a coastal town where pristine beaches meet historical forts, vibrant markets meet serene backwaters, and adventure seekers find paradise.',
    image: '/alibaug.png',
    highlights: [
      {
        icon: MapPin,
        label: 'Kolhapur Fort',
        description: 'Ancient fortification with stunning ocean views',
      },
      {
        icon: Calendar,
        label: 'Best Season',
        description: 'October to May',
      },
      {
        icon: Users,
        label: 'Local Culture',
        description: 'Vibrant fishing villages and markets',
      },
      {
        icon: Zap,
        label: 'Adventure',
        description: 'Water sports and trekking trails',
      },
    ],
    facts: [
      { number: '50+', label: 'Beaches' },
      { number: '4', label: 'Major Forts' },
      { number: '200km', label: 'Coastline' },
      { number: '1000s', label: 'Plant Species' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden py-20"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-teal-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={itemVariants}
            className="text-emerald-400 text-sm font-bold tracking-widest uppercase mb-4"
          >
            Featured Destination
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {destination.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-2xl text-slate-400 font-light mb-4"
          >
            {destination.subtitle}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-300 max-w-3xl mx-auto"
          >
            {destination.description}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Section with Interactive Hover */}
          <motion.div
            variants={itemVariants}
            className="relative group"
            onMouseMove={handleMouseMove}
          >
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={destination.image || '/placeholder.svg'}
                alt={destination.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

              {/* Interactive Spotlight Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)`,
                }}
              />

              {/* Badge Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full font-bold text-sm"
              >
                Must Visit ★★★★★
              </motion.div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {destination.highlights.map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <Icon className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold mb-2">{highlight.label}</h3>
                  <p className="text-slate-400 text-sm">{highlight.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {destination.facts.map((fact, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 text-center group hover:border-teal-500 transition-all duration-300"
            >
              <motion.p
                className="text-4xl md:text-5xl font-bold text-teal-400 mb-2 group-hover:text-teal-300 transition-colors"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
              >
                {fact.number}
              </motion.p>
              <p className="text-slate-400 font-medium">{fact.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.button
            variants={itemVariants}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <motion.button
            variants={itemVariants}
            className="px-8 py-4 border-2 border-emerald-500 text-emerald-400 font-bold rounded-xl hover:bg-emerald-500/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <p className="text-slate-500 text-xs font-medium">Scroll to discover more</p>
        </motion.div>
      </div>
    </section>
  );
}
