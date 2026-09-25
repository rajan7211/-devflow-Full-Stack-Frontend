import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PRIORITY_COLORS } from "@/utils/constants"
import { Plus, Search } from "lucide-react"

const columns = [
  { id: "TODO", label: "To Do", color: "bg-slate-100" },
  { id: "IN_PROGRESS", label: "In Progress", color: "bg-blue-50" },
  { id: "IN_REVIEW", label: "In Review", color: "bg-amber-50" },
  { id: "DONE", label: "Done", color: "bg-emerald-50" },
]

const mockTasks = [
  { id: "1", title: "Create Login UI", desc: "Implement login page with validation", priority: "HIGH" as const, assignee: "Rahul", due: "Sep 30", status: "TODO" },
  { id: "2", title: "Search UI", desc: "Book search with filters", priority: "MEDIUM" as const, assignee: "Priya", due: "Oct 2", status: "TODO" },
  { id: "3", title: "Payment API", desc: "Stripe integration", priority: "URGENT" as const, assignee: "Amit", due: "Oct 1", status: "IN_PROGRESS" },
  { id: "4", title: "Register API", desc: "User registration endpoint", priority: "HIGH" as const, assignee: "Ronak", due: "Sep 28", status: "IN_REVIEW" },
  { id: "5", title: "Navbar", desc: "Responsive navbar", priority: "LOW" as const, assignee: "Rahul", due: "Sep 25", status: "DONE" },
]

export default function Tasks() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Track and manage tasks across all projects."
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Task
          </Button>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-9" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <Button variant="outline" size="sm">Status</Button>
          <Button variant="outline" size="sm">Priority</Button>
          <Button variant="outline" size="sm">Assignee</Button>
          <Button variant="outline" size="sm">Project</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.id} className="space-y-3">
            <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${col.color}`}>
              <h3 className="text-sm font-semibold">{col.label}</h3>
              <Badge variant="secondary" className="text-xs">
                {mockTasks.filter((t) => t.status === col.id).length}
              </Badge>
            </div>

            <div className="space-y-3 min-h-[200px]">
              {mockTasks
                .filter((t) => t.status === col.id)
                .map((task) => (
                  <Card key={task.id} className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{task.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${PRIORITY_COLORS[task.priority]}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-muted-foreground">{task.due}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                          {task.assignee[0]}
                        </div>
                        <span className="text-xs text-muted-foreground">{task.assignee}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed p-4 text-sm bg-muted/30">
        <p className="font-medium">Phase 1 Preview</p>
        <p className="text-muted-foreground">Kanban drag-and-drop with dnd-kit will be fully functional in Phase 6. Task creation modal in Phase 5.</p>
      </div>
    </div>
  )
}
