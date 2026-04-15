"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Star, Paperclip, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const conversations = [
  {
    id: 1,
    name: "Dr. Robert Smith",
    role: "Math Teacher",
    lastMessage: "The exam schedule has been updated...",
    time: "2 min ago",
    unread: 3,
    starred: true,
    avatar: "RS",
  },
  {
    id: 2,
    name: "Mrs. Jennifer Davis",
    role: "Art Teacher",
    lastMessage: "Thank you for the feedback on the project.",
    time: "1 hour ago",
    unread: 0,
    starred: false,
    avatar: "JD",
  },
  {
    id: 3,
    name: "Parent - Robert Thompson",
    role: "Parent of Emma Thompson",
    lastMessage: "Could we schedule a meeting next week?",
    time: "3 hours ago",
    unread: 1,
    starred: true,
    avatar: "RT",
  },
  {
    id: 4,
    name: "Dr. Emily Chen",
    role: "Science Teacher",
    lastMessage: "Lab equipment request approved",
    time: "Yesterday",
    unread: 0,
    starred: false,
    avatar: "EC",
  },
  {
    id: 5,
    name: "Staff Announcements",
    role: "Group",
    lastMessage: "Reminder: Faculty meeting tomorrow at 3 PM",
    time: "Yesterday",
    unread: 0,
    starred: false,
    avatar: "SA",
  },
]

const messages = [
  {
    id: 1,
    sender: "Dr. Robert Smith",
    content: "Good morning! I wanted to discuss the upcoming math exam schedule.",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Good morning! Sure, what changes are you proposing?",
    time: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Dr. Robert Smith",
    content: "I think we should move the Grade 10 exam to next Monday. Some students have requested more preparation time due to the science fair last week.",
    time: "10:35 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "You",
    content: "That sounds reasonable. Let me check if there are any conflicts with other exams.",
    time: "10:38 AM",
    isOwn: true,
  },
  {
    id: 5,
    sender: "Dr. Robert Smith",
    content: "Thank you! I have also attached the updated exam schedule for your review.",
    time: "10:40 AM",
    isOwn: false,
    hasAttachment: true,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout title="Messages" subtitle="Communicate with teachers, parents, and staff">
      <div className="flex h-[calc(100vh-180px)] rounded-xl border border-border bg-card overflow-hidden">
        {/* Conversation List */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-9 bg-secondary border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={cn(
                  "flex items-start gap-3 p-4 cursor-pointer border-b border-border transition-colors",
                  selectedConversation.id === conv.id
                    ? "bg-primary/10"
                    : "hover:bg-secondary"
                )}
                onClick={() => setSelectedConversation(conv)}
              >
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-medium text-sm">
                    {conv.avatar}
                  </div>
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-card-foreground truncate">{conv.name}</span>
                    <div className="flex items-center gap-1">
                      {conv.starred && <Star className="h-3 w-3 text-chart-3 fill-chart-3" />}
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{conv.role}</p>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-medium">
                {selectedConversation.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{selectedConversation.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedConversation.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Star className={cn("h-5 w-5", selectedConversation.starred && "text-chart-3 fill-chart-3")} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isOwn ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-xl p-3",
                    message.isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.hasAttachment && (
                    <div className={cn(
                      "flex items-center gap-2 mt-2 p-2 rounded-lg",
                      message.isOwn ? "bg-primary-foreground/10" : "bg-background"
                    )}>
                      <Paperclip className="h-4 w-4" />
                      <span className="text-xs">Exam_Schedule_Updated.pdf</span>
                    </div>
                  )}
                  <p className={cn(
                    "text-xs mt-1",
                    message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1 bg-secondary border-border"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
