"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, MapPin, Camera, Star, Search, Filter, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { getCulturalData } from "@/data/cultural-data"

export default function FestivalsPage() {
  const [culturalData, setCulturalData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeason, setSelectedSeason] = useState("All")
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCulturalData()
        setCulturalData(data)
      } catch (error) {
        console.error("Error fetching cultural data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-pink-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-orange-500 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-700 font-medium">Loading All Festivals...</p>
        </div>
      </div>
    )
  }

  if (!culturalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Failed to load festival data.</p>
      </div>
    )
  }

  const seasons = ["All", ...new Set(culturalData.festivals.map((f) => f.season))]

  const filteredFestivals = culturalData.festivals.filter((festival) => {
    const matchesSearch =
      festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      festival.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeason = selectedSeason === "All" || festival.season === selectedSeason
    return matchesSearch && matchesSeason
  })

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e2e8f0' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Button onClick={() => router.back()} variant="outline" className="mb-8 bg-white/80 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cultural Experiences
            </Button>

            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ea580c, #f97316, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              All Festivals
            </h1>
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-32"></div>
              <p className="text-xl md:text-2xl text-gray-600 font-light mx-6 tracking-wide">
                Discover every celebration that makes Konkan come alive throughout the year
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent w-32"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search festivals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="border rounded-md px-3 py-2 bg-white"
                >
                  {seasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredFestivals.length} of {culturalData.festivals.length} festivals
            </div>
          </div>
        </div>
      </section>

      {/* Festivals Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFestivals.map((festival, index) => (
              <Dialog key={festival.id}>
                <DialogTrigger asChild>
                  <Card className="group relative h-96 overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                    <div className="absolute inset-0">
                      <img
                        src={festival.image || "/placeholder.svg"}
                        alt={festival.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <Badge className="mb-3 bg-orange-500 text-white">{festival.season}</Badge>
                      <h3 className="text-xl font-bold leading-tight mb-2">{festival.name}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{festival.description}</p>
                    </div>

                    {index === 0 && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-400 text-black font-semibold">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                      <img
                        src={festival.image || "/placeholder.svg"}
                        alt={festival.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 text-white">
                        <Badge className="mb-2 bg-orange-500">{festival.season}</Badge>
                        <DialogTitle className="text-3xl font-bold">{festival.name}</DialogTitle>
                      </div>
                    </div>
                    <DialogDescription className="text-base leading-relaxed">{festival.description}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-orange-500" />
                        Festival Highlights
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {festival.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center p-3 bg-orange-50 rounded-lg">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Did You Know?
                      </h4>
                      <p className="text-sm text-blue-700">{festival.didYouKnow}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        Find Locations
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Camera className="w-4 h-4 mr-2" />
                        Photo Gallery
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredFestivals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No festivals found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSeason("All")
                }}
                className="mt-4 bg-orange-500 hover:bg-orange-600"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
