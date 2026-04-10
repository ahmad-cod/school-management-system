"use client"

const students = [
  {
    id: 1,
    name: "Emma Thompson",
    grade: "Grade 12-A",
    score: 98.5,
    avatar: "ET",
    rank: 1,
  },
  {
    id: 2,
    name: "James Wilson",
    grade: "Grade 11-B",
    score: 97.2,
    avatar: "JW",
    rank: 2,
  },
  {
    id: 3,
    name: "Sophia Chen",
    grade: "Grade 12-A",
    score: 96.8,
    avatar: "SC",
    rank: 3,
  },
  {
    id: 4,
    name: "Oliver Martinez",
    grade: "Grade 10-A",
    score: 95.5,
    avatar: "OM",
    rank: 4,
  },
  {
    id: 5,
    name: "Isabella Brown",
    grade: "Grade 11-A",
    score: 94.9,
    avatar: "IB",
    rank: 5,
  },
]

export function TopStudents() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="text-lg font-semibold text-card-foreground">Top Performing Students</h3>
        <p className="text-sm text-muted-foreground">Based on overall academic performance</p>
      </div>
      <div className="divide-y divide-border">
        {students.map((student) => (
          <div key={student.id} className="flex items-center gap-4 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-bold text-muted-foreground">
              #{student.rank}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-medium">
              {student.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-card-foreground">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.grade}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">{student.score}%</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
