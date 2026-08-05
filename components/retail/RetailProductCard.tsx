"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

export function RetailProductCard({
  id,
  title,
  subtitle,
  image,
  imageAlt,
  reverse,
}: Props) {
  return (
    <motion.article
      id={id}
      className={`scroll-mt-28 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
        reverse ? "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1" : ""
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-b from-pearl to-white shadow-xl sm:aspect-[4/3]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-contain p-6"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-base italic text-slate-600">{subtitle}</p>
        ) : null}
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Shelf-ready Ruby Seas packaging for retail — consistent spec, labeling,
          and supply for premium frozen seafood programs.
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
