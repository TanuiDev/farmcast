import { useState, useEffect } from "react";
import { analyzeTrees, getTreeHistory, getTreeQuota } from "../api/client";
import {
  type TreeAnalysisResponse,
  type TreeHistoryResponse,
  type TreeQuotaResponse,
} from "../types";

export const useTreeAnalysis = () => {
  const [result, setResult] = useState<TreeAnalysisResponse | null>(null);
  const [history, setHistory] = useState<TreeHistoryResponse | null>(null);
  const [quota, setQuota] = useState<TreeQuotaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const analyze = async (formData: FormData) => {
  setLoading(true);
  setError(null);
  try {
    const data = await analyzeTrees(formData);
    setResult(data);
    await fetchHistory();
    await fetchQuota();
    return data;
  } catch (err) {
    setError(String(err));
    return null;
  } finally {
    setLoading(false);
  }
};

  const fetchHistory = async () => {
    try {
      const data = await getTreeHistory();
      setHistory(data);
    } catch (err) {
      console.error("History fetch failed:", err);
    }
  };

  const fetchQuota = async () => {
    try {
      const data = await getTreeQuota();
      setQuota(data);
    } catch (err) {
      console.error("Quota fetch failed:", err);
    }
  };

  // Load history and quota on mount
  useEffect(() => {
    fetchHistory();
    fetchQuota();
  }, []);

  return {
    result,
    history,
    quota,
    loading,
    error,
    analyze,
    fetchHistory,
    fetchQuota,
  };
};