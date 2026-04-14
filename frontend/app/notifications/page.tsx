"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Bell,
  UserPlus,
  FileCheck,
  Calendar,
  AlertCircle,
  DollarSign,
  Check,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    type: "enrollment",
    icon: UserPlus,
    title: "New Student Enrollment",
    message: "Sarah Johnson has been enrolled in Grade 10-A",
    time: "2 hours ago",
    read: false,
    color: "bg-primary/20 text-primary",
  },
  {
    id: 2,
    type: "grades",
    icon: FileCheck,
    title: "Grades Submitted",
    message: "Dr. Robert Smith submitted Math grades for Grade 12-A",
    time: "4 hours ago",
    read: false,
    color: "bg-chart-2/20 text-chart-2",
  },
  {
    id: 3,
    type: "event",
    icon: Calendar,
    title: "Upcoming Event",
    message: "Annual Sports Day is scheduled for May 15th, 2026",
    time: "6 hours ago",
    read: true,
    color: "bg-chart-3/20 text-chart-3",
  },
  {
    id: 4,
    type: "alert",
    icon: AlertCircle,
    title: "Attendance Alert",
    message: "5 students have low attendance rate this week",
    time: "8 hours ago",
    read: false,
    color: "bg-destructive/20 text-destructive",
  },
  {
    id: 5,
    type: "payment",
    icon: DollarSign,
    title: "Fee Payment Received",
    message: "Payment of $2,500 received from Emma Thompson (STU001)",
    time: "1 day ago",
    read: true,
    color: "bg-chart-4/20 text-chart-4",
  },
  {
    id: 6,
    type: "enrollment",
    icon: UserPlus,
    title: "New Teacher Joined",
    message: "Dr. Michael Anderson joined as Physics Teacher",
    time: "1 day ago",
    read: true,
    color: "bg-primary/20 text-primary",
  },
  {
    id: 7,
    type: "event",
    icon: Calendar,
    title: "Meeting Reminder",
    message: "Staff meeting tomorrow at 3:00 PM in Conference Room A",
    time: "2 days ago",
    read: true,
    color: "bg-chart-3/20 text-chart-3",
  },
  {
    id: 8,
    type: "alert",
    icon: AlertCircle,
    title: "System Maintenance",
    message: "Scheduled maintenance on April 12th from 2:00 AM - 4:00 AM",
    time: "2 days ago",
    read: true,
    color: "bg-chart-5/20 text-chart-5",
  },
]

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications =
    filter === "all"
      ? notificationsList
      : notificationsList.filter((n) => !n.read)

  const unreadCount = notificationsList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationsList((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <DashboardLayout title="Notifications" subtitle="Stay updated with latest activities">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}
          >
            All
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
            className={filter === "unread" ? "bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}
          >
            Unread ({unreadCount})
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllAsRead}
          className="border-border text-muted-foreground hover:text-foreground"
          disabled={unreadCount === 0}
        >
          <Check className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-card-foreground">No notifications</p>
            <p className="text-sm text-muted-foreground">
              {filter === "unread" ? "All caught up!" : "You don't have any notifications yet"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-4 p-4 transition-colors",
                !notification.read && "bg-primary/5"
              )}
            >
              <div className={cn("rounded-lg p-2.5 shrink-0", notification.color)}>
                <notification.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={cn(
                      "font-medium text-card-foreground",
                      !notification.read && "font-semibold"
                    )}>
                      {notification.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                  )}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Mark as read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredNotifications.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Showing {filteredNotifications.length} of {notificationsList.length} notifications
        </div>
      )}
    </DashboardLayout>
  )
}
