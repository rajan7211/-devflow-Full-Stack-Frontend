import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { TaskForm } from "./TaskForm"
import { useTasks } from "@/hooks/useTasks"
import { useToast } from "@/store/toastStore"
import type { TaskFormData } from "@/utils/taskValidation"
import type { Task } from "@/types/task"
import { useState } from "react"

interface EditTaskModalProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTaskModal({ task, open, onOpenChange }: EditTaskModalProps) {
  const { updateTask, isUpdating } = useTasks()
  const { success, error } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: TaskFormData) => {
    if (!task) return
    setIsSubmitting(true)
    try {
      await updateTask({
        id: task._id,
        data: {
          title: data.title,
          description: data.description,
          project: data.project,
          assignee: data.assignee,
          priority: data.priority as any,
          status: data.status as any,
          labels: data.labels,
          dueDate: data.dueDate,
        },
      })

      success("Task updated!", `"${data.title}" has been updated`)
      onOpenChange(false)
    } catch (err: any) {
      error("Failed to update task", err?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update the task details below.</DialogDescription>
        </DialogHeader>
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting || isUpdating}
          submitLabel="Update Task"
        />
      </DialogContent>
    </Dialog>
  )
}
