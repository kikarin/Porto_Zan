"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { uploadImageToCloudinary } from '@/lib/uploadImage';
import { Project, getProject, createProject, updateProject } from '@/lib/projectService';
import Container from '@/components/Container';
import Cookies from 'js-cookie';

const categories = [
  "Enterprise Solutions",
  "Client Projects",
  "Academic Projects",
  "Professional Training",
  "Personal Development"
];

const ctaTypes = [
  { value: "live", label: "Live Demo" },
  { value: "github", label: "GitHub" },
  { value: "private", label: "Private" },
  { value: "visit", label: "Visit Web" },
  { value: "download", label: "Download" }
];

interface ProjectFormProps {
  projectId: string;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [iconUploading, setIconUploading] = useState(false);
  const [project, setProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    img: '',
    techIcons: [],
    cta: {
      type: 'private',
      label: 'Private',
      link: ''
    },
    category: 'Enterprise Solutions'
  });

  const fetchProject = async () => {
    try {
      const projectData = await getProject(projectId);
      if (projectData) {
        console.log('Fetched project:', projectData); // Debugging
        setProject(projectData);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const session = Cookies.get('session');
    if (!session) {
      router.push('/admin');
      return;
    }

    if (projectId !== 'new') {
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [projectId, router, fetchProject]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageUploading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      console.log('Image uploaded:', imageUrl); // Debugging
      setProject(prev => ({ ...prev, img: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleTechIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIconUploading(true);
      const iconUrl = await uploadImageToCloudinary(file);
      console.log('Icon uploaded:', iconUrl); // Debugging
      setProject(prev => ({
        ...prev,
        techIcons: [...prev.techIcons, iconUrl]
      }));
    } catch (error) {
      console.error('Error uploading tech icon:', error);
      alert('Failed to upload tech icon. Please try again.');
    } finally {
      setIconUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate required fields
      if (!project.title || !project.description || !project.category) {
        alert('Please fill all required fields');
        setSaving(false);
        return;
      }

      // Validate image
      if (!project.img) {
        alert('Please upload a project image');
        setSaving(false);
        return;
      }

      console.log('Saving project:', project); // Debugging

      if (projectId === 'new') {
        await createProject(project);
      } else {
        await updateProject(projectId, project);
      }
      
      router.push('/admin');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-300 mb-4"></div>
          <p>Loading project data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-rubik min-h-screen bg-gray-100 py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold mb-8">
            {projectId === 'new' ? 'Add New Project' : 'Edit Project'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => setProject(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
              <textarea
                value={project.description}
                onChange={(e) => setProject(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
              <select
                value={project.category}
                onChange={(e) => setProject(prev => ({ ...prev, category: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Image <span className="text-red-500">*</span></label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-4">
                <div className="flex flex-col items-center">
                  {project.img ? (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={project.img}
                        alt="Project preview"
                        fill
                        className="object-contain"
                        onError={() => {
                          setProject(prev => ({ ...prev, img: '' }));
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-24 bg-gray-100 flex items-center justify-center mb-4 rounded-md">
                      <span className="text-gray-400">No image selected</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center transition-colors">
                      {imageUploading ? (
                        <>
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-orange-300 mr-2"></span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {project.img ? 'Change Image' : 'Upload Image'}
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={imageUploading || saving}
                      />
                    </label>
                    {project.img && (
                      <button
                        type="button"
                        onClick={() => setProject(prev => ({ ...prev, img: '' }))}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                        disabled={imageUploading || saving}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Icons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Icons</label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  {project.techIcons.length > 0 ? (
                    project.techIcons.map((icon, index) => (
                      <div key={index} className="relative group">
                        <div className="relative w-16 h-16 bg-gray-50 rounded-md overflow-hidden">
                          <Image
                            src={icon}
                            alt={`Tech icon ${index + 1}`}
                            fill
                            className="object-contain p-2"
                            onError={() => {
                              // Handle error
                              setProject(prev => ({
                                ...prev,
                                techIcons: prev.techIcons.filter((_, i) => i !== index)
                              }));
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setProject(prev => ({
                            ...prev,
                            techIcons: prev.techIcons.filter((_, i) => i !== index)
                          }))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={saving}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="w-full text-center py-4 text-gray-400">
                      No tech icons added yet
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center transition-colors">
                    {iconUploading ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-orange-300 mr-2"></span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Tech Icon
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleTechIconUpload}
                      className="hidden"
                      disabled={iconUploading || saving}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* CTA Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Type</label>
              <select
                value={project.cta.type}
                onChange={(e) => setProject(prev => ({
                  ...prev,
                  cta: { ...prev.cta, type: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300"
              >
                {ctaTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* CTA Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Label</label>
              <input
                type="text"
                value={project.cta.label}
                onChange={(e) => setProject(prev => ({
                  ...prev,
                  cta: { ...prev.cta, label: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300"
                required
              />
            </div>

            {/* CTA Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
              <input
                type="text"
                value={project.cta.link}
                onChange={(e) => setProject(prev => ({
                  ...prev,
                  cta: { ...prev.cta, link: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring-orange-300"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || imageUploading || iconUploading}
                className="px-6 py-2 bg-orange-300 text-gray-900 rounded-md hover:bg-orange-200 transition-colors disabled:opacity-50 flex items-center"
              >
                {saving ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900 mr-2"></span>
                    Saving...
                  </>
                ) : (
                  'Save Project'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </Container>
    </div>
  );
} 