/** 12431 -> "12.4K". null -> "Soon". */
export function compact(n: number | null): string {
  if (n == null) return "Soon";
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}K`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}
