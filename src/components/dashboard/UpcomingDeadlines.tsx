import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { upcomingDeadlinesData } from "@/utils/mockDashboardData"
import { AlertTriangle, Clock } from "lucide-react"
import { PRIORITY_COLORS } from "@/utils/constants"

export function UpcomingDeadlines() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Clock className="h-4 w-4" /> Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingDeadlinesData.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-lg border p-2.5 hover:bg-muted/30 transition-colors">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.priority === "URGENT" ? "bg-red-50 text-red-600" : item.priority === "HIGH" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <p className="text-[11px] text-muted-foreground truncate">{item.project} • {item.assignee}</p>
            </div>
            <div className="text-right shrink-0">
              <Badge variant="outline" className={`text-[10px] ${PRIORITY_COLORS[item.priority]}`}>
                {item.due}
              </Badge>
            </div>
          </div>
        ))}

        <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5 dark:bg-amber-950 dark:border-amber-800">
          <p className="text-xs font-medium text-amber-900 dark:text-amber-100 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> 2 tasks overdue
          </p>
          <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">Check your task list to update status</p>
        </div>
      </CardContent>
    </Card>
  )
}
