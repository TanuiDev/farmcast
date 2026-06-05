import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { useTreeAnalysis } from "./hooks/useTreeAnalysis";
import { type GeocodeResult } from "./types";
import LocationSearch from "./components/LocationSearch";
import LanguageToggle from "./components/LanguageToggle";
import AISummary from "./components/AISummarry";
import CurrentWeather from "./components/CurrentWeather";
import ForecastStrip from "./components/ForecastStrip";
import HourlyForecast from "./components/HourlyForecast";
import TreeAnalyzer from "./components/TreeAnalyzer";
import AnalysisResults from "./components/AnalysisResults";
import AnalysisHistory from "./components/AnalysisHistory";
import QuotaBar from "./components/QuotaBar";
import SMSPanel from "./components/SMSPanel";

type Tab = "weather" | "farm";

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>("weather");
  const { weather, loading, error, lang, fetchWeather, changeLanguage } = useWeather();
  const { result, history, quota } = useTreeAnalysis();

  const handleLocationFound = (geo: GeocodeResult) => {
    fetchWeather(geo);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-green-700 text-white px-6 py-4 shadow">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h1 className="text-xl font-bold tracking-tight">FarmaCast</h1>
          </div>
          <p className="text-green-200 text-sm hidden sm:block">
            AI-Powered Farm Intelligence
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-4xl mx-auto flex gap-6">
          <button
            onClick={() => setActiveTab("weather")}
            className={`py-3 text-sm font-medium border-b-2 transition ${
              activeTab === "weather"
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            🌤️ Weather Dashboard
          </button>
          <button
            onClick={() => setActiveTab("farm")}
            className={`py-3 text-sm font-medium border-b-2 transition ${
              activeTab === "farm"
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            🌿 Farm Analyzer
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Weather Tab ── */}
        {activeTab === "weather" && (
          <>
            {/* Search + Language */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <LocationSearch
                onLocationFound={handleLocationFound}
                loading={loading}
              />
              <LanguageToggle lang={lang} onChange={changeLanguage} />
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-12 text-gray-400 animate-pulse">
                Fetching weather data...
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}

            {/* Weather Data */}
            {weather && !loading && (
              <>
                <CurrentWeather
                  current={weather.current}
                  city={weather.location.city}
                />
                {weather.ai_summary && (
                  <AISummary summary={weather.ai_summary} />
                )}
                {weather.daily && weather.daily.length > 0 && (
                  <ForecastStrip forecast={weather.daily} />
                )}
                {weather.hourly && weather.hourly.length > 0 && (
                  <HourlyForecast hourly={weather.hourly} />
                )}
              </>
            )}

            {/* Empty State */}
            {!weather && !loading && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-3">🌍</p>
                <p className="text-sm">Search for a location to get started</p>
              </div>
            )}
          </>
        )}

        {/* ── Farm Analyzer Tab ── */}
        {activeTab === "farm" && (
          <>
            {/* Quota bar at top */}
            {quota && <QuotaBar quota={quota} />}

            {/* Image upload + form — hook handles state internally */}
            <TreeAnalyzer />

            {/* Results appear after analysis */}
            {result && (
              <>
                <AnalysisResults result={result} />
                <SMSPanel result={result} />
              </>
            )}

            {/* Past analyses */}
            {history && <AnalysisHistory history={history} />}
          </>
        )}

      </main>
    </div>
  );
};

export default App;