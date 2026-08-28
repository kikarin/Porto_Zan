"use client";

import { useCallback, useState, type ChangeEvent, type ClipboardEvent } from "react";
import { uploadImageToCloudinary } from "@/lib/uploadImage";
import {
  getImageFilesFromClipboard,
  getImageFilesFromInput,
} from "@/lib/imageUploadUtils";

type UseImageUploadOptions = {
  onUploaded: (urls: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  registerActiveUpload?: (uploadFiles: (files: File[]) => Promise<void>) => void;
};

export function useImageUpload({
  onUploaded,
  multiple = false,
  disabled = false,
  errorMessage = "Failed to upload image.",
  registerActiveUpload,
}: UseImageUploadOptions) {
  const [uploading, setUploading] = useState(false);

  const uploadFiles = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      if (imageFiles.length === 0) return;

      const selectedFiles = multiple ? imageFiles : [imageFiles[0]];
      setUploading(true);

      try {
        const urls = await Promise.all(
          selectedFiles.map((file) => uploadImageToCloudinary(file))
        );
        onUploaded(urls);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert(errorMessage);
      } finally {
        setUploading(false);
      }
    },
    [multiple, onUploaded, errorMessage]
  );

  const handleFileInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = getImageFilesFromInput(event);
      event.target.value = "";
      await uploadFiles(files);
    },
    [uploadFiles]
  );

  const activate = useCallback(() => {
    registerActiveUpload?.(uploadFiles);
  }, [registerActiveUpload, uploadFiles]);

  const pasteZoneProps = {
    tabIndex: disabled || uploading ? -1 : 0,
    onMouseDown: activate,
    onFocus: activate,
    onPaste: async (event: ClipboardEvent<HTMLElement>) => {
      const files = getImageFilesFromClipboard(event);
      if (files.length === 0) return;
      event.preventDefault();
      await uploadFiles(files);
    },
    className: "outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 rounded-md",
  } as const;

  return {
    uploading,
    uploadFiles,
    handleFileInputChange,
    pasteZoneProps,
  };
}
