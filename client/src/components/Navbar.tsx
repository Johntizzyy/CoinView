import { Link, useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/">
            <div className="flex items-center space-x-4 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white text-sm" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">CryptoPulse</h1>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className={`font-medium transition-colors cursor-pointer ${
                isActive("/") 
                  ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 pb-1"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}>
                Markets
              </span>
            </Link>
            <Link href="/watchlist">
              <span className={`font-medium transition-colors cursor-pointer ${
                isActive("/watchlist")
                  ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 pb-1"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}>
                Watchlist
              </span>
            </Link>
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-400" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/">
                <span className={`font-medium transition-colors cursor-pointer ${
                  isActive("/") 
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-600 dark:text-gray-300"
                }`} onClick={() => setMobileMenuOpen(false)}>
                  Markets
                </span>
              </Link>
              <Link href="/watchlist">
                <span className={`font-medium transition-colors cursor-pointer ${
                  isActive("/watchlist")
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-600 dark:text-gray-300"
                }`} onClick={() => setMobileMenuOpen(false)}>
                  Watchlist
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
