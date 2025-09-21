import React, { useEffect } from "react";
import KPICard from "./KpiCard";
import useQuote from "../hooks/useQuote";

export default function KPISection({ symbol }) {
  const { quote, loading, fetchQuote } = useQuote();

  useEffect(() => {
    const symbolToUse = symbol?.trim() || "PETR4";
    fetchQuote(symbolToUse);
  }, [symbol, fetchQuote]);

  return (
    <div className="flex justify-center mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        <KPICard
          title="Preço Atual"
          value={
            loading
              ? "Carregando..."
              : quote?.regularMarketPrice
              ? `R$ ${quote.regularMarketPrice.toFixed(2)}`
              : "--"
          }
          loading={loading}
          placeholder={!quote && !loading}
        />

        <KPICard
          title="Variação"
          value={
            loading
              ? "Carregando..."
              : quote?.regularMarketChangePercent !== null &&
                quote?.regularMarketChangePercent !== undefined
              ? `${quote.regularMarketChangePercent.toFixed(2)}%`
              : "--"
          }
          color={
            quote?.regularMarketChangePercent >= 0
              ? "text-green-500"
              : "text-red-500"
          }
          loading={loading}
          placeholder={!quote && !loading}
        />

        <KPICard
          title="Market Cap"
          value={
            loading
              ? "Carregando..."
              : quote?.marketCap
              ? `R$ ${quote.marketCap.toLocaleString("pt-BR")}`
              : "--"
          }
          loading={loading}
          placeholder={!quote && !loading}
        />
      </div>
    </div>
  );
}
