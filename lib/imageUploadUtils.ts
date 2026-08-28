export function getImageFilesFromClipboard(
  event: React.ClipboardEvent | ClipboardEvent
): File[] {
  const items = event.clipboardData?.items;
  if (!items) return [];

  const files: File[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.kind === "file" && item.type.startsWith("image/")) {
      const file = item.getAsFile();
      if (file) files.push(file);
    }
  }

  return files;
}

export function getImageFilesFromInput(
  event: React.ChangeEvent<HTMLInputElement>
): File[] {
  if (!event.target.files) return [];
  return Array.from(event.target.files);
}

export function isEditablePasteTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  return Boolean(
    target.closest(
      'input:not([type="file"]), textarea, select, [contenteditable="true"], .ck-editor__editable'
    )
  );
}
