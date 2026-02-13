"use client";

import { useCallback, useRef } from "react";
import { Movie } from "@/app/(protected)/types";

interface CacheEntry {
  movies: Movie[];
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useMovieCache() {
  const cache = useRef<Map<string, CacheEntry>>(new Map());

  const get = useCallback((query: string): Movie[] | null => {
    const entry = cache.current.get(query);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      cache.current.delete(query);
      return null;
    }
    
    return entry.movies;
  }, []);

  const set = useCallback((query: string, movies: Movie[]): void => {
    cache.current.set(query, {
      movies,
      timestamp: Date.now(),
    });
  }, []);

  const clear = useCallback((): void => {
    cache.current.clear();
  }, []);

  return { get, set, clear };
}
