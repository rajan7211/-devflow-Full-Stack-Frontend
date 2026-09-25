import { EmptyState } from "@/components/common/EmptyState"
import { PageHeader } from "@/components/common/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { CreateProjectModal } from "@/components/projects/CreateProjectModal"
import { EditProjectModal } from "@/components/projects/EditProjectModal"
import { DeleteProjectDialog } from "@/components/projects/DeleteProjectDialog"
import { useProjects } from "@/hooks/useProjects"
import { useDebounce } from "@/hooks/useDebounce"
import { useToast } from "@/store/toastStore"
import { priorityOptions, statusOptions } from "@/utils/projectValidation"
import type { Project } from "@/types/project"
import { FolderKanban, Plus, Search, Loader2, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

export default function Projects() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [createOpen, setCreateOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [deleteProject, setDeleteProject] = useState<Project | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const { projects, total, isLoading, deleteProject: deleteMut, isDeleting } = useProjects({
    search: debouncedSearch,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
  })

  const { success, error } = useToast()

  const handleEdit = (project: Project) => {
    setEditProject(project)
  }

  const handleDelete = (id: string) => {
    const project = projects.find((p) => p._id === id)
    if (project) setDeleteProject(project)
  }

  const confirmDelete = async () => {
    if (!deleteProject) return
    try {
      await deleteMut(deleteProject._id)
      success("Project deleted", `"${deleteProject.name}" has been deleted`)
      setDeleteProject(null)
    } catch (err: any) {
      error("Failed to delete", err?.message || "Something went wrong")
    }
  }

  const clearFilters = () => {
    setSearch("")
    setStatusFilter("")
    setPriorityFilter("")
  }

  const hasFilters = search || statusFilter || priorityFilter

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description={`Manage and track all your team projects. ${total} total projects.`}
        actions={
          <Button className="gap-2" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" /> Create Project
          </Button>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div className="flex flex-1 gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2">
          <Select
            options={[{ value: "", label: "All Status" }, ...statusOptions]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-[140px]"
          />
          <Select
            options={[{ value: "", label: "All Priority" }, ...priorityOptions]}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-[140px]"
          />
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
              <SlidersHorizontal className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[240px] rounded-xl border bg-card animate-pulse">
              <div className="p-5 space-y-4">
                <div className="h-10 w-10 rounded-lg bg-muted" />
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-2 w-full bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-6 w-6" />}
          title={hasFilters ? "No projects found" : "No projects yet"}
          description={
            hasFilters
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Create your first project to start managing your work."
          }
          actionLabel={hasFilters ? "Clear Filters" : "+ Create Project"}
          onAction={hasFilters ? clearFilters : () => setCreateOpen(true)}
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
            <span>
              Showing {projects.length} of {total} projects
            </span>
            <span className="hidden sm:block">Phase 4 mock data with localStorage persistence</span>
          </div>
        </>
      )}

      <CreateProjectModal open={createOpen} onOpenChange={setCreateOpen} />

      <EditProjectModal project={editProject} open={!!editProject} onOpenChange={(open) => !open && setEditProject(null)} />

      <DeleteProjectDialog
        projectName={deleteProject?.name || ""}
        open={!!deleteProject}
        onOpenChange={(open) => !open && setDeleteProject(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />

      {isLoading && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 shadow-lg text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading projects...
        </div>
      )}
    </div>
  )
}
