"use client";

import { destinations } from "@/data/destinations";
import { useState } from "react";
export default function GeocodeAll() {
  const [results, setResults] = useState([]);

  const fetchCoordinates = async (location) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`
    );
    const data = await res.json();
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return [lat, lng];
    } else {
      console.warn(`Coordinates not found for ${location}`);
      return [null, null];
    }
  };

  const handleGeocodeAll = async () => {
    const updated = [];
    for (const dest of destinations) {
      const coords = await fetchCoordinates(dest.name);
      updated.push({ ...dest, coordinates: coords });
    }
    setResults(updated);
    // Optionally, download JSON file:
    const blob = new Blob([JSON.stringify(updated, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "destinations-with-coordinates.json";
    a.click();
  };

  return (
    <div className="p-4">
      <button
        onClick={handleGeocodeAll}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Fetch All Coordinates & Download JSON
      </button>

      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Updated Destinations:</h2>
          <pre className="bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}