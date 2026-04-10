"use client";

import { STATS } from "@/lib/constants";
import { StatCard } from "@/components/shared/StatCard";
import { useCountUp } from "@/hooks/useCountUp";

export function AnimatedStat({
  value,
  suffix,
  label,
  variant = "light",
  /** Index in the grid — delays count-up so stats animate in sequence while scrolling. */
  staggerIndex = 0,
  /** Drive start from parent (e.g. Framer `useInView`) when IO is unreliable. */
  startWhen,
}: {
  value: number;
  suffix: string;
  label: string;
  variant?: "light" | "dark";
  staggerIndex?: number;
  startWhen?: boolean;
}) {
  const { count, ref, settled } = useCountUp(value, 2100, {
    staggerMs: staggerIndex * 140,
    startWhen,
  });
  const display =
    value >= 1000
      ? `${count.toLocaleString()}${suffix}`
      : `${count}${suffix}`;
  return (
    <div ref={ref} className="h-full">
      <StatCard
        display={display}
        label={label}
        variant={variant}
        valueSettled={settled}
      />
    </div>
  );
}

export function StatsRibbon() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {STATS.map((s) => (
        <AnimatedStat
          key={s.label}
          value={s.value}
          suffix={s.suffix}
          label={s.label}
        />
      ))}
    </div>
  );
}
