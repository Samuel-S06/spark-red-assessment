"use client";

import FavoritesList from "@/components/FavoritesList";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-16 sm:pt-20 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Movies
            </Link>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Heart className="text-sparkRed" size={32} />
              My Favorites
            </h1>
          </div>
        </motion.div>

        <FavoritesList />
      </main>
    </div>
  );
}
