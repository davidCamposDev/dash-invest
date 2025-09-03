import { useState, useEffect } from "react";
import React from "react";
import { getDailySeries } from "./services/alphaVantage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const raw = await getDailySeries(symbol);

      if (!raw) return;

      const formatted = Object.entries(raw).map(([date, values]) => ({
        date,
        close: Number(values["4. close"]),
      }));

      setData(formatted.reverse());
    }

    fetchData();
  }, [symbol]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Investimentos</h1>

      <div className="mb-4">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Digite o ticker (ex: AAPL, MSFT, TSLA)"
          className="border p-2 rounded"
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="date" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
