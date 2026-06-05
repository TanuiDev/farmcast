import { useState } from "react";
import { sendSMS } from "../api/client";
import { type TreeAnalysisResponse } from "../types";

interface Props {
  result: TreeAnalysisResponse;
}

const SMSPanel = ({ result }: Props) => {
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const formatMessage = (): string => {
    const msg = `FarmaCast: ${result.total_tree_count} trees detected. Canopy: ${result.canopy_coverage_pct}%. Healthy: ${result.tree_health.healthy}, Needs care: ${result.tree_health.needs_care}. ${result.recommendations[0] || ""}`;
    return msg.slice(0, 160);
  };

  const handleSend = async () => {
    if (!phone.trim()) return;
    setSending(true);
    setStatus("idle");
    try {
      await sendSMS(phone, formatMessage());
      setStatus("success");
      setPhone("");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        📱 Send SMS Advisory
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        Send this farm analysis as an SMS to the farmer
      </p>

      {/* Message preview */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4">
        <p className="text-xs text-gray-500 mb-1">Message preview:</p>
        <p className="text-sm text-gray-700">{formatMessage()}</p>
        <p className="text-xs text-gray-400 mt-1 text-right">
          {formatMessage().length}/160 characters
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+254712345678"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSend}
          disabled={sending || !phone.trim()}
          className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>

      {status === "success" && (
        <p className="mt-3 text-sm text-green-600 bg-green-50 rounded-lg p-2 text-center">
          ✅ SMS sent successfully
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg p-2 text-center">
          ❌ Failed to send SMS. Check the number and try again.
        </p>
      )}
    </div>
  );
};

export default SMSPanel;