"use client";

import { motion } from "framer-motion";
import { Waves, Mountain, Zap, Compass } from "lucide-react";
import { useScrollReveal, useStaggerAnimation } from "@/app/_hooks/useScrollAnimation";

export default function AdventureSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const staggerAnimation = useStaggerAnimation(0.12);
  const adventures = [
    {
      id: 1,
      title: "Water Sports",
      description: "Kayaking, surfing, scuba diving, and water skiing in pristine coastal waters",
      icon: Waves,
      activities: ["Surfing", "Kayaking", "Scuba Diving", "Jet Skiing"],
      difficulty: "Moderate to Hard",
      season: "Year-round",
    },
    {
      id: 2,
      title: "Trekking",
      description: "Explore scenic mountain trails through forests and reach hidden viewpoints",
      icon: Mountain,
      activities: ["Forest Trails", "Mountain Peaks", "Waterfall Treks", "Night Treks"],
      difficulty: "Easy to Hard",
      season: "Oct-May",
    },
    {
      id: 3,
      title: "Thrill Activities",
      description: "Para-gliding, rappelling, zip-lining, and rock climbing experiences",
      icon: Zap,
      activities: ["Para-gliding", "Rappelling", "Zip-lining", "Rock Climbing"],
      difficulty: "Moderate to Hard",
      season: "Sep-Mar",
    },
    {
      id: 4,
      title: "Exploration",
      description: "Cave exploration, boat tours, and off-the-beaten-path discoveries",
      icon: Compass,
      activities: ["Cave Tours", "Boat Cruises", "Village Walks", "Heritage Trails"],
      difficulty: "Easy to Moderate",
      season: "Year-round",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-200 to-teal-200 rounded-full opacity-20 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Adventure & Activities
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Fuel your adrenaline with thrilling adventures in Konkan&apos;s stunning natural landscapes
          </p>
        </motion.div>

        {/* Adventures Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={staggerAnimation.container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {adventures.map((adventure, index) => {
            const Icon = adventure.icon;
            return (
              <motion.div
                key={adventure.id}
                variants={staggerAnimation.item}
                className="group relative bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {adventure.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {adventure.description}
                </p>

                {/* Activities */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-500 mb-2">
                    Popular Activities:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {adventure.activities.map((activity) => (
                      <span
                        key={activity}
                        className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info Pills */}
                <div className="flex gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Level:</span>
                    <span className="text-slate-600">{adventure.difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-700">Best Season:</span>
                  <span className="text-slate-600">{adventure.season}</span>
                </div>

                {/* CTA */}
                <motion.button
                  className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Now
                </motion.button>

                {/* Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Experience */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h3>
          <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
            Book a guided tour with local experts who know Konkan&apos;s hidden treasures and ensure your safety
          </p>
          <motion.button
            className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Adventures
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
