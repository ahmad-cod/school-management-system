# School Management System

A portfolio-focused school management platform built with FastAPI, PostgreSQL, AsyncPG, Pydantic, Next.js, TypeScript, Tailwind CSS, and Radix UI.

The project is intentionally scoped around a smaller set of well-engineered modules instead of a broad set of shallow features. The target is to demonstrate architecture, database design, security, testing, documentation, maintainability, and a polished SaaS-style user experience.

## Current Status

This repository is in the audit and foundation phase.

Implemented today:

- Basic Docker Compose setup for PostgreSQL, FastAPI, and Next.js.
- Basic API version prefix for students, teachers, and classes.
- Seeded PostgreSQL schema for teachers, classes, students, grades, and school fees.
- Initial frontend pages and reusable UI components.
- Architecture, database, and roadmap documentation.

Not production-ready yet:

- Authentication and authorization are not implemented.
- Server-side RBAC is not implemented.
- Audit logs are not implemented.
- Database migrations are not implemented.
- Attendance, report cards, invoices, payments, and analytics APIs are incomplete or missing.
- Automated backend, frontend, and end-to-end tests are not yet present.

## Product Scope

Core modules:

- Authentication and authorization: admin and teacher roles, JWT access tokens, refresh tokens, password hashing, server-side authorization.
- Student management: profiles, enrollment, search, filtering, pagination, sorting, and status tracking.
- Class management: classes, teacher assignment, student enrollment, and capacity tracking.
- Academic records: subjects, assessments, grades, grade calculations, and report cards.
- Attendance: recording, history, and analytics.
- Finance: invoices, payments, outstanding balances, and financial summaries.
- Dashboard: student, attendance, revenue, academic, and recent activity metrics.

Explicitly out of scope:

- Messaging systems.
- Chat platforms.
- Parent portal.
- Medical records.
- Complex scheduling engines.
- Mobile apps.
- Multi-tenant SaaS.

## Documentation

- [Repository Audit](docs/AUDIT.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Database Design](docs/DATABASE.md)
- [Engineering Roadmap](docs/ROADMAP.md)
- [Engineering Decision Log](docs/DECISIONS.md)

## Tech Stack

Backend:

- FastAPI
- PostgreSQL
- AsyncPG
- Pydantic

Frontend:

- Next.js 16
- TypeScript
- React Hook Form
- Tailwind CSS
- Radix UI

Infrastructure:

- Docker
- Docker Compose

## Quick Start

Prerequisites:

- Docker and Docker Compose
- Git

Create local environment variables:

```bash
cp .env.example .env
```

Update `.env` with local database credentials, then start the stack:

```bash
docker-compose up --build
```

Local URLs:

| Component | URL | Purpose |
| --- | --- | --- |
| Frontend | http://localhost:3000 | Web application |
| API | http://localhost:8000 | FastAPI service |
| API Docs | http://localhost:8000/docs | Swagger UI |
| ReDoc | http://localhost:8000/redoc | API reference |

## Development

Backend:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Repository Structure

```text
school-management-system/
├── backend/                # FastAPI application
├── db/                     # Current SQL schema and seed scripts
├── docs/                   # Architecture, audit, database, and roadmap docs
├── frontend/               # Next.js application
├── docker-compose.yml      # Local service orchestration
└── README.md
```

## Engineering Standard

The project should evolve through small, reviewed increments:

1. Audit the current behavior.
2. Document the decision being made.
3. Implement a focused change.
4. Add or update tests.
5. Update documentation.
6. Keep unfinished or out-of-scope features out of the primary product surface.
