import { type DailyForecast } from "../types";

interface Props {
  forecast: DailyForecast[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ForecastStrip = ({ forecast }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        7-Day Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {forecast.map((day, index) => {
          const dayName = DAYS[new Date(day.date).getDay()];
          return (
            <div
              key={index}
              className="flex-shrink-0 bg-gray-50 rounded-xl p-4 text-center min-w-[100px]"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {dayName}
              </p>
              <img
                src={day.icon}
                alt={day.condition_code}
                className="w-8 h-8 mx-auto mb-2"
              />
              <div className="flex justify-between items-center gap-1 mt-2">
                <span className="text-sm font-bold text-gray-800">
                  {Math.round(day.temp_max)}°
                </span>
                <span className="text-sm text-gray-400">
                  {Math.round(day.temp_min)}°
                </span>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-blue-400 text-xs">💧</span>
                <span className="text-xs text-gray-500">
                  {day.precipitation_probability}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastStrip;