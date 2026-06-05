import { type TreeHealth } from "../types";

interface Props {
  health: TreeHealth;
  total: number;
}

const HealthBreakdown = ({ health, total }: Props) => {
  const items = [
    {
      label: "Healthy",
      count: health.healthy,
      color: "bg-green-500",
      textColor: "text-green-700",
      bg: "bg-green-50",
      icon: "✅",
    },
    {
      label: "Needs Care",
      count: health.needs_care,
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      bg: "bg-yellow-50",
      icon: "⚠️",
    },
    {
      label: "Needs Replacement",
      count: health.needs_replacement,
      color: "bg-red-500",
      textColor: "text-red-700",
      bg: "bg-red-50",
      icon: "❌",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Tree Health Breakdown
      </h3>
      <div className="space-y-3">
        {items.map((item) => {
          const percentage = total > 0
            ? Math.round((item.count / total) * 100)
            : 0;

          return (
            <div key={item.label} className={`${item.bg} rounded-xl p-3`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className={`text-sm font-medium ${item.textColor}`}>
                    {item.label}
                  </span>
                </div>
                <span className={`text-sm font-bold ${item.textColor}`}>
                  {item.count} trees ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-white rounded-full h-1.5">
                <div
                  className={`${item.color} h-1.5 rounded-full transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HealthBreakdown;