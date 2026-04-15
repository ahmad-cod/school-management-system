"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Download, TrendingUp, TrendingDown, Minus } from "lucide-react"

const gradesData = [
  {
    id: "STU001",
    name: "Emma Thompson",
    grade: "Grade 12-A",
    math: 95,
    science: 92,
    english: 98,
    history: 88,
    average: 93.25,
    trend: "up",
    rank: 1,
  },
  {
    id: "STU002",
    name: "James Wilson",
    grade: "Grade 11-B",
    math: 88,
    science: 94,
    english: 85,
    history: 90,
    average: 89.25,
    trend: "up",
    rank: 3,
  },
  {
    id: "STU003",
    name: "Sophia Chen",
    grade: "Grade 12-A",
    math: 92,
    science: 96,
    english: 90,
    history: 94,
    average: 93,
    trend: "stable",
    rank: 2,
  },
  {
    id: "STU004",
    name: "Oliver Martinez",
    grade: "Grade 10-A",
    math: 78,
    science: 82,
    english: 75,
    history: 80,
    average: 78.75,
    trend: "down",
    rank: 8,
  },
  {
    id: "STU005",
    name: "Isabella Brown",
    grade: "Grade 11-A",
    math: 90,
    science: 88,
    english: 92,
    history: 85,
    average: 88.75,
    trend: "up",
    rank: 4,
  },
  {
    id: "STU006",
    name: "William Johnson",
    grade: "Grade 9-A",
    math: 85,
    science: 80,
    english: 88,
    history: 82,
    average: 83.75,
    trend: "stable",
    rank: 6,
  },
  {
    id: "STU007",
    name: "Ava Williams",
    grade: "Grade 10-B",
    math: 82,
    science: 86,
    english: 84,
    history: 88,
    average: 85,
    trend: "up",
    rank: 5,
  },
  {
    id: "STU008",
    name: "Ethan Davis",
    grade: "Grade 12-B",
    math: 76,
    science: 78,
    english: 80,
    history: 75,
    average: 77.25,
    trend: "down",
    rank: 9,
  },
]

const getGradeColor = (score: number) => {
  if (score >= 90) return "text-primary"
  if (score >= 80) return "text-chart-2"
  if (score >= 70) return "text-chart-3"
  return "text-destructive"
}

const getGradeLetter = (score: number) => {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}

export default function GradesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = gradesData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const classAverage = Math.round(gradesData.reduce((acc, s) => acc + s.average, 0) / gradesData.length * 10) / 10
  const topPerformers = gradesData.filter((s) => s.average >= 90).length
  const needsAttention = gradesData.filter((s) => s.average < 75).length

  return (
    <DashboardLayout title="Grades" subtitle="Student academic performance">
      {/* Stats Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Class Average</p>
          <p className="text-2xl font-bold text-primary">{classAverage}%</p>
          <p className="text-xs text-muted-foreground mt-1">Grade: {getGradeLetter(classAverage)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Top Performers (A)</p>
          <p className="text-2xl font-bold text-card-foreground">{topPerformers}</p>
          <p className="text-xs text-muted-foreground mt-1">Students with 90%+</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Needs Attention</p>
          <p className="text-2xl font-bold text-destructive">{needsAttention}</p>
          <p className="text-xs text-muted-foreground mt-1">Students below 75%</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Subjects Tracked</p>
          <p className="text-2xl font-bold text-card-foreground">4</p>
          <p className="text-xs text-muted-foreground mt-1">Core subjects</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-9 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Enter Grades
          </Button>
        </div>
      </div>

      {/* Grades Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Rank</TableHead>
              <TableHead className="text-muted-foreground">Student</TableHead>
              <TableHead className="text-muted-foreground">Grade</TableHead>
              <TableHead className="text-muted-foreground text-center">Math</TableHead>
              <TableHead className="text-muted-foreground text-center">Science</TableHead>
              <TableHead className="text-muted-foreground text-center">English</TableHead>
              <TableHead className="text-muted-foreground text-center">History</TableHead>
              <TableHead className="text-muted-foreground text-center">Average</TableHead>
              <TableHead className="text-muted-foreground text-center">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData
              .sort((a, b) => a.rank - b.rank)
              .map((student) => (
                <TableRow key={student.id} className="border-border">
                  <TableCell>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        student.rank <= 3
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      #{student.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-medium text-sm">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{student.grade}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${getGradeColor(student.math)}`}>
                      {student.math}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${getGradeColor(student.science)}`}>
                      {student.science}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${getGradeColor(student.english)}`}>
                      {student.english}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${getGradeColor(student.history)}`}>
                      {student.history}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className={`font-bold ${getGradeColor(student.average)}`}>
                        {student.average}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Grade {getGradeLetter(student.average)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {student.trend === "up" && (
                      <div className="flex justify-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    )}
                    {student.trend === "down" && (
                      <div className="flex justify-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/20">
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        </div>
                      </div>
                    )}
                    {student.trend === "stable" && (
                      <div className="flex justify-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Grading Scale */}
      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Grading Scale</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">A</span>
            <span className="text-sm text-muted-foreground">90-100%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-chart-2">B</span>
            <span className="text-sm text-muted-foreground">80-89%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-chart-3">C</span>
            <span className="text-sm text-muted-foreground">70-79%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-chart-5">D</span>
            <span className="text-sm text-muted-foreground">60-69%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-destructive">F</span>
            <span className="text-sm text-muted-foreground">Below 60%</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
