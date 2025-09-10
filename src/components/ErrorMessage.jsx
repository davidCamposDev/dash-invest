import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
      {message}
    </div>
  );
}
