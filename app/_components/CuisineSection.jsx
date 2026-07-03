"use client";

import { motion } from "framer-motion";
import { ChefHat, Fish, Leaf, Flame } from "lucide-react";

export default function CuisineSection() {
  const dishes = [
    {
      id: 1,
      name: "Seafood Delicacies",
      description: "Fresh fish curries, prawns, and crab preparations using coconut and traditional spices",
      icon: Fish,
      tags: ["Fresh", "Spicy", "Coastal"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Rice & Grains",
      description: "Authentic rice dishes, puttu, and traditional grain-based preparations",
      icon: Leaf,
      tags: ["Wholesome", "Traditional", "Nutritious"],
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: 3,
      name: "Spiced Favorites",
      description: "Curries, masalas, and gravies made with locally sourced spices and herbs",
      icon: Flame,
      tags: ["Aromatic", "Flavorful", "Authentic"],
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      name: "Sweet Treats",
      description: "Traditional sweets and desserts like Chikhalwali and Anarsa made from local ingredients",
      icon: ChefHat,
      tags: ["Sweet", "Festive", "Homemade"],
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full -mr-48 -mt-48 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Konkan Cuisine
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Savor authentic flavors crafted from fresh ingredients and centuries-old recipes passed through generations
          </p>
        </motion.div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {dishes.map((dish, index) => {
            const Icon = dish.icon;
            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br ${dish.color} opacity-10 group-hover:opacity-20 rounded-full transition-all duration-300`} />

                  {/* Icon */}
                  <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${dish.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-2xl font-bold text-slate-900 mb-3">
                    {dish.name}
                  </h3>
                  <p className="relative text-slate-600 leading-relaxed mb-6">
                    {dish.description}
                  </p>

                  {/* Tags */}
                  <div className="relative flex flex-wrap gap-2">
                    {dish.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Experience CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            Experience Culinary Heritage
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join cooking classes with local chefs and taste Konkan&apos;s authentic flavors at traditional eateries
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cooking Classes
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Food Tours
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
