import ProtectedRoute from "@/components/ProtectedRoute";
import Nav from "@/components/Nav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Nav />
      {children}
    </ProtectedRoute>
  );
}
