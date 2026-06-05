import { type TreeHistoryResponse } from "../types";

interface Props {
  history: TreeHistoryResponse;
}

const AnalysisHistory = ({ history }: Props) => {
  if (!history.analyses || history.analyses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-400 text-sm">
        No previous analyses found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📋 Past Analyses
      </h3>
      <div className="space-y-3">
        {history.analyses.map((item) => (
          <div
            key={item.analysis_id}
            className="flex items-center justify-between bg-gray-50 rounded-xl p-3"
          >
            <div>
              <p className="text-sm font-medium text-gray-700">
                {item.county || "Unknown location"} ·{" "}
                {item.farmer_id || "No farmer ID"}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleDateString()} ·{" "}
                {item.total_tree_count} trees
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-700">
                {item.canopy_coverage_pct}% canopy
              </p>
              <p className="text-xs text-gray-400">
                {Math.round(item.confidence_score * 100)}% confidence
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;