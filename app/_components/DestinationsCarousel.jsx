"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { destinations } from "@/data/destinations";

// Dynamically import the map component to avoid SSR issues
const InteractiveMap = dynamic(() => import("./interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
      <div className="text-white">Loading map...</div>
    </div>
  ),
});

export default function DestinationsCarouselWithMap() {
  const [currentDestination, setCurrentDestination] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  

  const currentPlace = destinations[currentDestination];

  const nextDestination = () => {
    setCurrentDestination((prev) => (prev + 1) % destinations.length);
  };

  const prevDestination = () => {
    setCurrentDestination(
      (prev) => (prev - 1 + destinations.length) % destinations.length
    );
  };

  const handleMapDestinationClick = (destinationIndex) => {
    setCurrentDestination(destinationIndex);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextDestination();
    }, 9000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextDestination();
        setIsAutoPlaying(false);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevDestination();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative h-screen bg-slate-900 overflow-hidden flex">
      {/* Left Side - Carousel (3/4 width) */}
      <div className="relative w-2/3 h-full overflow-hidden">
        {/* Background Image with Smooth Transitions */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDestination}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentPlace.image || "/placeholder.svg"}
                alt={currentPlace.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header Section */}
          <div className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-16"
            >
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,1) 40%, rgba(255,255,255,0.1))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                KONKAN TREASURES
              </h2>

              <p
                className="text-xl md:text-2xl font-light tracking-wide bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.4))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Journey through history, culture & nature
              </p>
            </motion.div>

            {/* Destination Info with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDestination}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl mx-auto mb-12"
              >
                {/* Highlight with Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div
                    className="w-3 h-3 rounded-full mr-4"
                    style={{ backgroundColor: currentPlace.color }}
                  />
                  <p className="text-lg md:text-xl text-white font-medium">
                    {currentPlace.highlight}
                  </p>
                  <div
                    className="w-3 h-3 rounded-full ml-4"
                    style={{ backgroundColor: currentPlace.color }}
                  />
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-200 leading-relaxed font-light">
                  {currentPlace.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Section */}
          <div className="pb-16">
            {/* Destination Name with Navigation */}
            <div className="flex items-center justify-center mb-8">
              <motion.button
                onClick={prevDestination}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="p-3 text-white hover:text-gray-300 transition-colors mr-8"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentDestination}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl md:text-4xl font-bold text-white tracking-wide"
                  style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                >
                  {currentPlace.name}
                </motion.h3>
              </AnimatePresence>

              <motion.button
                onClick={nextDestination}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="p-3 text-white hover:text-gray-300 transition-colors ml-8"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </motion.button>
            </div>

            {/* Discover More Button */}
            <div className="flex justify-center">
              <motion.button
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: "0 10px 30px rgba(220, 38, 38, 0.4)",
                }}
              >
                Discover more
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Interactive Map (1/4 width) */}
      <div className="w-1/3 h-full bg-slate-800 border-l border-slate-700">
        <InteractiveMap
          destinations={destinations}
          currentDestination={currentDestination}
          onDestinationClick={handleMapDestinationClick}
        />
      </div>
    </section>
  );
}
