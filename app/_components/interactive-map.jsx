"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function InteractiveMap({
  destinations,
  currentDestination,
  onDestinationClick,
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

    const maharashtraBounds = [
      [14.2452, 70.1067],
      [20.6085, 76.8336],
    ];

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: false,
      maxBounds: maharashtraBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 7,
      maxZoom: 15,
    }).setView([19.0, 75.0], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    map.fitBounds(maharashtraBounds, { padding: [20, 20] });

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

    destinations.forEach((destination, index) => {
      const [lat, lng] = destination.coordinates || [];
      if (lat == null || lng == null) return;

      const isActive = index === currentDestination;
      const markerHtml = getMarkerHTML(destination.color, isActive);

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          html: markerHtml,
          className: "custom-marker",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
      }).addTo(map);

      marker.on("click", () => {
        console.log("Clicked:", destination.name);
        onDestinationClick(index);
      });

      marker.bindPopup(`
        <div style="padding: 8px; font-family: system-ui;">
          <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: ${destination.color};">
            ${destination.name}
          </h3>
          <p style="margin: 0; font-size: 12px; color: #666;">
            ${destination.highlight}
          </p>
        </div>
      `);

      markersRef.current.push(marker);
    });

    // Glow effect for active marker
    const active = destinations[currentDestination];
    if (active?.coordinates) {
      const [lat, lng] = active.coordinates;

      if (glowLayerRef.current) {
        glowLayerRef.current.remove();
      }

      glowLayerRef.current = L.circle([lat, lng], {
        radius: 5000,
        color: "#ffd700",
        weight: 4,
        fillColor: "#ffd700",
        fillOpacity: 0.3,
        className: "glow-circle",
      }).addTo(map);

      map.setView([lat, lng], 10, {
        animate: true,
        duration: 1,
      });
    }
  }, [currentDestination, destinations, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        className="w-full h-full pt-20 pb-32"
        suppressHydrationWarning
      />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 pt-20 pb-32">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Loading map...</p>
          </div>
        </div>
      )}

      {/* Footer Info for Current Destination */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-slate-900/95 backdrop-blur-sm p-4 border-t border-slate-700">
        <div className="flex items-center mb-3">
          <div
            className="w-4 h-4 rounded-full mr-3 animate-pulse border-2 border-white"
            style={{
              backgroundColor: destinations[currentDestination]?.color,
            }}
          />
          <div>
            <span className="text-white font-semibold text-base block">
              {destinations[currentDestination]?.name}
            </span>
            <span className="text-gray-300 text-sm">
              {destinations[currentDestination]?.highlight}
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.9),
              0 0 10px rgba(255, 215, 0, 0.6);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 215, 0, 1),
              0 0 20px rgba(255, 215, 0, 0.8);
          }
        }

        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}

function getMarkerHTML(color, isActive) {
  return `
    <div style="
      width: ${isActive ? "24px" : "20px"};
      height: ${isActive ? "24px" : "20px"};
      background-color: ${color};
      border: ${isActive ? "3px solid #ffd700" : "2px solid #ffffff"};
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: ${
        isActive
          ? "0 0 30px rgba(255, 215, 0, 0.9), 0 0 10px rgba(255, 215, 0, 0.5)"
          : "0 2px 8px rgba(0,0,0,0.3)"
      };
      ${isActive ? "animation: pulse 2s infinite;" : ""}
    "></div>
  `;
}
