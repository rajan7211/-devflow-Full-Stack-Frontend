import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import { projectProgressData } from "@/utils/mockDashboardData"
import { motion } from "framer-motion"

export function ProjectProgress() {
  const avgProgress = Math.round(
    projectProgressData.reduce((acc, p) => acc + p.progress, 0) / projectProgressData.length
  )

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">Project Progress</CardTitle>
        <Badge variant="outline" className="gap-1 bg-emerald-50 text-emerald-700 border-emerald-200">
          <TrendingUp className="h-3 w-3" /> {avgProgress}% average
        </Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        {projectProgressData.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{project.name}</span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {project.status}
                </Badge>
              </div>
              <span className="text-muted-foreground text-xs">
                {project.completed}/{project.total} tasks
              </span>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{project.progress}% completed</span>
                <span>{project.total - project.completed} remaining</span>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="pt-2">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Overall Completion</span>
              <span className="text-muted-foreground">{avgProgress}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" style={{ width: `${avgProgress}%` }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
