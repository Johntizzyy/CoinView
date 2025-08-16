import { Cryptocurrency, CoinDetail, GlobalMarketData, PriceHistory, ChartPeriod } from "@/types/crypto";

const BASE_URL = 'https://api.coingecko.com/api/v3';

class CoinGeckoApi {
  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getMarketData(page = 1, perPage = 50): Promise<Cryptocurrency[]> {
    return this.request<Cryptocurrency[]>(
      `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=24h`
    );
  }

  async getCoinDetail(id: string): Promise<CoinDetail> {
    return this.request<CoinDetail>(
      `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );
  }

  async getGlobalData(): Promise<{ data: GlobalMarketData }> {
    return this.request<{ data: GlobalMarketData }>('/global');
  }

  async getPriceHistory(id: string, days: string): Promise<PriceHistory> {
    return this.request<PriceHistory>(
      `/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=${days === '1' ? 'hourly' : 'daily'}`
    );
  }

  async searchCoins(query: string): Promise<{ coins: Array<{ id: string; name: string; symbol: string; large: string }> }> {
    return this.request<{ coins: Array<{ id: string; name: string; symbol: string; large: string }> }>(
      `/search?query=${encodeURIComponent(query)}`
    );
  }

  getPeriodInDays(period: ChartPeriod): string {
    switch (period) {
      case '24h': return '1';
      case '7d': return '7';
      case '30d': return '30';
      case '1y': return '365';
      default: return '7';
    }
  }
}

export const coinGeckoApi = new CoinGeckoApi();
