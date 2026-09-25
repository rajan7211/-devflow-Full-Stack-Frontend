import { PageHeader } from "@/components/common/PageHeader"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { ProjectProgress } from "@/components/dashboard/ProjectProgress"
import { TaskStatusChart } from "@/components/dashboard/TaskStatusChart"
import { TasksOverTimeChart } from "@/components/dashboard/TasksOverTimeChart"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { MyTasks } from "@/components/dashboard/MyTasks"
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines"
import { dashboardStats, teamWorkloadData } from "@/utils/mockDashboardData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your projects today."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <BarChart3 className="h-4 w-4" /> Export
            </Button>
            <Button size="sm">+ New Project</Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatsCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ProjectProgress />
          <TasksOverTimeChart />
          
          {/* Team Workload - Small bar chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Users className="h-4 w-4" /> Team Workload
              </CardTitle>
              <p className="text-xs text-muted-foreground">Tasks assigned vs completed per member</p>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamWorkloadData} layout="vertical" margin={{ left: 10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={50} />
                    <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
                    <Bar dataKey="tasks" name="Assigned" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={12} />
                    <Bar dataKey="completed" name="Completed" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <TaskStatusChart />
          <MyTasks />
          <UpcomingDeadlines />
        </div>
      </div>

      {/* Bottom Row - Recent Activity Full Width on mobile, 2 cols on large */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-violet-100">Weekly Goal</p>
                    <p className="mt-1 text-2xl font-bold">12/15 tasks</p>
                    <p className="mt-1 text-xs text-violet-200">You're doing great! 80% completed</p>
                    <div className="mt-3 h-2 w-32 overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-[80%] rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <span className="text-lg">🎯</span>
                  </div>
                </div>
                <Button size="sm" variant="secondary" className="mt-4 bg-white text-violet-600 hover:bg-violet-50">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overdue Tasks</span>
                <Badge variant="destructive" className="text-[11px]">2</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Today</span>
                <Badge variant="outline" className="text-[11px]">3</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completion Rate</span>
                <span className="font-medium">72%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Task Time</span>
                <span className="font-medium">2.4 days</span>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-dashed bg-muted/20 p-3 text-xs">
            <p className="font-medium">Phase 3 Complete</p>
            <p className="text-muted-foreground mt-1">
              Dashboard now uses Recharts for Task Distribution, Tasks Over Time, Team Workload. Mock data will be replaced with real API in Phase 17.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



