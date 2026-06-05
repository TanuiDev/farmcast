import { type HourlyForecast as HourlyType } from "../types";

interface Props {
  hourly: HourlyType[];
}

const HourlyForecast = ({ hourly }: Props) => {
  const next12 = hourly.slice(0, 12);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Hourly Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {next12.map((hour, index) => {
          const time = new Date(hour.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <div
              key={index}
              className="flex-shrink-0 bg-gray-50 rounded-xl p-3 text-center min-w-[80px]"
            >
              <p className="text-xs text-gray-400 mb-2">{time}</p>
              <img
                src={hour.icon}
                alt={hour.condition_code}
                className="w-6 h-6 mx-auto mb-1"
              />
              <p className="text-sm font-bold text-gray-800">
                {Math.round(hour.temperature)}°C
              </p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <span className="text-blue-400 text-xs">💧</span>
                <span className="text-xs text-gray-500">
                  {hour.precipitation_probability}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;