import { type Metadata } from "next";
import { type ProjectDetail as ProjectDetailType } from "@/lib/projectDetailService";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProjectDetail from "@/components/ProjectDetail";

// Mark this page as dynamic
export const dynamic = "force-dynamic";

// generateMetadata dengan params sebagai Promise
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  const q = query(collection(db, "projectDetails"), where("projectId", "==", id));
  const snap = await getDocs(q);

  if (snap.empty) return { title: "Project Not Found" };

  const detail = snap.docs[0].data();
  const projectRef = doc(db, "projects", detail.projectId);
  const projectSnap = await getDoc(projectRef);
  const project = projectSnap.exists() ? projectSnap.data() : null;

  return {
    title: `${project?.title || "Project"} | My Portfolio`,
    description: project?.description || detail.desc || "Detail of project",
    openGraph: {
      title: project?.title || "Project",
      description: project?.description || detail.desc,
      images: [
        {
          url: project?.img || "/default-og.png",
          width: 800,
          height: 600,
          alt: project?.title || "Project Image",
        },
      ],
    },
  };
}

// Komponen halaman utama juga dengan params sebagai Promise
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const detail = await getProjectDetail(id);
  return <ProjectDetail projectDetail={detail} />;
}

// Ambil detail project
async function getProjectDetail(id: string): Promise<ProjectDetailType | null> {
  const q = query(collection(db, "projectDetails"), where("projectId", "==", id));
  const detailSnap = await getDocs(q);

  if (detailSnap.empty) return null;

  const raw = detailSnap.docs[0].data();

  // Safe conversion for Firestore Timestamp to ISO string
  const convertDate = (value: any): string | null => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (value?.toDate && typeof value.toDate === "function") {
      const date = value.toDate();
      return date instanceof Date ? date.toISOString() : null;
    }
    return null;
  };

  return {
    id: detailSnap.docs[0].id,
    projectId: raw.projectId,
    title: raw.title,
    desc: raw.desc,
    images: raw.images,
    techIcons: raw.techIcons,
    date: raw.date,
    createdAt: convertDate(raw.createdAt),
    updatedAt: convertDate(raw.updatedAt),
  };
}
