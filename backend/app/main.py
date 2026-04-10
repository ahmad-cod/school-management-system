from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from .db import engine

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

@app.get("/health-db")
async def health_db():
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return {"status": "Database is reachable!"}
    except Exception as e:
        return {"status": "Database connection failed", "error": str(e)}
    
@app.get("/")
async def read_root():
    return {"message": "Aroyehun School Management System API online"}