"use client";

import { archaeologicalData } from "@/data/dataArchaeological";
import { fortsData } from "@/data/dataForts";
import { mythicData } from "@/data/dataMythic";
import { templesData } from "@/data/dataTempls";
import { useState, useEffect, useRef } from "react";

// Full-width Infinite Loop Carousel Component
function HeritageCarousel({ data, title, subtitle, sectionType }) {
  const visibleCards = 3;

  // Clone last N and first N for infinite loop
  const prepend = data.slice(-visibleCards);
  const append = data.slice(0, visibleCards);
  const totalData = [...prepend, ...data, ...append];

  const [currentIndex, setCurrentIndex] = useState(visibleCards); // Start from real first
  const [transitioning, setTransitioning] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    const totalRealSlides = data.length;

    // Reset `isTransitioning` to false after transition completes
    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // match with CSS transition duration

    // Clone handling for infinite loop
    if (currentIndex === totalRealSlides + visibleCards) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        requestAnimationFrame(() => {
          setCurrentIndex(visibleCards);
          requestAnimationFrame(() => setTransitioning(true));
        });
      }, 700);

      return () => {
        clearTimeout(timeout);
        clearTimeout(transitionTimeout);
      };
    }

    if (currentIndex === 0) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        requestAnimationFrame(() => {
          setCurrentIndex(totalRealSlides);
          requestAnimationFrame(() => setTransitioning(true));
        });
      }, 700);

      return () => {
        clearTimeout(timeout);
        clearTimeout(transitionTimeout);
      };
    }

    return () => clearTimeout(transitionTimeout);
  }, [currentIndex, data.length]);

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
      }, 4000);
    }
  };

  const handleCardClick = (item) => {
    console.log(`Clicked on ${item.title}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;

      if (e.key === "ArrowRight") {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, data.length]);

  // Clean section configurations
  const sectionConfigs = {
    temples: {
      bgColor: "bg-orange-50",
      titleColor: "text-orange-700",
      accentColor: "text-orange-500",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      borderColor: "border-orange-200",
    },
    forts: {
      bgColor: "bg-slate-50",
      titleColor: "text-slate-700",
      accentColor: "text-slate-500",
      buttonColor: "bg-slate-600 hover:bg-slate-700",
      borderColor: "border-slate-200",
    },
    mythic: {
      bgColor: "bg-purple-50",
      titleColor: "text-purple-700",
      accentColor: "text-purple-500",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      borderColor: "border-purple-200",
    },
    archaeological: {
      bgColor: "bg-emerald-50",
      titleColor: "text-emerald-700",
      accentColor: "text-emerald-500",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      borderColor: "border-emerald-200",
    },
  };

  const config = sectionConfigs[sectionType] || sectionConfigs.temples;

  return (
    <section className={`w-full py-16 ${config.bgColor} overflow-hidden`}>
      {/* Full-width Header */}
      <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3
            className={`text-3xl md:text-4xl font-bold mb-4 ${config.titleColor}`}
          >
            {title}
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">{subtitle}</p>
          <div
            className={`w-20 h-0.5 ${
              config.buttonColor.split(" ")[0]
            } mx-auto mt-6`}
          ></div>
        </div>
      </div>

      {/* Full-width Infinite Carousel */}
      <div
        ref={carouselRef}
        className="w-full py-8 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-4 sm:px-6 lg:px-8">
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
              {totalData.map((item, index) => {
                const isCentered = Math.abs(index - currentIndex - 1) < 0.5;

                return (
                  <div
                    key={`${item.id}-${index}`}
                    style={{ width: `${100 / totalData.length}%` }}
                    className={`px-2 sm:px-3 lg:px-4 transition-transform duration-300 ${
                      isCentered && isInView ? "scale-105" : "scale-100"
                    }`}
                  >
                    <div
                      className={`relative h-72 lg:h-80 rounded-xl overflow-hidden bg-white shadow-md cursor-pointer transition-all duration-300 ${
                        config.borderColor
                      } border focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                        hoveredCard === item.id
                          ? "shadow-lg transform -translate-y-2"
                          : "shadow-md hover:shadow-lg hover:-translate-y-1"
                      }`}
                      tabIndex={0}
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleCardClick(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleCardClick(item);
                        }
                      }}
                      role="button"
                      aria-label={`Explore ${item.title} in ${item.destination}`}
                    >
                      {/* Clean Image */}
                      <div className="h-2/3 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Simple Content Area */}
                      <div className="h-1/3 p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                            {item.title}
                          </h4>
                          <p
                            className={`text-sm ${config.accentColor} font-medium`}
                          >
                            📍 {item.destination}
                          </p>
                        </div>

                        {/* Hover Content */}
                        {hoveredCard === item.id && (
                          <div className="mt-2 animate-fade-in">
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {item.teaser}
                            </p>
                            <div className="flex items-center justify-between">
                              {item.period && (
                                <span className="text-xs text-gray-500">
                                  🕐 {item.period}
                                </span>
                              )}
                              <button
                                className={`${config.buttonColor} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                              >
                                {item.ctaText}
                              </button>
                            </div>
                          </div>
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

export default function HeritageAndMonuments() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Full-width Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Heritage & Monuments
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Discover Konkan's Timeless Legacy in Temples, Forts & Ancient Sites
          </p>
        </div>
      </div>

      {/* Full-width Content Sections */}
      <div className="w-full">
        {/* Temples Section */}
        <HeritageCarousel
          data={templesData}
          title="Sacred Temples"
          subtitle="Ancient temples that have stood the test of time, each with unique architectural marvels and spiritual significance"
          sectionType="temples"
        />

        {/* Forts Section */}
        <HeritageCarousel
          data={fortsData}
          title="Forts & Monuments"
          subtitle="Majestic fortresses and monuments that tell tales of valor, strategy, and architectural brilliance"
          sectionType="forts"
        />

        {/* Mythic Section */}
        <HeritageCarousel
          data={mythicData}
          title="Mythic Linkages"
          subtitle="Sacred sites connected to ancient epics and legends, where mythology meets reality"
          sectionType="mythic"
        />

        {/* Archaeological Section */}
        <HeritageCarousel
          data={archaeologicalData}
          title="Archaeological Treasures"
          subtitle="Ancient rock art, cave complexes, and archaeological wonders revealing prehistoric and historic civilizations"
          sectionType="archaeological"
        />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
