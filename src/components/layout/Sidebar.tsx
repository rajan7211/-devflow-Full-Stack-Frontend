import { cn } from "@/utils/cn"
import { useAuth } from "@/hooks/useAuth"
import { useAuthStore } from "@/store/authStore"
import { useUIStore } from "@/store/uiStore"
import { useToast } from "@/store/toastStore"
import { APP_NAME, ROLES } from "@/utils/constants"
import {
  Activity,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  CheckSquare,
  X,
} from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", roles: ["ADMIN", "MANAGER", "DEVELOPER"] },
  { label: "Projects", icon: FolderKanban, path: "/projects", roles: ["ADMIN", "MANAGER", "DEVELOPER"] },
  { label: "Tasks", icon: CheckSquare, path: "/tasks", roles: ["ADMIN", "MANAGER", "DEVELOPER"] },
  { label: "Team", icon: Users, path: "/team", roles: ["ADMIN", "MANAGER", "DEVELOPER"] },
  { label: "Activity", icon: Activity, path: "/activity", roles: ["ADMIN", "MANAGER"] },
]

const adminItems = [
  { label: "Users", icon: Users, path: "/admin/users", roles: ["ADMIN"] },
]

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const { user } = useAuthStore()
  const { logout } = useAuth()
  const { success } = useToast()
  const navigate = useNavigate()

  const role = user?.role || ROLES.DEVELOPER

  const filteredNav = navItems.filter((item) => item.roles.includes(role))
  const filteredAdmin = adminItems.filter((item) => item.roles.includes(role))

  const handleLogout = async () => {
    try {
      await logout()
      success("Logged out", "You have been signed out successfully")
      navigate("/login", { replace: true })
    } catch {
      // Even if fails, redirect
      navigate("/login", { replace: true })
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r bg-background transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:h-[calc(100vh-4rem)] lg:w-[260px] lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile header */}
        <div className="flex h-16 items-center justify-between border-b px-6 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              D
            </div>
            <span className="font-bold text-lg">{APP_NAME}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-1">
            {filteredNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {filteredAdmin.length > 0 && (
            <>
              <div className="my-4 border-t" />
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Admin
              </div>
              <nav className="space-y-1">
                {filteredAdmin.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </>
          )}
        </div>

        <div className="border-t p-3">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted/60 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {(user?.name || "G").charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name || "Guest User"}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email || "guest@devflow.com"}</p>
            </div>
          </div>

          <div className="space-y-1">
            <NavLink
              to="/profile"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <Settings className="h-4 w-4" />
              Settings
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
