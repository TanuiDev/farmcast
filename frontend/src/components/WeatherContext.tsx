import { useEffect, useState } from "react";
import { getWeather } from "../api/client";
import { type WeatherResponse } from "../types";

const COUNTY_COORDS: Record<string, { lat: number; lon: number }> = {
  Bomet: { lat: -0.782, lon: 35.3408 },
  Nakuru: { lat: -0.3031, lon: 36.08 },
  Nairobi: { lat: -1.2921, lon: 36.8219 },
  Kisumu: { lat: -0.1022, lon: 34.7617 },
  Mombasa: { lat: -4.0435, lon: 39.6682 },
  Eldoret: { lat: 0.5143, lon: 35.2698 },
  Nyeri: { lat: -0.4167, lon: 36.95 },
  Machakos: { lat: -1.5177, lon: 37.2634 },
  Kisii: { lat: -0.6817, lon: 34.7667 },
  Meru: { lat: 0.0467, lon: 37.6497 },
};

interface Props {
  county?: string;
}

const WeatherContext = ({ county }: Props) => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    if (!county) return;

    const coords = COUNTY_COORDS[county];
    if (!coords) return;

    let isMounted = true;
    const fetchWeather = async () => {
      try {
        const data = await getWeather(coords.lat, coords.lon, "en", 3);
        if (isMounted) setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
    return () => {
      isMounted = false;
    };
  }, [county]);

  if (!county || !COUNTY_COORDS[county]) return null;
  if (!weather) return null;

  const { current, ai_summary } = weather;
  const rainChance = current.precipitation_probability ?? 0;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-semibold text-blue-800">
          Weather Context — {county}
        </h3>
      </div>
      <p className="text-sm text-blue-700 mb-2">
        {Math.round(current.temperature)}°C · {current.condition_code} ·{" "}
        {rainChance}% rain chance
      </p>
      {ai_summary && (
        <p className="text-xs text-blue-600 italic">{ai_summary}</p>
      )}
    </div>
  );
};

export default WeatherContext;