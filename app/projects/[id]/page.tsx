import ProjectDetail from "@/components/ProjectDetail";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Project ${params.id}`,
    description: "Detail project",
  };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetail projectId={params.id} />;
}
