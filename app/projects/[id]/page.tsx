import ProjectDetail from "@/components/ProjectDetail";

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ProjectDetailPage({ params }: Props) {
  return <ProjectDetail projectId={params.id} />;
}
