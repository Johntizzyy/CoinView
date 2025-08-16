export function formatCurrency(value: number | undefined | null, decimals = 2): string {
  if (value == null || isNaN(value)) {
    return '$0.00';
  }
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(1)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  }
  return `$${value.toFixed(decimals)}`;
}

export function formatNumber(value: number | undefined | null): string {
  if (value == null || isNaN(value)) {
    return '0';
  }
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number | undefined | null): string {
  if (value == null || isNaN(value)) {
    return '0.00%';
  }
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatSupply(value: number | undefined | null): string {
  if (value == null || isNaN(value)) {
    return '0';
  }
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(1)}T`;
  }
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return formatNumber(value);
}
