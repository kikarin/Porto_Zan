export type ProjectCategoryValue =
  | "Academic Projects"
  | "Internship Projects"
  | "Freelance & Client Work"
  | "Platform Learning"
  | "Government & Enterprise Vendor"
  | "Personal Projects";

export type ProjectCategory = {
  value: ProjectCategoryValue;
  label: string;
  description: string;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    value: "Academic Projects",
    label: "Academic Projects",
    description:
      "Cocok untuk project tugas sekolah, kampus, UAS/UAS, skripsi, atau kebutuhan akademik lainnya.",
  },
  {
    value: "Internship Projects",
    label: "Internship Projects",
    description:
      "Cocok untuk project yang dikerjakan saat magang, PKL, atau penugasan langsung dari tempat magang.",
  },
  {
    value: "Freelance & Client Work",
    label: "Freelance & Client Work",
    description:
      "Cocok untuk project jasa pembuatan website/aplikasi, klien langsung, atau pekerjaan freelance berbayar.",
  },
  {
    value: "Platform Learning",
    label: "Platform Learning",
    description:
      "Cocok untuk project hasil belajar dari platform seperti Dicoding, course online, bootcamp, atau sertifikasi.",
  },
  {
    value: "Government & Enterprise Vendor",
    label: "Government & Enterprise Vendor",
    description:
      "Cocok untuk project perusahaan/pemerintahan di mana Anda bertindak sebagai vendor pengembang website/aplikasi.",
  },
  {
    value: "Personal Projects",
    label: "Personal Projects",
    description:
      "Cocok untuk project latihan mandiri, eksperimen teknologi, portfolio pribadi, atau personal branding.",
  },
];

export const LEGACY_CATEGORY_MAP: Record<string, ProjectCategoryValue> = {
  "Enterprise Solutions": "Government & Enterprise Vendor",
  "Client Projects": "Freelance & Client Work",
  "Academic Projects": "Academic Projects",
  "Professional Training": "Platform Learning",
  "Personal Development": "Personal Projects",
};

export const DEFAULT_PROJECT_CATEGORY: ProjectCategoryValue = "Personal Projects";

export function normalizeProjectCategory(
  category: string | undefined | null
): ProjectCategoryValue | string {
  if (!category) return DEFAULT_PROJECT_CATEGORY;
  if (PROJECT_CATEGORIES.some((item) => item.value === category)) {
    return category as ProjectCategoryValue;
  }
  return LEGACY_CATEGORY_MAP[category] ?? category;
}

export function getProjectCategoryMeta(category: string | undefined | null) {
  const normalized = normalizeProjectCategory(category);
  return (
    PROJECT_CATEGORIES.find((item) => item.value === normalized) ?? {
      value: normalized,
      label: String(normalized),
      description: "Kategori project.",
    }
  );
}

export function getProjectYear(
  createdAt?: string | null,
  detailDate?: string | null
): string | null {
  if (detailDate) {
    const match = detailDate.match(/^(\d{4})/);
    if (match) return match[1];
  }

  if (createdAt) {
    const year = new Date(createdAt).getFullYear();
    return Number.isNaN(year) ? null : String(year);
  }

  return null;
}
