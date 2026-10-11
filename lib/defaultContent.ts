export interface TechStackItem {
  id?: string;
  name: string;
  img: string;
  category: string;
  sortOrder?: number;
}

export interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  logo: string;
  sortOrder?: number;
}

export interface AboutContent {
  photo: string;
}

export const TECH_CATEGORIES = [
  "Language",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Deployment",
] as const;

const BACKEND_FRAMEWORKS = new Set(["laravel", "express.js", "express", "node.js", "nodejs", "nestjs", "django", "flask", "spring", "gin"]);

const LEGACY_TECH_CATEGORIES: Record<string, string> = {
  Styling: "Frontend",
  API: "Tools",
  "Version Control": "Tools",
};

/** Maps categories from the older 7-category scheme onto the current one. */
export function normalizeTechCategory(category: string, name: string): string {
  if ((TECH_CATEGORIES as readonly string[]).includes(category)) return category;
  if (category === "Framework & Library") {
    return BACKEND_FRAMEWORKS.has(name.trim().toLowerCase()) ? "Backend" : "Frontend";
  }
  return LEGACY_TECH_CATEGORIES[category] ?? "Tools";
}

export const DEFAULT_ABOUT: AboutContent = {
  photo: "/new.jpeg",
};

const withOrder = <T extends object>(items: T[]) =>
  items.map((item, index) => ({ ...item, sortOrder: index + 1 }));

export const DEFAULT_TECH_STACK: TechStackItem[] = withOrder([
  { name: "HTML", img: "/html.webp", category: "Language" },
  { name: "CSS", img: "/css.webp", category: "Language" },
  { name: "JavaScript", img: "/js.webp", category: "Language" },
  { name: "TypeScript", img: "/ts.png", category: "Language" },
  { name: "PHP", img: "/php.webp", category: "Language" },
  { name: "Python", img: "/python.webp", category: "Language" },
  { name: "Dart", img: "/dart.webp", category: "Language" },
  { name: "Java", img: "/java.png", category: "Language" },
  { name: "C++", img: "/c++.png", category: "Language" },
  { name: "Golang", img: "/golang.png", category: "Language" },
  { name: "Tailwind CSS", img: "/tailwind.png", category: "Frontend" },
  { name: "Bootstrap", img: "/bootstrap.png", category: "Frontend" },
  { name: "Chakra UI", img: "/chakra.png", category: "Frontend" },
  { name: "React.js", img: "/react.png", category: "Frontend" },
  { name: "Vite", img: "/vite.svg", category: "Frontend" },
  { name: "Laravel", img: "/laravel.png", category: "Backend" },
  { name: "Flutter", img: "/flutter.png", category: "Frontend" },
  { name: "Express.js", img: "/express.png", category: "Backend" },
  { name: "Next.js", img: "/next.svg", category: "Frontend" },
  { name: "Vue.js", img: "/vuejs.png", category: "Frontend" },
  { name: "Node.js", img: "/nodejs.png", category: "Backend" },
  { name: "Three.js", img: "/three.png", category: "Frontend" },
  { name: "Postman", img: "/postman.png", category: "Tools" },
  { name: "MySQL", img: "/mysql.png", category: "Database" },
  { name: "PostgreSQL", img: "/postgresql.svg", category: "Database" },
  { name: "MariaDB", img: "/mariadb.png", category: "Database" },
  { name: "Firebase", img: "/firebase.png", category: "Database" },
  { name: "GitHub", img: "/github.png", category: "Tools" },
  { name: "GitLab", img: "/gitlab.png", category: "Tools" },
  { name: "Bitbucket", img: "/bitbucket.svg", category: "Tools" },
  { name: "Git Bash", img: "/git.png", category: "Tools" },
  { name: "Vercel", img: "/vercel1868.jpg", category: "Deployment" },
  { name: "Ubuntu Server", img: "/ubuntu.png", category: "Deployment" },
]);

export const DEFAULT_CERTIFICATIONS: CertificationItem[] = withOrder([
  {
    title: "Prakerin di PT Bonet Utama",
    issuer: "PT Bonet Utama",
    date: "10 Mei 2025",
    logo: "/MUHAMMAD ILHAM FAUZAN.png",
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    date: "16 Desember 2024",
    logo: "/dasar_ai.png",
  },
  {
    title: "Belajar Membuat Aplikasi Flutter",
    issuer: "Dicoding Indonesia",
    date: "30 November 2024",
    logo: "/flutter_pemula.png",
  },
  {
    title: "Memulai Pemrograman dengan Dart",
    issuer: "Dicoding Indonesia",
    date: "27 November 2024",
    logo: "/dart.png",
  },
  {
    title: "Project Based Learning",
    issuer: "PT Bonet Utama",
    date: "21 Oktober 2022",
    logo: "/bonet.jpg",
  },
]);
