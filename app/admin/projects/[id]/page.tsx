'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import ProjectForm from './ProjectForm';

export default function ProjectPage() {
  const { id } = useParams() as { id: string };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectForm projectId={id} />
    </Suspense>
  );
}
