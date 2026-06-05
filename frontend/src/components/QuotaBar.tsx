import { type TreeQuotaResponse } from "../types";

interface Props {
  quota: TreeQuotaResponse;
}

const QuotaBar = ({ quota }: Props) => {
  const percentage = quota.unlimited
    ? 100
    : Math.round((quota.used / quota.limit) * 100);

  const remaining = quota.unlimited ? "Unlimited" : `${quota.remaining} remaining`;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-green-600">📊</span>
          <span className="text-sm font-semibold text-gray-700">
            Analysis Quota
          </span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full capitalize">
            {quota.plan}
          </span>
        </div>
        <span className="text-xs text-gray-500">{remaining}</span>
      </div>

      {!quota.unlimited && (
        <>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                percentage >= 90
                  ? "bg-red-500"
                  : percentage >= 70
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">
              {quota.used} used
            </span>
            <span className="text-xs text-gray-400">
              {quota.limit} total
            </span>
          </div>
        </>
      )}

      <p className="text-xs text-gray-400 mt-2">
        Resets: {new Date(quota.resets_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default QuotaBar;