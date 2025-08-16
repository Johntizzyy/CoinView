import { useQuery } from "@tanstack/react-query";
import { coinGeckoApi } from "@/lib/coinGeckoApi";
import { Cryptocurrency, CoinDetail, GlobalMarketData, PriceHistory, ChartPeriod } from "@/types/crypto";

export function useMarketData(page = 1, perPage = 50) {
  return useQuery<Cryptocurrency[], Error>({
    queryKey: ['market-data', page, perPage],
    queryFn: () => coinGeckoApi.getMarketData(page, perPage),
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Refetch every minute
  });
}

export function useCoinDetail(id: string) {
  return useQuery<CoinDetail, Error>({
    queryKey: ['coin-detail', id],
    queryFn: () => coinGeckoApi.getCoinDetail(id),
    staleTime: 120000, // 2 minutes
    enabled: !!id,
  });
}

export function useGlobalData() {
  return useQuery<{ data: GlobalMarketData }, Error>({
    queryKey: ['global-data'],
    queryFn: () => coinGeckoApi.getGlobalData(),
    staleTime: 300000, // 5 minutes
  });
}

export function usePriceHistory(id: string, period: ChartPeriod) {
  return useQuery<PriceHistory, Error>({
    queryKey: ['price-history', id, period],
    queryFn: () => coinGeckoApi.getPriceHistory(id, coinGeckoApi.getPeriodInDays(period)),
    staleTime: 60000, // 1 minute
    enabled: !!id,
  });
}

export function useSearchCoins(query: string) {
  return useQuery({
    queryKey: ['search-coins', query],
    queryFn: () => coinGeckoApi.searchCoins(query),
    staleTime: 300000, // 5 minutes
    enabled: query.length > 2,
  });
}
