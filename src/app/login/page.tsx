"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, Loader2, Sparkles, Film, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) router.replace("/");
  }, [authLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const fn = mode === "signin" ? signIn : signUp;
      const { error: err } = await fn(email, password);
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      if (mode === "signup") {
        setSuccess("Check your email to confirm your account.");
        setLoading(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sparkRed to-red-600 flex items-center justify-center shadow-glow">
            <Film className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-5 h-5 text-sparkRed" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sparkRed/20 rounded-full"
            animate={{
              x: [Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[420px]"
        >
          {/* Logo and branding */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sparkRed to-red-600 flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Film className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="text-sparkRed">SPARK</span>
              <span className="text-zinc-400 font-medium"> RED</span>
            </h1>
            <p className="text-zinc-500">
              {mode === "signin" ? "Welcome back to your movie collection" : "Start your movie journey today"}
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-white/[0.06] p-8 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "signin" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "signin" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {mode === "signin" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-zinc-500 text-sm mb-8">
                  {mode === "signin"
                    ? "Sign in to access your personalized movie experience."
                    : "Join thousands of movie enthusiasts."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-400 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-zinc-800/60 border border-white/[0.06] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:border-sparkRed/50 focus:ring-2 focus:ring-sparkRed/20 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-zinc-400 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full bg-zinc-800/60 border border-white/[0.06] rounded-2xl py-4 pl-12 pr-12 text-white placeholder-zinc-500 focus:border-sparkRed/50 focus:ring-2 focus:ring-sparkRed/20 outline-none transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
                      >
                        <p className="text-sm text-red-400 font-medium">{error}</p>
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                      >
                        <p className="text-sm text-emerald-400 font-medium">{success}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-sparkRed to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-glow disabled:shadow-none transform hover:scale-[1.02] disabled:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {mode === "signin" ? "Signing In..." : "Creating Account..."}
                      </>
                    ) : mode === "signin" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 text-center">
              <p className="text-zinc-500 text-sm">
                {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setError(null);
                  setSuccess(null);
                }}
                className="mt-2 text-sparkRed hover:text-red-500 font-medium transition-colors text-sm"
              >
                {mode === "signin" ? "Sign up for free" : "Sign in to your account"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
