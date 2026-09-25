import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Users } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export default function ProjectDetails() {
  const { projectId } = useParams()

  return (
    <div className="space-y-6">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <PageHeader
        title="Book Marketplace"
        description={`Project ID: ${projectId} - Build an online book marketplace.`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">Edit</Button>
            <Button>View Tasks</Button>
          </div>
        }
      />

      <div className="flex gap-2">
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">ACTIVE</Badge>
        <Badge variant="outline">HIGH Priority</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-2xl font-bold">20</p>
                  <p className="text-xs text-muted-foreground">Total Tasks</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4">
                  <p className="text-2xl font-bold text-emerald-700">12</p>
                  <p className="text-xs text-emerald-700/70">Completed</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-2xl font-bold text-blue-700">5</p>
                  <p className="text-xs text-blue-700/70">In Progress</p>
                </div>
              </div>
              <div className="rounded-lg border border-dashed p-4 text-sm bg-muted/20">
                Tabs: Overview | Tasks | Members | Activity | Files will be implemented in Phase 4.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" /> Due: Sep 30, 2025
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" /> 8 members
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
