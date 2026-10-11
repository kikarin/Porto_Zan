"use client";

import ContentListManager from "@/components/admin/ContentListManager";
import AdminImageField from "@/components/admin/AdminImageField";
import {
  createCertification,
  deleteCertification,
  getAdminCertifications,
  updateCertification,
  updateCertificationsOrder,
} from "@/lib/contentService";
import type { CertificationItem } from "@/lib/defaultContent";

const inputClass =
  "mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-orange-300 focus:ring-orange-300";

export default function AdminCertificationsPage() {
  return (
    <ContentListManager<CertificationItem>
      title="Sertifikat"
      description="Atur daftar sertifikat yang tampil di section Certifications. Urutan #1 tampil paling awal."
      itemLabel="sertifikat"
      emptyItem={{ title: "", issuer: "", date: "", logo: "" }}
      load={getAdminCertifications}
      create={createCertification}
      update={updateCertification}
      remove={deleteCertification}
      reorder={updateCertificationsOrder}
      validate={(draft) => {
        if (!draft.title.trim()) return "Judul sertifikat wajib diisi.";
        if (!draft.issuer.trim()) return "Penerbit wajib diisi.";
        if (!draft.date.trim()) return "Tanggal wajib diisi.";
        if (!draft.logo) return "Upload gambar sertifikat terlebih dahulu.";
        return null;
      }}
      getRow={(item) => ({ image: item.logo, title: item.title, subtitle: `${item.issuer} · ${item.date}` })}
      renderFields={({ draft, setDraft, disabled, setUploading }) => (
        <>
          <div>
            <label htmlFor="cert-title" className="block text-sm font-medium text-gray-700 mb-1">
              Judul <span className="text-red-500">*</span>
            </label>
            <input
              id="cert-title"
              type="text"
              value={draft.title}
              onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Contoh: Belajar Dasar AI"
              className={inputClass}
              disabled={disabled}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cert-issuer" className="block text-sm font-medium text-gray-700 mb-1">
                Penerbit <span className="text-red-500">*</span>
              </label>
              <input
                id="cert-issuer"
                type="text"
                value={draft.issuer}
                onChange={(e) => setDraft((prev) => ({ ...prev, issuer: e.target.value }))}
                placeholder="Contoh: Dicoding Indonesia"
                className={inputClass}
                disabled={disabled}
              />
            </div>
            <div>
              <label htmlFor="cert-date" className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal <span className="text-red-500">*</span>
              </label>
              <input
                id="cert-date"
                type="text"
                value={draft.date}
                onChange={(e) => setDraft((prev) => ({ ...prev, date: e.target.value }))}
                placeholder="Contoh: 16 Desember 2024"
                className={inputClass}
                disabled={disabled}
              />
            </div>
          </div>
          <AdminImageField
            label="Gambar sertifikat"
            value={draft.logo}
            onChange={(url) => setDraft((prev) => ({ ...prev, logo: url }))}
            disabled={disabled}
            previewClassName="h-56"
            onUploadingChange={setUploading}
          />
        </>
      )}
    />
  );
}
