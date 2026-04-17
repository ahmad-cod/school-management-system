"use client"

import { useEffect, useState } from "react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Filter, Download } from "lucide-react"
import { StudentRecord, studentService } from "@/services/studentService"
import { ClassOption, classService } from "@/services/classService"
import AddStudentModal from "@/components/AddStudentModal"


export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [students, setStudentsData] = useState<StudentRecord[]>([])
  const [classes, setClasses] = useState<ClassOption[]>([])
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredStudents = students.filter(
    (student: StudentRecord) =>
      student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_id.toString().includes(searchQuery.toLowerCase()) ||
      student.grade_level.toString().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    studentService.getAll()
      .then((data) => {
        console.log("Fetched students:", data)
        setStudentsData(data)
      })
      .catch((error) => {
        console.error("Error fetching students:", error)
      })
      classService.getAll().then(setClasses).catch(console.error);
  }, [])

  return (
    <DashboardLayout title="Students" subtitle="Manage student records">
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
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
      
      <AddStudentModal classes={classes} />
  
      {/* Students Table */}
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Student ID</TableHead>
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Class</TableHead>
              <TableHead className="text-muted-foreground">Grade</TableHead>
              {/* <TableHead className="text-muted-foreground hidden lg:table-cell">Parent</TableHead> */}
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.student_id} className="border-border">
                <TableCell className="font-medium text-card-foreground">STU00{student.student_id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-medium text-sm">
                      {student.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{student.full_name}</p>
                      {/* <p className="text-xs text-muted-foreground md:hidden">{student.email}</p> */}
                    </div>
                  </div>
                </TableCell>
                {/* <TableCell className="hidden md:table-cell">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
node_modules
                      {student.phone}
                    </div>
                  </div>
                </TableCell> */}
                <TableCell className="text-card-foreground">{student.class_name}</TableCell>
                {/* <TableCell className="hidden lg:table-cell text-muted-foreground">{student.parentName}</TableCell> */}
                <TableCell className="text-card-foreground">{student.grade_level}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      student.status === "active"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {student.status === "active" ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover border-border">
                      <DropdownMenuItem className="text-popover-foreground">View Profile</DropdownMenuItem>
                      <DropdownMenuItem className="text-popover-foreground">Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-popover-foreground">View Grades</DropdownMenuItem>
                      <DropdownMenuItem className="text-popover-foreground">View Attendance</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove Student</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredStudents.length} of {students.length} students</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled className="border-border">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
