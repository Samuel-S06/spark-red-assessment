"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "./LoadingScreen";
import { motion } from "framer-motion";
import { Lock, Film } from "lucide-react";
import Link from "next/link";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for at least 2 seconds for fancy animation
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !user && !showLoading) {
      router.push("/login");
    }
  }, [user, loading, router, showLoading]);

  if (loading || showLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-zinc-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Authentication Required</h2>
          <p className="text-zinc-500 mb-6">
            Please sign in to access the SPARK RED movie collection.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sparkRed hover:bg-red-600 text-white font-medium rounded-xl transition-colors duration-200 shadow-glow-sm"
          >
            <Film size={18} />
            Sign In to Continue
          </Link>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
