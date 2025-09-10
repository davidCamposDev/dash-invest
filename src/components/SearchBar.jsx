import React from "react";

export default function SearchBar({ symbol, setSymbol, fetchData }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Digite o símbolo (ex: PETR4)"
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={() => fetchData(symbol)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </div>
  );
}
