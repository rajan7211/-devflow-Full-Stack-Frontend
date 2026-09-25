import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { recentActivityData } from "@/utils/mockDashboardData"
import { Clock, FolderKanban, CheckSquare, MessageSquare, UserPlus, Activity } from "lucide-react"
import { motion } from "framer-motion"

const typeIcons = {
  project: FolderKanban,
  task: CheckSquare,
  comment: MessageSquare,
  assignment: UserPlus,
}

const typeColors = {
  project: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  task: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  comment: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  assignment: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Activity className="h-4 w-4" /> Recent Activity
        </CardTitle>
        <Badge variant="outline" className="text-[11px]">Today</Badge>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {recentActivityData.map((item, index) => {
              const Icon = typeIcons[item.type]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex gap-3"
                >
                  <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-background ${typeColors[item.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm leading-snug">
                        <span className="font-semibold">{item.user}</span>{" "}
                        <span className="text-muted-foreground">{item.action}</span>{" "}
                        <span className="font-medium">"{item.target}"</span>
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {item.time}
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full rounded-lg border border-dashed py-2 text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
