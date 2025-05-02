// app/projects/[id]/page.tsx
import { Metadata } from "next";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProjectDetail from "@/components/ProjectDetail";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const q = query(collection(db, "projectDetails"), where("projectId", "==", params.id));
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

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const q = query(collection(db, "projectDetails"), where("projectId", "==", params.id));
  const detailSnap = await getDocs(q);
  const detail = detailSnap.empty ? null : { id: detailSnap.docs[0].id, ...detailSnap.docs[0].data() };

  return <ProjectDetail projectDetail={detail} />;
}
