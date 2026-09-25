import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { TaskForm } from "./TaskForm"
import { useTasks } from "@/hooks/useTasks"
import { useToast } from "@/store/toastStore"
import type { TaskFormData } from "@/utils/taskValidation"
import { useState } from "react"

interface CreateTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultProject?: string
  defaultStatus?: string
}

export function CreateTaskModal({ open, onOpenChange, defaultProject, defaultStatus }: CreateTaskModalProps) {
  const { createTask, isCreating } = useTasks()
  const { success, error } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true)
    try {
      await createTask({
        title: data.title,
        description: data.description,
        project: data.project || defaultProject || "",
        assignee: data.assignee,
        priority: data.priority as any,
        status: (data.status as any) || (defaultStatus as any) || "TODO",
        labels: data.labels,
        dueDate: data.dueDate,
      })

      success("Task created!", `"${data.title}" has been created`)
      onOpenChange(false)
    } catch (err: any) {
      error("Failed to create task", err?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a new task to your project with assignee, priority, and due date.</DialogDescription>
        </DialogHeader>
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting || isCreating}
          submitLabel="Create Task"
        />
      </DialogContent>
    </Dialog>
  )
}
