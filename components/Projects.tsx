"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiArrowClockwiseBold, PiFolderDashedBold } from "react-icons/pi";
import Container from "./Container";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import { ProjectStack, ProjectList, DeviceCard, GroupLabel } from "./projects/ProjectLayouts";
import { getAllProjects, type Project } from "@/lib/projectService";
import { getAllProjectDetails } from "@/lib/projectDetailService";
import {
  PROJECT_CATEGORIES,
  getProjectCategoryMeta,
  getProjectYear,
  normalizeProjectCategory,
} from "@/lib/projectCategories";

const STACK_COUNT = 5;
const LIST_COUNT = 6;
const GRID_PAGE_SIZE = 6;

function ProjectsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat project" className="space-y-6">
      <div className="skeleton h-[min(76dvh,600px)] w-full !rounded-[2.5rem]" />
      <div className="space-y-3 pt-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-20 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectYears, setProjectYears] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(GRID_PAGE_SIZE);

  const filterCategories = useMemo(
    () => ["All", ...PROJECT_CATEGORIES.map((category) => category.value)],
    []
  );

  const categoryCounts = useMemo(
    () =>
      projects.reduce<Record<string, number>>((acc, project) => {
        const key = normalizeProjectCategory(project.category);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    [projects]
  );

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          selectedCategory === "All" ||
          normalizeProjectCategory(project.category) === selectedCategory
      ),
    [projects, selectedCategory]
  );

  const stackProjects = filteredProjects.slice(0, STACK_COUNT);
  const listProjects = filteredProjects.slice(STACK_COUNT, STACK_COUNT + LIST_COUNT);
  const gridProjects = filteredProjects.slice(STACK_COUNT + LIST_COUNT);
  const visibleGrid = gridProjects.slice(0, visibleCount);
  const remainingProjects = gridProjects.length - visibleGrid.length;
  const shownCount = stackProjects.length + listProjects.length + visibleGrid.length;

  const getYear = useCallback(
    (project: Project) => (project.id && projectYears[project.id]) || getProjectYear(project.createdAt),
    [projectYears]
  );

  useEffect(() => {
    setVisibleCount(GRID_PAGE_SIZE);
  }, [selectedCategory]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectData, projectDetails] = await Promise.all([
        getAllProjects(),
        getAllProjectDetails(),
      ]);

      const yearMap = projectDetails.reduce<Record<string, string>>((acc, detail) => {
        if (!detail.projectId) return acc;
        const year = getProjectYear(null, detail.date);
        if (year) acc[detail.projectId] = year;
        return acc;
      }, {});

      setProjects(projectData);
      setProjectYears(yearMap);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Gagal mengambil data proyek: ${err.message}`
          : "Gagal mengambil data proyek."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 md:py-36">
      <Container>
        <SectionHeader
          index="04"
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <em className="font-normal italic text-accent">shipped</em>
            </>
          }
          description="Project dari klien, instansi, magang, sampai eksperimen pribadi. Klik salah satu untuk melihat ceritanya."
          aside={
            !loading &&
            !error && (
              <p className="font-display text-7xl font-semibold tabular-nums leading-none tracking-tighter text-ink/10 md:text-8xl">
                {String(projects.length).padStart(2, "0")}
              </p>
            )
          }
        />

        <Reveal className="-mx-5 mb-12 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Filter projects" className="isolate flex w-max gap-1.5 rounded-full bg-sand p-1.5">
            {filterCategories.map((category) => {
              const isActive = selectedCategory === category;
              const count = category === "All" ? projects.length : categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-canvas" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    {category === "All" ? "All work" : getProjectCategoryMeta(category).label}
                  </span>
                  {!loading && (
                    <span
                      className={`relative font-mono text-[11px] tabular-nums ${
                        isActive ? "text-accent-200" : "text-ink-faint"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {loading ? (
          <ProjectsSkeleton />
        ) : error ? (
          <div role="alert" className="surface flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="font-display text-2xl font-semibold tracking-tight">Project belum bisa dimuat.</p>
              <p className="mt-2 max-w-[60ch] text-ink-muted">{error}</p>
            </div>
            <button type="button" onClick={fetchProjects} className="btn-primary shrink-0">
              <PiArrowClockwiseBold />
              Coba lagi
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center rounded-[2rem] border-2 border-dashed border-ink/10 px-6 py-20 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-sand text-3xl text-ink-muted">
              <PiFolderDashedBold />
            </span>
            <p className="mt-6 font-display text-2xl font-semibold tracking-tight">
              Belum ada project di kategori ini
            </p>
            <p className="mt-2 max-w-[44ch] text-ink-muted">
              Project baru akan muncul di sini. Sementara itu, lihat semua project yang sudah ada.
            </p>
            <button type="button" onClick={() => setSelectedCategory("All")} className="btn-ghost mt-8">
              Lihat semua project
            </button>
          </div>
        ) : (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-24 md:space-y-32"
          >
            <div>
              <GroupLabel index="A" title="Highlights" note={`${stackProjects.length} project`} />
              <ProjectStack projects={stackProjects} getYear={getYear} />
            </div>

            {listProjects.length > 0 && (
              <div>
                <GroupLabel index="B" title="More work" note={`${listProjects.length} project`} />
                <ProjectList projects={listProjects} startIndex={STACK_COUNT} getYear={getYear} />
              </div>
            )}

            {gridProjects.length > 0 && (
              <div>
                <GroupLabel index="C" title="The archive" note={`${gridProjects.length} project`} />
                <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {visibleGrid.map((project, i) => (
                      <DeviceCard key={project.id} project={project} index={i} getYear={getYear} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {!loading && !error && filteredProjects.length > 0 && (
          <div className="mt-14 flex flex-col items-center gap-4">
            <p className="font-mono text-xs tabular-nums text-ink-muted">
              {shownCount} / {filteredProjects.length} project
            </p>
            {remainingProjects > 0 && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + GRID_PAGE_SIZE)}
                className="btn-ghost"
              >
                Load more
                <span className="font-mono text-xs tabular-nums text-ink-faint">+{remainingProjects}</span>
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
