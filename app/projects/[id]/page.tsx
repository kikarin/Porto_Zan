import ProjectDetail from "@/components/ProjectDetail";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetail projectId={params.id} />;
}
