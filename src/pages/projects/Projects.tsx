import { EmptyState } from "@/components/common/EmptyState"
import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FolderKanban, Plus, Search } from "lucide-react"

const mockProjects = [
  {
    id: "1",
    name: "Book Marketplace",
    description: "Build an online book marketplace with search, cart, and payments.",
    status: "ACTIVE",
    progress: 72,
    members: 8,
    tasks: { total: 20, completed: 12 },
  },
  {
    id: "2",
    name: "E-Commerce Mobile App",
    description: "Cross-platform mobile shopping experience.",
    status: "PLANNING",
    progress: 15,
    members: 5,
    tasks: { total: 32, completed: 5 },
  },
  {
    id: "3",
    name: "Analytics Dashboard",
    description: "Real-time analytics for business metrics.",
    status: "ACTIVE",
    progress: 90,
    members: 4,
    tasks: { total: 15, completed: 13 },
  },
]

export default function Projects() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage and track all your team projects."
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Project
          </Button>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Status ▼</Button>
          <Button variant="outline" size="sm">Priority ▼</Button>
        </div>
      </div>

      {mockProjects.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-6 w-6" />}
          title="No projects yet"
          description="Create your first project to start managing your work."
          actionLabel="+ Create Project"
          onAction={() => {}}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600 group-hover:bg-violet-100 transition-colors">
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {project.status}
                  </Badge>
                </div>
                <h3 className="mt-4 font-semibold">{project.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.members} members</span>
                  <span>
                    {project.tasks.completed}/{project.tasks.total} tasks
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="rounded-lg border border-dashed p-4 text-sm bg-muted/30">
        <p className="font-medium">Phase 1 Note</p>
        <p className="text-muted-foreground">Project CRUD modals, API integration, and real data will come in Phase 4.</p>
      </div>
    </div>
  )
}
