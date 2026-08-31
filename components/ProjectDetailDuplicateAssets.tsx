"use client";

import Image from "next/image";
import type { Project } from "@/lib/projectService";

export function mergeUniqueUrls(existing: string[], incoming: string[]): string[] {
  const seen = new Set(existing);
  const merged = [...existing];

  for (const url of incoming) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    merged.push(url);
  }

  return merged;
}

type ProjectDetailDuplicateAssetsProps = {
  project: Project | null;
  onDuplicateImages: (urls: string[]) => void;
  onDuplicateTechIcons: (urls: string[]) => void;
  disabled?: boolean;
};

export default function ProjectDetailDuplicateAssets({
  project,
  onDuplicateImages,
  onDuplicateTechIcons,
  disabled = false,
}: ProjectDetailDuplicateAssetsProps) {
  if (!project) return null;

  const hasMainImage = Boolean(project.img);
  const hasTechIcons = project.techIcons.length > 0;

  if (!hasMainImage && !hasTechIcons) return null;

  const handleDuplicateAll = () => {
    if (project.img) {
      onDuplicateImages([project.img]);
    }
    if (project.techIcons.length > 0) {
      onDuplicateTechIcons(project.techIcons);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-800">Assets dari Project</p>
          <p className="text-xs text-gray-500 mt-1">
            Salin gambar utama dan tech icons project ke detail tanpa upload ulang.
          </p>
        </div>
        {(hasMainImage || hasTechIcons) && (
          <button
            type="button"
            onClick={handleDuplicateAll}
            disabled={disabled}
            className="px-3 py-2 text-sm rounded-md bg-orange-300 text-gray-900 hover:bg-orange-200 transition-colors disabled:opacity-50"
          >
            Duplicate Semua
          </button>
        )}
      </div>

      {hasMainImage && (
        <div className="flex flex-wrap items-center gap-3">
          <Image
            src={project.img}
            alt="Project main image"
            width={80}
            height={80}
            className="object-contain rounded border border-gray-200 bg-white"
            unoptimized
          />
          <button
            type="button"
            onClick={() => onDuplicateImages([project.img])}
            disabled={disabled}
            className="px-3 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Duplicate ke Detail Images
          </button>
        </div>
      )}

      {hasTechIcons && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {project.techIcons.map((icon, idx) => (
              <Image
                key={`${icon}-${idx}`}
                src={icon}
                alt={`Project tech icon ${idx + 1}`}
                width={40}
                height={40}
                className="object-contain rounded border border-gray-200 bg-white p-1"
                unoptimized
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => onDuplicateTechIcons(project.techIcons)}
            disabled={disabled}
            className="px-3 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Duplicate ke Detail Tech Icons
          </button>
        </div>
      )}
    </div>
  );
}
