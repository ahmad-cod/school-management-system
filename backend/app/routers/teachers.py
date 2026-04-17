from fastapi import APIRouter, Depends
from app.db import get_db

router = APIRouter(
    prefix="/api/v1/teachers",
    tags=["teachers"]
)

@router.get("/")
async def list_teachers(db=Depends(get_db)):
    query = """
        SELECT
            t.teacher_id,
            t.first_name || ' ' || t.last_name  AS full_name,
            t.subject,
            COUNT(c.class_id) AS num_classes
        FROM teachers t
        LEFT JOIN classes c ON t.teacher_id = c.teacher_id
        GROUP BY t.teacher_id
        ORDER BY t.last_name, t.first_name
    """
    rows = await db.fetch(query)
    return [dict(row) for row in rows]