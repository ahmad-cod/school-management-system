"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Mail, Phone, BookOpen } from "lucide-react"

const teachers = [
  {
    id: "TCH001",
    name: "Dr. Robert Smith",
    email: "robert.s@school.edu",
    phone: "+1 234-567-1001",
    department: "Mathematics",
    subjects: ["Algebra", "Calculus", "Statistics"],
    classes: 5,
    experience: "15 years",
    status: "active",
  },
  {
    id: "TCH002",
    name: "Dr. Emily Chen",
    email: "emily.c@school.edu",
    phone: "+1 234-567-1002",
    department: "Science",
    subjects: ["Chemistry", "Biology"],
    classes: 4,
    experience: "12 years",
    status: "active",
  },
  {
    id: "TCH003",
    name: "Mr. Michael Johnson",
    email: "michael.j@school.edu",
    phone: "+1 234-567-1003",
    department: "English",
    subjects: ["English Literature", "Creative Writing"],
    classes: 6,
    experience: "10 years",
    status: "active",
  },
  {
    id: "TCH004",
    name: "Ms. Sarah Williams",
    email: "sarah.w@school.edu",
    phone: "+1 234-567-1004",
    department: "History",
    subjects: ["World History", "Geography"],
    classes: 4,
    experience: "8 years",
    status: "on-leave",
  },
  {
    id: "TCH005",
    name: "Dr. David Miller",
    email: "david.m@school.edu",
    phone: "+1 234-567-1005",
    department: "Science",
    subjects: ["Physics", "Astronomy"],
    classes: 5,
    experience: "18 years",
    status: "active",
  },
  {
    id: "TCH006",
    name: "Mrs. Jennifer Davis",
    email: "jennifer.d@school.edu",
    phone: "+1 234-567-1006",
    department: "Arts",
    subjects: ["Fine Arts", "Music"],
    classes: 3,
    experience: "7 years",
    status: "active",
  },
]

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <DashboardLayout title="Teachers" subtitle="Manage faculty members">
      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teachers..."
            className="pl-9 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {/* Teachers Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold">
                  {teacher.name
                    .split(" ")
                    .slice(-2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.department}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  teacher.status === "active"
                    ? "bg-primary/20 text-primary"
                    : "bg-chart-3/20 text-chart-3"
                }`}
              >
                {teacher.status === "active" ? "Active" : "On Leave"}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {teacher.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {teacher.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {teacher.classes} Classes
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Subjects</p>
              <div className="flex flex-wrap gap-1">
                {teacher.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">{teacher.experience} experience</span>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
