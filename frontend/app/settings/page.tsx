"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  User,
  Building,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Save,
} from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "school", label: "School Info", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "general", label: "General", icon: Globe },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account and preferences">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <nav className="rounded-xl border border-border bg-card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Profile Settings</h3>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary text-2xl font-semibold">
                  AD
                </div>
                <div>
                  <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">First Name</label>
                  <Input defaultValue="Admin" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Last Name</label>
                  <Input defaultValue="User" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Email</label>
                  <Input defaultValue="admin@edumanage.com" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Phone</label>
                  <Input defaultValue="+1 234-567-8900" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-card-foreground">Role</label>
                  <Input defaultValue="System Administrator" disabled className="bg-muted border-border" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "school" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">School Information</h3>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-card-foreground">School Name</label>
                  <Input defaultValue="EduManage High School" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-card-foreground">Address</label>
                  <Input defaultValue="123 Education Street, Learning City, ED 12345" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Contact Email</label>
                  <Input defaultValue="info@edumanage.edu" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Phone Number</label>
                  <Input defaultValue="+1 234-567-8000" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Academic Year</label>
                  <Input defaultValue="2025-2026" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">School Code</label>
                  <Input defaultValue="EDU-HS-001" disabled className="bg-muted border-border" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                {[
                  { title: "Email Notifications", description: "Receive email updates about important activities", enabled: true },
                  { title: "New Enrollment Alerts", description: "Get notified when new students enroll", enabled: true },
                  { title: "Attendance Alerts", description: "Receive alerts for low attendance", enabled: true },
                  { title: "Fee Payment Reminders", description: "Get notified about pending fee payments", enabled: false },
                  { title: "Grade Submission", description: "Alerts when teachers submit grades", enabled: true },
                  { title: "System Updates", description: "Important system maintenance notifications", enabled: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <button
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        item.enabled ? "bg-primary" : "bg-secondary"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                          item.enabled ? "left-5" : "left-0.5"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Current Password</label>
                  <Input type="password" placeholder="Enter current password" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">New Password</label>
                  <Input type="password" placeholder="Enter new password" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" className="bg-secondary border-border" />
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-secondary">
                <h4 className="font-medium text-card-foreground mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
                  <Shield className="mr-2 h-4 w-4" />
                  Enable 2FA
                </Button>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">Appearance Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-4 block">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: "Light", bg: "bg-white", active: false },
                      { name: "Dark", bg: "bg-zinc-900", active: true },
                      { name: "System", bg: "bg-gradient-to-r from-white to-zinc-900", active: false },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className={cn(
                          "rounded-xl border-2 p-4 transition-colors",
                          theme.active ? "border-primary" : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <div className={cn("h-16 rounded-lg mb-2", theme.bg)} />
                        <p className="text-sm font-medium text-card-foreground">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground mb-4 block">Accent Color</label>
                  <div className="flex gap-3">
                    {[
                      "bg-emerald-500",
                      "bg-blue-500",
                      "bg-violet-500",
                      "bg-pink-500",
                      "bg-orange-500",
                    ].map((color, index) => (
                      <button
                        key={color}
                        className={cn(
                          "h-10 w-10 rounded-full transition-transform hover:scale-110",
                          color,
                          index === 0 && "ring-2 ring-offset-2 ring-offset-background ring-primary"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "general" && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">General Settings</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Language</label>
                  <select className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Timezone</label>
                  <select className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground">
                    <option>Eastern Time (ET)</option>
                    <option>Pacific Time (PT)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Date Format</label>
                  <select className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
