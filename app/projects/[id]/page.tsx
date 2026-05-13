import { type Metadata } from "next";
import { cache } from "react";
import { type ProjectDetail as ProjectDetailType } from "@/lib/projectDetailService";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProjectDetail from "@/components/ProjectDetail";

export const revalidate = 3600;

type ProjectDetailPageData = {
  detail: ProjectDetailType | null;
  allProjectIds: string[];
};

function convertDate(value: Timestamp | Date | null | undefined): string | null {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value && "toDate" in value && typeof value.toDate === "function") {
    const date = value.toDate();
    return date instanceof Date ? date.toISOString() : null;
  }

  return null;
}

function stripHtml(value: string | null | undefined): string {
  return (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const getProjectDetailPageData = cache(
  async (id: string): Promise<ProjectDetailPageData> => {
    const [detailSnap, orderedDetailsSnap] = await Promise.all([
      getDocs(
        query(collection(db, "projectDetails"), where("projectId", "==", id))
      ),
      getDocs(
        query(collection(db, "projectDetails"), orderBy("createdAt", "desc"))
      ),
    ]);

    const allProjectIds = orderedDetailsSnap.docs
      .map((doc) => doc.data().projectId)
      .filter((projectId): projectId is string => typeof projectId === "string");

    if (detailSnap.empty) {
      return { detail: null, allProjectIds };
    }

    const raw = detailSnap.docs[0].data();

    return {
      allProjectIds,
      detail: {
        id: detailSnap.docs[0].id,
        projectId: raw.projectId,
        title: raw.title,
        desc: raw.desc,
        images: Array.isArray(raw.images) ? raw.images : [],
        techIcons: Array.isArray(raw.techIcons) ? raw.techIcons : [],
        date: raw.date,
        createdAt: convertDate(raw.createdAt),
        updatedAt: convertDate(raw.updatedAt),
      },
    };
  }
);

// generateMetadata dengan params sebagai Promise
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const { detail } = await getProjectDetailPageData(id);

  if (!detail) return { title: "Project Not Found" };

  const plainDescription = stripHtml(detail.desc);

  return {
    title: `${detail.title || "Project"} | My Portfolio`,
    description: plainDescription || "Detail of project",
    openGraph: {
      title: detail.title || "Project",
      description: plainDescription,
      images: [
        {
          url: detail.images[0] || "/default-og.png",
          width: 800,
          height: 600,
          alt: detail.title || "Project Image",
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

  const { detail, allProjectIds } = await getProjectDetailPageData(id);
  return <ProjectDetail projectDetail={detail} allProjectIds={allProjectIds} />;
}
