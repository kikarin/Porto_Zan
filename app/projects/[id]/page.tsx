import ProjectDetail from "@/components/ProjectDetail";

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetail projectId={params.id} />;
}
