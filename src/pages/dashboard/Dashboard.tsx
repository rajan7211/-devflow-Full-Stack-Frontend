import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderKanban, CheckSquare, Users, TrendingUp, Clock, Activity as ActivityIcon } from "lucide-react"

const stats = [
  { label: "Total Projects", value: "8", icon: FolderKanban, change: "+2 this month", color: "text-violet-600 bg-violet-50" },
  { label: "Active Tasks", value: "24", icon: CheckSquare, change: "6 in progress", color: "text-blue-600 bg-blue-50" },
  { label: "Completed Tasks", value: "42", icon: TrendingUp, change: "+12 this week", color: "text-emerald-600 bg-emerald-50" },
  { label: "Team Members", value: "12", icon: Users, change: "2 new", color: "text-amber-600 bg-amber-50" },
]

const recentActivity = [
  { user: "Ronak", action: 'created project "Book Marketplace"', time: "10 minutes ago", avatar: "R" },
  { user: "Rahul", action: 'completed "Login UI"', time: "30 minutes ago", avatar: "R" },
  { user: "Amit", action: 'updated "Payment API"', time: "1 hour ago", avatar: "A" },
  { user: "Priya", action: 'commented on "Search API"', time: "2 hours ago", avatar: "P" },
]

const myTasks = [
  { title: "Create Login UI", project: "Book Marketplace", priority: "HIGH", status: "IN_PROGRESS", due: "Sep 30" },
  { title: "Payment API Integration", project: "Book Marketplace", priority: "URGENT", status: "TODO", due: "Oct 2" },
  { title: "Search UI", project: "Book Marketplace", priority: "MEDIUM", status: "TODO", due: "Oct 5" },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your projects today."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Project Progress</CardTitle>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" /> 72% average
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Book Marketplace", progress: 72, total: 20, done: 12 },
                { name: "E-Commerce App", progress: 45, total: 32, done: 14 },
                { name: "Analytics Dashboard", progress: 90, total: 15, done: 13 },
              ].map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-muted-foreground">
                      {project.done}/{project.total} tasks
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-medium">Phase 1 Placeholder</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Real charts with Recharts will be implemented in Phase 3 using backend data.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ActivityIcon className="h-4 w-4" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {item.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      <span className="font-medium">{item.user}</span> {item.action}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">My Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myTasks.map((task, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{task.project}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {task.status}
                    </Badge>
                    <span className="ml-auto text-xs text-muted-foreground">{task.due}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
