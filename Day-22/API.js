const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

export async function fetchMarketData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network Error");
    return await response.json();
  } catch (error) {
    throw error;
  }
}
