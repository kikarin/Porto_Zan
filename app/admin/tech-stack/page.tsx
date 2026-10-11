"use client";

import ContentListManager from "@/components/admin/ContentListManager";
import AdminImageField from "@/components/admin/AdminImageField";
import {
  createTechStackItem,
  deleteTechStackItem,
  getAdminTechStack,
  updateTechStackItem,
  updateTechStackOrder,
} from "@/lib/contentService";
import { TECH_CATEGORIES, type TechStackItem } from "@/lib/defaultContent";

const inputClass =
  "mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-orange-300 focus:ring-orange-300";

export default function AdminTechStackPage() {
  return (
    <ContentListManager<TechStackItem>
      title="Tech Stack"
      description="Atur daftar teknologi di section Toolbox. Urutan #1 tampil paling awal."
      itemLabel="teknologi"
      emptyItem={{ name: "", img: "", category: TECH_CATEGORIES[0] }}
      load={getAdminTechStack}
      create={createTechStackItem}
      update={updateTechStackItem}
      remove={deleteTechStackItem}
      reorder={updateTechStackOrder}
      validate={(draft) => {
        if (!draft.name.trim()) return "Nama teknologi wajib diisi.";
        if (!draft.img) return "Upload logo teknologi terlebih dahulu.";
        return null;
      }}
      getRow={(item) => ({ image: item.img, title: item.name, subtitle: item.category })}
      renderFields={({ draft, setDraft, disabled, setUploading }) => (
        <>
          <div>
            <label htmlFor="tech-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              id="tech-name"
              type="text"
              value={draft.name}
              onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Contoh: Nuxt"
              className={inputClass}
              disabled={disabled}
            />
          </div>
          <div>
            <label htmlFor="tech-category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              id="tech-category"
              value={draft.category}
              onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}
              className={inputClass}
              disabled={disabled}
            >
              {TECH_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <AdminImageField
            label="Logo"
            value={draft.img}
            onChange={(url) => setDraft((prev) => ({ ...prev, img: url }))}
            disabled={disabled}
            previewClassName="h-24"
            onUploadingChange={setUploading}
          />
        </>
      )}
    />
  );
}
