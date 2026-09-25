import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/utils/cn"
import { FolderKanban, CheckSquare, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { motion } from "framer-motion"

const iconMap = {
  FolderKanban,
  CheckSquare,
  Users,
  TrendingUp,
}

interface StatsCardProps {
  label: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: string
  color: string
  index?: number
}

export function StatsCard({ label, value, change, changeType, icon, color, index = 0 }: StatsCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] || FolderKanban

  const ChangeIcon = changeType === "positive" ? ArrowUpRight : changeType === "negative" ? ArrowDownRight : Minus

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              <div className="flex items-center gap-1 text-xs">
                <span
                  className={cn(
                    "flex items-center gap-0.5 rounded-full px-1.5 py-0.5",
                    changeType === "positive" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
                    changeType === "negative" && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
                    changeType === "neutral" && "bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400"
                  )}
                >
                  <ChangeIcon className="h-3 w-3" />
                  {change}
                </span>
              </div>
            </div>
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 duration-300", color)}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
