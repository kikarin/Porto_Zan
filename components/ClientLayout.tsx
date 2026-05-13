"use client";

import { useEffect, useState } from "react";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ParallaxWrapper from "@/components/ParallaxWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParallaxWrapper>
      <Background />
      {isLoading ? <Loader /> : children}
      <Footer />
    </ParallaxWrapper>
  );
}
