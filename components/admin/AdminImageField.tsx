"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImagePasteHint from "@/components/ImagePasteHint";

type AdminImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  previewClassName?: string;
  objectFit?: "contain" | "cover";
  onUploadingChange?: (uploading: boolean) => void;
};

export default function AdminImageField({
  label,
  value,
  onChange,
  disabled = false,
  previewClassName = "h-48",
  objectFit = "contain",
  onUploadingChange,
}: AdminImageFieldProps) {
  const upload = useImageUpload({
    onUploaded: (urls) => onChange(urls[0]),
    errorMessage: "Gagal upload gambar. Coba lagi.",
    disabled,
  });

  useEffect(() => {
    onUploadingChange?.(upload.uploading);
  }, [upload.uploading, onUploadingChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        {...upload.pasteZoneProps}
        className={`mt-1 border-2 border-dashed border-gray-300 rounded-md p-4 ${upload.pasteZoneProps.className}`}
      >
        <div className="flex flex-col items-center">
          {value ? (
            <div className={`relative w-full mb-4 ${previewClassName}`}>
              <Image
                src={value}
                alt={`Preview ${label}`}
                fill
                unoptimized
                className={objectFit === "cover" ? "object-cover rounded-md" : "object-contain"}
              />
            </div>
          ) : (
            <div className="w-full h-24 bg-gray-100 flex items-center justify-center mb-4 rounded-md">
              <span className="text-gray-400">Belum ada gambar</span>
            </div>
          )}

          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center transition-colors">
            {upload.uploading ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-orange-300 mr-2"></span>
                Uploading...
              </>
            ) : value ? (
              "Ganti gambar"
            ) : (
              "Upload gambar"
            )}
            <input
              type="file"
              accept="image/*"
              onChange={upload.handleFileInputChange}
              className="hidden"
              disabled={upload.uploading || disabled}
            />
          </label>
          <ImagePasteHint />
        </div>
      </div>
    </div>
  );
}
