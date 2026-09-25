import { z } from "zod"
import { PRIORITY, PROJECT_STATUS } from "@/utils/constants"

export const priorityOptions = Object.values(PRIORITY).map((value) => ({
  value,
  label: value,
}))

export const statusOptions = Object.values(PROJECT_STATUS).map((value) => ({
  value,
  label: value,
}))

export const projectSchema = z
  .object({
    name: z.string().trim().min(3, "Project name must be at least 3 characters").max(100),
    description: z.string().trim().min(10, "Description must be at least 10 characters").max(500),
    priority: z.enum([PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH, PRIORITY.URGENT]),
    status: z.enum([PROJECT_STATUS.PLANNING, PROJECT_STATUS.ACTIVE, PROJECT_STATUS.ON_HOLD, PROJECT_STATUS.COMPLETED, PROJECT_STATUS.ARCHIVED]),
    startDate: z.string().min(1, "Start date is required"),
    dueDate: z.string().min(1, "Due date is required"),
    members: z.array(z.string()),
  })
  .refine((data) => !data.startDate || !data.dueDate || new Date(data.dueDate) >= new Date(data.startDate), {
    path: ["dueDate"],
    message: "Due date must be on or after the start date",
  })

export type ProjectFormData = z.infer<typeof projectSchema>
