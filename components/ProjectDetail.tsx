"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Container from "./Container";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ProjectDetail } from '../lib/projectDetailService';

export default function ProjectDetail({
  projectDetail,
}: {
  projectDetail: ProjectDetail
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [allIds, setAllIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  

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

  useEffect(() => {
    async function fetchOrderedProjectIds() {
      try {
        const q = query(
          collection(db, "projectDetails"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const ids = snap.docs
          .map((doc) => doc.data().projectId)
          .filter(
            (id): id is string => typeof id === "string" && id.length > 0
          );
        setAllIds(ids);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil urutan detail proyek");
      } finally {
        setLoading(false);
      }
    }
    fetchOrderedProjectIds();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error || !projectDetail)
    return (
      <div className="text-center text-red-600 py-20">
        {error || "Proyek tidak ditemukan."}
      </div>
    );
  const currentIndex = allIds.indexOf(projectDetail.projectId);
  const nextId =
    currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;

  const openModal = (img: string) => {
    setModalImg(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImg(null);
  };

  return (
    <div className="font-rubik min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8">
      <Container>
        {/* Image Gallery */}
        {Array.isArray(projectDetail.images) &&
        projectDetail.images.length > 0 ? (
          <div className="w-full flex justify-center mb-8 pb-4">
            <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide px-2">
              {projectDetail.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-300 cursor-pointer group transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    width: 300,
                    height: 200,
                    minWidth: 220,
                    background: "#f3f4f6",
                  }}
                  onClick={() => openModal(img)}
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
                  <Image
                    src={modalImg}
                    alt="Zoomed"
                    fill
                    priority
                    className="object-contain rounded-lg select-none"
                    draggable={false}
                  />
                </div>

                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition"
                >
                  <IoMdClose size={30} />
                </button>
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

          <p className="text-gray-700 text-base md:text-lg leading-relaxed break-words mb-8 whitespace-pre-wrap">
            {projectDetail.desc}
          </p>

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!prevId}
              onClick={() => prevId && router.push(`/projects/${prevId}`)}
              className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg font-semibold shadow transition-all ${
                prevId
                  ? "bg-gray-800 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              ← Previous
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!nextId}
              onClick={() => nextId && router.push(`/projects/${nextId}`)}
              className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg font-semibold shadow transition-all ${
                nextId
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next →
            </motion.button>
          </div>

          {/* Back to Home */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="mt-8 flex items-center justify-center gap-3 w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all"
          >
            <IoMdClose size={20} /> Kembali ke Halaman Utama
          </motion.button>
        </motion.div>
      </Container>
    </div>
  );
}
