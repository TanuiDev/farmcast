interface Props {
  lang: string;
  onChange: (lang: string) => void;
}

const LanguageToggle = ({ lang, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Language:</span>
      <div className="flex rounded-lg overflow-hidden border border-gray-300">
        <button
          onClick={() => onChange("en")}
          className={`px-4 py-1.5 text-sm font-medium transition ${
            lang === "en"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          English
        </button>
        <button
          onClick={() => onChange("sw")}
          className={`px-4 py-1.5 text-sm font-medium transition ${
            lang === "sw"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Swahili
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;