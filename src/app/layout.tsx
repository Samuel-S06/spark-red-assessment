import "./global.css";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
      </head>
      <body 
        suppressHydrationWarning
        className="min-h-screen bg-[var(--bg-base)] text-zinc-100 font-sans antialiased"
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
