"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Project, getAllProjects, deleteProject } from '@/lib/projectService';
import Container from '@/components/Container';
import Cookies from 'js-cookie';
import { FirebaseError } from "firebase/app";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const session = Cookies.get('session');
    if (session) {
      setIsLoggedIn(true);
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const projectsData = await getAllProjects();
      console.log('Fetched projects:', projectsData); // Debugging
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      Cookies.set('session', user.uid, { expires: 7 });
  
      setIsLoggedIn(true);
      fetchProjects();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Login error:', error.code);
  
        switch (error.code) {
          case 'auth/invalid-credential':
            setError('Invalid email or password. Please try again.');
            break;
          case 'auth/user-not-found':
            setError('No account found with this email.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password.');
            break;
          case 'auth/too-many-requests':
            setError('Too many failed login attempts. Please try again later.');
            break;
          default:
            setError('An error occurred during login. Please try again.');
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('session');
      setIsLoggedIn(false);
      router.push('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(project => project.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="font-rubik min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
          >
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Admin Login
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-orange-300 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="font-rubik min-h-screen bg-gray-100 py-8">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/admin/projects/new')}
              className="bg-orange-300 text-gray-900 px-4 py-2 rounded-md hover:bg-orange-200 transition-colors"
            >
              Add New Project
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-300 mb-4"></div>
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow p-8">
            <p className="text-gray-600 mb-4">No projects found. Add your first project!</p>
            <button
              onClick={() => router.push('/admin/projects/new')}
              className="inline-flex items-center px-4 py-2 bg-orange-300 text-gray-900 rounded-md hover:bg-orange-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  {project.img ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={project.img}
                        alt={`Image for ${project.title}`}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          console.error('Image failed to load:', project.img);
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-orange-300 text-gray-900 rounded-full text-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 truncate">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech Icons */}
                  {project.techIcons && project.techIcons.length > 0 && (
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.techIcons.map((icon, index) => (
                        <div key={index} className="relative w-8 h-8">
                          <Image
                            src={icon}
                            alt={`Tech ${index + 1}`}
                            fill
                            className="object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/32?text=Icon';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => router.push(`/admin/projects/${project.id}`)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id!)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
} 