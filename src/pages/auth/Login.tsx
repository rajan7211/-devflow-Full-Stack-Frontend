import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { APP_NAME } from "@/utils/constants"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-4 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
      <Card className="w-full max-w-[420px] shadow-xl border-0">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xl font-bold">
            D
          </div>
          <CardTitle className="text-2xl">{APP_NAME}</CardTitle>
          <CardDescription>Welcome back! Please sign in to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@devflow.com" defaultValue="admin@devflow.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" defaultValue="password123" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>

          <Button className="w-full" size="lg">
            Sign In
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create account
            </Link>
          </div>

          <div className="rounded-lg bg-muted/60 p-3 text-xs">
            <p className="font-medium mb-1">Phase 1 Demo - No backend yet</p>
            <p className="text-muted-foreground">Use any credentials to explore the UI. Auth will be wired in Phase 2.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
