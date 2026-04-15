"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
]

const scheduleData: Record<string, Record<string, { subject: string; teacher: string; room: string; color: string } | null>> = {
  Monday: {
    "08:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "101", color: "bg-primary/20 border-primary/40 text-primary" },
    "09:00": { subject: "Physics", teacher: "Dr. Miller", room: "Lab 1", color: "bg-chart-2/20 border-chart-2/40 text-chart-2" },
    "10:00": { subject: "English", teacher: "Mr. Johnson", room: "205", color: "bg-chart-3/20 border-chart-3/40 text-chart-3" },
    "11:00": null,
    "12:00": { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-muted border-border text-muted-foreground" },
    "13:00": { subject: "Chemistry", teacher: "Dr. Chen", room: "Lab 2", color: "bg-chart-4/20 border-chart-4/40 text-chart-4" },
    "14:00": { subject: "History", teacher: "Ms. Williams", room: "302", color: "bg-chart-5/20 border-chart-5/40 text-chart-5" },
    "15:00": null,
  },
  Tuesday: {
    "08:00": { subject: "Physics", teacher: "Dr. Miller", room: "Lab 1", color: "bg-chart-2/20 border-chart-2/40 text-chart-2" },
    "09:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "101", color: "bg-primary/20 border-primary/40 text-primary" },
    "10:00": null,
    "11:00": { subject: "Biology", teacher: "Dr. Chen", room: "Lab 2", color: "bg-chart-4/20 border-chart-4/40 text-chart-4" },
    "12:00": { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-muted border-border text-muted-foreground" },
    "13:00": { subject: "English", teacher: "Mr. Johnson", room: "205", color: "bg-chart-3/20 border-chart-3/40 text-chart-3" },
    "14:00": { subject: "Art", teacher: "Mrs. Davis", room: "Art Room", color: "bg-chart-5/20 border-chart-5/40 text-chart-5" },
    "15:00": null,
  },
  Wednesday: {
    "08:00": { subject: "Chemistry", teacher: "Dr. Chen", room: "Lab 2", color: "bg-chart-4/20 border-chart-4/40 text-chart-4" },
    "09:00": { subject: "English", teacher: "Mr. Johnson", room: "205", color: "bg-chart-3/20 border-chart-3/40 text-chart-3" },
    "10:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "101", color: "bg-primary/20 border-primary/40 text-primary" },
    "11:00": { subject: "PE", teacher: "Coach Brown", room: "Gym", color: "bg-chart-2/20 border-chart-2/40 text-chart-2" },
    "12:00": { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-muted border-border text-muted-foreground" },
    "13:00": null,
    "14:00": { subject: "Music", teacher: "Mrs. Davis", room: "Music Room", color: "bg-chart-5/20 border-chart-5/40 text-chart-5" },
    "15:00": null,
  },
  Thursday: {
    "08:00": { subject: "English", teacher: "Mr. Johnson", room: "205", color: "bg-chart-3/20 border-chart-3/40 text-chart-3" },
    "09:00": { subject: "History", teacher: "Ms. Williams", room: "302", color: "bg-chart-5/20 border-chart-5/40 text-chart-5" },
    "10:00": { subject: "Physics", teacher: "Dr. Miller", room: "Lab 1", color: "bg-chart-2/20 border-chart-2/40 text-chart-2" },
    "11:00": null,
    "12:00": { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-muted border-border text-muted-foreground" },
    "13:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "101", color: "bg-primary/20 border-primary/40 text-primary" },
    "14:00": { subject: "Computer Science", teacher: "Mr. Lee", room: "IT Lab", color: "bg-chart-4/20 border-chart-4/40 text-chart-4" },
    "15:00": null,
  },
  Friday: {
    "08:00": { subject: "Biology", teacher: "Dr. Chen", room: "Lab 2", color: "bg-chart-4/20 border-chart-4/40 text-chart-4" },
    "09:00": { subject: "Mathematics", teacher: "Dr. Smith", room: "101", color: "bg-primary/20 border-primary/40 text-primary" },
    "10:00": { subject: "Geography", teacher: "Ms. Williams", room: "302", color: "bg-chart-5/20 border-chart-5/40 text-chart-5" },
    "11:00": { subject: "English", teacher: "Mr. Johnson", room: "205", color: "bg-chart-3/20 border-chart-3/40 text-chart-3" },
    "12:00": { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-muted border-border text-muted-foreground" },
    "13:00": { subject: "Club Activities", teacher: "", room: "Various", color: "bg-chart-2/20 border-chart-2/40 text-chart-2" },
    "14:00": null,
    "15:00": null,
  },
}

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState("April 7 - 11, 2026")

  return (
    <DashboardLayout title="Schedule" subtitle="Weekly class timetable">
      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="border-border text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium text-foreground">{currentWeek}</span>
          <Button variant="outline" size="icon" className="border-border text-muted-foreground hover:text-foreground">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
            Today
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-6 border-b border-border">
              <div className="p-4 bg-secondary">
                <span className="text-sm font-medium text-muted-foreground">Time</span>
              </div>
              {weekDays.map((day) => (
                <div key={day} className="p-4 bg-secondary text-center">
                  <span className="text-sm font-medium text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-6 border-b border-border last:border-b-0">
                <div className="p-4 flex items-center justify-center border-r border-border">
                  <span className="text-sm text-muted-foreground">{time}</span>
                </div>
                {weekDays.map((day) => {
                  const slot = scheduleData[day]?.[time]
                  return (
                    <div key={`${day}-${time}`} className="p-2 min-h-[80px] border-r border-border last:border-r-0">
                      {slot ? (
                        <div className={`h-full rounded-lg border p-2 ${slot.color}`}>
                          <p className="font-medium text-sm">{slot.subject}</p>
                          {slot.teacher && (
                            <p className="text-xs opacity-80">{slot.teacher}</p>
                          )}
                          <p className="text-xs opacity-60">{slot.room}</p>
                        </div>
                      ) : (
                        <div className="h-full rounded-lg border border-dashed border-border flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Free</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Mathematics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-2" />
          <span className="text-sm text-muted-foreground">Science</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-3" />
          <span className="text-sm text-muted-foreground">English</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-4" />
          <span className="text-sm text-muted-foreground">Lab Classes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-chart-5" />
          <span className="text-sm text-muted-foreground">Other</span>
        </div>
      </div>
    </DashboardLayout>
  )
}
