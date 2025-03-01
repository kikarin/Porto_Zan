import ProjectDetail from "@/components/ProjectDetail";

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  return <ProjectDetail projectId={params.id} />;
}
