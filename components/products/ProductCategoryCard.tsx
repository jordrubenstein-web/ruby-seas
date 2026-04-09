"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

type Props = {
  title: string;
  description: string;
  badge: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

export function ProductCategoryCard({
  title,
  description,
  badge,
  image,
  imageAlt,
  reverse,
}: Props) {
  return (
    <motion.article
      className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
        reverse ? "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1" : ""
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute left-4 top-4 rounded-full bg-navy-900/85 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent">
          {badge}
        </div>
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          {description}
        </p>
        <Link
          href="/get-a-quote"
          className="mt-8 inline-flex rounded-full bg-seafoam-500 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-seafoam-600"
        >
          Request Pricing
        </Link>
      </div>
    </motion.article>
  );
}
