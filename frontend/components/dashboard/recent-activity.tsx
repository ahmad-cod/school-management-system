"use client"

import { UserPlus, FileCheck, Calendar, MessageSquare } from "lucide-react"

const activities = [
  {
    id: 1,
    icon: UserPlus,
    title: "New student enrolled",
    description: "Sarah Johnson joined Grade 10-A",
    time: "2 hours ago",
    iconColor: "bg-primary/20 text-primary",
  },
  {
    id: 2,
    icon: FileCheck,
    title: "Grades submitted",
    description: "Mr. Smith submitted Math grades for Grade 9-B",
    time: "4 hours ago",
    iconColor: "bg-chart-2/20 text-chart-2",
  },
  {
    id: 3,
    icon: Calendar,
    title: "Event scheduled",
    description: "Annual Sports Day scheduled for May 15th",
    time: "6 hours ago",
    iconColor: "bg-chart-3/20 text-chart-3",
  },
  {
    id: 4,
    icon: MessageSquare,
    title: "Parent meeting request",
    description: "Mrs. Davis requested a meeting with Grade 8 teachers",
    time: "8 hours ago",
    iconColor: "bg-chart-4/20 text-chart-4",
  },
  {
    id: 5,
    icon: UserPlus,
    title: "New teacher joined",
    description: "Dr. Emily Chen joined as Science Teacher",
    time: "1 day ago",
    iconColor: "bg-primary/20 text-primary",
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4">
            <div className={`rounded-lg p-2.5 ${activity.iconColor}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-card-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
