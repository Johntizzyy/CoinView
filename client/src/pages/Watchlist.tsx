import { motion } from "framer-motion";
import { Star, Trash2 } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useMarketData } from "@/hooks/useCryptoData";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useMemo } from "react";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const { data: allCoins, isLoading } = useMarketData(1, 250); // Get more coins to find watchlist items

  const watchlistCoins = useMemo(() => {
    if (!allCoins || !watchlist.length) return [];
    
    return allCoins.filter(coin => watchlist.includes(coin.id));
  }, [allCoins, watchlist]);

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Watchlist</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your favorite cryptocurrencies</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Watchlist</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your favorite cryptocurrencies</p>
      </motion.div>

      {watchlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="text-center p-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No cryptocurrencies in your watchlist
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start adding cryptocurrencies to track their performance
              </p>
              <Link href="/">
                <Button>Browse Cryptocurrencies</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {watchlistCoins.map((coin, index) => {
            const isPositive = coin.price_change_percentage_24h >= 0;
            
            return (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Link href={`/coin/${coin.id}`}>
                        <div className="flex items-center space-x-4 cursor-pointer">
                          <img
                            src={coin.image}
                            alt={`${coin.name} logo`}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {coin.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">
                              {coin.symbol} • #{coin.market_cap_rank}
                            </p>
                          </div>
                        </div>
                      </Link>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                            {formatCurrency(coin.current_price)}
                          </p>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                              isPositive
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {formatPercent(coin.price_change_percentage_24h)}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                            {formatCurrency(coin.market_cap)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWatchlist(coin.id, coin.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </main>
  );
}
