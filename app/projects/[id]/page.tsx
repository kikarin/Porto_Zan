"use client";

import ProjectDetail from "@/components/ProjectDetail";

type Props = {
  params: { id: string };
};

export default function ProjectDetailPage({ params }: Props) {
  return <ProjectDetail projectId={params.id} />;
}
