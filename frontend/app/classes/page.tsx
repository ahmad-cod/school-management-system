"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Users, Clock, MapPin } from "lucide-react"

const classes = [
  {
    id: "CLS001",
    name: "Grade 12-A",
    section: "A",
    grade: 12,
    students: 32,
    capacity: 35,
    classTeacher: "Dr. Robert Smith",
    room: "Room 401",
    subjects: 8,
    schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
  },
  {
    id: "CLS002",
    name: "Grade 12-B",
    section: "B",
    grade: 12,
    students: 30,
    capacity: 35,
    classTeacher: "Dr. Emily Chen",
    room: "Room 402",
    subjects: 8,
    schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
  },
  {
    id: "CLS003",
    name: "Grade 11-A",
    section: "A",
    grade: 11,
    students: 34,
    capacity: 35,
    classTeacher: "Mr. Michael Johnson",
    room: "Room 301",
    subjects: 9,
    schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
  },
  {
    id: "CLS004",
    name: "Grade 11-B",
    section: "B",
    grade: 11,
    students: 33,
    capacity: 35,
    classTeacher: "Ms. Sarah Williams",
    room: "Room 302",
    subjects: 9,
    schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
  },
  {
    id: "CLS005",
    name: "Grade 10-A",
    section: "A",
    grade: 10,
    students: 35,
    capacity: 35,
    classTeacher: "Dr. David Miller",
    room: "Room 201",
    subjects: 10,
    schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
  },
  {
    id: "CLS006",
    name: "Grade 10-B",
    section: "B",
    grade: 10,
    students: 28,
    capacity: 35,
    classTeacher: "Mrs. Jennifer Davis",
    room: "Room 202",
    subjects: 10,
    schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
  },
  {
    id: "CLS007",
    name: "Grade 9-A",
    section: "A",
    grade: 9,
    students: 34,
    capacity: 35,
    classTeacher: "Mr. Thomas Anderson",
    room: "Room 101",
    subjects: 10,
    schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
  },
  {
    id: "CLS008",
    name: "Grade 9-B",
    section: "B",
    grade: 9,
    students: 31,
    capacity: 35,
    classTeacher: "Ms. Patricia Moore",
    room: "Room 102",
    subjects: 10,
    schedule: "Mon-Fri, 8:00 AM - 3:00 PM",
  },
]

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.classTeacher.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCapacityColor = (students: number, capacity: number) => {
    const ratio = students / capacity
    if (ratio >= 0.95) return "bg-destructive"
    if (ratio >= 0.8) return "bg-chart-3"
    return "bg-primary"
  }

  return (
    <DashboardLayout title="Classes" subtitle="Manage class sections">
      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search classes..."
            className="pl-9 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Classes</p>
          <p className="text-2xl font-bold text-card-foreground">{classes.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="text-2xl font-bold text-card-foreground">
            {classes.reduce((acc, cls) => acc + cls.students, 0)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Capacity</p>
          <p className="text-2xl font-bold text-card-foreground">
            {classes.reduce((acc, cls) => acc + cls.capacity, 0)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Occupancy Rate</p>
          <p className="text-2xl font-bold text-primary">
            {Math.round(
              (classes.reduce((acc, cls) => acc + cls.students, 0) /
                classes.reduce((acc, cls) => acc + cls.capacity, 0)) *
                100
            )}
            %
          </p>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-card-foreground">{cls.name}</h3>
                <span className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                  {cls.subjects} subjects
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Class Teacher: {cls.classTeacher}</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {cls.students} / {cls.capacity} students
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {cls.room}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {cls.schedule}
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Capacity</span>
                <span className="text-card-foreground font-medium">
                  {Math.round((cls.students / cls.capacity) * 100)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getCapacityColor(
                    cls.students,
                    cls.capacity
                  )}`}
                  style={{ width: `${(cls.students / cls.capacity) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 border-border text-muted-foreground hover:text-foreground">
                View
              </Button>
              <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
