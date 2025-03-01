"use client";

import "./globals.css";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import SplashCursor from "@/components/SplashCursor";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="relative">
        <Background />
        <SplashCursor />
        {isLoading ? <Loader /> : children}
        <Footer />
      </body>
    </html>
  );
}
