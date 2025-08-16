import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const WATCHLIST_KEY = "crypto-watchlist";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WATCHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const { toast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("Failed to save watchlist to localStorage:", error);
    }
  }, [watchlist]);

  const addToWatchlist = (coinId: string, coinName?: string) => {
    setWatchlist(prev => {
      if (prev.includes(coinId)) return prev;
      toast({
        title: "Added to Watchlist",
        description: `${coinName || coinId} has been added to your watchlist.`,
      });
      return [...prev, coinId];
    });
  };

  const removeFromWatchlist = (coinId: string, coinName?: string) => {
    setWatchlist(prev => {
      const newWatchlist = prev.filter(id => id !== coinId);
      toast({
        title: "Removed from Watchlist",
        description: `${coinName || coinId} has been removed from your watchlist.`,
      });
      return newWatchlist;
    });
  };

  const toggleWatchlist = (coinId: string, coinName?: string) => {
    if (watchlist.includes(coinId)) {
      removeFromWatchlist(coinId, coinName);
    } else {
      addToWatchlist(coinId, coinName);
    }
  };

  const isInWatchlist = (coinId: string) => watchlist.includes(coinId);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
  };
}
