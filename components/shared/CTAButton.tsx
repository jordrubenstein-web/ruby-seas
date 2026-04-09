import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<
  Variant,
  string
> = {
  primary:
    "bg-seafoam-500 text-white hover:bg-seafoam-600 shadow-lg shadow-seafoam-500/25",
  secondary:
    "bg-navy-800 text-white hover:bg-navy-700 border border-navy-700",
  ghost:
    "bg-transparent text-white border-2 border-white/80 hover:bg-white/10",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam-500 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
