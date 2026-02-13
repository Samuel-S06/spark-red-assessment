"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, X } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { Movie } from "@/app/(protected)/types";

export default function FavoritesList() {
  const { favorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-zinc-900/40 border border-white/[0.06] p-8 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
          <Star className="w-8 h-8 text-zinc-600" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
        <p className="text-zinc-500 mb-6">
          Start adding movies to your favorites to see them here.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-sparkRed hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
          >
            Discover Movies
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-zinc-900/40 border border-white/[0.06] p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">My Favorites</h2>
        <button
          onClick={clearFavorites}
          className="text-zinc-400 hover:text-white transition-colors text-sm"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favorites.map((movieId, index) => (
          <motion.div
            key={movieId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <FavoriteMovieCard movieId={movieId} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FavoriteMovieCard({ movieId }: { movieId: number }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${movieId}`);
        const data = await res.json();
        if (res.ok) {
          setMovie(data);
        }
      } catch {
        console.error("Failed to fetch movie:", movieId);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-zinc-900/50 border border-white/[0.06] aspect-[2/3] animate-pulse" />
    );
  }

  if (!movie) {
    return (
      <div className="rounded-2xl bg-zinc-900/50 border border-white/[0.06] aspect-[2/3] flex items-center justify-center">
        <span className="text-zinc-500">Movie not found</span>
      </div>
    );
  }

  return (
    <Link href={`/movie/${movieId}`} className="block">
      <div className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-white/[0.06] shadow-card hover:shadow-card-hover hover:border-white/[0.08] transition-all duration-300">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.img}
            alt={movie.title}
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
            <div className="flex items-center justify-between">
              <span className="text-sparkRed font-medium text-sm">{movie.year}</span>
              <span className="flex items-center gap-1 text-amber-400/90">
                <Star size={12} fill="currentColor" />
                {movie.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-white truncate mb-1">{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
}
