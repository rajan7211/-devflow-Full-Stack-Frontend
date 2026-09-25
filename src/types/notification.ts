export interface Notification {
  _id: string
  recipient: string
  type: string
  title: string
  message: string
  isRead: boolean
  relatedTask?: string
  relatedProject?: string
  createdAt: string
}

export interface Activity {
  _id: string
  user: string | { _id: string; name: string; avatar?: string }
  project?: string | { _id: string; name: string }
  task?: string | { _id: string; title: string }
  action: string
  description: string
  metadata?: Record<string, unknown>
  createdAt: string
}
