// hooks/useStockData.js
import { useState } from "react";
import getDailySeries from "../services/Brapi";

const CACHE_DURATION = 60 * 60 * 1000; // 1h

export default function useStockData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function fetchData(symbol) {
    if (!symbol) return;

    setError("");
    const cacheKey = `stock_${symbol}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const parsed = JSON.parse(cached);
      const age = Date.now() - parsed.timestamp;
      if (age < CACHE_DURATION) {
        setData(parsed.data);
        return;
      }
    }

    const series = await getDailySeries(symbol);
    if (!series) {
      setError("Não foi possível obter dados para este símbolo.");
      setData([]);
      return;
    }

    localStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: Date.now(), data: series })
    );
    setData(series);
  }

  return { data, error, fetchData };
}
