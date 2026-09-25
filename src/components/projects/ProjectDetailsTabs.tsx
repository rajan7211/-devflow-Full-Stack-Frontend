import { cn } from "@/utils/cn"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockUsersForProjects } from "@/utils/mockProjectsData"
import { recentActivityData, myTasksData } from "@/utils/mockDashboardData"
import { Calendar, Users, CheckSquare, Activity, Folder, Clock, UserPlus, Plus } from "lucide-react"
import { formatDate } from "@/utils/formatDate"
import type { Project } from "@/types/project"

const tabs = [
  { id: "overview", label: "Overview", icon: Folder },
  { id: "tasks", label: "Tasks", icon: CheckSquare, count: 20 },
  { id: "members", label: "Members", icon: Users, count: 8 },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "files", label: "Files", icon: Folder },
]

interface ProjectDetailsTabsProps {
  project: Project
}

export function ProjectDetailsTabs({ project }: ProjectDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="border-b">
        <nav className="flex gap-6 -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count && (
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === "overview" && <OverviewTab project={project} />}
        {activeTab === "tasks" && <TasksTab project={project} />}
        {activeTab === "members" && <MembersTab project={project} />}
        {activeTab === "activity" && <ActivityTab project={project} />}
        {activeTab === "files" && <FilesTab project={project} />}
      </div>
    </div>
  )
}

function OverviewTab({ project }: { project: Project }) {
  const progress = project.progress || 0

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Project Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-2xl font-bold">{project.tasksCount || 0}</p>
                <p className="text-xs text-muted-foreground">Total Tasks</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950">
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{project.completedTasks || 0}</p>
                <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70">Completed</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{(project.tasksCount || 0) - (project.completedTasks || 0)}</p>
                <p className="text-xs text-blue-700/70 dark:text-blue-300/70">Remaining</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="font-medium text-sm">Project Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formatDate(project.startDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formatDate(project.dueDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority</span>
                  <Badge variant="outline">{project.priority}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge>{project.status}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myTasksData.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.status} • {task.priority}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">{task.due}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" /> Team Members ({mockUsersForProjects.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUsersForProjects.slice(0, 5).map((member) => (
              <div key={member._id} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
              <UserPlus className="h-4 w-4" /> Invite Member
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" /> Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Payment API</span>
              <Badge variant="destructive" className="text-[10px]">Tomorrow</Badge>
            </div>
            <div className="flex justify-between">
              <span>Search UI</span>
              <Badge variant="outline" className="text-[10px]">Oct 2</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TasksTab({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Tasks for {project.name}</CardTitle>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {myTasksData.map((task) => (
            <div key={task.id} className="rounded-lg border p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{project.name} • {task.project}</p>
                </div>
                <Badge variant="outline">{task.status}</Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Badge variant="secondary" className="text-[10px]">{task.priority}</Badge>
                <Badge variant="outline" className="text-[10px]">{task.due}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-dashed p-3 text-xs text-muted-foreground text-center">
          Full Kanban board with drag-and-drop will be implemented in Phase 6
        </div>
      </CardContent>
    </Card>
  )
}

function MembersTab({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Members • {mockUsersForProjects.length} total</CardTitle>
        <Button size="sm" className="gap-1">
          <UserPlus className="h-4 w-4" /> Invite
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b text-left text-xs text-muted-foreground">
              <tr>
                <th className="pb-2 font-medium">Member</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Tasks</th>
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockUsersForProjects.map((member) => (
                <tr key={member._id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline" className="text-[10px]">
                      {member._id.includes("admin") ? "ADMIN" : member._id.includes("manager") ? "MANAGER" : "DEVELOPER"}
                    </Badge>
                  </td>
                  <td className="py-3">5 tasks</td>
                  <td className="py-3">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Project ID: {project._id} • Owner: {String(project.owner)}</p>
      </CardContent>
    </Card>
  )
}

function ActivityTab({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Activity for {project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivityData.map((activity) => (
            <div key={activity.id} className="flex gap-3 rounded-lg border p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                  <span className="font-medium">"{activity.target}"</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function FilesTab({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Files for {project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed p-8 text-center">
          <Folder className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <h3 className="mt-3 font-medium">No files yet</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
            Upload project files, designs, documents. File upload will be implemented in Phase 16 with support for images, PDFs, docs.
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            Upload File (Coming Soon)
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Project: {project._id}</p>
      </CardContent>
    </Card>
  )
}
