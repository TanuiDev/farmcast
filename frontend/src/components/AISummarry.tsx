interface Props {
  summary: string;
}

const AISummary = ({ summary }: Props) => {
  if (!summary) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-green-600 text-lg">🤖</span>
        <h3 className="text-sm font-semibold text-green-800">AI Weather Summary</h3>
      </div>
      <p className="text-sm text-green-900 leading-relaxed">{summary}</p>
    </div>
  );
};

export default AISummary;