import { PageHeader } from "@/components/common/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal"
import { EditTaskModal } from "@/components/tasks/EditTaskModal"
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog"
import { KanbanBoard } from "@/components/tasks/KanbanBoard"
import { useTasks } from "@/hooks/useTasks"
import { useDebounce } from "@/hooks/useDebounce"
import { useToast } from "@/store/toastStore"
import { taskPriorityOptions, taskStatusOptions } from "@/utils/taskValidation"
import { mockUsersForProjects } from "@/utils/mockProjectsData"
import { useProjects } from "@/hooks/useProjects"
import type { Task } from "@/types/task"
import { Plus, Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react"
import { useState } from "react"
import { EmptyState } from "@/components/common/EmptyState"
import { Badge } from "@/components/ui/badge"

export default function Tasks() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [assigneeFilter, setAssigneeFilter] = useState("")
  const [projectFilter, setProjectFilter] = useState("")
  const [viewMode, setViewMode] = useState<"board" | "list">("board")
  const [createOpen, setCreateOpen] = useState(false)
  const [createStatus, setCreateStatus] = useState<string | undefined>(undefined)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [deleteTask, setDeleteTask] = useState<Task | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const { projects } = useProjects()
  const { tasks, total, isLoading, deleteTask: deleteMut, updateStatus, isDeleting } = useTasks({
    search: debouncedSearch,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
    assignee: assigneeFilter || undefined,
    project: projectFilter || undefined,
  })

  const { success, error } = useToast()

  const handleEdit = (task: Task) => setEditTask(task)
  const handleDelete = (id: string) => {
    const task = tasks.find((t) => t._id === id)
    if (task) setDeleteTask(task)
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status })
      success("Status updated", `Task moved to ${status}`)
    } catch (err: any) {
      error("Failed to update status", err?.message)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTask) return
    try {
      await deleteMut(deleteTask._id)
      success("Task deleted", `"${deleteTask.title}" has been deleted`)
      setDeleteTask(null)
    } catch (err: any) {
      error("Failed to delete", err?.message)
    }
  }

  const clearFilters = () => {
    setSearch("")
    setStatusFilter("")
    setPriorityFilter("")
    setAssigneeFilter("")
    setProjectFilter("")
  }

  const hasFilters = search || statusFilter || priorityFilter || assigneeFilter || projectFilter

  const handleCreateInColumn = (status: string) => {
    setCreateStatus(status)
    setCreateOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description={`Track and manage tasks across all projects. ${total} total tasks. Drag & drop to change status.`}
        actions={
          <div className="flex gap-2">
            <div className="hidden sm:flex rounded-lg border p-1">
              <Button
                variant={viewMode === "board" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2"
                onClick={() => setViewMode("board")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button className="gap-2" onClick={() => { setCreateStatus(undefined); setCreateOpen(true) }}>
              <Plus className="h-4 w-4" /> Create Task
            </Button>
          </div>
        }
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Select
              options={[{ value: "", label: "All Status" }, ...taskStatusOptions]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-[130px]"
            />
            <Select
              options={[{ value: "", label: "All Priority" }, ...taskPriorityOptions]}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-[130px]"
            />
            <Select
              options={[{ value: "", label: "All Assignee" }, ...mockUsersForProjects.map((u) => ({ value: u._id, label: u.name }))]}
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="w-[140px]"
            />
            <Select
              options={[{ value: "", label: "All Projects" }, ...projects.map((p) => ({ value: p._id, label: p.name }))]}
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-[160px]"
            />
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 shrink-0">
                <SlidersHorizontal className="h-4 w-4" /> Clear
              </Button>
            )}
          </div>
        </div>

        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            {search && <Badge variant="secondary" className="gap-1">Search: {search}</Badge>}
            {statusFilter && <Badge variant="secondary">Status: {statusFilter}</Badge>}
            {priorityFilter && <Badge variant="secondary">Priority: {priorityFilter}</Badge>}
            {assigneeFilter && <Badge variant="secondary">Assignee: {mockUsersForProjects.find((u) => u._id === assigneeFilter)?.name}</Badge>}
            {projectFilter && <Badge variant="secondary">Project: {projects.find((p) => p._id === projectFilter)?.name}</Badge>}
            <span className="text-xs text-muted-foreground self-center">{total} results</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, colIdx) => (
            <div key={colIdx} className="space-y-3">
              <div className="h-10 rounded-lg bg-muted border animate-pulse" />
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-[180px] rounded-xl border bg-card animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No tasks found" : "No tasks yet"}
          description={hasFilters ? "Try adjusting your filters" : "Create your first task to get started"}
          actionLabel={hasFilters ? "Clear Filters" : "+ Create Task"}
          onAction={hasFilters ? clearFilters : () => setCreateOpen(true)}
        />
      ) : viewMode === "board" ? (
        <KanbanBoard
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onCreateInColumn={handleCreateInColumn}
        />
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task._id} className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/20">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{task.title}</p>
                <p className="text-xs text-muted-foreground truncate">{task.description}</p>
              </div>
              <Badge variant="outline" className="text-[11px]">{task.status}</Badge>
              <Badge variant="outline" className="text-[11px]">{task.priority}</Badge>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(task)}>Edit</Button>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-4 text-xs">
        <p className="font-semibold flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white text-[10px]">6</span>
          Phase 6 — Kanban Drag & Drop Live!
        </p>
        <p className="text-muted-foreground mt-1.5 leading-relaxed">
          ✅ Drag tasks from <span className="font-medium text-foreground">TODO → IN_PROGRESS → IN_REVIEW → DONE</span> to update status. 
          Uses <code className="bg-muted px-1 py-0.5 rounded text-[11px]">dnd-kit</code> with PointerSensor (8px activation), closestCorners collision, DragOverlay with rotate-3 shadow. 
          Status updates are optimistic + persisted to localStorage + backend when available. Try dragging!
        </p>
      </div>

      <CreateTaskModal open={createOpen} onOpenChange={setCreateOpen} defaultStatus={createStatus} defaultProject={projectFilter || undefined} />

      <EditTaskModal task={editTask} open={!!editTask} onOpenChange={(open) => !open && setEditTask(null)} />

      <DeleteTaskDialog
        taskTitle={deleteTask?.title || ""}
        open={!!deleteTask}
        onOpenChange={(open) => !open && setDeleteTask(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
