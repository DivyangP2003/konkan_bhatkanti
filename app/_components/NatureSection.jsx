"use client";

import { motion } from "framer-motion";
import { Leaf, Fish, Trees, Droplets } from "lucide-react";
import { useScrollReveal, useStaggerAnimation } from "@/app/_hooks/useScrollAnimation";

export default function NatureSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const staggerAnimation = useStaggerAnimation(0.1);
  const features = [
    {
      id: 1,
      title: "Flora",
      subtitle: "Diverse Plant Life",
      description: "Lush forests, medicinal plants, and tropical vegetation that sustain Konkan's ecosystem",
      icon: Leaf,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      title: "Fauna",
      subtitle: "Wildlife Paradise",
      description: "Witness diverse species including leopards, hornbills, and marine life in their natural habitat",
      icon: Fish,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Forests",
      subtitle: "Verdant Sanctuaries",
      description: "Explore ancient forests and protected areas that are home to rare and endangered species",
      icon: Trees,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 4,
      title: "Water Bodies",
      subtitle: "Aquatic Ecosystems",
      description: "Backwaters, rivers, and ocean habitats supporting unique marine and freshwater ecosystems",
      icon: Droplets,
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -ml-40 -mt-40 opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-100 to-cyan-100 rounded-full -mr-48 -mb-48 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Flora & Fauna
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the remarkable biodiversity and natural wonders that make Konkan a biodiversity hotspot
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerAnimation.container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={staggerAnimation.item}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-white border-2 border-slate-100 rounded-2xl p-8 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl">
                  {/* Icon Background */}
                  <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-600 mb-4">
                    {feature.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Border Animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Explore Konkan&apos;s Ecosystems
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join guided nature tours and eco-tourism experiences to witness Konkan&apos;s natural treasures while supporting conservation efforts
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Plan Eco-Tour
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
