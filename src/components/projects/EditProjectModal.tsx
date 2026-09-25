import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ProjectForm } from "./ProjectForm"
import { useProjects } from "@/hooks/useProjects"
import { useToast } from "@/store/toastStore"
import type { ProjectFormData } from "@/utils/projectValidation"
import type { Project } from "@/types/project"
import { useState } from "react"

interface EditProjectModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProjectModal({ project, open, onOpenChange }: EditProjectModalProps) {
  const { updateProject, isUpdating } = useProjects()
  const { success, error } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: ProjectFormData) => {
    if (!project) return
    setIsSubmitting(true)
    try {
      await updateProject({
        id: project._id,
        data: {
          name: data.name,
          description: data.description,
          priority: data.priority as any,
          status: data.status as any,
          startDate: data.startDate,
          dueDate: data.dueDate,
          members: data.members,
        },
      })

      success("Project updated!", `"${data.name}" has been updated`)
      onOpenChange(false)
    } catch (err: any) {
      error("Failed to update project", err?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Update the project details below.</DialogDescription>
        </DialogHeader>
        <ProjectForm
          project={project}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting || isUpdating}
          submitLabel="Update Project"
        />
      </DialogContent>
    </Dialog>
  )
}
