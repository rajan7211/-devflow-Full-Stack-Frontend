import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useUIStore } from "@/store/uiStore"
import { APP_NAME } from "@/utils/constants"
import { Bell, Menu, Search } from "lucide-react"
import { Link } from "react-router-dom"

export function Navbar() {
  const { user } = useAuthStore()
  const { toggleSidebar } = useUIStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            D
          </div>
          <span className="hidden font-bold text-lg tracking-tight sm:inline">{APP_NAME}</span>
        </Link>

        <div className="hidden md:flex items-center ml-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search projects, tasks..."
              className="h-9 w-[260px] rounded-lg border border-input bg-muted/50 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring lg:w-[320px]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          <span className="sr-only">Notifications</span>
        </Button>

        <div className="ml-2 flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium leading-none">{user?.name || "Guest User"}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role?.toLowerCase() || "developer"}</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {(user?.name || "G").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
