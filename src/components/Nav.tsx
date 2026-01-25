"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Settings, Film } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    setShowUserMenu(false);
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-semibold tracking-tight text-white hover:text-zinc-300 transition-colors shrink-0 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sparkRed to-red-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
            <Film className="w-4 h-4 text-white" />
          </div>
          <span className="text-sparkRed">SPARK</span>
          <span className="text-zinc-400 font-medium"> RED</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-zinc-800/80 animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-zinc-800/60 hover:bg-white/[0.06] transition-all duration-200 group"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sparkRed/20 flex items-center justify-center">
                  <User size={14} className="text-sparkRed" />
                </div>
                <span className="hidden sm:block text-sm text-zinc-300 truncate max-w-[120px] font-medium group-hover:text-white transition-colors">
                  {user.email?.split("@")[0]}
                </span>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-zinc-900/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/[0.06]">
                        <p className="text-sm font-medium text-white truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Premium Member
                        </p>
                      </div>
                      
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            // Add settings navigation if needed
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <Settings size={16} />
                          Settings
                        </button>
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : pathname === "/login" ? null : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-sparkRed hover:bg-red-600 text-white transition-all duration-200 shadow-glow-sm hover:shadow-glow transform hover:scale-[1.02]"
            >
              <User size={16} />
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
