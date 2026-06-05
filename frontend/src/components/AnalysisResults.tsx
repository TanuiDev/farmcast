import { type TreeAnalysisResponse } from "../types";
import HealthBreakdown from "./HealthBreakdown";
import Recommendations from "./Recommendations";
import WeatherContext from "./WeatherContext";

interface Props {
  result: TreeAnalysisResponse;
}

const AnalysisResults = ({ result }: Props) => {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Total Trees</p>
          <p className="text-2xl font-bold text-green-700">
            {result.total_tree_count}
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Canopy Coverage</p>
          <p className="text-2xl font-bold text-blue-700">
            {result.canopy_coverage_pct}%
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Confidence</p>
          <p className="text-2xl font-bold text-purple-700">
            {Math.round(result.confidence_score * 100)}%
          </p>
        </div>
        {result.tree_density_per_acre && (
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Trees/Acre</p>
            <p className="text-2xl font-bold text-orange-700">
              {Math.round(result.tree_density_per_acre)}
            </p>
          </div>
        )}
      </div>

      {/* Side by side images */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Farm Image Analysis
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2 text-center">
              Original Image
            </p>
            <img
              src={result.original_image_url}
              alt="Original farm"
              className="w-full rounded-xl object-cover max-h-64"
            />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2 text-center">
              Annotated Overlay
            </p>
            <img
              src={result.overlay_image_url}
              alt="Annotated farm"
              className="w-full rounded-xl object-cover max-h-64"
            />
          </div>
        </div>

        {result.tree_species_guess && (
          <p className="mt-3 text-sm text-gray-500 text-center">
            Species detected:{" "}
            <span className="font-medium text-green-700">
              {result.tree_species_guess}
            </span>
          </p>
        )}

        {result.low_confidence && (
          <p className="mt-2 text-xs text-yellow-600 bg-yellow-50 rounded-lg p-2 text-center">
            ⚠️ Low confidence score — consider uploading a clearer image
          </p>
        )}
      </div>

      {/* Weather context for county */}
      <WeatherContext county={result.county} />

      {/* Health breakdown */}
      <HealthBreakdown
        health={result.tree_health}
        total={result.total_tree_count}
      />

      {/* Recommendations */}
      <Recommendations
        observations={result.observations}
        recommendations={result.recommendations}
      />
    </div>
  );
};

export default AnalysisResults;