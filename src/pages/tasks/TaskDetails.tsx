import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export default function TaskDetails() {
  const { taskId } = useParams()
  return (
    <div className="space-y-6">
      <Link to="/tasks" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to tasks
      </Link>

      <PageHeader
        title="Payment API Integration"
        description={`Task ID: ${taskId}`}
        actions={
          <>
            <Button variant="outline">Edit</Button>
            <Button>Mark as Done</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Implement payment integration using Stripe. Handle webhooks, error cases, and receipt generation.</p>
              <div className="mt-4 flex gap-2">
                <Badge>Backend</Badge>
                <Badge variant="outline">Payment</Badge>
                <Badge variant="secondary">API</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">R</div>
                <div className="flex-1 rounded-lg bg-muted/50 p-3">
                  <p className="text-sm font-medium">Ronak</p>
                  <p className="text-sm mt-1">Payment API integration is ready for review.</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">Comment input will be in Phase 9</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-sm">Details</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge>IN_PROGRESS</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Priority</span><Badge variant="outline">HIGH</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Assignee</span><span>Rahul</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Due</span><span>Sep 30</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
