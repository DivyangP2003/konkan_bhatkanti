"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { culturalTrailsData } from "@/data/dataCulturalTrailsCarousel";

export default function CulturalTrailsCarousel() {
  const visibleCards = 3;

  // Clone last N and first N
  const prepend = culturalTrailsData.slice(-visibleCards);
  const append = culturalTrailsData.slice(0, visibleCards);
  const totalData = [...prepend, ...culturalTrailsData, ...append];

  const [currentIndex, setCurrentIndex] = useState(visibleCards); // Start from real first
  const [transitioning, setTransitioning] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isInView, setIsInView] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false); // 👈 NEW

  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (!isInView) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isInView]);

  // Infinite loop handler
  useEffect(() => {
    const totalRealSlides = culturalTrailsData.length;

    // If moved past the clones at end → reset back to real start
    if (currentIndex === totalRealSlides + visibleCards) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        requestAnimationFrame(() => {
          setCurrentIndex(visibleCards);
          requestAnimationFrame(() => setTransitioning(true));
        });
      }, 700);

      return () => clearTimeout(timeout);
    }

    // If moved to clones at beginning (e.g., user scrolls back)
    if (currentIndex === 0) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        requestAnimationFrame(() => {
          setCurrentIndex(totalRealSlides);
          requestAnimationFrame(() => setTransitioning(true));
        });
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (isInView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    }
  };

  const handleCardClick = (card) => {
    console.log(`Clicked on ${card.title}`);
  };

  // ⌨️ Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return; // 🚫 prevent spamming

      if (e.key === "ArrowRight") {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        setIsTransitioning(true);
        setCurrentIndex((prev) =>
          prev === 0 ? culturalTrailsData.length - 1 : prev - 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <section className="relative min-h-screen bg-gray-100 py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e2e8f0' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight"
            style={{
              background: "linear-gradient(135deg, #0891b2, #06b6d4, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Living Traditions
          </h2>
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
            <p className="text-xl md:text-2xl text-gray-600 font-light mx-6 tracking-wide">
              Explore Konkan’s rich traditions through curated cultural trails
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
          </div>
        </motion.div>
      </div>

      <div
        ref={carouselRef}
        className="w-full py-8 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div
              className="flex"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / totalData.length
                }%)`,
                transition: transitioning
                  ? "transform 0.7s ease-in-out"
                  : "none",
                width: `${totalData.length * (100 / visibleCards)}%`,
              }}
            >
              {totalData.map((trail, index) => {
                const isCentered = Math.abs(index - currentIndex - 1) < 0.5;

                return (
                  <div
                    key={`${trail.id}-${index}`}
                    style={{ width: `${100 / totalData.length}%` }}
                    className={`px-2 sm:px-3 lg:px-4 transition-transform duration-300 ${
                      isCentered && isInView ? "scale-105" : "scale-100"
                    }`}
                  >
                    <div
                      className={`relative h-96 sm:h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 ${
                        hoveredCard === trail.id
                          ? "shadow-2xl transform -translate-y-2"
                          : "shadow-lg hover:shadow-xl hover:-translate-y-1"
                      }`}
                      tabIndex={0}
                      onMouseEnter={() => setHoveredCard(trail.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleCardClick(trail)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleCardClick(trail);
                        }
                      }}
                      role="button"
                      aria-label={`Explore ${trail.title} in ${trail.destination}`}
                    >
                      {/* Image */}
                      <img
                        src={trail.image || "/placeholder.svg"}
                        alt={`Image of ${trail.title} in ${trail.destination}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 text-white transition-all duration-300">
                        {hoveredCard === trail.id ? (
                          <div className="animate-fade-in flex items-center justify-between">
                            <p className="text-sm font-medium text-teal-300">
                              📍 {trail.destination}
                            </p>
                            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400">
                              {trail.ctaText}
                            </button>
                          </div>
                        ) : (
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                            {trail.title}
                          </h3>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
