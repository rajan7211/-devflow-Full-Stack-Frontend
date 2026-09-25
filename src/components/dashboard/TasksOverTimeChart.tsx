import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tasksOverTimeData } from "@/utils/mockDashboardData"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function TasksOverTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Tasks Completed Over Time</CardTitle>
        <p className="text-xs text-muted-foreground">Last 9 days activity trend</p>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tasksOverTimeData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Area
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCompleted)"
                dot={{ r: 3, fill: "#8b5cf6" }}
                activeDot={{ r: 5 }}
              />
              <Area
                type="monotone"
                dataKey="created"
                name="Created"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCreated)"
                dot={{ r: 3, fill: "#06b6d4" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 p-3 text-xs">
          <div>
            <p className="font-medium">Weekly Summary</p>
            <p className="text-muted-foreground">42 tasks completed, 34 created</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-emerald-600">+18% vs last week</p>
            <p className="text-muted-foreground">Productivity up</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
