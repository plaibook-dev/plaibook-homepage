"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  type?: "subtle" | "default" | "dramatic";
}

const typeConfig = {
  subtle: { translate: 0, duration: 0.3 },
  default: { translate: 20, duration: 0.4 },
  dramatic: { translate: 40, duration: 0.6 },
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  type = "default",
}: Props) {
  const { translate, duration } = typeConfig[type];

  const directions = {
    up: { y: translate, x: 0 },
    down: { y: -translate, x: 0 },
    left: { y: 0, x: translate },
    right: { y: 0, x: -translate },
    none: { y: 0, x: 0 },
  };

  const { x, y } = directions[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
