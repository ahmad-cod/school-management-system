from fastapi import APIRouter, Depends
from app.db import get_db

router = APIRouter(
    prefix="/api/v1/classes",
    tags=["classes"]
)

@router.get("/")
async def list_classes(db=Depends(get_db)):
    query = """
        SELECT
            c.class_id,
            c.class_name,
            c.grade_level,
            c.room_number,
            t.first_name || ' ' || t.last_name  AS teacher_name,
            t.subject                            AS teacher_subject
        FROM classes c
        JOIN teachers t ON c.teacher_id = t.teacher_id
        ORDER BY c.grade_level, c.class_name
    """
    rows = await db.fetch(query)
    return [dict(row) for row in rows]