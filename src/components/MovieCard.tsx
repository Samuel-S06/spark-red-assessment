"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ChevronRight, Calendar, Clock } from "lucide-react";
import { Movie } from "../app/(protected)/types";

export default function MovieCard({ 
  movie, 
  viewMode = "grid" 
}: { 
  movie: Movie; 
  viewMode?: "grid" | "list";
}) {
  if (viewMode === "list") {
    return (
      <motion.article
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group"
      >
        <Link href={`/movie/${movie.id}`} className="block">
          <div className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-white/[0.06] shadow-card hover:shadow-card-hover hover:border-white/[0.08] transition-all duration-300 p-4">
            <div className="flex gap-4">
              <div className="relative w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="object-cover w-full h-full group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-semibold text-lg text-white truncate group-hover:text-sparkRed transition-colors duration-200 mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                    {movie.desc}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {movie.year}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400/90">
                      <Star size={14} fill="currentColor" />
                      {movie.rating.toFixed(1)}
                    </span>
                  </div>
                  
                  <span className="inline-flex items-center gap-1.5 text-sparkRed font-medium text-sm py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
                    Details <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group"
    >
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="rounded-2xl overflow-hidden bg-zinc-900/50 border border-white/[0.06] shadow-card hover:shadow-card-hover hover:border-white/[0.08] transition-all duration-300">
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={movie.img}
              alt={movie.title}
              className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
              <p className="text-xs text-zinc-300 mb-2 sm:mb-3 line-clamp-3 leading-relaxed">
                {movie.desc}
              </p>
              <span className="inline-flex items-center justify-center gap-1.5 text-sparkRed font-medium text-sm py-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors w-full">
                Details <ChevronRight size={14} />
              </span>
            </div>
            {/* Mobile: always-visible tappable CTA */}
            <div className="sm:hidden absolute bottom-2 left-2 right-2">
              <span className="inline-flex items-center justify-center gap-1.5 text-sparkRed font-medium text-xs py-2.5 rounded-xl bg-black/60 backdrop-blur-sm w-full border border-white/10">
                Details <ChevronRight size={12} />
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-medium text-sm sm:text-base text-white truncate group-hover:text-sparkRed transition-colors duration-200">
              {movie.title}
            </h3>
            <div className="flex justify-between items-center mt-1.5 text-xs text-zinc-500 font-medium">
              <span>{movie.year}</span>
              <span className="flex items-center gap-1 text-amber-400/90">
                <Star size={12} fill="currentColor" /> {movie.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
