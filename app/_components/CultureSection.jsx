"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Palette, Music, Users, BookOpen } from "lucide-react";
import { useScrollReveal, useStaggerAnimation } from "@/app/_hooks/useScrollAnimation";

export default function CultureSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const staggerAnimation = useStaggerAnimation(0.12);

  const sections = [
    {
      id: 1,
      title: "Folk & Music",
      description: "Explore traditional music and dance forms like Lavani and Tamasha that celebrate Konkan's vibrant spirit",
      icon: Music,
      color: "from-pink-500 to-rose-500",
      image: "/culture-music.png",
    },
    {
      id: 2,
      title: "Art & Crafts",
      description: "Discover intricate Warli paintings, pottery, and traditional handicrafts crafted by local artisans",
      icon: Palette,
      color: "from-purple-500 to-indigo-500",
      image: "/culture-art.png",
    },
    {
      id: 3,
      title: "Communities",
      description: "Meet diverse communities and understand the rich tapestry of cultures that call Konkan home",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      image: "/culture-communities.png",
    },
    {
      id: 4,
      title: "Traditions",
      description: "Experience rituals and customs passed down through generations in Konkan villages",
      icon: BookOpen,
      color: "from-amber-500 to-orange-500",
      image: "/culture-traditions.png",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full -mr-48 -mt-48 opacity-30" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-100 rounded-full -ml-36 -mb-36 opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Culture & Heritage
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Immerse yourself in the vibrant traditions, arts, and stories that define Konkan&apos;s cultural identity
          </p>
        </motion.div>

        {/* Culture Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerAnimation.container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                variants={staggerAnimation.item}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Background */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-60`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-24 h-24 text-white opacity-30 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {section.description}
                  </p>

                  <motion.button
                    className={`inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r ${section.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Discover
                    <span>→</span>
                  </motion.button>
                </div>

                {/* Hover Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full -mr-16 -mt-16`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
