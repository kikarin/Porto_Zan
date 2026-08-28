"use client";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";

export interface Project {
  id?: string;
  title: string;
  description: string;
  img: string;
  techIcons: string[];
  cta: {
    type: string;
    label: string;
    link: string;
  };
  category: string;
  sortOrder?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const orderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  });
}

// Create new project
export async function createProject(project: Omit<Project, 'id'>) {
  try {
    const existing = await getDocs(collection(db, "projects"));
    const maxOrder = existing.docs.reduce((max, docSnap) => {
      const value = docSnap.data().sortOrder;
      return typeof value === "number" ? Math.max(max, value) : max;
    }, 0);

    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      sortOrder: project.sortOrder ?? maxOrder + 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

function mapProjectDoc(docSnap: QueryDocumentSnapshot<DocumentData>): Project {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title || "",
    description: data.description || "",
    img: data.img || "",
    techIcons: data.techIcons || [],
    cta: data.cta || { type: "", label: "", link: "" },
    category: data.category || "",
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : undefined,
    createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
    updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
  };
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    return sortProjects(querySnapshot.docs.map(mapProjectDoc));
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
}

export async function updateProjectsSortOrder(
  projects: Array<Pick<Project, "id" | "sortOrder">>
): Promise<void> {
  await Promise.all(
    projects.map((project) => {
      if (!project.id || typeof project.sortOrder !== "number") return Promise.resolve();
      return updateDoc(doc(db, "projects", project.id), {
        sortOrder: project.sortOrder,
        updatedAt: serverTimestamp(),
      });
    })
  );
}

export async function normalizeProjectSortOrders(projects: Project[]): Promise<Project[]> {
  const sorted = sortProjects(projects);
  const normalized = sorted.map((project, index) => ({
    ...project,
    sortOrder: index + 1,
  }));

  const needsUpdate = sorted.some(
    (project, index) => project.sortOrder == null || project.sortOrder !== index + 1
  );

  if (needsUpdate) {
    await updateProjectsSortOrder(
      normalized.map((project) => ({ id: project.id, sortOrder: project.sortOrder }))
    );
  }

  return normalized;
}

// Get single project
export async function getProject(id: string): Promise<Project | null> {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        img: data.img,
        techIcons: data.techIcons,
        cta: data.cta,
        category: data.category,
        sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : undefined,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
      } as Project;
    }
    return null;
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
}

// Update project
export async function updateProject(id: string, project: Partial<Project>) {
  try {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, {
      ...project,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

// Delete project
export async function deleteProject(id: string) {
  try {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

// Optional helper (misalnya kamu pakai addProject di admin)
export const addProject = async (project: Omit<Project, 'id'>): Promise<void> => {
  try {
    await addDoc(collection(db, "projects"), {
      ...project,
      sortOrder: project.sortOrder ?? 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};
