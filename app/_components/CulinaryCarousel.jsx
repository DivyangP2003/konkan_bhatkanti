"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChefHat, Clock, Flame, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Dynamically import the map component to avoid SSR issues
const InteractiveCulinaryMap = dynamic(() => import("./interactive-culinary-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
      <div className="text-teal-700">Loading culinary map...</div>
    </div>
  ),
})

export default function CulinaryCarouselWithMap({ dishes }) {
  const [currentDish, setCurrentDish] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const currentFood = dishes[currentDish]

  const nextDish = () => {
    setCurrentDish((prev) => (prev + 1) % dishes.length)
  }

  const prevDish = () => {
    setCurrentDish((prev) => (prev - 1 + dishes.length) % dishes.length)
  }

  const handleMapDishClick = (dishIndex) => {
    setCurrentDish(dishIndex)
    setIsAutoPlaying(false)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextDish()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextDish()
        setIsAutoPlaying(false)
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevDish()
        setIsAutoPlaying(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const getSpiceLevelColor = (level) => {
    switch (level) {
      case "Mild":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hot":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Hard":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <section className="relative h-[600px] bg-white overflow-hidden flex">
      {/* Left Side - Interactive Map (1/3 width) */}
      <div className="w-1/3 h-full bg-gradient-to-br from-cyan-50 to-teal-50 border-r border-gray-200">
        <InteractiveCulinaryMap dishes={dishes} currentDish={currentDish} onDishClick={handleMapDishClick} />
      </div>

      {/* Right Side - Food Carousel (2/3 width) */}
      <div className="relative w-2/3 h-full overflow-hidden">
        {/* Background Image with Smooth Transitions */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDish}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentFood.image || "/placeholder.svg"}
                alt={currentFood.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8">
          {/* Top Section - Region Badge */}
          <div className="flex justify-between items-start">
            <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              <Badge
                className="text-white border-white/30 text-lg px-4 py-2"
                style={{ backgroundColor: currentFood.color }}
              >
                {currentFood.region}
              </Badge>
            </motion.div>

            {/* Recipe Stats */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex gap-3"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <Clock className="w-5 h-5 text-white mx-auto mb-1" />
                <p className="text-white text-sm font-medium">{currentFood.cookingTime}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <ChefHat className="w-5 h-5 text-white mx-auto mb-1" />
                <p className={`text-sm font-medium ${getDifficultyColor(currentFood.difficulty)}`}>
                  {currentFood.difficulty}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <Flame className="w-5 h-5 text-white mx-auto mb-1" />
                <div className={`w-3 h-3 rounded-full mx-auto ${getSpiceLevelColor(currentFood.spiceLevel)}`} />
              </div>
            </motion.div>
          </div>

          {/* Center Section - Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-8"
              >
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{currentFood.name}</h3>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
                  {currentFood.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Specialties */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {currentFood.specialties?.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-white border-white/50 bg-white/10">
                  {specialty}
                </Badge>
              ))}
            </motion.div>
          </div>

          {/* Bottom Section - Navigation */}
          <div className="flex items-center justify-between">
            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={prevDish}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="p-3 text-white hover:text-teal-300 transition-colors bg-white/10 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <div className="text-white text-sm">
                {currentDish + 1} / {dishes.length}
              </div>

              <motion.button
                onClick={nextDish}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="p-3 text-white hover:text-teal-300 transition-colors bg-white/10 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Learn Recipe
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-6 py-3"
                >
                  Find Restaurant
                </Button>
              </motion.div>
            </div>

          </div>
          
        </div>
        
      </div>
    </section>
  )
}
