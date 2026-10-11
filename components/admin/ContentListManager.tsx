"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";

type BaseItem = { id?: string; sortOrder?: number };

type FieldRenderProps<T> = {
  draft: Omit<T, "id">;
  setDraft: (updater: (prev: Omit<T, "id">) => Omit<T, "id">) => void;
  disabled: boolean;
  setUploading: (uploading: boolean) => void;
};

type ContentListManagerProps<T extends BaseItem> = {
  title: string;
  description: string;
  itemLabel: string;
  emptyItem: Omit<T, "id">;
  load: () => Promise<T[]>;
  create: (item: Omit<T, "id">) => Promise<string>;
  update: (id: string, item: Partial<T>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  reorder: (items: T[]) => Promise<void>;
  validate: (draft: Omit<T, "id">) => string | null;
  renderFields: (props: FieldRenderProps<T>) => ReactNode;
  getRow: (item: T) => { image: string; title: string; subtitle: string };
};

export default function ContentListManager<T extends BaseItem>({
  title,
  description,
  itemLabel,
  emptyItem,
  load,
  create,
  update,
  remove,
  reorder,
  validate,
  renderFields,
  getRow,
}: ContentListManagerProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Omit<T, "id">>(emptyItem);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    try {
      setItems(await load());
      setLoadError("");
    } catch (error) {
      console.error(`Error loading ${itemLabel}:`, error);
      setLoadError(`Gagal memuat ${itemLabel}. Cek koneksi atau Firestore rules.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNew = () => {
    setDraft(emptyItem);
    setEditingId("new");
    setFormError("");
  };

  const openEdit = (item: T) => {
    const copy = { ...item };
    delete copy.id;
    setDraft(copy);
    setEditingId(item.id ?? null);
    setFormError("");
  };

  const closeForm = () => {
    setEditingId(null);
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate(draft);
    if (error) {
      setFormError(error);
      return;
    }
    setSaving(true);
    try {
      if (editingId === "new") {
        await create(draft);
      } else if (editingId) {
        await update(editingId, draft as Partial<T>);
      }
      closeForm();
      await refresh();
    } catch (err) {
      console.error(`Error saving ${itemLabel}:`, err);
      setFormError("Gagal menyimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: T) => {
    if (!item.id) return;
    if (!window.confirm(`Hapus "${getRow(item).title}"?`)) return;
    setBusy(true);
    try {
      await remove(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      if (editingId === item.id) closeForm();
    } catch (error) {
      console.error(`Error deleting ${itemLabel}:`, error);
      alert("Gagal menghapus. Coba lagi.");
    } finally {
      setBusy(false);
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const previous = items;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    setBusy(true);
    try {
      await reorder(next);
    } catch (error) {
      console.error(`Error reordering ${itemLabel}:`, error);
      alert("Gagal menyimpan urutan.");
      setItems(previous);
    } finally {
      setBusy(false);
    }
  };

  const form = (
    <form onSubmit={handleSubmit} className="space-y-5 bg-orange-50/60 border border-orange-100 rounded-lg p-5">
      <h2 className="text-lg font-semibold">
        {editingId === "new" ? `Tambah ${itemLabel}` : `Edit ${itemLabel}`}
      </h2>
      {formError && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {formError}
        </div>
      )}
      {renderFields({ draft, setDraft, disabled: saving, setUploading })}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={closeForm}
          disabled={saving}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={saving || uploading}
          className="px-6 py-2 bg-orange-300 text-gray-900 rounded-md hover:bg-orange-200 transition-colors disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="font-rubik min-h-screen bg-gray-100 py-8">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-800">
            ← Kembali ke dashboard
          </Link>
          <div className="flex flex-wrap justify-between items-start gap-4 mt-2 mb-6">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <button
              type="button"
              onClick={openNew}
              disabled={loading || editingId === "new"}
              className="px-4 py-2 bg-orange-300 text-gray-900 rounded-md hover:bg-orange-200 transition-colors font-medium disabled:opacity-50"
            >
              + Tambah {itemLabel}
            </button>
          </div>

          {editingId === "new" && <div className="mb-6">{form}</div>}

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : loadError ? (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {loadError}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center text-gray-500 py-10">Belum ada {itemLabel}.</div>
          ) : (
            <ul className="space-y-2">
              {items.map((item, index) => {
                const row = getRow(item);
                return (
                  <li key={item.id ?? index} className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <span className="w-10 text-center font-bold text-orange-600 shrink-0">#{index + 1}</span>
                      <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-white">
                        {row.image && (
                          <Image src={row.image} alt={row.title} fill unoptimized className="object-contain p-1" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{row.title}</p>
                        <p className="text-xs text-gray-500 truncate">{row.subtitle}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => move(index, -1)}
                          disabled={index === 0 || busy}
                          aria-label={`Pindah ${row.title} ke atas`}
                          className="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => move(index, 1)}
                          disabled={index === items.length - 1 || busy}
                          aria-label={`Pindah ${row.title} ke bawah`}
                          className="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          disabled={busy}
                          className="px-3 py-1 bg-blue-200 text-blue-900 rounded hover:bg-blue-300 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          disabled={busy}
                          className="px-3 py-1 bg-red-200 text-red-900 rounded hover:bg-red-300 disabled:opacity-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                    {editingId === item.id && form}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
}
