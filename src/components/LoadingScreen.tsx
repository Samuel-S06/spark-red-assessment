"use client";

import { motion } from "framer-motion";
import { Sparkles, Film } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center z-50">
      <div className="relative">
        {/* Animated background particles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-sparkRed rounded-full"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 100],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main loading content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sparkRed to-red-600 flex items-center justify-center shadow-glow">
              <Film className="w-10 h-10 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-6 h-6 text-sparkRed" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold text-white mb-2"
          >
            <span className="text-sparkRed">SPARK</span>
            <span className="text-zinc-400 font-medium"> RED</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-zinc-500 text-sm mb-6"
          >
            Loading your movie experience...
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="h-1 bg-zinc-800 rounded-full overflow-hidden mx-auto"
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-transparent via-sparkRed to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
