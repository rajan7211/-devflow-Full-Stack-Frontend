import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectDetailsTabs } from "@/components/projects/ProjectDetailsTabs"
import { EditProjectModal } from "@/components/projects/EditProjectModal"
import { DeleteProjectDialog } from "@/components/projects/DeleteProjectDialog"
import { useProject, useProjects } from "@/hooks/useProjects"
import { useToast } from "@/store/toastStore"
import { PRIORITY_COLORS, PROJECT_STATUS_COLORS } from "@/utils/constants"
import { formatDate } from "@/utils/formatDate"
import { ArrowLeft, Calendar, Users, Edit, Trash2, Loader2 } from "lucide-react"
import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

export default function ProjectDetails() {
  const { projectId } = useParams()
  const { data: project, isLoading, isError } = useProject(projectId || "")
  const { deleteProject, isDeleting } = useProjects()
  const { success, error } = useToast()
  const navigate = useNavigate()

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleDelete = async () => {
    if (!project) return
    try {
      await deleteProject(project._id)
      success("Project deleted", `"${project.name}" has been deleted`)
      navigate("/projects", { replace: true })
    } catch (err: any) {
      error("Failed to delete", err?.message || "Something went wrong")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        <div className="h-12 w-full bg-muted animate-pulse rounded" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 h-[400px] bg-muted animate-pulse rounded-xl" />
          <div className="h-[400px] bg-muted animate-pulse rounded-xl" />
        </div>
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="space-y-6">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="font-medium">Project not found</p>
            <p className="text-sm text-muted-foreground mt-1">The project with ID "{projectId}" does not exist or was deleted.</p>
            <Button asChild className="mt-4">
              <Link to="/projects">Go to Projects</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <PageHeader
        title={project.name}
        description={project.description}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1" onClick={() => setEditOpen(true)}>
              <Edit className="h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" className="gap-1" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Badge className={`border ${PROJECT_STATUS_COLORS[project.status]}`}>{project.status}</Badge>
        <Badge variant="outline" className={`${PRIORITY_COLORS[project.priority]}`}>
          {project.priority} Priority
        </Badge>
        <Badge variant="outline" className="gap-1">
          <Calendar className="h-3 w-3" /> Due {formatDate(project.dueDate)}
        </Badge>
        <Badge variant="outline" className="gap-1">
          <Users className="h-3 w-3" /> {Array.isArray(project.members) ? project.members.length : 0} members
        </Badge>
        <Badge variant="secondary" className="gap-1">
          {project.completedTasks || 0}/{project.tasksCount || 0} tasks
        </Badge>
      </div>

      <ProjectDetailsTabs project={project} />

      <EditProjectModal project={project} open={editOpen} onOpenChange={setEditOpen} />

      <DeleteProjectDialog
        projectName={project.name}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      {isDeleting && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 rounded-lg bg-destructive text-destructive-foreground px-4 py-2 shadow-lg text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Deleting project...
        </div>
      )}
    </div>
  )
}
