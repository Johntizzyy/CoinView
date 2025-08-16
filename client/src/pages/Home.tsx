import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useMarketData } from "@/hooks/useCryptoData";
import { SearchBar } from "@/components/SearchBar";
import { MarketStats } from "@/components/MarketStats";
import { CoinTable } from "@/components/CoinTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("market_cap");
  const { toast } = useToast();
  
  const { data: coins, isLoading, error, refetch, isFetching } = useMarketData(currentPage, 25);

  const filteredCoins = useMemo(() => {
    if (!coins) return [];
    if (!searchQuery) return coins;
    
    return coins.filter(coin =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [coins, searchQuery]);

  const sortedCoins = useMemo(() => {
    if (!filteredCoins.length) return [];
    
    return [...filteredCoins].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.current_price - a.current_price;
        case '24h_change':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'volume':
          return b.total_volume - a.total_volume;
        case 'market_cap':
        default:
          return b.market_cap - a.market_cap;
      }
    });
  }, [filteredCoins, sortBy]);

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Data Refreshed",
        description: "Cryptocurrency data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <p className="text-lg font-medium">Failed to load cryptocurrency data</p>
            <p className="text-sm">Please check your internet connection and try again.</p>
          </div>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Market Stats */}
      <MarketStats />

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchBar onSearch={setSearchQuery} />
          
          <div className="flex items-center space-x-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market_cap">Market Cap</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="24h_change">24h Change</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              onClick={handleRefresh}
              disabled={isFetching}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Coin Table */}
      <CoinTable coins={sortedCoins} isLoading={isLoading} />

      {/* Pagination */}
      {!isLoading && !searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-8"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Showing</span>
            <span className="font-medium font-mono">{(currentPage - 1) * 25 + 1}</span>
            <span>to</span>
            <span className="font-medium font-mono">{Math.min(currentPage * 25, 1250)}</span>
            <span>of 1,250+ cryptocurrencies</span>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, 50) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                if (page > 50) return null;
                
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {currentPage < 48 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(50, currentPage + 1))}
                  className={currentPage === 50 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}
    </main>
  );
}
