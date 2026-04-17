import asyncio
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .db import create_db_pool, get_db

app = FastAPI(
    title="School Management System API",
    description="API for managing teachers, classes, students, grades, and school fees.",
    version="1.0.0",
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    # Don't just crash. Retry.
    retries = 10
    while retries > 0:
        try:
            # Store the pool in the app state so it's accessible globally
            app.state.db_pool = await create_db_pool()
            print("Successfully connected to the database pool.")
            break
        except Exception as e:
            retries -= 1
            print(f"Database not ready. Retrying in 2 seconds... {retries} attempts left")
            await asyncio.sleep(2)

    if retries == 0:
        raise RuntimeError("Could not connect to database after 10 attempts.")


@app.on_event("shutdown")
async def shutdown():
    # Clean up the pool when the app stops
    await app.state.db_pool.close()

# @app.get("/health-db")
# async def health_db():
#     try:
#         async with engine.connect() as conn:
#             await conn.execute(text("SELECT 1"))
#         return {"status": "Database is reachable!"}
#     except Exception as e:
#         return {"status": "Database connection failed", "error": str(e)}
    
@app.get("/")
async def read_root():
    return {"message": "Aroyehun School Management System API online"}

@app.get("/api/v1/students")
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

@app.get("/api/v1/classes")
async def list_classes(db=Depends(get_db)):
    query = """
        SELECT
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

@app.get("/api/v1/teachers")
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

# 3.All grades for a specific student (student_id = 14: Chisom Eze)
@app.get("/api/v1/students/{student_id}/grades")
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

