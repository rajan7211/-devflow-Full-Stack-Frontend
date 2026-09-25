import { AppLayout } from "@/components/layout/AppLayout"
import { PageLoading } from "@/components/common/Loading"
import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"

// Lazy pages for performance
const Login = lazy(() => import("@/pages/auth/Login"))
const Register = lazy(() => import("@/pages/auth/Register"))
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"))
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"))

const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"))
const Projects = lazy(() => import("@/pages/projects/Projects"))
const ProjectDetails = lazy(() => import("@/pages/projects/ProjectDetails"))
const Tasks = lazy(() => import("@/pages/tasks/Tasks"))
const TaskDetails = lazy(() => import("@/pages/tasks/TaskDetails"))
const Team = lazy(() => import("@/pages/team/Team"))
const Activity = lazy(() => import("@/pages/activity/Activity"))
const Profile = lazy(() => import("@/pages/profile/Profile"))
const AdminUsers = lazy(() => import("@/pages/admin/Users"))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
            <Route path="/team" element={<Team />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}
