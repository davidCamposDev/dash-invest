import React from "react";

export default function KPICard({ title, value, color }) {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
      <span className="text-sm text-center text-gray-500 dark:text-gray-300">
        {title}
      </span>
      <span
        className={`text-xl text-center font-bold ${
          color || "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
