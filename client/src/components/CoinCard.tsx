import { motion } from "framer-motion";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { Cryptocurrency } from "@/types/crypto";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface CoinCardProps {
  coin: Cryptocurrency;
  index: number;
}

export function CoinCard({ coin, index }: CoinCardProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  
  const isPositive = coin.price_change_percentage_24h >= 0;

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(coin.id, coin.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ y: -2 }}
    >
      <Link href={`/coin/${coin.id}`}>
        <div className="lg:grid lg:grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer">
          {/* Rank and Watchlist */}
          <div className="lg:col-span-1 flex lg:block items-center lg:items-start">
            <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">
              {coin.market_cap_rank}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto lg:ml-0 lg:mt-2 p-0 h-auto hover:bg-transparent"
              onClick={handleWatchlistToggle}
            >
              <Star
                className={`h-4 w-4 transition-colors ${
                  isInWatchlist(coin.id)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-400 hover:text-yellow-500"
                }`}
              />
            </Button>
          </div>
          
          {/* Coin Info */}
          <div className="lg:col-span-3 flex items-center space-x-3 mt-2 lg:mt-0">
            <img
              src={coin.image}
              alt={`${coin.name} logo`}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-coin.png';
              }}
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{coin.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</div>
            </div>
          </div>

          {/* Price */}
          <div className="lg:col-span-2 lg:text-right mt-2 lg:mt-0">
            <div className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
              {formatCurrency(coin.current_price)}
            </div>
          </div>

          {/* 24h Change */}
          <div className="lg:col-span-2 lg:text-right mt-1 lg:mt-0">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                isPositive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {formatPercent(coin.price_change_percentage_24h)}
            </span>
          </div>

          {/* Market Cap */}
          <div className="lg:col-span-2 lg:text-right mt-1 lg:mt-0">
            <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">
              {formatCurrency(coin.market_cap)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">MCap</div>
          </div>

          {/* Volume */}
          <div className="lg:col-span-2 lg:text-right mt-1 lg:mt-0">
            <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">
              {formatCurrency(coin.total_volume)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Volume</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
