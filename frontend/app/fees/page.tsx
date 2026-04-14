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
import { Search, Download, DollarSign, CheckCircle, AlertCircle, Clock } from "lucide-react"

const feesData = [
  {
    id: "INV001",
    studentId: "STU001",
    studentName: "Emma Thompson",
    grade: "Grade 12-A",
    feeType: "Tuition Fee",
    amount: 2500,
    dueDate: "2026-04-15",
    status: "paid",
    paidDate: "2026-04-05",
  },
  {
    id: "INV002",
    studentId: "STU002",
    studentName: "James Wilson",
    grade: "Grade 11-B",
    feeType: "Tuition Fee",
    amount: 2500,
    dueDate: "2026-04-15",
    status: "pending",
    paidDate: null,
  },
  {
    id: "INV003",
    studentId: "STU003",
    studentName: "Sophia Chen",
    grade: "Grade 12-A",
    feeType: "Lab Fee",
    amount: 350,
    dueDate: "2026-04-10",
    status: "overdue",
    paidDate: null,
  },
  {
    id: "INV004",
    studentId: "STU004",
    studentName: "Oliver Martinez",
    grade: "Grade 10-A",
    feeType: "Tuition Fee",
    amount: 2500,
    dueDate: "2026-04-15",
    status: "paid",
    paidDate: "2026-04-08",
  },
  {
    id: "INV005",
    studentId: "STU005",
    studentName: "Isabella Brown",
    grade: "Grade 11-A",
    feeType: "Activity Fee",
    amount: 200,
    dueDate: "2026-04-20",
    status: "pending",
    paidDate: null,
  },
  {
    id: "INV006",
    studentId: "STU006",
    studentName: "William Johnson",
    grade: "Grade 9-A",
    feeType: "Tuition Fee",
    amount: 2500,
    dueDate: "2026-04-15",
    status: "paid",
    paidDate: "2026-04-01",
  },
  {
    id: "INV007",
    studentId: "STU007",
    studentName: "Ava Williams",
    grade: "Grade 10-B",
    feeType: "Library Fee",
    amount: 150,
    dueDate: "2026-04-05",
    status: "overdue",
    paidDate: null,
  },
  {
    id: "INV008",
    studentId: "STU008",
    studentName: "Ethan Davis",
    grade: "Grade 12-B",
    feeType: "Tuition Fee",
    amount: 2500,
    dueDate: "2026-04-15",
    status: "pending",
    paidDate: null,
  },
]

export default function FeesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = feesData.filter(
    (fee) =>
      fee.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fee.feeType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalCollected = feesData
    .filter((f) => f.status === "paid")
    .reduce((acc, f) => acc + f.amount, 0)
  
  const totalPending = feesData
    .filter((f) => f.status === "pending")
    .reduce((acc, f) => acc + f.amount, 0)
  
  const totalOverdue = feesData
    .filter((f) => f.status === "overdue")
    .reduce((acc, f) => acc + f.amount, 0)

  return (
    <DashboardLayout title="Fee Management" subtitle="Track and manage student fees">
      {/* Stats Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Collected</p>
              <p className="text-2xl font-bold text-primary">${totalCollected.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
              <Clock className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-chart-3">${totalPending.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold text-destructive">${totalOverdue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20">
              <CheckCircle className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Collection Rate</p>
              <p className="text-2xl font-bold text-card-foreground">
                {Math.round((totalCollected / (totalCollected + totalPending + totalOverdue)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="pl-9 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Fees Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Invoice ID</TableHead>
              <TableHead className="text-muted-foreground">Student</TableHead>
              <TableHead className="text-muted-foreground">Fee Type</TableHead>
              <TableHead className="text-muted-foreground text-right">Amount</TableHead>
              <TableHead className="text-muted-foreground">Due Date</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((fee) => (
              <TableRow key={fee.id} className="border-border">
                <TableCell className="font-medium text-card-foreground">{fee.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-card-foreground">{fee.studentName}</p>
                    <p className="text-xs text-muted-foreground">{fee.grade}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{fee.feeType}</TableCell>
                <TableCell className="text-right font-semibold text-card-foreground">
                  ${fee.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(fee.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      fee.status === "paid"
                        ? "bg-primary/20 text-primary"
                        : fee.status === "pending"
                        ? "bg-chart-3/20 text-chart-3"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {fee.status === "paid" && <CheckCircle className="h-3 w-3" />}
                    {fee.status === "pending" && <Clock className="h-3 w-3" />}
                    {fee.status === "overdue" && <AlertCircle className="h-3 w-3" />}
                    {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {fee.status !== "paid" ? (
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Record Payment
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
                      View Receipt
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}
