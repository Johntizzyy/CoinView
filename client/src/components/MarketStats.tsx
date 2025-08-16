import { motion } from "framer-motion";
import { useGlobalData } from "@/hooks/useCryptoData";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Activity, Bitcoin, Coins } from "lucide-react";

export function MarketStats() {
  const { data: globalData, isLoading, error } = useGlobalData();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !globalData) {
    return null;
  }

  const stats = globalData.data;
  
  const marketCapUsd = stats.total_market_cap?.usd || 0;
  const volumeUsd = stats.total_volume?.usd || 0;
  const btcDominance = stats.market_cap_percentage?.btc || 0;
  const marketCapChange = stats.market_cap_change_percentage_24h_usd || 0;

  const statsData = [
    {
      title: "Total Market Cap",
      value: formatCurrency(marketCapUsd),
      change: marketCapChange,
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "24h Volume",
      value: formatCurrency(volumeUsd),
      change: -1.2, // Mock data since API doesn't provide volume change
      icon: Activity,
      color: "green",
    },
    {
      title: "BTC Dominance",
      value: `${btcDominance.toFixed(1)}%`,
      change: 0.3, // Mock data
      icon: Bitcoin,
      color: "orange",
    },
    {
      title: "Active Coins",
      value: formatNumber(stats.active_cryptocurrencies),
      change: null,
      icon: Coins,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`text-${stat.color}-600 dark:text-${stat.color}-400`} size={20} />
                </div>
              </div>
              {stat.change !== null && (
                <div className="mt-4 flex items-center">
                  <span
                    className={`text-sm font-medium flex items-center ${
                      stat.change >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change >= 0 ? "↗" : "↘"}
                    {formatPercent(Math.abs(stat.change))}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">24h</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
