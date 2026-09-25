import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { priorityOptions, statusOptions, projectSchema, type ProjectFormData } from "@/utils/projectValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AlertCircle, Loader2 } from "lucide-react"
import { useEffect } from "react"
import type { Project } from "@/types/project"

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: ProjectFormData) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
  submitLabel?: string
}

export function ProjectForm({ project, onSubmit, onCancel, isSubmitting, submitLabel = "Create Project" }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      priority: (project?.priority as any) || "MEDIUM",
      status: (project?.status as any) || "PLANNING",
      startDate: project?.startDate ? project.startDate.split("T")[0] : new Date().toISOString().split("T")[0],
      dueDate: project?.dueDate ? project.dueDate.split("T")[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      members: [],
    },
  })

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description,
        priority: project.priority as any,
        status: project.status as any,
        startDate: project.startDate.split("T")[0],
        dueDate: project.dueDate.split("T")[0],
        members: [],
      })
    }
  }, [project, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Project Name *</Label>
        <Input
          id="name"
          placeholder="e.g., Book Marketplace"
          {...register("name")}
          className={errors.name ? "border-red-300" : ""}
        />
        {errors.name && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your project goals, features, and objectives..."
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
          <Label htmlFor="priority">Priority *</Label>
          <Select id="priority" options={priorityOptions} {...register("priority")} className={errors.priority ? "border-red-300" : ""} />
          {errors.priority && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.priority.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select id="status" options={statusOptions} {...register("status")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input id="startDate" type="date" {...register("startDate")} className={errors.startDate ? "border-red-300" : ""} />
          {errors.startDate && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input id="dueDate" type="date" {...register("dueDate")} className={errors.dueDate ? "border-red-300" : ""} />
          {errors.dueDate && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.dueDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Members</p>
        <p className="mt-1">Team member selection will be fully functional in Phase 8 (Team Management). For now, project owner is auto-added.</p>
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
