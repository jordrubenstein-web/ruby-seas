"use client";

import { STATS } from "@/lib/constants";
import { StatCard } from "@/components/shared/StatCard";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value, 2200);
  const display =
    value >= 1000
      ? `${count.toLocaleString()}${suffix}`
      : `${count}${suffix}`;
  return (
    <div ref={ref}>
      <StatCard display={display} label={label} />
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
