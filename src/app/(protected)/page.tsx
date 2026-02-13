"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, Clock, Star, Filter, Grid, List, RefreshCw, AlertCircle } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import MovieSkeleton from "@/components/MovieSkeleton";
import { Movie } from "./types";
import { useMovieCache } from "@/hooks/useMovieCache";

const DEBOUNCE_MS = 350;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("Action");
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"relevance" | "rating" | "year">("relevance");
  const [retryCount, setRetryCount] = useState(0);
  const { get, set: setCache } = useMovieCache();

  const fetchMovies = useCallback(async (q: string) => {
    if (!q.trim()) return;
    
    // Check cache first
    const cached = get(q);
    if (cached) {
      setMovies(cached);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setRetryCount(0);
    
    try {
      const res = await fetch(`/api/movies?query=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to fetch movies");
      }
      
      let movieArray = Array.isArray(data) ? data : [];
      
      // Sort movies based on selected criteria
      if (sortBy === "rating") {
        movieArray.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === "year") {
        movieArray.sort((a, b) => b.year - a.year);
      }
      
      setMovies(movieArray);
      setCache(q, movieArray); // Cache the results
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [get, setCache, sortBy]);

  useEffect(() => {
    fetchMovies("Action");
  }, [fetchMovies]);

  useEffect(() => {
    if (query === "Action" || !query.trim()) return;
    const t = setTimeout(() => fetchMovies(query), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query, fetchMovies]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchMovies(query);
  };

  const popularSearches = ["Action", "Comedy", "Drama", "Sci-Fi", "Thriller", "Romance"];

  return (
    <div className="min-h-screen">
      <main className="pt-16 sm:pt-20 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Discover Amazing
              <span className="text-sparkRed"> Movies</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Search thousands of movies, explore trending films, and find your next favorite watch.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
                strokeWidth={2}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setQuery("")} // Clear cache indicator on focus
                placeholder="Search movies, actors, genres..."
                aria-label="Search movies"
                className="w-full bg-zinc-900/60 border border-white/[0.06] rounded-3xl py-4 sm:py-5 pl-14 pr-6 text-lg text-white placeholder-zinc-500 focus:border-sparkRed/50 focus:ring-2 focus:ring-sparkRed/20 outline-none transition-all duration-200 shadow-lg"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setCache(query, []); // Clear cache when manually cleared
                  }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  ×
                </button>
              )}
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <span className="text-zinc-500 text-sm">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 bg-zinc-800/60 hover:bg-zinc-700/60 border border-white/[0.06] rounded-full text-sm text-zinc-300 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/[0.06] rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" 
                      ? "bg-sparkRed text-white" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" 
                      ? "bg-sparkRed text-white" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Filter size={16} className="text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-zinc-900/60 border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-white focus:border-sparkRed/50 focus:ring-2 focus:ring-sparkRed/20 outline-none transition-all duration-200"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="rating">Highest Rated</option>
                  <option value="year">Newest First</option>
                </select>
              </div>
            </div>

            {movies.length > 0 && (
              <div className="text-zinc-500 text-sm">
                Found <span className="text-white font-medium">{movies.length}</span> movies
                {query && <span className="ml-2 text-xs text-sparkRed bg-sparkRed/10 px-2 py-1 rounded-full">★</span>}
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
            >
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <MovieSkeleton />
                </motion.div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="rounded-3xl bg-zinc-900/40 border border-white/[0.06] px-8 py-16 text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
              <p className="text-zinc-400 mb-4">{error}</p>
              <p className="text-zinc-500 text-sm mb-6">TMDB API might be temporarily unavailable</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-sparkRed hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-glow-sm"
                >
                  <RefreshCw size={16} className="mr-2" />
                  {retryCount > 0 ? `Retry (${retryCount})` : "Try Again"}
                </button>
                <button
                  onClick={() => {
                    setError(null);
                    setMovies([]);
                  }}
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          ) : movies.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="rounded-3xl bg-zinc-900/40 border border-white/[0.06] px-8 py-20 text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-2xl bg-zinc-800 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-zinc-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
              <p className="text-zinc-500 mb-6">Try searching for something different or check your spelling.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularSearches.slice(0, 4).map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-sparkRed/10 hover:bg-sparkRed/20 text-sparkRed border border-sparkRed/20 rounded-xl font-medium transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
                  : "space-y-4"
              }
            >
              {movies.map((movie, i) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.2), duration: 0.3 }}
                  className={viewMode === "list" ? "w-full" : ""}
                >
                  <MovieCard movie={movie} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
