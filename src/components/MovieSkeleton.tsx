"use client";

import { motion } from "framer-motion";

export default function MovieSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-white/[0.06]"
    >
      <div className="relative aspect-[2/3]">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-zinc-800"
        />
      </div>
      <div className="p-3 sm:p-4">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className="h-4 bg-zinc-800 rounded-lg mb-2"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          className="h-3 bg-zinc-800 rounded w-3/4 mb-1.5"
        />
      </div>
    </motion.div>
  );
}
