import { motion } from "framer-motion";
import { Cryptocurrency } from "@/types/crypto";
import { CoinCard } from "./CoinCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CoinTableProps {
  coins: Cryptocurrency[];
  isLoading?: boolean;
}

export function CoinTable({ coins, isLoading }: CoinTableProps) {
  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-1" />
        </CardHeader>
        <CardContent className="p-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cryptocurrency Prices
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Top cryptocurrencies by market cap
          </p>
        </CardHeader>

        {/* Table Header */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-750 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Coin</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">24h %</div>
          <div className="col-span-2 text-right">Market Cap</div>
          <div className="col-span-2 text-right">Volume (24h)</div>
        </div>

        {/* Coin Rows */}
        <div>
          {coins.map((coin, index) => (
            <CoinCard key={coin.id} coin={coin} index={index} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
