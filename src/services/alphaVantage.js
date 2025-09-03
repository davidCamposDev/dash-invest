import axios from "axios";

const apiKey = "H557T52A8T0SDERU"; // coloca sua chave do Alpha Vantage

const api = axios.create({
  baseURL: "https://www.alphavantage.co/query",
});

export async function getDailySeries(symbol) {
  const res = await api.get("", {
    params: {
      function: "TIME_SERIES_DAILY",
      symbol,
      apikey: apiKey,
    },
  });

  return res.data["Time Series (Daily)"];
}
