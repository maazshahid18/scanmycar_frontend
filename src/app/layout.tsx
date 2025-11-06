import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ScanMyCar",
  description: "Notify vehicle owners instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
<Toaster
  position="bottom-center"
  toastOptions={{
    duration: 2500,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  }}
/>

<main className="pt-8 px-4 max-w-md mx-auto">
  {children}
</main>      </body>
    </html>
  );
}