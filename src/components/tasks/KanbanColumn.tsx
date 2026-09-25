import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableTaskCard } from "./SortableTaskCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import type { Task } from "@/types/task"
import { cn } from "@/utils/cn"

interface KanbanColumnProps {
  id: string
  title: string
  tasks: Task[]
  color: string
  dot: string
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange?: (id: string, status: string) => void
  onCreateInColumn: (status: string) => void
}

export function KanbanColumn({ id, title, tasks, color, dot, onEdit, onDelete, onStatusChange, onCreateInColumn }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "column",
      status: id,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-xl border-2 border-dashed transition-colors min-h-[500px]",
        isOver ? "border-primary bg-primary/5" : "border-transparent bg-transparent",
        "space-y-3"
      )}
    >
      <div className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${color} ${isOver ? "ring-2 ring-primary ring-offset-2" : ""}`}>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${dot}`} />
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs bg-white/70 dark:bg-black/20">
            {tasks.length}
          </Badge>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onCreateInColumn(id)}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <SortableContext id={id} items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[200px] flex-1">
          {tasks.map((task) => (
            <SortableTaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
          ))}
          {tasks.length === 0 && (
            <div className="rounded-lg border border-dashed p-6 text-center text-xs text-muted-foreground bg-muted/20">
              <p>No tasks in {title}</p>
              <p className="mt-1 text-[11px]">Drag tasks here or click + to add</p>
              <Button variant="ghost" size="sm" className="mt-3 w-full gap-1" onClick={() => onCreateInColumn(id)}>
                <Plus className="h-3 w-3" /> Add task
              </Button>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
