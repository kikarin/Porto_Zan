"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import CursorFollower from "@/components/ui/CursorFollower";
import ClickSpark from "@/components/ui/ClickSpark";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Background />
      <AnimatePresence mode="wait">{isLoading && <Loader key="loader" />}</AnimatePresence>
      {!isLoading && children}
      <Footer />
      {!isAdmin && (
        <>
          <CursorFollower />
          <ClickSpark />
        </>
      )}
    </>
  );
}
