"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const slides = [
    {
      id: 1,
      image: "/beach.png",
      title: "Pristine Beaches of Konkan",
      subtitle: "Discover Golden Shores",
      description:
        "Experience the untouched beauty of Konkan's coastline with crystal clear waters and endless golden beaches.",
      category: "Beaches",
      colors: {
        primary: "#1e40af", // Ocean blue
        secondary: "#2563eb", // Brighter blue
        accent: "#60a5fa", // Soft blue
        gradient: "from-blue-800/20 via-blue-500/10 to-cyan-600/20",
      },
    },
    {
      id: 2,
      image: "/forts.png",
      title: "Historic Forts & Heritage",
      subtitle: "Journey Through Time",
      description:
        "Explore magnificent forts and ancient temples that tell the rich history of the Konkan region.",
      category: "Heritage",
      colors: {
        primary: "#78350f", // Earth/orange-brown
        secondary: "#c2410c", // Rich orange
        accent: "#fb923c", // Warm orange
        gradient: "from-orange-900/20 via-orange-600/10 to-orange-400/20",
      },
    },
    {
      id: 3,
      image: "/adventure.jpg",
      title: "Thrilling Adventure Sports",
      subtitle: "For the Adrenaline Junkie",
      description:
        "Experience trekking, scuba diving, river rafting, and other exciting adventures along the Konkan coast.",
      category: "Adventure",
      colors: {
        primary: "#b45309", // Warm amber
        secondary: "#f59e0b", // Gold/amber
        accent: "#fde68a", // Light creamy yellow
        gradient: "from-amber-600/20 via-amber-400/10 to-amber-300/20",
      },
    },
    {
      id: 4,
      image: "/artisian.jpg",
      title: "Local Artisans & Crafts",
      subtitle: "Discover Handmade Traditions",
      description:
        "Visit local artisan workshops to witness and participate in traditional crafts such as Warli painting and pottery.",
      category: "Artisan",
      colors: {
        primary: "#9c4221", // Reddish brown
        secondary: "#dd6b20", // Muted orange
        accent: "#fbbf24", // Yellow accent
        gradient: "from-orange-700/20 via-orange-500/10 to-yellow-400/20",
      },
    },
    {
      id: 5,
      image: "/wildlife.jpg",
      title: "Konkan Wildlife & Sanctuaries",
      subtitle: "Nature's Hidden Treasures",
      description:
        "Explore lush sanctuaries and witness rare species in their natural habitat across Konkan’s diverse ecosystems.",
      category: "Wildlife",
      colors: {
        primary: "#065f46", // Forest green
        secondary: "#22c55e", // Bright green
        accent: "#a7f3d0", // Pale mint
        gradient: "from-green-800/20 via-green-400/10 to-green-200/20",
      },
    },
    {
      id: 6,
      image: "/cuisine.png",
      title: "Authentic Konkan Cuisine",
      subtitle: "Flavors of the Coast",
      description:
        "Savor the authentic taste of fresh seafood and traditional Konkan delicacies prepared with local spices.",
      category: "Cuisine",
      colors: {
        primary: "#b45309", // Warm amber
        secondary: "#f59e0b", // Gold/amber
        accent: "#fde68a", // Light creamy yellow
        gradient: "from-amber-600/20 via-amber-400/10 to-amber-300/20",
      },
    },
    {
      id: 7,
      image: "/festival.png",
      title: "Vibrant Local Festivals",
      subtitle: "Celebrate Konkan’s Traditions",
      description:
        "Join colorful festivals and rituals that illuminate Konkan's cultural calendar with music, dance, and spirituality.",
      category: "Festivals",
      colors: {
        primary: "#831843", // Festive deep pink
        secondary: "#db2777", // Bright magenta/pink
        accent: "#fbb6ce", // Soft pink
        gradient: "from-pink-900/20 via-pink-600/10 to-pink-300/20",
      },
    },
    {
      id: 8,
      image: "/life.jpg",
      title: "Village Life Experience",
      subtitle: "Authentic Culture",
      description:
        "Immerse yourself in the warm hospitality and rich traditions of authentic Konkan village life.",
      category: "Village Life",
      colors: {
        primary: "#92400e", // Earthy orange-brown
        secondary: "#ea580c", // Bright earthy orange
        accent: "#f97316", // Vibrant orange
        gradient: "from-orange-800/20 via-orange-600/10 to-orange-400/20",
      },
    },
    {
      id: 9,
      image: "/waterfall.jpg",
      title: "Monsoon Magic",
      subtitle: "Nature's Symphony",
      description:
        "Witness the spectacular transformation of Konkan during monsoons with cascading waterfalls and verdant landscapes.",
      category: "Monsoon",
      colors: {
        primary: "#134e4a", // Deep teal
        secondary: "#0f766e", // Rich teal
        accent: "#2dd4bf", // Aqua/cyan accent
        gradient: "from-teal-800/20 via-teal-600/10 to-teal-400/20",
      },
    },
    {
      id: 10,
      image: "/backwater.jpg",
      title: "Serene Backwaters",
      subtitle: "Tranquil Escapes",
      description:
        "Navigate through peaceful backwaters surrounded by lush greenery and traditional fishing villages.",
      category: "Backwaters",
      colors: {
        primary: "#155e75", // Blue-gray
        secondary: "#0891b2", // Cyan-600
        accent: "#38bdf8", // Light blue
        gradient: "from-cyan-600/20 via-blue-500/10 to-blue-300/20",
      },
    },
  ];

  const currentSlideData = slides[currentSlide];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevSlide();
      setIsAutoPlaying(false);
    } else if (info.offset.x < -threshold) {
      nextSlide();
      setIsAutoPlaying(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
        setIsAutoPlaying(false);
      } else if (event.key === "ArrowRight") {
        nextSlide();
        setIsAutoPlaying(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Dynamic Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide}`}
          className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.colors.gradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Animated Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${currentSlideData.colors.primary}40 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${currentSlideData.colors.secondary}40 0%, transparent 50%)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Slides with Smooth Crossfade */}
      <div className="relative h-full">
        <AnimatePresence initial={false}>
          {slides.map((slide, index) =>
            index === currentSlide ? (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${currentSlideData.colors.primary}20, transparent 70%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-5xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <motion.div
                        className="inline-block mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Badge
                          className="text-lg px-8 py-3 border-none font-medium tracking-wide backdrop-blur-md bg-white/10 text-yellow-400 shadow-lg hover:bg-white/20 transition-all duration-300"
                          style={{
                            boxShadow: `0 8px 32px ${currentSlideData.colors.primary}40`,
                            border: `1px solid ${currentSlideData.colors.accent}30`,
                          }}
                        >
                          {currentSlideData.subtitle}
                        </Badge>
                      </motion.div>

                      <motion.h1
                        className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                        style={{
                          textShadow: `0 4px 20px ${currentSlideData.colors.primary}60`,
                        }}
                      >
                        {currentSlideData.title}
                      </motion.h1>

                      <motion.p
                        className="text-2xl text-gray-100 leading-relaxed max-w-4xl mx-auto font-light"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.7,
                          ease: "easeOut",
                        }}
                      >
                        {currentSlideData.description}
                      </motion.p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-6 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/10 text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 z-10 group border border-white/20"
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: `0 8px 32px ${currentSlideData.colors.primary}40`,
        }}
      >
        <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-6 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/10 text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 z-10 group border border-white/20"
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: `0 8px 32px ${currentSlideData.colors.primary}40`,
        }}
      >
        <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className=" px-8 py-4 "
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center space-x-2">
            {slides.map((slide, index) => (
              <div key={index} className="flex items-center">
                <motion.button
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className={`font-semibold transition-all duration-300 whitespace-nowrap px-3 py-2 rounded-full relative ${
                    index === currentSlide
                      ? "text-white text-xl scale-110"
                      : "text-white/70 hover:text-white text-lg hover:scale-105"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    color:
                      index === currentSlide ? slide.colors.accent : undefined,
                  }}
                >
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      layoutId="activeBackground"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{slide.category}</span>
                </motion.button>
                {index < slides.length - 1 && (
                  <span className="text-white/40 mx-3 text-lg font-light">
                    |
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
