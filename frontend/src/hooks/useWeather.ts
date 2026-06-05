import { useState } from "react";
import { getWeather } from "../api/client";
import { type WeatherResponse, type GeocodeResult } from "../types";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [location, setLocation] = useState<GeocodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<string>("en");

  const fetchWeather = async (geo: GeocodeResult, language?: string) => {
    setLoading(true);
    setError(null);
    try {
      const activeLang = language || lang;
      const data: WeatherResponse = await getWeather(geo.lat, geo.lon, activeLang);

      
      if (data.hourly && data.hourly.length > 0) {
        const now = new Date();
        const currentHour = data.hourly.find((h) => {
          const hTime = new Date(h.time);
          return hTime.getHours() === now.getHours();
        }) || data.hourly[0];

        data.current = {
          ...data.current,
          humidity: currentHour.humidity,
          feels_like: currentHour.feels_like,
          uv_index: currentHour.uv_index,
          precipitation_probability: currentHour.precipitation_probability,
        };
      }

      setWeather(data);
      setLocation(geo);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    if (location) fetchWeather(location, newLang);
  };

  return {
    weather,
    location,
    loading,
    error,
    lang,
    fetchWeather,
    changeLanguage,
  };
};