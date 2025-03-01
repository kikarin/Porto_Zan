import ProjectDetail from "@/components/ProjectDetail";

type Props = {
  params: { id: string };
};

// Menentukan ID project secara statis (kalau nggak pakai API)
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }]; // Bisa ubah sesuai kebutuhan
}

export default function ProjectDetailPage({ params }: Props) {
  return <ProjectDetail projectId={params.id} />;
}
