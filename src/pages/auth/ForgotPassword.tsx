import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/store/toastStore"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, AlertCircle, Mail, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const { success } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setSubmittedEmail(data.email)
    setIsSubmitted(true)
    success("Reset link sent!", `Check your email at ${data.email}`)
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-4 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
        <Card className="w-full max-w-[400px] shadow-xl border-0 text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle className="h-8 w-8" />
            </div>
            <CardTitle>Check your email</CardTitle>
            <CardDescription className="text-sm">
              We sent a password reset link to <span className="font-medium text-foreground">{submittedEmail}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
              <p>For Phase 2 demo, any email will work. In production, you'd receive a real email with a reset link.</p>
              <p className="mt-2 font-mono">Reset token: mock-token-{Date.now().toString(36)}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link to="/reset-password">Continue to Reset (Demo)</Link>
              </Button>
              <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2">
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-4 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
      <Card className="w-full max-w-[400px] shadow-xl border-0">
        <CardHeader className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="h-6 w-6" />
          </div>
          <CardTitle className="text-center">Forgot password?</CardTitle>
          <CardDescription className="text-center">No worries, we'll send you reset instructions</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@devflow.com"
                autoComplete="email"
                autoFocus
                {...register("email")}
                className={errors.email ? "border-red-300" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.email.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || !isValid}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending link...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>

            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2">
              <ArrowLeft className="h-4 w-4" /> Back to login
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
