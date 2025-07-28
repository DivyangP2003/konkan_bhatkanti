"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function AttractionsSection() {
  const [currentPage, setCurrentPage] = useState(0)

  const attractionPages = [
    [
      {
        id: 1,
        name: "Sindhudurg Fort",
        image: "/placeholder.svg?height=400&width=300&text=Sindhudurg+Fort",
        size: "tall",
        hasButton: false,
        description: "Majestic sea fort built by Chhatrapati Shivaji Maharaj",
      },
      {
        id: 2,
        name: "Konkan Beaches",
        image: "/placeholder.svg?height=300&width=400&text=Konkan+Beaches",
        size: "wide",
        hasButton: false,
        description: "Pristine coastline stretching for miles",
      },
      {
        id: 3,
        name: "Amboli Waterfalls",
        image: "/placeholder.svg?height=350&width=350&text=Amboli+Waterfalls",
        size: "large",
        hasButton: true,
        description: "Cascading beauty in the Western Ghats",
      },
      {
        id: 4,
        name: "Ratnagiri Lighthouse",
        image: "/placeholder.svg?height=300&width=300&text=Ratnagiri+Lighthouse",
        size: "medium",
        hasButton: false,
        description: "Historic beacon guiding ships since 1867",
      },
    ],
    [
      {
        id: 5,
        name: "Ganpatipule Temple",
        image: "/placeholder.svg?height=350&width=300&text=Ganpatipule+Temple",
        size: "tall",
        hasButton: false,
        description: "Ancient Swayambhu Ganpati on pristine beach",
      },
      {
        id: 6,
        name: "Tarkarli Coral Reefs",
        image: "/placeholder.svg?height=300&width=400&text=Tarkarli+Coral+Reefs",
        size: "wide",
        hasButton: true,
        description: "Underwater paradise for diving enthusiasts",
      },
      {
        id: 7,
        name: "Marleshwar Caves",
        image: "/placeholder.svg?height=300&width=350&text=Marleshwar+Caves",
        size: "large",
        hasButton: false,
        description: "Ancient Shiva temple in natural cave formation",
      },
      {
        id: 8,
        name: "Devgad Mangoes",
        image: "/placeholder.svg?height=300&width=300&text=Devgad+Mangoes",
        size: "medium",
        hasButton: false,
        description: "World-famous Alphonso mango orchards",
      },
    ],
    [
      {
        id: 9,
        name: "Murud Beach",
        image: "/placeholder.svg?height=400&width=300&text=Murud+Beach",
        size: "tall",
        hasButton: false,
        description: "Golden sands with historic Janjira Fort view",
      },
      {
        id: 10,
        name: "Konkan Railway",
        image: "/placeholder.svg?height=300&width=400&text=Konkan+Railway",
        size: "wide",
        hasButton: false,
        description: "Engineering marvel through scenic landscapes",
      },
      {
        id: 11,
        name: "Velas Turtle Festival",
        image: "/placeholder.svg?height=350&width=350&text=Velas+Turtle+Festival",
        size: "large",
        hasButton: true,
        description: "Witness Olive Ridley turtle nesting season",
      },
      {
        id: 12,
        name: "Sawantwadi Palace",
        image: "/placeholder.svg?height=300&width=300&text=Sawantwadi+Palace",
        size: "medium",
        hasButton: false,
        description: "Royal heritage and traditional wooden toys",
      },
    ],
  ]

  const currentAttractions = attractionPages[currentPage]

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % attractionPages.length)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + attractionPages.length) % attractionPages.length)
  }

  const getCardClasses = (size) => {
    switch (size) {
      case "tall":
        return "row-span-2 h-96"
      case "wide":
        return "col-span-2 h-72"
      case "large":
        return "col-span-2 row-span-2 h-96"
      default:
        return "h-72"
    }
  }

  return (
    <section className="relative min-h-screen bg-gray-100 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e2e8f0' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            ATTRACTIONS
          </h2>
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
            <p className="text-xl md:text-2xl text-gray-600 font-light mx-6 tracking-wide">worth a thousand stories</p>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32"></div>
          </div>
        </motion.div>

        {/* Attractions Grid */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr"
            >
              {currentAttractions.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${getCardClasses(attraction.size)}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Image
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <motion.h3
                      className="text-white text-xl md:text-2xl font-bold mb-2"
                      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                    >
                      {attraction.name}
                    </motion.h3>

                    <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {attraction.description}
                    </p>

                    {attraction.hasButton && (
                      <motion.button
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 w-fit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore
                      </motion.button>
                    )}
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400 rounded-2xl transition-colors duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <motion.button
            onClick={prevPage}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-cyan-600 transition-colors" />
          </motion.button>

          {/* Page Indicators */}
          <div className="flex space-x-3">
            {attractionPages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage ? "bg-cyan-500 scale-125" : "bg-gray-400 hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextPage}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-cyan-600 transition-colors" />
          </motion.button>
        </div>

        {/* Discover More Button */}
        <div className="flex justify-center">
          <motion.button
            className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
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
    </section>
  )
}
