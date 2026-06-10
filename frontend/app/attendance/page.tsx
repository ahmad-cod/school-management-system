"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { CalendarCheck, ClipboardList } from "lucide-react"

const attendanceRows = [
  { className: "Grade 4A", present: 27, absent: 3, rate: "90%" },
  { className: "Grade 4B", present: 28, absent: 2, rate: "93%" },
  { className: "Grade 5A", present: 25, absent: 3, rate: "89%" },
  { className: "Grade 5B", present: 26, absent: 2, rate: "93%" },
]

export default function AttendancePage() {
  return (
    <DashboardLayout
      title="Attendance"
      subtitle="Record attendance and review class-level trends"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Today</h2>
            <p className="text-sm text-muted-foreground">
              Prototype view until the attendance API and persistence layer are added.
            </p>
          </div>
          <Button>
            <CalendarCheck className="mr-2 h-4 w-4" />
            Record Attendance
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid grid-cols-4 border-b border-border bg-secondary px-4 py-3 text-sm font-medium text-muted-foreground">
            <span>Class</span>
            <span>Present</span>
            <span>Absent</span>
            <span>Rate</span>
          </div>
          {attendanceRows.map((row) => (
            <div
              key={row.className}
              className="grid grid-cols-4 border-b border-border px-4 py-4 text-sm last:border-b-0"
            >
              <span className="font-medium text-card-foreground">{row.className}</span>
              <span className="text-card-foreground">{row.present}</span>
              <span className="text-card-foreground">{row.absent}</span>
              <span className="font-medium text-primary">{row.rate}</span>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          <ClipboardList className="mt-0.5 h-4 w-4 text-primary" />
          <p>
            Next implementation step: add attendance sessions and records to the database,
            then connect this view to a protected API.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
