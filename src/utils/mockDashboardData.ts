export const dashboardStats = [
  {
    label: "Total Projects",
    value: "8",
    change: "+2 this month",
    changeType: "positive" as const,
    icon: "FolderKanban",
    color: "text-violet-600 bg-violet-50 dark:bg-violet-950 dark:text-violet-300",
  },
  {
    label: "Active Tasks",
    value: "24",
    change: "6 in progress",
    changeType: "neutral" as const,
    icon: "CheckSquare",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    label: "Completed Tasks",
    value: "42",
    change: "+12 this week",
    changeType: "positive" as const,
    icon: "TrendingUp",
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    label: "Team Members",
    value: "12",
    change: "2 new",
    changeType: "positive" as const,
    icon: "Users",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-300",
  },
]

export const projectProgressData = [
  { name: "Book Marketplace", progress: 72, total: 20, completed: 12, status: "ACTIVE" },
  { name: "E-Commerce App", progress: 45, total: 32, completed: 14, status: "ACTIVE" },
  { name: "Analytics Dashboard", progress: 90, total: 15, completed: 13, status: "ACTIVE" },
  { name: "Mobile Banking", progress: 25, total: 28, completed: 7, status: "PLANNING" },
]

export const taskStatusData = [
  { name: "To Do", value: 12, color: "#94a3b8" },
  { name: "In Progress", value: 8, color: "#3b82f6" },
  { name: "In Review", value: 4, color: "#f59e0b" },
  { name: "Done", value: 18, color: "#10b981" },
]

export const tasksOverTimeData = [
  { date: "Sep 16", completed: 2, created: 5 },
  { date: "Sep 17", completed: 4, created: 3 },
  { date: "Sep 18", completed: 3, created: 4 },
  { date: "Sep 19", completed: 5, created: 2 },
  { date: "Sep 20", completed: 7, created: 6 },
  { date: "Sep 21", completed: 4, created: 3 },
  { date: "Sep 22", completed: 6, created: 4 },
  { date: "Sep 23", completed: 8, created: 5 },
  { date: "Sep 24", completed: 3, created: 2 },
]

export const recentActivityData = [
  {
    id: "1",
    user: "Ronak Patel",
    avatar: "R",
    action: "created project",
    target: "Book Marketplace",
    time: "10 minutes ago",
    type: "project" as const,
  },
  {
    id: "2",
    user: "Rahul Sharma",
    avatar: "R",
    action: "completed task",
    target: "Login UI",
    time: "30 minutes ago",
    type: "task" as const,
  },
  {
    id: "3",
    user: "Amit Kumar",
    avatar: "A",
    action: "changed status",
    target: "Payment API to IN_PROGRESS",
    time: "1 hour ago",
    type: "task" as const,
  },
  {
    id: "4",
    user: "Priya Singh",
    avatar: "P",
    action: "commented on",
    target: "Search API",
    time: "2 hours ago",
    type: "comment" as const,
  },
  {
    id: "5",
    user: "Neha Gupta",
    avatar: "N",
    action: "was assigned to",
    target: "Cart UI",
    time: "3 hours ago",
    type: "assignment" as const,
  },
  {
    id: "6",
    user: "Ronak Patel",
    avatar: "R",
    action: "moved task to DONE",
    target: "Navbar",
    time: "5 hours ago",
    type: "task" as const,
  },
]

export const myTasksData = [
  {
    id: "1",
    title: "Create Login UI",
    project: "Book Marketplace",
    priority: "HIGH" as const,
    status: "IN_PROGRESS" as const,
    due: "Sep 30",
    progress: 60,
  },
  {
    id: "2",
    title: "Payment API Integration",
    project: "Book Marketplace",
    priority: "URGENT" as const,
    status: "TODO" as const,
    due: "Oct 2",
    progress: 0,
  },
  {
    id: "3",
    title: "Search UI with Filters",
    project: "Book Marketplace",
    priority: "MEDIUM" as const,
    status: "TODO" as const,
    due: "Oct 5",
    progress: 0,
  },
  {
    id: "4",
    title: "Write Unit Tests",
    project: "E-Commerce App",
    priority: "MEDIUM" as const,
    status: "IN_REVIEW" as const,
    due: "Oct 1",
    progress: 85,
  },
]

export const upcomingDeadlinesData = [
  { id: "1", title: "Payment API", project: "Book Marketplace", due: "Tomorrow", priority: "URGENT" as const, assignee: "Amit" },
  { id: "2", title: "Login UI", project: "Book Marketplace", due: "Sep 30", priority: "HIGH" as const, assignee: "Rahul" },
  { id: "3", title: "Search API", project: "Book Marketplace", due: "Oct 2", priority: "MEDIUM" as const, assignee: "Priya" },
  { id: "4", title: "Analytics Page", project: "Analytics Dashboard", due: "Oct 3", priority: "HIGH" as const, assignee: "Neha" },
]

export const teamWorkloadData = [
  { name: "Ronak", tasks: 5, completed: 4 },
  { name: "Rahul", tasks: 6, completed: 3 },
  { name: "Priya", tasks: 4, completed: 2 },
  { name: "Amit", tasks: 7, completed: 5 },
  { name: "Neha", tasks: 3, completed: 2 },
]
