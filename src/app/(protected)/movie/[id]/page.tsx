"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Clock, Film } from "lucide-react";

interface MovieDetail {
  id: number;
  title: string;
  desc: string;
  img: string;
  backdrop: string | null;
  rating: number;
  year: string;
  runtime?: number;
  genres: string[];
  cast: string[];
}

export default function MovieDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/movies/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setMovie(data);
      })
      .catch(() => {
        if (!cancelled) setError("Movie not found");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
          className="w-9 h-9 border-2 border-zinc-700 border-t-sparkRed rounded-full"
        />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 pt-16">
        <p className="text-zinc-400 font-medium">{error ?? "Movie not found"}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-sparkRed hover:text-red-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <main className="pt-20 sm:pt-24 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to movies
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col sm:flex-row gap-8 sm:gap-10"
        >
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="relative w-[200px] sm:w-[240px] aspect-[2/3] rounded-2xl overflow-hidden shadow-card ring-1 ring-white/[0.06]">
              <Image
                src={movie.img}
                alt={movie.title}
                fill
                sizes="(max-width: 640px) 200px, 240px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 mb-5">
              <span className="flex items-center gap-1.5 text-amber-400/90 font-medium">
                <Star size={15} fill="currentColor" /> {movie.rating.toFixed(1)}
              </span>
              <span>{movie.year}</span>
              {movie.runtime != null && (
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {movie.runtime} min
                </span>
              )}
              {movie.genres?.length > 0 && (
                <span className="flex items-center gap-1">
                  <Film size={14} /> {movie.genres.join(", ")}
                </span>
              )}
            </div>
            {movie.desc && (
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-6">
                {movie.desc}
              </p>
            )}
            {movie.cast?.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Cast
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {movie.cast.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
