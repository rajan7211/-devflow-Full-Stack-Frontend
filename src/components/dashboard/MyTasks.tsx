import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { myTasksData } from "@/utils/mockDashboardData"
import { PRIORITY_COLORS } from "@/utils/constants"
import { Calendar, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function MyTasks() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">My Tasks</CardTitle>
        <Badge variant="secondary" className="text-xs">
          {myTasksData.length} active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {myTasksData.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group rounded-lg border p-3 hover:shadow-sm hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {task.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground truncate">{task.project}</p>
              </div>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 shrink-0 ${PRIORITY_COLORS[task.priority]}`}>
                {task.priority}
              </Badge>
            </div>

            <div className="mt-2.5 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{task.progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                  {task.status}
                </Badge>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {task.due}
                </span>
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}

        <Button asChild variant="outline" size="sm" className="w-full mt-2 gap-1">
          <Link to="/tasks">
            View all my tasks <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
