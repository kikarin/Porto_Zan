"use client";

import "./globals.css";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
// import SplashCursor from "@/components/SplashCursor";
import { useEffect, useState } from "react";
import ParallaxWrapper from "@/components/ParallaxWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="relative">
        <ParallaxWrapper>
          <Background />
          {/*         <SplashCursor /> */}
          {isLoading ? <Loader /> : children}
          <Footer />
        </ParallaxWrapper>
      </body>
    </html>
  );
}
