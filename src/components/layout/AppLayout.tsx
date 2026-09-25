import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
