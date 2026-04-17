import os
import asyncpg
from asyncpg import Connection
from fastapi import Request

# Load environment variables
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")

print(f"DEBUG: Connecting as User={DB_USER} to Host={DB_HOST}")

if not DB_USER or not DB_PASS:
    raise ValueError("DATABASE SETTINGS MISSING: DB_USER or DB_PASSWORD is None!")

# asyncpg uses a standard postgresql:// URI
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}"

async def create_db_pool():
    """
    Initializes the connection pool. 
    This should be called once during application startup and the pool should be stored in app.state.
    """
    return await asyncpg.create_pool(
        dsn=DATABASE_URL,
        min_size=5,  # Minimum number of connections to keep open
        max_size=20  # Maximum number of connections in the pool
    )

async def get_db(request: Request) -> Connection:
    """
    Dependency that provides a connection from the pool.
    Usage in routes: connection = Depends(get_db)
    """
    async with request.app.state.db_pool.acquire() as connection:
        yield connection