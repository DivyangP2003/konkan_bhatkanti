"use client";

import { motion } from "framer-motion";
import { Sparkles, Music, Flame, Gift } from "lucide-react";
import { useScrollReveal, useStaggerAnimation } from "@/app/_hooks/useScrollAnimation";

export default function FestivalsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const staggerAnimation = useStaggerAnimation(0.15);
  const festivals = [
    {
      id: 1,
      name: "Ganesh Chaturthi",
      month: "Aug - Sep",
      description: "Celebration of Lord Ganesha with elaborate idols and public processions",
      icon: Sparkles,
      highlights: ["Idol Installation", "Cultural Programs", "Processions", "Prayers"],
      significance: "Religious & Cultural",
    },
    {
      id: 2,
      name: "Diwali",
      month: "Oct - Nov",
      description: "Festival of lights with fireworks, sweets, and family gatherings",
      icon: Flame,
      highlights: ["Oil Lamps", "Fireworks", "Sweets", "Family Time"],
      significance: "Spiritual & Social",
    },
    {
      id: 3,
      name: "Holi",
      month: "Mar - Apr",
      description: "Festival of colors celebrating spring and new beginnings",
      icon: Gift,
      highlights: ["Color Play", "Bonfire", "Traditional Food", "Celebrations"],
      significance: "Joy & Renewal",
    },
    {
      id: 4,
      name: "Local Fairs",
      month: "Throughout Year",
      description: "Village fairs, temple festivals, and seasonal celebrations",
      icon: Music,
      highlights: ["Local Crafts", "Folk Music", "Dance", "Street Food"],
      significance: "Community & Heritage",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full -ml-48 -mt-48 opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerAnimation.container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Festivals & Celebrations
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Experience Konkan&apos;s vibrant festivals filled with colors, joy, spirituality, and community spirit
          </p>
        </motion.div>

        {/* Festivals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {festivals.map((festival) => {
            const Icon = festival.icon;
            return (
              <motion.div
                key={festival.id}
                variants={staggerAnimation.item}
                className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient Header */}
                <div className="relative h-24 bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <Icon className="w-full h-full text-white opacity-10" />
                  </div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {festival.name}
                      </h3>
                      <p className="text-sm font-semibold text-rose-600 mt-1">
                        {festival.month}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6">
                    {festival.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      Highlights:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {festival.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Significance */}
                  <div className="flex items-center gap-2 text-sm mb-6">
                    <span className="font-semibold text-slate-700">
                      Significance:
                    </span>
                    <span className="text-slate-600">{festival.significance}</span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    className="w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </div>

                {/* Hover Border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Festival Calendar CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Plan Your Festival Visit
          </h3>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            Download our festival calendar and book your stay during your favorite celebrations
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Calendar
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Schedule
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
