import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, UserPlus } from "lucide-react"

const members = [
  { name: "Ronak Patel", email: "ronak@devflow.com", role: "ADMIN", projects: 4, status: "ACTIVE" },
  { name: "Rahul Sharma", email: "rahul@devflow.com", role: "MANAGER", projects: 3, status: "ACTIVE" },
  { name: "Priya Singh", email: "priya@devflow.com", role: "MANAGER", projects: 2, status: "ACTIVE" },
  { name: "Amit Kumar", email: "amit@devflow.com", role: "DEVELOPER", projects: 2, status: "ACTIVE" },
  { name: "Neha Gupta", email: "neha@devflow.com", role: "DEVELOPER", projects: 1, status: "ACTIVE" },
]

export default function Team() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team"
        description="Manage your team members and their roles."
        actions={
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Invite Member
          </Button>
        }
      />

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search members..." className="pl-9" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/30">
                <tr className="text-left text-sm">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Projects</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.email} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {m.name[0]}
                        </div>
                        <span className="font-medium text-sm">{m.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{m.email}</td>
                    <td className="p-4">
                      <Badge variant={m.role === "ADMIN" ? "default" : m.role === "MANAGER" ? "secondary" : "outline"}>
                        {m.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{m.projects}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {m.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
