"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  MapPin,
  Users,
  Camera,
  Music,
  Utensils,
  Palette,
  Heart,
  Star,
  Clock,
  ChefHat,
  Flame,
} from "lucide-react";

import dynamic from "next/dynamic";
import { getCulturalData } from "@/data/cultural-data";

const CulinaryCarouselWithMap = dynamic(
  () => import("@/app/_components/CulinaryCarousel"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
        <div className="text-teal-700">Loading culinary experience...</div>
      </div>
    ),
  }
);

export default function CulturalExperiencesPage() {
  const [culturalData, setCulturalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("festivals");
  const sectionsRef = useRef({});
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCulturalData();
        setCulturalData(data);
      } catch (error) {
        console.error("Error fetching cultural data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [culturalData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-teal-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-cyan-500 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 font-medium">
            Discovering Konkan's Cultural Treasures...
          </p>
        </div>
      </div>
    );
  }

  if (!culturalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Failed to load cultural data.</p>
      </div>
    );
  }

  const scrollToSection = (sectionId) => {
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
  };

  // Festival Carousel Component - Exactly like CulturalTrailsCarousel
  const FestivalCarousel = ({ festivals }) => {
    const visibleCards = 3;

    // Clone last N and first N
    const prepend = festivals.slice(-visibleCards);
    const append = festivals.slice(0, visibleCards);
    const totalData = [...prepend, ...festivals, ...append];

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
      const totalRealSlides = festivals.length;

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
    }, [currentIndex, festivals.length]);

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

    const handleCardClick = (festival) => {
      console.log(`Clicked on ${festival.name}`);
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
          setCurrentIndex((prev) =>
            prev === 0 ? festivals.length - 1 : prev - 1
          );
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [currentIndex, festivals.length]);

    return (
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
              {totalData.map((festival, index) => {
                const isCentered = Math.abs(index - currentIndex - 1) < 0.5;

                return (
                  <div
                    key={`${festival.id}-${index}`}
                    style={{ width: `${100 / totalData.length}%` }}
                    className={`px-2 sm:px-3 lg:px-4 transition-transform duration-300 ${
                      isCentered && isInView ? "scale-105" : "scale-100"
                    }`}
                  >
                    <div
                      className={`relative h-96 sm:h-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 ${
                        hoveredCard === festival.id
                          ? "shadow-2xl transform -translate-y-2"
                          : "shadow-lg hover:shadow-xl hover:-translate-y-1"
                      }`}
                      tabIndex={0}
                      onMouseEnter={() => setHoveredCard(festival.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleCardClick(festival)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleCardClick(festival);
                        }
                      }}
                      role="button"
                      aria-label={`Explore ${festival.name} festival`}
                    >
                      {/* Image */}
                      <img
                        src={festival.image || "/placeholder.svg"}
                        alt={`Image of ${festival.name} festival`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 text-white transition-all duration-300">
                        {hoveredCard === festival.id ? (
                          <div className="animate-fade-in flex items-center justify-between">
                            <p className="text-sm font-medium text-teal-300">
                              📅 {festival.season}
                            </p>
                            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400">
                              Experience This
                            </button>
                          </div>
                        ) : (
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                            {festival.name}
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

        {/* Explore More Button */}
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => router.push("/festivals")}
            className="px-8 py-3 rounded-full font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Star className="w-4 h-4 mr-2" />
            Explore More Festivals
          </Button>
        </div>
      </div>
    );
  };

  // Interactive Food Map and Carousel Component
  const CulinarySection = ({ cuisine, regions }) => {
    const [selectedRegion, setSelectedRegion] = useState("malvan");
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [currentDishIndex, setCurrentDishIndex] = useState(0);
    const [hoveredDish, setHoveredDish] = useState(null);

    // Filter dishes by selected region
    const regionDishes = cuisine.filter(
      (dish) => dish.region.toLowerCase().replace(/\s+/g, "") === selectedRegion
    );

    // Auto-scroll for dishes
    useEffect(() => {
      if (regionDishes.length === 0) return;

      const interval = setInterval(() => {
        setCurrentDishIndex((prev) => (prev + 1) % regionDishes.length);
      }, 4000);

      return () => clearInterval(interval);
    }, [regionDishes.length, selectedRegion]);

    // Reset dish index when region changes
    useEffect(() => {
      setCurrentDishIndex(0);
    }, [selectedRegion]);

    const handleRegionClick = (regionId) => {
      setSelectedRegion(regionId);
    };

    const getSpiceLevelColor = (level) => {
      switch (level) {
        case "Mild":
          return "bg-green-500";
        case "Medium":
          return "bg-yellow-500";
        case "Hot":
          return "bg-red-500";
        default:
          return "bg-gray-500";
      }
    };

    const getDifficultyColor = (difficulty) => {
      switch (difficulty) {
        case "Easy":
          return "text-green-600";
        case "Medium":
          return "text-yellow-600";
        case "Hard":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    };

    return (
      <div className="grid lg:grid-cols-5 gap-8 h-[600px]">
        {/* Left Side - Interactive Map (40%) */}
        <div className="lg:col-span-2 relative">
          <div className="sticky top-8">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 h-[600px] relative overflow-hidden shadow-lg">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Stylized Konkan Coast */}
                  <path
                    d="M20 10 Q30 20 25 35 Q35 45 30 60 Q25 75 20 85 Q15 90 10 95"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-cyan-300"
                  />
                  {/* Wave patterns */}
                  <path
                    d="M5 20 Q10 25 15 20 Q20 15 25 20"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-cyan-200 animate-pulse"
                  />
                  <path
                    d="M5 40 Q10 45 15 40 Q20 35 25 40"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-cyan-200 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </svg>
              </div>

              {/* Map Title */}
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Konkan Culinary Map
                </h3>
                <p className="text-gray-600 text-sm">
                  Click regions to explore their signature dishes
                </p>
              </div>

              {/* Interactive Regions */}
              <div className="relative z-10 h-full">
                {regions?.map((region) => (
                  <button
                    key={region.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      selectedRegion === region.id
                        ? "scale-125 z-20"
                        : hoveredRegion === region.id
                        ? "scale-110 z-10"
                        : "scale-100"
                    }`}
                    style={{
                      left: `${region.coordinates.x}%`,
                      top: `${region.coordinates.y}%`,
                    }}
                    onClick={() => handleRegionClick(region.id)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    {/* Region Dot */}
                    <div
                      className={`w-6 h-6 rounded-full shadow-lg transition-all duration-300 ${
                        selectedRegion === region.id
                          ? "ring-4 ring-white ring-opacity-50"
                          : ""
                      }`}
                      style={{ backgroundColor: region.color }}
                    >
                      {selectedRegion === region.id && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{
                            backgroundColor: region.color,
                            opacity: 0.4,
                          }}
                        />
                      )}
                    </div>

                    {/* Region Label */}
                    <div
                      className={`absolute top-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                        selectedRegion === region.id ||
                        hoveredRegion === region.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div className="bg-white rounded-lg px-3 py-2 shadow-lg border">
                        <p className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                          {region.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {region.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Region Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: regions?.find(
                        (r) => r.id === selectedRegion
                      )?.color,
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {regions?.find((r) => r.id === selectedRegion)?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {regionDishes.length} signature dishes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Food Carousel (60%) */}
        <div className="lg:col-span-3">
          <div className="h-[600px] overflow-hidden">
            {regionDishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {regionDishes
                  .slice(currentDishIndex, currentDishIndex + 2)
                  .concat(
                    regionDishes.slice(
                      0,
                      Math.max(0, currentDishIndex + 2 - regionDishes.length)
                    )
                  )
                  .map((dish, index) => (
                    <div
                      key={`${dish.id}-${currentDishIndex}-${index}`}
                      className={`group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${
                        index === 0 ? "md:col-span-2 h-80" : "h-72"
                      } ${
                        hoveredDish === dish.id
                          ? "scale-105 shadow-2xl"
                          : "hover:scale-102 hover:shadow-xl"
                      }`}
                      onMouseEnter={() => setHoveredDish(dish.id)}
                      onMouseLeave={() => setHoveredDish(null)}
                    >
                      {/* Food Image */}
                      <img
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        {hoveredDish === dish.id ? (
                          <div className="space-y-4 animate-fade-in">
                            {/* Recipe Details */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                <Clock className="w-4 h-4 mx-auto mb-1" />
                                <p className="text-xs">{dish.cookingTime}</p>
                              </div>
                              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                <ChefHat className="w-4 h-4 mx-auto mb-1" />
                                <p
                                  className={`text-xs ${getDifficultyColor(
                                    dish.difficulty
                                  )}`}
                                >
                                  {dish.difficulty}
                                </p>
                              </div>
                              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                <Flame className="w-4 h-4 mx-auto mb-1" />
                                <div
                                  className={`w-2 h-2 rounded-full mx-auto ${getSpiceLevelColor(
                                    dish.spiceLevel
                                  )}`}
                                />
                              </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm py-2">
                                <ChefHat className="w-3 h-3 mr-1" />
                                Learn Recipe
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30 text-sm py-2"
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                Find Restaurant
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                className="text-white border-white/30"
                                style={{
                                  backgroundColor: regions?.find(
                                    (r) => r.id === selectedRegion
                                  )?.color,
                                }}
                              >
                                {dish.region}
                              </Badge>
                              <Badge
                                className={`${getSpiceLevelColor(
                                  dish.spiceLevel
                                )} text-white`}
                              >
                                {dish.spiceLevel}
                              </Badge>
                            </div>
                            <h3
                              className={`font-bold leading-tight mb-2 ${
                                index === 0 ? "text-2xl" : "text-xl"
                              }`}
                            >
                              {dish.name}
                            </h3>
                            <p className="text-white/80 text-sm line-clamp-2">
                              {dish.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No dishes found for this region</p>
              </div>
            )}
          </div>

          {/* Dish Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {regionDishes.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentDishIndex
                    ? "bg-teal-500 w-6"
                    : "bg-gray-300 hover:bg-teal-300"
                }`}
                onClick={() => setCurrentDishIndex(index)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-12">
          <Button
            onClick={() => router.push("/festivals")}
            className="px-8 py-3 rounded-full font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Star className="w-4 h-4 mr-2" />
            Explore More Festivals
          </Button>
        </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border">
        <div className="flex items-center space-x-6">
          {[
            { id: "festivals", icon: Calendar, label: "Festivals" },
            { id: "cuisine", icon: Utensils, label: "Cuisine" },
            { id: "crafts", icon: Palette, label: "Crafts" },
            { id: "music", icon: Music, label: "Music" },
            { id: "traditions", icon: Users, label: "Life" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
                activeSection === id
                  ? "bg-teal-500 text-white shadow-md"
                  : "text-gray-600 hover:text-teal-500 hover:bg-teal-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium hidden md:inline">
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Header Section - Clean Title and Subtitle */}
      <section className="relative min-h-screen bg-gray-100 py-20 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e2e8f0' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #0891b2, #06b6d4, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Cultural Konkan
            </h1>
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
              <p className="text-xl md:text-2xl text-gray-600 font-light mx-6 tracking-wide">
                Journey through centuries of tradition, taste the authentic
                flavors, and experience the living heritage of India's most
                beautiful coastline
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
            </div>
          </div>
        </div>

        {/* Festivals Section - Infinite Loop Carousel */}
        <section
          id="festivals"
          ref={(el) => (sectionsRef.current.festivals = el)}
        >
          <div className="container mx-auto px-4 mb-16">
            <div className="text-center mb-16">
              <h2
                className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #0891b2, #06b6d4, #67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Festivals
              </h2>
              <div className="flex items-center justify-center mb-4">
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
                <p className="text-xl md:text-2xl text-gray-600 font-light mx-6 tracking-wide">
                  Experience the vibrant celebrations that bring Konkan
                  communities together
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
              </div>
            </div>
          </div>

          {/* Infinite Loop Festival Cards */}
          <FestivalCarousel festivals={culturalData.festivals} />
        </section>
      </section>

      {/* Cuisine Section - Interactive Map + Carousel */}
      <section
        id="cuisine"
        ref={(el) => (sectionsRef.current.cuisine = el)}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #0891b2, #06b6d4, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Flavors of the Coast
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
              <p className="text-xl md:text-2xl text-gray-600 font-light mx-6 tracking-wide">
                Discover the culinary treasures that make each coastal region
                unique
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
            </div>
          </div>

          {/* Interactive Map + Food Carousel */}
          <CulinaryCarouselWithMap dishes={culturalData.cuisine} />
          {/* CTA Buttons */}
                  <div className="flex justify-center mt-12">
          <Button
            onClick={() => router.push("/cuisine")}
            className="px-8 py-3 rounded-full font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChefHat className="w-4 h-4 mr-2" />
            Explore More Cuisines
          </Button>
        </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Konkan Culture?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the authentic heart
            of Konkan through our curated cultural experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-white text-teal-500 hover:bg-gray-100 px-8 py-4"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Share Your Story
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Share Your Cultural Journey</DialogTitle>
                  <DialogDescription>
                    Upload photos and tell us about your Konkan cultural
                    experience.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors cursor-pointer">
                    <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Click to upload photos</p>
                  </div>
                  <textarea
                    placeholder="Share your experience, favorite moments, or cultural insights..."
                    className="w-full p-3 border rounded-lg resize-none h-24 focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                  <Button className="w-full bg-teal-500 hover:bg-teal-600">
                    <Heart className="w-4 h-4 mr-2" />
                    Share Experience
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-500 px-8 py-4 bg-transparent"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore Map
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
