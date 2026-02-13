"use client";

import { useCallback, useEffect, useState } from "react";
import { Movie } from "@/app/(protected)/types";

const FAVORITES_KEY = "spark-red-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addFavorite = useCallback((movieId: number): void => {
    setFavorites(prev => {
      const newFavorites = prev.includes(movieId) ? prev : [...prev, movieId];
      if (typeof window !== "undefined") {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((movieId: number): void => {
    setFavorites(prev => {
      const newFavorites = prev.filter(id => id !== movieId);
      if (typeof window !== "undefined") {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((movieId: number): boolean => {
    return favorites.includes(movieId);
  }, [favorites]);

  const clearFavorites = useCallback((): void => {
    setFavorites([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(FAVORITES_KEY);
    }
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  };
}
