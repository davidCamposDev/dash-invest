import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Chart({ data, darkMode }) {
  if (!data || data.length === 0)
    return (
      <p className="text-gray-800 dark:text-gray-100">
        Nenhum dado para exibir.
      </p>
    );

  const textColor = darkMode ? "#e5e7eb" : "#111827"; // Tailwind gray-200 / gray-900
  const gridColor = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const lineColor = darkMode ? "#facc15" : "#2563eb"; // amarelo / azul
  const fillColor = darkMode
    ? "rgba(250, 204, 21, 0.2)"
    : "rgba(37, 99, 235, 0.2)";

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Preço de Fechamento",
        data: data.map((d) => d.close),
        borderColor: lineColor,
        backgroundColor: fillColor,
        pointBackgroundColor: lineColor,
        pointBorderColor: lineColor,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: textColor },
      },
      title: {
        display: true,
        text: "Histórico de Preços",
        color: textColor,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
