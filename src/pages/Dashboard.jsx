import React, { useState } from "react";
import getDailySeries from "../services/Brapi";
import Chart from "../components/chart";
import useDarkMode from "../hooks/useDarkMode";

export default function Dashboard() {
  const [symbol, setSymbol] = useState("PETR4");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useDarkMode();

  const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

  async function fetchData() {
    if (!symbol) return;

    setError("");
    const cacheKey = `stock_${symbol}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const parsed = JSON.parse(cached);
      const age = Date.now() - parsed.timestamp;
      if (age < CACHE_DURATION) {
        console.log("Usando cache para", symbol);
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            📊 Mini Dashboard de Investimento
          </h2>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded transition"
          >
            {darkMode ? "☀️ Claro" : "🌙 Escuro"}
          </button>
        </div>

        {/* Campo de busca */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Digite o símbolo (ex: PETR4)"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-gray-700 dark: bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Chart data={data} darkMode={darkMode} />
      </div>
    </div>
  );
}
