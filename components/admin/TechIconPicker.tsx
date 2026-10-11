"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTechStack } from "@/lib/contentService";
import { TECH_CATEGORIES, type TechStackItem } from "@/lib/defaultContent";
import { isCloudinaryUpload } from "@/lib/cloudinaryUrl";

type TechIconPickerProps = {
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  label?: string;
};

export default function TechIconPicker({
  value,
  onChange,
  disabled = false,
  label = "Tech Icons",
}: TechIconPickerProps) {
  const [techStack, setTechStack] = useState<TechStackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    getTechStack()
      .then(setTechStack)
      .catch((error) => {
        console.error("Error fetching tech stack:", error);
        setLoadError("Gagal memuat daftar tech stack.");
      })
      .finally(() => setLoading(false));
  }, []);

  const byImg = useMemo(() => new Map(techStack.map((tech) => [tech.img, tech])), [techStack]);
  const selected = useMemo(() => new Set(value), [value]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return techStack.filter(
      (tech) =>
        (category === "All" || tech.category === category) &&
        (!q || tech.name.toLowerCase().includes(q))
    );
  }, [techStack, category, query]);

  const toggle = (img: string) => {
    onChange(selected.has(img) ? value.filter((v) => v !== img) : [...value, img]);
  };

  const hasManualUploads = value.some((icon) => !byImg.has(icon) && isCloudinaryUpload(icon));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      <div className="rounded-md border border-gray-300 p-4 space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Dipilih ({value.length})</p>
          {value.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada ikon. Pilih dari daftar di bawah.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {value.map((icon) => {
                const tech = byImg.get(icon);
                return (
                  <li
                    key={icon}
                    className={`flex items-center gap-2 rounded-md border py-1 pl-1 pr-2 text-sm ${
                      tech ? "border-gray-200 bg-gray-50" : "border-amber-300 bg-amber-50"
                    }`}
                  >
                    <span className="relative h-7 w-7 shrink-0">
                      <Image src={icon} alt="" fill unoptimized className="object-contain" />
                    </span>
                    <span className={tech ? "text-gray-800" : "text-amber-800"}>
                      {tech ? tech.name : "Upload manual"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggle(icon)}
                      disabled={disabled}
                      aria-label={`Lepas ${tech ? tech.name : "ikon upload manual"}`}
                      className="ml-1 text-gray-400 hover:text-red-600 disabled:opacity-40"
                    >
                      ×
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {hasManualUploads && (
            <p className="mt-2 text-xs text-amber-700">
              Ikon kuning adalah upload lama. Kalau dilepas lalu disimpan, filenya otomatis dihapus dari
              Cloudinary (selama tidak dipakai di tempat lain).
            </p>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari teknologi..."
              aria-label="Cari teknologi"
              className="w-full sm:w-48 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-orange-300 focus:ring-orange-300"
            />
            {["All", ...TECH_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  category === cat ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-gray-400 py-4 text-center">Memuat tech stack...</p>
          ) : loadError ? (
            <p role="alert" className="text-sm text-red-600">{loadError}</p>
          ) : visible.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              Tidak ada yang cocok.{" "}
              <Link href="/admin/tech-stack" className="text-orange-600 underline">
                Tambah di Tech Stack
              </Link>
            </p>
          ) : (
            <ul className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-1">
              {visible.map((tech) => {
                const isSelected = selected.has(tech.img);
                return (
                  <li key={tech.id ?? tech.name}>
                    <button
                      type="button"
                      onClick={() => toggle(tech.img)}
                      disabled={disabled}
                      aria-pressed={isSelected}
                      className={`relative flex w-full flex-col items-center gap-1 rounded-md border p-2 text-xs transition-colors disabled:opacity-50 ${
                        isSelected
                          ? "border-orange-400 bg-orange-50 text-gray-900"
                          : "border-gray-200 bg-white text-gray-600 hover:border-orange-200"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-orange-400 text-[10px] text-white">
                          ✓
                        </span>
                      )}
                      <span className="relative h-8 w-8">
                        <Image src={tech.img} alt="" fill unoptimized className="object-contain" />
                      </span>
                      <span className="truncate max-w-full">{tech.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
