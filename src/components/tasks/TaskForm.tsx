import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { taskPriorityOptions, taskStatusOptions, labelOptions, taskSchema, type TaskFormData } from "@/utils/taskValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AlertCircle, Loader2, X } from "lucide-react"
import { useEffect, useState } from "react"
import type { Task } from "@/types/task"
import { useProjects } from "@/hooks/useProjects"
import { mockUsersForProjects } from "@/utils/mockProjectsData"
import { Badge } from "@/components/ui/badge"

interface TaskFormProps {
  task?: Task
  onSubmit: (data: TaskFormData) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
  submitLabel?: string
}

export function TaskForm({ task, onSubmit, onCancel, isSubmitting, submitLabel = "Create Task" }: TaskFormProps) {
  const { projects } = useProjects()
  const [selectedLabels, setSelectedLabels] = useState<string[]>(task?.labels || [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      project: typeof task?.project === "string" ? task.project : (task?.project as any)?._id || "",
      assignee: typeof task?.assignee === "string" ? task.assignee : (task?.assignee as any)?._id || "",
      priority: (task?.priority as any) || "MEDIUM",
      status: (task?.status as any) || "TODO",
      labels: task?.labels || [],
      dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
    },
  })

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        project: typeof task.project === "string" ? task.project : (task.project as any)?._id || "",
        assignee: typeof task.assignee === "string" ? task.assignee : (task.assignee as any)?._id || "",
        priority: task.priority as any,
        status: task.status as any,
        labels: task.labels || [],
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      })
      setSelectedLabels(task.labels || [])
    }
  }, [task, reset])

  const handleLabelToggle = (label: string) => {
    const newLabels = selectedLabels.includes(label)
      ? selectedLabels.filter((l) => l !== label)
      : [...selectedLabels, label]
    setSelectedLabels(newLabels)
    setValue("labels", newLabels, { shouldValidate: true })
  }

  const currentLabels = watch("labels") || selectedLabels

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="title">Task Title *</Label>
        <Input id="title" placeholder="e.g., Create Login UI" {...register("title")} className={errors.title ? "border-red-300" : ""} />
        {errors.title && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe the task, acceptance criteria, and technical details..."
          rows={4}
          {...register("description")}
          className={errors.description ? "border-red-300" : ""}
        />
        {errors.description && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="project">Project *</Label>
          <Select
            id="project"
            options={projects.map((p) => ({ value: p._id, label: p.name }))}
            placeholder="Select project"
            {...register("project")}
            className={errors.project ? "border-red-300" : ""}
          />
          {errors.project && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.project.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignee">Assignee</Label>
          <Select
            id="assignee"
            options={[
              { value: "", label: "Unassigned" },
              ...mockUsersForProjects.map((u) => ({ value: u._id, label: u.name })),
            ]}
            {...register("assignee")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority *</Label>
          <Select id="priority" options={taskPriorityOptions} {...register("priority")} className={errors.priority ? "border-red-300" : ""} />
          {errors.priority && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.priority.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select id="status" options={taskStatusOptions} {...register("status")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Labels</Label>
        <div className="flex flex-wrap gap-1.5 rounded-lg border p-3 min-h-[60px]">
          {labelOptions.map((label) => (
            <Badge
              key={label}
              variant={currentLabels.includes(label) ? "default" : "outline"}
              className="cursor-pointer text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => handleLabelToggle(label)}
            >
              {label}
              {currentLabels.includes(label) && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">Click to select/deselect labels. Selected: {currentLabels.length}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input id="dueDate" type="date" {...register("dueDate")} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || !isValid} className="min-w-[120px]">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  )
}
