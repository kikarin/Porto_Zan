"use client";

import { useCallback, useRef, type ClipboardEvent } from "react";
import {
  getImageFilesFromClipboard,
  isEditablePasteTarget,
} from "@/lib/imageUploadUtils";

export function useFormImagePaste() {
  const activeUploadRef = useRef<((files: File[]) => Promise<void>) | null>(null);

  const registerActiveUpload = useCallback(
    (uploadFiles: (files: File[]) => Promise<void>) => {
      activeUploadRef.current = uploadFiles;
    },
    []
  );

  const handleFormPaste = useCallback(async (event: ClipboardEvent<HTMLFormElement>) => {
    if (isEditablePasteTarget(event.target)) return;
    if (!activeUploadRef.current) return;

    const files = getImageFilesFromClipboard(event);
    if (files.length === 0) return;

    event.preventDefault();
    await activeUploadRef.current(files);
  }, []);

  return {
    registerActiveUpload,
    handleFormPaste,
  };
}
