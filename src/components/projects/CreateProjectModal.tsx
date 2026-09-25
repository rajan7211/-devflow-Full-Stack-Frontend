import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ProjectForm } from "./ProjectForm"
import { useProjects } from "@/hooks/useProjects"
import { useToast } from "@/store/toastStore"
import type { ProjectFormData } from "@/utils/projectValidation"
import { useState } from "react"

interface CreateProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps) {
  const { createProject, isCreating } = useProjects()
  const { success, error } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)
    try {
      await createProject({
        name: data.name,
        description: data.description,
        priority: data.priority as any,
        startDate: data.startDate,
        dueDate: data.dueDate,
        members: data.members,
      })

      success("Project created!", `"${data.name}" has been created successfully`)
      onOpenChange(false)
    } catch (err: any) {
      error("Failed to create project", err?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Fill in the details to create a new project for your team.</DialogDescription>
        </DialogHeader>
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting || isCreating}
          submitLabel="Create Project"
        />
      </DialogContent>
    </Dialog>
  )
}
