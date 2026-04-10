"use client"

import { Clock } from "lucide-react"

const todaySchedule = [
  {
    id: 1,
    subject: "Mathematics",
    class: "Grade 10-A",
    time: "08:00 - 09:00",
    teacher: "Mr. Johnson",
    room: "Room 101",
    status: "ongoing",
  },
  {
    id: 2,
    subject: "Physics",
    class: "Grade 10-B",
    time: "09:15 - 10:15",
    teacher: "Dr. Smith",
    room: "Lab 1",
    status: "upcoming",
  },
  {
    id: 3,
    subject: "English Literature",
    class: "Grade 9-A",
    time: "10:30 - 11:30",
    teacher: "Ms. Williams",
    room: "Room 205",
    status: "upcoming",
  },
  {
    id: 4,
    subject: "Chemistry",
    class: "Grade 11-A",
    time: "12:00 - 13:00",
    teacher: "Dr. Chen",
    room: "Lab 2",
    status: "upcoming",
  },
  {
    id: 5,
    subject: "History",
    class: "Grade 9-B",
    time: "14:00 - 15:00",
    teacher: "Mr. Davis",
    room: "Room 302",
    status: "upcoming",
  },
]

export function ScheduleWidget() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="text-lg font-semibold text-card-foreground">{"Today's Schedule"}</h3>
        <span className="text-sm text-muted-foreground">April 10, 2026</span>
      </div>
      <div className="divide-y divide-border">
        {todaySchedule.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <div className="flex flex-col items-center">
              <Clock className="h-4 w-4 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time.split(" - ")[0]}</span>
            </div>
            <div
              className={`h-12 w-1 rounded-full ${
                item.status === "ongoing" ? "bg-primary" : "bg-border"
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-card-foreground">{item.subject}</p>
                {item.status === "ongoing" && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                    Ongoing
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {item.class} • {item.teacher} • {item.room}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
