"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import AdminImageField from "@/components/admin/AdminImageField";
import { getAboutContent, updateAboutContent } from "@/lib/contentService";
import { DEFAULT_ABOUT } from "@/lib/defaultContent";

export default function AdminAboutPage() {
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    getAboutContent()
      .then((content) => setPhoto(content.photo))
      .catch((error) => {
        console.error("Error fetching about content:", error);
        setMessage({ type: "error", text: "Gagal memuat data About." });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      setMessage({ type: "error", text: "Upload foto terlebih dahulu." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      await updateAboutContent({ photo });
      setMessage({ type: "success", text: "Foto About tersimpan." });
    } catch (error) {
      console.error("Error saving about content:", error);
      setMessage({ type: "error", text: "Gagal menyimpan. Coba lagi." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="font-rubik min-h-screen bg-gray-100 py-8">
      <Container>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-800">
            ← Kembali ke dashboard
          </Link>
          <h1 className="text-3xl font-bold mt-2 mb-8">Foto About</h1>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {message && (
                <div
                  role="status"
                  className={`px-4 py-3 rounded border ${
                    message.type === "success"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-600"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <AdminImageField
                label="Foto profil"
                value={photo}
                onChange={setPhoto}
                disabled={saving}
                previewClassName="h-80"
                onUploadingChange={setUploading}
              />

              <div className="flex justify-between items-center pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setPhoto(DEFAULT_ABOUT.photo)}
                  disabled={saving || photo === DEFAULT_ABOUT.photo}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-40"
                >
                  Pakai foto bawaan
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
          )}
        </div>
      </Container>
    </div>
  );
}
