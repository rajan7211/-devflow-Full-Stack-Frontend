import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PRIORITY_COLORS } from "@/utils/constants"
import type { Task } from "@/types/task"
import { formatDate } from "@/utils/formatDate"
import { Calendar, MoreHorizontal, Edit, Trash2, Eye, MessageSquare, Paperclip } from "lucide-react"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { mockUsersForProjects } from "@/utils/mockProjectsData"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange?: (id: string, status: string) => void
  dragHandleProps?: {
    attributes?: any
    listeners?: any
  }
}

function getAssigneeName(assignee: any): string {
  if (!assignee) return "Unassigned"
  if (typeof assignee === "string") {
    const user = mockUsersForProjects.find((u) => u._id === assignee)
    return user?.name || assignee
  }
  return assignee.name || "Unassigned"
}

function getAssigneeAvatar(assignee: any): string {
  if (!assignee) return "?"
  if (typeof assignee === "string") {
    const user = mockUsersForProjects.find((u) => u._id === assignee)
    return user?.avatar || assignee[0]?.toUpperCase() || "?"
  }
  return assignee.avatar || assignee.name?.[0] || "?"
}

function getProjectName(project: any): string {
  if (typeof project === "string") return project
  return project?.name || project
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange, dragHandleProps }: TaskCardProps) {
  const assigneeName = getAssigneeName(task.assignee)
  const assigneeAvatar = getAssigneeAvatar(task.assignee)
  const projectName = getProjectName(task.project)

  const isOverdue = task.dueDate ? new Date(task.dueDate) < new Date() && task.status !== "DONE" : false

  return (
    <Card
      {...dragHandleProps?.attributes}
      {...dragHandleProps?.listeners}
      className={dragHandleProps ? "group hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-grab active:cursor-grabbing touch-none" : "group hover:shadow-md hover:border-primary/20 transition-all duration-200"}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/tasks/${task._id}`} className="flex-1 min-w-0" onClick={(event) => event.stopPropagation()}>
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {task.title}
            </h4>
          </Link>

          <div className="flex items-center gap-1" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to={`/tasks/${task._id}`} className="flex items-center gap-2 cursor-pointer">
                    <Eye className="h-4 w-4" /> View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(task)} className="gap-2">
                  <Edit className="h-4 w-4" /> Edit Task
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1 text-[11px] font-medium text-muted-foreground">Move to</div>
                {["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => onStatusChange?.(task._id, status)}
                    disabled={task.status === status}
                    className="text-xs"
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(task._id)} className="gap-2 text-red-600 focus:text-red-600">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {task.description}
        </p>

        {task.labels && task.labels.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {task.labels.slice(0, 3).map((label) => (
              <Badge key={label} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                {label}
              </Badge>
            ))}
            {task.labels.length > 3 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                +{task.labels.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </Badge>
            {isOverdue && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                Overdue
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> {task.comments?.length || 0}
            </span>
            <span className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" /> {task.attachments?.length || 0}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
              {assigneeAvatar}
            </div>
            <span className="text-xs text-muted-foreground truncate max-w-[80px]">{assigneeName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className={isOverdue ? "text-red-600 font-medium" : ""}>
              {task.dueDate ? formatDate(task.dueDate) : "No due"}
            </span>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-muted-foreground">
          Project: <span className="font-medium">{projectName}</span>
        </div>
      </CardContent>
    </Card>
  )
}
