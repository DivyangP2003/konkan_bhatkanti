'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Star, Calendar, Users } from 'lucide-react';
import { useScrollReveal } from '@/app/_hooks/useScrollAnimation';

export default function InteractiveAttractionsMap() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const attractions = [
    {
      id: 1,
      name: 'Kolhapur Fort',
      category: 'forts',
      coordinates: '16.6°N, 73.2°E',
      distance: '60km from Alibaug',
      season: 'Oct-May',
      description:
        'Majestic 16th-century fort overlooking the Arabian Sea with breathtaking views and rich history.',
      rating: 4.8,
      visitors: '50,000+ yearly',
      x: '25%',
      y: '35%',
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 2,
      name: 'Murud Beach',
      category: 'beaches',
      coordinates: '18.4°N, 72.9°E',
      distance: '80km from Alibaug',
      season: 'Year-round',
      description: 'Pristine golden sand beach with clear waters, perfect for swimming and water sports.',
      rating: 4.6,
      visitors: '100,000+ yearly',
      x: '45%',
      y: '28%',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      id: 3,
      name: 'Jaigad Fort',
      category: 'forts',
      coordinates: '17.9°N, 73.3°E',
      distance: '45km from Alibaug',
      season: 'Oct-May',
      description:
        'Historic fort built by the Marathas with intricate architecture and panoramic coastal views.',
      rating: 4.5,
      visitors: '35,000+ yearly',
      x: '35%',
      y: '50%',
      color: 'from-amber-600 to-yellow-600',
    },
    {
      id: 4,
      name: 'Nhava Sheva Mangroves',
      category: 'nature',
      coordinates: '18.95°N, 73.0°E',
      distance: '75km from Alibaug',
      season: 'Jun-Sep',
      description:
        'Vast mangrove forests supporting diverse wildlife and providing crucial ecosystem services.',
      rating: 4.7,
      visitors: '25,000+ yearly',
      x: '55%',
      y: '55%',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 5,
      name: 'Kihim Beach',
      category: 'beaches',
      coordinates: '18.2°N, 72.8°E',
      distance: '35km from Alibaug',
      season: 'Oct-May',
      description: 'Scenic beach village with traditional fishing culture and vibrant local markets.',
      rating: 4.4,
      visitors: '60,000+ yearly',
      x: '20%',
      y: '70%',
      color: 'from-teal-400 to-cyan-500',
    },
    {
      id: 6,
      name: 'Degaon Flora Sanctuary',
      category: 'flora',
      coordinates: '17.7°N, 73.4°E',
      distance: '55km from Alibaug',
      season: 'Jul-Mar',
      description: 'Biodiversity hotspot with rare plant species and medicinal herbs unique to Konkan.',
      rating: 4.9,
      visitors: '15,000+ yearly',
      x: '70%',
      y: '40%',
      color: 'from-green-600 to-lime-500',
    },
    {
      id: 7,
      name: 'Velas Turtle Sanctuary',
      category: 'wildlife',
      coordinates: '17.6°N, 73.25°E',
      distance: '50km from Alibaug',
      season: 'Nov-Feb',
      description: 'Protected breeding ground for endangered sea turtles with conservation programs.',
      rating: 4.8,
      visitors: '20,000+ yearly',
      x: '65%',
      y: '65%',
      color: 'from-blue-500 to-teal-600',
    },
    {
      id: 8,
      name: 'Savitri Temple',
      category: 'temples',
      coordinates: '17.3°N, 73.3°E',
      distance: '40km from Alibaug',
      season: 'Year-round',
      description:
        'Ancient hilltop temple with 1000+ steps and panoramic views of the Sahyadri Mountains.',
      rating: 4.6,
      visitors: '80,000+ yearly',
      x: '50%',
      y: '75%',
      color: 'from-yellow-500 to-orange-400',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Attractions', color: 'from-slate-500 to-slate-600' },
    { id: 'beaches', label: 'Beaches', color: 'from-blue-500 to-cyan-500' },
    { id: 'forts', label: 'Forts', color: 'from-amber-600 to-yellow-600' },
    { id: 'temples', label: 'Temples', color: 'from-yellow-500 to-orange-400' },
    { id: 'nature', label: 'Nature', color: 'from-green-500 to-emerald-500' },
    { id: 'wildlife', label: 'Wildlife', color: 'from-blue-500 to-teal-600' },
    { id: 'flora', label: 'Flora', color: 'from-green-600 to-lime-500' },
  ];

  const filteredAttractions =
    activeCategory === 'all'
      ? attractions
      : attractions.filter((attr) => attr.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-teal-400 text-sm font-bold tracking-widest uppercase mb-4">
            Explore Konkan
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Interactive Attractions Map
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Discover hidden gems, cultural hotspots, and natural wonders across the Konkan region.
            Click on markers to learn more about each destination.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variants={itemVariants}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 aspect-video"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Stylized Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-slate-900">
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Attractions Markers */}
          <motion.div
            className="absolute inset-0"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {filteredAttractions.map((attraction) => (
              <motion.button
                key={attraction.id}
                variants={itemVariants}
                className="absolute group -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: attraction.x, top: attraction.y }}
                onClick={() => setSelectedAttraction(attraction)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1.1 }}
              >
                {/* Pulsing ring */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${attraction.color}`}
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                {/* Marker circle */}
                <div
                  className={`relative w-6 h-6 rounded-full bg-gradient-to-r ${attraction.color} border-2 border-white shadow-lg`}
                >
                  <MapPin className="w-3 h-3 absolute inset-1.5 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
                  {attraction.name}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Empty State */}
          <AnimatePresence>
            {filteredAttractions.length === 0 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-slate-400 text-lg">No attractions in this category</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Attraction Details Panel */}
        <AnimatePresence>
          {selectedAttraction && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAttraction(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedAttraction(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>

                  {/* Content */}
                  <div className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {selectedAttraction.name}
                          </h3>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <span className="text-white font-semibold">
                                {selectedAttraction.rating}
                              </span>
                            </div>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-400">{selectedAttraction.visitors}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-300 text-lg mb-4">
                        {selectedAttraction.description}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <p className="text-slate-400 text-sm font-medium mb-1">Location</p>
                        <p className="text-white font-semibold">{selectedAttraction.coordinates}</p>
                        <p className="text-slate-400 text-sm">{selectedAttraction.distance}</p>
                      </div>

                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <p className="text-slate-400 text-sm font-medium mb-1">Best Season</p>
                        <p className="text-white font-semibold flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {selectedAttraction.season}
                        </p>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4">
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all">
                        Add to Trip
                      </button>
                      <button className="flex-1 px-6 py-3 border-2 border-emerald-500 text-emerald-400 font-bold rounded-lg hover:bg-emerald-500/10 transition-all">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Footer */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-slate-400">
            Showing {filteredAttractions.length} attraction{filteredAttractions.length !== 1 ? 's' : ''} •
            Explore the complete map and discover your next adventure
          </p>
        </motion.div>
      </div>
    </section>
  );
}
