import React from "react";
import KPICard from "./KpiCard";
import useQuote from "../hooks/useQuote";

export default function KPISection({ symbol }) {
  const { quote, loading, error } = useQuote(symbol);

  if (loading)
    return (
      <p className="text-gray-500 dark:text-gray-400">Carregando KPIs...</p>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!quote) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <KPICard title="Preço Atual" value={`R$ ${quote.regularMarketPrice}`} />
      <KPICard
        title="Variação"
        value={`${quote.regularMarketChangePercent.toFixed(2)}%`}
        color={
          quote.regularMarketChangePercent >= 0
            ? "text-green-500"
            : "text-red-500"
        }
      />
      <KPICard title="Dividend Yield" value={`${quote.dividendYield || 0}%`} />
      <KPICard
        title="Market Cap"
        value={`R$ ${quote.marketCap?.toLocaleString("pt-BR")}`}
      />
    </div>
  );
}
