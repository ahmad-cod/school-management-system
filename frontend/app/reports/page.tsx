"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  BarChart3,
  Download,
  Eye,
} from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Student Enrollment Report",
    description: "Complete list of all enrolled students with their details and status",
    icon: Users,
    lastGenerated: "April 8, 2026",
    category: "Students",
    color: "bg-primary/20 text-primary",
  },
  {
    id: 2,
    title: "Teacher Performance Report",
    description: "Evaluation and performance metrics of all teaching staff",
    icon: GraduationCap,
    lastGenerated: "April 5, 2026",
    category: "Teachers",
    color: "bg-chart-2/20 text-chart-2",
  },
  {
    id: 3,
    title: "Financial Summary Report",
    description: "Overview of fee collection, pending payments, and financial status",
    icon: DollarSign,
    lastGenerated: "April 9, 2026",
    category: "Finance",
    color: "bg-chart-3/20 text-chart-3",
  },
  {
    id: 4,
    title: "Attendance Analysis Report",
    description: "Detailed attendance statistics and trends across all classes",
    icon: Calendar,
    lastGenerated: "April 10, 2026",
    category: "Attendance",
    color: "bg-chart-4/20 text-chart-4",
  },
  {
    id: 5,
    title: "Academic Performance Report",
    description: "Grade analysis and academic progress of students",
    icon: BarChart3,
    lastGenerated: "April 7, 2026",
    category: "Academics",
    color: "bg-chart-5/20 text-chart-5",
  },
  {
    id: 6,
    title: "Class Utilization Report",
    description: "Classroom capacity and utilization statistics",
    icon: FileText,
    lastGenerated: "April 6, 2026",
    category: "Infrastructure",
    color: "bg-primary/20 text-primary",
  },
]

const recentReports = [
  {
    id: 1,
    name: "Monthly_Attendance_March_2026.pdf",
    generatedBy: "Admin User",
    date: "March 31, 2026",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Fee_Collection_Q1_2026.pdf",
    generatedBy: "Finance Manager",
    date: "March 30, 2026",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Student_Progress_Report_Q1.pdf",
    generatedBy: "Academic Head",
    date: "March 28, 2026",
    size: "3.2 MB",
  },
  {
    id: 4,
    name: "Teacher_Evaluation_2025.pdf",
    generatedBy: "Admin User",
    date: "March 25, 2026",
    size: "1.5 MB",
  },
]

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reports" subtitle="Generate and download reports">
      {/* Report Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Generate Reports</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`rounded-lg p-3 ${report.color}`}>
                  <report.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground">{report.category}</span>
                  <h4 className="font-semibold text-card-foreground">{report.title}</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Last: {report.lastGenerated}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Reports</h3>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{report.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Generated by {report.generatedBy} • {report.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{report.size}</span>
                <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
