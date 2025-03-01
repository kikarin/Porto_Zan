"use client";

import ProjectDetail from "@/components/ProjectDetail";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  return <ProjectDetail projectId={params.id as string} />;
}
