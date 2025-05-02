import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';

export interface ProjectDetail {
  id?: string;
  projectId: string;
  title: string;
  desc: string;
  images: string[];
  techIcons: string[];
  date: string; // format YYYY-MM
  createdAt?: any;
  updatedAt?: any;
}

// Create new detail
export async function createProjectDetail(detail: Omit<ProjectDetail, 'id'>) {
  const docRef = await addDoc(collection(db, 'projectDetails'), {
    ...detail,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Get all details for a project
export async function getProjectDetailsByProjectId(projectId: string) {
  const q = query(
    collection(db, 'projectDetails'),
    where('projectId', '==', projectId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectDetail[];
}

// Get single detail
export async function getProjectDetail(id: string) {
  const docRef = doc(db, 'projectDetails', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ProjectDetail;
  }
  return null;
}

// Update detail
export async function updateProjectDetail(id: string, detail: Partial<ProjectDetail>) {
  const docRef = doc(db, 'projectDetails', id);
  await updateDoc(docRef, {
    ...detail,
    updatedAt: serverTimestamp(),
  });
}

// Delete detail
export async function deleteProjectDetail(id: string) {
  const docRef = doc(db, 'projectDetails', id);
  await deleteDoc(docRef);
} 