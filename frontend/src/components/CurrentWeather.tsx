import { type CurrentConditions } from "../types";

interface Props {
  current: CurrentConditions;
  city?: string;
}

const CurrentWeather = ({ current, city }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {city || "Current Location"}
          </h2>
          <p className="text-gray-500 text-sm">
            Code: {current.condition_code}
          </p>
        </div>
        <div className="text-5xl font-bold text-green-600">
          {Math.round(current.temperature)}°C
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Feels Like</p>
          <p className="text-lg font-semibold text-gray-700">
            {current.feels_like ? `${Math.round(current.feels_like)}°C` : "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Humidity</p>
          <p className="text-lg font-semibold text-gray-700">
            {current.humidity ? `${current.humidity}%` : "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Wind</p>
          <p className="text-lg font-semibold text-gray-700">
            {current.wind_speed} km/h
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Rain Chance</p>
          <p className="text-lg font-semibold text-gray-700">
            {current.precipitation_probability ?? "N/A"}%
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">UV Index</p>
          <p className="text-lg font-semibold text-gray-700">
            {current.uv_index ?? "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Wind Direction</p>
          <p className="text-lg font-semibold text-gray-700">
            {current.wind_direction}°
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;