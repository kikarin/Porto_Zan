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
  createdAt?: string | null;
  updatedAt?: string | null;
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
export async function getProjectDetailsByProjectId(projectId: string): Promise<ProjectDetail[]> {
  const q = query(
    collection(db, 'projectDetails'),
    where('projectId', '==', projectId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      projectId: data.projectId,
      title: data.title,
      desc: data.desc,
      images: data.images,
      techIcons: data.techIcons,
      date: data.date,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
    } as ProjectDetail;
  });
}

// Get single detail
export async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  const docRef = doc(db, 'projectDetails', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      projectId: data.projectId,
      title: data.title,
      desc: data.desc,
      images: data.images,
      techIcons: data.techIcons,
      date: data.date,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
    };
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
