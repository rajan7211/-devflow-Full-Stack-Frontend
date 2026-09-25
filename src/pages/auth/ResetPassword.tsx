import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/store/toastStore"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, AlertCircle, ShieldCheck, Check } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { success } = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const password = watch("password")

  const passwordChecks = {
    length: password?.length >= 8,
    uppercase: /[A-Z]/.test(password || ""),
    lowercase: /[a-z]/.test(password || ""),
    number: /[0-9]/.test(password || ""),
  }

  const onSubmit = async (_data: ResetPasswordFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    success("Password reset!", "Your password has been reset successfully. Please login.")
    navigate("/login", { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-4 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
      <Card className="w-full max-w-[400px] shadow-xl border-0">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  autoFocus
                  {...register("password")}
                  className={errors.password ? "border-red-300 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.password.message}
                </p>
              )}
              {password && (
                <div className="grid grid-cols-2 gap-1 mt-2 text-[11px]">
                  <div className={`flex items-center gap-1 ${passwordChecks.length ? "text-emerald-600" : "text-muted-foreground"}`}>
                    <Check className={`h-3 w-3 ${passwordChecks.length ? "opacity-100" : "opacity-30"}`} /> 8+ chars
                  </div>
                  <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? "text-emerald-600" : "text-muted-foreground"}`}>
                    <Check className={`h-3 w-3 ${passwordChecks.uppercase ? "opacity-100" : "opacity-30"}`} /> Uppercase
                  </div>
                  <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? "text-emerald-600" : "text-muted-foreground"}`}>
                    <Check className={`h-3 w-3 ${passwordChecks.lowercase ? "opacity-100" : "opacity-30"}`} /> Lowercase
                  </div>
                  <div className={`flex items-center gap-1 ${passwordChecks.number ? "text-emerald-600" : "text-muted-foreground"}`}>
                    <Check className={`h-3 w-3 ${passwordChecks.number ? "opacity-100" : "opacity-30"}`} /> Number
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-red-300 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || !isValid}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Resetting...
                </>
              ) : (
                "Reset password"
              )}
            </Button>

            <div className="text-center">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
                Back to login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
