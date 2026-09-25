import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const activities = [
  { time: "10:30 AM", user: "Ronak", action: "created", target: 'project "Book Marketplace"', color: "bg-violet-500" },
  { time: "10:45 AM", user: "Rahul", action: "created", target: 'task "Login API"', color: "bg-blue-500" },
  { time: "11:20 AM", user: "Amit", action: "changed status", target: 'Payment API to IN_PROGRESS', color: "bg-amber-500" },
  { time: "12:10 PM", user: "Priya", action: "assigned", target: 'Search UI to Rahul', color: "bg-emerald-500" },
  { time: "01:30 PM", user: "Ronak", action: "commented", target: 'on Payment API', color: "bg-slate-500" },
]

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Activity" description="Track all important actions across your projects." />

      <div className="flex gap-2">
        <Button variant="outline" size="sm">All</Button>
        <Button variant="ghost" size="sm">User</Button>
        <Button variant="ghost" size="sm">Project</Button>
        <Button variant="ghost" size="sm">Task</Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-8">Today</div>
              {activities.map((a, i) => (
                <div key={i} className="relative flex gap-4 ml-8">
                  <div className={`absolute -left-8 top-1 h-4 w-4 rounded-full ${a.color} ring-4 ring-background`} />
                  <div className="flex-1 rounded-lg border p-3 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        <span className="font-medium">{a.user}</span> {a.action} <span className="font-medium">{a.target}</span>
                      </p>
                      <Badge variant="outline" className="text-xs">{a.time}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-dashed p-4 text-sm bg-muted/30">
        Real activity feed with filtering will be implemented in Phase 11 with backend integration.
      </div>
    </div>
  )
}
