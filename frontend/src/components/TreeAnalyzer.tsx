import { useState } from "react";
import { useTreeAnalysis } from "../hooks/useTreeAnalysis";

const TreeAnalyzer = () => {
  const { analyze, loading, error } = useTreeAnalysis();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({
    farmerId: "",
    county: "",
    landAcres: "",
    location: "",
    notes: "",
  });

  const handleFile = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    if (form.farmerId)  formData.append("farmerId", form.farmerId);
    if (form.county)    formData.append("county", form.county);
    if (form.landAcres) formData.append("landAcres", form.landAcres);
    if (form.location)  formData.append("location", form.location);
    if (form.notes)     formData.append("notes", form.notes);

    await analyze(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Farm Tree Analyzer
      </h3>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          dragging
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
        }`}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Farm preview"
            className="max-h-48 mx-auto rounded-lg object-cover"
          />
        ) : (
          <div>
            <p className="text-4xl mb-2">Select image</p>
            <p className="text-sm text-gray-500">
              Drag & drop a farm image or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supports JPG, PNG, WebP
            </p>
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Farmer ID
          </label>
          <input
            name="farmerId"
            value={form.farmerId}
            onChange={handleChange}
            placeholder="e.g. F001"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            County
          </label>
          <input
            name="county"
            value={form.county}
            onChange={handleChange}
            placeholder="e.g. Bomet"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Land Acres
          </label>
          <input
            name="landAcres"
            value={form.landAcres}
            onChange={handleChange}
            placeholder="e.g. 5"
            type="number"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Sotik, Bomet"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any additional notes about the farm..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg p-3">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!image || loading}
        className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition"
      >
        {loading ? "Analyzing farm..." : "Analyze Farm"}
      </button>
    </div>
  );
};

export default TreeAnalyzer;