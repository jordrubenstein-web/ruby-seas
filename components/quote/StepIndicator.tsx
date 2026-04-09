"use client";

type Props = {
  current: number;
  total: number;
  labels: readonly string[];
};

export function StepIndicator({ current, total, labels }: Props) {
  return (
    <nav aria-label="Progress" className="mb-10">
      <ol className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {labels.map((label, i) => {
          const stepNum = i + 1;
          const done = stepNum < current;
          const active = stepNum === current;
          return (
            <li key={label} className="flex items-center gap-3 sm:flex-1">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  done
                    ? "bg-seafoam-500 text-white"
                    : active
                      ? "bg-navy-900 text-white ring-2 ring-seafoam-500 ring-offset-2"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? "✓" : stepNum}
              </span>
              <span
                className={`text-sm font-medium ${
                  active ? "text-navy-900" : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-seafoam-500 transition-all duration-500"
          style={{
            width: `${((current - 1) / Math.max(1, total - 1)) * 100}%`,
          }}
        />
      </div>
    </nav>
  );
}
