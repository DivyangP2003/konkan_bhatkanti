"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function InteractiveCulinaryMap({
  dishes,
  currentDish,
  onDishClick,
}) {
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);
  const glowLayerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map only once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mapContainerRef.current || mapRef.current) return;

    // Konkan coast bounds - from Mumbai to Mangalore
    const konkanBounds = [
      [12.5, 72.5], // Southwest (Mangalore area)
      [19.5, 75.0], // Northeast (Mumbai area)
    ];

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: false,
      maxBounds: konkanBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 6,
      maxZoom: 12,
    }).setView([16.0, 74.0], 7); // Center on Konkan coast

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    map.fitBounds(konkanBounds, { padding: [20, 20] });

    // Prevent wheel zoom
    mapContainerRef.current.addEventListener(
      "wheel",
      (e) => e.preventDefault(),
      { passive: false }
    );

    mapRef.current = map;
    setMapLoaded(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Refresh markers & glow on every change
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const map = mapRef.current;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    dishes.forEach((dish, index) => {
      const coords = dish.coordinates;
      if (
        !Array.isArray(coords) ||
        coords.length !== 2 ||
        coords.some((v) => v == null)
      )
        return;

      const [lat, lng] = coords;
      const isActive = index === currentDish;
      const markerHtml = getMarkerHTML(dish.color, isActive);

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          html: markerHtml,
          className: "custom-culinary-marker",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      }).addTo(map);

      marker.on("click", () => {
        console.log("Clicked dish:", dish.name);
        onDishClick(index);
      });

      marker.bindPopup(`
      <div style="padding: 12px; font-family: system-ui; min-width: 200px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: ${dish.color};">
          ${dish.name}
        </h3>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
          ${dish.region} • ${dish.spiceLevel} • ${dish.cookingTime}
        </p>
        <p style="margin: 0; font-size: 12px; color: #888; line-height: 1.4;">
          ${dish.highlight}
        </p>
      </div>
    `);

      markersRef.current.push(marker);
    });

    // Glow effect for active dish if coordinates exist
    const activeDish = dishes[currentDish];
    const coords = activeDish?.coordinates;
    if (
      Array.isArray(coords) &&
      coords.length === 2 &&
      coords.every((v) => v != null)
    ) {
      const [lat, lng] = coords;

      if (glowLayerRef.current) {
        glowLayerRef.current.remove();
      }

      glowLayerRef.current = L.circle([lat, lng], {
        radius: 8000,
        color: "#06b6d4",
        weight: 3,
        fillColor: "#06b6d4",
        fillOpacity: 0.2,
        className: "glow-circle",
      }).addTo(map);

      map.setView([lat, lng], 8, {
        animate: true,
        duration: 1,
      });
    } else {
      // remove old glow if no valid coordinates
      if (glowLayerRef.current) {
        glowLayerRef.current.remove();
        glowLayerRef.current = null;
      }
    }
  }, [currentDish, dishes, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        suppressHydrationWarning
      />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-100 to-teal-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-2"></div>
            <p className="text-teal-700">Loading culinary map...</p>
          </div>
        </div>
      )}

      {/* Footer Info for Current Dish */}
      {/* Footer Info for Current Dish */}
      {dishes[currentDish]?.coordinates && (
        <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm p-4 border-t border-gray-200">
          <div className="flex items-center mb-2">
            <div
              className="w-4 h-4 rounded-full mr-3 animate-pulse border-2 border-white shadow-lg"
              style={{
                backgroundColor: dishes[currentDish]?.color,
              }}
            />
            <div>
              <span className="text-gray-800 font-semibold text-base block">
                {dishes[currentDish]?.region}
              </span>
              <span className="text-gray-600 text-sm">
                {dishes[currentDish]?.highlight}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              🌶️ {dishes[currentDish]?.spiceLevel}
            </span>
            <span className="flex items-center gap-1">
              ⏱️ {dishes[currentDish]?.cookingTime}
            </span>
            <span className="flex items-center gap-1">
              👨‍🍳 {dishes[currentDish]?.difficulty}
            </span>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes culinaryPulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.8),
              0 0 10px rgba(6, 182, 212, 0.6);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 1),
              0 0 15px rgba(6, 182, 212, 0.8);
          }
        }

        .custom-culinary-marker {
          background: transparent !important;
          border: none !important;
        }

        .glow-circle {
          animation: culinaryPulse 3s infinite;
        }
      `}</style>
    </div>
  );
}

function getMarkerHTML(color, isActive) {
  return `
    <div style="
      width: ${isActive ? "28px" : "24px"};
      height: ${isActive ? "28px" : "24px"};
      background-color: ${color};
      border: ${isActive ? "3px solid #06b6d4" : "2px solid #ffffff"};
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: ${
        isActive
          ? "0 0 20px rgba(6, 182, 212, 0.8), 0 0 10px rgba(6, 182, 212, 0.5)"
          : "0 2px 8px rgba(0,0,0,0.3)"
      };
      ${isActive ? "animation: culinaryPulse 2s infinite;" : ""}
      position: relative;
    ">
      ${
        isActive
          ? '<div style="position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; background: #06b6d4; border-radius: 50%; border: 1px solid white;"></div>'
          : ""
      }
    </div>
  `;
}
