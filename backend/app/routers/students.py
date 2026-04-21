from fastapi import APIRouter, Depends, HTTPException
from app.db import get_db
from pydantic import BaseModel
from datetime import date

router = APIRouter(
    prefix="/api/v1/students",
    tags=["students"]
)

class StudentCreate(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str  # Must be 'M', 'F', or 'O'
    class_id: int
    parent_name: str = None
    parent_phone: str = None
  
@router.get("/")
async def list_students(db=Depends(get_db)):
    query = """
        SELECT
            s.student_id,
            s.first_name || ' ' || s.last_name  AS full_name,
            c.class_name,
            c.grade_level
        FROM students s
        JOIN classes c ON s.class_id = c.class_id
        ORDER BY c.grade_level, c.class_name, s.last_name
    """
    rows = await db.fetch(query)
    return [dict(row) for row in rows]

# 2.All grades for a specific student (student_id = 14: Chisom Eze)
@router.get("/{student_id}/grades")
async def student_grades(student_id: int, db=Depends(get_db)):
    query = """
        SELECT
            s.first_name || ' ' || s.last_name  AS student_name,
            g.subject,
            g.score,
            g.grade_letter,
            g.term,
            g.exam_type
        FROM grades g
        JOIN students s ON g.student_id = s.student_id
        WHERE g.student_id = $1
        ORDER BY g.subject;
    """
    rows = await db.fetch(query, student_id)
    return [dict(row) for row in rows]


@router.post("/")
async def add_student(student: StudentCreate, db=Depends(get_db)):
    print(f"DEBUG: Adding student {student.first_name} {student.last_name} to class_id {student.class_id}")
    query = """
        INSERT INTO students (first_name, last_name, date_of_birth, gender, class_id, parent_name, parent_phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING student_id;
    """
    try:
        new_id = await db.fetchval(
            query, 
            student.first_name, student.last_name, student.date_of_birth, 
            student.gender, student.class_id, student.parent_name, student.parent_phone
        )
        return {"message": "Student added successfully", "student_id": new_id}
    except Exception as e:
        print(f"ERROR: Failed to add student - {e}")
        # Handle foreign key or check constraint violations
        raise HTTPException(status_code=400, detail=str(e))