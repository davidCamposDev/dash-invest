import axios from "axios";

const token = import.meta.env.VITE_BRAPI_TOKEN;

const api = axios.create({
  baseURL: "https://brapi.dev/api",
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export default async function getDailySeries(symbol) {
  if (!symbol) return null;

  try {
    const res = await api.get(`/quote/${symbol}`, {
      params: { range: "3mo", interval: "1d" },
    });

    const results = res.data?.results?.[0];
    if (!results?.historicalDataPrice) return null;

    return results.historicalDataPrice
      .map((item) => ({
        date: new Date(item.date * 1000).toISOString().split("T")[0],
        close: item.close,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
}

export async function getQuote(symbol) {
  if (!symbol) return null;

  try {
    const res = await api.get(`/quote/${symbol}`);
    return res.data?.results?.[0] || null;
  } catch (error) {
    console.error("Erro ao buscar quote:", error);
    return null;
  }
}
