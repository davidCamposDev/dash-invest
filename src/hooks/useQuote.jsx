import { useState, useCallback } from "react";
import { getQuote } from "../services/Brapi";

export default function useQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = useCallback(async (symbol) => {
    if (!symbol) return;

    try {
      setLoading(true);
      setError("");
      const data = await getQuote(symbol);
      if (!data) {
        setError("Não foi possível carregar os dados.");
        return;
      }
      setQuote(data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { quote, loading, error, fetchQuote };
}
