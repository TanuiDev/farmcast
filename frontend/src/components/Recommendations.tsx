interface Props {
  observations: string[];
  recommendations: string[];
}

const Recommendations = ({ observations, recommendations }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6">
      {observations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🔍 Observations
          </h3>
          <ul className="space-y-2">
            {observations.map((obs, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                {obs}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            💡 AI Recommendations
          </h3>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600 bg-green-50 rounded-lg p-3"
              >
                <span className="text-green-500 shrink-0">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommendations;