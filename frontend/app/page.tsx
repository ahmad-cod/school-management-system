"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StatsCard } from "@/components/dashboard/stats-card"
import { TopStudents } from "@/components/dashboard/top-students"
import { BarChart3, BookOpen, CreditCard, Users } from "lucide-react"

export default function Home() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Operational overview for the current academic term"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Active Students"
            value="24"
            change="Across 6 classes"
            changeType="neutral"
            icon={Users}
          />
          <StatsCard
            title="Attendance Rate"
            value="91%"
            change="Weekly average"
            changeType="positive"
            icon={BookOpen}
            iconColor="text-chart-2"
          />
          <StatsCard
            title="Average Score"
            value="77.8%"
            change="Term 1 assessments"
            changeType="positive"
            icon={BarChart3}
            iconColor="text-chart-3"
          />
          <StatsCard
            title="Outstanding Fees"
            value="N240k"
            change="From unpaid balances"
            changeType="negative"
            icon={CreditCard}
            iconColor="text-chart-5"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.8fr)]">
          <AttendanceChart />
          <TopStudents />
        </div>

        <RecentActivity />
      </div>
    </DashboardLayout>
  )
}
