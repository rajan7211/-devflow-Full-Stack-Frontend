import { PageHeader } from "@/components/common/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Profile() {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Profile" description="Manage your account settings." />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
              R
            </div>
            <div>
              <Button variant="outline" size="sm">Change Avatar</Button>
              <p className="mt-2 text-xs text-muted-foreground">JPG, PNG max 2MB</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="Ronak Patel" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="ronak@devflow.com" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue="ADMIN" disabled />
            </div>
            <div className="space-y-2">
              <Label>Joined</Label>
              <Input defaultValue="Sep 2024" disabled />
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" />
          </div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  )
}
