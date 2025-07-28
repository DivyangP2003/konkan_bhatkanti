"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function DestinationsCarousel() {
  const [currentDestination, setCurrentDestination] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const destinations = [
    {
      id: 1,
      name: "Murud-Janjira",
      image: "/murud-janjira.jpg",
      description:
        "Unconquered island sea fort with fascinating Siddi history, surrounded by the Arabian Sea and reachable only by boat.",
      highlight: "Invincible sea fort—a marvel of history",

      color: "#7c3aed",
    },
    {
      id: 2,
      name: "Ratnagiri",
      image: "/ratnagiri_harbor.jpg",
      description:
        "Land of Alphonso mangoes, birth town of Lokmanya Tilak, home to Ratnadurg and Thiba Palace, with beautiful marine views.",
      highlight: "Mangoes, revolutionaries, and coastal vistas",
      color: "#d97706",
    },
    {
      id: 3,
      name: "Alibaug",
      image: "/alibaug_beach.jpg",
      description:
        "Historic port town famous for Kolaba Fort, ancient temples, lively beaches, and a ferry link to Mumbai. Rich in agrarian and Peshwa-era heritage.",
      highlight: "Gateway to Konkan with forts and coastal joy",
      color: "#0891b2",
    },

    {
      id: 4,
      name: "Ganpatipule",
      image: "/ganpatipule_temple.jpg",
      description:
        "Ancient Swayambhu Ganpati temple on a scenic beach, plus Prachin Konkan open-air village museum bringing the region's past to life.",
      highlight: "Spiritual coastal retreat & living traditions",
      color: "#059669",
    },
    {
      id: 5,
      name: "Tarkarli",
      image: "/tarkarli_scuba.jpg",
      description:
        "Crystal-clear waters ideal for scuba diving, snorkeling, houseboat stays, and tranquil beaches near historic Sindhudurg Fort.",
      highlight: "Maldives of Maharashtra—marine adventure hub",
      color: "#0891b2",
    },
    {
      id: 6,
      name: "Malvan",
      image: "/malvan_sindhudurg.jpg",
      description:
        "Historic Sindhudurg Fort, vibrant fish markets, unique Malvani cuisine, and colorful coral reefs attract foodies and history buffs alike.",
      highlight: "Maratha fortress and Malvani flavors",
      color: "#2563eb",
    },
    {
      id: 7,
      name: "Vengurla",
      image: "/vengurla_coconut.jpg",
      description:
        "Charming coastal village with quiet rocky beaches, extensive coconut groves, temples, and local folk art.",
      highlight: "Peaceful beaches, coconut, and culture",
      color: "#e11d48",
    },
    {
      id: 8,
      name: "Amboli Ghat",
      image: "/amboli_falls.jpg",
      description:
        "Mist-laden hill station and biodiversity hotspot with lush forests, unique wildlife, and breathtaking waterfalls.",
      highlight: "Monsoon magic and Western Ghats wildlife",
      color: "#0ea5e9",
    },
    {
      id: 9,
      name: "Dapoli",
      image: "/dapoli_temple.jpg",
      description:
        "Blend of hill station cool and sea breeze: ancient temples, Karde and Murud beaches, dolphin-watching, and colonial heritage.",
      highlight: "Green hills merge with the sea",
      color: "#dc2626",
    },
    {
      id: 10,
      name: "Velas",
      image: "/velas_turtle.jpg",
      description:
        "Famed for the annual Olive Ridley Turtle Festival, eco-village stays, traditional Konkani cuisine, and local conservation programs.",
      highlight: "Turtle nesting & village conservation",
      color: "#22c55e",
    },
    {
      id: 11,
      name: "Guhagar",
      image: "/guhagar_beach.jpg",
      description:
        "Wide, tranquil beach, historic Vyadeshwar temple, and authentic food markets make it a non-crowded gem for families.",
      highlight: "Serene coast and spiritual calm",
      color: "#f59e42",
    },
    {
      id: 12,
      name: "Kunkeshwar",
      image: "/kunkeshwar_temple.jpg",
      description:
        "Spectacular Shiva temple on the beach—site of major Mahashivaratri celebrations and a historical trade spot.",
      highlight: "Shiva temple overlooking the waves",
      color: "#384886",
    },
    {
      id: 13,
      name: "Shrivardhan",
      image: "/shrivardhan_beach.jpg",
      description:
        "Birthplace of Peshwa Balaji Vishwanath, clean beaches, and ancient temples form this historical pilgrimage-cum-leisure spot.",
      highlight: "Legacy of the Peshwas & clean sands",
      color: "#047857",
    },
    {
      id: 14,
      name: "Devgad",
      image: "/devgad_lighthouse.jpg",
      description:
        "Famous for Devgad Alphonso mangoes, windmills, a scenic lighthouse, and historic Devgad Fort right by the beach.",
      highlight: "Fort, lighthouse & world-famous mangoes",
      color: "#fbbf24",
    },
    {
      id: 15,
      name: "Sawantwadi",
      image: "/sawantwadi_palace.jpg",
      description:
        "Known for its royal palace, wooden toys, Ganjifa card art, and the scenic Moti Talav lake.",
      highlight: "Royal artistry & lakeside leisure",
      color: "#be185d",
    },
    {
      id: 16,
      name: "Jaigad",
      image: "/jaigad_fort.jpg",
      description:
        "Strategically placed sea fort at river Shastri’s mouth and home to Jaigad lighthouse—key to Konkan’s maritime history.",
      highlight: "Harbor fort with sweeping ocean views",
      color: "#009688",
    },
    {
      id: 17,
      name: "Harnai",
      image: "/harnai_auction.jpg",
      description:
        "Iconic fish auction, Suvarnadurg Fort on a rocky island, ancient temples, and unspoiled beaches await explorers.",
      highlight: "Bustling fish markets & fort off the coast",
      color: "#f87171",
    },
    {
      id: 18,
      name: "Pawas",
      image: "/pawas_ashram.jpg",
      description:
        "Center of spiritual learning, with Swami Swaroopanand’s ashram set in tranquil hills; site of annual festivals.",
      highlight: "Spiritual retreat in lush green hills",
      color: "#15803d",
    },
    {
      id: 19,
      name: "Marleshwar",
      image: "/marleshwar_waterfall.jpg",
      description:
        "Ancient Shiva cave temple, surrounded by gushing waterfalls especially lively in the monsoon. The trek here is a draw for adventure lovers.",
      highlight: "Cave temple & monsoon cascades",
      color: "#6366f1",
    },
    {
      id: 20,
      name: "Phansad Wildlife Sanctuary",
      image: "/phansad_sanctuary.jpg",
      description:
        "Dense forests between Murud and Kashid, home to over 200 bird species, leopards, and rare flora. Offers serene nature walks and rich biodiversity.",
      highlight: "Wildlife wonders in a coastal forest",
      color: "#65a30d",
    },
  ];

  const currentPlace = destinations[currentDestination];

  const nextDestination = () => {
    setCurrentDestination((prev) => (prev + 1) % destinations.length);
  };

  const prevDestination = () => {
    setCurrentDestination(
      (prev) => (prev - 1 + destinations.length) % destinations.length
    );
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
    <section className="relative h-screen bg-slate-900 overflow-hidden">
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
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight bg-clip-text text-transparent"
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
              className="text-2xl md:text-3xl font-light tracking-wide bg-clip-text text-transparent"
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
              className="max-w-4xl mx-auto mb-12"
            >
              {/* Highlight with Icon */}
              <div className="flex items-center justify-center mb-6">
                <div
                  className="w-3 h-3 rounded-full mr-4"
                  style={{ backgroundColor: currentPlace.color }}
                />
                <p className="text-xl md:text-2xl text-white font-medium">
                  {currentPlace.highlight}
                </p>
                <div
                  className="w-3 h-3 rounded-full ml-4"
                  style={{ backgroundColor: currentPlace.color }}
                />
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
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
              <ChevronLeft className="h-8 w-8" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.h3
                key={currentDestination}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-wide"
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
              <ChevronRight className="h-8 w-8" />
            </motion.button>
          </div>

          {/* Discover More Button */}
          <div className="flex justify-center">
            <motion.button
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
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

      {/* Progress Dots
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {destinations.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentDestination(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentDestination
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor:
                  index === currentDestination ? currentPlace.color : undefined,
              }}
            />
          ))}
        </div>
      </div> */}

      {/* Side Progress Indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-2">
          {destinations.map((destination, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentDestination(index);
                setIsAutoPlaying(false);
              }}
              className={`w-1 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentDestination ? "bg-white" : "bg-white/30"
              }`}
              style={{
                backgroundColor:
                  index === currentDestination ? currentPlace.color : undefined,
              }}
              whileHover={{ scaleX: 1.5 }}
              whileTap={{ scaleY: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
