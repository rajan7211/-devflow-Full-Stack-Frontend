import { z } from "zod"

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  project: z.string().min(1, "Project is required"),
  assignee: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"], {
    message: "Priority is required",
  }),
  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
  labels: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
})

export type TaskFormData = z.infer<typeof taskSchema>

export const taskPriorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
]

export const taskStatusOptions = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "IN_REVIEW", label: "In Review" },
  { value: "DONE", label: "Done" },
]

export const labelOptions = [
  "Frontend",
  "Backend",
  "API",
  "UI",
  "Bug",
  "Feature",
  "Design",
  "Testing",
  "Documentation",
  "Payment",
  "Search",
  "Auth",
]
