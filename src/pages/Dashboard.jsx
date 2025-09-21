import React, { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useStockData from "../hooks/useStockData";
import Chart from "../components/chart";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ErrorMessage";
import KPISection from "../components/KpiSection";

export default function Dashboard() {
  const [symbol, setSymbol] = useState("PETR4");
  const [darkMode, setDarkMode] = useDarkMode();
  const { data, error, fetchData } = useStockData();

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-6`}
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            📊 Mini Dashboard de Investimento
          </h2>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {darkMode ? "☀️ Claro" : "🌙 Escuro"}
          </button>
        </header>

        <SearchBar
          symbol={symbol}
          setSymbol={setSymbol}
          fetchData={fetchData}
        />

        <ErrorMessage message={error} />

        <KPISection symbol={symbol} />

        <Chart data={data} darkMode={darkMode} />
      </div>
    </div>
  );
}
