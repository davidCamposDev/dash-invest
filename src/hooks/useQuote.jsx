import { useState, useEffect } from "react";
import { getQuote } from "../services/Brapi";

export default function useQuote(symbol) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!symbol) return;
    async function fetchQuote() {
      try {
        setLoading(true);
        const data = await getQuote(symbol);
        if (!data) {
          setError("Não foi possível carregar os dados.");
        }
        setQuote(data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, [symbol]);

  return { quote, loading, error };
}
