import { motion } from "framer-motion";
import { useRoute } from "wouter";
import { Star, Globe, Github, Twitter, ArrowLeft, ExternalLink } from "lucide-react";
import { useCoinDetail } from "@/hooks/useCryptoData";
import { useWatchlist } from "@/hooks/useWatchlist";
import { PriceChart } from "@/components/PriceChart";
import { formatCurrency, formatPercent, formatSupply } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function CoinDetail() {
  const [, params] = useRoute("/coin/:id");
  const coinId = params?.id || "";
  
  const { data: coin, isLoading, error } = useCoinDetail(coinId);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </main>
    );
  }

  if (error || !coin) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <p className="text-lg font-medium">Failed to load coin details</p>
            <p className="text-sm">The requested cryptocurrency could not be found.</p>
          </div>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Markets
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
      >
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        
        <div className="flex items-center space-x-4 flex-1">
          <img
            src={coin.image}
            alt={`${coin.name} logo`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {coin.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 uppercase text-sm">
              {coin.symbol} • #{coin.market_cap_rank}
            </p>
          </div>
        </div>

        <Button
          onClick={() => toggleWatchlist(coin.id, coin.name)}
          variant={isInWatchlist(coin.id) ? "default" : "outline"}
        >
          <Star className={`w-4 h-4 mr-2 ${isInWatchlist(coin.id) ? "fill-current" : ""}`} />
          {isInWatchlist(coin.id) ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      </motion.div>

      {/* Price and Basic Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="md:col-span-1">
          <CardContent className="p-6 text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Price</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white font-mono">
              {formatCurrency(coin.current_price)}
            </p>
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className={`mt-2 ${isPositive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}`}
            >
              {formatPercent(coin.price_change_percentage_24h)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
              {formatCurrency(coin.market_cap)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Rank #{coin.market_cap_rank}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">24h Volume</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
              {formatCurrency(coin.total_volume)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              High: {formatCurrency(coin.high_24h)}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Price Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <PriceChart coinId={coin.id} coinName={coin.name} />
      </motion.div>

      {/* Additional Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">All-Time High</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
              {formatCurrency(coin.ath)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(coin.ath_date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">All-Time Low</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
              {formatCurrency(coin.atl)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(coin.atl_date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Circulating Supply</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
              {formatSupply(coin.circulating_supply)} {coin.symbol.toUpperCase()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Max Supply</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
              {coin.max_supply ? `${formatSupply(coin.max_supply)} ${coin.symbol.toUpperCase()}` : "N/A"}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Description */}
      {coin.description?.en && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About {coin.name}
              </h3>
              <div
                className="text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: coin.description.en.slice(0, 500) + (coin.description.en.length > 500 ? "..." : "")
                }}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* External Links */}
      {coin.links && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Official Links
              </h3>
              <div className="flex flex-wrap gap-3">
                {coin.links.homepage?.[0] && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                )}
                
                {coin.links.repos_url?.github?.[0] && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={coin.links.repos_url.github[0]} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                )}
                
                {coin.links.twitter_screen_name && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://twitter.com/${coin.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </main>
  );
}
