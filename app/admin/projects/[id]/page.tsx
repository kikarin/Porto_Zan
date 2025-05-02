import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import ProjectForm karena dia Client Component
const ProjectForm = dynamic(() => import('./ProjectForm'), {
  ssr: false,
  loading: () => <div>Loading form...</div>,
});

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectForm projectId={params.id} />
    </Suspense>
  );
}
