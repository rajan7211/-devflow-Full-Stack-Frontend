import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PRIORITY_COLORS, PROJECT_STATUS_COLORS } from "@/utils/constants"
import type { Project } from "@/types/project"
import { formatDate } from "@/utils/formatDate"
import { FolderKanban, Calendar, Users, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [showActions, setShowActions] = useState(false)

  const progress = project.progress ?? (project.tasksCount ? Math.round(((project.completedTasks || 0) / project.tasksCount) * 100) : 0)

  return (
    <Card
      className="group hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600 group-hover:bg-violet-100 group-hover:scale-110 transition-all duration-300">
            <FolderKanban className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className={`text-[10px] ${PRIORITY_COLORS[project.priority]}`}>
              {project.priority}
            </Badge>
            <Badge className={`text-[10px] border ${PROJECT_STATUS_COLORS[project.status]}`}>
              {project.status}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 transition-opacity ${showActions ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link to={`/projects/${project._id}`} className="flex items-center gap-2 cursor-pointer">
                    <Eye className="h-4 w-4" /> View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(project)} className="gap-2">
                  <Edit className="h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(project._id)} className="gap-2 text-red-600 focus:text-red-600">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Link to={`/projects/${project._id}`} className="block mt-4">
          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">{project.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{project.description}</p>
        </Link>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>{project.completedTasks || 0} completed</span>
            <span>{project.tasksCount || 0} total tasks</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" /> {Array.isArray(project.members) ? project.members.length : 0}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" /> {formatDate(project.dueDate)}
            </span>
          </div>
          <div className="flex -space-x-2">
            {Array.from({ length: Math.min(3, Array.isArray(project.members) ? project.members.length : 0) }).map((_, i) => (
              <div
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[10px] font-medium text-primary"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {Array.isArray(project.members) && project.members.length > 3 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
