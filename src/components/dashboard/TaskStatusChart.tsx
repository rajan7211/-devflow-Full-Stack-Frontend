import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { taskStatusData } from "@/utils/mockDashboardData"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function TaskStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Task Status Distribution</CardTitle>
        <p className="text-xs text-muted-foreground">Breakdown of tasks by current status</p>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {taskStatusData.map((item) => (
            <div key={item.name} className="flex items-center gap-2 rounded-lg border p-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex-1">
                <p className="text-xs font-medium">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">{item.value} tasks</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
