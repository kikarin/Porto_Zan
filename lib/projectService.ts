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
  query,
  orderBy,
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
  createdAt?: string | null;
  updatedAt?: string | null;
}

// Create new project
export async function createProject(project: Omit<Project, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        img: data.img,
        techIcons: data.techIcons,
        cta: data.cta,
        category: data.category,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
      } as Project;
    });
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
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
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};
