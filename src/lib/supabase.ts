import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function hasSupabase(): boolean {
  return supabase != null;
}

export class MovieService {
  static async getWatchlist(userId: string) {
    if (!supabase) return { data: null, error: new Error("Supabase not configured") };
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", userId);
    return { data, error };
  }
}
