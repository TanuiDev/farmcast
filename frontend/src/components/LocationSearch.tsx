import { useState } from "react";
import { geocodeLocation } from "../api/client";
import { type GeocodeResult } from "../types";

interface Props {
  onLocationFound: (geo: GeocodeResult) => void;
  loading?: boolean;
}

const LocationSearch = ({ onLocationFound, loading }: Props) => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    try {
      const geo = await geocodeLocation(query);
      onLocationFound(geo);
    } catch {
      setError("Location not found. Try a different name.");
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search location e.g. Nakuru, Bomet..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
        <button
          onClick={handleSearch}
          disabled={searching || loading}
          className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default LocationSearch;