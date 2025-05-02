import { Suspense } from 'react';
import ProjectForm from './ProjectForm';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectForm projectId={params.id} />
    </Suspense>
  );
} 