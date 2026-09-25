import { useState, useEffect } from "react"
import {
  DndContext,
  PointerSensor,
  closestCorners,
  DragOverlay,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type DropAnimation,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core"
import { KanbanColumn } from "./KanbanColumn"
import { TaskCard } from "./TaskCard"
import type { Task } from "@/types/task"

const columns = [
  { id: "TODO", label: "To Do", color: "bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800", dot: "bg-slate-400" },
  { id: "IN_PROGRESS", label: "In Progress", color: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900", dot: "bg-blue-500" },
  { id: "IN_REVIEW", label: "In Review", color: "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-900", dot: "bg-amber-500" },
  { id: "DONE", label: "Done", color: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-900", dot: "bg-emerald-500" },
]

interface KanbanBoardProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: string) => void
  onCreateInColumn: (status: string) => void
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
}

export function KanbanBoard({ tasks, onEdit, onDelete, onStatusChange, onCreateInColumn }: KanbanBoardProps) {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const task = localTasks.find((t) => t._id === String(event.active.id))
    if (task) setActiveTask(task)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    const activeTask = localTasks.find((t) => t._id === activeId)
    if (!activeTask) return

    let nextStatus: string | null = null

    if (columns.some((col) => col.id === overId)) {
      nextStatus = overId
    } else {
      const overTask = localTasks.find((t) => t._id === overId)
      if (overTask) nextStatus = overTask.status
    }

    if (!nextStatus || nextStatus === activeTask.status) return

    setLocalTasks((prev) =>
      prev.map((task) => (task._id === activeId ? { ...task, status: nextStatus as any } : task))
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    const activeTask = localTasks.find((t) => t._id === activeId)
    if (!activeTask) return

    let nextStatus: string | null = null

    if (columns.some((col) => col.id === overId)) {
      nextStatus = overId
    } else {
      const overTask = localTasks.find((t) => t._id === overId)
      if (overTask) nextStatus = overTask.status
    }

    if (!nextStatus || nextStatus === activeTask.status) return

    setLocalTasks((prev) =>
      prev.map((task) => (task._id === activeId ? { ...task, status: nextStatus as any } : task))
    )
    onStatusChange(activeId, nextStatus)
  }

  const getTasksByStatus = (status: string) => {
    return localTasks.filter((task) => task.status === status)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.label}
            tasks={getTasksByStatus(col.id)}
            color={col.color}
            dot={col.dot}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onCreateInColumn={onCreateInColumn}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? (
          <div className="rotate-3 shadow-xl">
            <TaskCard task={activeTask} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
