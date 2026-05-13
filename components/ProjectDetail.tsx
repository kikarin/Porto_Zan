"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoChevronBack,
  IoChevronForward,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Container from "./Container";
import type { ProjectDetail } from "../lib/projectDetailService";

export default function ProjectDetail({
  projectDetail,
  allProjectIds,
}: {
  projectDetail: ProjectDetail | null;
  allProjectIds: string[];
}) {
  const images: string[] = Array.isArray(projectDetail?.images)
    ? projectDetail!.images
    : [];

  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const isModalOpen = modalIndex !== null;
  const modalImg =
    modalIndex !== null && modalIndex >= 0 && modalIndex < images.length
      ? images[modalIndex]
      : null;

  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setLastPosition({ x: 0, y: 0 });
  }, []);
  

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    let newScale = scale - e.deltaY * 0.001;
    newScale = Math.min(Math.max(newScale, 1), 3); // zoom min 1x max 3x
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setLastPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - lastPosition.x,
      y: e.clientY - lastPosition.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setLastPosition({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - lastPosition.x,
      y: touch.clientY - lastPosition.y,
    });
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  const handleTouchCancel = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openModal = useCallback(
    (idx: number) => {
      resetTransform();
      setModalIndex(idx);
    },
    [resetTransform]
  );

  const closeModal = useCallback(() => {
    setModalIndex(null);
    resetTransform();
  }, [resetTransform]);

  const showPrev = useCallback(() => {
    setModalIndex((prev) => {
      if (prev === null || prev <= 0) return prev;
      resetTransform();
      return prev - 1;
    });
  }, [resetTransform]);

  const showNext = useCallback(() => {
    setModalIndex((prev) => {
      if (prev === null || prev >= images.length - 1) return prev;
      resetTransform();
      return prev + 1;
    });
  }, [images.length, resetTransform]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, showPrev, showNext, closeModal]);

  if (!projectDetail)
    return (
      <div className="text-center text-red-600 py-20">
        Proyek tidak ditemukan.
      </div>
    );

  const currentIndex = allProjectIds.indexOf(projectDetail.projectId);
  const nextId =
    currentIndex >= 0 && currentIndex < allProjectIds.length - 1
      ? allProjectIds[currentIndex + 1]
      : null;
  const prevId = currentIndex > 0 ? allProjectIds[currentIndex - 1] : null;

  const hasPrev = modalIndex !== null && modalIndex > 0;
  const hasNext = modalIndex !== null && modalIndex < images.length - 1;
  const descriptionHasHtml = /<\/?[a-z][\s\S]*>/i.test(projectDetail.desc);

  return (
    <div className="font-rubik min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8">
      <Container>
        {/* Image Gallery */}
        {images.length > 0 ? (
          <div className="w-full flex justify-center mb-8 pb-4">
            <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide px-2">
              {images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-300 cursor-pointer group transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    width: 300,
                    height: 200,
                    minWidth: 220,
                    background: "#f3f4f6",
                  }}
                  onClick={() => openModal(idx)}
                >
                  <Image
                    src={img}
                    alt={projectDetail.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 80vw, 320px"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 mb-8">
            No images available.
          </div>
        )}

        {/* Zoom Modal */}
        <AnimatePresence>
          {isModalOpen && modalImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full h-full max-w-7xl mx-auto overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  style={{
                    transform: `scale(${scale}) translate(${
                      position.x / scale
                    }px, ${position.y / scale}px)`,
                    transformOrigin: "center center",
                    transition: isDragging ? "none" : "transform 0.3s ease",
                  }}
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchCancel}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={modalIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={modalImg}
                        alt={`${projectDetail.title} - ${
                          (modalIndex ?? 0) + 1
                        }`}
                        fill
                        priority
                        className="object-contain rounded-lg select-none"
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Tutup"
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition z-10"
                >
                  <IoMdClose size={30} />
                </button>

                {/* Prev Button */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev();
                    }}
                    disabled={!hasPrev}
                    aria-label="Gambar sebelumnya"
                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-gray-800 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed z-10"
                  >
                    <IoChevronBack size={28} />
                  </button>
                )}

                {/* Next Button */}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showNext();
                    }}
                    disabled={!hasNext}
                    aria-label="Gambar berikutnya"
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-gray-800 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed z-10"
                  >
                    <IoChevronForward size={28} />
                  </button>
                )}

                {/* Counter */}
                {images.length > 1 && modalIndex !== null && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/80 text-gray-800 text-sm font-medium z-10">
                    {modalIndex + 1} / {images.length}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-2xl p-6 md:p-10 max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <FaRegCalendarAlt />{" "}
              <span>
                {new Date(projectDetail.date).toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
            {projectDetail.title}
          </h1>

          {descriptionHasHtml ? (
            <div
              className="project-description mb-8"
              dangerouslySetInnerHTML={{ __html: projectDetail.desc }}
            />
          ) : (
            <p className="project-description mb-8 whitespace-pre-wrap">
              {projectDetail.desc}
            </p>
          )}

          {/* Tech Used */}
          {Array.isArray(projectDetail.techIcons) && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <IoSettingsOutline /> Technology Used
              </h3>
              <div className="flex flex-wrap gap-6">
                {projectDetail.techIcons.map((icon: string, idx: number) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    className="p-4 rounded-xl shadow-md bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
                  >
                    <Image
                      src={icon}
                      alt={`Tech Icon ${idx}`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 border-t pt-6">
            {prevId ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto"
              >
                <Link
                  href={`/projects/${prevId}`}
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg font-semibold shadow transition-all bg-gray-800 text-white hover:bg-blue-700"
                >
                  ← Previous
                </Link>
              </motion.div>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg font-semibold shadow transition-all bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                ← Previous
              </button>
            )}

            {nextId ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto"
              >
                <Link
                  href={`/projects/${nextId}`}
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg font-semibold shadow transition-all bg-blue-600 text-white hover:bg-blue-700"
                >
                  Next →
                </Link>
              </motion.div>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg font-semibold shadow transition-all bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Next →
              </button>
            )}
          </div>

          {/* Back to Home */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all"
            >
              <IoMdClose size={20} /> Kembali ke Halaman Utama
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
