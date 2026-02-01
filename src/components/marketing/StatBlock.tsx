"use client";

import { motion } from "framer-motion";

interface Props {
  value: string;
  label: string;
  light?: boolean;
}

export default function StatBlock({ value, label, light = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center"
    >
      <div className="text-5xl sm:text-6xl font-bold text-primary mb-2">
        {value}
      </div>
      <div
        className={`text-sm uppercase tracking-wider font-medium ${
          light ? "text-gray-400" : "text-text-muted"
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}
