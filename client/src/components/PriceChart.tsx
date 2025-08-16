import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartPeriod } from "@/types/crypto";
import { usePriceHistory } from "@/hooks/useCryptoData";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface PriceChartProps {
  coinId: string;
  coinName: string;
}

export function PriceChart({ coinId, coinName }: PriceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>('7d');
  const { data: priceHistory, isLoading, error } = usePriceHistory(coinId, selectedPeriod);

  const periods: { label: string; value: ChartPeriod }[] = [
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '1Y', value: '1y' },
  ];

  const chartData = priceHistory?.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
    date: new Date(timestamp).toLocaleDateString(),
    time: new Date(timestamp).toLocaleTimeString(),
  })) || [];

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500 dark:text-red-400">
            Failed to load price chart. Please try again later.
          </div>
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {coinName} Price Chart
            </h3>
            <div className="flex items-center space-x-2">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.value)}
                  className="h-8 px-3 text-xs"
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="currentColor"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="currentColor"
                    className="text-gray-400 dark:text-gray-500"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="currentColor"
                    className="text-gray-400 dark:text-gray-500"
                    fontSize={12}
                    tickFormatter={(value) => formatCurrency(value, 0)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Price']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
