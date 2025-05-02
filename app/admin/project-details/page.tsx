"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllProjects, Project } from '@/lib/projectService';
import { getProjectDetailsByProjectId, deleteProjectDetail } from '@/lib/projectDetailService';
import Container from '@/components/Container';
import Image from 'next/image';

async function getAllProjectDetails() {
  const { db } = await import('@/lib/firebase');
  const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
  const q = query(collection(db, 'projectDetails'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default function ProjectDetailsListPage() {
  const router = useRouter();
  const [projectDetails, setProjectDetails] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterProjectId, setFilterProjectId] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    getAllProjects().then(setProjects);
    getAllProjectDetails().then(details => {
      setProjectDetails(details);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this detail?')) return;
    setDeletingId(id);
    try {
      await deleteProjectDetail(id);
      setProjectDetails(prev => prev.filter(d => d.id !== id));
    } catch (error) {
      alert('Failed to delete project detail.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredDetails = filterProjectId
    ? projectDetails.filter(d => d.projectId === filterProjectId)
    : projectDetails;

  return (
    <div className="font-rubik min-h-screen bg-gray-100 py-8">
      <Container>
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Project Details</h1>
            <Link href="/admin/project-details/new" className="px-4 py-2 bg-orange-300 text-gray-900 rounded-md hover:bg-orange-200 transition-colors font-medium">+ Add Detail</Link>
          </div>
          <div className="mb-6 flex gap-4 items-center">
            <label className="font-medium">Filter by Project:</label>
            <select value={filterProjectId} onChange={e => setFilterProjectId(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300">
              <option value="">All Projects</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : filteredDetails.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No project details found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tech Icons</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDetails.map(detail => {
                    const project = projects.find(p => p.id === detail.projectId);
                    return (
                      <tr key={detail.id}>
                        <td className="px-4 py-2 font-semibold">{detail.title}</td>
                        <td className="px-4 py-2">{project ? project.title : detail.projectId}</td>
                        <td className="px-4 py-2">{detail.date}</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-1">
                            {detail.images && detail.images.slice(0,2).map((img: string, idx: number) => (
                              <Image key={idx} src={img} alt="img" width={32} height={32} className="object-contain rounded" unoptimized />
                            ))}
                            {detail.images && detail.images.length > 2 && (
                              <span className="text-xs text-gray-400 ml-1">+{detail.images.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-1">
                            {detail.techIcons && detail.techIcons.slice(0,2).map((icon: string, idx: number) => (
                              <Image key={idx} src={icon} alt="icon" width={24} height={24} className="object-contain rounded" unoptimized />
                            ))}
                            {detail.techIcons && detail.techIcons.length > 2 && (
                              <span className="text-xs text-gray-400 ml-1">+{detail.techIcons.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <Link href={`/admin/project-details/${detail.id}`} className="px-3 py-1 bg-blue-200 text-blue-900 rounded hover:bg-blue-300 mr-2">Edit</Link>
                          <button onClick={() => handleDelete(detail.id)} disabled={deletingId === detail.id} className="px-3 py-1 bg-red-200 text-red-900 rounded hover:bg-red-300 disabled:opacity-50">
                            {deletingId === detail.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
} 