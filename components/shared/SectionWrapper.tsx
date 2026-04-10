"use client";

import { motion } from "framer-motion";
import { sectionEnter, viewportSection } from "@/lib/animations";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionWrapper({ children, className = "", id }: Props) {
  return (
    <motion.section
      id={id}
      className={`mx-auto max-w-content px-4 sm:px-6 lg:px-8 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSection}
      variants={sectionEnter}
    >
      {children}
    </motion.section>
  );
}
