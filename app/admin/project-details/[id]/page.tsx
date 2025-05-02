"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Container from '@/components/Container';
import { getAllProjects, Project } from '@/lib/projectService';
import { getProjectDetail, updateProjectDetail, deleteProjectDetail } from '@/lib/projectDetailService';
import { uploadImageToCloudinary } from '@/lib/uploadImage';
import Image from 'next/image';

export default function EditProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const detailId = params.id as string;
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [techIcons, setTechIcons] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [iconUploading, setIconUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects().then(setProjects);
    getProjectDetail(detailId).then(detail => {
      if (detail) {
        setSelectedProjectId(detail.projectId);
        setTitle(detail.title);
        setDesc(detail.desc);
        setDate(detail.date);
        setImages(detail.images || []);
        setTechIcons(detail.techIcons || []);
      }
      setLoading(false);
    });
  }, [detailId]);

  useEffect(() => {
    if (selectedProjectId) {
      const proj = projects.find(p => p.id === selectedProjectId) || null;
      setSelectedProject(proj);
    } else {
      setSelectedProject(null);
    }
  }, [selectedProjectId, projects]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImageUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImageToCloudinary(files[i]);
        urls.push(url);
      }
      setImages(prev => [...prev, ...urls]);
    } catch {
      alert('Failed to upload image.');
    }
     finally {
      setImageUploading(false);
    }
  };

  const handleTechIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIconUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImageToCloudinary(files[i]);
        urls.push(url);
      }
      setTechIcons(prev => [...prev, ...urls]);
    } catch  {
      alert('Failed to upload tech icon.');
    } finally {
      setIconUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !title || !desc || !date) {
      alert('Please fill all required fields.');
      return;
    }
    setSaving(true);
    try {
      await updateProjectDetail(detailId, {
        projectId: selectedProjectId,
        title,
        desc,
        images,
        techIcons,
        date,
      });
      router.push('/admin/project-details');
    } catch{
      alert('Failed to update project detail.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this detail?')) return;
    setSaving(true);
    try {
      await deleteProjectDetail(detailId);
      router.push('/admin/project-details');
    } catch {
      alert('Failed to delete project detail.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="font-rubik min-h-screen bg-gray-100 py-8">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Edit Project Detail</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project <span className="text-red-500">*</span></label>
              <select value={selectedProjectId} onChange={e => setSelectedProjectId(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300" required>
                <option value="">Select a project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
              <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date (Year-Month) <span className="text-red-500">*</span></label>
              <input type="month" value={date} onChange={e => setDate(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300" required />
            </div>
            {/* Images from project (readonly) */}
            {selectedProject && selectedProject.img && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Main Image (readonly)</label>
                <div className="flex flex-wrap gap-2">
                  <Image src={selectedProject.img} alt="Project Main" width={80} height={80} className="object-contain rounded" unoptimized />
                </div>
              </div>
            )}
            {/* Images for detail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detail Images (multiple)</label>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={imageUploading} />
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <Image src={img} alt={`Detail Img ${idx + 1}`} fill className="object-contain rounded" unoptimized />
                    <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" onClick={() => setImages(images.filter((_, i) => i !== idx))}>×</button>
                  </div>
                ))}
              </div>
            </div>
            {/* Tech icons from project (readonly) */}
            {selectedProject && selectedProject.techIcons && selectedProject.techIcons.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Tech Icons (readonly)</label>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techIcons.map((icon, idx) => (
                    <Image key={idx} src={icon} alt={`Tech Icon ${idx + 1}`} width={40} height={40} className="object-contain rounded" unoptimized />
                  ))}
                </div>
              </div>
            )}
            {/* Tech icons for detail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detail Tech Icons (multiple)</label>
              <input type="file" accept="image/*" multiple onChange={handleTechIconUpload} disabled={iconUploading} />
              <div className="flex flex-wrap gap-2 mt-2">
                {techIcons.map((icon, idx) => (
                  <div key={idx} className="relative w-12 h-12">
                    <Image src={icon} alt={`Detail Icon ${idx + 1}`} fill className="object-contain rounded" unoptimized />
                    <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center" onClick={() => setTechIcons(techIcons.filter((_, i) => i !== idx))}>×</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between space-x-4 pt-4 border-t">
              <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-200 text-red-800 rounded-md hover:bg-red-300 transition-colors" disabled={saving}>Delete</button>
              <div className="flex space-x-4">
                <button type="button" onClick={() => router.push('/admin/project-details')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors" disabled={saving}>Cancel</button>
                <button type="submit" disabled={saving || imageUploading || iconUploading} className="px-6 py-2 bg-orange-300 text-gray-900 rounded-md hover:bg-orange-200 transition-colors disabled:opacity-50 flex items-center">{saving ? (<><span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900 mr-2"></span>Saving...</>) : ('Save Detail')}</button>
              </div>
            </div>
          </form>
        </motion.div>
      </Container>
    </div>
  );
} 